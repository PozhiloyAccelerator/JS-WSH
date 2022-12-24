//cscript huffman.js /encode или /decode /alphabet
//проблема в том, что коды символов формируются неправильно + в кодировке появляется аски символ, но декодирует правильно
// сейчас там косяк с декодировкой, этот косяк в кодировке
var args = WScript.Arguments, separator = String.fromCharCode(95);
if (args.count() > 1 && args(1).indexOf('/alphabet') !== -1) { //проверка на аргументы
    var alphabetAndFrequencyNeed = true;
}
else {
    var alphabetAndFrequencyNeed = false;
}
if (args.count() <= 0) {      //проверка на наличие аргументов
    WScript.Echo('wrong arguments!');
    WScript.Quit();
}
//кодировка
if (args(0) === '/encode') {
    var p = new ActiveXObject("Scripting.FileSystemObject");
    if (!p.FileExists('input.txt')) {
        WScript.Echo('no input file!');
        WScript.Quit();
    }
    var f = p.OpenTextFile('input.txt');
    var inp = new Array();
    while (!f.atEndOfStream)             //считываем пока не конец файла
        inp[inp.length] = f.ReadLine();
    f.Close();
    var characterCode = new Array(), frequency = new Array(), alphabet = ""; //код символа, частота, алфавит
    var attachedSymbol = new Array(); // символ, который был присоеденен на n-ном шаге
    for (j = 0; j < inp.length; j++) {
        for (var i = 0; i < inp[j].length; i++) { //заполняем алфавит, считаем частоту
            if (alphabet.indexOf(inp[j].charAt(i)) !== -1) {   //проверяем на вхождение символа
                frequency[inp[j].charAt(i)]++;
            }
            else {
                alphabet += inp[j].charAt(i);
                frequency[inp[j].charAt(i)] = 1;
                characterCode[inp[j].charAt(i)] = '';
            }
        }
    }
    if (alphabetAndFrequencyNeed) {
        WScript.Echo('alphabet and frequencies:');
        for (i = 0; i < alphabet.length; i++) {
            WScript.Echo(alphabet.charAt(i) + ': ' + frequency[alphabet.charAt(i)]);
        }
    }
    var tree = alphabet.split(''), newTree = tree; //дерево, изменяемая копия дерева
    while (tree.length > 1) { //заполняем дерево
        for (var i = tree.length - 1; i >= 0; i--) {
            for (var j = 0; j <= i; j++) { //сортировка по частоте
                if (frequency[tree[j]] > frequency[tree[j + 1]]) {
                    var recurringSymbol = newTree[j];
                    newTree[j] = newTree[j + 1];
                    newTree[j + 1] = recurringSymbol;
                }
            }
            //WScript.Echo(newTree[0]);   //
            frequency[newTree[1] + newTree[0]] = frequency[newTree[1]] + frequency[newTree[0]]; //склеиваем самые неповторяющиеся, частота склеиваемого
            frequency.splice(newTree[0], 1);
            frequency.splice(newTree[1], 1);
            newTree[0] += newTree[1];
            attachedSymbol = attachedSymbol.concat(newTree.splice(1, 1)); //запоминаем один из символов
            tree = newTree;
        }
    }
    tree = alphabet; //восстанавливаем алфавит
    if (tree.length === 1) {
        characterCode[tree.charAt(0)] = '0';
    }
    while (tree.length > 1) { //заполняем коды символов
        characterCode[attachedSymbol[attachedSymbol.length - 1]] = characterCode[attachedSymbol[attachedSymbol.length - 1]] + '0';
        var regex = new RegExp('[' + attachedSymbol[attachedSymbol.length - 1] + ']');
        tree = tree.replace(regex, ''); //удаляем символ, код которого уже создан
        for (var j = 0; j < tree.length; j++) {
            characterCode [tree.charAt(j)] = characterCode[tree.charAt(j)] + '1';
        }
        attachedSymbol.pop();
    }
    f = p.OpenTextFile('output.txt', 2, 1);
    f.Write(inp.length + separator);
    var result = '';
    if (alphabetAndFrequencyNeed) {
        WScript.Echo('letterCodes:');
    }
    for (i = 0; i < alphabet.length; i++) {
        f.Write(alphabet.charAt(i) + separator + characterCode[alphabet.charAt(i)] + separator);//
        if (alphabetAndFrequencyNeed) {                           //выводим алфавит с кодами
            WScript.Echo(alphabet.charAt(i) + ': ' + characterCode[alphabet.charAt(i)]);
        }
    }
    for (var j = 0; j < inp.length; j++) {
        for (i = 0; i < inp[j].length; i++) {
            result += characterCode[inp[j].charAt(i)];       //создаем строку вывода
        }
        result += separator;
    }
    f.Write(result); // пишем
    f.Close();
}
//декодировкa
else if (args(0) === '/decode') {
    var inp = new Array();
    var p = new ActiveXObject("Scripting.FileSystemObject");
    if (!p.FileExists('output.txt')) {
        WScript.Echo('no output file!');
        WScript.Quit();
    }
    var f = p.OpenTextFile('output.txt');
    var t = p.OpenTextFile('outDecodeLine.txt', 2, 1);
    inp = f.ReadAll().split(separator); //получаем входной массив
    f.Close();
    for (var w = parseInt(inp[0]) + 1; w > 1; w--) { //каждая строчка
        var j = inp.length - w, answer = '', ip = 0; //счетчик, собранная декод. строка, ip
        while (ip < inp[j].length) {
            var ip2 = 2;
            while (ip2 < j && inp[ip2] !== inp[j].substr(ip, inp[ip2].length)) { //ищем нужный символ
                ip2 += 2;
            }
            if (ip2 < j) { //нашли
                answer += inp[ip2 - 1];
                ip += inp[ip2].length;
            }
            else { //если не нашли
                WScript.Echo('wrong input!');
                WScript.Quit();
            }
        }
        t.WriteLine(answer); //пишем декодированную строку в вывод
    }
    t.Close();
}
else {
    WScript.Echo('wrong arguments!');
}