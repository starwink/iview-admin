<template>
    <Poptip v-model="show" width="180px">
        <slot></slot>
        <div slot="title"><div>快捷新增单词</div></div>
        <div slot="content">
            <div>
                <Form :model="form" ref="form"  :label-width="56" @submit.native.prevent  @keydown.native.enter.prevent="save">
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="单词：" prop="text">
                                <Input v-model.trim="form.text"  placeholder="add,code,egg" maxlength="50"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div> 
            <div class="buttons">
                <Button @click="reset">重置</Button>
                <Button @click="save" type="primary">保存</Button>
            </div>
            
        </div>
    </Poptip>
</template>
<style lang="scss" scoped>
.buttons{
    display: flex;
    justify-content: space-between;
}
</style>
<script>

export default {
    data() {
        return {
            show: false,
            form:{
                text:'',
            }
        }
    },
    methods: {
        init() {
            Object.assign(this.$data, this.$options.data());
        },
        reset(){
            let od=this.$options.data().form;
            Object.assign(this.$data.form,od);
        },
        close() {
            this.show = false;
        },
        save(){
            this.$api.addSayDictByBatch(this.form).then(res=>{
                if(res.code==0){
                    // this.$Message.error(res.message)
                    return ;
                }
                this.$emit('save');
                this.$Message.success('新增成功:'+res.object.toString())
            },err=>{

            })
        }
    }
}
</script>