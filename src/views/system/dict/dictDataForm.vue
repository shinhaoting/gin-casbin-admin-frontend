<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: 0,
    label: "",
    value: "",
    sort: 0,
    remark: "",
    status: 1
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="字典标签" prop="label">
      <el-input
        v-model="newFormInline.label"
        clearable
        placeholder="请输入字典标签"
      />
    </el-form-item>

    <el-form-item label="字典键值" prop="value">
      <el-input
        v-model="newFormInline.value"
        clearable
        placeholder="请输入字典键值"
      />
    </el-form-item>

    <el-form-item label="显示排序" prop="sort">
      <el-input-number
        v-model="newFormInline.sort"
        :min="0"
        :max="999"
        controls-position="right"
      />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="newFormInline.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="0">停用</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        type="textarea"
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
