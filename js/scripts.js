// Sports Analytics
let baseURL = 'http://localhost:8080';
const resp = '';
let games;
let currentWeekNumber;
let currentSeasonType;
let selectedWeekNumber;
let selectedSeasonType;

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

function getModel(game, i, accordionStatus) {
    if (game.state == "pre" || game.state == "post") {
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
        <div class="accordion">
            <img data-bs-toggle="collapse" data-bs-target="#collapse${i}"
                style="cursor:pointer; margin-bottom: 0;" src="images/arrow-down.png" width="20"
                height="20" alt="" id="accordionCollapse${i}" >
        </div>
        <div id="collapse${i}" class="panel-collapse collapse in ${accordionStatus}">
            <div class="panel-body">
            <div style="display:block; width=100%;">
            
                <div style="width: 11rem; margin:auto;">
                <canvas id="winPercentage${i}"></canvas>
                <script>
                var data = {
                    labels: ['${game.homeTeam.abbrev}', '${game.awayTeam.abbrev}'],
                    datasets: [{
                        data: [${game.awayTeam.winPrediction}, ${game.homeTeam.winPrediction}],
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
            <div class="container">
                <div class="live-path">
                    <span class="live-shape trail"></span> 
                </div>
            </div>
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
        <div class="accordion">
            <img data-bs-toggle="collapse" data-bs-target="#collapse${i}"
                style="cursor:pointer; margin-bottom: 0;" src="images/arrow-down.png" width="20"
                height="20" alt="" id="accordionCollapse${i}">
        </div>
        <div id="collapse${i}" class="panel-collapse collapse in ${accordionStatus}">
            <div class="panel-body">
            <p style="margin-bottom: 0; font-size: .9rem;">${game.currentPlay.driveDescription}</p>
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

function updateGames(response, args) {

    console.log("updating games");
    console.log(response);
    console.log(args);

    if (args.week == undefined) {
        updateWeekContainer(currentWeekNumber, currentSeasonType);
        games = response.season[currentSeasonType][currentWeekNumber].events;
        selectedWeek = currentWeekNumber;
        selectedSeasonType = currentSeasonType;
    }
    else {
        updateWeekContainer(args.week, args.seasontype);
        games = response.season[args.seasontype][args.week].events;
    }

    let container = document.getElementById("content");

    let htmlGames = [];
    if (games != null) {
        for (i = 0; i < games.length; i++) {
            let game = games[i];

            if (game.period == 1 || game.period == 2) {
                if (game.currentPlay != null) {
                    game.currentPlay.yardLine = 100 - game.currentPlay.yardLine
                    if (game.currentPlay.teamInPossession.id == game.homeTeam.id) {
                        game.currentPlay.firstDownLine = game.currentPlay.yardLine - game.currentPlay.firstDownDistance;
                    } else {
                        game.currentPlay.firstDownLine = game.currentPlay.yardLine + game.currentPlay.firstDownDistance;
                    }
                } else {
                    game.currentPlay = {};
                    game.currentPlay.teamInPossession = {};
                    game.currentPlay.firstDownLine = 0;
                }
            } else {
                if (game.currentPlay != null) {
                    game.currentPlay.yardLine = 100 - game.currentPlay.yardLine
                    if (game.currentPlay.teamInPossession.id == game.homeTeam.id) {
                        game.currentPlay.firstDownLine = game.currentPlay.yardLine - game.currentPlay.firstDownDistance;
                    } else {
                        game.currentPlay.firstDownLine = game.currentPlay.yardLine + game.currentPlay.firstDownDistance;
                    }
                } else {
                    game.currentPlay = {};
                    game.currentPlay.teamInPossession = {};
                    game.currentPlay.firstDownLine = 0;
                }
            }


            if (game.currentPlay.playDescription == null)
                game.currentPlay.playDescription = "";
            if (game.currentPlay.downDistanceShortText == null)
                game.currentPlay.downDistanceShortText = "";
            if (game.currentPlay.driveDescription == null || game.currentPlay.driveDescription == undefined)
                game.currentPlay.driveDescription = "";

            game.currentPlay.awayTeamPossession = "visibility: hidden;"
            game.currentPlay.homeTeamPossession = "visibility: hidden;"

            if (game.currentPlay.teamInPossession.id == game.homeTeam.id) {
                game.currentPlay.awayTeamPossession = "visibility: hidden;"
                game.currentPlay.homeTeamPossession = "visibility: visible;"
            } else if (game.currentPlay.teamInPossession.id == game.awayTeam.id) {
                game.currentPlay.awayTeamPossession = "visibility: visible;"
                game.currentPlay.homeTeamPossession = "visibility: hidden;"
            }

            let collapseable = document.getElementById(`collapse${i}`);
            let accordionStatus = "";
            if (collapseable != null)
                if (collapseable.getAttribute("class").includes("show")) { accordionStatus = "show"; }
            let model = getModel(game, i, accordionStatus);
            htmlGames[i] = model;
        }
        setInnerHtml(container, htmlGames.join(''));
    }
}

function updateWeekContainer(weekNumber, seasonTypeNumber) {
    let weekDropdown = document.getElementById("weekDropdown");
    weekDropdown.textContent = `Week ${weekNumber}`;
    let weekDropdownContainer = document.getElementById("weekDropdownContainer");
    weekDropdownContainer.children[weekNumber-1].children[0].classList.add("active");


    let seasonType = '';
    if(seasonTypeNumber == 1)
        seasonType = "Preseason"
    if(seasonTypeNumber == 2)
        seasonType = "Regular Season"
    if(seasonTypeNumber == 3)
        seasonType = "Postseason"
    let seasonDropdown = document.getElementById("seasonDropdown");
    seasonDropdown.textContent = `${seasonType}`;

    let seasonDropdownContainer = document.getElementById("seasonDropdownContainer");
    seasonDropdownContainer.children[seasonTypeNumber-1].children[0].classList.add("active");

    /*
    let weekContainer = document.getElementById("nav-sub-container").children;
    Array.from(weekContainer).forEach(element => {
        element.className = "nav-sub-anchor";
    });
    console.log(`Week Number: ${weekNumber}`)
    weekContainer[weekNumber - 1].className = "nav-sub-anchor-active";
    */
}
function handleResponse(response, args) {
    if (Object.keys(response).length === 2){
        console.log("===========================================");
        console.log('Current Info:');
        console.log(response);
        currentSeasonType = response.currentSeasonType;
        currentWeekNumber = response.currentWeekNumber;
        console.log("===========================================");
        if(getParameterByName('seasontype') == null || getParameterByName('week') == null){
            addOrUpdateUrlParam('seasontype', response.currentSeasonType, false);
            addOrUpdateUrlParam('week', response.currentWeekNumber, true);
        }
    }else {
        updateGames(response, args);
    }
}

function getCurrentSeasonWeek(){
    sendHttpRequest('GET', '/api/nfl/ui/current', null, handleResponse);
}

function getGamesByWeek(seasonType, weekNumber) {
    console.log("===========================================");
    console.log(`Getting Games for season ${seasonType} week ${weekNumber}`)

    console.log(`Searched Season: ` + seasonType)
    console.log(`Searched Week: ` + weekNumber);
    console.log("===========================================");

    if(seasonType != null)
        selectedSeasonType = seasonType;
    if(weekNumber != null)
        selectedWeekNumber = weekNumber;
    
    if ((currentWeekNumber == weekNumber && currentSeasonType == seasonType) || weekNumber == null || seasonType == null) {
        console.log("Current week is selected");
        selectedWeekNumber = currentWeekNumber;
        selectedSeasonType = currentSeasonType;
        addOrUpdateUrlParam('week', selectedWeekNumber, false);
        addOrUpdateUrlParam('seasontype', selectedSeasonType, false);
        getGamesUpdate();
        setInterval('getGamesUpdate();', 15000);
    }
    else {
        sendHttpRequest('GET','/api/nfl/ui/games', { week: weekNumber, seasontype: seasonType }, handleResponse);
    }
}

function getGamesUpdate() {
    if (selectedWeekNumber == currentWeekNumber && selectedSeasonType == currentSeasonType){
        console.log(`Getting Update for week ${selectedWeekNumber}`);
        updateDocument('/api/nfl/ui/games', { name: 'gamesByWeek' }, {});
    }
}

function setLoading() {
    let container = document.getElementById("content");
    container.innerHTML = `<div class="spinner-border" style="width: 2rem; height: 2rem; margin: 2rem auto auto auto;" role="status">
    <span class="sr-only"></span>
  </div>`;
}