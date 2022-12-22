//cscript huffman1.js
/*
function frequency(str){
    var frequency={};
    for (var i in str){

        if(frequency[str[i]]===undefined){

            frequency[str[i]]=1;
        }
        else {
            frequency[str[i]]=frequency[str[i]]+1;
        }
    }
    return frequency;
}             */

/*
function sortFrequency(frequency){
    var tuples=[];
    for( var let in frequency){
        tuples.push([frequency[let],let]);
    }
    return tuples.sort();
}                      */

function buildTree(tuples)
{
    while(tuples.length>1)
    {
        var leastTwo=[tuples[0][1],tuples[1][1]]
        //console.log(leastTwo);
        var theRest=tuples.slice(2,tuples.length);
        //console.log(theRest);
        var combFreq=tuples[0][0]+tuples[1][0];
        //console.log(combFreq);
        tuples=theRest;
        var end=[combFreq,leastTwo];
        tuples.push(end);
        //console.log(tuples);
        tuples.sort();
        //console.log(tuples);
    }
    return tuples[0][1];

}
tree=buildTree(tuples);

//console.log(buildtree(sortfreq(w)))


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
if (args(0) === '/encode') {
    var p = new ActiveXObject("Scripting.FileSystemObject");
    if (!p.FileExists('input.txt')) {
        WScript.Echo('no input file!');
        WScript.Quit();
    }
    var f = p.OpenTextFile('input.txt');
    f.Close();


}







