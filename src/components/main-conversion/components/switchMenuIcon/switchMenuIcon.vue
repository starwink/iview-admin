<template>
    <div @click="emitClick" class="switchMenuIcon" :class="collapsed?'':''">
        <eIcon v-if="collapsed" size="20" name="icon:zhankailie"/>
        <eIcon v-else size="20" name="icon:shouqilie"/>
    </div>
</template>

<script>
import eIcon from '_c/eIcon'
export default {
    props:{
        collapsed:Boolean,
    },
     components: {
    eIcon
  },
    methods:{
        emitClick(){
            this.$emit('click');
        }
    }
}
</script>
<style lang="scss" scoped>
.switchMenuIcon{
    height: 32px;
    line-height: 32px;
    text-align: center;
    width: 100%;
    cursor: pointer;
    border-top: solid 1px #eee;
    &:hover{
        color:var(--ivu-primary-color);
    }
}
</style>