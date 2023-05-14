// const accessKey = "TciJWmQy290knC_Br50l9vFIxfoJWH3q67BXm1vOJEw";

// const formEl = document.querySelector("form");
// const searchInputEl = document.getElementById("search-input");
// const searchResultsEl = document.querySelector(".search-results");
// const showMoreEl = document.getElementById("show-more");

// let inputData = "";
// let page= 1;

// async function searchImages() {
//     inputData = searchInputEl.value;
//     console.log(inputData);
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}$&client_id=${accessKey}`;
//     console.log(url);

//     const response = await fetch(url);
//     const data = await response.json();
//     if (page === 1) {
//         searchResultsEl.innerHTML = "";
//     }

//     const results = data.results;

//     results.map((result) => {
//         const imageWrapper = document.createElement("div")
//         imageWrapper.classList.add("search-card");
//         const image = document.createElement("img");
//         image.src = result.urls.small;
//         image.alt = result.alt_description;
        
//         const imageLink = document.createElement("a");
//         imageLink.href = result.links.html;
//         imageLink.target = "_blank";
//         imageLink.textContent = result.alt_description;
//         console.log(result);

//         imageWrapper.appendChild(image);
//         imageWrapper.appendChild(imageLink);
//         searchResultsEl.appendChild(imageWrapper);
//     })

//     page++;

//     if(page > 1) {
//         showMoreEl.style.display = "block";
//     }

// }

// // Load more images when user scrolls to bottom of page
// window.addEventListener('scroll', () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     if (scrollTop + clientHeight >= scrollHeight - 5) {
//         searchImages();
//     }
// });

// formEl.addEventListener("submit", (event) => {
//     event.preventDefault();
//     page = 1;
//     searchImages();
// })

// showMoreEl.addEventListener("click", () => {
//     searchImages();
// })

// // Remove show more button and use infinite scrolling instead
// showMoreEl.style.display = "none";

const apiKey = "sbLE0lxbbepLpUfQkX3UbXFDws2npHB5x9C7reus";

formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");


async function searchImages() {
    const inputData = searchInputEl.value;
    console.log(inputData);
    const url = `https://images-api.nasa.gov/search?q=${inputData}&media_type=image`;

    console.log(url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        searchResultsEl.innerHTML = "";

        const items = data.collection.items;
        console.log(items);

        items.map((item) => {
            const imageWrapper = document.createElement("div")
            imageWrapper.classList.add("search-card");
            const image = document.createElement("img");
            image.src = item.links[0].href;
            image.alt = item.data[0].title;

            const imageLink = document.createElement("a");
            imageLink.href = item.links[0].href;
            imageLink.target = "_blank";
            imageLink.textContent = item.data[0].title;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResultsEl.appendChild(imageWrapper);
        })
    } catch (error) {
        console.error(error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    searchImages();
})

const headerEl = document.querySelector(".header");
const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

async function getApodImage() {
  try {
    const response = await fetch(apodUrl);
    const data = await response.json();
    console.log(data);
    const apodImage = data.url;
    const apodTitle = data.title;

    const imageEl = document.createElement("img");
    imageEl.src = apodImage;
    imageEl.alt = apodTitle;

    headerEl.appendChild(imageEl);
    // Use the APOD image in your search app
  } catch (error) {
    console.error(error);
  }
}

getApodImage();
