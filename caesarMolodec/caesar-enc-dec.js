//%DebugArguments%=/encode /decode
//cscript caesar-enc-dec.js /encode или /decode "текст" "число сдвига"
//у нас три основные проюлемы: 1) проверка, что элемент строки из английского алфавита
//2) считывание строки из файла, надо чтобы он нормально работал со считанной строкой
//3) он почему - то неправильно шифрует. пример: aaabbb, 1 должно быть: bbbccc результат: bbblll

var args = WScript.Arguments;
var caesarCode = function(str, offset) {   //offset - сдвиг по алфавиту
  if (offset < 0) {           // если сдвиг меньше 0
    return caesarCode(str, offset + 26);
  }
  var result = "";      //ответ
  for (var i = 0; i < str.length; i++) {    //идем по элементам строки
    var encodeSymbol = str[i]; //элемент строки
    // английский алфавит, тут должна быть проверка на английский алфавит, а в декоде можно убрать
    var code = str.charCodeAt(i);   //получаем код
    WScript.Echo(code);
      if (code >= 65 && code <= 90) {  // заглавные буквы
        encodeSymbol = String.fromCharCode(((code - 65 + offset) % 26) + 65);
      }
      else if (code >= 97 && code <= 122) { // строчные буквы
        encodeSymbol = String.fromCharCode(((code - 97 + offset) % 26) + 97);
      }
    result += encodeSymbol;   // записываем зашифрованный символ в ответ
  }
  return result;
}
if (args.length === 0) { //если не задано аргументов
  WScript.Echo("no arguments!");
}
//КОДИРОВКА
else {
  if (args(0) === "/encode") {
    var p = new ActiveXObject("Scripting.FileSystemObject");
    var f = p.OpenTextFile("output.txt", 2, true, 0); //выводим ответ
    f.Write(caesarCode(args(1), args(2)));
    f.Close();
  }
  //ДЕКОДИРОВКА
  if (args(0) === "/decode") {
    var p = new ActiveXObject("Scripting.FileSystemObject");
    if (!p.FileExists("output.txt")) { //если файла нет
      WScript.Echo("no output file!");
      WScript.Quit();
    }
    var f = p.OpenTextFile("output.txt", 1, true, 0);
    if (f.length === 0) { //если файл пустой
      WScript.Echo("empty output.txt!");
      WScript.Quit();
    }
    var s = f.ReadAll();
    f.Close();
    var result = ""; //ответ
    for (var i = 0; i < s.length; i++) {    //идем по элементам закодированной строки
      var decodeSymbol = s[i]; //элемент закодированной строки
      if (decodeSymbol.match(/[a-z]/i)) {
        var code = s.charCodeAt(i);   //получаем код закодированного символа
        if (code >= 65 && code <= 90) {  // заглавные буквы
          decodeSymbol = String.fromCharCode(((code - 65 - args(2)) % 26) + 65);
        }
        else if (code >= 97 && code <= 122) { // строчные буквы
          decodeSymbol = String.fromCharCode(((code - 97 - args(2)) % 26) + 97);
        }
      }
      result += decodeSymbol;   // записываем расшифрованный символ в ответ
    }
    var f = p.OpenTextFile("decodingOut.txt", 2, 1, 0); //выводим
    f.Write(result);
    f.Close();
  }
  else {
    WScript.Echo("wrong argument!");
  }
}

/*
var args = WScript.Arguments;
var caesarCode = function(str, offset) { //offset - сдвиг по алфавиту
  if (offset < 0) { // если сдвиг меньше 0
    return caesarCode(str, offset + 26);
  }
  var result = ""; //ответ
  for (var i = 0; i < str.length; i++) { //идем по элементам строки
    var encodeSymbol = str[i] ; //элемент строки
    // английский алфавит
    var code = str.charCodeAt(i); //получаем код
    if (code >= 65 && code <= 90) { // заглавные буквы
      encodeSymbol = String.fromCharCode(((code - 65 + offset) % 26) + 65);
    }
    else if (code >= 97 && code <= 122) { // строчные буквы
      encodeSymbol = String.fromCharCode(((code - 97 + offset) % 26) + 97);
    }
    result += encodeSymbol; // записываем зашифрованный символ в ответ
  }
  return result;
}

if (args.length === 0) { //если не задано аргументов
  WScript.Echo("wrong arguments!");
}
//КОДИРОВКА
else {
  if (args(0) === "/encode") {
    var encodeLine = caesarCode(args(1), args(2));
    WScript.Echo(encodeLine);
  }
  //ДЕКОДИРОВКА
  else if (args(0) === "/decode") {

    var result = ""; //ответ
    for (var i = 0; i < encodeLine.length; i++) { //идем по элементам закодированной строки
      var decodeSymbol = encodeLine[i]; //элемент закодированной строки
      // английский алфавит и цифры
      if (decodeSymbol.match(/[a-z]/i)) {
        var code = encodeLine.charCodeAt(i); //получаем код закодированного символа
        if (code >= 65 && code <= 90) { // заглавные буквы
          decodeSymbol = String.fromCharCode(((code - 65 - args(2)) % 26) + 65);
        }
        else if (code >= 97 && code <= 122) { // строчные буквы
          decodeSymbol = String.fromCharCode(((code - 97 - args(2)) % 26) + 97);
        }
      }
      result += decodeSymbol; // записываем разшифрованный символ в ответ
    }
    WScript.Echo(result);
  }
}      */