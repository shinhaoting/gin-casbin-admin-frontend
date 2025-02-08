import { http } from "@/utils/http";
/** 获取系统管理-用户管理列表 */
export const getUserList = (data) => {
    return http.request("post", "/user", { data });
};
/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
    return http.request("get", "/list-all-role");
};
/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data) => {
    return http.request("post", "/list-role-ids", { data });
};
/** 获取系统管理-角色管理列表 */
export const getRoleList = (data) => {
    return http.request("post", "/role", { data });
};
/** 获取系统管理-菜单管理列表 */
export const getMenuList = (data) => {
    return http.request("post", "/menu", { data });
};
/** 获取系统管理-部门管理列表 */
export const getDeptList = (data) => {
    return http.request("post", "/dept", { data });
};
/** 获取系统监控-在线用户列表 */
export const getOnlineLogsList = (data) => {
    return http.request("post", "/online-logs", { data });
};
/** 获取系统监控-登录日志列表 */
export const getLoginLogsList = (data) => {
    return http.request("post", "/login-logs", { data });
};
/** 获取系统监控-操作日志列表 */
export const getOperationLogsList = (data) => {
    return http.request("post", "/operation-logs", { data });
};
/** 获取系统监控-系统日志列表 */
export const getSystemLogsList = (data) => {
    return http.request("post", "/system-logs", { data });
};
/** 获取系统监控-系统日志-根据 id 查日志详情 */
export const getSystemLogsDetail = (data) => {
    return http.request("post", "/system-logs-detail", { data });
};
/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data) => {
    return http.request("post", "/role-menu", { data });
};
/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data) => {
    return http.request("post", "/role-menu-ids", { data });
};
//# sourceMappingURL=system.js.map