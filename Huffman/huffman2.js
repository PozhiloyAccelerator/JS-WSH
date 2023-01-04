//node huffman1.js /encode или /decode /alphabet
//кодировка
if (args(0) === '/encode') {       //!
    const fs = require('fs')
    try {
        var str = fs.readFileSync('./input.txt')
    }
    catch (err) {
        console.error(err)
    }
    console.log(str);
    var frequency = [], alphabet = [], characterCode = []; //частота, алфавит, коды символов
    for (var j = 0; j < str.length; j++) {           //заполнили алфавит
        var symbol = str.charAt(j);
        if (!alphabet[symbol]) {
            alphabet[symbol] = 1;
        }
        else {
            alphabet[symbol]++;
        }
    }
    var i = 0;
    for (var key in alphabet) {            //заполнили массив частот и подготовились к заполнению кодов
        frequency[i] = alphabet[key]; //сейчас до сих пор элементы алфавита сидят в индексах (надо не in a of)
        characterCode[i] = "";
        i++;
    }
    /*for (let e of alphabet){
        WScript.Echo(e);
    }*/

    var copyAlphabet = alphabet.slice(0), copyFrequency = frequency.reverse();
    /*for (var y in copyAlphabet){             //!  of a не in
        console.log(y)
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