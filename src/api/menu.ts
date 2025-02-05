import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";

// 修改菜单
export const updateMenu = (data: any) => {
  return http.request<HttpResponse<any>>("put", `/api/system/menu/${data.id}`, {
    data
  });
};

interface MenuParams {
  title?: string;
  pageNum?: number;
  pageSize?: number;
  status?: number;
}

// 获取菜单
export const getMenus = (params?: MenuParams) => {
  return http.request<HttpResponse<any>>("get", "/api/system/menu", {
    params
  });
};

// 新增菜单
export const addMenu = (data: any) => {
  return http.request<HttpResponse<any>>("post", "/api/system/menu", {
    data
  });
};

// 删除菜单
export const deleteMenu = (ids: number[]) => {
  return http.request<HttpResponse<any>>(
    "delete",
    `/api/system/menu/${ids.join(",")}`
  );
};
