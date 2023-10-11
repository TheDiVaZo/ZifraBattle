//Быки и коровы
//Кол-во совпавших чисел (a)
//Из них на своем месте (b)
import avatar from './img/computer.jpg'

!async function () {
    await chat_send(`Привет! Ты попал в игру "Цифровой баттл"`, 2000)

    await chat_send(`Я, искусственный интеллект, который будет с тобой играть. Провести обучение правилам?
    `, 2000, true)
    document.getElementById(`yes`).onclick = async () => {
        if (train_start || game_started) return
        train_start = true
        document.getElementById(`no`).disabled = true
        document.getElementById(`yes`).disabled = true
        await chat_send(`Вкратце объясняю Правила игры:
        {space}
        Компьютер и игрок задумывают <b>четырехзначное число</b> из различных (неповторяющихся) цифр в диапазоне от 0 до 9. 
        {space}
        Игрок и компьютер по очереди делают ходы, чтобы узнать загаданное число друг друга.
        {space}
        Каждый ход состоит из четырёх <b>неповторяющихся</b> цифр, 0 может стоять на первом месте.
        {space}
        В ответ компьютер и игрок называют число отгаданных цифр и число этих же цифр, но стоящих на своих местах.

        Запомните: Цифры в числе НЕ ДОЛЖНЫ повторяться. То есть 2345, 6743 <b>можно</b>, а 5555 или 5465 <b>нельзя загадывать!</b>
        `, 3000)
        await chat_send(`Также можно выбрать уровень сложности.
        {space}
        Для удобства можно записать свое число в верхнее поле, чтобы автоматически получать результаты
        по количеству совпавших чисел и сколько из них стоит на своем месте
        {space}
        Либо можно просто записать свое число на бумаге, но при этом нужно быть внимательным при ответах,
        не допускать ошибок, иначе компьютер не сможет играть дальше и все придется начинать заново
        {space}
        Начинаем играть!
        `, 25000)
        await chat_send(`Я загадал свое число! Загадывай свое и делай ход`, 3000)
    }
    document.getElementById(`no`).onclick = async () => {
        if (train_start || game_started) return
        document.getElementById(`no`).disabled = true
        document.getElementById(`yes`).disabled = true
        train_start = true
        await chat_send(`Начинаем играть!`, 2000)
        await chat_send(`Я загадал свое число! Загадывай свое и делай ход!`, 3000)
    }
}(document)
!function (d) {

    "use strict";

    /**
     * Основная функция.
     * @param {Object} [settings] - предвартиельные настройки
     */
    window.note = function (settings) {

        /**
         * Настройки по умолчанию
         */
        settings = Object.assign({}, {
            callback: false,
            content: "",
            time: 4.5,
            type: "info"
        }, settings);

        if (!settings.content.length) return;

        /**
         * Функция создания элементов
         * @param {String} name - название DOM-элемента
         * @param {Object} attr - объект с атрибутами
         * @param {Object} append - DOM-элемент, в который будет добавлен новый узел
         * @param {String} [content] - контент DOM-элемента
         */
        var create = function (name, attr, append, content) {
            var node = d.createElement(name);
            for (var val in attr) {
                if (attr.hasOwnProperty(val)) node.setAttribute(val, attr[val]);
            }
            if (content) node.insertAdjacentHTML("afterbegin", content);
            append.appendChild(node);
            if (node.classList.contains("note-item-hidden")) node.classList.remove("note-item-hidden");
            return node;
        };

        /**
         * Генерация элементов
         */
        var noteBox = d.getElementById("notes") || create("div", {"id": "notes"}, d.body);
        var noteItem = create("div", {
                "class": "note-item",
                "data-show": "false",
                "role": "alert",
                "data-type": settings.type
            }, noteBox),
            noteItemText = create("div", {"class": "note-item-text"}, noteItem, settings.content),
            noteItemBtn = create("button", {
                "class": "note-item-btn",
                "type": "button",
                "aria-label": "Скрыть"
            }, noteItem);

        /**
         * Функция проверки видимости алерта во viewport
         * @returns {boolean}
         */
        var isVisible = function () {
            var coords = noteItem.getBoundingClientRect();
            return (
                coords.top >= 0 &&
                coords.left >= 0 &&
                coords.bottom <= (window.innerHeight || d.documentElement.clientHeight) &&
                coords.right <= (window.innerWidth || d.documentElement.clientWidth)
            );
        };

        /**
         * Функция удаления алертов
         * @param {Object} [el] - удаляемый алерт
         */
        var remove = function (el) {
            el = el || noteItem;
            el.setAttribute("data-show", "false");
            window.setTimeout(function () {
                el.remove();
            }, 250);
            if (settings.callback) settings.callback(); // callback
        };

        /**
         * Удаление алерта по клику на кнопку
         */
        noteItemBtn.addEventListener("click", function () {
            remove();
        });

        /**
         * Визуальный вывод алерта
         */
        window.setTimeout(function () {
            noteItem.setAttribute("data-show", "true");
        }, 250);


        /**
         * Проверка видимости алерта и очистка места при необходимости
         */
        if (!isVisible()) remove(noteBox.firstChild);

        /**
         * Автоматическое удаление алерта спустя заданное время
         */
        window.setTimeout(remove, settings.time * 1000);

    };

}(document)

let table = document.getElementById("game_tab")
let defaultTable = document.getElementById("game_tab").innerHTML

let us_number = document.getElementById("number")
us_number.focus()
let number_move = document.getElementById("number_move")
let make_new_move = document.getElementById("new_move")

let lvl = 1
let numberIsPC = generate_number()
let numberIsUs;

let dif = document.getElementById("dif")

let userDigit = document.getElementById('UserDigit')

let send = document.getElementById("send")
let no_number = document.getElementById("no_number")
let game_started = false
let is_a_b = true
let chat = document.getElementById("chat")
let msgsPC = document.getElementById("msg")

us_number.oldPLH = us_number.placeholder

let train_start = false

make_new_move.onclick = async () => {
    make_new_move.blur()
    checkInput(us_number)
    checkInput(number_move)
    numberIsUs = us_number.value
    //начало игры
    game()
    //конец игры
    number_move.value = ``
    number_move.focus()
}
send.onclick = async () => {
    let inputs_a_b = document.getElementsByClassName(`input_a_b`)
    let a_pc = document.getElementById(`pc_a_${lvl - 1}`)
    let b_pc = document.getElementById(`pc_b_${lvl - 1}`)
    let a_us = document.getElementById(`us_a_${lvl - 1}`)
    let b_us = document.getElementById(`us_b_${lvl - 1}`)
    if (!check_a_b(inputs_a_b[0].value)) {
        inputs_a_b[0].style.background = `#FFBABA`
        inputs_a_b[0].focus()
        return
    }
    inputs_a_b[0].style.background = `#FFFFFF`
    if (!check_a_b(inputs_a_b[1].value)) {
        inputs_a_b[1].style.background = `#FFBABA`
        inputs_a_b[0].focus()
        return
    }
    inputs_a_b[1].style.background = `#FFFFFF`
    a_pc.innerHTML = inputs_a_b[0].value
    b_pc.innerHTML = inputs_a_b[0].value
    if (b_pc.innerHTML == 4 && a_pc.innerHTML == 4 && b_us.innerHTML == 4 && a_us.innerHTML == 4) {
        await swal(`Ничья, число компьютера ${numberIsPC}`);
        returnGame()
    } else if (b_us.innerHTML == 4 && a_us.innerHTML == 4) {
        await swal(`Ты выиграл, число компьютера ${numberIsPC}`);
        document.getElementById("u_count").innerHTML++
        returnGame()

    } else if (b_pc.innerHTML == 4 && a_pc.innerHTML == 4) {
        await swal(`Компьютер выйграл, его число ${numberIsPC}`)
        returnGame()
        document.getElementById("c_count").innerHTML++
    }
    make_new_move.disabled = false
    send.style.visibility = `hidden`
    number_move.focus()
}
us_number.onfocus = () => {
    us_number.style.backgroundColor = `white`
}
no_number.onclick = () => {
    if (no_number.checked) {
        us_number.disabled = true
        us_number.value = ``
        us_number.placeholder = `Запишите число на бумаге`
        us_number.style.backgroundColor = `white`
    } else {
        us_number.disabled = false
        us_number.placeholder = us_number.oldPLH

    }
    no_number.blur()
}
userDigit.onclick = () => {
    location.reload()
}
number_move.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        make_new_move.click()
    }
})
us_number.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkInput(us_number)
        number_move.focus()
    }
})

function generate_number() {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x) ;
    array.splice(4, array.length - 4);
    return array.join('')
}

function check_number(numm_string) {
    if (typeof numm_string != `string`) {
        numm_string = numm_string.toString()
    }
    if (numm_string == "") return `Не указано число`
    let array = numm_string.split('')
    let access = true
    array = array.map(e => {
        return Number(e)
    })
    if (array.length != 4) {
        return `Число должно быть четырехзначным`
    }
    for (let i in array) {
        for (let j in array) {
            if (isNaN(array[i]) || isNaN(array[j])) {
                access = `Число должно состоять из цифр`;
                break
            }
            if (i != j) {
                if (array[i] == array[j]) {
                    access = `Не допускаются повторяющиеся цифры`;
                    break
                }
            }
        }
        if (access !== true) {
            break;
        }
    }
    return access
}

function check_a_b(aORb) {
    if (aORb === "") return false
    if (typeof aORb !== `number`) {
        aORb = Number(aORb)
    }
    if (isNaN(aORb)) return false
    if (aORb > 4 || aORb < 0) return false
    return true
}

function checkInput(input) {
    let valid_us_numm = 0
    let summ = input.value
    if (no_number.checked && input.hasOwnProperty(`oldPLH`)) {
        summ = 1234
    }
    valid_us_numm = check_number(summ)
    if (valid_us_numm !== true) {
        note({
            content: valid_us_numm,
            type: "error",
            time: 4
        });
        input.style.background = `#FFBABA`
        throw new Error(`Выйди из консоли и проверь поля ввода`)
    }
    number_move.style.background = `#FFFFFF`
}

function findSameNumbers(expected_number, real_number) {
    let a = 0 //кол-во совпавших чисел
    let b = 0 //из них на своем месте
    for (let i in expected_number) {
        for (let j in real_number) {
            if (expected_number[i] === real_number[j]) {
                a++
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        if (expected_number[i] === real_number[i]) {
            b++
        }
    }
    return [a, b]
}

async function game() {
    dif.disabled = true
    no_number.disabled = true
    document.getElementById(`no`).disabled = true
    document.getElementById(`yes`).disabled = true
    game_started = true
    number.disabled = true
    if (no_number.checked) {
        number.value = ``
    }
    let a_us = 0
    let b_us = 0
    let a_pc = 0
    let b_pc = 0
    let anticipated_number_PC = 0
    let anticipated_number_Us = number_move.value
    //искуственный интелект
    {
        if (lvl == 1) {
            anticipated_number_PC = generate_number()
        } else if (lvl == 2) {
            let Number_from_first_move = document.getElementById(`pc_numm_1`).innerHTML
            anticipated_number_PC = generate_number()
            for (; ;) {
                let fsn = findSameNumbers(anticipated_number_PC, Number_from_first_move)
                if (fsn[0] == 0 && fsn[1] == 0) {
                    break;
                } else {
                    anticipated_number_PC = generate_number()
                }
            }
        } else if (lvl >= 3) {
            if (dif.value == "easy" && lvl <= 5) {
                anticipated_number_PC = generate_number()
            } else {
                let counting_moves = lvl
                if (dif.value == "easy") {
                    counting_moves -= 4
                }
                if (dif.value == "normal") {
                    counting_moves -= 2
                }
                let back_move = []
                for (let i = 1; i < counting_moves; i++) {
                    back_move.push(document.getElementById(`pc_numm_${i}`).innerHTML)
                }
                let expected_move = []
                for (let i = 0; i < 9999; i++) {

                    let exp_number = `0000`.slice(i.toString().length) + i.toString()
                    if (check_number(exp_number) === true) {
                        let accept_next = true
                        for (let j in back_move) {
                            if (back_move[j] == exp_number) {
                                accept_next = false
                                break;
                            }
                        }
                        if (accept_next) {
                            for (let m = 1; m < counting_moves; m++) {
                                let count_a_b = findSameNumbers(exp_number, back_move[m - 1])
                                let true_a_b = [Number(document.getElementById(`pc_a_${m}`).innerHTML), Number(document.getElementById(`pc_b_${m}`).innerHTML)]
                                if (count_a_b.toString() != true_a_b.toString()) {
                                    accept_next = false
                                    break;
                                }
                            }
                            if (accept_next) {
                                expected_move.push(exp_number)
                            }
                        }
                    }
                }
                anticipated_number_PC = expected_move[Math.floor(Math.random() * expected_move.length)]
                if (anticipated_number_PC === undefined) {
                    let oops_msgPC = `Вы что-то напутали. 
                    Вы неправильно указали кол-во совпавших или кол-во чисел которые на своем месте. 
                    К сожалению, придется начать с начала ¯\\_(ツ)_/¯`
                    chat_send(oops_msgPC)
                    note({
                        content: `Сообщение от компьютера:
                         ${oops_msgPC}`,
                        type: "warn",
                        time: 13
                    })
                    setTimeout(() => {
                        returnGame()
                    }, 16000)
                    return
                }
                if (Math.floor(100 / expected_move.length) > 0) {
                    let msgPC = `Я на ${(100 / expected_move.length).toFixed(0)}% уверен в своей победе)`
                    
                    note({
                        content: `Сообщение от компьютера: ${msgPC}`,
                        type: "success",
                        time: 5
                    })
                    await chat_send(msgPC)
                }
            }
        }

    }
    //конец интелекта
    let ab_pc = [0, 0]
    let ab_us = findSameNumbers(anticipated_number_Us, numberIsPC)
    if (!us_number.check) {
        
        ab_pc = findSameNumbers(anticipated_number_PC, numberIsUs)
    }
    a_pc = ab_pc[0]
    b_pc = ab_pc[1]
    a_us = ab_us[0]
    b_us = ab_us[1]
    newCollons(anticipated_number_Us, anticipated_number_PC, a_us, b_us, a_pc, b_pc)
    if (no_number.checked) {
        make_new_move.disabled = true
        send.style.visibility = `visible`
        let a_b_input = document.getElementsByClassName(`input_a_b`)
        a_b_input[0].focus()
        a_b_input[0].addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                a_b_input[1].focus()
                a_b_input[0].background = `#FFFFFF`
            }
        });
        a_b_input[1].addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                send.click()
            }
        });
    }
    
    if (anticipated_number_PC == numberIsUs && anticipated_number_Us == numberIsPC) {
        await swal(`Ничья, число компьютера ${numberIsPC}`);
        returnGame()
    } else if (anticipated_number_Us == numberIsPC) {
        await swal(`Ты выиграл, число компьютера ${numberIsPC}`);
        document.getElementById("u_count").innerHTML++
        returnGame()
    } else if (anticipated_number_PC == numberIsUs) {
        await swal(`Компьютер выиграл, его число ${numberIsPC}`);
        document.getElementById("c_count").innerHTML++
        returnGame()
    }
}

function checkWin() {

}

function returnGame() {
    send.style.visibility = 'hidden'
    make_new_move.disabled = false
    dif.disabled = false
    no_number.disabled = false
    game_started = false
    number.disabled = false
    number.value = ``
    no_number.disabled = false
    no_number.checked = true
    no_number.click()
    number_move.disabled = false
    lvl = 1
    numberIsPC = generate_number()
    numberIsUs = undefined
    document.querySelectorAll('.tb').forEach(e => e.parentNode.removeChild(e));
    swal(`Следующая партия!`)
}

function newCollons(nummUs, nummPC, a_us, b_us, a_pc, b_pc) {
    if (lvl > 1) {
        document.getElementById(`tb_${lvl - 1}`).style = ``
    }
    if (no_number.checked) {
        a_pc = `<input id="pc_a_input_${lvl}" class="input_a_b" type="text" style="text-align:center" placeholder="?">`
        b_pc = `<input id="pc_b_input_${lvl}" class="input_a_b" type="text" style="text-align:center" placeholder="?">`
    }
    let tbody = document.createElement('tbody')
    tbody.setAttribute("id", `tb_${lvl}`)
    tbody.setAttribute("class", `tb`)
    tbody.innerHTML = `
    <tr>
    <td>${lvl}</td>
    <td id="us_numm_${lvl}">${nummUs}</td>
    <td id="us_a_${lvl}">${a_us}</td>
    <td id="us_b_${lvl}">${b_us}</td>
    <td id="pc_numm_${lvl}">${nummPC}</td>
    <td id="pc_a_${lvl}">${a_pc}</td>
    <td id="pc_b_${lvl}">${b_pc}</td>
    </tr>`
    table.appendChild(tbody)
    document.getElementById(`tb_${lvl}`).style = `animation: opacityObject 2s 1;`
    document.getElementById("fakeDivBlock").remove()
    document.getElementById("fkTest").innerHTML += `<div id="fakeDivBlock">

    </div>`
    lvl++

}

async function chat_send(msg = ``, time, attachment = false) {
    document.getElementsByClassName(`loading`)[0].style.visibility = `visible`
    let newLine = msg.split(/\n/).filter((e) => {
        return !e.match(/^\s+$/)
    })
    let P = ``
    for (let i in newLine) {
        if (newLine[i].includes(`{space}`)) {
            P += `<br>`
        } else {
            P += `<p>${newLine[i]}</p>`
        }
    }
    let times = {
        hour: new Date().getHours(),
        minute: (new Date().getMinutes()) < 10 ? `0${(new Date().getMinutes())}` : (new Date().getMinutes())
    }
    if (!attachment) attachment = ``
    else attachment = `
    <form>
        <input type="button" value="Пройти обучение" id="yes" class="msg_button"></input>
        <input type="button" value="Пропустить" id="no" class="msg_button"></input>
    </form>`
    let noteItem = `
    <div class="container" id="anim_nsg_PC">
        <img src=` + avatar + ` alt="Avatar">
        ${P}
        ${attachment}
        <span class="time-right">${times.hour}:${times.minute}</span>
    </div>
    `
    let sendText = new Promise((res, rej) => {
        setTimeout(() => {
            document.getElementsByClassName(`loading`)[0].style.visibility = `hidden`
            let newmsg = document.getElementById(`anim_nsg_PC`)
            if (newmsg !== null) {
                newmsg.id = ``
            }
            document.getElementById("msg").innerHTML += noteItem
            chat.scroll(0, 5000)
            res(true)
        }, time)
    })
    await sendText

}

