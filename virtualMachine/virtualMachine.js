WScript.Echo("welcome to interpreter! All documentaion in vm_documentation.txt");
if (WScript.Arguments.length === 0) {
    WScript.Echo("please set your program's filename in an argument!"); //если не задан файл программы
}
else {
    if (WScript.Arguments(0) === "/?") {
        var p = new ActiveXObject("Scripting.FileSystemObject");
        var f = p.OpenTextFile("vm_documentation.txt");
        while (!f.AtEndOfStream) {
            WScript.Echo(f.ReadLine());
        }
    }
    else {
        var p = new ActiveXObject("Scripting.FileSystemObject");
        var f = p.OpenTextFile(p.Arguments(0));
        var memory = new Array(); //якобы память
        var link; //регистр "процессора", в который помещается ID метки при ее поиске
        var isnum = /^-?[0-9]+$/;
        while (!f.AtEndOfStream) { //чтение программы в память
            var t = f.ReadLine();
            memory = memory.concat(t.split(' '));
        }
        var ip = 0; //регистр IP
        while (true) { //цикл процессора
            switch (memory[ip]) { //попытка найти знакомую процесору команду
                case 'input' : //ввод данных в память из StdIn
                    memory[memory[ip + 1]] = WScript.StdIn.ReadLine();
                    if (isnum.test(memory[memory[ip + 1]]) === 0) {
                        WScript.Echo('not an int or not f number'); //проверка, являются ли введенные данные числом
                        WScript.Quit();
                    }
                    else {
                        memory[memory[ip + 1]] = parseInt(memory[memory[ip + 1]]);
                    }
                    ip++;
                    break;
                case 'output' : //вывод в StdOut из ячейки памяти
                    WScript.Echo(memory[memory[ip + 1]]);
                    ip++;
                    break;
                case 'plus' : //сложение
                    memory[memory[ip + 3]] = parseInt(memory[memory[ip + 1]]) + parseInt(memory[memory[ip + 2]]);
                    ip += 3;
                    break;
                case 'minus' : //вычитание
                    memory[memory[ip + 3]] = parseInt(memory[memory[ip + 1]]) - parseInt(memory[memory[ip + 2]]);
                    ip += 3;
                    break;
                case 'divide' : //деление
                    memory[memory[ip + 3]] = parseInt(memory[memory[ip + 1]]) / parseInt(memory[memory[ip + 2]]);
                    ip += 3;
                    break;
                case 'multiply' : //умножение
                    memory[memory[ip + 3]] = parseInt(memory[memory[ip + 1]]) * parseInt(memory[memory[ip + 2]]);
                    ip += 3;
                    break;
                case 'goto' : //безусловный перезод на метку с определенным ID
                    link = memory[ip + 1];
                    ip = 0;
                    while ((memory[ip + 1] !== "link") || (memory[ip + 2] !== link)) {
                        ip++;
                    }
                    ip += 2;
                    break;
                case 'quit' : //выход из программы
                    WScript.Quit();
                    break;
                case 'write' : //помещение в определенную ячейку памяти определенного числа
                    memory[memory[ip + 1]] = memory[ip + 2];
                    ip += 2;
                    break;
                case 'equal' : //условный переход при x=y
                    if (memory[memory[ip + 1]] === memory[memory[ip + 2]]) {
                        link = memory[ip + 3];
                        ip = 0;
                        while ((memory[ip + 1] !== "link") || (memory[ip + 2] !== link)) {
                            ip++;
                        }
                        ip += 2;
                    }
                    else {
                        ip += 3;
                    }
                    break;
                case 'less' : //условный переход при x<y
                    if (memory[memory[ip + 1]] < memory[memory[ip + 2]]) {
                        link = memory[ip + 3];
                        ip = 0;
                        while ((memory[ip + 1] !== "link") || (memory[ip + 2] !== link)) {
                            ip++;
                        }
                        ip += 2;
                    }
                    else {
                        ip += 3;
                    }
                    break;
                case 'more' : //условный переход при x>y
                    if (memory[memory[ip + 1]] > memory[memory[ip + 2]]) {
                        link = memory[ip + 3];
                        ip = 0;
                        while ((memory[ip + 1] !== "link") || (memory[ip + 2] !== link)) {
                            ip++;
                        }
                        ip += 2;
                    }
                    else {
                        ip += 3;
                    }
                    break;
                case 'abs' : //модуль числа
                    memory[memory[ip + 2]] = Math.abs(memory[memory[ip + 1]]);
                    ip += 2;
                    break;
            }
            if (ip - memory.length === 1) {
                ip = 0;
            }
            else {
                ip++;
            }
        }
    }
}