let addRestaurant = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-restuarant-btn");
    const restaurantFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addRestaurant = !addRestaurant;
      if (addRestaurant) {
        restaurantFormContainer.style.display = "block";
        document.querySelector("#new-restuarant-btn").textContent = "Nevermind!"
      } else {
        restaurantFormContainer.style.display = "none";
        document.querySelector("#new-restuarant-btn").textContent = "I want to add a restaurant!"
      }
    });
    getAllRestaurants()
    document.querySelector('.add-restaurant-form').addEventListener('submit', handleSubmit)

    let filter = document.getElementById('restaurant-dropdown')
    filter.addEventListener('change', () => {
      switch (filter.value) {
        case "all":
          showAllFilter();
          break;
        case "a":
          alphabetizeFilter();
          break;
        case "z":
          alphabetizeFilter(1);
          break;
        case "highRating":
          rateFilter(1);
          break;
        case "lowRating":
          rateFilter();
          break;
        default:
          favoriteFilter();
          break;
      }
    })
  });

function handleSubmit(e){
  e.preventDefault()
  let restaurantObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    neighborhood: e.target.neighborhood.value,
    rating: e.target.rating.value,
    comments: e.target.comments.value,
    favorite: "no"
  }
  renderOneRestaurant(restaurantObj)
  postRestaurant(restaurantObj)
  document.querySelector('.add-restaurant-form').reset()
}

//Gets all restuarants from db.json file
function getAllRestaurants(){
  fetch("http://localhost:3000/restaurants")
  .then(res => res.json())
  .then(restaurantData => restaurantData.forEach(restaurant => renderOneRestaurant(restaurant)))
}

//Builds and adds restaurants to DOM
function renderOneRestaurant(restaurant){
  //Build restaurant
  let card = document.createElement('div')
  let btn = document.createElement('button')
  btn.textContent = 'Remove restaurant'
  card.className = 'card'
  card.innerHTML = `
  <h2>${restaurant.name}</h2>
  <h3>Your BiteNYC Rating: ${restaurant.rating}
    <button class="favorite-btn" id="${restaurant.id}"><i class="fa fa-star"></i></button>
  </h3>
  <img src="${restaurant.image}" class="restaurant-avatar" />
  <h3>${restaurant.neighborhood}</h3>
  <p class="comments"><b>Additional comments:</b> ${restaurant.comments}</p>
  `
  
  card.querySelector('.favorite-btn').addEventListener('click', () => {
    let className = document.getElementById(`${restaurant.id}`).classList
    if (restaurant.favorite === "no"){
      restaurant.favorite = "yes"
      className.add("favorited")
    } else {
      restaurant.favorite = "no"
      className.remove("favorited")
    }
    handleFavorite(restaurant)
  })

  btn.addEventListener('click', () => {
    card.remove()
    deleteRestaurant(restaurant.id)
  })
  
  //Add restaurant card to DOM
  card.appendChild(btn)
  document.getElementById('restaurant-collection').appendChild(card)

  if (restaurant.favorite === "yes"){
    card.querySelector('.favorite-btn').classList.add("favorited")
  }
}

//Adds favorite to json
function handleFavorite(restaurant){
  fetch(`http://localhost:3000/restaurants/${restaurant.id}`, {
    method: 'PATCH',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },

    body: JSON.stringify(restaurant)
  })
  .then(res => res.json)
}

//Deletes restaurant from json
function deleteRestaurant(id){
  fetch(`http://localhost:3000/restaurants/${id}`, {
    method: 'DELETE',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    }
  })
  .then(res => res.json)
}

//Posts restaurant to json
function postRestaurant(restaurantObj){
  fetch("http://localhost:3000/restaurants", {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },

    body: JSON.stringify(restaurantObj)
  })
}

//Displays all restaurants on json
function showRestaurants(){
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = "inline-grid";
  });
}

//Orders all restaurants by their id number on json
function showAllFilter(){
  let cards = document.querySelectorAll("#restaurant-collection .card");
  [...cards].sort((a, b) => {
    let restaurantA = a.querySelector("button").id;
    let restaurantB = b.querySelector("button").id;
    return restaurantA - restaurantB;
  }).forEach(card => document.getElementById("restaurant-collection").appendChild(card));
  showRestaurants();
}

//Orders all restaurants alphabetically
function alphabetizeFilter(n=0){
  showRestaurants()
  let container = document.getElementById("restaurant-collection");
  let cards = Array.from(container.querySelectorAll(".card"))
  cards.sort((a, b) => {
    let restaurantA = a.querySelector('h2').textContent;
    let restaurantB = b.querySelector('h2').textContent;
    return restaurantA.localeCompare(restaurantB);
  });
  if(n !== 0){
    cards.reverse()
  }
  cards.forEach(card => container.appendChild(card));
}

//Orders all restaurants by rating
function rateFilter(n=0){
  showRestaurants()
  let container = document.getElementById("restaurant-collection");
  let cards = Array.from(container.querySelectorAll(".card"))
  cards.sort((a, b) => {
    let ratingA = a.querySelector('h3').textContent;
    let ratingB = b.querySelector('h3').textContent;
    return ratingA.localeCompare(ratingB);
  });
  if(n !== 0){
    cards.reverse()
  }
  cards.forEach(card => container.appendChild(card));
}

//Shows only favorited restaurants
function favoriteFilter(){
  let restaurantList = document.getElementById('restaurant-collection').getElementsByTagName('div')
  for (let i = 0; i < restaurantList.length; i++) {
    if (restaurantList[i].querySelector('button').classList.value === 'favorite-btn favorited'){
      restaurantList[i].style.display = "inline-grid"
    } else {
      restaurantList[i].style.display = "none"
    }
  }
}