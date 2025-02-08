import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 字典类型表单规则 */
export const formRules = reactive<FormRules>({
  name: [{ required: true, message: "字典名称为必填项", trigger: "blur" }],
  code: [{ required: true, message: "字典类型为必填项", trigger: "blur" }],
  sort: [{ required: true, message: "显示排序为必填项", trigger: "blur" }]
});

/** 字典数据表单规则 */
export const dataFormRules = reactive<FormRules>({
  label: [{ required: true, message: "字典标签为必填项", trigger: "blur" }],
  value: [{ required: true, message: "字典键值为必填项", trigger: "blur" }],
  sort: [{ required: true, message: "显示排序为必填项", trigger: "blur" }]
});
