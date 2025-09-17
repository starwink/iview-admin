
/**
 * v-debounce,v-fd
 * 按钮防抖指令
 * 接收参数：function类型 v-debounce="func"
 */
export default {
    bind(el, binding) {
        if (typeof binding.value !== "function") {
            throw "callback must be a function";
        }
        let timer = null;
        el.__handleClick__ = function () {
            if (timer) {
                clearInterval(timer);
            }
            timer = setTimeout(() => {
                binding.value();
            }, 500);
        }
        el.addEventListener("click", el.__handleClick__);
    },
    // 解绑时移除事件
    unbind(el) {
        el.removeEventListener('click', el.__handleClick__);
    }
};


