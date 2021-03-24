/*--- Constant Variables (data that never changes) -------------------------------*/
const INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINKNAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const RANDOM_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

/*--- State Variables (data that changes) ----------------------------------------*/
let drinks;
let drink;
let $input;

/*--- Cached Element References (parts of DOM we need to touch) ------------------*/
const $head = $('h1');
const $drinks = $('#drinks');
const $searchFormIngredient = $('#searchFormIngredient');
const $searchFormName = $('#searchFormName');

/* Buttons */
const $byName = $('#byDrinkName');
const $byIngredient = $('#byIngredient');
const $getRandom = $('#getRandom > button');

/* Modal References */
const $ingredients = $('.ingredients');
const $measurements = $('.measurements');
const $directions = $('#details > a');
const $steps = $('.steps');

/*--- Event Listeners ------------------------------------------------------------*/
$head.on('click', handleInit)
$searchFormIngredient.on('submit', handleGetDataByIngredient);
$searchFormName.on('submit', handleGetDataByName);

/* Buttons */
$byIngredient.on('click', handleByIngredient);
$byName.on('click', handleByName);
$getRandom.on('click', handleInit);

/* Modal Events */
$drinks.on('click', '.card', handleFirstModal);
$directions.on('click', handleSecondModal);

/*--- Functions ------------------------------------------------------------------*/
/*--- Initialize Website ---*/
init();

function init() {
    // $drinks.empty();
    // $searchFormIngredient.empty();
    // $searchFormName.empty();
    clearModals();
    handleByName();
    getRandom();
}

/* Gets Random Cocktail */
function getRandom() {
    $.ajax(RANDOM_URL)
        .then(function (data) {
            drinks = data;
            render();
        }, function (error) {
            console.log(error);
        });
}

function handleInit() {
    init();
}

/*--- Search Button Functions ---*/
function handleByIngredient() {
    const $searchIngredient = $(`
        <input id="searchIngredient" class="searching" type="text" placeholder="Enter Ingredient">
        <input id="searchButton" class="buttons" type="submit" value="Find Your Drink!">
    `);
    $searchFormName.empty();
    $searchFormIngredient.empty().append($searchIngredient);
    $input = $('input[type=text]');
}

function handleByName() {
    const $searchName = $(`
        <input id="searchDrink" class="searching" type="text" placeholder="Enter Drink Name">
        <input id="searchButton" class="buttons" type="submit" value="Find Your Drink!">
    `);
    $searchFormIngredient.empty();
    $searchFormName.empty().append($searchName);
    $input = $('input[type=text]');
}

/*--- Drink Card Functions ---*/
function handleGetDataByIngredient(evt) {
    evt.preventDefault();
    const userInput = $input.val();
    if (userInput === '') return;
    $.ajax(INGREDIENT_URL + userInput)
        .then(function (data) {
            drinks = data;
            render();
        }, function (error) {
            console.log(error);
        });
    /* clears input */
    $input.val('');
}

function handleGetDataByName(evt) {
    evt.preventDefault();
    const userInput = $input.val();
    if (userInput === '') return;
    $.ajax(DRINKNAME_URL + userInput)
        .then(function (data) {
            drinks = data;
            render();
        }, function (error) {
            console.log(error);
        });
    /* clears input */
    $input.val('');
}

/* Renders Drink Cards to the DOM */
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
/* Clear any content from Modals */
function clearModals() {
    $ingredients.empty();
    $measurements.empty();
    $steps.empty();
}

/* First Modal */
function handleFirstModal(info) {
    /* removes content before adding new data */
    clearModals();
    drink = info.currentTarget.outerText;
    $.ajax(DRINKNAME_URL + drink)
        .then(function (data) {
            modalTitle(data);
            ingrData(data);
            msmtData(data);
            /* Second Modal content */
            drinkSteps(data);
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
function handleSecondModal() {
    $.ajax(DRINKNAME_URL + drink)
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
    $steps.text(data.drinks[0]['strInstructions']);
}