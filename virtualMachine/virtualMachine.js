WScript.Echo("welcome to interpreter! All documentaion in vm_documentation.txt");
if (WScript.Arguments.length === 0) {
    WScript.Echo("please set your program's filename in an argument!"); //���� �� ����� ���� ���������
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
        var memory = new Array(); //����� ������
        var link; //������� "����������", � ������� ���������� ID ����� ��� �� ������
        var isnum = /^-?[0-9]+$/;
        while (!f.AtEndOfStream) { //������ ��������� � ������
            var t = f.ReadLine();
            memory = memory.concat(t.split(' '));
        }
        var ip = 0; //������� IP
        while (true) { //���� ����������
            switch (memory[ip]) { //������� ����� �������� ��������� �������
                case 'input' : //���� ������ � ������ �� StdIn
                    memory[memory[ip + 1]] = WScript.StdIn.ReadLine();
                    if (isnum.test(memory[memory[ip + 1]]) === 0) {
                        WScript.Echo('not an int or not f number'); //��������, �������� �� ��������� ������ ������
                        WScript.Quit();
                    }
                    else {
                        memory[memory[ip + 1]] = parseInt(memory[memory[ip + 1]]);
                    }
                    ip++;
                    break;
                case 'output' : //����� � StdOut �� ������ ������
                    WScript.Echo(memory[memory[ip + 1]]);
                    ip++;
                    break;
                case 'plus' : //��������
                    memory[memory[ip + 3]] = parseInt(memory[memory[ip + 1]]) + parseInt(memory[memory[ip + 2]]);
                    ip += 3;
                    break;
                case 'minus' : //���������
                    memory[memory[ip + 3]] = parseInt(memory[memory[ip + 1]]) - parseInt(memory[memory[ip + 2]]);
                    ip += 3;
                    break;
                case 'divide' : //�������
                    memory[memory[ip + 3]] = parseInt(memory[memory[ip + 1]]) / parseInt(memory[memory[ip + 2]]);
                    ip += 3;
                    break;
                case 'multiply' : //���������
                    memory[memory[ip + 3]] = parseInt(memory[memory[ip + 1]]) * parseInt(memory[memory[ip + 2]]);
                    ip += 3;
                    break;
                case 'goto' : //����������� ������� �� ����� � ������������ ID
                    link = memory[ip + 1];
                    ip = 0;
                    while ((memory[ip + 1] !== "link") || (memory[ip + 2] !== link)) {
                        ip++;
                    }
                    ip += 2;
                    break;
                case 'quit' : //����� �� ���������
                    WScript.Quit();
                    break;
                case 'write' : //��������� � ������������ ������ ������ ������������� �����
                    memory[memory[ip + 1]] = memory[ip + 2];
                    ip += 2;
                    break;
                case 'equal' : //�������� ������� ��� x=y
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
                case 'less' : //�������� ������� ��� x<y
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
                case 'more' : //�������� ������� ��� x>y
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
                case 'abs' : //������ �����
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