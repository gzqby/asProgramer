function tubeScreenFunc(bigPrice, ID, smallPrice, unit, BG, color, yuan, BIgPriceColor) {
    // bigPrice是大价格，传入0是不显示；ID6位之内，多出的高位会消失，传入一个0是不显示；smallPrice是原价的价格，传入0是不显示；unit：单位0|1|2|3|一共四个单位，填入其它单位不显示； BG：背景色白黑红对应0|1|2, color：颜色同上, sale：true|false对应显示不显示,
    // yuan：同上

    // 对应关系
    var relationship = {
        BG: [0],
        unit: [35, 57, 56, 36],
        sale: [27],
        yuan: [28],
        originalPrice: [120],
        circle: [40],
        bigPrice: [
            [2, 3, 4, 5, 6, 7, 1],
            [8, 9, 10, 11, 12, 14, 13],
            [15, 16, 17, 24, 37, 38, 39],
            [18, 19, 20, 25, 32, 33, 34],
            [21, 22, 23, 26, 29, 30, 31]
        ],
        smallPrice: [
            [100, 55, 54, 101, 104, 103, 102],
            [52, 50, 51, 53, 107, 106, 105],
            [49, 48, 47, 108, 110, 119, 109],
            [46, 45, 44, 111, 113, 118, 112],
            [43, 42, 41, 114, 116, 117, 115]
        ],
        ID: [
            [75, 73, 74, 76, 77, 81, 82],
            [72, 69, 70, 71, 80, 83, 78],
            [67, 65, 66, 68, 64, 84, 79],
            [63, 60, 61, 62, 87, 86, 85],
            [58, 92, 90, 59, 91, 89, 88],
            [93, 99, 98, 94, 97, 96, 95]
        ]
    }
    // 主函数
    function tubeScreenBinary(bigPrice, ID, smallPrice, unit, BG, color, yuan, BIgPriceColor) {
        ID ? ID = String(ID) : ID = '000000', BG && (BG == 0 || BG == 1 || BG == 2) ? BG = Number(BG) : BG = 0, color && (color == 0 || color == 1 || color == 2) ? color = Number(color) : color = 2,
            unit ? unit = Number(unit) : unit = 5, yuan ? yuan = null : yuan = false, bigPrice ? bigPrice = Number(bigPrice) : bigPrice = 0,
            smallPrice ? smallPrice = Number(smallPrice) : smallPrice = 0;

        var array = initArr(0),
            rlBig = relationship.bigPrice,
            rlSmall = relationship.smallPrice,
            rlID = relationship.ID;
        dealOther(yuan, relationship.yuan, array);
        if (unit == 0 || unit == 1 || unit == 2 || unit == 3) {
            array[relationship.unit[unit]] = 1;
        }
        dealPrice(bigPrice, array, rlBig);
        dealPrice(smallPrice, array, rlSmall);
        dealPrice(ID, array, rlID);
        var returnArr = setColor(BG, color, array);
        if(BIgPriceColor&&(BIgPriceColor==0||BIgPriceColor==1||BIgPriceColor==2)){returnArr=setBIgPriceColor(BIgPriceColor,array,returnArr,rlBig);}
        for (var index = 0; index < returnArr.length; index++) {
            returnArr[index] = runToHex(returnArr[index].join(''));
        }
        for (var i = 0; i < returnArr.length; i++) {
            for (var j = 0; j < returnArr[i].length; j++) {
                var item = returnArr[i][j];
                item.length === 2 ? (returnArr[i][j] = '0x' + item) : (returnArr[i][j] = '0x0' + item)
            }
            i == 0 ? returnArr[0].push("0xa5") : returnArr[1].push("0xc3")
        }
        returnString = returnArr.toString();
        return returnString;

    }
    // 设置大字颜色
    function setBIgPriceColor(BIgPriceColor,array,returnArr,rl){
        var colorWordArr = [],returnArr1 = [].concat(returnArr[0]),returnArr2 = [].concat(returnArr[1]),arrTem=[];
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
                    returnArr1[index] = 0;
                    returnArr2[index] = 1;
                }
            }
        }
        arrTem.push(returnArr1,returnArr2)
        return arrTem;
    }
    // ������ɫ
    function setColor(BG, color, array) {
        var arraySum = [],arrayCopy = [].concat(array);
        if (BG === 0) {
            var arrayTwo = initArr(0);
            arrayCopy[0] = 0;
            arrayTwo[0] = 0;
            if (color === 0) {
                arraySum.push(arrayTwo, arrayTwo);
                return arraySum;
            } else if (color === 1) {
                arraySum.push(arrayCopy, arrayCopy);
                return arraySum;
            } else if (color === 2) {
                arraySum.push(arrayTwo, arrayCopy);
                return arraySum;
            }
        } else if (BG === 1) {
            if (color === 0) {
                for (var i = 0; i < arrayCopy.length; i++) {
                    arrayCopy[i] == 1 ? arrayCopy[i] = 0 : arrayCopy[i] = 1;
                }
                arrayCopy[0] = 1;
                arraySum.push(arrayCopy, arrayCopy);
                return arraySum;
            } else if (color === 1) {
                var arrayTwo = initArr(1);
                arraySum.push(arrayTwo, arrayTwo);
                return arraySum;
            } else if (color === 2) {
                var arrayTwo = initArr(1);
                for (var index = 0; index < arrayCopy.length; index++) {
                    arrayCopy[index] == 1 ? arrayCopy[index] = 0 : arrayCopy[index] = 1;
                }
                arrayCopy[0] = 1;
                arraySum.push(arrayCopy, arrayTwo);
                return arraySum;
            }
        } else {
            var arrayTwo = initArr(1);
            if (color === 0) {
                var arrayTwo = initArr(0);
                for (var index = 0; index < arrayCopy.length; index++) {
                    arrayCopy[index] == 1 ? arrayCopy[index] = 0 : arrayCopy[index] = 1;
                }
                arrayCopy[0] = 1;
                arrayTwo[0] = 0;
                arraySum.push(arrayTwo, arrayCopy);
                return arraySum;
            } else if (color === 1) {
                arrayCopy[0] = 0;
                arraySum.push(arrayCopy, arrayTwo);
                return arraySum;
            } else if (color === 2) {
                var arrayThree = initArr(0);
                arraySum.push(arrayThree, arrayTwo);
                return arraySum;
            }
        }
    }
    // �ȶ������ת��
    function runToHex(str) {
        var arr = [],
            arr1 = groupBinary(str);
        for (var i = 0; i < arr1.length; i++) {
            arr.push(strReverse(arr1[i]));
        }
        for (var index = 0; index < arr.length; index++) {
            arr[index] = toHex(arr[index])
        }
        return arr;
    }
    // �ַ�����ת
    function strReverse(str) {
        return str.split("").reverse().join("");
    }
    // 121λ���
    function groupBinary(str) {
        var arr = [],
            count = Math.ceil(str.length / 8);
        for (var i = 0; i < count; i++) {
            arr.push(str.substr(0 + i * 8, 8))
        }
        return arr;
    }
    // toHex
    function toHex(a) {
        return parseInt(a, 2).toString(16)
    }
    // �����ж�
    function typeIs(a) {
        var string = Object.prototype.toString.call(a);
        var reg = /\[object (\w*)\]/g;
        string = string.replace(reg, "$1")
        return string;
    }
    // �������ܿ��Ƶ�
    function dealOther(a, rl, array) {
        if (!(a == 'false' || a == '0' || a == false)) {
            for (var i = 0; i < rl.length; i++) {
                array[rl[i]] = 1;
            }
        }
    }
    // ����۸�
    function dealPrice(bigPrice, array, rl) {
        if (bigPrice == 0) {
            return;
        } else {
            var bigPriceArr = parseNum(bigPrice);
            for (var index = 0; index < bigPriceArr.length; index++) {
                var priceItem = bigPriceArr[index];
                priceItem = Number(priceItem);
                var priceItemArr = numberRelationship(priceItem);
                var priceModelItemArr = rl[index];
                for (var i = 0; i < priceItemArr.length; i++) {
                    array[priceModelItemArr[priceItemArr[i]]] = 1;
                }
            }
            if (rl === relationship.bigPrice) {
                dealOther(true, relationship.circle, array);
            } else if (rl === relationship.smallPrice) {
                dealOther(true, relationship.sale, array);
                dealOther(true, relationship.originalPrice, array);
            }
        }
    }
    // ��ʼ��
    function initArr(number) {
        var arr = [];
        for (var i = 0; i < 121; i++) {
            arr[i] = number;
        }
        return arr;
    }
    // ����������
    function parseNum(value) {
        if (typeIs(value) == "String"){value = value;}
        else{ value<=1 ? value='0'+Math.round(value * 100).toString():value=Math.round(value * 100).toString();}
        return value.split('').reverse();
    }
    // ���ֶ�Ӧ�ܵı�ʶ
    function numberRelationship(number) {
        switch (number) {
            case 0:
                return [0, 1, 2, 4, 5, 6]
            case 1:
                return [0, 6];
            case 2:
                return [0, 1, 3, 4, 5];
            case 3:
                return [0, 1, 3, 5, 6];
            case 4:
                return [0, 2, 3, 6];
            case 5:
                return [1, 2, 3, 5, 6];
            case 6:
                return [1, 2, 3, 4, 5, 6];
            case 7:
                return [0, 1, 6];
            case 8:
                return [0, 1, 2, 3, 4, 5, 6];
            case 9:
                return [0, 1, 2, 3, 5, 6];
            default:
                return false;
        }
    }
    return tubeScreenBinary(bigPrice, ID, smallPrice, unit, BG, color, yuan, BIgPriceColor);
    // return setBIgPriceColor(1,1,relationship.bigPrice);
};
console.log(tubeScreenFunc('0.99','3456','0.95','0','1','1','true','2'));
