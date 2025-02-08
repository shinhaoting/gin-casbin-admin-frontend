import { http } from "@/utils/http";
// 获取用户列表
export const getUserList = (params) => {
    return http.request("get", "/api/system/user", { params });
};
// 新增用户
export const addUser = (data) => {
    return http.request("post", "/api/system/user", {
        data
    });
};
// 修改用户
export const updateUser = (data) => {
    return http.request("put", `/api/system/user/${data.id}`, {
        data
    });
};
// 删除用户
export const deleteUser = (ids) => {
    return http.request("delete", `/api/system/user/${ids.join(",")}`);
};
// 获取用户的角色
export const getUserRoleIds = (userId) => {
    return http.request("get", `/api/system/user/${userId}/roles`);
};
// 更新用户密码
export const updateUserPassword = (userId, password) => {
    return http.request("put", `/api/system/user/${userId}/password`, {
        data: { password }
    });
};
//# sourceMappingURL=user_manager.js.map