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
                for (;;) {
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
                    if (dif.value == "easy") { counting_moves -= 4 }
                    if (dif.value == "normal") { counting_moves -= 2 }
                    let back_move = []
                    for (let i = 1; i < counting_moves; i++) {
                        back_move.push(document.getElementById(`pc_numm_${i}`).innerHTML)
                    }
                    expected_move = []
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
                        setTimeout(() => { returnGame() }, 16000)
                        return
                    }
                    if (Math.floor(100 / expected_move.length) > 0) {
                        let msgPC = `Я на ${(100 / expected_move.length).toFixed(0)}% уверен в своей победе)`
                        console.log(expected_move)
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
    ab_pc = [0, 0]
    let ab_us = findSameNumbers(anticipated_number_Us, numberIsPC)
    if (!us_number.check) {
        console.log(anticipated_number_PC, numberIsUs)
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
        a_b_input[0].addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                a_b_input[1].focus()
                a_b_input[0].background = `#FFFFFF`
            }
        });
        a_b_input[1].addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                send.click()
            }
        });
    }
    console.log(anticipated_number_PC == numberIsUs, no_number.checked)
    if (anticipated_number_PC == numberIsUs && anticipated_number_Us == numberIsPC) {
        swal(`Ничья, число компьютера ${numberIsPC}`);
        returnGame()
    } else if (anticipated_number_Us == numberIsPC) {
        swal(`Ты выиграл, число компьютера ${numberIsPC}`);
        document.getElementById("u_count").innerHTML++
            returnGame()
    } else if (anticipated_number_PC == numberIsUs) {
        swal(`Компьютер выиграл, его число ${numberIsPC}`);
        document.getElementById("c_count").innerHTML++
            returnGame()
    }
}

function returnGame() {
    setTimeout(() => {
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
        swal(`Следующая партия`)
    }, 10000)
}