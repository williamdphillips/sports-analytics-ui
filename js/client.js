let baseURL = 'http://localhost:8080';
var resp = '';

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.response);
        }
        
        anHttpRequest.open("GET", aUrl, true );
        anHttpRequest.responseType = 'jsonp';
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
        updateGameCards(response);
}

function getGamesByWeek(week) {
    updateDocument('/api/nfl/simple/games', {name:'GamesByWeek'}, { week: week });
}

