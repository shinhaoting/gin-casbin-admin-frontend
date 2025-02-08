import { http } from "@/utils/http";
/** 卡片列表 */
export const getCardList = (data) => {
    return http.request("post", "/get-card-list", {
        data
    });
};
//# sourceMappingURL=list.js.map