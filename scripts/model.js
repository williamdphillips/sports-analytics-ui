function updateGames(games) {
    console.log(games);
    let container = document.getElementById("middleContentContainer");
    let displayClock = '';

    let homeTeamName = '';
    let homeTeamImage = '';
    let homeTeamColor = '';
    let homeTeamScore = '';

    let awayTeamName = '';
    let awayTeamImage = '';
    let awayTeamColor = '';
    let awayTeamScore = '';

    let htmlGames = [];
    for (i = 0; i < games.length; i++) {
        displayClock = games[i].displayClockDetail;
        homeTeamName = games[i].homeTeamDisplayName;
        homeTeamImage = games[i].homeTeamLogoURL;
        homeTeamColor = games[i].homeTeamColor;
        homeTeamScore = games[i].homeTeamScore;
        awayTeamName = games[i].awayTeamDisplayName;
        awayTeamImage = games[i].awayTeamLogoURL;
        awayTeamColor = games[i].awayTeamColor;
        awayTeamScore = games[i].awayTeamScore;
        let model = `<div class="liveScoreContainer">
        <div class="awayContainer">
            <img class="awayTeamImage" src="${awayTeamImage}" alt="">
            <p class="homeTeamDisplayName">${awayTeamName}</p>
        </div>
        <div class="scoreContainer">
            <h2 class="scoreValue">${awayTeamScore} - ${homeTeamScore}</h2>
            <p class="time">${displayClock}</p>
        </div>
        <div class="homeContainer">
            <img class="homeTeamImage" src="${homeTeamImage}" alt="">
            <p class="awayTeamDisplayName">${homeTeamName}</p>
        </div>
    </div>`;

        htmlGames[i] = model;
    }

    container.innerHTML = htmlGames.join('');
}