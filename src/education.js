!async function() {
    await chat_send(`Привет! Ты попал в игру "Цифровой баттл"`, 2000)

    await chat_send(`Я, искусственный интеллект, который будет с тобой играть. Провести обучение правилам?
    `, 2000, true)
    document.getElementById(`yes`).onclick = async() => {
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
    document.getElementById(`no`).onclick = async() => {
        if (train_start || game_started) return
        document.getElementById(`no`).disabled = true
        document.getElementById(`yes`).disabled = true
        train_start = true
        await chat_send(`Начинаем играть!`, 2000)
        await chat_send(`Я загадал свое число! Загадывай свое и делай ход!`, 3000)
    }
}(document)