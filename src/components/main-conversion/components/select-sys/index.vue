<template>
  <div>
    <Dropdown transfer @on-click="switchMenu" >
      <a href="javascript:void(0)">
        {{name}}
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list" >
        <DropdownItem v-for="(item, index) in menu" :name="index">{{item.meta.title}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$store.state.menu.headerActived,
      menu: [...this.$store.state.menu.routes],
      
      
    }
  },
  computed: {
    name() {
      return this.menu[this.activeIndex]?.meta?.title 
    }
  },
  methods: {
    switchMenu(index) {
      this.$store.commit('menu/switchHeaderActived', index)
      this.$router.push(this.$store.getters['menu/sidebarRoutes'][0].path)
    }
  }
}
</script>

<style>
</style>