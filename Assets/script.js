var nameEl = document.querySelector('#name');
var nameBtnEl = document.querySelector('#nameBtn');
var enteredWordEl = document.querySelector('#enteredWord');
var inputBtnEl = document.querySelector ('#inputShow');
var dropDownEl = document.querySelector ('#resultType');
var gifEl = document.querySelector('#imgDest');
var boxcontentEl = document.querySelector("#BoxContent");
var definitionContentEl = document.querySelector('#definitionContent');
var generalContentEl = document.querySelector('#generalContent');
var resetNameEl = document.querySelector('#resetName');
var lookupWithNameEl = document.querySelector('#lookupWithName');
// var dropDownEl = document.querySelector('#dropDown');
var localStorageCheck = localStorage.getItem('lsname');

var gifBoxEl = document.querySelector('#GIF')

var giphyApi = "caPF8xl6cQc8gPGCp7dHvWhmqQuMxD8T";
var wordApi = "429fbbca4emsh4a8adf9b0310694p1480a8jsnc3cf974a3f0f"; 

checkLS(localStorageCheck);

function nameSubmit (event) {
    event.preventDefault();

    var savedName = nameEl.value.trim();
    console.log(savedName);
    localStorage.setItem('lsname', savedName);
    localStorageCheck = localStorage.getItem('lsname');
    checkLS(localStorageCheck);
};


function checkLS (localStorageCheck) {
if (localStorageCheck !== null) {
    console.log(`Name exists`);
    nameBtnEl.style.visibility= "hidden";
    generalContentEl.style.visibility="visible";
    resetNameEl.style.visibility="visible";
    //   What word would you like to lookup?
    lookupWithNameEl.textContent = "Hello " + localStorage.getItem('lsname') + ', what word would you like to lookup?';
    return;
} else {
    console.log(`Name not found`);
    nameBtnEl.style.visibility= "visible";
    generalContentEl.style.visibility="hidden";
    resetNameEl.style.visibility="hidden";
    return;
}
}

function eraseLS () {
    localStorage.removeItem('lsname');
    localStorageCheck = localStorage.getItem('lsname');
    window.scrollTo(0,0);
    checkLS(localStorageCheck);
}

function wordSubmit (event) {
    event.preventDefault();

    var word = enteredWordEl.value.trim();

    if (!word){
        alert('Must Include Word')
        return
    } else {

        gifBoxEl.style.display = 'inline-block'
        boxcontentEl.style.display = 'block'
    
        console.log(word);
        getGiphyApi(word);
        checkLS;
    }

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
        
        // var gifImg = document.createElement('img');
        // gifImg.setAttribute('src' , giphUrl);
        gifEl.setAttribute('src', giphUrl); 
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

// var wordDefEl = document.createElement('h4');
// wordDefEl.textContent = wordDef;
// boxcontentEl.appendChild(wordDefEl); 
definitionContentEl.textContent = wordDef;

})

}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '429fbbca4emsh4a8adf9b0310694p1480a8jsnc3cf974a3f0f',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};


resetNameEl.addEventListener('click', eraseLS);
inputBtnEl.addEventListener('submit', wordSubmit);
nameBtnEl.addEventListener('submit', nameSubmit);