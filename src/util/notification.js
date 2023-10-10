! function(d) {

    "use strict";

    /**
     * Основная функция.
     * @param {Object} [settings] - предвартиельные настройки
     */
    window.note = function(settings) {

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
        var create = function(name, attr, append, content) {
            var node = d.createElement(name);
            for (var val in attr) { if (attr.hasOwnProperty(val)) node.setAttribute(val, attr[val]); }
            if (content) node.insertAdjacentHTML("afterbegin", content);
            append.appendChild(node);
            if (node.classList.contains("note-item-hidden")) node.classList.remove("note-item-hidden");
            return node;
        };

        /**
         * Генерация элементов
         */
        var noteBox = d.getElementById("notes") || create("div", { "id": "notes" }, d.body);
        var noteItem = create("div", {
                "class": "note-item",
                "data-show": "false",
                "role": "alert",
                "data-type": settings.type
            }, noteBox),
            noteItemText = create("div", { "class": "note-item-text" }, noteItem, settings.content),
            noteItemBtn = create("button", {
                "class": "note-item-btn",
                "type": "button",
                "aria-label": "Скрыть"
            }, noteItem);

        /**
         * Функция проверки видимости алерта во viewport
         * @returns {boolean}
         */
        var isVisible = function() {
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
        var remove = function(el) {
            el = el || noteItem;
            el.setAttribute("data-show", "false");
            window.setTimeout(function() {
                el.remove();
            }, 250);
            if (settings.callback) settings.callback(); // callback
        };

        /**
         * Удаление алерта по клику на кнопку
         */
        noteItemBtn.addEventListener("click", function() { remove(); });

        /**
         * Визуальный вывод алерта
         */
        window.setTimeout(function() {
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

}(document);

async function chat_send(msg = ``, time, attachment = false) {
    document.getElementsByClassName(`loading`)[0].style.visibility = `visible`
    let newLine = msg.split(/\n/).filter((e) => { return !e.match(/^\s+$/) })
    let P = ``
    for (i in newLine) {
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
        <img src="../computer.jpg" alt="Avatar">
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

function newCollons(nummUs, nummPC, a_us, b_us, a_pc, b_pc) {
    if (lvl > 1) {
        document.getElementById(`tb_${lvl-1}`).style = ``
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