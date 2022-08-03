var nameEl = document.querySelector('#name');
var nameBtnEl = document.querySelector('#nameBtn');
var enteredWordEl = document.querySelector('#enteredWord');
var inputBtnEl = document.querySelector ('#inputShow');
var dropDownEl = document.querySelector ('#resultType');
var gifEl = document.querySelector('#GIF');

var giphyApi = "caPF8xl6cQc8gPGCp7dHvWhmqQuMxD8T";




function nameSubmit (event) {
    event.preventDefault();

    var savedName = nameEl.value.trim();
    console.log(savedName);
    localStorage.setItem('lsname', savedName);
};

// if (lsname === "")  {

// }

function wordsubmit (event) {
    event.preventDefault();

    var word = enteredWordEl.value.trim();
    console.log(word);
    getGiphyApi(word);
}


function getGiphyApi(word) {
    var requestUrl = 'https://api.giphy.com/v1/gifs/search?q=' + word +'&api_key=' + giphyApi

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        console.log(data.data[0].images.original.url);
        var giphUrl = data.data[0].images.original.url;
        
        var gifImg = document.createElement('img');
        gifImg.setAttribute('src' , giphUrl);
        console.log(gifImg);
        gifEl.appendChild(gifImg);
    })
}


inputBtnEl.addEventListener('submit', wordsubmit);
nameBtnEl.addEventListener('submit', nameSubmit);