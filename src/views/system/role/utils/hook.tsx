import dayjs from "dayjs";
import editForm from "../form.vue";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { usePublicHooks } from "../../hooks";
import { transformI18n } from "@/plugins/i18n";
import { addDialog } from "@/components/ReDialog";
import type { PaginationProps } from "@pureadmin/table";
import { getKeyList, deviceDetection } from "@pureadmin/utils";
import { getMenus } from "@/api/menu";
import {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
  getRoleMenus,
  updateRoleMenu,
  type RoleData
} from "@/api/role";
import { type Ref, reactive, ref, onMounted, h, watch } from "vue";

export function useRole(treeRef: Ref) {
  const form = reactive({
    name: "",
    code: "",
    status: "",
    pageNum: 1,
    pageSize: 10
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const treeIds = ref([]);
  const treeData = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const treeSearchValue = ref();
  const switchLoadMap = ref({});
  const isExpandAll = ref(false);
  const isSelectAll = ref(false);
  const { switchStyle } = usePublicHooks();
  const treeProps = {
    value: "id",
    label: "title",
    children: "children"
  };
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "角色编号",
      prop: "id"
    },
    {
      label: "角色名称",
      prop: "name"
    },
    {
      label: "角色标识",
      prop: "code"
    },
    {
      label: "状态",
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
        />
      ),
      minWidth: 90
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 160
    },
    {
      label: "创建时间",
      prop: "createTime",
      minWidth: 160,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];
  // const buttonClass = computed(() => {
  //   return [
  //     "!h-[20px]",
  //     "reset-margin",
  //     "!text-gray-500",
  //     "dark:!text-white",
  //     "dark:hover:!text-primary"
  //   ];
  // });

  function onChange({ row, index }) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 0 ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.name
      }</strong>吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          message(`已${row.status === 0 ? "停用" : "启用"}${row.name}`, {
            type: "success"
          });
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  function handleDelete(row) {
    deleteRole([row.id]).then(() => {
      message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
      onSearch();
    });
  }

  async function onSearch() {
    loading.value = true;
    const params = {
      name: form.name,
      code: form.code,
      status: form.status,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize
    };

    try {
      const { data } = await getRoles(params);
      dataList.value = data.list;
      pagination.total = data.total;
      pagination.currentPage = data.currentPage;
    } catch (error) {
      console.error("获取角色列表失败:", error);
    } finally {
      loading.value = false;
    }
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    pagination.currentPage = 1;
    pagination.pageSize = 10;
    onSearch();
  };

  function openDialog(title = "新增", row?: RoleData) {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          id: row?.id ?? 0,
          name: row?.name ?? "",
          code: row?.code ?? "",
          remark: row?.remark ?? "",
          status: row?.status ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as RoleData;
        function chores() {
          message(`您${title}了角色名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              addRole(curData).then(() => {
                chores();
              });
            } else {
              updateRole(curData).then(() => {
                chores();
              });
            }
          }
        });
      }
    });
  }

  // 获取菜单树数据
  async function loadMenuTree() {
    try {
      loading.value = true;
      const { data } = await getMenus({
        status: 1,
        pageNum: 1,
        pageSize: 1000
      });
      // 处理返回的菜单数据为树形结构
      treeData.value = handleTree(data.list || []);
      // 获取所有菜单ID，用于全选/展开功能
      treeIds.value = getKeyList(treeData.value, "id");
    } catch (error) {
      console.error("获取菜单列表失败:", error);
      message("获取菜单列表失败", { type: "error" });
    } finally {
      loading.value = false;
    }
  }

  /** 菜单权限 */
  async function handleMenu(row?: RoleData) {
    if (row?.id) {
      curRow.value = row;
      isShow.value = true;
      try {
        loading.value = true;
        // 如果菜单树还没有加载，先加载菜单树
        if (!treeData.value.length) {
          await loadMenuTree();
        }
        // 获取角色的菜单权限ID列表
        const { data } = await getRoleMenus(row.id);
        treeRef.value.setCheckedKeys(data?.map(item => item.id) ?? []);
      } catch (error) {
        console.error("获取角色菜单权限失败:", error);
        message("获取角色菜单权限失败", { type: "error" });
      } finally {
        loading.value = false;
      }
    } else {
      curRow.value = null;
      isShow.value = false;
    }
  }

  /** 高亮当前权限选中行 */
  function rowStyle({ row: { id } }) {
    return {
      cursor: "pointer",
      background: id === curRow.value?.id ? "var(--el-fill-color-light)" : ""
    };
  }

  /** 菜单权限-保存 */
  function handleSave() {
    const { id, name } = curRow.value;
    // 根据用户 id 调用实际项目中菜单权限修改接口
    console.log(id, treeRef.value.getCheckedKeys());
    updateRoleMenu(id, treeRef.value.getCheckedKeys()).then(() => {
      message(`角色名称为${name}的菜单权限修改成功`, {
        type: "success"
      });
    });
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  const onQueryChanged = (query: string) => {
    treeRef.value!.filter(query);
  };

  const filterMethod = (query: string, node) => {
    return transformI18n(node.title)!.includes(query);
  };

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    pagination.currentPage = 1;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  onMounted(async () => {
    onSearch(); // 获取角色列表
    await loadMenuTree(); // 获取菜单树数据
  });

  watch(isExpandAll, val => {
    val
      ? treeRef.value.setExpandedKeys(treeIds.value)
      : treeRef.value.setExpandedKeys([]);
  });

  watch(isSelectAll, val => {
    val
      ? treeRef.value.setCheckedKeys(treeIds.value)
      : treeRef.value.setCheckedKeys([]);
  });

  return {
    form,
    isShow,
    curRow,
    loading,
    columns,
    rowStyle,
    dataList,
    treeData,
    treeProps,
    isLinkage,
    pagination,
    isExpandAll,
    isSelectAll,
    treeSearchValue,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleSave,
    handleDelete,
    filterMethod,
    transformI18n,
    onQueryChanged,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
