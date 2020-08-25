class Calculator {
    constructor() {
        this.form = $('.calculation');
        this.button = $('#price');
        this.cityToGoTarif = 0;
        this.cityToGo = '';
        this.weight = 0,
        this.volume = 0,
        this.character = 0,
        this.heavyWeight = 0,
        this.delivery = 0,
        this.minTarif = 0,
        this.result = $('.sum'),
        this.interSum = 0,
        this.tarifSum = 0,
        this.heavySum = 0,
        this.mass = 0,
        this.sum = 0;

        this.initEvents();
    }

    initEvents() {
        //инициализация при вводе
        $('.js-field').each(function() {
            $(this).on('change', function () {
                calculator.clickButton();
            });
        });

        //инициализация по клику (у тебя в "on" вызывается анонимная функция, в ней this не является текущим объектом класса, а является объектом на который вызывается "on")
        // this.button.on('click', function (e) {
        //     e.preventDefault();
        //     calculator.clickButton();
        // });
    }

    //инициализация функций по клику
    clickButton() {
        this.getValue();
        this.getTextValue();
        this.getDataAttr();

        this.checkVolumeField();
        this.checkCharacterField();
        this.checkHeavyWeightField();

        this.sum = this.tarifSum + this.interSum + this.heavySum + this.delivery;

        if(this.character == 4){
            this.result.html("Данная категория уточняется у менеджера");
        } else if(this.heavyWeight != "" && this.heavyWeight >= 200) {
            this.result.html("Вес превышает 200кг, уточняйте стоимость и возможность перевозки у менеджера");
        } else {
            this.result.html(this.sum + " рублей");
        }
    }

    //получаем значения с числовых значений формы
    getValue() {
        let array = [];
        $('.js-field').each(function() {
            array.push(this.value);
        });

        return this.cityToGoTarif = array[0],
                this.weight = array[1],
                this.volume = array[2],
                this.character = array[3],
                this.heavyWeight = array[4],
                this.delivery = array[5];
    }

    //получаем текстовое значение формы
    getTextValue() {
        return this.cityToGo = $('.city-to-go option:selected').text();
    }

    //получаем дата атрибут
    getDataAttr() {
        return this.minTarif = Number($('.city-to-go option:selected').attr("data-min"));
    }

    //проверка заполнения поля объем
    checkVolumeField() {
        //заменяем , на .
        this.volume = this.replaceVolume(this.volume);

        if(this.volume != "") {
            this.mass = this.checkWeight(this.weight, this.volume);
            this.tarifSum = this.cityToGoTarif * this.mass;
            if(this.tarifSum < this.minTarif) {
                return this.tarifSum = this.minTarif;
            } else {
                return this.tarifSum; //надо проверить
            }
        } else {
            this.tarifSum = this.cityToGoTarif * this.weight;
            if(this.tarifSum < this.minTarif) {
                return this.tarifSum = this.minTarif;
            } else {
                return this.tarifSum; //надо проверить
            }
        }
    }

    //проверка на заполнение поля характер груза
    checkCharacterField() {
        if(this.character != "") {
            this.mass = this.checkWeight(this.weight, this.volume);
            return this.interSum = this.checkCharacterCargo(this.cityToGo, this.character, this.interSum, this.mass);
        }
    }

    //проверка на заполнение поля тяжеловесный груз
    checkHeavyWeightField() {
        if(this.heavyWeight != "" && this.heavyWeight < 200) {
            return this.heavySum = this.checkHeavyWeight(this.heavyWeight, this.result, this.cityToGo);
        }
    }

    //замена , на .
    replaceVolume(volume) {
        return Number(volume.split(",").join('.'));
    }

    //проверка веса
    checkWeight(weight, volume) {
        if((volume * 167) < weight) {
            return weight;
        } else {
            return volume * 167;
        }
    }

    //проверка характера груза
    checkCharacterCargo(cityToGo, character, interSum, mass) {
        //проверка на три направления-исключения + проверка характера груза
        if (cityToGo == "Бодайбо" || cityToGo == "Ленск" || cityToGo == "Якутск") {
            switch(cityToGo) {
                case 'Бодайбо':
                    interSum = 950;
                    break;
                case 'Ленск':
                    interSum = 750;
                    break;
                case 'Якутск':
                    interSum = 950;
                    break;
            }
        } else {
            if(character == 1 || character == 2 || character == 6 || character == 7) {
                if(mass < 100) {
                    interSum = 750;
                } else {
                    interSum = (mass * 4) + 350;
                }
            } else if(character == 3 || character == 5) {
                if(mass < 100) {
                    interSum = 1000;
                } else {
                    interSum = (mass * 6) + 500
                }
            } else if(character == 0){
                interSum = 0;
            }
        }
        return interSum;
    }

    //проверка тяжеловесного груза
    checkHeavyWeight(heavyWeight, result, cityToGo) {
        if(cityToGo == "Ленск") {
            return heavyWeight * 30;
        } else {
            return heavyWeight * 10;
        }
    }

}

const calculator = new Calculator();

// $(document).ready(function () {
//     $('#price').on('click', function (e) {
//         e.preventDefault();
//         calculator.clickButton();
//     });
// });


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

