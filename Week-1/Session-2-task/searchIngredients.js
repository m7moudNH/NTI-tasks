const searchField = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const mealContainer = document.getElementById("mealContainer");

searchBtn.addEventListener("click", searchMeal);

async function searchMeal() {

    const mealName = searchField.value.trim();

    if (mealName === "") {
        mealContainer.innerHTML =
            '<p class="message">Please enter a meal name.</p>';
        return;
    }

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );

    const data = await response.json();

    mealContainer.innerHTML = "";

    if (!data.meals) {
        mealContainer.innerHTML =
            '<p class="message">No meals found.</p>';
        return;
    }

    data.meals.forEach(meal => {

        mealContainer.innerHTML += `
            <div class="card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
            </div>
        `;

    });
}