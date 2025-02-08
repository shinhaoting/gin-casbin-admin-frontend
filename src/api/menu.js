import { http } from "@/utils/http";
// 修改菜单
export const updateMenu = (data) => {
    return http.request("put", `/api/system/menu/${data.id}`, {
        data
    });
};
// 获取菜单
export const getMenus = (params) => {
    return http.request("get", "/api/system/menu", {
        params
    });
};
// 新增菜单
export const addMenu = (data) => {
    return http.request("post", "/api/system/menu", {
        data
    });
};
// 删除菜单
export const deleteMenu = (ids) => {
    return http.request("delete", `/api/system/menu/${ids.join(",")}`);
};
//# sourceMappingURL=menu.js.map