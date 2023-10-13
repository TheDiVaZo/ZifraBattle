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
export const getResultFromGame = () => {
    let result = [];
    document.querySelectorAll(".tb").forEach((elem)=>{
        let elements = elem.getElementsByTagName("tr")[0];
        let number = parseInt(elem.getElementsByTagName("tr")[0].children[0].innerHTML);
        // let object = {
        //     us_numm = elements.
        // }
    })
}