const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsElement = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const singleMeal = document.getElementById("single-meal");

//Searh meal and fetch from API
//Since we're listening for a submit event, we have to prevent default behavior by e.preventDefault();
function searchMeal(e) {
  //we don't want to try to actually submit to a file
  e.preventDefault();

  //clear single meal
  singleMeal.innerHTML = "";

  //Get search term
  const term = search.value;

  //check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(response => response.json())
      .then(data => {
        resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results for "${term}. Try again!</p>`;
        } else {
          mealsElement.innerHTML = data.meals
            .map(
              meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `
            )
            .join("");
        }
      });
    //Clear search
    search.value = "";
  }
}

//Event Listeners
submit.addEventListener("submit", searchMeal);
