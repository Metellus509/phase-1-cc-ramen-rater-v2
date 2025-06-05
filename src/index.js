// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const img=document.querySelector(".detail-image")
  img.src=ramen.image
  const h2=document.querySelector(".name")
  h2.innerHTML=ramen.name
  const h3=document.querySelector(".restaurant")
  h3.innerHTML=ramen.restaurant
  const span=document.querySelector("#rating-display")
  span.innerHTML=ramen.rating
  const p=document.querySelector("#comment-display")
  p.innerHTML=ramen.comment
};

const addSubmitListener = () => {
  // Add code
  const form = document.querySelector("#new-ramen");
  const name = document.querySelector("#new-name");
  const restaurant = document.querySelector("#new-restaurant");
  const image = document.querySelector("#new-image");
  const rating = document.querySelector("#new-rating");
  const textarea = document.querySelector("#new-comment");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const newRamen = {
        name: name.value,
        restaurant: restaurant.value,
        image: image.value,
        rating: rating.value,
        comment: textarea.value,
      };

      fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRamen),
      })
      .catch(() => {
        alert("Fetch error is generated")
      });

      
      const menu = document.querySelector("#ramen-menu");
      const img = document.createElement("img");
      img.src = newRamen.image;
      img.addEventListener("click", () => handleClick(newRamen));
      menu.appendChild(img);

      form.reset();
    });
  }
}

const displayRamens = () => {
  // Add code
  const menu=document.querySelector("#ramen-menu")
  fetch("http://localhost:3000/ramens")
  .then(res=>res.json())
  .then((data)=>{
    data.forEach((url)=>{
        //console.log(url.image)
        const img=document.createElement("img")
        img.src=url.image
        if (menu) {
        menu.appendChild(img);
        }
        img.addEventListener("click",()=>handleClick(url))
    })
  })
};

const main = () => {
  
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
