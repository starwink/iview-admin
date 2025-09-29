export default {
    //年份获取对应生肖
    getZodiacByYear: function (year) {
        // const zodiacs = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"];
        // return zodiacs[year % 12];
        const zodiacs = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        const startYear = 1900; // 1900年是鼠年
        const index = (year - startYear) % 12;
        return zodiacs[index >= 0 ? index : index + 12];
    },
    getZodiacByAge:function(age) {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - age;
        return getZodiacByYear(birthYear);
    }
    

}