// Sports Analytics
let baseURL = 'http://192.168.1.243:8080';
var resp = '';
var games;
var currentWeek;

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
            <img src="${game.awayTeam.logoURL}" width="40" height="40" alt="">
            <br>
            <a href="#" class="card-anchor">${game.awayTeam.shortName}</a>
            <a href="#" class="card-anchor" style="margin-top: -0.3rem; font-size: 0.8rem;">(${game.awayTeam.record})</a>
            <img class="card-football-left"
                    src="images/toppng.com-american-football-ball-png-vector-600x368.png" width="19"
                    height="12" alt="" style="${game.currentPlay.awayTeamPossession}">
        </div>
        <div class="card-center" href="#">
            <p class="card-bold" style="font-size: 2rem; margin-bottom: 0;">${game.awayTeam.currentScore}-${game.homeTeam.currentScore}</p>
            <p class="card-center-small">
                ${game.shortDetail}
            </p>
        </div>
        <div class="card-right" href="#">
            <img src="${game.homeTeam.logoURL}" width="40" height="40" alt="">
            <br>
            <a href="#" class="card-anchor">${game.homeTeam.shortName}</a>
            <a href="#" class="card-anchor" style="margin-top: -0.3rem; font-size: 0.8rem;">(${game.homeTeam.record})</a>
            <img class="card-football-right"
                    src="images/toppng.com-american-football-ball-png-vector-600x368.png" width="19"
                    height="12" alt="" style="${game.currentPlay.homeTeamPossession}">
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
                    labels: ['${game.homeTeam.abbrev}', '${game.awayTeam.abbrev}'],
                    datasets: [{
                        data: [${game.awayTeam.chanceWin}, ${game.homeTeam.chanceWin}],
                        backgroundColor: [
                            '#${game.homeTeam.primaryColor}',
                            '#${game.awayTeam.primaryColor}'
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
                                            <td>${game.awayTeam.moneyLine}</td>
                                        </tr>
                                        <tr>
                                            <td>Spread Odds:</td>
                                            <td>${game.awayTeam.spreadOdds}</td>
                                        </tr>
                                        <tr>
                                            <td>Spread Rec:</td>
                                            <td>${game.awayTeam.spreadSummary}</td>
                                        </tr>
                                        <tr>
                                            <td>Avg Score:</td>
                                            <td>${game.awayTeam.averageScore}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="float:right; display: inline-block; margin-top:-5rem;">
                                    <table style="text-align:right;font-size:.6rem;">
                                        <tr>
                                            <td>Moneyline:</td>
                                            <td>${game.homeTeam.moneyLine}</td>
                                        </tr>
                                        <tr>
                                            <td>Spread Odds:</td>
                                            <td>${game.homeTeam.spreadOdds}</td>
                                        </tr>
                                        <tr>
                                            <td>Spread Rec:</td>
                                            <td>${game.homeTeam.spreadSummary}</td>
                                        </tr>
                                        <tr>
                                            <td>Avg Score:</td>
                                            <td>${game.homeTeam.averageScore}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div
                                    style="font-size:.6rem; display: block; margin: auto;">
                                    Over / Under | Spread<br>${game.overUnder} | ${game.spreadDetails}
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
            <img src="${game.awayTeam.logoURL}" width="40" height="40" alt="">
            <br>
            <a href="#" class="card-anchor">${game.awayTeam.shortName}</a>
            <a href="#" class="card-anchor" style="margin-top: -0.3rem; font-size: 0.8rem;">(${game.awayTeam.record})</a>
            <img class="card-football-left"
                    src="images/toppng.com-american-football-ball-png-vector-600x368.png" width="19"
                    height="12" alt="" style="${game.currentPlay.awayTeamPossession}">
        </div>
        <div class="card-center" href="#">
            <p class="card-bold" style="font-size: 2rem; margin-bottom: 0;">${game.awayTeam.currentScore}-${game.homeTeam.currentScore}</p>
            <p class="card-center-small">
                ${game.shortDetail}
            </p>
            <p style="margin-bottom: 0; font-size: .9rem;">${game.currentPlay.downDistanceShortText}</p>
        </div>
        <div class="card-right" href="#">
            <img src="${game.homeTeam.logoURL}" width="40" height="40" alt="">
            <br>
            <a href="#" class="card-anchor">${game.homeTeam.shortName}</a>
            <a href="#" class="card-anchor" style="margin-top: -0.3rem; font-size: 0.8rem;">(${game.homeTeam.record})</a>
            <img class="card-football-right"
                    src="images/toppng.com-american-football-ball-png-vector-600x368.png" width="19"
                    height="12" alt="" style="${game.currentPlay.homeTeamPossession}">
        </div>
        <hr style="margin-bottom: 0">
        <div class="accordion" id="accordionExample">
            <img data-bs-toggle="collapse" data-bs-target="#collapse${i}"
                style="cursor:pointer; margin-bottom: 0;" src="images/arrow-down.png" width="20"
                height="20" alt="">
        </div>
        <div id="collapse${i}" class="panel-collapse collapse in">
            <div class="panel-body">
                <div class="card-endzone away-team" style="background-color: #${game.awayTeam.primaryColor};"></div>
                <div class="card-football-field">
                    <div class="first-down-line" style="left: ${game.currentPlay.firstDownLine}%;"></div>
                    <div class="line-of-scrimmage" style="left: ${game.currentPlay.yardLine}%"></div>
                </div>
                <div class="card-endzone home-team" style="background-color: #${game.homeTeam.primaryColor};"></div>
                <p style="margin:0; font-size: .9rem;">${game.currentPlay.playDescription}</p>
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
    games = response.events;
    console.log(response);
    updateWeekContainer(response);

    let container = document.getElementById("content");

    let htmlGames = [];
    if (games != null) {
        for (i = 0; i < games.length; i++) {
            let game = games[i];

            if(game.period == 1 || game.period == 2){
                if(game.currentPlay != null){
                    game.currentPlay.yardLine = 100 - game.currentPlay.yardLine
                    if (game.currentPlay.teamInPossession.id == game.homeTeam.id) {
                        game.currentPlay.firstDownLine = game.currentPlay.yardLine - game.currentPlay.firstDownDistance;
                    } else {
                        game.currentPlay.firstDownLine = game.currentPlay.yardLine + game.currentPlay.firstDownDistance;
                    }
                }else{
                    game.currentPlay = {};
                    game.currentPlay.teamInPossession = {};
                    game.currentPlay.firstDownLine = 0;
                }
            }else{
                if(game.currentPlay != null){
                    game.currentPlay.yardLine = 100 - game.currentPlay.yardLine
                    if (game.currentPlay.teamInPossession.id == game.homeTeam.id) {
                        game.currentPlay.firstDownLine = game.currentPlay.yardLine - game.currentPlay.firstDownDistance;
                    } else {
                        game.currentPlay.firstDownLine = game.currentPlay.yardLine + game.currentPlay.firstDownDistance;
                    }
                }else{
                    game.currentPlay = {};
                    game.currentPlay.teamInPossession = {};
                    game.currentPlay.firstDownLine = 0;
                }
            }
            

            if (game.currentPlay.playDescription == null)
                game.currentPlay.playDescription = "";
            if(game.currentPlay.downDistanceShortText == null)
                game.currentPlay.downDistanceShortText = "";

            game.currentPlay.awayTeamPossession = "visibility: hidden;"
            game.currentPlay.homeTeamPossession = "visibility: hidden;"

            if (game.currentPlay.teamInPossession.id == game.homeTeam.id) {
                game.currentPlay.awayTeamPossession = "visibility: hidden;"
                game.currentPlay.homeTeamPossession = "visibility: visible;"
            } else if (game.currentPlay.teamInPossession.id == game.awayTeam.id) {
                game.currentPlay.awayTeamPossession = "visibility: visible;"
                game.currentPlay.homeTeamPossession = "visibility: hidden;"
            }

            console.log("getting model");

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
    console.log(`Week Number: ${response.weekNumber}`)
    weekContainer[response.weekNumber - 1].className = "nav-sub-anchor-active";
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
    if (document.name == 'allGames'){
        currentWeek = response.weekNumber;
        updateGames(response);
    }
    if (document.name == 'gamesByWeek')
        updateGames(response);
}

function getGamesByWeek(week) {
    console.log(`Getting Games for week ${week}`)
    setLoading();
    if (currentWeek == week)
        getGames();
    else{
        updateDocument('/api/nfl/ui/games', { name: 'gamesByWeek' }, { week: week });
    }
}

function getGames() {
    setLoading();
    updateDocument('/api/nfl/ui/games', { name: 'allGames' }, {});
}

function setLoading(){
    console.log("Loading")
    let container = document.getElementById("content");
    container.innerHTML = `<div class="spinner-border" style="width: 2rem; height: 2rem; margin: 2rem auto auto auto;" role="status">
    <span class="sr-only"></span>
  </div>`;
}