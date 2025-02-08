import { http } from "@/utils/http";
// 获取角色列表
export const getRoles = (params) => {
    return http.request("get", "/api/system/role", { params });
};
// 新增角色
export const addRole = (data) => {
    return http.request("post", "/api/system/role", { data });
};
// 修改角色
export const updateRole = (data) => {
    return http.request("put", `/api/system/role/${data.id}`, {
        data
    });
};
// 删除角色
export const deleteRole = (ids) => {
    return http.request("delete", `/api/system/role/${ids.join(",")}`);
};
// 获取角色的菜单权限列表
export const getRoleMenus = (roleId) => {
    return http.request("get", `/api/system/role/${roleId}/menus`);
};
// 保存角色的菜单权限
export const updateRoleMenu = (roleId, menuIds) => {
    return http.request("put", `/api/system/role/${roleId}/menus`, {
        data: menuIds
    });
};
// 获取所有角色
export const getAllRoles = () => {
    return http.request("get", "/api/system/role/all");
};
//# sourceMappingURL=role.js.map