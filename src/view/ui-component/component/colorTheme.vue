<template>
    <div class="colorTheme">
        <Button @click="resetTheme">默认:{{form.def}}</Button>
        <Button @click="setTheme(form.demo)">demo:{{form.demo}}</Button>
        <ColorPicker v-model="form.color"  @on-change="setTheme" @on-active-change="setTheme" transfer />

        <div>
            <p>ivu-extends 扩展组件 InputNumberUnit</p>
            <InputNumberUnit
                :max="100"
                :min="-10"
                size="small"
                unit="$"
                unit-placement="start"
                v-model="form.num"
            />
            <p style="width:140px;height:82px;">ivu-extends 扩展组件 TooltipText,出现省略后显示tooltip


                <TooltipText>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</TooltipText>
            </p>
                <TooltipText>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</TooltipText>
            

        </div>
        

    </div>
</template>
<script>
import { genThemeColor,InputNumberUnit,TooltipText } from 'ivu-extends'

export default {
     components: {
        InputNumberUnit,TooltipText
     },
    data(){
        return {
            form:{
                def:'#ff4adb',
                demo:'#5e35b1',
                color:'#ff4adb',
                num:31,
                selv:'a'

            },
            opitons:{
                selectList:[
                    {id:1,name:'a',group:'zm'},
                    {id:2,name:'b',group:'zm'},
                    {id:3,name:'c',group:'zm'},
                    {id:4,name:'汉',group:'hz'},
                    {id:4,name:'汉',group:'hz'},
                ]
            }
        }
    },
    methods:{
        init(){
            Object.assign(this.data, this.options.data());
            
        },
        setTheme(color){
            if(color){
                this.form.color=color;
            }
            genThemeColor(this.form.color);
        },
        
        resetTheme(){
            console.log('resetTheme')
            this.form.color=this.form.def;
            this.setTheme()
        }
    },
}
</script>
<style lang="scss" scoped>
.colorTheme{

}
</style>