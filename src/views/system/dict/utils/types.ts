// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

export interface FormItemProps {
  id?: number;
  /** 角色名称 */
  name?: string;
  /** 角色编号 */
  code?: string;
  /** 备注 */
  remark?: string;
  /** 状态 */
  status?: number;
  sort?: number;
}

export interface DataFormItemProps {
  id?: number;
  label?: string;
  value?: string;
  sort?: number;
  status?: number;
  remark?: string;
}

export interface FormProps {
  formInline: FormItemProps;
}

export interface DataFormProps {
  formInline: DataFormItemProps;
}
