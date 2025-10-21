// use Promise

const fetch = require("node-fetch");

function getObjectFromUrl(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => resolve(JSON.parse(text)));
  });
}

function getCountryBounds(country) {
  return new Promise((resolve) => {
    getObjectFromUrl(
      `https://nominatim.openstreetmap.org/search?country=${country}&format=json`
    ).then((object) =>
      resolve({
        minLatitude: object[0].boundingbox[0],
        maxLatitude: object[0].boundingbox[1],
        minLongitude: object[0].boundingbox[2],
        maxLongitude: object[0].boundingbox[3],
      })
    );
  });
}

function main() {
  getCountryBounds("Romania").then((bounds) => console.log(bounds));
}

main();

// use async/await

async function getObjectFromUrl(url) {
  const response = await fetch(url);
  const text = await response.text();
  return JSON.parse(text);
}

async function getCountryBounds(country) {
  const object = await getObjectFromUrl(
    `https://nominatim.openstreetmap.org/search?country=${country}&format=json`
  );

  return {
    minLatitude: object[0].boundingbox[0],
    maxLatitude: object[0].boundingbox[1],
    minLongitude: object[0].boundingbox[2],
    maxLongitude: object[0].boundingbox[3],
  };
}

async function main() {
  const bounds = await getCountryBounds("Romania");
  console.log(bounds);
}

main();

// implementați o funcție care obține lista avioanelor de deasupra României
async function getPlanesOverRomania() {
  try {
    // https://openskynetwork.github.io/opensky-api/rest.html
    // const root = "https://opensky-network.org/api";
    // const roCoords =
    //   "lamin=43.6188114&lomin=20.2619955&lamax=48.2654738&lomax=30.0454257";
    // const response = await fetch(`${root}/states/all?${roCoords}`);

    // API call failed with status: 503, Service Temporarily Unavailable
    // :(

    // nu vrea nici flightradar24
    // const root = "https://fr24api.flightradar24.com/api/sandbox";
    // `${root}/live/flight-positions/light?airports=LHR`
    // `${root}/static/airports/ARN/light`
    // // ERROR;  API call failed with status: 400, Bad Request

    const API_URL = "";
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `API call failed with status: ${response.status}, ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn("ERROR; ", err.message);
  }
}

getPlanesOverRomania();
