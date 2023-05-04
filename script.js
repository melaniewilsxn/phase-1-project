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
    // getAllRestaurants()
    document.querySelector('.add-restaurant-form').addEventListener('submit', handleSubmit)
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
  // postToy(restaurantObj)
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
  card.className = 'card'
  card.innerHTML = `
  <h2>${restaurant.name} - Your BiteNYC Rating: ${restaurant.rating}
    <button class="favorite-btn" id="${restaurant.id}">
      <i class="fa fa-star"></i>
    </button>
  </h2>
  <img src="${restaurant.image}" class="restaurant-avatar" />
  <h3>${restaurant.neighborhood}</h3>
  <p>Additional comments: ${restaurant.comments}</p>
  `
  
  card.querySelector('.favorite-btn').addEventListener('click', () => {
    document.querySelector('.favorite-btn').classList.toggle('favorited')
  })
  
    //Add restaurant card to DOM
    document.querySelector('#restaurant-collection').appendChild(card)
}