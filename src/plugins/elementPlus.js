import { 
/**
 * 为了方便演示平台将 element-plus 导出的所有组件引入，实际使用中如果你没用到哪个组件，将其注释掉就行
 * 导出来源：https://github.com/element-plus/element-plus/blob/dev/packages/element-plus/component.ts#L111-L211
 * */
ElAffix, ElAlert, ElAutocomplete, ElAutoResizer, ElAvatar, ElAnchor, ElAnchorLink, ElBacktop, ElBadge, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElButtonGroup, ElCalendar, ElCard, ElCarousel, ElCarouselItem, ElCascader, ElCascaderPanel, ElCheckTag, ElCheckbox, ElCheckboxButton, ElCheckboxGroup, ElCol, ElCollapse, ElCollapseItem, ElCollapseTransition, ElColorPicker, ElConfigProvider, ElContainer, ElAside, ElFooter, ElHeader, ElMain, ElDatePicker, ElDescriptions, ElDescriptionsItem, ElDialog, ElDivider, ElDrawer, ElDropdown, ElDropdownItem, ElDropdownMenu, ElEmpty, ElForm, ElFormItem, ElIcon, ElImage, ElImageViewer, ElInput, ElInputNumber, ElLink, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu, ElPageHeader, ElPagination, ElPopconfirm, ElPopover, ElPopper, ElProgress, ElRadio, ElRadioButton, ElRadioGroup, ElRate, ElResult, ElRow, ElScrollbar, ElSelect, ElOption, ElOptionGroup, ElSelectV2, ElSkeleton, ElSkeletonItem, ElSlider, ElSpace, ElStatistic, ElCountdown, ElSteps, ElStep, ElSwitch, ElTable, ElTableColumn, ElTableV2, ElTabs, ElTabPane, ElTag, ElText, ElTimePicker, ElTimeSelect, ElTimeline, ElTimelineItem, ElTooltip, ElTransfer, ElTree, ElTreeSelect, ElTreeV2, ElUpload, ElWatermark, ElTour, ElTourStep, ElSegmented, 
/**
 * 为了方便演示平台将 element-plus 导出的所有插件引入，实际使用中如果你没用到哪个插件，将其注释掉就行
 * 导出来源：https://github.com/element-plus/element-plus/blob/dev/packages/element-plus/plugin.ts#L11-L16
 * */
ElLoading, // v-loading 指令
ElInfiniteScroll, // v-infinite-scroll 指令
ElPopoverDirective, // v-popover 指令
ElMessage, // $message 全局属性对象globalProperties
ElMessageBox, // $msgbox、$alert、$confirm、$prompt 全局属性对象globalProperties
ElNotification // $notify 全局属性对象globalProperties
 } from "element-plus";
const components = [
    ElAffix,
    ElAlert,
    ElAutocomplete,
    ElAutoResizer,
    ElAvatar,
    ElAnchor,
    ElAnchorLink,
    ElBacktop,
    ElBadge,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElButton,
    ElButtonGroup,
    ElCalendar,
    ElCard,
    ElCarousel,
    ElCarouselItem,
    ElCascader,
    ElCascaderPanel,
    ElCheckTag,
    ElCheckbox,
    ElCheckboxButton,
    ElCheckboxGroup,
    ElCol,
    ElCollapse,
    ElCollapseItem,
    ElCollapseTransition,
    ElColorPicker,
    ElConfigProvider,
    ElContainer,
    ElAside,
    ElFooter,
    ElHeader,
    ElMain,
    ElDatePicker,
    ElDescriptions,
    ElDescriptionsItem,
    ElDialog,
    ElDivider,
    ElDrawer,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElEmpty,
    ElForm,
    ElFormItem,
    ElIcon,
    ElImage,
    ElImageViewer,
    ElInput,
    ElInputNumber,
    ElLink,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubMenu,
    ElPageHeader,
    ElPagination,
    ElPopconfirm,
    ElPopover,
    ElPopper,
    ElProgress,
    ElRadio,
    ElRadioButton,
    ElRadioGroup,
    ElRate,
    ElResult,
    ElRow,
    ElScrollbar,
    ElSelect,
    ElOption,
    ElOptionGroup,
    ElSelectV2,
    ElSkeleton,
    ElSkeletonItem,
    ElSlider,
    ElSpace,
    ElStatistic,
    ElCountdown,
    ElSteps,
    ElStep,
    ElSwitch,
    ElTable,
    ElTableColumn,
    ElTableV2,
    ElTabs,
    ElTabPane,
    ElTag,
    ElText,
    ElTimePicker,
    ElTimeSelect,
    ElTimeline,
    ElTimelineItem,
    ElTooltip,
    ElTransfer,
    ElTree,
    ElTreeSelect,
    ElTreeV2,
    ElUpload,
    ElWatermark,
    ElTour,
    ElTourStep,
    ElSegmented
];
const plugins = [
    ElLoading,
    ElInfiniteScroll,
    ElPopoverDirective,
    ElMessage,
    ElMessageBox,
    ElNotification
];
/** 按需引入`element-plus` */
export function useElementPlus(app) {
    // 全局注册组件
    components.forEach((component) => {
        app.component(component.name, component);
    });
    // 全局注册插件
    plugins.forEach(plugin => {
        app.use(plugin);
    });
}
//# sourceMappingURL=elementPlus.js.map