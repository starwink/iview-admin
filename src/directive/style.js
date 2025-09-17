/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型 v-copy="test"
 */

export default {
  bind(el, binding) {
    let numLine=binding.value>0?binding.value:2;
    el.style['-webkit-line-clamp']=numLine
  },
  update(el, binding, vnode){
  
  },
  // 解绑时移除事件
  unbind(el) {

  }
};



