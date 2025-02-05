// 菜单类型枚举
export enum MenuTypeEnum {
  MENU = 1, // 菜单
  IFRAME = 2, // iframe
  LINK = 3, // 外链
  BUTTON = 4 // 按钮
}

export interface FormItemProps {
  id?: number;
  menuType: MenuTypeEnum;
  title: string;
  auths: string;
  parentId: number;
  higherMenuOptions?: Array<any>;
  name?: string;
  path?: string;
  component?: string;
  rank?: number;
  redirect?: string;
  icon?: string;
  extraIcon?: string;
  enterTransition?: string;
  leaveTransition?: string;
  activePath?: string;
  frameSrc?: string;
  frameLoading?: boolean;
  keepAlive?: boolean;
  hiddenTag?: boolean;
  fixedTag?: boolean;
  showLink?: boolean;
  showParent?: boolean;
}

export interface FormProps {
  formInline?: FormItemProps;
}
