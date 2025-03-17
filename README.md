# Gin Casbin Admin Frontend

基于 [Pure Admin](https://github.com/pure-admin/vue-pure-admin) 开发的后台管理系统，主要实现了对接后端权限管理接口，包括用户管理、角色管理、菜单管理等功能。

## 后端项目

后端项目地址：[gin-casbin-admin](https://github.com/wxlbd/gin-casbin-admin)

## 主要功能

- 用户管理：用户的增删改查、分配角色、重置密码等
- 角色管理：角色的增删改查、分配菜单权限等
- 菜单管理：菜单的增删改查、按钮权限等
- 权限控制：基于 RBAC 的权限控制，支持按钮级别的权限管理

## 快速开始

```bash
# 克隆项目
git clone https://github.com/wxlbd/gin-casbin-admin-frontend.git
# 进入项目目录
cd gin-casbin-admin-frontend
# 安装依赖
pnpm install
# 启动服务
pnpm dev
# 构建生产环境
pnpm build
```

## 技术栈

- Vue3
- TypeScript
- Vite
- Element Plus
- Pinia
- Vue Router

## 鸣谢

- [Pure Admin](https://github.com/pure-admin/vue-pure-admin) - 优秀的前端管理框架
- [Element Plus](https://element-plus.org/) - 优秀的 UI 组件库

## License

[MIT](LICENSE)
