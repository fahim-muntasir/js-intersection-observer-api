const perPage = 10;
let currentPage = 1;
let initialLoad = true;

const loader = document.querySelector(".loader");
const items = document.querySelector(".items");

const getData = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${perPage}`
  );
  const data = await response.json();

  return data;
};

const displayData = (data) => {
  data.forEach((element) => {
    const newitem = document.createElement("div");
    newitem.classList.add("item");
    newitem.innerText = element.body;

    items.appendChild(newitem);
  });

  observeAllPost();
};

document.addEventListener("DOMContentLoaded", async () => {
  loader.innerText = "Loading...";

  const data = await getData();
  displayData(data);

  loader.innerText = "";
  initialLoad = false;
});

// intersection observer options
const options = {
  // root: document.querySelector(".root"),
  // rootMargin: "0px",
  threshold: 1.0,
};

const observerPost = new IntersectionObserver((entries) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting && !initialLoad) {
      loader.innerText = "Loading...";

      currentPage += 1;
      const data = await getData();
      displayData(data);

      loader.innerText = data.length === 0 ? "The End!" : "";
    }
  });
}, options);

observerPost.observe(loader);

const observeAllPost = () => {
  const allitem = document.querySelectorAll(".item");

  const observerItem = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }else{
        entry.target.classList.remove("visible");
      }
    })
  })
  
  allitem.forEach((item) => {
    observerItem.observe(item);
  })
}