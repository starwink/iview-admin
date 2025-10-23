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
// import asyncRoutes from '@/router/routers'

export default {
  data() {
    return {
    //   activeIndex: this.$store.state.menu.headerActived,
      activeIndex:0,
      menu: [...this.$store.state.menu.routes],
      name:''
      
      
    }
  },
  
  computed: {
  
  },
  methods: {
    init(){

        this.setSelName()
    },
    setSelName(){
         this.name= this.menu[this.activeIndex]?.meta?.title 
    },
    switchMenu(index) {
        this.setSelName()

        this.$store.commit('menu/switchHeaderActived', index)
        this.$router.push(this.$store.getters['menu/sidebarRoutes'][0].path)
    }
  },
  created(){
    this.init();
  }
}
</script>

<style>
</style>