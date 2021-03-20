/*--- Constant Variables (data that never changes) ---*/
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

/*--- State Variables (data that changes) ---*/
// let drinks;

/*--- Cached Element References (parts of DOM we need to touch) ---*/
const $input = $('input[type=text]');
const $drinks = $('#drinks');

/*--- Event Listeners ---*/
$('form').on('submit', handleGetData);

/*--- Functions ---*/
function handleGetData(evt) {
    evt.preventDefault();
    const userInput = $input.val();
    $.ajax(BASE_URL + userInput)
        .then(function(data) {
            // drinks = data;
            render(data);
        }, function(error) {
            console.log(error);
        });
    // clears input
    $input.val('');
}

function render(data) {
    // console.log(data);
    const html = data.drinks.map(function (info) {
        return `
            <article class="card">
                <h3>${info.strDrink}</h3>
                <img src="${info.strDrinkThumb}"/>
            </article>
        `;
    });
    $drinks.empty().append(html);
}