import { Dexie } from 'dexie';
//用于日志异常信息保存
export default class dbTheme {
    constructor(dbName = 'logs') {
        this.db = new Dexie(dbName);
        this.db.version(1).stores({
            list: '++id,name,api,jsonstr,time'
        })
        this.table = this.db.list;
    }

    async resetDb(){
        await this.table.clear();
        await this.db.delete()
        await this.db.open()
    }
    delOldData(days = 7) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        this.table.where('time').below(cutoffDate.getTime()).delete();

    }

    add(name = '', api = '', val = '') {
        return new Promise((res, rej) => {
            try {
                let time=new Date().getTime()
                this.table.add({ name: name,api:api, jsonstr: val,time:time }).then(item => {
                    res({ id: item })
                })

            } catch (err) {
                rej(err)
            }
        })
    }


    getList(page = 1, pageSize = 10) {
        //不支持模糊查询,多字段的查询看示例,还是查出相关所有数据后,在js循环来push出一个新数组更加的灵活
        return new Promise((res, rej) => {
            try {
                this.table.count().then(count => {
                    this.table.orderBy('time')
                        .reverse()
                        .offset((page - 1) * pageSize)
                        .limit(pageSize)
                        .toArray().then(list => {
                            res({ list, count })
                        })
                })
            } catch (err) {
                rej({ err: err })
            }
        })

    }


}


