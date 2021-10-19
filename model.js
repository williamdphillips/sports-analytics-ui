function updateGames(games) {
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
</div>`

    for(i = 0; i < games.length; i++){
        displayClock = games[i].displayClock;
        homeTeamName = games[i].homeTeamName;
        homeTeamImage = games[i].homeTeamImage;
        homeTeamColor = games[i].homeTeamColor;
        homeTeamScore = games[i].homeTeamScore;
        awayTeamName = games[i].awayTeamName;
        awayTeamImage = games[i].awayTeamImage;
        awayTeamColor = games[i].awayTeamColor;
        awayTeamScore = games[i].awayTeamScore;
        container.append(model)
    }
}