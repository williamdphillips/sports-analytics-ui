const HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200)
                aCallback(xhr.response);
        }

        xhr.open("GET", aUrl, true);
        xhr.responseType = 'json';
        xhr.send();
    }
    this.post = function (aUrl, object) {
        let json = JSON.stringify(object);
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
        };

        xhr.open("POST", aUrl, true);
        xhr.setRequestHeader('content-type', 'application/json; charset=utf-8');
        xhr.send(json);
    }
    this.put = function (aUrl, object) {
        let json = JSON.stringify(object);
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
        };

        xhr.open("PUT", aUrl, true);
        xhr.setRequestHeader('content-type', 'application/json; charset=utf-8');
        xhr.send(json);
    }
    this.delete = function (aUrl) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
        };

        xhr.open("DELETE", aUrl, true);
        xhr.setRequestHeader('content-type', 'application/json; charset=utf-8');
        xhr.send();
    }
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addOrUpdateUrlParam(paramName, paramValue, refresh) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(paramName, paramValue);

    if(refresh)
        window.location.search = searchParams.toString();
    else {
        const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
    }
}

//Eg. GET, /api/users, { name:'Andy' }, doSomething(response)
function sendHttpRequest(requestType, endpoint, object, callbackFunction) {

    console.log("===========================================");
    console.log(`Sending ${requestType} REQUEST to\n${endpoint}`);
    let searchURL = new URL(`${baseURL}${endpoint}`);
    let client = new HttpClient();

    switch(requestType) {
        case 'GET':
            if(object != null) {
                let searchParams = new URLSearchParams(searchURL.searchParams);
                for (const [key, value] of Object.entries(object)) {
                    searchParams.append(key, value);
                }
                searchURL.search = searchParams;
            }
            client.get(searchURL, function (response) {
                callbackFunction(response, object);
            });
            break;
        case 'POST':
            client.post(searchURL, object);
            break;
        case 'PUT':
            client.put(searchURL, object);
            break;
        case 'DELETE':
            client.delete(searchURL);
            break;
    }

}