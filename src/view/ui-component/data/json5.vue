<template>
    <div class="json5">
        <Input v-model="form.json" :rows="4" />
        <!-- <jsonEditor ref="json" /> -->
        <jsonEditor ref="jsonEditor" v-model="form.json" />
        <!-- v-model="form.json"  -->
        <Button @click="run">测试</Button>
        <Button @click="save">保存</Button>
        <div>
            <h3>json5说明</h3>
            <p>注释:支持单行 (//) 和多行 (/* */) 注释</p>
            <p>键名引号:可无引号、单引号或双引号</p>
            <p>字符串引号:可单引号、双引号，甚至支持多行字符串</p>
            <p>尾随逗号:对象和数组内允许尾随逗号</p>
            <p>数字格式:支持十六进制、小数点开头/结尾的数字等</p>
        </div>
    </div>
</template>
<script>
import jsonEditor from '@/components/monaco-editor/json5Editor.vue'
import JSON5 from 'json5';

export default {
    components:{
        jsonEditor
    },
    data(){
        return {
            form:{
                json:''
            }
        }
    },
    created(){
        this.$nextTick(()=>{
            this.init();
        })
    },
    methods:{
     

// // 使用示例
// const testInput = `{name:'John',age:30,traits:["smart",'funny'],}`;
// console.log(formatJson5LikeSimple(testInput));

        init(){
            Object.assign(this.$data, this.$options.data());
            this.$api.getApijsonDetail({id:504}).then(res=>{
                if(res.code==1){
                    this.form=res.object;
                    let json=res.object.json5;
                    this.form.json=json;
                    this.$refs.jsonEditor.setCode(json);
                }
            })
        },
        run(){
            // console.log('form.1',this.form.json,typeof this.form.json)
            // console.log(JSON.stringify({code:this.form.json}))
            console.log(JSON5.stringify({name:'ger'}))
            console.log(JSON5.stringify(JSON.stringify({name:'ger'})))
            console.log(JSON5.stringify('{"name":"fs"}'))
            console.log('----');
            console.log(this.form.json)
            console.log(JSON5.stringify(this.form.json))
            console.log(JSON5.parse(this.form.json))//不支持就异常
             console.log('----2---');
            console.log(JSON.stringify(JSON5.parse(this.form.json)))
            console.log(JSON5.stringify(JSON5.parse(this.form.json)))
            // console.log('form.1jsonc',JSON5.parse(this.form.json))
            // console.log('form.1jsonc',this.formatJson5LikeSimple(this.form.json));
            // console.log('form.1jsonc',JSON5.stringify(JSON5.parse(this.form.json),null,2))
            // console.log('stringify',JSON5.stringify(this.form.json,{space:3}))
            // console.log('parseJSONC',parseJSONC(this.form.json))
        },
        save(){
            let params={
                ...this.form,
                ...{
                    json:JSON.stringify(this.$helper.parseJSON5(this.form.json)),
                    json5:this.form.json
                }
            }
            if(!this.$helper.isJSON5(this.form.json)){
                this.$Message.info('JSON5格式异常')
                console.log(params.json);
                // return ;
            }
            
            this.$api.saveApijson(params).then(res=>{
                if(res.code==1){
                    this.$Message.success('保存成功')
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.json5{

}
</style>