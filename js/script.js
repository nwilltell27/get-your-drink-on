/*--- Constant Variables (data that never changes) ---*/
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

/*--- State Variables (data that changes) ---*/
const $input = $('input[type=text]');

/*--- Cached Element References (parts of DOM we need to touch) ---*/

/*--- Event Listeners ---*/
$('form').on('submit', handleGetData);

/*--- Functions ---*/
function handleGetData(evt) {
    evt.preventDefault();
    const userInput = $input.val();
    $.ajax(BASE_URL + userInput)
        .then(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    // clears input
    $input.val(''); 
}