<template>
    <div class="promod">
        <Button @click="htest">run</Button>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        htest(){
            console.log('rrr htest',window)
            window.windapplyHtestRun()
        }
    }
}
</script>