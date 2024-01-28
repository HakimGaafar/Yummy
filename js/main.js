let row = document.getElementById("row");
let search = document.getElementById("search");
let submitBtn;

function fadeOut(element) {
    let opacity = 1;
    const duration = 800; 
    const interval = 10; 
    const delta = interval / duration;
  
    const fade = setInterval(() => {
      opacity -= delta;
      element.style.opacity = opacity;
  
      if (opacity <= 0) {
        clearInterval(fade);
        element.style.display = "none";
      }
    }, interval);
  }
  function fadeIn(element) {
    let opacity = 0;
    const duration = 800;
    const startTime = performance.now();
    
    element.style.display = "block";
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      opacity = elapsed / duration;
    
      if (opacity >= 1) {
        opacity = 1;
      } else {
        requestAnimationFrame(animate);
      }
    
      element.style.opacity = opacity;
    }
    
    requestAnimationFrame(animate);
  }
function ready(){
    searchByName("").then(()=>{
        fadeIn(document.querySelector(".inner-loading-screen"))
        fadeOut(document.querySelector(".inner-loading-screen"))
        document.querySelector("body").style.overflow="visible"
    })
    closeSideNav()
}

searchByName("").then(()=>{
    fadeOut(document.querySelector(".loading-screen"))
    document.querySelector("body").style.overflow="visible"
})



function openSideNav() {
    let menu = document.querySelector(".side-nav-menu");
    menu.style.left = "0px";
    menu.style.transition = "0.5s";
  
    let openIcon = document.querySelector(".open-close-icon");
    openIcon.classList.remove("fa-align-justify");
    openIcon.classList.add("fa-x");
  
    const links = document.querySelectorAll("li");
  
    for (let i = 0; i < links.length; i++) {
      links[i].style.top = "0px";
      links[i].style.transition = (i * 0.25) + "s";
    }
  }
function closeSideNav() {
  let menu = document.querySelector(".side-nav-menu");
  menu.style.left="-260px"
  menu.style.transition = "0.5s";
  let openIcon = document.querySelector(".open-close-icon");
  openIcon.classList.add("fa-align-justify");
  openIcon.classList.remove("fa-x");

  const links = document.querySelectorAll("li");
  for (let i = 0; i < links.length; i++) {
    links[i].style.top = "1000px";
    links[i].style.transition = (i * 0.2) + "s";
  }

}
function menuClick(){
    let menuClick = document.querySelector(".side-nav-menu ");
    if(menuClick.style.left=="0px")
    {
        closeSideNav()
    }else{
        openSideNav()
    }
}
closeSideNav()


function displayMeals(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
            <div class="col-md-3">
                    <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `;
  }

  row.innerHTML = cartoona;
}

async function getCategories() {
    row.innerHTML = ""
    
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    

}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" >
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    row.innerHTML = cartoona
}


async function getArea() {
    row.innerHTML = ""
    
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    

    displayArea(response.meals)
    

}


function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    row.innerHTML = cartoona
}


async function getIngredients() {
    row.innerHTML = ""
    
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    
    displayIngredients(response.meals.slice(0, 20))
    

}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    row.innerHTML = cartoona
}


async function getCategoryMeals(category) {
    row.innerHTML = ""
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    

}



async function getAreaMeals(area) {
    row.innerHTML = ""
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    

}


async function getIngredientsMeals(ingredients) {
    row.innerHTML = ""
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    

}

async function getMealDetails(mealID) {
    
    row.innerHTML = "";
    
  
    search.innerHTML = "";
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    response = await response.json();
  
    displayMealDetails(response.meals[0]);
    
  }

function displayMealDetails(meal) {
    
    search.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags){tags = []} 

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    row.innerHTML = cartoona
}


function showSearchInputs() {
    search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    row.innerHTML = ""
}

async function searchByName(term) {
    
    row.innerHTML = ""
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    if(response.meals) 
    {displayMeals(response.meals)}  
    else{displayMeals([])} 
   

}

async function searchByFLetter(term) {
    
    row.innerHTML = ""

    if(term == "") 
    {term = "a"}  
    else{""} ;
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    if(response.meals) 
    {displayMeals(response.meals)}  
    else{displayMeals([])} 
    

}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function showContacts() {
    row.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
 </div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", function () {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", function () {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", function () {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", function () {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", function () {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", function () {
        repasswordInputTouched = true
    })
}



function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}


function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
  }
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}  