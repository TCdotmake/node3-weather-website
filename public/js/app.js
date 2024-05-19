console.log("Client side javascript is loaded!");

const weatherForm = document.getElementById("search-form");
const addressInput = document.getElementById("address-input");

const errorMsg = document.getElementById("error");
const forecast = document.getElementById("forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  forecast.innerHTML = "";
  errorMsg.innerHTML = "Loading...";
  fetch(`http://localhost:3000/weather?address=${addressInput.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorMsg.innerHTML = data.error;
          forecast.innerHTML = null;
          return;
        }
        errorMsg.innerHTML = null;
        forecast.innerHTML = `
        <p>Location: ${data.location}</p>
        <p>Latitude: ${data.latitude}  Longitude: ${data.longitude}</p>
        <p>Temp(C): ${data.temp}</p>
        <p>Condition: ${data.condition}</p>
        `;
      });
    }
  );
});

/* fetch("http://localhost:3000/weather?address=boston").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      return console.log(data.error);
    }
    console.log(data);
  });
});
 */
