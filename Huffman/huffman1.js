//cscript huffman1.js /encode или /decode /alphabet
var args = WScript.Arguments;
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
    var str = f.ReadAll();
    f.close();
    var frequency = [], alphabetObject = [], characterCode = [], alphabet = []; //частота, алфавит, коды символов
    for (var j = 0; j < str.length; j++) {           //заполнили алфавит
        var symbol = str.charAt(j);
        if (!alphabetObject[symbol]) {
            alphabetObject[symbol] = 1;
        }
        else {
            alphabetObject[symbol]++;
        }
    }
    var i = 0;
    for (var key in alphabetObject) {            //заполнили массив частот, заполнили массив алфавита и подготовились к заполнению кодов
        alphabet[i] = key;
        frequency[i] = alphabetObject[key];
        characterCode[i] = "";
        i++;
    }
    /*for (var y = 0; y < alphabet.length; y++) {
        WScript.Echo(alphabet[y] + " " + frequency[y]);
    }*/
    /*while (copyAlphabet.length !== 2){    //начинаем заполнять массив кодов символов
        var orderOfNodesAndFrequency = 0, l = 1;
        for (l; l < copyAlphabet.length; l+=2){
            if (copyFrequency[l-1] <= copyFrequency[l]){
                characterCode[l-1]+="1";
                characterCode[l]+="0";
            }
            else{
                characterCode[l-1]+="0";
                characterCode[l]+="1";
            }
            copyAlphabet[orderOfNodesAndFrequency] = copyAlphabet[l] + copyAlphabet[l-1];
            copyAlphabet.splice(l, 1);
            copyFrequency[orderOfNodesAndFrequency] = copyFrequency[l] + copyFrequency[l-1];
            copyFrequency.splice(l, 1);
            orderOfNodesAndFrequency++;
        }
    }*/

}
else {
    WScript.Echo('wrong arguments!');
}







