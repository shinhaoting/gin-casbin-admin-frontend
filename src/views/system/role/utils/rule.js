import { reactive } from "vue";
/** 自定义表单规则校验 */
export const formRules = reactive({
    name: [{ required: true, message: "角色名称为必填项", trigger: "blur" }],
    code: [{ required: true, message: "角色标识为必填项", trigger: "blur" }]
});
//# sourceMappingURL=rule.js.map