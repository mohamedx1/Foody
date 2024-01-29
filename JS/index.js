/// <reference types="../@types/jquery" />
//---------------------------------------- Start navbar----------------------------------------

$(".navs").hide();

$(".threeLines").on("click", function () {
  $(".navs").animate({ width: "toggle", paddingInline: "toggle" }, 1000);
});

$(".nav-list a").on("click", function () {
  $(".navs").animate({ width: "toggle", paddingInline: "toggle" }, 1500);
});

//---------------------------------------- End navbar----------------------------------------

//----------------------------------------On Load Data----------------------------------------

async function getData(meal = "") {
  let searchApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
  let apiData = await fetch(searchApi);
  let finalData = await apiData.json();
  return finalData;
}

async function displayMain(input) {
  let container = "";
  let mainArr = await getData(input);
  let meals = mainArr.meals;

  for (let i = 0; i < meals.length; i++) {
    container += `
        <div class="text-bg-dark col-md-3 mainCol cursor-pointer">
        <div class="main-card">
        <img src="${meals[i].strMealThumb}" class="w-100" alt="...">
        <div class="card-ovlay ">
        <h3 class="">${meals[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `;
  }
  document.getElementById("mainDiv").innerHTML = container;
}
getData();
displayMain("");
//----------------------------------------End On Load Data ----------------------------------------
//----------------------------------------Search Data ----------------------------------------

async function search() {
  document.getElementById("mainDiv").innerHTML = "";
  let inputs = `
                <div class="inputs row">
            <div class="col-md-6">
            <input type="text" class="form-control bg-transparent" id="searchN" placeholder="search By Name">
            </div>
            <div class="col-md-6">
            <input type="text" class="form-control bg-transparent" id="searchF" placeholder="search By first latter" maxlength="1">
            <div>
            </div>
            `;
  document.getElementById("searchRow").innerHTML = inputs;
  document
    .getElementById("searchN")
    .addEventListener("input", async function () {
      let inputVal = this.value;
      displayMain(inputVal);
    });
  document
    .getElementById("searchF")
    .addEventListener("input", async function () {
      let inputVal = this.value;
      displayMain(inputVal);
    });
}

document.getElementById("searchLink").addEventListener("click", function () {
  document.getElementById("searchRow").classList.remove("d-none");
  search();
});

//----------------------------------------Search Data ----------------------------------------

//----------------------------------------Categories Data ----------------------------------------

async function getCategoriesData() {
  let categoriesApi = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  let categoriesapiData = await fetch(categoriesApi);
  let categoriesfinalData = await categoriesapiData.json();
  // console.log(categoriesfinalData.categories);
  return categoriesfinalData;
}

async function filterCategory(meal) {
  let filterCategoryApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`;
  let filterCategoryapiData = await fetch(filterCategoryApi);
  let filterCategoryfinalData = await filterCategoryapiData.json();
  displayfilterCategory(filterCategoryfinalData);
  return filterCategoryfinalData;
}

getCategoriesData();

async function displayCategories() {
  document.getElementById("mainDiv").innerHTML = "";
  let container = "";
  let mainArr = await getCategoriesData();
  let cates = mainArr.categories;
  for (let i = 0; i < cates.length; i++) {
    cates[i].strCategoryDescription;
    container += `
        <div class="text-bg-dark col-md-3 mainCol cursor-pointer">
        <div class="main-card" onclick="filterCategory(this.id)" id="${
          cates[i].strCategory
        }">
                        <img src="${
                          cates[i].strCategoryThumb
                        }" class="w-100" alt="...">
                        <div class="card-ovlay-categore ">
                        <h5 class="mainCategory">${cates[i].strCategory}</h5>
                        <p>${cates[i].strCategoryDescription
                          .split(" ", 7)
                          .join(" ")}</p>
                        </div>
                        </div>
                        </div>
                        `;
  }

  document.getElementById("mainDiv").innerHTML = container;
}
document
  .getElementById("categoriesLink")
  .addEventListener("click", function () {
    displayCategories();
  });

async function displayfilterCategory(mainArr) {
  let container = "";
  let meals = mainArr.meals;
  for (let i = 0; i < meals.length; i++) {
    container += `
        <div class="text-bg-dark col-md-3 mainCol cursor-pointer">
        <div class="main-card">
        <img src="${meals[i].strMealThumb}" class="w-100" alt="...">
        <div class="card-ovlay ">
        <h3 class="">${meals[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `;
  }
  document.getElementById("mainDiv").innerHTML = container;
}

document
  .getElementById("ingredientsLink")
  .addEventListener("click", function () {
    displayThemealdb();
  });

//----------------------------------------End Categories Data ----------------------------------------
//----------------------------------------Area Data ----------------------------------------
async function getAreaData() {
  let areaApi = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  let areaapiData = await fetch(areaApi);
  let areafinalData = await areaapiData.json();
  // console.log(areafinalData.meals)
  return areafinalData;
}

getAreaData();

async function filterArea(city) {
  let filterAreaApi = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${city}`;
  let filterAreaapiData = await fetch(filterAreaApi);
  let filterAreafinalData = await filterAreaapiData.json();
  console.assert(filterAreafinalData);
  return filterAreafinalData;
}

async function displayArea() {
  document.getElementById("mainDiv").innerHTML = "";
  let container = "";
  let mainArr = await getAreaData();
  let meals = mainArr.meals;
  for (let i = 0; i < meals.length; i++) {
    container += `
        <div class="text-bg-dark col-md-3 mainCol" id="${meals[i].strArea}">
            <div class="area-card  cursor-pointer">
                <div class="rounded-2 text-center">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${meals[i].strArea}</h3>
                </div>
            </div>
        </div>
        `;
  }
  document.getElementById("mainDiv").innerHTML = container;
  document.querySelectorAll(".mainCol").forEach((e) =>
    e.addEventListener("click", async function () {
      let curent = this.getAttribute("id");
      let data = await filterArea(curent);
      console.log(curent);
      displayfilterArea(data);
    })
  );
}

function displayfilterArea(mainArr) {
  let container = "";
  let meals = mainArr.meals;
  for (let i = 0; i <= 19; i++) {
    container += `
        <div class="text-bg-dark col-md-3 mainCol cursor-pointer">
        <div class="main-card">
        <img src="${meals[i].strMealThumb}" class="w-100" alt="...">
        <div class="card-ovlay ">
        <h3 class="">${meals[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `;
  }
  document.getElementById("mainDiv").innerHTML = container;
}

document.getElementById("areaLink").addEventListener("click", function () {
  displayArea();
});

//----------------------------------------End Area Data ----------------------------------------
//---------------------------------------- themealdb Data ----------------------------------------

async function getThemealdbData() {
  let themealdbApi = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
  let themealdbapiData = await fetch(themealdbApi);
  let themealdbfinalData = await themealdbapiData.json();
  return themealdbfinalData;
}

getThemealdbData();

async function filteringred(meal) {
  let filterIngredApi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`;
  let filterIngredapiData = await fetch(filterIngredApi);
  let filterIngredfinalData = await filterIngredapiData.json();
  console.assert(filterIngredfinalData);
  return filterIngredfinalData;
}

async function displayThemealdb() {
  document.getElementById("mainDiv").innerHTML = "";
  let container = "";
  let mainArr = await getThemealdbData();
  let meals = mainArr.meals;
  for (let i = 0; i <= 19; i++) {
    container += `
        <div class="text-bg-dark col-md-3 mainCol" id="${
          meals[i].strIngredient
        }">
        <div class="area-card cursor-pointer">
        <div class="rounded -2 text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${meals[i].strIngredient}</h3>
        <p>${meals[i].strDescription.split(" ", 20).join(" ")}</P>
        </div>
        </div>
        </div>
        `;
  }
  document.getElementById("mainDiv").innerHTML = container;
  document.querySelectorAll(".mainCol").forEach((e) =>
    e.addEventListener("click", async function () {
      let curent = this.getAttribute("id");
      let data = await filteringred(curent);
      console.log(curent, data);
      displayfilterIngerd(data);
    })
  );
}

document
  .getElementById("ingredientsLink")
  .addEventListener("click", function () {
    displayThemealdb();
  });

function displayfilterIngerd(mainArr) {
  let container = "";
  let meals = mainArr.meals;
  for (let i = 0; i <= 19; i++) {
    container += `
        <div class="text-bg-dark col-md-3 mainCol cursor-pointer">
        <div class="main-card">
        <img src="${meals[i].strMealThumb}" class="w-100" alt="...">
        <div class="card-ovlay ">
        <h3 class="">${meals[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `;
  }
  document.getElementById("mainDiv").innerHTML = container;
}

//---------------------------------------- End themealdb Data ----------------------------------------
//---------------------------------------- Contact  Us Data ----------------------------------------

async function displayContact() {
  let inputs = `
<div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" type="text" class="form-control inInput" placeholder="Enter Your Name" >
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" type="email" class="form-control inInput " placeholder="Enter Your Email" >
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control inInput" placeholder="Enter Your Phone" >
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" type="number" class="form-control inInput" placeholder="Enter Your Age" >
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" type="password" class="form-control inInput" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" type="password" class="form-control inInput" placeholder="Repassword" fdprocess>
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
    `;
  document.getElementById("mainDiv").innerHTML = inputs;

  function isValed(idName) {
    document.getElementById(idName).classList.remove("d-none", "alert-danger");
    document.getElementById(idName).classList.add("alert-success");
    document.getElementById(idName).innerHTML = "sucssesful";
  }

  function inValed(idName, message) {
    document.getElementById(idName).classList.remove("d-none", "alert-success");
    document.getElementById(idName).classList.add("alert-danger");
    document.getElementById(idName).innerHTML = message;
  }

  // nameAlert
  //sucssesful
  function checkData() {
    const userNameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const phoneNuper = document.getElementById("phoneInput");
    const userAge = document.getElementById("ageInput");
    const password = document.getElementById("passwordInput");
    const rePassword = document.getElementById("repasswordInput");
    if (/^[a-zA-Z0-9]{3,16}$/.test(userNameInput.value)) {
      isValed("nameAlert");
      if (
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(emailInput.value)
      ) {
        isValed("emailAlert");
        if (/^\d{11}$/.test(phoneNuper.value)) {
          isValed("phoneAlert");
          if (/^\d+$/.test(userAge.value)) {
            isValed("ageAlert");
            if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password.value)) {
              isValed("passwordAlert");
              if (password.value == rePassword.value) {
                isValed("repasswordAlert");
                document
                  .getElementById("submitBtn")
                  .removeAttribute("disabled");
              } else {
                inValed("repasswordAlert", "not Match");
              }
            } else {
              inValed(
                "passwordAlert",
                "Please enter a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, and one digit."
              );
            }
          } else {
            inValed(
              "ageAlert",
              "Please enter a valid age using only numbers (0-9). The age should be a whole number without any additional characters."
            );
          }
        } else {
          inValed(
            "phoneAlert",
            "Please enter a 10-digit phone number using only numbers (0-9). Ensure there are no spaces or special characters."
          );
        }
      } else {
        inValed(
          "emailAlert",
          "* Please enter a valid email address in the format example@example.com."
        );
      }
    } else {
      inValed(
        "nameAlert",
        "* Please enter a username that consists of 3 to 16 characters, using only letters, numbers, hyphens, and underscores."
      );
    }
  }
  let classInput = document.querySelectorAll(".inInput");
  for (let i = 0; i < classInput.length; i++) {
    classInput[i].addEventListener("input", function () {
      checkData();
    });
  }
}
document.getElementById("contactUsLink").addEventListener("click", function () {
  displayContact();
});

//---------------------------------------- End Contact Us Data ----------------------------------------
