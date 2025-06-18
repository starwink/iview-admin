<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo-new.svg">
    </a>
</p>

# 项目fork变动
## 1.引入 docker目录
用于项目打包测试

## 2.升级iview4.0 view-design

## 99.个人配置
npm run serve

# 前端框架
基于 iview-amdin template 分支[1d06fb3a] (20181102)
vue 2;node18;

## build问题
#### mac &linux
export NODE_OPTIONS=--openssl-legacy-provider
#### windows
set NODE_OPTIONS=--openssl-legacy-provider


## iview-admin官方文档
[官方文档](https://github.com/iview/iview-admin/blob/template/README.md)
[组件文档](http://v4.iviewui.com/components/table)

## 项目fork变动
### 1.引入 docker目录
用于项目打包测试
### 2.升级iview4.0 view-design

## 项目本地vs code 格式化配置
.vscode/settings.json
```json
{
    "editor.tabSize": 4,
    "html.format.contentUnformatted": "",
}
```

## 主题色替换
[ViewDesign主题色替换方案](https://juejin.cn/post/7297103474440814627);
```main.js
genThemeColor('#ff4adb');
```

新增更多的变量,项目核心的代码迁移到`/src/libs/theme/genThemeColor.js`
