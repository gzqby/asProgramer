function setBIgPriceColor(BIgPriceColor,array,returnArr,rl){
    var colorWordArr = [],returnArr1 = returnArr[0],returnArr2 = returnArr[1],arrTem=[];
    for(var i = 0;i<rl.length;i++){
        colorWordArr = colorWordArr.concat(rl[i]);
    }
    colorWordArr.push(40);
    for(var i=0;i<colorWordArr.length;i++){
        var index = colorWordArr[i];
        if(array[index] == 1){
            if(BIgPriceColor==0){
                returnArr1[index] = 0;
                returnArr2[index] = 0;
            }
            else if(BIgPriceColor==1){
                returnArr1[index] = 1;
                returnArr2[index] = 1;
            }
            else if(BIgPriceColor==2){
                console.log(returnArr1.toString());
                
                returnArr1[index] = 0;
                console.log(returnArr2.toString());

                returnArr2[index] = 1;
            }
        }
    }
    arrTem.push(returnArr1,returnArr2)
    return arrTem;
}
var q = [0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,0,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1];
var w = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
var rl = [ [ 2, 3, 4, 5, 6, 7, 1 ],
[ 8, 9, 10, 11, 12, 14, 13 ],
[ 15, 16, 17, 24, 37, 38, 39 ],
[ 18, 19, 20, 25, 32, 33, 34 ],
[ 21, 22, 23, 26, 29, 30, 31 ] ];
setBIgPriceColor('2',q,w,rl);
