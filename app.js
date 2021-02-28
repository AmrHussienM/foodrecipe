//ID && Selectors
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");

const recipeCloseBtn=document.getElementById("recipe-close-btn");
const mealDetailsContent=document.getElementById("meal-details-content");


//Events
searchBtn.addEventListener("click",getMealList);
mealList.addEventListener("click",getMealRecipe);

//get meal list that matches with the ingridents

function  getMealList(){

    let searchInput = document.getElementById("search-input").value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then((response) => {
        if(!response.ok){ alert("No recipe found"); }
        return response.json();
    })
    .then((data) => {
        let html ="";
        if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                    <div class = "meal-item" data-id="${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div> 
                `;
                
            });
            mealList.classList.remove("notFound");
        }else{
            html = "sorry we didnt find any meal";
            mealList.classList.add("notFound");
        }

        mealList.innerHTML = html;
    });

}

//get recipe of the meal

function getMealRecipe(e){

    e.preventDefault();
    if(e.target.classList.contains("recipe-btn")){
        let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then((response) => {
          if(!response.ok){ alert("No recipe found"); }
          return response.json();
        })
        .then((data) => mealRecipeModel(data.meals));
    }
}

function mealRecipeModel(meal){

  meal=meal[0];
  let html=`

    <h2 class = "recipe-title">Meals Name Here</h2>
    <p class = "recipe-category">Category Name</p>
    <div class = "recipe-instruct">
      <h3>Instructions:</h3>
      <p></p>
    </div>
    <div class = "recipe-meal-img">
      <img src = "food.jpg" alt = "">
    </div>
    <div class = "recipe-link">
      <a href = "#" target = "_blank">Watch Video</a>
    </div> 
  `;
}

/*

let weather = {
    apiKey: "9621af4d6ca6e5d3811e3c8bc0317726",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    //display the data from API
    displayWeather:  (data) => {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      //Selectors
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";

      //to remove the old information until finish loading  
      document.querySelector(".weather").classList.remove("loading");

      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    //connect the data with search to get the value
    search:function()  {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  }
  
  //Events
  document.querySelector(".search button").addEventListener("click",  () => {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        weather.search();
      }
    });

  //when the page load call the function fetchWeather
  weather.fetchWeather("Denver");
*/
