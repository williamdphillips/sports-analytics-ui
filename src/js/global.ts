export var env = {
    currentYearNumber: "",
    currentWeekNumber: "",
    currentSeasonType: "",
    selectedYearNumber: "",
    selectedWeekNumber: "",
    selectedSeasonType: "",
    baseURL: 'http://192.168.1.243:8080'
}

export function setLoading() {
    let container = document.getElementById("content");
    container.innerHTML = `<div class="spinner-border" style="width: 2rem; height: 2rem; margin: 2rem auto auto auto;" role="status">
    <span class="sr-only"></span>
  </div>`;
}