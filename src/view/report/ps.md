# 外部参数
params

## params 外部参数
从外部获取的参数内容,都存放在params,主要解决在部分图表编写时,需要外部数据的引用;
```js
console.log(params,'ht32est')
option={
    "columns": [
        {
            "title": "Nam2e",
            "key": "name"
        },
        {
            "title": "Age",
            "key": "age"
        },
        {
            "title": "Address",
            "key": "address"
        }
    ],
    "data": [
        {
            "name": "John Brow3n",
            "age": 18,
            "address": "New York No. 1 Lake Park",
            "date": "2016-10-03"
        },
        {
            "name": "Jim Green",
            "age": 24,
            "address": "London No. 1 Lake Park",
            "date": "2016-10-01"
        },
        {
            "name": "Joe Black",
            "age": 30,
            "address": "Sydney No. 1 Lake Park",
            "date": "2016-10-02"
        },
        {
            "name": "Jon Snow",
            "age": 26,
            "address": "Ottawa No. 2 Lake Park",
            "date": "2016-10-04"
        }
    ]
}


option.data[2]=params.data[0];

let a=423;
console.log(option.data[2],'option.data[2]')
option.data[2].age=a+option.data[2].age
```


