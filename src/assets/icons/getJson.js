const fs = require('fs');
const path = require('path');

const readline = require('readline');

/**
 * 逐行解析CSS文件提取图标信息
 * @param {string} cssFilePath - CSS文件路径
 * @param {string} outputPath - JSON输出路径
 */
function extractIconsLineByLine(cssFilePath, outputPath = null) {
    return new Promise((resolve, reject) => {
        const icons = {},iconList=[];
        let currentClassName = null;
        
        const readStream = fs.createReadStream(cssFilePath);
        const rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity
        });
        
        rl.on('line', (line) => {
            const trimmedLine = line.trim();
            
            // 检测类名行
            const classMatch = trimmedLine.match(/\.(icon-[^:]+):before\s*\{/);
            if (classMatch) {
                currentClassName = classMatch[1];
                return;
            }
            
            // 检测content行
            if (currentClassName && trimmedLine.includes('content')) {
                const contentMatch = trimmedLine.match(/content:\s*["']\\([^"']+)["'];/);
                if (contentMatch) {
                    const unicode = contentMatch[1];
                    iconList.push(currentClassName)
                    icons[currentClassName] = {
                        className: currentClassName,
                        unicode: unicode,
                        unicodeDecimal: parseInt(unicode, 16),
                        cssSelector: `.${currentClassName}:before`
                    };
                    currentClassName = null;
                }
            }
            
            // 如果遇到结束大括号，重置当前类名
            if (trimmedLine === '}') {
                currentClassName = null;
            }
        });
        
        rl.on('close', () => {
            console.log(`成功提取 ${Object.keys(icons).length} 个图标`);
            
            if (outputPath) {
                let fileBody={
                    list:iconList,
                    icons:icons,
                }
                const jsonContent = JSON.stringify(fileBody, null, 2);
                const file=`export default ${jsonContent}`
                fs.writeFileSync(outputPath, file, 'utf8');
                console.log(`图标数据已保存到: ${outputPath}`);
            }
            
            resolve(icons);
        });
        
        rl.on('error', (error) => {
            reject(error);
        });
    });
}

// 使用示例（异步方式）
async function main() {
    try {
        const cssFile = path.resolve(__dirname, 'iconfont.css');
        const jsonFile = path.resolve(__dirname, 'iconfont.json.js');
        
        const icons = await extractIconsLineByLine(cssFile, jsonFile);
        // console.log('提取的图标数据:', icons);
    } catch (error) {
        console.error('处理过程中出错:', error);
    }
}

main();
