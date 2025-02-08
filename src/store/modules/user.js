import { defineStore } from "pinia";
import { store, router, resetRouter, routerArrays, storageLocal } from "../utils";
import { getLogin, refreshTokenApi } from "@/api/user";
import { useMultiTagsStoreHook } from "./multiTags";
import { setToken, removeToken, userKey } from "@/utils/auth";
// interface LoginData {
//   username: string;
//   password: string;
//   captcha_id: string; // 添加验证码ID
//   captcha_code: string; // 添加验证码答案
// }
export const useUserStore = defineStore("pure-user", {
    state: () => ({
        // 头像
        avatar: storageLocal().getItem(userKey)?.avatar ?? "",
        // 用户名
        username: storageLocal().getItem(userKey)?.username ?? "",
        // 昵称
        nickname: storageLocal().getItem(userKey)?.nickname ?? "",
        // 页面级别权限
        roles: storageLocal().getItem(userKey)?.roles ?? [],
        // 按钮级别权限
        permissions: storageLocal().getItem(userKey)?.permissions ?? [],
        // 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
        currentPage: 0,
        // 是否勾选了登录页的免登录
        isRemembered: false,
        // 登录页的免登录存储几天，默认7天
        loginDay: 7
    }),
    actions: {
        /** 存储头像 */
        SET_AVATAR(avatar) {
            this.avatar = avatar;
        },
        /** 存储用户名 */
        SET_USERNAME(username) {
            this.username = username;
        },
        /** 存储昵称 */
        SET_NICKNAME(nickname) {
            this.nickname = nickname;
        },
        /** 存储角色 */
        SET_ROLES(roles) {
            this.roles = roles;
        },
        /** 存储登录页面显示哪个组件 */
        SET_CURRENTPAGE(value) {
            this.currentPage = value;
        },
        /** 存储是否勾选了登录页的免登录 */
        SET_ISREMEMBERED(bool) {
            this.isRemembered = bool;
        },
        /** 设置登录页的免登录存储几天 */
        SET_LOGINDAY(value) {
            this.loginDay = Number(value);
        },
        /** 登入 */
        async loginByUsername(data) {
            return new Promise((resolve, reject) => {
                getLogin(data)
                    .then(data => {
                    if (data?.code === 200)
                        setToken(data.data);
                    resolve(data);
                })
                    .catch(error => {
                    reject(error);
                });
            });
        },
        /** 前端登出（不调用接口） */
        logOut() {
            this.username = "";
            this.roles = [];
            this.permissions = [];
            removeToken();
            useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
            resetRouter();
            router.push("/login");
        },
        /** 刷新`token` */
        async handRefreshToken(data) {
            return new Promise((resolve, reject) => {
                refreshTokenApi(data)
                    .then(data => {
                    if (data) {
                        setToken(data.data);
                        resolve(data);
                    }
                })
                    .catch(error => {
                    reject(error);
                });
            });
        }
    }
});
export function useUserStoreHook() {
    return useUserStore(store);
}
//# sourceMappingURL=user.js.map