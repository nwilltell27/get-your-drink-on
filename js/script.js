/*--- Constant Variables (data that never changes) ---*/

/*--- State Variables (data that changes) ---*/

/*--- Cached Element References (parts of DOM we need to touch) ---*/

/*--- Event Listeners ---*/

/*--- Functions ---*/
function getData() {
    $.ajax('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=')
        .then(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
}