// cscript reversePolishEntry.js /outputTheEntry
p = new ActiveXObject("Scripting.FileSystemObject");
if (!p.FileExists('input.txt')) {  //читаем файл
    WScript.Echo('no input.txt!');
    WScript.Quit(0);
}
f = p.OpenTextFile('input.txt');
inp = f.ReadLine(); //входная строка
var reg = /[^0-9 \( \) \+ \- \* \/ \^ \s]+/;
if (reg.test(inp)) {
    WScript.Echo('wrong symbols!');
    WScript.Quit();
}
result = ""; //выходная строка (выражение в суффиксном виде)
stack = new Array(); //"стек"
inp = inp.replace(/,/g, "."); //меняем запятую на точки
for (var i = 0; i < inp.length; i++) { //смотрим каждый символ
    if (inp.charAt(i) !== ' ') { //пропускаем пробел
        if ((inp.charAt(i) >= '0' && inp.charAt(i) < '9')) {//число
            result += "'";
            while ((inp.charAt(i) >= '0' && inp.charAt(i) < '9') || (inp.charAt(i) === '.') || (inp.charAt(i) === ',')) {
                result += inp.charAt(i);
                i++;
            }
            i--;
            result += "'";
        }
        else if (inp.charAt(i) === '(') { //скобки
            stack.push('(');
        }
        else if (inp.charAt(i) === ')') {
            while (stack[stack.length - 1] !== '('){
                result += stack.pop();
            }
            stack.pop();
        }
        else if (priority(inp.charAt(i)) > priority(stack[stack.length - 1])){   //если операция
            stack.push(inp.charAt(i));
        }
        else {
            while (priority(inp.charAt(i)) <= priority(stack[stack.length - 1])){
                result += stack.pop();
            }
            stack.push(inp.charAt(i));
        }
    }
}
while (stack.length > 0){          //очищаем стек
    result += stack.pop();
}
if (WScript.Arguments.Length > 0 && WScript.Arguments(0) === '/outputTheEntry'){  //если надо вывести суффиксную форму
    WScript.Echo(result);
}
var stack = new Array(); //переопределяем стек
for (i = 0; i < result.length; i++) { //смотрим каждый символ
    if (result.charAt(i) === "'") { //если число
        i++;
        temp = '';
        while ((result.charAt(i) !== "'")) {
            temp += result.charAt(i);
            i++;
        }
        stack.push(temp);
    }
    else {
        op2 = stack.pop(); //берем числа для операции
        op1 = stack.pop();
        if (result.charAt(i) !== '^'){
            var op = 'parseFloat(' + op1 + ')' + result.charAt(i) + 'parseFloat(' + op2 + ')';
        }
        else{
            op = 'Math.pow(' + op1 + ',' + op2 + ')';
        }
        stack.push(eval(op)); //считаем и кладем в стек
    }
}
WScript.Echo(stack.pop()); //выводим ответ

function priority(a) {
    switch (a) {
        case '(' :
            return 0;
        case ')' :
            return 1;
        case '+' :
            return 2;
        case '-' :
            return 2;
        case '*' :
            return 3;
        case '/' :
            return 3;
        case '^' :
            return 4;
    }
    return -10;
}