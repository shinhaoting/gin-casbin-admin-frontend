import { defineStore } from "pinia";
import {
  type cacheType,
  store,
  debounce,
  ascending,
  getKeyList,
  filterTree,
  constantMenus,
  formatFlatteningRoutes
} from "../utils";
import { useMultiTagsStoreHook } from "./multiTags";

export const usePermissionStore = defineStore("pure-permission", {
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
    // 缓存页面keepAlive
    cachePageList: []
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      // 处理组件路径
      const processRoutes = routes.map(route => {
        if (route.component) {
          // 处理布局组件
          if (route.component === "Layout") {
            route.component = "Layout";
          } else {
            // 处理页面组件的路径
            route.component = route.component.startsWith("/")
              ? route.component.slice(1)
              : route.component;
          }
        }

        if (route.children) {
          route.children = this.processRoutes(route.children);
        }
        console.log(route);
        // 处理菜单元数据
        if (route.type === 1) {
          route.meta = {
            title: route.title || route.name,
            icon: route.icon
          };
        }

        return route;
      });

      this.wholeMenus = filterTree(ascending(processRoutes));
      this.flatteningRoutes = formatFlatteningRoutes(processRoutes);
    },
    // 处理路由数组的辅助方法
    processRoutes(routes: any[]) {
      return routes.map(route => {
        if (route.component) {
          if (route.component === "Layout") {
            route.component = "Layout";
          } else {
            route.component = route.component.startsWith("/")
              ? route.component.slice(1)
              : route.component;
          }
        }

        if (route.children) {
          route.children = this.processRoutes(route.children);
        }

        if (route.meta || route.type === 1) {
          route.meta = {
            ...(route.meta || {}),
            title: route.meta?.title || route.name,
            icon: route.meta?.icon || route.icon,
            type: route.type
          };
        }

        return route;
      });
    },
    cacheOperate({ mode, name }: cacheType) {
      const delIndex = this.cachePageList.findIndex(v => v === name);
      switch (mode) {
        case "refresh":
          this.cachePageList = this.cachePageList.filter(v => v !== name);
          break;
        case "add":
          this.cachePageList.push(name);
          this.cachePageList = [...new Set(this.cachePageList)];
          break;
        case "delete":
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
      /** 监听缓存页面是否存在于标签页，不存在则删除 */
      debounce(() => {
        let cacheLength = this.cachePageList.length;
        const nameList = getKeyList(useMultiTagsStoreHook().multiTags, "name");
        while (cacheLength > 0) {
          nameList.findIndex(v => v === this.cachePageList[cacheLength - 1]) ===
            -1 &&
            this.cachePageList.splice(
              this.cachePageList.indexOf(this.cachePageList[cacheLength - 1]),
              1
            );
          cacheLength--;
        }
      })();
    },
    /** 清空缓存页面 */
    clearAllCachePage() {
      this.wholeMenus = [];
      this.cachePageList = [];
    }
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
