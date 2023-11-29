
var team1 = "https://www.op.gg/multisearch/euw?summoners="

//Button Placement and Setup
var btnParent = document.getElementsByClassName("teamprofile-members__container");
var btn = document.createElement("button");
btn.style.background = '#FFCCCC'
btn.classList.add("copy_code_button");
btn.appendChild(document.createTextNode("OPGG-->"));
btnParent[0].appendChild(btn);
btn.addEventListener('click', (e) => {
    window.open(team1);
})

//Read Document for Links
var links = document.getElementsByTagName("a")
var playerlinks = []
for (let i = 0; i < links.length; i++) {
    if(links[i].getAttribute('href')){
        if(links[i].getAttribute('href').toString().includes("https://www.opleague.pro/user/"))
            playerlinks.push(links[i].href)
    }
}

//Remove Links to own Player Profile aswell as duplicates
function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}
playerlinks.shift()
playerlinks.shift()
playerlinks.shift()
playerlinks.shift()
playerlinks = remove_duplicates(playerlinks)

//Send http requests to retrieve RIOT ID from user Page
function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
}

var summonerNames = []
var requests = []
var finishedRequests = 0;
for (let i = 0; i < playerlinks.length; i++) {
    requests[i] = makeHttpObject();
    requests[i].open("GET", playerlinks[i], true);
    requests[i].send(null);
    requests[i].onreadystatechange = function() {
        if (requests[i].readyState == 4){
            var doc = (new DOMParser).parseFromString(requests[i].responseText, "text/html");
            nameText = (doc.getElementById("launcher_13").textContent.replaceAll("#", "%23") + "%2C");
            team1 += nameText;
            finishedRequests++;
            if(finishedRequests >= playerlinks.length){
                btn.style.background = '#CCFFCC'
            }
        }
    };
}



