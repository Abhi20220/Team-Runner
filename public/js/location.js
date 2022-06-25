// const startTracking = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(function (position) {
//       console.log(position)
//     })
//   } else {
//     console.log('Geolocation is not supported')
//   }
// }

// const stopTracking = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(function (position) {
//       console.log(position)
//     })
//   } else {
//     console.log('Geolocation is not supported')
//   }
// }

let trackBtn = document.getElementById('trackBtn')

trackBtn.addEventListener('click', Start)

function Start() {
  console.log('Started')
  trackBtn.removeEventListener('click', Start)
  trackBtn.addEventListener('click', Stop)
  trackBtn.innerHTML = 'Stop'
}

function Stop() {
  console.log('Stopped')
  trackBtn.removeEventListener('click', Stop)
  trackBtn.addEventListener('click', Start)
  trackBtn.innerHTML = 'Start'
}

let runArr = []
let watchID
let geoLoc

function showLocation(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let runPoint = { lat: latitude, lon: longitude }
  runArr.push(runPoint)
  console.log('Latitude : ' + runPoint.lat + ' Longitude: ' + runPoint.lon)
}

function errorHandler(err) {
  if (err.code == 1) {
    console.log('Error: Access is denied!')
  } else if (err.code == 2) {
    console.log('Error: Position is unavailable!')
  }
}

function getLocationUpdate() {
  if (navigator.geolocation) {
    // timeout at 5000 milliseconds (5 seconds)
    let options = { timeout: 5000 }
    geoLoc = navigator.geolocation
    watchID = geoLoc.watchPosition(showLocation, errorHandler, options)
  } else {
    console.log('Sorry, browser does not support geolocation!')
  }
}

function stopLocationUpdate() {
  // Cancel the updates when the user clicks a button.
  navigator.geolocation.clearWatch(watchID)
}

alert(calcCrow(38.9285, 138.6007, 37.8136, 144.9631).toFixed(1))

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371 // km
  var dLat = toRad(lat2 - lat1)
  var dLon = toRad(lon2 - lon1)
  var lat1 = toRad(lat1)
  var lat2 = toRad(lat2)

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180
}
