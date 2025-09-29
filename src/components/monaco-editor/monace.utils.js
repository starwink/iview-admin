export const sleep = function (ms = 1000) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


export const isMacOS = /macintosh|mac os x/i.test(navigator.userAgent)
export const isWindows = /win64|win32|wow64|wow32/i.test(navigator.userAgent)
export const isOtherOS = !isMacOS && !isWindows

export const Escape = 'Escape'
export const Ctrl = 'Ctrl'
export const Meta = 'Meta'
export const Cmd = 'Cmd'
export const Win = 'Win'
export const CtrlCmd = 'CtrlCmd'
export const Alt = 'Alt'
export const Space = 'Space'
export const Shift = 'Shift'
export const BracketLeft = 'BracketLeft'
export const BracketRight = 'BracketRight'
export const LeftClick = 0
export const Tab = 'Tab'

const keywordLabel = {
    CMD: '⌘',
    WIN: 'Win',
    CTRLCMD: isMacOS ? '⌘' : 'Ctrl',
    ALT: isMacOS ? '⌥' : 'Alt',
    CTRL: isMacOS ? '⌃' : 'Ctrl',
    SHIFT: isMacOS ? '⇧' : 'Shift',
    META: isMacOS ? '⌘' : isWindows ? 'Win' : 'Meta',
    BRACKETLEFT: '[',
    BRACKETRIGHT: ']',
    PERIOD: '.',
    TAB: 'Tab',
    ESCAPE: 'Esc',
    ARROWUP: '↑',
    ARROWDOWN: '↓',
    ARROWLEFT: '←',
    ARROWRIGHT: '→',
    UP: '↑',
    DOWN: '↓',
    LEFT: '←',
    RIGHT: '→',
}
//   [key.toString().toUpperCase()]

export function getKeyLabel(key = '') {
    return keywordLabel[key.toString().toUpperCase()]
}

