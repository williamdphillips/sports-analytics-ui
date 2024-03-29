// Sports Analytics

import {env, setLoading} from "./global.js";
import {addOrUpdateUrlParam, getParameterByName, sendHttpRequest} from "./http.js";

function setInnerHtml(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach(oldScript => {
        const newScript = document.createElement("script");
        // @ts-ignore
        Array.from(oldScript.attributes)
            // @ts-ignore
            .forEach(attr => newScript.setAttribute(attr.name, attr.value));
        // @ts-ignore
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        // @ts-ignore
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function getCardModel(game, i, accordionStatus) {
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
            <p class="card-bold">${game.awayTeam.currentScore}-${game.homeTeam.currentScore}</p>
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
                                data: [${calculateWinPercentage(game.awayTeam.winPrediction, game.homeTeam.moneyLine)}, ${calculateWinPercentage(game.homeTeam.winPrediction, game.awayTeam.moneyLine)}],
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

function calculateWinPercentage(prediction, moneyLine){
    if(prediction !== 0)
        return prediction;

    if(moneyLine < 0){
        return moneyLine/(moneyLine-100)
    }else{
        return moneyLine/(moneyLine+100)
    }
}

export function updateGameCards(response) {
    let year = parseInt(getParameterByName('year'));
    let week = parseInt(getParameterByName('week'));
    let seasonType = parseInt(getParameterByName('seasontype'));
    let games;

    if (week === undefined) {
        updateSubmenuContainers(env.currentYearNumber, env.currentWeekNumber, env.currentSeasonType);
        games = response.season[env.currentSeasonType][env.currentWeekNumber].events;
        env.selectedYearNumber = env.currentYearNumber;
        env.selectedWeekNumber = env.currentWeekNumber;
        env.selectedSeasonType = env.currentSeasonType;
    }
    else {
        updateSubmenuContainers(year, week, seasonType);
        games = response.season[seasonType][week].events;
    }

    let container = document.getElementById("content");

    let htmlGames = [];
    if (games != null) {
        for (let i = 0; i < games.length; i++) {
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

            //football icon --------------------------------------------------------------------------
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
            let model = getCardModel(game, i, accordionStatus);
            htmlGames[i] = model;
        }
        setInnerHtml(container, htmlGames.join(''));
    }
}

function updateSubmenuContainers(year, week, seasonTypeNumber) {

    let yearDropdown = document.getElementById("yearDropdown");
    yearDropdown.textContent = `${year}`;
    let yearDropdownContainer = document.getElementById("yearDropdownContainer");
    //TODO: Make year selection dynamic instead of hardcoded
    yearDropdownContainer.children[2022-year].children[0].classList.add("active");

    let weekDropdown = document.getElementById("weekDropdown");
    weekDropdown.textContent = `Week ${week}`;
    let weekDropdownContainer = document.getElementById("weekDropdownContainer");
    weekDropdownContainer.children[week-1].children[0].classList.add("active");


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

}

function getGamesByWeek(yearNumber, seasonType, weekNumber) {
    console.log("===========================================");
    if(yearNumber != null && seasonType != null && weekNumber != null)
        console.log(`Getting Games for year ${yearNumber} season ${seasonType} week ${weekNumber}`)
    else
        console.log(`Getting Games for current season and week`)
    //@ts-ignore
    sendHttpRequest('GET','/api/nfl/ui/games', { year: yearNumber, week: weekNumber, seasontype: seasonType }, function (status, response) {

        console.log(response);
        env.currentYearNumber = response.currentYearNumber;
        env.currentSeasonType = response.currentSeasonType;
        env.currentWeekNumber = response.currentWeekNumber;

        if(yearNumber != null)
            env.selectedYearNumber = yearNumber;
        else
            env.selectedYearNumber = response.currentYearNumber;

        if(seasonType != null)
            env.selectedSeasonType = seasonType;
        else
            env.selectedSeasonType = response.currentSeasonType;

        if(weekNumber == null)
            env.selectedWeekNumber = response.currentWeekNumber;
        else
            env.selectedWeekNumber = weekNumber;

        if (env.currentYearNumber == env.selectedYearNumber &&
            env.currentSeasonType == env.selectedSeasonType &&
            env.currentWeekNumber == env.selectedWeekNumber) {
            console.log("Current week is selected");
            console.log("===========================================");
            addOrUpdateUrlParam('seasontype', env.currentSeasonType, false);
            addOrUpdateUrlParam('week', env.currentWeekNumber, false);
            addOrUpdateUrlParam('year', env.currentYearNumber, false);
        }

        updateGameCards(response);
    });
}

function getCurrentGamesUpdate() {
    if (env.currentYearNumber == env.selectedYearNumber &&
        env.selectedWeekNumber == env.currentWeekNumber &&
        env.selectedSeasonType == env.currentSeasonType){
        console.log(`* Fetching Update`);
        getGamesByWeek(env.currentYearNumber, env.currentSeasonType, env.currentWeekNumber);
    }
}

export function init() {
    setLoading();
    let yearNumber = getParameterByName('year');
    let seasonType = getParameterByName('seasontype');
    let weekNumber = getParameterByName('week');
    getGamesByWeek(yearNumber, seasonType, weekNumber);
    setInterval(getCurrentGamesUpdate, 10000);
};