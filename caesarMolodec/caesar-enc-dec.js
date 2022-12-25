//%DebugArguments%=/encode /decode
//cscript caesar-enc-dec.js /encode или /decode "число сдвига"

var args = WScript.Arguments;
var caesarCode = function(str, offset) {   //offset - сдвиг по алфавиту
  if (offset < 0) {           // если сдвиг меньше 0
    return caesarCode(str, offset + 26);
  }
  var result = "";      //ответ
  for (var i = 0; i < str.length; i++) {    //идем по элементам строки
    var encodeSymbol = str.charAt(i); //элемент строки
    // английский алфавит, тут должна быть проверка на английский алфавит, а в декоде можно убрать
    var code = str.charCodeAt(i);   //получаем код
    if (encodeSymbol.match(/[a-z]/i)) {
      if (code >= 65 && code <= 90) {  // заглавные буквы
        encodeSymbol = String.fromCharCode(((code - 65 + offset) % 26) + 65);
      }
      else if (code >= 97 && code <= 122) { // строчные буквы
        encodeSymbol = String.fromCharCode(((code - 97 + offset) % 26) + 97);
      }
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
    var alphabetShift = Number(args(1));
    var p = new ActiveXObject("Scripting.FileSystemObject");
    if (!p.FileExists("input.txt")) { //есть ли файл ввода
      WScript.Echo("no input file!");
      WScript.Quit();
    }
    var f = p.OpenTextFile("input.txt", 1, true, 0);
    var s = f.ReadAll();
    f.Close();
  var f = p.OpenTextFile("output.txt", 2, true, 0); //выводим ответ
  f.Write(caesarCode(s, alphabetShift));
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
    var alphabetShift = Number(args(1));
    for (var i = 0; i < s.length; i++) {    //идем по элементам закодированной строки
      var decodeSymbol = s.charAt(i); //элемент закодированной строки
      var code = s.charCodeAt(i);   //получаем код закодированного символа
      if (code >= 65 && code <= 90) {  // заглавные буквы
        decodeSymbol = String.fromCharCode(((code - 65 - alphabetShift) % 26) + 65);
      }
      else if (code >= 97 && code <= 122) { // строчные буквы
        decodeSymbol = String.fromCharCode(((code - 97 - alphabetShift) % 26) + 97);
      }
      result += decodeSymbol;   // записываем расшифрованный символ в ответ
    }
    var f = p.OpenTextFile("decodingOut.txt", 2, 1, 0); //выводим
    f.Write(result);
    f.Close();
  }
  else{
    WScript.Echo("Wrong argument!")
  }
}