const HIGH_ACCURACY = true
const MAX_CACHE_AGE_MILLISECOND = 20000
const MAX_NEW_POSITION_MILLISECOND = 8000

const trackOptions = {
  enableHighAccuracy: HIGH_ACCURACY,
  maximumAge: MAX_CACHE_AGE_MILLISECOND,
  timeout: MAX_NEW_POSITION_MILLISECOND,
}

const startTracking = () => {
  if (!navigator.geolocation) {
    logConsole.textContent = 'Geolocation is not supported by your browser'
  } else {
    logConsole.textContent = 'Locating ...'
    distanceBox.textContent = '0.000'

    return navigator.geolocation.watchPosition(success, error, trackOptions)
  }
}
