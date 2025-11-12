//vue上实现随机循环回调函数

/* ```vue
let rrc=new roundRobinClass(this.option.list.length);

rrc.runmain((i)=>{
    console.log(i,this.option.list[i],new Date(),new Date().getTime());
    rrc.setNum(rrc.getRandomNum(1,5))
})
``` */
export default class roundRobinClass {
    constructor(max=0) {
        this.main = null;
        this.max=max;
        this.num=1;
    }
    getRandomNum(min=0,max=1000){
        let randomIntInRange = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomIntInRange
    }
    setNum(i){
        this.num=i;
    }
    runmain(cb){
        console.log('runmain')
        let i=0;
        this.main=setInterval(() => {
            this.num--;
            if(this.num==0){
                if(i<this.max){
                    cb(i)
                }else{
                    clearInterval(this.main)
                }
                i++;
            }

        }, this.getRandomNum(500,1000));
        // }, 1000);
    }
}
