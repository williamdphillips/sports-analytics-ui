let baseURL = 'http://localhost:8080';
var resp = '';

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.response);
        }
        
        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.responseType = 'json';
        anHttpRequest.send();
    }
}

function updateDocument(endpoint, document, params) {

    console.log(baseURL);
    let searchURL = new URL(`${baseURL}${endpoint}`);

    let searchParams = new URLSearchParams(searchURL.searchParams);
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, value);
    }
    searchURL.search = searchParams;
    console.log('GET Triggered');
    console.log(searchURL.href);

    var client = new HttpClient();
    client.get(searchURL, function(response) {
      updateResponse(response, document);
});
}

function updateResponse(response, document){
    if(document.name == 'GamesByWeek')
        updateGames(response);
}

function getGamesByWeek(week) {
    updateDocument('/api/nfl/simple/games', {name:'GamesByWeek'}, { week: week });
}

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
    for(i = 0; i < games.length; i++){
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
</div>`

        htmlGames[i] = model;
    }

    container.innerHTML = htmlGames.join()
}