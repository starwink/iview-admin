<template>
    <div class="newclass">
        <!-- 未确认生产环境中的 -->
        <p>表单数据 多步使用</p>
        <span>test:{{test}}{{form.num}}</span>
        <Button @click="getNum">getNum</Button>
        <Button @click="setNum">setNum</Button>
        <Button @click="changeObj">changeObj</Button>

    </div>
</template>
<script>
import nclass from '@/store/nclass.js'
import nclass2 from '@/store/nclass2.js'
import formCache from '@/store/formCache.js'
export default {
    data(){
        return {
            form:{
              num:0  
            },
            formCache:null,
            test:null,
            test2:null,
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            this.test=nclass
            this.test2=nclass2
            this.formCache=formCache;
            this.formCache.set('test',this.test)
            this.formCache.set('test2',this.test2)
          
        },
        getNum(){
            console.log('--+:',this.form.num)
            // this.form.num=this.test.get()
            console.log(this.formCache.getCache())

        },
        setNum(){
            console.log('setNum',this.form.num++)
            let num=this.form.num++;
            // this.form.num=this.test.get()
            this.test.set(num)
        },
        changeObj(){
            let obj=this.formCache.get('test')
            obj={time:new Date().getTime(),age:8};
            this.formCache.set('test2',obj)
        }

    },
    created(){
        this.$nextTick(()=>{
            this.init();
        })
    }
}
</script>
<style lang="scss" scoped>
.newclass{

}
</style>