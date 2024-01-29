/// <reference types="../@types/jquery" />

async function getData (meal = "") {
    let searchApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
    let apiData = await fetch(searchApi);
    let finalData = await apiData.json();
    return finalData;
}


async function diplayMain () {
    let container = "";
    let mainArr = await getData();
    let meals = mainArr.meals;
    for (let i = 0; i < meals.length ; i++) {
        container+=`
            <div class="text-bg-dark col-md-3">
                    <div class="main-card">
                        <img src="${mainArr.meals[i].strMealThumb}" class="w-100" alt="...">
                        <div class="card-ovlay ">
                            <h3 class="">${mainArr.meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    document.getElementById("mainDiv").innerHTML = container;
    console.log(mainArr.meals[0].strMealThumb);
}

async function search () {
    let x = await getData("ko")
    console.log(x);
}

document.getElementById("searchLink").addEventListener("click", function () {
    search();
})
getData();

diplayMain();



document.getElementById("nav-toggler").addEventListener("click", function () {
    $(".nav-list").animate({ width: "toggle", paddingInline: "toggle" }, 800);
})
