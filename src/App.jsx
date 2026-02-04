import React from "react";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <input
        onKeyPress={searchFunction}
        placeholder="Search city"
        type="search"
        className="search"
      />
      <div className="cards"></div>
    </div>
  );
}
export default App;

let api =
  "https://api.openweathermap.org/data/2.5/weather?q=tashkent&units=metric&appid=159bfbb23a088d7cc56ca707df61f44c";
const search = document.querySelector(".search");

async function getData(url) {
  const search = document.querySelector(".search");
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getFunction(data);
    })
    .catch(() => {
      alert("City not found!");
      search.value = "";
    });
}

function getFunction(data) {
  const search = document.querySelector(".search");
  console.log(data);
  const container = document.querySelector(".cards");
  container.innerHTML = `
  <div class="card">
          <h1 class="cityName">${data.name}</h1>
          <p class="degree">${data.main.temp}°C</p>
          <p class="description">${data.weather[0].description}</p>
        </div>
  `;
  search.value = "";
}

function searchFunction(e) {
  const value = e.target.value;
  if (e.key == "Enter") {
    getData(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=159bfbb23a088d7cc56ca707df61f44c`,
    );
  }
}

try {
  getData(api);
} catch (error) {
  throw new Error(error);
}
