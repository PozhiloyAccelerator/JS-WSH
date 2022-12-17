// cscript.exe testEntropShen.js "строка, энтропию которой надо посчитать"
try {
    var p = new ActiveXObject('WScript.Shell'), args = WScript.Arguments;
    if (WScript.FullName.toLowerCase() === (WScript.Path + '\\wscript.exe').toLowerCase()) {
        p.Popup('run only ' + WScript.Path + '\\cscript.exe.\n\n\t\tcoming out...');
        WScript.Quit();
    }
    if (!args.length) {
        p.Popup('no line.\n\n\tcoming out...');
        WScript.Quit();
    }
    // создаём алфавит и определяем кол-во использования символов
    var string = args(0), alphabet = new Array();
    for (var j = 0, lngth = string.length; j < lngth; j++) {
        var symbol = string.charAt(j);
        if (!alphabet[symbol]) {
            alphabet[symbol] = 1;
        }
        else {
            alphabet[symbol]++;
        }
    }
    var entropy = 0;
    // выводим таблицу частот в виде рациональных дробей
    WScript.StdOut.WriteLine('\tfrequency of alphabet characters');
    WScript.StdOut.WriteLine('\t----------------------------------');
    j = 0;
    for (var key in alphabet) {
        entropy += (alphabet[key] / lngth) * (Math.log(alphabet[key] / lngth) / Math.log(2) * (alphabet[key] / lngth)) * 2; //логарифм тута
        WScript.StdOut.WriteLine('\t' + key + '\t-\t' + alphabet[key] + '/' + lngth + '\t-\t' + (alphabet[key] / lngth).toFixed(3));
        j++;
    }
    WScript.StdOut.WriteLine('\tentropy is equal to ' + -entropy);
    WScript.Quit();
} catch (e) {
    p.Popup(e.description);
    WScript.Quit();
}