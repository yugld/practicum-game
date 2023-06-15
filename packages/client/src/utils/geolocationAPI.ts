const geolocationAPI = navigator.geolocation;

export const getUserCoordinates = () => {
    if (!geolocationAPI) {
        console.log('Geolocation API is not available in your browser!')
    } else {
        geolocationAPI.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            window.location.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        }, (error) => {
            console.log('Something went wrong getting your position!', error)
        })
    }
}
