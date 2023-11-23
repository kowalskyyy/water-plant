function refreshData() {
  fetch("/data")
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        return response.text();
      }
    })
    .then((data) => {
      if (data) {
        document.getElementById("sensorData").innerText = data;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
