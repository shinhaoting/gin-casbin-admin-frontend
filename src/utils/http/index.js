import Axios from "axios";
import { stringify } from "qs";
import NProgress from "../progress";
import { getToken, formatToken } from "@/utils/auth";
import { useUserStoreHook } from "@/store/modules/user";
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig = {
    // 请求超时时间
    timeout: 10000,
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
    // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
    paramsSerializer: {
        serialize: stringify
    }
};
class PureHttp {
    constructor() {
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }
    /** `token`过期后，暂存待执行的请求 */
    static requests = [];
    /** 防止重复刷新`token` */
    static isRefreshing = false;
    /** 初始化配置对象 */
    static initConfig = {};
    /** 保存当前`Axios`实例对象 */
    static axiosInstance = Axios.create(defaultConfig);
    /** 重连原始请求 */
    static retryOriginalRequest(config) {
        return new Promise(resolve => {
            PureHttp.requests.push((token) => {
                config.headers["Authorization"] = formatToken(token);
                resolve(config);
            });
        });
    }
    /** 请求拦截 */
    httpInterceptorsRequest() {
        PureHttp.axiosInstance.interceptors.request.use(async (config) => {
            // 开启进度条动画
            NProgress.start();
            // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
            if (typeof config.beforeRequestCallback === "function") {
                config.beforeRequestCallback(config);
                return config;
            }
            if (PureHttp.initConfig.beforeRequestCallback) {
                PureHttp.initConfig.beforeRequestCallback(config);
                return config;
            }
            /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
            const whiteList = ["/refresh-token", "/login"];
            return whiteList.some(url => config.url.endsWith(url))
                ? config
                : new Promise(resolve => {
                    const data = getToken();
                    if (data) {
                        const now = new Date().getTime();
                        const expired = parseInt(data.expires) - now <= 0;
                        if (expired) {
                            if (!PureHttp.isRefreshing) {
                                PureHttp.isRefreshing = true;
                                // token过期刷新
                                useUserStoreHook()
                                    .handRefreshToken({ refreshToken: data.refreshToken })
                                    .then(res => {
                                    const token = res.data.accessToken;
                                    config.headers["Authorization"] = formatToken(token);
                                    PureHttp.requests.forEach(cb => cb(token));
                                    PureHttp.requests = [];
                                })
                                    .finally(() => {
                                    PureHttp.isRefreshing = false;
                                });
                            }
                            resolve(PureHttp.retryOriginalRequest(config));
                        }
                        else {
                            config.headers["Authorization"] = formatToken(data.accessToken);
                            resolve(config);
                        }
                    }
                    else {
                        resolve(config);
                    }
                });
        }, error => {
            return Promise.reject(error);
        });
    }
    /** 响应拦截 */
    httpInterceptorsResponse() {
        const instance = PureHttp.axiosInstance;
        instance.interceptors.response.use((response) => {
            const $config = response.config;
            // 关闭进度条动画
            NProgress.done();
            // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
            if (typeof $config.beforeResponseCallback === "function") {
                $config.beforeResponseCallback(response);
                return response.data;
            }
            if (PureHttp.initConfig.beforeResponseCallback) {
                PureHttp.initConfig.beforeResponseCallback(response);
                return response.data;
            }
            return response.data;
        }, async (error) => {
            const $error = error;
            $error.isCancelRequest = Axios.isCancel($error);
            NProgress.done();
            // 处理token过期的情况 (假设后端返回401状态码表示token过期)
            if (error.response?.status === 401) {
                const data = getToken();
                // 如果没有refresh token，直接跳转登录页
                if (!data?.refreshToken) {
                    useUserStoreHook().logOut();
                    return Promise.reject(error);
                }
                // 防止多个请求同时刷新token
                if (!PureHttp.isRefreshing) {
                    PureHttp.isRefreshing = true;
                    try {
                        const res = await useUserStoreHook().handRefreshToken({
                            refreshToken: data.refreshToken
                        });
                        if (res.code === 200) {
                            // 刷新token成功，重试所有等待的请求
                            const token = res.data.accessToken;
                            PureHttp.requests.forEach(cb => cb(token));
                            PureHttp.requests = [];
                            // 重试当前请求
                            error.config.headers["Authorization"] = formatToken(token);
                            return PureHttp.axiosInstance.request(error.config);
                        }
                        else {
                            // refresh token也过期或无效，跳转登录页
                            useUserStoreHook().logOut();
                        }
                    }
                    catch (refreshError) {
                        console.error("refresh token请求失败", refreshError);
                        // refresh token请求失败，跳转登录页
                        useUserStoreHook().logOut();
                    }
                    finally {
                        PureHttp.isRefreshing = false;
                    }
                }
                else {
                    // 其他请求等待token刷新完成
                    return PureHttp.retryOriginalRequest(error.config);
                }
            }
            return Promise.reject($error);
        });
    }
    /** 通用请求工具函数 */
    request(method, url, param, axiosConfig) {
        const config = {
            method,
            url,
            ...param,
            ...axiosConfig
        };
        // 单独处理自定义请求/响应回调
        return new Promise((resolve, reject) => {
            PureHttp.axiosInstance
                .request(config)
                .then((response) => {
                resolve(response);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    /** 单独抽离的`post`工具函数 */
    post(url, params, config) {
        return this.request("post", url, params, config);
    }
    /** 单独抽离的`get`工具函数 */
    get(url, params, config) {
        return this.request("get", url, params, config);
    }
}
export const http = new PureHttp();
//# sourceMappingURL=index.js.map