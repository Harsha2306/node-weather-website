"use strict";

const search_button = document.querySelector("#search_button");
const input_data = document.querySelector("#input_data");
const msg_1 = document.querySelector("#id_1");
const msg_2 = document.querySelector("#id_2");

const task = async function (location) {
  try {
    msg_1.textContent="Loading...";
    const response = await fetch(
      `/weather?address=${location}`
    );
    if (!response.ok) throw new Error("Error Occured");
    const data = await response.json();
    if (data.error && data.error === `address must be provided`) {
      msg_1.textContent = "Location must be provided";
      throw new Error("Location must be provided");
    }
    if (data.error && data.error === `No matching results`) {
      msg_1.textContent = "No matching results Found";
      throw new Error("No matching results Found");
    }
    msg_1.textContent = `Location :- ${data.location}`;
    msg_2.textContent = `Weather :- ${data.forecast}`;
  } catch (err) {
    console.log(err);
  }
};

search_button.addEventListener("click", (e) => {
  e.preventDefault();
  const fromSearch = String(input_data.value).toLowerCase();
  task(`${fromSearch}`);
});

/*geocode
https://api.mapbox.com/geocoding/v5/mapbox.places/$tenali.json?access_token=pk.eyJ1IjoiaGFyc2hhNTU1IiwiYSI6ImNreHB0bG14ZjAybGsycm1wbTZwcTM1dXYifQ.QaehWGPD5WiVF0w1b2y8dg&limit=1
forecast 
http://api.weatherstack.com/current?access_key=cce23a930dafde0b21ec487b5cf316d8&query=16.2422735,80.64024549999999&units=m
cmd
PS D:\MY_NODE\practice\src> nodemon app.js
*/
