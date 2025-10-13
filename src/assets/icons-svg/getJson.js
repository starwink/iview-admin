const fs = require('fs').promises;
const path = require('path');

async function getSvgFilesAsync(directoryPath, outputFilePath) {
    try {
        // 异步读取目录内容
        const files = await fs.readdir(directoryPath);
        
        // 过滤出.svg文件
        const svgFiles = files.filter(file => path.extname(file).toLowerCase() === '.svg');
        
        // 转换为JSON格式
        const jsonData = JSON.stringify(svgFiles, null, 2);
        
        const file=`export default ${jsonData}`
        // 异步保存到指定文件
        await fs.writeFile(outputFilePath, file);
        
        console.log(`成功找到 ${svgFiles.length} 个SVG文件，已保存到 ${outputFilePath}`);
        return svgFiles;
    } catch (err) {
        console.error('操作失败:', err.message);
        throw err;
    }
}

// 使用示例（使用async/await）
(async () => {
    // const directoryPath = path.resolve(__dirname, './icons-svg');;
    const directoryPath = __dirname;;

    // const cssFile = path.resolve(__dirname, 'iconfont.css');
    // const outputFilePath = './svg-files.json';
    const outputFilePath = './src/assets/icons-svg/svg-files.json.js';
    // const outputFilePath =path.resolve(__dirname,'./src/assets/icons-svg/svg-files.json') ;


    console.log('directoryPath',directoryPath)
    
    await getSvgFilesAsync(directoryPath, outputFilePath);
})();




// getSvgFilesRobust(__dirname,__dirname)