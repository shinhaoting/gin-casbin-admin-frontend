import { http } from "@/utils/http";
/** 登录 */
export const getLogin = (data) => {
    return http.request("post", "/api/auth/login", {
        data
    });
};
/** 刷新`token` */
export const refreshTokenApi = (data) => {
    return http.request("post", "/api/auth/refresh-token", { data });
};
/** 账户设置-个人信息 */
export const getMine = (data) => {
    return http.request("get", "/api/user/profile", {
        data
    });
};
/** 账户设置-个人安全日志 */
export const getMineLogs = (data) => {
    return http.request("get", "/mine-logs", { data });
};
// 获取用户列表
export const getUserList = (data) => {
    return http.request("get", "/user", { data });
};
// 赋予用户角色
export const assignUserRole = (userId, roleIds) => {
    return http.request("put", `api/system/user/${userId}/roles`, {
        data: { roleIds }
    });
};
//# sourceMappingURL=user.js.map