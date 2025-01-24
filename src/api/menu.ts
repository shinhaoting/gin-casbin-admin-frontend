import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";

// 修改菜单
export const updateMenu = (data: any) => {
  return http.request<HttpResponse<any>>("post", "/api/permission/menu", {
    data
  });
};

interface MenuParams {
  title?: string;
  pageNum?: number;
  pageSize?: number;
}

// 获取菜单
export const getMenus = (params?: MenuParams) => {
  return http.request<HttpResponse<any>>("get", "/api/permission/menu", {
    params
  });
};
