import { Color, fade, shade, tint } from './color-functions'
import theme_vars from './theme.vars.json' //todo 没有按主题切换前的变量
import theme_switch_vars from './switch.vars.json'
function toRgb(color) {
    const { alpha, rgb } = color
    const [r, g, b] = rgb.map(v => parseInt(v, 10))
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const rootThemeName='data-vxe-ui-theme'
function isDynamicThemeAdded(themeName) {
    const styles = document.querySelectorAll('style');
    for (let style of styles) {
        if (style.textContent.includes(`[${rootThemeName}="${themeName}"]`)) {
            return true;
        }
    }
    return false;
}

// 动态添加新主题
function addCustomTheme(themeName='light', fontColor, backgroundColor,colors={}) {
    // let themeValue=getTheme();

    let uiVals='';
    let themeC=`[${rootThemeName}="${themeName}"]`

    
    if(colors && Object.keys(colors).length>0){
        uiVals=getUiColor(colors)
        themeC=':root'
    }
    let switchVars=''
    if(themeName){
        switchVars=getUiColor(theme_switch_vars[themeName] || [])

    }
    
    const style = document.createElement('style');
    style.textContent = `
        ${themeC} {
            --theme-color: ${fontColor};
            --theme-bg-color: ${backgroundColor};
            ${uiVals};
            ${switchVars}
        }
    `;
    console.log('themeC',themeC)
    
    document.head.appendChild(style);
}

function getUiColor(colors){
    let styleArr=[];
    Object.keys(colors).map(key=>{
        styleArr.push(`${key}:${colors[key]}`)
    })
    return styleArr.join(';')

}

// 切换主题
function switchTheme(themeName) {
    document.documentElement.setAttribute(rootThemeName, themeName);
}

function getTheme(){
    return document.documentElement.getAttribute(rootThemeName);
}

function hasTheme(){
    return document.documentElement.hasAttribute(rootThemeName) 
}

/**
 * 生成主题色
 * @param {string} themeColor 十六进制的颜色值
 * @returns
 */
export default function genThemeColor(themeColor) {
    const color = new Color(themeColor.slice(1))

    const linkHoverColor = tint(color, { value: 20 })
    const linkActiveColor = shade(color, { value: 5 })
    const selectedColor = fade(color, { value: 90 })
    const inputShadowColor = fade(color, { value: 20 })
    const treeTitleHoverColor = tint(color, { value: 90 })
    const treeTitleSelectedColor = tint(color, { value: 80 })
    const menuActiveColor = tint(color, { value: 95 })
    const tableHoverBgColor = tint(color, { value: 90 })
    const datePickerHoverBgColor = tint(color, { value: 85 })

    var colors = {
        '--ivu-primary-color': themeColor,
        '--ivu-link-hover-color': toRgb(linkHoverColor),
        '--ivu-link-active-color-color': toRgb(linkActiveColor),
        '--ivu-selected-color': toRgb(selectedColor),
        '--ivu-input-shadow-color': toRgb(inputShadowColor),
        '--ivu-tree-title-hover-color': toRgb(treeTitleHoverColor),
        '--ivu-tree-title-selected-color': toRgb(treeTitleSelectedColor),
        '--ivu-menu-active-color': toRgb(menuActiveColor),
        '--ivu-table-hover-bg-color': toRgb(tableHoverBgColor),
        '--ivu-date-picker-hover-bg-color': toRgb(datePickerHoverBgColor)

    }

    colors = { ...colors, ...theme_vars };
  
    addCustomTheme('light','#515a6e','#fff',colors)
    addCustomTheme('dark','#ffffffe6','#232324')
    // 设置主题色 CSS 变量
    // Object.keys(colors).forEach(key => {
    //     document.body.style.setProperty(key, colors[key])
    // })
}
