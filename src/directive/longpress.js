
/**
 * v-longpress,v-ca
 * 长按指令
 * 接收参数：function类型 v-ca="func"
 */
export default {
    bind(el, binding) {
        if (typeof binding.value !== "function") {
            throw "value 必须是函数";
        }
       
        el._loading = false;
        var timer=null
        el.__handleClick__ = function (...e) {
            if (timer && !el._loading) {
                clearTimeout(timer);
            }
            if (!el._loading) {
                el._loading = true;
                binding.value();
                timer = setTimeout(() => {
                    el._loading = false;
                }, 1000);
            }
        }
        el.addEventListener("click", el.__handleClick__);
        return 'htest'
    },
    // 解绑时移除事件
    unbind(el) {
        el.removeEventListener('click', el.__handleClick__);
    }
};

