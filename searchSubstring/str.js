p=new ActiveXObject('Scripting.FileSystemObject');
f=p.openTextFile('ooo1.txt',2,1);
for (i=1;i<=1E6;i++){
    f.Write('a');
}