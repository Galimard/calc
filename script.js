class Calculator {
    constructor() {
        this.cityToGoTarif = Number($('.city-to-go').val());
        this.cityToGo = $('.city-to-go option:selected').text();
        this.weight = Number($('.weight').val()),
        this.volume = $('.volume').val(),
        this.character = Number($('.character').val()),
        this.heavyWeight = Number($('.heavy-weight').val()),
        this.delivery = Number($('.delivery').val()),
        this.minTarif = Number($('.city-to-go option:selected').attr("data-min")),
        this.result = $('.sum'),
        this.interSum = 0,
        this.tarifSum = 0,
        this.heavySum = 0,
        this.mass = 0,
        this.sum = 0;
    }

    console() {
        console.log(this.weight);
        console.log(this.cityToGoTarif);
        console.log(this.cityToGo);
    }

}

const calculator = new Calculator();

$(document).ready(function () {
    $('#price').on('click', function () {
        calculator.console();
    });
});


// function calculate() {
//     var cityToGoTarif = Number($('.city-to-go').val()),
//         cityToGo = $('.city-to-go option:selected').text(),
//         weight = Number($('.weight').val()),
//         volume = $('.volume').val(),
//         character = Number($('.character').val()),
//         heavyWeight = Number($('.heavy-weight').val()),
//         delivery = Number($('.delivery').val()),
//         minTarif = Number($('.city-to-go option:selected').attr("data-min")),
//         result = $('.sum'),
//         interSum = 0,
//         tarifSum = 0,
//         heavySum = 0,
//         mass = 0,
//         sum = 0;
//
//     console.log(cityToGoTarif);
//
//     //заменяем , на .
//     volume = replaceVolume(volume);
//
//     //проверка на заполнение поля объем
//     if(volume != "") {
//         mass = checkWeight(weight, volume);
//         tarifSum = cityToGoTarif * mass;
//         if(tarifSum < minTarif) {
//             tarifSum = minTarif;
//         }
//     } else {
//         tarifSum = cityToGoTarif * weight;
//         if(tarifSum < minTarif) {
//             tarifSum = minTarif;
//         }
//     }
//     //проверка на заполнение поля характер груза
//     if(character != "") {
//         mass = checkWeight(weight, volume);
//         interSum = checkCharacterCargo(cityToGo, character, interSum, mass, result, volume, tarifSum);
//     }
//     //проверка на заполнение поля тяжеловесный груз
//     if(heavyWeight != "" && heavyWeight < 200) {
//         heavySum = checkHeavyWeight(heavyWeight, result, cityToGo);
//     }
//
//     sum = tarifSum + interSum + heavySum + delivery;
//
//     if(character == 4){
//         result.html("Данная категория уточняется у менеджера");
//     } else if(heavyWeight != "" && heavyWeight >= 200) {
//         result.html("Вес превышает 200кг, уточняйте стоимость и возможность перевозки у менеджера");
//     } else {
//         result.html(sum + " рублей");
//     }
// }
//
// function checkCharacterCargo(cityToGo, character, interSum, mass, result, volume, tarifSum) {
//     //проверка на три направления-исключения + проверка характера груза
//     if (cityToGo == "Бодайбо" || cityToGo == "Ленск" || cityToGo == "Якутск") {
//         switch(cityToGo) {
//             case 'Бодайбо':
//                 interSum = 950;
//                 break;
//             case 'Ленск':
//                 interSum = 750;
//                 break;
//             case 'Якутск':
//                 interSum = 950;
//                 break;
//         }
//     } else {
//         if(character == 1 || character == 2 || character == 6 || character == 7) {
//             if(mass < 100) {
//                 interSum = 750;
//             } else {
//                 interSum = (mass * 4) + 350;
//             }
//         } else if(character == 3 || character == 5) {
//             if(mass < 100) {
//                 interSum = 1000;
//             } else {
//                 interSum = (mass * 6) + 500
//             }
//         } else if(character == 0){
//             interSum = 0;
//         }
//     }
//     return interSum;
// }
//
// function checkWeight(weight, volume) {
//     if((volume * 167) < weight) {
//         return weight;
//     } else {
//         return volume * 167;
//     }
//     //получаем массу в зависимости от объема (больше или меньше 1м3)
//     // if(volume < 1) {
//     //     return volume * weight;
//     // } else {
//     //     return 167 * volume;
//     // }
// }
//
// function checkHeavyWeight(heavyWeight, result, cityToGo) {
//     //тяжеловесный груз
//     if(cityToGo == "Ленск") {
//         return heavyWeight * 30;
//     } else {
//         return heavyWeight * 10;
//     }
// }
//
// function replaceVolume(volume) {
//     return Number(volume.split(",").join('.'));
// }
//
// function proverka(input) {
//     var value = input.value;
//     var rep = /[-;":'a-zA-Zа-яА-Я]/;
//     if (rep.test(value)) {
//         value = value.replace(rep, '');
//         input.value = value;
//     }
// }