import { http } from "@/utils/http";
// 转换菜单到路由
function transformMenuToRoute(menu) {
    // 确保基础路由属性存在
    const route = {
        path: menu.path || "",
        name: menu.name,
        redirect: menu.redirect || "",
        component: menu.component || "Layout", // 默认使用 Layout 组件
        meta: {
            title: menu.title || menu.name,
            icon: menu.icon || "",
            rank: menu.rank || 0,
            showLink: menu.show_link ?? true,
            showParent: menu.show_parent ?? false,
            keepAlive: menu.keep_alive ?? false,
            frameSrc: menu.frame_src || "",
            frameLoading: menu.frame_loading ?? true,
            transition: {
                enterTransition: menu.enter_transition || "",
                leaveTransition: menu.leave_transition || ""
            },
            hiddenTag: menu.hidden_tag ?? false,
            fixedTag: menu.fixed_tag ?? false,
            auths: menu.auths ? menu.auths.split(",").filter(Boolean) : [],
            type: menu.menu_type
        }
    };
    // 处理子路由
    if (menu.children && menu.children.length > 0) {
        // 只转换类型为菜单的子项
        const childrenRoutes = menu.children
            .filter(child => child.menu_type === 1)
            .map(child => transformMenuToRoute(child));
        if (childrenRoutes.length > 0) {
            route.children = childrenRoutes;
            // 如果没有重定向，默认重定向到第一个子路由
            if (!route.redirect && childrenRoutes[0]?.path) {
                route.redirect = childrenRoutes[0].path;
            }
        }
    }
    return route;
}
// 转换整个菜单数组
function transformRoutes(menus) {
    // 只转换类型为菜单的项
    return menus
        .filter(menu => menu.menu_type === 1)
        .map(menu => transformMenuToRoute(menu));
}
// 获取异步路由
export const getAsyncRoutes = () => {
    return http
        .request("get", "/api/user/profile/menus")
        .then(res => {
        console.log("转换前:", res.data);
        const routes = transformRoutes(res.data);
        console.log("转换后:", routes);
        return {
            ...res,
            data: routes
        };
    });
};
//# sourceMappingURL=routes.js.map