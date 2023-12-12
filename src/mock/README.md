# mockjs 参数文件
https://github.com/nuysoft/Mock/wiki

## 随机参数demo
```js
doCustomTimes(total, () => {
    tableData.push(Mock.mock({
        text: '@name',
        email: '@email',
        code_wb: '@name',
        code_binyin: '@phone',
        created_at: '@date',
        update_datetime: '@date',

        string: '@string(32)',
        datetime: '@datetime',
        cname: '@cname',
        time: '@time',
        date: '@date',
        img: "@image(16,'#FFF','#f1c','','htest')",
        img2: "@dataImage('48x48', 'ccch1')",
        // phone: /\d{5,10}/,
        phone: /(86-[1][3456789][0-9]{9}) | (86[1][3456789][0-9]{9})|([1][3456789][0-9]{9})/g,
        // phone: Mock.Random.( /\d{5,10}/)
    }))
})
```