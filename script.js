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
    // let restaurantList = document.getElementById('restaurant-collection').getElementsByTagName('h2')

    filter.addEventListener('change', () => {
      // for (let i = 0; i < restaurantList.length; i++) {
          if (filter.value === "a"){
            alphabetize()
          } else if (filter.value === "z"){
            reverseAlphabetize()
          } else if (filter.value === "rating"){

          } else {

          }
        // }
    })
  });

function handleSubmit(e){
  e.preventDefault()
  let restaurantObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    neighborhood: e.target.neighborhood.value,
    rating: e.target.rating.value,
    comments: e.target.comments.value
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
    document.getElementById(`${restaurant.id}`).classList.toggle('favorited')
  })

  btn.addEventListener('click', () => {
    card.remove()
    deleteRestaurant(restaurant.id)
  })
  
  //Add restaurant card to DOM
  card.appendChild(btn)
  document.querySelector('#restaurant-collection').appendChild(card)
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

function alphabetize(){
  let container = document.getElementById("restaurant-collection");
  let cards = container.querySelectorAll(".card");
  let sortedCards = Array.from(cards).sort(function(a, b) {
    let textA = a.querySelector("h2").textContent;
    let textB = b.querySelector("h2").textContent;
    return textA.localeCompare(textB);
  });
  sortedCards.forEach(function(card) {
    container.appendChild(card);
  });
}

function reverseAlphabetize(){
  
}