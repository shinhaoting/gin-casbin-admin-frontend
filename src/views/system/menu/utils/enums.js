import { MenuTypeEnum } from "./types";
/** 菜单类型选项 */
export const menuTypeOptions = [
    {
        value: MenuTypeEnum.MENU,
        label: "菜单"
    },
    {
        value: MenuTypeEnum.IFRAME,
        label: "iframe"
    },
    {
        value: MenuTypeEnum.LINK,
        label: "外链"
    },
    {
        value: MenuTypeEnum.BUTTON,
        label: "按钮"
    }
];
/** 显示链接选项 */
export const showLinkOptions = [
    {
        value: true,
        label: "显示"
    },
    {
        value: false,
        label: "隐藏"
    }
];
/** 固定标签选项 */
export const fixedTagOptions = [
    {
        value: true,
        label: "固定"
    },
    {
        value: false,
        label: "不固定"
    }
];
/** 缓存选项 */
export const keepAliveOptions = [
    {
        value: true,
        label: "缓存"
    },
    {
        value: false,
        label: "不缓存"
    }
];
/** 隐藏标签选项 */
export const hiddenTagOptions = [
    {
        value: false,
        label: "显示"
    },
    {
        value: true,
        label: "隐藏"
    }
];
/** 显示父级选项 */
export const showParentOptions = [
    {
        value: true,
        label: "显示"
    },
    {
        value: false,
        label: "隐藏"
    }
];
/** iframe加载选项 */
export const frameLoadingOptions = [
    {
        value: true,
        label: "开启"
    },
    {
        value: false,
        label: "关闭"
    }
];
//# sourceMappingURL=enums.js.map