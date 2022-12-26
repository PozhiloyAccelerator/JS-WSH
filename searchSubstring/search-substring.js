//%DebugArguments%=/hash /time
//cscript search-substring.js /brutforce ��� /hash /time
var args = WScript.Arguments;
function equal(string, substring, position, i) {
    for (i = 0; i < substring.length; i++){
        if (string.charAt(position + i) !== substring.charAt(i)){
            return false;
        }
    }
    return true;
}
if (args.length === 0) { //��� ����������
    WScript.Echo('wrong arguments!');
    WScript.Quit();
}
if (args(0) === '/brutforce') { //������� ������ �����
    var p = new ActiveXObject('Scripting.FileSystemObject');
    if (!p.FileExists('string.txt')) { //���� �� string.txt
        WScript.Echo('no string file!');
        WScript.Quit();
    }
    var str = p.OpenTextFile('string.txt');
    str = str.ReadAll();
    if (!p.FileExists('substring.txt')) { //���� �� substring.txt
        WScript.Echo('no substring file!');
        WScript.Quit();
    }
    var substring = p.OpenTextFile('substring.txt');
    substring = substring.ReadAll();
    if (args.length >= 2 && args(1) === '/time') { //���� ����� ������� �����
        var howLongTakeToComplete = true;  //����� �����?
        var time = new Date();
        var executionTime = time.getTime() + time.getMilliseconds(); //����� ����������
    }
    var checkingConvergence = false; //�������� �� ���������� ������ � ���������
    for (i = 0; i <= str.length - substring.length; i++) {
        if (equal(str, substring, i)) { //���������
            checkingConvergence = true;
            WScript.StdOut.Write((i + 1) + ' ');
        }
    }
    if (howLongTakeToComplete) { //���� ���� ������� �����
        time1 = new Date();
        el2 = time1.getTime() + time1.getMilliseconds()
        executionTime = (parseInt(el2) - executionTime) / 1000;
        if (checkingConvergence === true){
            WScript.Echo(' ');
        }
        WScript.Echo('i used ' + executionTime + ' seconds');
    }
    if (checkingConvergence === false){
        WScript.Echo('no substrings found!');
    }
    else{
        WScript.Echo('');
    }
}
else if (args(0) === '/hash') { //���
    var p = new ActiveXObject('Scripting.FileSystemObject');
    if (!p.FileExists('string.txt')) {
        WScript.Echo('no string file!');
        WScript.Quit();
    }
    var str = p.OpenTextFile('string.txt');
    str = str.ReadAll();
    if (!p.FileExists('substring.txt')) {
        WScript.Echo('no substring file!');
        WScript.Quit();
    }
    var substring = p.OpenTextFile('substring.txt');
    substring = substring.ReadAll();
    if (args.length >= 2 && args(1) === '/time') { //����� ������� �����
        var howLongTakeToComplete = true;
        var time = new Date();
        if (checkingConvergence === true){
            WScript.Echo('');
        }
        var executionTime = time.getTime() + time.getMilliseconds();
    }
    var checkingConvergence = false, pow = 1;  //�������� �� ���������� ���� ����� ������ � ���� ���������
    var hashOfPartOfString = 0, hashSubstring = 0; //��� ����� ������, ��� ���������
    var firstSymbol = str.charCodeAt(0); //������ ������ ����� ������
    var lastSymbol = str.charCodeAt(substring.length - 1); //��������� ������
    for (i = substring.length - 1; i >= 0; i--) { //������� ��� ��������� � ������ ����� ������
        hashSubstring += substring.charCodeAt(i) * pow;
        hashOfPartOfString += str.charCodeAt(i) * pow;
        pow *= 2;
    }
    pow /= 2;
    for (i = 0; i <= str.length - substring.length; i++) { //���� ������
        if (hashOfPartOfString === hashSubstring) {
            if (equal(str, substring, i)) {
                checkingConvergence = true;
                WScript.StdOut.Write((i + 1) + ' ');
            }
        }
        hashOfPartOfString -= pow * firstSymbol; //������ ���
        hashOfPartOfString *= 2;
        firstSymbol = str.charCodeAt(i + 1);
        lastSymbol = str.charCodeAt(i + substring.length)
        hashOfPartOfString += lastSymbol;
    }
    if (howLongTakeToComplete) {
        time1 = new Date();
        el2 = time1.getTime() + time1.getMilliseconds();
        executionTime = (parseInt(el2) - executionTime) / 1000;
        if (checkingConvergence === true){
            WScript.Echo('');
        }
        WScript.Echo('used ' + executionTime + ' seconds');
    }
    if (checkingConvergence === false){
        WScript.Echo('no substrings found!');
    }
    else{
        WScript.Echo('');
    }
}
else{
    WScript.Echo('wrong arguments!');
}