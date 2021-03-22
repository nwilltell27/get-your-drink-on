/*--- Constant Variables (data that never changes) -------------------------------*/
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const MODAL_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

/*--- State Variables (data that changes) ---*/
let drinks;
let drink;

/*--- Cached Element References (parts of DOM we need to touch) ------------------*/
const $head = $('h1');
const $input = $('input[type=text]');
const $drinks = $('#drinks');

const $searchForm = $('#searchForm');
    /* Init Buttons */
const $byName = $('#byDrinkName');
const $byIngredient = $('#byIngredient');
    /* Modal References */
const $ingredients = $('.ingredients');
const $measurements = $('.measurements');
const $directions = $('#details > a');
const $steps = $('.steps');

/*--- Event Listeners ------------------------------------------------------------*/
$head.on('click', handleInit)
$('form').on('submit', handleGetData);

// $byIngredient.on('click', handleByIngredient);

    /* Modal Events */
$drinks.on('click', '.card', handleShowModal);
$directions.on('click', handleShowSteps);


/*--- Functions ------------------------------------------------------------------*/
handleInit();

function handleInit() {
    $drinks.empty();
    // $searchForm.empty();
}

    /* Init Button Functions */
// function handleByIngredient() {
//     const $searchIngredient = $(`
//         <input id="searchDrink" type="text" placeholder="Enter Ingredient">
//         <input id="searchButton" class="buttons" type="submit" value="Find Your Drink!">
//     `);
//     $searchForm.empty().append($searchIngredient);
// }

/* Drink Card Functions */
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

/*--- Modal Functions ---*/
/* First Modal */
function handleShowModal(info) {
    /* removes content before adding new data */
    $ingredients.empty();
    $measurements.empty();
    $steps.empty();
    drink = info.currentTarget.outerText;
    $.ajax(MODAL_URL + drink)
        .then(function (data) {
            modalTitle(data);
            ingrData(data);
            msmtData(data);
        }, function (error) {
            console.log(error);
        });
    $('#details').modal({
        fadeDuration: 500,
        fadeDelay: 1.0
    });
}

function ingrData(data) {
    for (let i = 1; i < 16; i++) {
        let ingredient = document.createElement('p');
        ingredient.innerHTML = data.drinks[0][`strIngredient${i}`];
        $ingredients.append(ingredient);
    }
}

function msmtData(data) {
    for (let i = 1; i < 16; i++) {
        let measurement = document.createElement('p');
        measurement.innerHTML = data.drinks[0][`strMeasure${i}`];
        $measurements.append(measurement);
    }
}

function modalTitle(data) {
    $('#title').text(data.drinks[0]['strDrink']);
    $('#drinkPic').attr({
        src: data.drinks[0]['strDrinkThumb'],
        alt: data.drinks[0]['strDrink'],
    });
}

/* Second Modal */
function handleShowSteps() {
    $.ajax(MODAL_URL + drink)
        .then(function (data) {
            drinkSteps(data);
        }, function (error) {
            console.log(error);
        });
    $('#instructions').modal({
        closeExisting: false
    });
}

function drinkSteps(data) {
    $('.steps').text(data.drinks[0]['strInstructions']);
}