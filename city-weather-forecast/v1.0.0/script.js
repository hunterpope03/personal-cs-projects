const apiKey = '8d14fe1e89e571626f83df17951fc3d0'
longitude = ''
latitude = ''
units = 'imperial'
map = ''
layer = ''
weatherLayer = ''

async function searchLocation() {
    let input = document.getElementById('searchBar').value; 
    if (!input) {
        return alert('Enter a valid location'); // prevent invalid input
    }
    let weatherData1 = document.querySelector('.weatherData1');
    let weatherData2 = document.querySelector('.weatherData2');
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=${units}`); // fetch data         
    let data = await response.json(); // convert to JSON format          

    if (response.ok) {
        cityID = data.id; // get data needed for widgets & maps    
        longitude = data.coord.lon;
        latitude = data.coord.lat;
        weatherData1.classList.remove('show'); // remove weather data from show class
        weatherData2.classList.remove('show');
        void weatherData1.offsetWidth; // trigger reflow so animation restarts
        void weatherData2.offsetWidth; 
        weatherData1.classList.add('show'); // add data to show class to become visible
        weatherData2.classList.add('show');
        loadWidget(cityID); // load items         
        loadMap();
    } else {
        return alert('Error: ' + data.message);
    }
}


function unitSelection() {
    units = document.getElementById('unitSelect').value // set units         
    if (document.getElementById('searchBar').value !== '') {
        searchLocation() // if search has already been complete, search again with updated units     
    }
}

async function loadWidget (cityID) {

    document.getElementById('openweathermap-widget-11').innerHTML = '';  // code for widget 1; from Open Weather Map's documentation       
    window.myWidgetParam = window.myWidgetParam || [];
    window.myWidgetParam.push({
    id: 11, // widget ID
    cityid: cityID, // city ID from fetched data  
    appid: apiKey, // my API key 
    units: units, // updated units 
    containerid: 'openweathermap-widget-11',
});
(function() {
    var script = document.createElement('script');
    script.async = true;
    script.charset = "utf-8";
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
})();

    document.getElementById('openweathermap-widget-15').innerHTML = '';  // same for widget 2; from Open Weather Map's documentation
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({
        id: 15,
        cityid: cityID,
        appid: apiKey,
        units: units,
        containerid: 'openweathermap-widget-15',
    });
    (function() {
        var script = document.createElement('script');
        script.async = true;
        script.charset = "utf-8";
        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(script, s);
    })();
}

function loadMap() {
    if (!map) { // if map has not been loaded, e.g. first search, load new map variable
        map = L.map('map').setView([latitude, longitude], 8);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // add street view layer; from Leaflet's documentation
            maxZoom: 13,
            minZoom: 2,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else {
        map.setView([latitude, longitude], 8); // if map has been loaded, keep street view layer and reset view to proper coordinates
    }

    if (weatherLayer) { // remove current layer
        map.removeLayer(weatherLayer);
    }

    layer = document.getElementById('mapSelect').value; // check which map layer is selected

    weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`, {
        maxZoom: 13,
        minZoom: 2,
        attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
    }).addTo(map); // load map; from Leaflet's documentation
}

function mapSelection() { // change map layer 
    let layer = document.getElementById('mapSelect').value;

    if (weatherLayer) { 
        map.removeLayer(weatherLayer);
    }

    weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`, {
        maxZoom: 13,
        minZoom: 2,
        attribution: '&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
    }).addTo(map);
}