<template>
  <div class="roundRobin">
    <h3>仿真轮循</h3>
    <p>list:{{option.list}}</p>
    
    <code>
    let rrc=new roundRobinClass(this.option.list.length);

    rrc.runmain((i)=>{
        console.log(i,this.option.list[i],new Date(),new Date().getTime());
        rrc.setNum(rrc.getRandomNum(1,5))
    })
    </code>
  </div>
</template>
<script>

import roundRobinClass from './dataComp/roundRobin.class'
export default {
  data() {
    return {
      form: {

      },
      option: {
        list: []
      },
      dtime: {
        num: 0,
        max: 0,
        main: null
      }
    }
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data());
      // for(let i in Array(18).fill({name:'1fsd'})){
      console.log('1-int')
      // for(let i in Array(4).fill(1)){
      //     this.option.list.push(i)
      // }
      this.option.list = [
        'a1', 'b2', 'c3', 'd4', 'e9'
      ]


      let rrc = new roundRobinClass(this.option.list.length);
      rrc.runmain((i) => {
        console.log(i, this.option.list[i], new Date(), new Date().getTime());
        rrc.setNum(rrc.getRandomNum(1, 5))
      })

      /* clearInterval(this.dtime.main)
      this.dtime.max=this.option.list.length;
      this.runmain((i)=>{
          console.log('iii',i,this.option.list[i]);
           this.dtime.num=this.getRandomNum(1,10);
      }) */
    },
    getRandomNum(min = 0, max = 1000) {
      let randomIntInRange = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomIntInRange
    },
    runmain(cb) {
      let i = 0;
      let max = this.dtime.max

      this.dtime.main = setInterval(() => {
        this.dtime.num--;
        if (this.dtime.num == 0) {

          if (i < max) {
            cb(i)
          } else {
            clearInterval(this.dtime.main)
          }
          i++;
        } else {

        }
      }, 1000);


    }

  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>
<style lang="scss" scoped>
.roundRobin {
}
</style>