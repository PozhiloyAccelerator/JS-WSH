//%DebugArguments%=/jump /encode
//cscript rle-enc-dec.js /escape или /jump /encode или /decode
// не пойми что со счетчиками циклов, если использовать let, то не компилируется, где он там ; ожидает - непонятно
var args = WScript.Arguments;
if (args.length === 0) { //если не задано аргументов
    WScript.Echo("no arguments!");
}
// ESCAPE кодировка
else {
    if (args(0) === "/escape" && args(1) === "/encode") {
        var p = new ActiveXObject("Scripting.FileSystemObject");
        if (!p.FileExists("input.txt")) {  //есть ли файл ввода
            WScript.Echo("no input file!");
            WScript.Quit();
        }
        var f = p.OpenTextFile("input.txt", 1, true, -1);  //
        var s = f.ReadAll();                               // считывание из файла
        f.Close();                                         //
        var escapeCharacter = 25;
        while ((s.indexOf(String.fromCharCode(escapeCharacter)) !== -1) && escapeCharacter <= 1000){ //ищем escape-символ, которого нет в строке
            escapeCharacter++;
        }
        escapeCharacter = String.fromCharCode(escapeCharacter);
        var result = "", lineElement = s.charAt(0), cnt = 1; //результат, последний символ и счетчик
        for(var i = 1; i <= s.length-1; i++){ //проверяем каждый символ
            if (lineElement === s.charAt(i)){  //если повторяется
                cnt++;
            }
            else { //записываем новый элемент
                if (escapeCharacter === lineElement){
                    s += escapeCharacter + String.fromCharCode(cnt) + escapeCharacter;
                }
                else {
                    if (cnt <= 3) {
                        for (var j = 1; j <= cnt; j++){
                            result += lineElement;
                        }
                    }
                    else {
                        result += escapeCharacter + String.fromCharCode(cnt - 3) + lineElement;
                    }
                }
                lineElement = s.charAt(i);
                cnt = 1;
            }
        }
        if (escapeCharacter === lineElement){
            s += escapeCharacter + String.fromCharCode(cnt) + escapeCharacter; //записываем то, что осталось после всего прогона
        }
        else {
            if (cnt <= 3) {
                for (var j = 1; j <= cnt; j++){
                    result += lineElement;
                }
            }
            else {
                result += escapeCharacter + String.fromCharCode(cnt - 3) + lineElement;
            }
        }
        var f = p.OpenTextFile("output.txt", 2, true, -1); //выводим ответ
        f.WriteLine(escapeCharacter);
        f.Write(result);
        f.Close();
    }
    // ESCAPE декодировка
    else if (args(0) === "/escape" && args(1) === "/decode") {
        var p = new ActiveXObject("Scripting.FileSystemObject");
        if (!p.FileExists("output.txt")) { //если файла нет
            WScript.Echo("no output file!");
            WScript.Quit();
        }
        var f = p.OpenTextFile("output.txt", 1, true, -1); //читаем ввод
        var escapeCharacter = f.ReadLine(); //читайем escape-символ
        if (escapeCharacter.length != 1) { //если файл пустой
            WScript.Echo("no right escape symbol in output.txt!");
            WScript.Quit();
        }
        var s = f.ReadAll();
        f.Close();
        var result = ""; //ответ
        for (var i = 0; i < s.length; i++) {
            if (s.charAt(i) !== escapeCharacter){
                result += s.charAt(i);
            }
            else { //наткнулись на escape-символ
                for (var j = 1; j <= s.charCodeAt(i + 1) + 3; j++){
                    result += s.charAt(i + 2);
                }
                i += 2;
            }
        }
        var f = p.OpenTextFile("outDecodeLine.txt", 2, 1, -1); //выводим
        f.Write(result);
        f.Close();
    }
    //Jump-кодировка
    else if (args(0) === "/jump" && args(1) === "/encode") {
        var p = new ActiveXObject("Scripting.FileSystemObject");
        if (!p.FileExists("input.txt")) {
            WScript.Echo("no input file!");
            WScript.Quit();
        }
        var f = p.OpenTextFile("input.txt", 1, true, -1);
        var s = f.ReadAll();
        f.Close();
        if (s.charAt(0) == s.charAt(1)){
            var charactersRepeated = true; //если символы повторяются - true, если нет - false
        }
        else{
            var charactersRepeated = false;
        }
        var recurringSymbol = s.charAt(0), result = "", count = 1;   // повторяющийся символ, результат, счетчик
        for (var i = 1; i < s.length - 1; i++) { //пробегаем по всем символам
            if (charactersRepeated && s.charAt(i) === s.charAt(i + 1)) { //повторяется
                count++;
            }
            else if (charactersRepeated && s.charAt(i + 1) !== s.charAt(i)) { //раньше повторялось
                count++;
                while (count >= 127) {
                    result += String.fromCharCode(127) + recurringSymbol;
                    count -= 127;
                }
                if (count !== 0){
                    result += String.fromCharCode(count) + recurringSymbol;
                }
                count = 0;
                if (s.charAt(i + 1) === s.charAt(i + 2)) {
                    recurringSymbol = s.charAt(i + 1);
                }
                else {
                    recurringSymbol = "";
                    charactersRepeated = !charactersRepeated;
                }
            }
            else if (!charactersRepeated && s.charAt(i) !== s.charAt(i + 1)) { //не повторяется
                recurringSymbol += s.charAt(i);
                count++;
            }
            else if (!charactersRepeated && s.charAt(i) === s.charAt(i + 1)) { //не повторялось
                result += String.fromCharCode(127 + count) + recurringSymbol;
                charactersRepeated = !charactersRepeated;
                count = 1;
                recurringSymbol = s.charAt(i);
            }
        } //обрабатываем то, что осталось
        if (charactersRepeated) {
            count++;
            while (count >= 127) {
                result += String.fromCharCode(127) + recurringSymbol;
                count -= 127;
            }
            if (count !== 0){
                result += String.fromCharCode(count) + recurringSymbol;
            }
        }
        else {
            recurringSymbol += s.charAt(s.length - 1);
            result += String.fromCharCode(127 + count + 1) + recurringSymbol;
        }
        var f = p.OpenTextFile("output.txt", 2, true, -1);
        var s = f.Write(result);
        f.Close();
    }
    //JUMP декодировка
    else if (args(0) === "/jump" && args(1) === "/decode") {
        var p = new ActiveXObject("Scripting.FileSystemObject");
        if (!p.FileExists("output.txt")) {
            WScript.Echo("no output file!");
            WScript.Quit();
        }
        var f = p.OpenTextFile("output.txt", 1, true, -1);
        var s = f.ReadAll();
        f.Close();
        var i = 0, result = "", codeTheReadCharacter;     //счетчик, результат, код прочитанного символа
        while (i < s.length) {
            codeTheReadCharacter = s.charCodeAt(i);
            if (codeTheReadCharacter <= 127) { //значит, несколько повторяющихся символов
                for (var b = 1; b <= codeTheReadCharacter; b++){
                    result += s.charAt(i + 1);
                }
                i += 2;
            }
            else { //цепочка неповторяющихся
                codeTheReadCharacter = s.charCodeAt(i) - 127;
                for (var b = 1; b <= codeTheReadCharacter; b++) {
                    i++;
                    result += s.charAt(i);
                }
                i++;
            }
        }
        var f = p.OpenTextFile("outDecodeLine.txt", 2, true, -1); //вывод
        f.Write(result);
        f.Close();
    }
    else{
        WScript.Echo("wrong argument!");
    }
}