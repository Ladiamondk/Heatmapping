let map, heatmap;
const secretKey = config.googleAPI;
function initMap() {

  let position = {lat: 37.804363, lng: -122.271111};

  //create map center at the location stored in 'position' varible
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: position, 
  });
  addMarker(position);
  //URL to census track kml file for urban area
  //const urbanArea = "https://raw.githubusercontent.com/Ladiamondk/kmlLayer/main/cb_2018_us_cd116_20m.kml";
  
  //creat and add a kml layer 
  /*
    const kmlLayer = new google.maps.KmlLayer({
    url: urbanArea,
    map: map,
    preserveViewport: true,
    suppressInfoWindows: true,
  });
  */
  // creat and add a heatmap layer
  //holds the data set
    heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map,
  });
  document
    .getElementById("toggle-heatmap")
    .addEventListener("click", toggleHeatmap);
  document
    .getElementById("change-gradient")
    .addEventListener("click", changeGradient);
  document
    .getElementById("change-opacity")
    .addEventListener("click", changeOpacity);
  document
    .getElementById("change-radius")
    .addEventListener("click", changeRadius);
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];

  heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
  heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
  heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
}

// Heatmap data: 500 Points
function getPoints() {
    const addresses = [
        "350 Hegenberger Rd, Oakland, CA",
        "378 11th St, Oakland, CA",
        "150 Hegenberger Rd, Oakland",
        "77 Hegenberger Rd, Oakland, CA",
        "10 Washington St, Oakland",
        "8465 Enterprise Way, Oakland",
        "2455 Broadway, Oakland, CA",
        "1103 Embarcadero, Oakland, CA",
        "2225 Telegraph Ave, Oakland, CA",
        "1001 Broadway, Oakland, CA",
        "1755 Embarcadero, Oakland, CA",
        "1431 Jefferson St, Oakland, CA",
        "4919 Coliseum Wy, Oakland, CA",
        "1084 30th St, Oakland, CA",
        "8400 Edes Ave, Oakland, CA",
        "1801 Embarcadero, Oakland, CA",
        "One Hegenberger Rd, Oakland, CA",
        "378 11th St, Oakland, CA 94607",
        "66 Airport Access Rd, Oakland, CA",
        "195 Hegenberger Rd, Oakland, CA",
        "170 Hegenberger Loop, Oakland, CA",
        "1801 Embarcadero, Oakland, CA",
        "4140 Broadway, Oakland, CA",
        "1260 S Loop Rd, Alameda, CA",
        "988 Broadway, Oakland, CA",
        "3650 Mandela Pkwy, Oakland, CA",
        "371 13th St, Oakland, CA",
        "1925 Webster St, Alameda, CA",
        "122 E 12th St, Oakland, CA",
        "1660 Harbor Bay Pkwy, Alameda, CA",
        "8400 Edes Ave, Oakland, CA",
        "490 W MacArthur Blvd, Oakland, CA",
      ];
  
    const geocoder = new google.maps.Geocoder();
    const latLngArray = [];
  
    addresses.forEach((address) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          const latLng = new google.maps.LatLng(location.lat(), location.lng());
          latLngArray.push(latLng);
          heatmap.setData(latLngArray);
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
        }
      });
    });
  
    return latLngArray;
  }
  
  // adding a marker
  function addMarker(position){
    const marker = new google.maps.Marker({
        map: map,
        position: position,
        title: 'Oakland',
        //customize icon 
        //icon: 'https://img.icons8.com/nolan/2x/marker.png'
      });
  }
  //info window so when icon is clicked details are displayed
  /*const detailWindow = new google.maps.InfoWindow({
    content: marker.title,
  })
  //event listener for the detailWindow
  marker.addListener("click",() =>{
    detailWindow.open(map, marker);
  })*/

  //add marker function
  
