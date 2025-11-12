import $helper from '@/libs/helper'
export default {
    extractKey: function (str) {
        // 匹配：双引号包围的字段名，后面紧跟冒号（前面可能有空格）
        const match = str.match(/"([^"]+)"\s*:/);
        if (match && match[1]) {
            return match[1]; // 返回双引号中的内容，也就是字段名
        }
        return null; // 如果没匹配到，返回 null
    },
    countDots(str) {
        return str.split('.').length - 1;
      },
    getJsonPaths(obj={}, parentPath = '$', result = []) {
        if (typeof obj == 'string' && $helper.isJSON(obj)) {
            console.log('gjp',obj)
            obj = $helper.getJSONByStr(obj);
        }
        if (obj === null || typeof obj !== 'object') {
            result.push(parentPath);
            return result;
        }

        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                this.getJsonPaths(item, `${parentPath}[${index}]`, result);
            });
        } else {
            Object.keys(obj).forEach(key => {
                this.getJsonPaths(obj[key], `${parentPath}.${key}`, result);
            });
        }

        return result;
    }
}