// 示例使用
const expression = "0+1+2*3-4/2";
// const expression = "B1+B2*A3-G1/2";
const tree = parseExpression(expression);
console.log(tree);

function parseExpression(expr) {
    // 正则表达式匹配运算符优先级
    const OPERATORS = /^(\*|\/|\+|\-|\(|\))/;
    // 正则表达式匹配变量或数字
    const VARIABLE = /^([a-zA-Z_][a-zA-Z0-9_]*|[0-9]+)/;
 
    // 辅助函数：将匹配结果转换为树节点
    function createNode(match, type) {
        return { type, value: match[0] };
    }
 
    // 辅助函数：将中缀表达式转换为后缀表达式
    function shuntingYard(tokens) {
        let outputQueue = []; // 输出队列
        let operatorStack = []; // 运算符栈
 
        for (let token of tokens) {
            if (VARIABLE.test(token)) {
                outputQueue.push(createNode(token, 'variable'));
            } else if (OPERATORS.test(token)) {
                let operator = token[0];
                switch (operator) {
                    case '(':
                        operatorStack.push(createNode(token, 'group'));
                        break;
                    case ')':
                        while (operatorStack[operatorStack.length - 1].value !== '(') {
                            outputQueue.push(operatorStack.pop());
                        }
                        operatorStack.pop(); // 弹出 '('
                        break;
                    default:
                        while (operatorStack.length && operatorStack[operatorStack.length - 1].value !== '(') {
                            const prec1 = getPrecedence(operatorStack[operatorStack.length - 1].value);
                            const prec2 = getPrecedence(token);
                            if (prec2 < prec1) {
                                outputQueue.push(operatorStack.pop());
                            } else {
                                break;
                            }
                        }
                        operatorStack.push(createNode(token, 'operator'));
                }
            }
        }
        while (operatorStack.length) {
            outputQueue.push(operatorStack.pop());
        }
        return outputQueue;
    }
 
    // 辅助函数：计算运算符的优先级
    function getPrecedence(op) {
        switch (op) {
            case '*':
            case '/':
            
                return 2;
            case '+':
            case '-':
                return 1;
            default:
                return 0; // 对于括号和其他不是运算符的字符
        }
    }
 
    // 将表达式分解为单个字符的数组
    let tokens = expr.split('');
    // 转换为后缀表达式
    let rpn = shuntingYard(tokens);
 
    // 辅助函数：构造表达式树
    function buildTree(tokens) {
        let stack = [];
        for (let token of tokens) {
            switch (token.type) {
                case 'variable':
                case 'number':
                    stack.push(token);
                    break;
                case 'operator':
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push({
                        type: 'operator',
                        value: token.value,
                        left: left,
                        right: right
                    });
                    break;
                case 'group':
                    // 这里假设我们只处理没有嵌套括号的情况
                    break;
            }
        }
        return stack[0];
    }
 
    // 使用后缀表达式构造表达式树
    return buildTree(rpn);
}
 
