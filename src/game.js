//Быки и коровы
//Кол-во совпавших чисел (a)
//Из них на своем месте (b)

let table = document.getElementById("game_tab")
let defaultTable = document.getElementById("game_tab").innerHTML
let us_number = document.getElementById("number")
let number_move = document.getElementById("number_move")
let make_new_move = document.getElementById("new_move")
let lvl = 1
let numberIsPC = generate_number()
let numberIsUs
us_number.focus()
let dif = document.getElementById("dif")

let userDigit = document.getElementById('UserDigit')
userDigit.onclick = () => {
    location.reload()
    console.log(123456789)
        //chat_send(`счет обнулен`, 3)
}

let send = document.getElementById("send")
let no_number = document.getElementById("no_number")
let game_started = false
let is_a_b = true
let chat = document.getElementById("chat")
let msgsPC = document.getElementById("msg")

us_number.oldPLH = us_number.placeholder

let train_start = false

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

us_number.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkInput(us_number)
        number_move.focus()
    }
});

function generate_number() {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    array.splice(4, array.length - 4);
    return array.join('')
}

function check_number(numm_string) {
    if (typeof numm_string != `string`) { numm_string = numm_string.toString() }
    if (numm_string == "") return `Не указано число`
    let array = numm_string.split('')
    let access = true
    array = array.map(e => { return Number(e) })
    if (array.length != 4) { return `Число должно быть четырехзначным` }
    for (i in array) {
        for (j in array) {
            if (isNaN(array[i]) || isNaN(array[j])) { access = `Число должно состоять из цифр`; break }
            if (i != j) {
                if (array[i] == array[j]) { access = `Не допускаются повторяющиеся цифры`; break }
            }
        }
        if (access !== true) { break; }
    }
    return access
}

function check_a_b(aORb) {
    if (aORb == "") return false
    if (typeof aORb != `number`) { aORb = Number(aORb) }
    if (isNaN(aORb)) return false
    if (aORb > 4 || aORb < 0) return false
    return true
}
number_move.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        make_new_move.click()
    }
});

function checkInput(input) {
    let valid_us_numm = 0
    let summ = input.value
    if (no_number.checked && input.hasOwnProperty(`oldPLH`)) { summ = 1234 }
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
make_new_move.onclick = async() => {
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


send.onclick = () => {
    let inputs_a_b = document.getElementsByClassName(`input_a_b`)
    let a_pc = document.getElementById(`pc_a_${lvl-1}`)
    let b_pc = document.getElementById(`pc_b_${lvl-1}`)
    let a_us = document.getElementById(`us_a_${lvl-1}`)
    let b_us = document.getElementById(`us_b_${lvl-1}`)
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
        swal(`Ничья, число компьютера ${numberIsPC}`);
        returnGame()
    } else if (b_us.innerHTML == 4 && a_us.innerHTML == 4) {
        swal(`Ты выиграл, число компьютера ${numberIsPC}`);
        document.getElementById("u_count").innerHTML++
            returnGame()
    } else if (b_pc.innerHTML == 4 && a_pc.innerHTML == 4) {
        swal(`Компьютер выйграл, его число ${numberIsPC}`);
        returnGame()
        document.getElementById("c_count").innerHTML++
    }
    make_new_move.disabled = false
    send.style.visibility = `hidden`
    number_move.focus()


}

function findSameNumbers(expected_number, real_number) {
    let a = 0 //кол-во совпавших чисел
    let b = 0 //из них на своем месте
    for (i in expected_number) {
        for (j in real_number) {
            if (expected_number[i] == real_number[j]) {
                a++
            }
        }
    }
    for (i = 0; i < 4; i++) {
        if (expected_number[i] == real_number[i]) {
            b++
        }
    }
    return [a, b]
}