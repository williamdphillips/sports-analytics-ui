export var env = {
    currentYearNumber: "",
    currentWeekNumber: "",
    currentSeasonType: "",
    selectedYearNumber: "",
    selectedWeekNumber: "",
    selectedSeasonType: "",
    baseURL: 'http://127.0.0.1:8080'
}

export function setLoading() {
    let container = document.getElementById("content");
    container.innerHTML = `<div class="spinner-border" style="width: 2rem; height: 2rem; margin: 2rem auto auto auto;" role="status">
    <span class="sr-only"></span>
  </div>`;
}