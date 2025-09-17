/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型 v-copy="test"
 */
import { webCopy } from "../libs/util";

export default {
  bind(el, binding) {
    // 绑定点击事件
    const text = binding.value || el.innerText; // 支持动态文本或静态文本
    _copyText=text;
    el.addEventListener('click', clickCopy);
  },
  update(el, binding, vnode){
    const text = binding.value || el.innerText; // 支持动态文本或静态文本
    _copyText=text;
  },
  // 解绑时移除事件
  unbind(el) {
    el.removeEventListener('click', clickCopy);
  }
};

var _copyText='';
var clickCopy=function(){
    webCopy(_copyText)
}


