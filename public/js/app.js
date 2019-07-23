const formElem = document.querySelector("form");
const searchElem = document.querySelector("input");
const forecastBlock = document.querySelector(".forecast-content");

formElem.addEventListener("submit", e => {
  e.preventDefault();

  const location = searchElem.value;
  const url = `/weather?location=${location}`;

  forecastBlock.textContent = "Loading...";

  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        forecastBlock.textContent = data.error;
      } else {
        forecastBlock.textContent = `${data.location}. ${data.forecast}`;
      }
    });
  });
});
