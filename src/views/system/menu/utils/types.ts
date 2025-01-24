// 菜单类型枚举
export enum MenuTypeEnum {
  MENU = 1, // 菜单
  IFRAME = 2, // iframe
  LINK = 3, // 外链
  BUTTON = 4 // 按钮
}

export interface FormItemProps {
  menuType?: MenuTypeEnum;
  higherMenuOptions?: Array<any>;
  parentId?: number;
  title?: string;
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
  auths?: string;
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
