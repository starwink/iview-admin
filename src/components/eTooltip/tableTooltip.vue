<template>
    <span @mouseenter="onMouseEnter" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
        <slot></slot>
    </span>
</template>
<script>
export default {
    props: {
        text: "",
    },
    data() {
        return { tipDom: document.createElement("div") };
    },
    mounted() {

    },
    methods: {
        onMouseEnter(e) {
            this.tipDom = document.createElement("div")
            this.tipDom.style.position = "fixed";
            // this.tipDom.style.position = "absolute";
            this.tipDom.style.background = "#304156";
            this.tipDom.style.color = "#fff";
            this.tipDom.style.fontSize = "12px";
            this.tipDom.style.padding = "3px 7px";
            this.tipDom.style.pointerEvents = "none";
            this.tipDom.style.fontWeight = "bolder";
            this.tipDom.style.borderRadius = "4px";
            this.tipDom.style.border = "1px solid #999";
            this.tipDom.style.zIndex = 999;
            // this.tipDom.innerText = this.text;
            this.tipDom.innerHTML = this.text;
            this.tipDom.style.width = 'auto'
            e.target.appendChild(this.tipDom);
        },
        onMouseMove(e) {
            let offsetWidth = this.tipDom.offsetWidth;
            let offsetHeight = this.tipDom.offsetHeight;
            let maxWitdh = (window.innerWidth - 375) / 2;
            let maxHeight = window.innerHeight;
            if (offsetWidth > maxWitdh) {
                offsetWidth = maxWitdh;
            }
            if(!this.tipDom.style.initWitdh){ //解决数值时 宽度异常,会换行
                this.tipDom.style.initWitdh=1;
                offsetWidth+=4;
            }
            this.tipDom.style.width = `${offsetWidth}px`;

            this.tipDom.style.left = `${e.pageX + 5}px`;

            if (e.pageY + offsetHeight > maxHeight) {
                this.tipDom.style.top = `auto`;
                this.tipDom.style.bottom = `0px`;
            } else {
                this.tipDom.style.top = `${e.pageY + 8}px`;
                this.tipDom.style.bottom = `auto`;
            }
        },
        onMouseLeave(e) {
            e.target.removeChild(this.tipDom);
        },
    },
};
</script>
<style scoped lang="scss"></style>
