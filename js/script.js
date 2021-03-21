/*--- Constant Variables (data that never changes) ---*/
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const MODAL_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

/*--- State Variables (data that changes) ---*/
let drinks;


/*--- Cached Element References (parts of DOM we need to touch) ---*/
const $input = $('input[type=text]');
const $drinks = $('#drinks');
const $ingredients = $('.ingredients');

/*--- Event Listeners ---*/
$('form').on('submit', handleGetData);
$drinks.on('click', '.card', handleShowModal);

/*--- Functions ---*/
/* Card Functions */
function handleGetData(evt) {
    evt.preventDefault();
    const userInput = $input.val();
    $.ajax(BASE_URL + userInput)
        .then(function (data) {
            drinks = data;
            render();
        }, function (error) {
            console.log(error);
        });
    /* clears input */
    $input.val('');
}

function render() {
    // console.log(data);
    const html = drinks.drinks.map(function (drink) {
        return `
            <article class="card">
                <h2>${drink.strDrink}</h2>
                <img src="${drink.strDrinkThumb}"/>
            </article>
        `;
    });
    /* provides a blank page then appends drinks from new search */
    $drinks.empty().append(html);
}

/* Modal Functions */
function handleShowModal(info) {
    // console.log(data);
    $ingredients.empty();
    const drinkName = info.currentTarget.outerText;
    // console.log(drinkName);
    $.ajax(MODAL_URL + drinkName)
        .then(function (data) {
            modalData(data);
        }, function (error) {
            console.log(error);
        });
    $('.modal').modal();
}

function modalData(data) {
    for (let i = 1; i < 16; i++) {
        let ingredient = document.createElement('p');
        ingredient.innerHTML = data.drinks[0][`strIngredient${i}`];
        $ingredients.append(ingredient);
    }
}