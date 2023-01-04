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
    var frequency = new Array(), alphabet = new Array(), characterCode = new Array(alphabet.length); //частота, алфавит, коды символов
    var alphabet = new Array();
    for (var j = 0; j < str.length; j++) {
        var symbol = str.charAt(j);
        if (!alphabet[symbol]) {         //зполнили алфавит
            alphabet[symbol] = 1;
        }
        else {
            alphabet[symbol]++;
        }
    }
    var i = 0;
    for (var key in alphabet) {            //заполнили массив частот и подготовились к заполнению кодов
        frequency[i] = alphabet[key];
        characterCode[i] = "";
        i++;
    }
    /*for (var e in alphabet){
        WScript.Echo(e);
    }*/
    /*for (var i = 0; i < frequency.length; i++){
        WScript.Echo(alphabet[i]+ " " + frequency[i]);
    }*/
    var copyAlphabet = alphabet.reverse(), copyFrequency = frequency.reverse();
    for (var y in copyAlphabet){
        WScript.Echo(y);
    }
    while (copyAlphabet.length !== 2){    //начинаем заполнять массив кодов символов
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
    }

}
else {
    WScript.Echo('wrong arguments!');
}







