//cscript reversePolishEntry.js /opz
var args = WScript.Arguments;
function priority(x) {
    switch (x) {
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

var q = new ActiveXObject("Scripting.FileSystemObject");
if (!q.FileExists('input.txt')) {  //Читаем файл
    WScript.Echo('NO input.txt!');
    WScript.Quit(0);
}
var p = q.OpenTextFile('input.txt');
var inp = p.ReadLine(); //Входная строка
var output = ""; //Выходная строка (выражение в суффиксном виде)
stack = new Array(); //"Стек"
var inp = inp.replace(",", "."); //Меняем запятую на точки
for (var i = 0; i < inp.length; i++) { //Смотрим каждый символ
    if (inp.charAt(i) !== ' ') { //Пропускаем пробел
        if ((inp.charAt(i) >= '0' && inp.charAt(i) < '9')) {//Число
            output += "'";
            while ((inp.charAt(i) >= '0' && inp.charAt(i) < '9') || (inp.charAt(i) === '.') || (inp.charAt(i) === ',')) {
                output += inp.charAt(i);
                i++;
            }
            i--;
            output += "'";
        }
        else if (inp.charAt(i) === '(') { //Скобки
            stack.push('(');
        }
        else if (inp.charAt(i) === ')') {
            while (stack[stack.length - 1] !== '(') output += stack.pop();
            stack.pop();
        }
        else if (priority(inp.charAt(i)) > priority(stack[stack.length - 1])) { //Если операция
            stack.push(inp.charAt(i));
        }
        else {
            while (priority(inp.charAt(i)) <= priority(stack[stack.length - 1])){
                output += stack.pop();
            }
            stack.push(inp.charAt(i));
        }
    }
}
while (stack.length > 0) output += stack.pop();//Вываливаем все из стека
if (args.length > 0 && args(0) === '/opz') //Если надо вывести суффиксную форму
    WScript.Echo(output);
var stack = new Array();//Переопределяем стек
for (i = 0; i < output.length; i++) { //Смотрим каждый символ
    if (output.charAt(i) === "'") { //Если число
        i++;
        temp = '';
        while ((output.charAt(i) !== "'")) {
            temp += output.charAt(i);
            i++;
        }
        stack.push(temp);
    }
    else {
        op2 = stack.pop(); //Берем числа для операции
        op1 = stack.pop();
        if (output.charAt(i) !== '^'){
            var op = 'parseFloat(' + op1 + ')' + output.charAt(i) + 'parseFloat(' + op2 + ')';
        }
        else{
            op = 'Math.pow(' + op1 + ',' + op2 + ')';
        }
        stack.push(eval(op)); //Считаем и кладем в стек
    }
}

WScript.Echo(stack.pop()); //Выводим ответ
/*
function reversePolishNotation(input){
    for (var i = 0; ; ){
        var current = input[i];
        if (input.length === 1){
            return input[0];
        }
        if (!Number.isInteger(current)){
            input.splice(i - 2, 3, OperationGenerator(current)(input[i - 2], input[i -1]));
            i--;
            continue;
        }
        i++;
    }
}

function OperationGenerator(operator){
    switch (operator){
        case "+": return (x, y) => x + y;
        case "-": return (x, y) => x - y;
        case "*": return (x, y) => x * y;
        case "/": return (x, y) => x / y;
    }
}

if (args.length === 0) { //если не задано аргументов
    WScript.Echo("no arguments!");
}
else if (args(0) === "/outputTheEntry") {
    var p = new ActiveXObject("Scripting.FileSystemObject");
    if (!p.FileExists("input.txt")) { //есть ли файл ввода
        WScript.Echo("no input file!");
        WScript.Quit();
    }
    var f = p.OpenTextFile("input.txt", 1, true, 0);
    var inp1 = f.ReadAll();
    var inp = [1, 2, 3, "+", 2, "*", "-"]
    f.Close();
}
WScript.Echo(reversePolishNotation(inp));                  */