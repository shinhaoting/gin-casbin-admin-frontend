import { ref } from "vue";
import reDrawer from "./index.vue";
import { useTimeoutFn } from "@vueuse/core";
import { withInstall } from "@pureadmin/utils";
const drawerStore = ref([]);
/** 打开抽屉 */
const addDrawer = (options) => {
    const open = () => drawerStore.value.push(Object.assign(options, { visible: true }));
    if (options?.openDelay) {
        useTimeoutFn(() => {
            open();
        }, options.openDelay);
    }
    else {
        open();
    }
};
/** 关闭抽屉 */
const closeDrawer = (options, index, args) => {
    drawerStore.value[index].visible = false;
    options.closeCallBack && options.closeCallBack({ options, index, args });
    const closeDelay = options?.closeDelay ?? 200;
    useTimeoutFn(() => {
        drawerStore.value.splice(index, 1);
    }, closeDelay);
};
/**
 * @description 更改抽屉自身属性值
 * @param value 属性值
 * @param key 属性，默认`title`
 * @param index 弹框索引（默认`0`，代表只有一个弹框，对于嵌套弹框要改哪个弹框的属性值就把该弹框索引赋给`index`）
 */
const updateDrawer = (value, key = "title", index = 0) => {
    drawerStore.value[index][key] = value;
};
/** 关闭所有弹框 */
const closeAllDrawer = () => {
    drawerStore.value = [];
};
const ReDrawer = withInstall(reDrawer);
export { ReDrawer, drawerStore, addDrawer, closeDrawer, updateDrawer, closeAllDrawer };
//# sourceMappingURL=index.js.map