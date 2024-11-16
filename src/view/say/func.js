export default {
    //洗牌函数
    shuffleAndSplit: function (data, num = 2,randomType=true) {
        let arr=JSON.parse(JSON.stringify(data))

        // 洗牌算法：Fisher-Yates shuffle
        if(randomType){
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // 随机选择一个索引
                [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换元素
            }
        }
        

        // 将打乱后的数组分成num:3组
        const groupSize = Math.ceil(arr.length / num); // 每组的大小，确保不漏掉元素
        const groups = [];

        for (let i = 0; i < num; i++) {
            groups.push(arr.slice(i * groupSize, (i + 1) * groupSize));
        }

        return groups;
    },
    //按希望的数据量返回
    getRandomdList(list=[],maxLen=20,randomType=true){
        let len=list.length;
        let spLen=Math.ceil(len/maxLen);
        let data=this.shuffleAndSplit(list,spLen,randomType)
        return data[0];
    }

    
}