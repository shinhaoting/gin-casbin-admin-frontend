import { http } from "@/utils/http";
// 获取字典类型列表
export const getDictTypes = (params) => {
    return http.request("get", "/api/system/dict-type", { params });
};
// 新增字典类型
export const addDictType = (data) => {
    return http.request("post", "/api/system/dict-type", { data });
};
// 修改字典类型
export const updateDictType = (data) => {
    return http.request("put", `/api/system/dict-type/${data.id}`, { data });
};
// 删除字典类型
export const deleteDictType = (ids) => {
    return http.request("delete", `/api/system/dict-type/${ids.join(",")}`);
};
// 获取字典数据列表
export const getDictDataList = (params) => {
    return http.request("get", `/api/system/dict-data`, { params });
};
// 新增字典数据
export const addDictData = (data) => {
    return http.request("post", "/api/system/dict-data", { data });
};
// 修改字典数据
export const updateDictData = (data) => {
    return http.request("put", `/api/system/dict-data/${data.id}`, { data });
};
// 删除字典数据
export const deleteDictData = (ids) => {
    return http.request("delete", `/api/system/dict-data/${ids.join(",")}`);
};
//# sourceMappingURL=dict.js.map