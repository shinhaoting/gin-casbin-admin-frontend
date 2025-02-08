import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { deviceDetection } from "@pureadmin/utils";
import { reactive, ref, onMounted, h } from "vue";
import { getDictTypes, addDictType, updateDictType, deleteDictType } from "@/api/dict";
import { useRouter } from "vue-router";
import dictDataDrawer from "../dictDataDrawer.vue";
export function useDict() {
    const form = reactive({
        name: "",
        code: "",
        status: "",
        pageNum: 1,
        pageSize: 10
    });
    const formRef = ref();
    const dataList = ref([]);
    const loading = ref(true);
    const switchLoadMap = ref({});
    const { switchStyle } = usePublicHooks();
    const router = useRouter();
    const pagination = reactive({
        total: 0,
        pageSize: 10,
        currentPage: 1,
        background: true
    });
    const columns = [
        {
            label: "字典编号",
            prop: "id",
            width: 100
        },
        {
            label: "字典名称",
            prop: "name"
        },
        {
            label: "字典类型",
            prop: "code"
        },
        {
            label: "排序",
            prop: "sort",
            width: 80
        },
        {
            label: "状态",
            width: 120,
            cellRenderer: scope => (<el-switch size={scope.props.size === "small" ? "small" : "default"} loading={switchLoadMap.value[scope.index]?.loading} v-model={scope.row.status} active-value={1} inactive-value={0} active-text="已启用" inactive-text="已停用" inline-prompt style={switchStyle.value} onChange={() => onChange(scope)}/>)
        },
        {
            label: "备注",
            prop: "remark"
        },
        {
            label: "创建时间",
            prop: "createdAt",
            width: 180,
            formatter: ({ createdAt }) => dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            label: "操作",
            fixed: "right",
            width: 240,
            slot: "operation"
        }
    ];
    function onChange({ row, index }) {
        ElMessageBox.confirm(`确认要<strong>${row.status === 0 ? "停用" : "启用"}</strong><strong style='color:var(--el-color-primary)'>${row.name}</strong>吗?`, "系统提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            dangerouslyUseHTMLString: true,
            draggable: true
        })
            .then(() => {
            switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
                loading: true
            });
            updateDictType(row).then(() => {
                switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
                    loading: false
                });
                message(`已${row.status === 0 ? "停用" : "启用"}${row.name}`, {
                    type: "success"
                });
            });
        })
            .catch(() => {
            row.status === 0 ? (row.status = 1) : (row.status = 0);
        });
    }
    function handleDelete(row) {
        deleteDictType([row.id]).then(() => {
            message(`您删除了字典类型名称为${row.name}的这条数据`, {
                type: "success"
            });
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
            const { data } = await getDictTypes(params);
            dataList.value = data.list;
            pagination.total = data.total;
            pagination.currentPage = data.currentPage;
        }
        finally {
            loading.value = false;
        }
    }
    function openDialog(title = "新增", row) {
        addDialog({
            title: `${title}字典类型`,
            props: {
                formInline: {
                    id: row?.id ?? 0,
                    name: row?.name ?? "",
                    code: row?.code ?? "",
                    sort: row?.sort ?? 0,
                    remark: row?.remark ?? "",
                    status: row?.status ?? 1
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
                const curData = options.props.formInline;
                function chores() {
                    message(`您${title}了字典类型名称为${curData.name}的这条数据`, {
                        type: "success"
                    });
                    done();
                    onSearch();
                }
                FormRef.validate(valid => {
                    if (valid) {
                        if (title === "新增") {
                            addDictType(curData).then(() => {
                                chores();
                            });
                        }
                        else {
                            updateDictType(curData).then(() => {
                                chores();
                            });
                        }
                    }
                });
            }
        });
    }
    // 打开字典数据页面
    function handleData(row) {
        addDialog({
            title: `字典数据 - ${row.name}`,
            props: {
                dictType: row.code,
                dictName: row.name
            },
            width: "60%",
            draggable: true,
            fullscreenIcon: true,
            closeOnClickModal: false,
            contentRenderer: () => h(dictDataDrawer),
            footerButtons: []
        });
    }
    function handleSizeChange(val) {
        pagination.pageSize = val;
        onSearch();
    }
    function handleCurrentChange(val) {
        pagination.currentPage = val;
        onSearch();
    }
    const resetForm = formEl => {
        if (!formEl)
            return;
        formEl.resetFields();
        pagination.currentPage = 1;
        pagination.pageSize = 10;
        onSearch();
    };
    // 初始化加载数据
    onMounted(() => {
        onSearch();
    });
    return {
        form,
        loading,
        columns,
        dataList,
        pagination,
        onSearch,
        resetForm,
        openDialog,
        handleData,
        handleDelete,
        handleSizeChange,
        handleCurrentChange
    };
}
//# sourceMappingURL=hook.jsx.map