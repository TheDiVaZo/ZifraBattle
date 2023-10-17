export const postData = async (url = '', data = {}) => {
    // Формируем запрос
    const response = await fetch(url, {
        // Метод, если не указывать, будет использоваться GET
        method: 'POST',
        // Заголовок запроса
        headers: {
            'Content-Type': 'application/json'
        },
        // Данные
        body: JSON.stringify(data)
    });
    return response.json();
}
export const getJSONFromGame = (numberIsUser, numberIsPC, typeGame) => {
    let game = {
        version: "2.0.0",
        user_begin_number: numberIsUser,
        computer_begin_number: numberIsPC,
        typeGame: typeGame,
        movies: []
    };
    document.querySelectorAll(".tb").forEach((elem)=>{
        let elements = elem.getElementsByTagName("tr")[0].children;
        let move = {
            user_number: parseInt(elements[1].innerHTML),
            user_number_matched: parseInt(elements[2].innerHTML),
            user_number_place: parseInt(elements[3].innerHTML),
            computer_number: parseInt(elements[4].innerHTML),
            computer_number_matched: parseInt(elements[5].innerHTML),
            computer_number_place: parseInt(elements[6].innerHTML)
        }
        game.movies.push(move)
    })
    return game;
}