let trackBtn = document.getElementById('trackBtn')

trackBtn.addEventListener('click', start)

function start() {
  runArr = []
  // { lat: -34.92123, lon: 138.599503 }, // ADL
  // { lat: -37.840935, lon: 144.946457 }, // MELB

  getLocationUpdate()
  console.log('Started')
  trackBtn.removeEventListener('click', start)
  trackBtn.addEventListener('click', stop)
  trackBtn.innerHTML = 'Stop'
}

function stop() {
  stopLocationUpdate()
  console.log('Stopped')
  trackBtn.removeEventListener('click', stop)
  trackBtn.addEventListener('click', start)
  trackBtn.innerHTML = 'Start'
}

let runArr
let watchID
let geoLoc

function showLocation(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let runPoint = { lat: latitude, lon: longitude }
  runArr.push(runPoint)
  console.log(
    'Step #' +
      runArr.length +
      ' Latitude : ' +
      runPoint.lat +
      ' Longitude : ' +
      runPoint.lon
  )
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
    let options = { timeout: 10000 }
    geoLoc = navigator.geolocation
    watchID = geoLoc.watchPosition(showLocation, errorHandler, options)
  } else {
    console.log('Sorry, browser does not support geolocation!')
  }
}

function stopLocationUpdate() {
  // Cancel the updates when the user clicks a button.
  navigator.geolocation.clearWatch(watchID)
  console.log('GPS grabs: ' + runArr.length)
  let totalDistance = 0
  if (runArr.length > 1) {
    // 2 points minimum to calculate a distance
    for (let i = 1; i < runArr.length; i++) {
      const legDist = calcCrow(
        runArr[i - 1].lat,
        runArr[i - 1].lon,
        runArr[i].lat,
        runArr[i].lon
      )
      console.log('Leg #' + i + ' = ' + legDist.toFixed(1) + 'km')
      totalDistance += legDist
    }
  }
  const finalDistMsg = 'Total distance run: ' + totalDistance.toFixed(1) + 'km'
  console.log(finalDistMsg)
  alert(finalDistMsg)
}

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
