function refreshData() {
    fetch('/data')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sensorData').innerText = data;
        });
}
