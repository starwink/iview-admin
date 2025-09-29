# 关于monaco与v-model的实现问题
monaco在没有v-show的父级节点上可以正常使用,一但中间使用了v-show就会出现只渲染出黑块(可能是本身的监听销毁逻辑),因此还是考虑使用函数调用的方式来使用monaco相关;

## 关于 v-model 的实现问题以及限制
init(this.props.value),chage $emit editor中内容
关于无异常提示的黑块,运行editor.layout后可正常显示,推测是v-show时,editor未能获取内容块的高宽信息;

但只能使用在直接在可视区域中才能成功运行monaco.editor.create,所以还是推荐使用函数式`.init()`来调用




## 使用示例
```vue
this.$nextTick(()=>{
    this.$refs.jsonEditor.setCode(json || {});
})
```


# 关于配置功能版本

## 滚动时 粘在顶部或某个固定位置,帮助快速定位上下文
"editor.stickyScroll.enabled": true  // ^0.44


## 运行函数 yn-develop 的项目参考

triggerHook  注册并运行已注册的函数
registerHook 调用注册的函数

```ts
registerHook('EDITOR_CONTENT_CHANGE', setCurrentValue)


function setCurrentValue ({ uri, value }: { uri: string; value: any}) {
    if (toUri(currentFile.value) === uri && isDefault()) {
        store.state.currentContent = value
    }
}
```

```ts
triggerHook('EDITOR_CONTENT_CHANGE', { uri, value })


```


# 开发中
- [x] 快捷键
- [x] 右键菜单



# todo 

粘贴图片
粘贴图片为base64
粘贴富文本为markdown
添加附件
添加图片
链接文档
在预览中聚焦(光标所在行内容,在预览页中滚动定位)