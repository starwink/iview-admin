<template>
    <Poptip v-model="show"  width="180px">
        <slot></slot>
        <div slot="title"><i>配置</i></div>
        <div slot="content">
            <div>
                <Form :model="form" ref="form"  :label-width="56">
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="标签：" prop="tag">
                                <Input v-model.trim="form.tag"  placeholder="js,css,html" maxlength="50"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="数量：" prop="num">
                                <Input v-model.trim="form.num"  placeholder="期望个数" maxlength="50"></Input>
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
                tag:'',
                num:20
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
            this.$emit('save',this.form.tag,this.form.num)
        }
    }
}
</script>