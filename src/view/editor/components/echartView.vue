<template>
    <div class="center">
        <v-chart ref="chart" v-if="option.series && option.series.length" :option="option" :autoresize="true" @datazoom="datazoom" @legendselectchanged="legendselectchanged" v-on="$listeners" :key="uuid" />
        <span v-else class="empty">暂无数据</span>
    </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    computed: {},
    watch: {
        options: {
            deep: true,
            handler() {
                this.init();
            },
        },
    },
    data() {
        return {
            option: {},
            defaultOption: {},
            uuid: "",
            key: '',
        };
    },
    mounted() { },
    methods: {
        init() {
            this.uuid = uuidv4();
            let option = {
                ...this.defaultOption,
                ...this.options,
            };
            this.option = option;
            console.log(JSON.stringify(this.option));
            this.$nextTick(() => {
                this.chart = this.$refs.chart
            })

        },
        legendselectchanged(e) {
            let arr = [];
            for (let i in e.selected) {
                if (!e.selected[i]) {
                    arr.push(i);
                }
            }
            this.delLegend = arr;
            this.$emit("getTowMax", this.start, this.end, this.delLegend);
        },
        datazoom(e) {
            let length =
                this.options.xAxis &&
                this.options.xAxis.data &&
                this.options.xAxis.data.length;
            if (length) {
                //鼠标滚动没有返回start,end
                if (e.start && e.end) {
                    this.start = (length * (e.start / 100)).toFixed(0) * 1;
                    this.end = (length * (e.end / 100)).toFixed(0) * 1;
                }
            }
            this.$emit("getTowMax", this.start, this.end, this.delLegend);
        },
    },
};
</script>

<style lang="scss" scoped>
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .empty {
        color: #999;
    }
}
</style>
