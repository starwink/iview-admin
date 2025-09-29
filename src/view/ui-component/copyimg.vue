<template>
    <div class="copyimg">
        <div  id="paste"></div>
        <div id="preview"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            form:{
                
            }
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            
        },
        pushImg(formData){
            this.$api.pushBedImg(formData)
        }

    },
    mounted(){
        let that=this;
        document.addEventListener('paste', function(event) {
            const items = event.clipboardData.items;
            console.log('iiis',items)
            for (let item of items) {
                if (item.type.includes('image')) {
                    const blob = item.getAsFile();
                    console.log('bbb',blob)
                    // 预览图片
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(blob);
                    document.getElementById('preview').appendChild(img);
                    // 上传
                    const formData = new FormData();
                    formData.append('image', blob);
                    console.log('form',formData)
                    console.log('that',that.pushImg)
                    that.pushImg(formData)
                    // that.$api.pushBedImg(formData)
                    // fetch('/upload', { method: 'POST', body: formData });
                }
            }
        });
    }
}
</script>
<style lang="scss" scoped>
.copyimg{
    background-color: #fafafa;
    width:100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;;
    #paste{
        width:50%;
    }
    #preview{
        flex: 1;
        background-color: #8af;
    }
}
</style>