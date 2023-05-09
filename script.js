let addRestaurant = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-restuarant-btn");
    const restaurantFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addRestaurant = !addRestaurant;
      if (addRestaurant) {
        restaurantFormContainer.style.display = "block";
      } else {
        restaurantFormContainer.style.display = "none";
      }
    });
    getAllRestaurants()
    document.querySelector('.add-restaurant-form').addEventListener('submit', handleSubmit)

    let filter = document.getElementById('restaurant-dropdown')
    filter.addEventListener('change', () => {
          if (filter.value === "all"){
            showAllFilter()
          } else if (filter.value === "a"){
            alphabetizeFilter()
          } else if (filter.value === "z"){
            alphabetizeFilter(1)
          } else if (filter.value === "highRating"){
            rateFilter(1)
          } else if (filter.value === "lowRating"){
            rateFilter()
          } else {
            favoriteFilter()
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
}

//Gets all restuarants from db.json file
function getAllRestaurants(){
  fetch("http://localhost:3000/restaurants")
  .then(res => res.json())
  .then(restaurantData => restaurantData.forEach(restaurant => renderOneRestaurant(restaurant)))
}

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
  document.querySelector('#restaurant-collection').appendChild(card)

  if (restaurant.favorite === "yes"){
    document.getElementById(`${restaurant.id}`).classList.add("favorited")
  }
}

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

function showRestaurants(){
  let restaurantList = document.getElementById('restaurant-collection').getElementsByTagName('div')
  for (let i = 0; i < restaurantList.length; i++) {
    restaurantList[i].style.display = "inline-grid"
  }
}

function showAllFilter(){
  showRestaurants()
  let container = document.getElementById("restaurant-collection");
  let cards = container.querySelectorAll(".card");
  let sortedCards = Array.from(cards).sort(function(a, b) {
    let restaurantA = a.querySelector('button').id;
    let restaurantB = b.querySelector('button').id;
    return restaurantA.localeCompare(restaurantB);
  });
  sortedCards.forEach(function(card) {
    container.appendChild(card);
  });
}

function alphabetizeFilter(n=0){
  showRestaurants()
  let container = document.getElementById("restaurant-collection");
  let cards = container.querySelectorAll(".card");
  let sortedCards = Array.from(cards).sort(function(a, b) {
    let restaurantA = a.querySelector("h2").textContent;
    let restaurantB = b.querySelector("h2").textContent;
    return restaurantA.localeCompare(restaurantB);
  });
  if(n !== 0){
    sortedCards.reverse()
  }
  sortedCards.forEach(function(card) {
    container.appendChild(card);
  });
}

function rateFilter(n=0){
  showRestaurants()
  //console.log(document.getElementById("restaurant-collection").querySelector('h3').textContent)
  let container = document.getElementById("restaurant-collection");
  let cards = container.querySelectorAll(".card");
  let sortedCards = Array.from(cards).sort(function(a, b) {
    let restaurantA = a.querySelector('h3').textContent;
    let restaurantB = b.querySelector('h3').textContent;
    return restaurantA.localeCompare(restaurantB);
  });
  if(n !== 0){
    sortedCards.reverse()
  }
  sortedCards.forEach(function(card) {
    container.appendChild(card);
  });
}

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