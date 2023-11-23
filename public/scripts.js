function refreshData() {
  fetch("/data")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("sensorData").innerText = data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("sensorData").innerText = "Error fetching data";
    });
}
