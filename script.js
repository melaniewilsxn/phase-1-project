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
    // document.querySelector('.add-restaurant-form').addEventListener('submit', handleSubmit)
  });

//   function getAllRestaurants(){
//     fetch("http://localhost:3000/toys")
//     .then(res => res.json())
//     .then(restaurantData => restaurantData.forEach(restaurant => renderOneRestaurant(restaurant)))
//   }