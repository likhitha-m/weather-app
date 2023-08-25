

export async function getCurrentLocationWeather(handleSuccess: Function, handleError: Function) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSuccess(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          handleError(error);
        }
      );
    } else {
      console.log("Geolocation is not available.");
    }
  }
  