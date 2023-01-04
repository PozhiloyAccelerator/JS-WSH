//node huffman1.js /encode ��� /decode /alphabet
//���������
if (args(0) === '/encode') {       //!
    const fs = require('fs')
    try {
        var str = fs.readFileSync('./input.txt')
    }
    catch (err) {
        console.error(err)
    }
    console.log(str);
    var frequency = [], alphabet = [], characterCode = []; //�������, �������, ���� ��������
    for (var j = 0; j < str.length; j++) {           //��������� �������
        var symbol = str.charAt(j);
        if (!alphabet[symbol]) {
            alphabet[symbol] = 1;
        }
        else {
            alphabet[symbol]++;
        }
    }
    var i = 0;
    for (var key in alphabetObject) {            //��������� ������ ������ � ������������� � ���������� �����
        alphabet[i] = key;
        frequency[i] = alphabetObject[key];
        characterCode[i] = "";
        i++;
    }
    for (var y = 0; y < alphabet.length; y++) {
        WScript.Echo(alphabet[y] + " " + frequency[y]);
    }
    var copyAlphabet = alphabet.slice(0), copyFrequency = frequency.reverse();
    /*for (var y in copyAlphabet){             //!  of a �� in
        console.log(y)
    }*/
    /*while (copyAlphabet.length !== 2){    //�������� ��������� ������ ����� ��������
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