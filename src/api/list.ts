import { http } from "@/utils/http";
import type { HttpResponse } from "@/utils/http/types.d";

export type CardListData = {
  /** 列表数据 */
  list: Array<any>;
};

/** 卡片列表 */
export const getCardList = (data?: object) => {
  return http.request<HttpResponse<CardListData>>("post", "/get-card-list", {
    data
  });
};
