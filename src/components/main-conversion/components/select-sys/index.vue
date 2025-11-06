<template>
  <div>
    <Dropdown transfer @on-click="switchMenu" >
      <a href="javascript:void(0)">
        {{name}}
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list" >
        <DropdownItem v-for="(item, index) in menu" :name="index" :selected="activeIndex==index">{{item.meta.title}}</DropdownItem>
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
  watch:{
    '$route':function(){
        this.setSelName();
    }
  },
  
  computed: {
  
  },
  methods: {
    init(){
        this.setSelName()
    },
    setSelName(){
        let fullPath=this.$route.fullPath;
        let index=0;
        this.$store.state.menu.routes.map((item,i)=>{
            if(fullPath.startsWith(item.path)){
                index=i
            }
        })
        this.activeIndex=index;
        this.name= this.menu[index]?.meta?.title 
    },
    switchMenu(index) {
        this.$store.commit('menu/switchHeaderActived', index)//
        this.$router.push(this.$store.getters['menu/sidebarRoutes'][0].path)
    }
  },
  mounted(){
      },
  created(){
      this.init();
  }
}
</script>

<style>
</style>