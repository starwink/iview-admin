import directive from './directives'
import copy from './copy'
import debounce from './debounce'
import throttle from './throttle'
import style from './style'

const importDirective = Vue => {
  /**
   * 拖拽指令 v-draggable="options"
   * options = {
   *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
   *  body:    /这里传入需要移动容器的CSS选择器/,
   *  recover: /拖动结束之后是否恢复到原来的位置/
   * }
   */
  Vue.directive('draggable', directive.draggable)
  Vue.directive('copy', copy)
  
  Vue.directive('debounce', debounce)
  Vue.directive('fd', debounce)

  Vue.directive('throttle', throttle)
  Vue.directive('jl', throttle)
  
  Vue.directive('style', style)
}

export default importDirective
