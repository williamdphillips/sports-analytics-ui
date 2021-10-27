// Sports Analytics
let baseURL = 'http://192.168.4.75:8080';
var resp = '';
var games;
var plays;
var currentWeek;
var predictions;
var allOdds;

function setInnerHtml(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach(oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes)
        .forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

function getModel(game, i) {
    if (game.state == "pre" || game.state== "post") {
        return `<div class="col">
        <div class="card text-center">
    <div class="card-body">
        <div class="card-left" href="#">
            <img src="${game.awayTeamLogoURL}" width="40" height="40" alt="">
            <br>
            <a href="#" class="card-anchor">${game.awayTeamShortName}</a>
            <a href="#" class="card-anchor" style="margin-top: -0.3rem; font-size: 0.8rem;">(${game.awayTeamRecord})</a>
            <img class="card-football-left"
                    src="images/toppng.com-american-football-ball-png-vector-600x368.png" width="19"
                    height="12" alt="" style="${game.play.awayTeamPossession}">
        </div>
        <div class="card-center" href="#">
            <p class="card-bold" style="font-size: 2rem; margin-bottom: 0;">${game.awayTeamScore}-${game.homeTeamScore}</p>
            <p class="card-center-small">
                ${game.shortDetail}
            </p>
        </div>
        <div class="card-right" href="#">
            <img src="${game.homeTeamLogoURL}" width="40" height="40" alt="">
            <br>
            <a href="#" class="card-anchor">${game.homeTeamShortName}</a>
            <a href="#" class="card-anchor" style="margin-top: -0.3rem; font-size: 0.8rem;">(${game.homeTeamRecord})</a>
            <img class="card-football-right"
                    src="images/toppng.com-american-football-ball-png-vector-600x368.png" width="19"
                    height="12" alt="" style="${game.play.homeTeamPossession}">
        </div>
        <hr style="margin-bottom: 0">
        <div class="accordion" id="accordionExample">
            <img data-bs-toggle="collapse" data-bs-target="#collapse${i}"
                style="cursor:pointer; margin-bottom: 0;" src="images/arrow-down.png" width="20"
                height="20" alt="">
        </div>
        <div id="collapse${i}" class="panel-collapse collapse in">
            <div class="panel-body">
            <div style="display:block; width=100%;">
            
                <div style="width: 11rem; margin:auto;">
                <canvas id="winPercentage${i}"></canvas>
                <script>
                var data = {
                    labels: ['${game.homeTeamInitials}', '${game.awayTeamInitials}'],
                    datasets: [{
                        data: [${game.prediction.awayTeamChanceLoss}, ${game.prediction.homeTeamChanceLoss}],
                        backgroundColor: [
                            '#${game.homeTeamColor}',
                            '#${game.awayTeamColor}'
                        ],
                        hoverOffset: 4
                    }]
                };
            
                var config = {
                    type: 'doughnut',
                    data: data,
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Win Probability'
                            },
                            legend: {
                                display: true,
                                reverse: true
                            }
                        }
                    }
                };
            
                var myChart = new Chart(
                    document.getElementById('winPercentage${i}'),
                    config
                );
                </script>
                </div>
                                </div>
                                <div style="float:left; display: inline-block; margin-top:-5rem;">
                                    <table style="text-align: right; font-size:.6rem;">
                                        <tr>
                                            <td>Moneyline:</td>
                                            <td>${game.odds.awayTeamMoneyLine}</td>
                                        </tr>
                                        <tr>
                                            <td>Spread Odds:</td>
                                            <td>${game.odds.awayTeamSpreadOdds}</td>
                                        </tr>
                                        <tr>
                                            <td>Spread Rec:</td>
                                            <td>${game.odds.awayTeamSpreadSummary}</td>
                                        </tr>
                                        <tr>
                                            <td>Avg Score:</td>
                                            <td>${game.odds.awayTeamAverageScore}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="float:right; display: inline-block; margin-top:-5rem;">
                                    <table style="text-align:right;font-size:.6rem;">
                                        <tr>
                                            <td>Moneyline:</td>
                                            <td>${game.odds.homeTeamMoneyLine}</td>
                                        </tr>
                                        <tr>
                                            <td>Spread Odds:</td>
                                            <td>${game.odds.homeTeamSpreadOdds}</td>
                                        </tr>
                                        <tr>
                                            <td>Spread Rec:</td>
                                            <td>${game.odds.homeTeamSpreadSummary}</td>
                                        </tr>
                                        <tr>
                                            <td>Avg Score:</td>
                                            <td>${game.odds.homeTeamAverageScore}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div
                                    style="font-size:.6rem; display: inline-block; margin: auto;">
                                    Over / Under | Spread<br>${game.odds.overUnder} | ${game.odds.details}
                                </div>
            </div>
        </div>
    </div>
</div>
</div>`;
    }
    else {
        return `<div class="col">
        <div class="card text-center">
    <div class="card-body">
        <div class="card-left" href="#">
            <img src="${game.awayTeamLogoURL}" width="40" height="40" alt="">
            <br>
            <a href="#" class="card-anchor">${game.awayTeamShortName}</a>
            <a href="#" class="card-anchor" style="margin-top: -0.3rem; font-size: 0.8rem;">(${game.awayTeamRecord})</a>
            <img class="card-football-left"
                    src="images/toppng.com-american-football-ball-png-vector-600x368.png" width="19"
                    height="12" alt="" style="${game.play.awayTeamPossession}">
        </div>
        <div class="card-center" href="#">
            <p class="card-bold" style="font-size: 2rem; margin-bottom: 0;">${game.awayTeamScore}-${game.homeTeamScore}</p>
            <p class="card-center-small">
                ${game.shortDetail}
            </p>
        </div>
        <div class="card-right" href="#">
            <img src="${game.homeTeamLogoURL}" width="40" height="40" alt="">
            <br>
            <a href="#" class="card-anchor">${game.homeTeamShortName}</a>
            <a href="#" class="card-anchor" style="margin-top: -0.3rem; font-size: 0.8rem;">(${game.homeTeamRecord})</a>
            <img class="card-football-right"
                    src="images/toppng.com-american-football-ball-png-vector-600x368.png" width="19"
                    height="12" alt="" style="${game.play.homeTeamPossession}">
        </div>
        <hr style="margin-bottom: 0">
        <div class="accordion" id="accordionExample">
            <img data-bs-toggle="collapse" data-bs-target="#collapse${i}"
                style="cursor:pointer; margin-bottom: 0;" src="images/arrow-down.png" width="20"
                height="20" alt="">
        </div>
        <div id="collapse${i}" class="panel-collapse collapse in">
            <div class="panel-body">
                <p style="margin-bottom: 0; font-size: .9rem;">${game.play.latestPlay}</p>
                <div class="card-endzone away-team" style="background-color: #${game.awayTeamColor};"></div>
                <div class="card-football-field">
                    <div class="first-down-line" style="left: ${game.play.firstDownLine}%;"></div>
                    <div class="line-of-scrimmage" style="left: ${game.play.yardLine}%"></div>
                </div>
                <div class="card-endzone home-team" style="background-color: #${game.homeTeamColor};"></div>
                <button class="btn btn-light" style="margin-top: 0.5em;">Watch Live</button>
            </div>
        </div>
    </div>
</div>
</div>`;
    }
}

function updateGames(response) {
    console.log("updating games");
    if (response[0]["awayTeamColor"] !== undefined) {
        games = response;
        updateWeekContainer(games);
    }
    else if (response[0]["down"] !== undefined)
        plays = response;
    else if (response[0]["homeOppPointDifference"] !== undefined)
        predictions = response;
    else if (response[0]["overOdds"] !== undefined)
        allOdds = response;

    console.log(response);

    let container = document.getElementById("content");

    let htmlGames = [];
    if (games != null && plays != null && predictions != null && allOdds != null) {
        console.log("updating games")
        for (i = 0; i < games.length; i++) {
            let game = games[i];
            let play = {};
            for (j = 0; j < plays.length; j++) {
                if (plays[j] != null && plays[j].eventId == game.eventId)
                    play = plays[j];
            }
            let prediction = {};
            for (k = 0; k < predictions.length; k++) {
                if (predictions[k] != null && predictions[k].eventId == game.eventId)
                prediction = predictions[k];
            }
            let odds = {};
            for (l = 0; l < allOdds.length; l++) {
                if (allOdds[l] != null && allOdds[l].eventId == game.eventId)
                odds = allOdds[l];
            }

            if (play.possessionText != null && play.possessionText.substr(0, 3) != game.homeTeamInitials) {
                play.yardLine = 100 - play.yardLine
                play.firstDownLine = play.yardLine + play.firstDownDistance;
            } else {
                play.firstDownLine = play.yardLine - play.firstDownDistance;
            }

            if (play.latestPlay == null)
                play.latestPlay = "";

            play.awayTeamPossession = "visibility: hidden;"
            play.homeTeamPossession = "visibility: hidden;"

            if (play.teamInPossessionLongName == game.homeTeamDisplayName) {
                play.awayTeamPossession = "visibility: hidden;"
                play.homeTeamPossession = "visibility: visible;"
            } else if (play.teamInPossessionLongName == game.awayTeamDisplayName) {
                play.awayTeamPossession = "visibility: visible;"
                play.homeTeamPossession = "visibility: hidden;"
            }

            game.play = play;
            game.prediction = prediction;
            game.odds = odds;
            let model = getModel(game, i);
            htmlGames[i] = model;
        }
        setInnerHtml(container, htmlGames.join(''))
    }
}

var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.response);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.responseType = 'json';
        anHttpRequest.send();
    }
}

function updateWeekContainer(response) {
    let weekContainer = document.getElementById("nav-sub-container").children;
    Array.from(weekContainer).forEach(element => {
        element.className = "nav-sub-anchor";
    });
    weekContainer[response[0].week - 1].className = "nav-sub-anchor-active";
}

function updateWeek(response) {
    currentWeek = response[0].week;
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
    client.get(searchURL, function (response) {
        updateResponse(response, document);
    });
}

function updateResponse(response, document) {
    if (document.name == 'AllGames')
        updateGames(response);
    if (document.name == 'GamesByWeek')
        updateGames(response);
    else if (document.name == 'LatestPlay')
        updateGames(response);
    else if (document.name == 'getWeek')
        updateWeek(response);
    else if (document.name == 'getPredictions')
        updateGames(response);
    else if (document.name == 'getOdds')
        updateGames(response);
}

function getGamesByWeek(week) {
    console.log(`Getting Games for week ${week}`)
    if (currentWeek == week)
        getGames();
    else{
        updateDocument('/api/nfl/simple/games', { name: 'GamesByWeek' }, { week: week });
        getPredictionsByWeek(week);
        getAllOdds(week);
    }
}

function getGames() {
    updateDocument('/api/nfl/simple/games', { name: 'AllGames' }, {});
    getLatestPlays();
    getPredictions();
    getOdds();
}

function getLatestPlays() {
    updateDocument('/api/nfl/simple/latestplays', { name: 'LatestPlay' }, {});
}

function getLatestPlay(eventId) {
    updateDocument('/api/nfl/simple/latestplay', { name: 'LatestPlay' }, { eventid: eventId });
}

function getCurrentWeek() {
    updateDocument('/api/nfl/simple/games', { name: 'getWeek' }, {});
}

function getPredictions(){
    updateDocument('/api/nfl/simple/predictions', { name: 'getPredictions' }, {});
}

function getPredictionsByWeek(week){
    updateDocument('/api/nfl/simple/predictions', { name: 'getPredictions' }, {week:week});
}

function getOdds(){
    updateDocument('/api/nfl/simple/allodds', { name: 'getOdds' }, {});
}

function getAllOdds(week){
    updateDocument('/api/nfl/simple/allodds', { name: 'getOdds' }, {week:week});
}