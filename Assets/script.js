var nameEl = document.querySelector('#name');
var nameBtnEl = document.querySelector('#nameBtn');
var enteredWordEl = document.querySelector('#enteredWord');
var inputShowEl = document.querySelector ('#inputShow');
var dropDownEl = document.querySelector ('#resultType');
var gifEl = document.querySelector('#GIF');
var boxcontentEl = document.querySelector("#BoxContent");

var giphyApi = "caPF8xl6cQc8gPGCp7dHvWhmqQuMxD8T";

var wordApi = "429fbbca4emsh4a8adf9b0310694p1480a8jsnc3cf974a3f0f"; 



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
        gifEl.appendChild(gifImg); 
        getwordApi(word);
    })   
}

 function getwordApi(word) {

    var requestsecondUrl= "https://wordsapiv1.p.rapidapi.com/words/"+word+"/definitions"

fetch(requestsecondUrl, options)
    .then(function (response) {
        return response.json();
    })
    
    .then(function(data){
var wordDef = data.definitions[0].definition;
console.log(wordDef);

var wordDefEl = document.createElement('h4');
wordDefEl.textContent = wordDef;
boxcontentEl.appendChild(wordDefEl); 

})

}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '429fbbca4emsh4a8adf9b0310694p1480a8jsnc3cf974a3f0f',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};



inputShowEl.addEventListener('submit', wordsubmit);
nameBtnEl.addEventListener('submit', nameSubmit);