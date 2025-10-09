import { Dexie } from 'dexie';
//限制 如果在初始时查询存在明显的延迟(1s左右),视觉相关的数据还是通过localStorage 或 sessionStorage来实现吧
export default class dbTheme {
    constructor(dbName = 'iaf-theme') {
        this.db = new Dexie(dbName);
        this.db.version(1).stores({
            settings: '++id,name,value,jsonstr,time'
        })
    }
    get(name) {
        return new Promise((res, rej) => {
            try {
                this.db.settings.where('name').equals(name).first().then(item => {
                    res(item.value)
                })
            } catch (err) {
                rej(err)
            }
        })

    }
    getVal(name) {
        return new Promise((res, rej) => {
            try {
                this.db.settings.where('name').equals(name).first().then(item => {
                    res(item)
                })
            } catch (err) {
                rej(err)
            }
        })

    }
    addVal(name, val = '') {
        return new Promise((res, rej) => {
            try {
                this.db.settings.add({ name: name, val: val }).then(item => {
                    res({ id: item })
                })

            } catch (err) {
                rej(err)
            }
        })
    }
    async setVal(name, val = '') {
        return new Promise((res, rej) => {
            try {
                this.getVal(name).then(obj=>{
                    if (obj.name) {
                        obj.value = val
                        obj.time=new Date().getTime()
                        this.db.settings.put(obj).then(item => {
                            res(item)
                        })
    
                    } else {
                        obj = {
                            name:name,
                            value:val,
                            time:new Date().getTime()
                        }
                        this.db.settings.add(obj).then(id => {
                            obj.id=id
                            res(obj)
                        })
                    }
                })
                
            } catch (err) {
                rej({ err: err })
            }
        })

    }
    getVal(name) {
        return new Promise((res, rej) => {
            try {
                this.db.settings.where('name').equals(name).first().then(item => {
                    res(item || {})
                })

            } catch (err) {
                rej({ err: err })
            }
        })
    }
    delVal(name){
        this.getVal(name).then(item=>{
            if(item.id){
                this.db.settings.delete(item.id)
            }
        })
    }
    getAll(){
        return new Promise((res, rej) => {
            try {
                this.db.settings.toArray().then(arr=>{
                    res(arr)
                })
            } catch (err) {
                rej({ err: err })
            }
        })
    }
    getWhereList(name,page=1,pageSize=10){
        //不支持模糊查询,多字段的查询看示例,还是查出相关所有数据后,在js循环来push出一个新数组更加的灵活
        return new Promise((res, rej) => {
            try {
                this.db.settings.where('name').equals(name)
                .offset((page - 1) * pageSize)
                .limit(pageSize)
                .toArray().then(arr=>{
                    res(arr)
                })
            } catch (err) {
                rej({ err: err })
            }
        })
        
    }


}


