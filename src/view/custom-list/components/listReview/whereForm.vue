<template>
    <div class="list-review-whereitem">
        <template v-for="(item,index) in searchParamsList">
            <Input  v-if="item.type=='searchBox'"  v-model="form[item.searchParam]" :placeholder="item.desc" maxlength="100" clearable class="form-input" style="width: 160px" />
            <Select v-if="item.type=='dropDownBox' && item.searchType=='单选'" v-model="form[item.searchParam]" filterable clearable :placeholder="item.desc" class="form-input" style="width: 160px">
                <Option v-for="(item,index) in options[item.searchParam]" :key="index" :value="item">{{item}}</Option>
            </Select>
            <Select v-if="item.type=='dropDownBox' && item.searchType=='多选'" :max-tag-count="1" multiple v-model="form[item.searchParam]" filterable clearable :placeholder="item.desc" class="form-input" style="width: 160px">
                <Option v-for="(item,index) in options[item.searchParam]" :key="index" :value="item">{{item}}</Option>
            </Select>

            <eDatePicker v-if="item.type=='timeBox' && item.searchType=='按天查询'"  v-model="form[item.searchParam]" :placeholder="item.desc" class="form-input"  style="width: 206px;vertical-align: middle;margin-bottom: 10px;margin-right: 10px;" appendToBody></eDatePicker>
            <eDatePickerByYearMonth v-if="item.type=='timeBox' && item.searchType=='按月查询'" v-model="form[item.searchParam]" :placeholder="item.desc" class="form-input"  style="width: 206px;vertical-align: middle;margin-bottom: 10px;margin-right: 10px;" appendToBody></eDatePickerByYearMonth>
            <eDatePickerByYear v-if="item.type=='timeBox' && item.searchType=='按年查询'" v-model="form[item.searchParam]" :placeholder="item.desc" class="form-input"  style="width: 206px;vertical-align: middle;margin-bottom: 10px;margin-right: 10px;" appendToBody></eDatePickerByYear>
            <eDatePickerByDatetime v-if="item.type=='timeBox' && item.searchType=='按小时查询'" v-model="form[item.searchParam]" :placeholder="item.desc" class="form-input"  style="width: 282px;vertical-align: middle;margin-bottom: 10px;margin-right: 10px;" appendToBody></eDatePickerByDatetime>
            
        </template>
        <Button v-if="searchParamsList.length>0" type="primary" style="margin-bottom: 10px;margin-right: 10px;" @click="search">查询</Button>
        <!-- <Button type="primary" style="margin-bottom: 10px;margin-right: 10px;" @click="down">下载</Button> -->
    </div>
</template>
<style lang="scss">
.list-review-whereitem{
    .ewell-input{
        &:hover{
            border-color:#13939e;
        }
    }
}

</style>
<style lang="scss" scoped>
.list-review-whereitem{
    text-align: left;
}
.form-input{
    margin-right: 10px;
    margin-bottom: 10px;
}

</style>
<script>
const dayjs = require('dayjs')
import eDatePickerByYear from "@/components/eDatePicker/year";
import eDatePickerByYearMonth from "@/components/eDatePicker/yearmonth";
import eDatePickerByDatetime from "@/components/eDatePicker/datetime";
import eDatePicker from "@/components/eDatePicker";
export default {
    components: {
        eDatePicker,
        eDatePickerByYear,
        eDatePickerByYearMonth,
        eDatePickerByDatetime,
    },
    data(){
        return {
            config:{},
            searchParamsList:[],
            form:{},
            options:{}
        }
    },
    methods: {
        init(config){
            Object.assign(this.$data, this.$options.data());
            this.config={...config}
            let searchParamsList=this.config.searchParamsList
            this.searchParamsList=searchParamsList
            let form={},options={};
            searchParamsList.map(res=>{
                if(res.type=='searchBox'){
                    form[res.searchParam]='';
                    options[res.searchParam]=[];
                }else if(res.type=='dropDownBox'){
                    if(res.searchType=='单选'){
                        form[res.searchParam]='';
                    }else{
                        form[res.searchParam]=[];
                    }
                    this.getOption(this.config.id,res.searchParam)
                }
            })
            this.$set(this,'form',form)
           
        },
        getOption(id,name){
            let params={id,name};
            this.$api.getCustomFieldsOptions(params).then(res=>{
                let list=[];
                this.$set(this.options,name,res.object)
            })
        },
        getParams(){
            let params=[];
            let searchParamsList=[...this.searchParamsList];
            let form={...this.form};
            searchParamsList.map(res=>{
                let valueObj={value:form[res.searchParam]};
                if(res.searchType=='多选'){
                    valueObj.value=valueObj.value.toString()
                }
                if(res.type=='timeBox'){
                    valueObj.value=''
                   
                    if(form[res.searchParam] && form[res.searchParam].length==2){
                        let  startTime=form[res.searchParam][0],endTime=form[res.searchParam][1];
                        if(res.searchType=='按天查询'){
                            valueObj.startTime=dayjs(startTime).format('YYYY-MM-DD 00:00:00')
                            valueObj.endTime=dayjs(endTime).format('YYYY-MM-DD 23:59:59');
                        }else if(res.searchType=='按月查询'){
                            valueObj.startTime=dayjs(startTime).startOf('month').format('YYYY-MM-DD 00:00:00');
                            valueObj.endTime=dayjs(endTime).endOf('month').format('YYYY-MM-DD 23:59:59');
                        }else if(res.searchType=='按年查询'){
                            valueObj.startTime=dayjs(startTime).startOf('year').format('YYYY-MM-DD 00:00:00');
                            valueObj.endTime=dayjs(endTime).endOf('year').format('YYYY-MM-DD 23:59:59');
                        }else if(res.searchType=='按小时查询'){
                            valueObj.startTime=dayjs(startTime).startOf('year').format('YYYY-MM-DD HH:00:00');
                            valueObj.endTime=dayjs(endTime).endOf('year').format('YYYY-MM-DD HH:59:59');
                        }
                        
                    }else{
                        valueObj.startTime=''
                        valueObj.endTime=''
                    }
                }

                params.push({...res,...valueObj})

            })
           return params
        },
        htest(){
            console.log(this.form,JSON.stringify(this.form),{...this.form});
        },
        search(){
            this.$emit('search');
        },
        down(){
            let params={
                currentPage:1,
                id:this.config.id,
                searchParamsList:this.getParams(),
                name:this.config.name
            }
            //院内端-用户定制化列表下载时使用院内的异步下载
            if(this.$route.name=='custom-user-list'){
                window.parent.postMessage(
                    {
                        cmd: "downCustomList",
                        params: JSON.stringify(params)
                    },
                    "*"
                );
            }else{
                this.$api.downLoadNewdataease(params,this.config.name)
            }
           

        }
    }
}

</script>