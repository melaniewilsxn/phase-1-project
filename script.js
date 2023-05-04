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
    //   rating: e.target.rating.value,
      comments: e.target.comments.value
    }
    console.log(restaurantObj)
    // renderOneToy(restaurantObj)
    // postToy(restaurantObj)
  }

//   function getAllRestaurants(){
//     fetch("http://localhost:3000/toys")
//     .then(res => res.json())
//     .then(restaurantData => restaurantData.forEach(restaurant => renderOneRestaurant(restaurant)))
//   }