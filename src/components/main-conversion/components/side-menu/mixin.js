// import CommonIcon from '_c/common-icon'
import eIcon from '_c/eIcon'
import { showTitle } from '@/libs/util'
export default {
  components: {
    eIcon
  },
  methods: {
    showTitle (item) {
      return showTitle(item, this)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref (item, children0) {
    //   return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name);
      return children0 ? item.children[0].name : item.name;//返回name 跳转时通过name在去确认应该要的跳转方式;

    }
  }
}
