function updateSpeed(position) {
    const speedElement = document.getElementById('speed');
    let speed = position.coords.speed;

    // Handle null or undefined speed values
    if (speed === null || speed === undefined) {
        speed = 0;
    }

    // Speed is in meters per second, convert to km/h
    const speedInKmh = speed * 3.6;

    // Display the speed, rounded to two decimal places
    speedElement.textContent = `${speedInKmh.toFixed(2)} km/h`;
}

function showError(error) {
    const speedElement = document.getElementById('speed');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            speedElement.textContent = "Permission denied for GPS";
            break;
        case error.POSITION_UNAVAILABLE:
            speedElement.textContent = "Position unavailable";
            break;
        case error.TIMEOUT:
            speedElement.textContent = "Request timed out";
            break;
        case error.UNKNOWN_ERROR:
            speedElement.textContent = "An unknown error occurred";
            break;
    }
}

if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(updateSpeed, showError, {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 3000
    });
} else {
    alert('Geolocation is not supported by your browser.');
}