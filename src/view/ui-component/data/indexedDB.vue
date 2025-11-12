<template>
    <div class="indexedDB">
        <h3>indexedDB使用</h3>
        <p>chrome49 ,64不兼容,推测可能要在71+以上版本,102可以;queueMicrotask 支持</p>
        <Button @click="addValue">addValue</Button>
        <Button @click="putValue">putValue</Button>
        <Button @click="batchValue">batchValue</Button>
        <Button @click="getList">getList</Button>
        <Button @click="getWhereList">getWhereList</Button>
        <Button @click="del">del</Button>
        <Input v-model="form.id"></Input>
        <Input v-model="form.name"></Input>
        <Button @click="runadd">class add</Button>
        <Button @click="addLogs">add logs</Button>
        <Button @click="getLogs">get logs</Button>
        <Button @click="resetDb">resetDb</Button>
        <Button @click="gadd">gloab add</Button>
        <Button @click="openLogsModal">openLogsModal</Button>

    </div>
</template>
<script>
import { Dexie  } from 'dexie';
import dbTheme from '@/store/theme.db'
export default {
    components:{
    },
    data(){
        return {
            form:{
                id:'',
                name:''
            },
            db:null,
            the:null,
            logdb:null,
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            console.log('iniiii')
            let db=new Dexie('idb');
            db.version(1).stores({
                settings:'++id,name,age,sex,time,json'
            })
            this.db=db;
            console.log('db',db)

            console.log('idbthemeclass',dbTheme)
            this.the=new dbTheme();
            console.log('the',this.the)
            
        },
        addValue(){
            this.db.settings.add({name:'color',age:18,sex:'man',json:'{"name":1}'})
        },
        putValue(){
            let id=parseInt(this.form.id);
            if(!id){return ;}
            this.db.settings.where('id').equals(id).first().then(res=>{
                console.log(res)

                let obj={...res,...{
                    name:this.form.name,
                    sex:'man',time:new Date().getTime()
                }}
                console.log(obj)
                this.db.settings.put(obj).then(i=>{
                    console.log(i)//返回更新后的内容
                },err=>{
                    console.log('eeer',err)
                })
            })

            
        },
        batchValue(){
            // bulkPut
            this.db.settings.bulkAdd([
                { name: 'Alice', sex: 'alice@example.com', age: 25 },
                { name: 'Bob', sex: 'bob@example.com', age: 30 }
            ]);
        },
        del(){

            console.log('id',this.form.id);
            if(this.form.id){
                this.db.settings.delete(parseInt(this.form.id)).then(res=>{
                    console.log('res,',res)
                },err=>{
                    console.log('errr',err)
                })
            }
        },

        
        async getList(){
            console.log('this.db.settings',await this.db.settings.toArray())
        },
        
        getWhereList(){
            //不支持模糊查询,多字段的查询看示例,还是查出相关所有数据后,在js循环来push出一个新数组更加的灵活
            const pageSize = 5;
            const page = 1;
            this.db.settings
            .where('name').equals('color')
            .offset((page - 1) * pageSize)
            .limit(pageSize)
            .toArray().then(res=>{
                console.log(res);
            })
        },
        //事务示例
        async sw(){
            await db.transaction('rw', db.friends, db.orders, async () => {
                await db.friends.add({ name: 'Charlie', email: 'charlie@example.com' });
                await db.orders.add({ userId: 1, createdDate: new Date(), amount: 100 });
                });
        },
        async runadd(){
            // this.the.addVal('color','#f1f3f1')
            // let v=await this.the.getVal('color')
            let v=await this.the.setVal('color','#b197fc')
            this.the.setVal('font-size',14)
            console.log('getv',v)

            this.the.getAll().then(list=>{
                console.log('getAll',list)
            })
            
            // console.log(await this.the.getVal('color2'))
            // console(await )
        },
        addLogs(e){
            this.logdb.add('测试日志','/indexedDb',JSON.stringify(e))
        },
        getLogs(){
            this.logdb.getList().then(res=>{
                console.log(res)
            })
        },
        resetDb(){
            this.logdb.resetDb();
        },
        gadd(e){
            // this.$logs.add('全局测试','/main',JSON.stringify(e))
        },
        openLogsModal(){
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.init()
        })
    }
}
</script>
<style lang="scss" scoped>
.indexedDB{

}
</style>