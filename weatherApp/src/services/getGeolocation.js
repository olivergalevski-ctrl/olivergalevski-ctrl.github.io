export async function getGeolocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported"));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                     latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                 });
                },
                (error) =>{
                     reject(new Error("Unable to retrieve location: " + error.message));
                }
            );
        }
    });
}