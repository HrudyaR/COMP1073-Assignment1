// Assignment 1 | COMP1073 Client-Side JavaScript
/* Variables
-------------------------------------------------- */

var textToSpeak = '';
const playBtn = document.querySelector("#play-btn");
const resetBtn = document.querySelector("#reset-btn");

// JSON which represent the list items
 var obj = [{
	nodeName : "#list-one",
	wordList : [{
		text : "The turkey",
		img : "images/turkey.jpg"
	 },
	 {
		text : "Mom",
		img : "images/mom.png"
	 },
	 {
		text : "Dad",
		img : "images/dad.png"
	 },
	 {
		text : "My teacher",
		img : "images/teacher.jpg"
	 },
	 {
		text : "The elephant",
		img : "images/elephant.jpg"
	 },
	 {
		text : "The cat",
		img : "images/cat.jpg"
	 },
	 {
		text : "The dog",
		img : "images/dog.png"
	 }],
 },
 {
	nodeName : "#list-two",
	wordList : [{
		text : "sat on",
		img : "images/sat.png"
	},
	{
		text : "ate",
		img : "images/ate.jpg"
	},
	{
		text : "danced with",
		img : "images/danc.png"
	},
	{
		text : "saw",
		img : "images/saw.jpg"
	},
	{
		text : "doesn't like",
		img : "images/dislike.jpg"
	},
	{
		text : "kissed",
		img : "images/kiss.png"
	}]
},
{
	nodeName : "#list-three",
	wordList : [{
		text: "a funny",
		img: "images/funny.jpg"
	},
	{
		text: "a scary",
		img: "images/scary.jpg"
	},
	{
		text: "a goofy",
		img: "images/goofy.png"
	},
	{
		text: "a slimy",
		img: "images/slimy.jpg"
	},
	{
		text: "a barking",
		img: "images/barking.jpg"
	},
	{
		text: "a fat",
		img: "images/fat.jpg"
	}]
},
{
	nodeName : "#list-four",
	wordList : [{
		text: "goat",
		img: "images/goat.png"
	},
	{
		text: "monkey",
		img: "images/monkey.png"
	},
	{
		text: "fish",
		img: "images/fish.png"
	},
	{
		text: "cow",
		img: "images/cow.png"
	},
	{
		text: "frog",
		img: "images/frog.jpg"
	},
	{
		text: "bug",
		img: "images/bug.png"
	},
	{
		text: "worm",
		img: "images/worm.jpg"
	}]
},
{
	nodeName : "#list-five",
	wordList : [{
		text: "on the moon",
		img: "images/moon.png"
	},
	{
		text: "on the chair",
		img: "images/chair.jpg"
	},
	 {
		 text: "in my spaghetti",
		 img: "images/spaghetti.png"
	 },
	 {
		text: "in my soup",
		img: "images/soup.jpg"
	 },
	 {
		 text: "on the grass",
		 img: "images/grass.png"
	 },
	 {
		 text: "in my shoes",
		 img: "images/shoes.jpg"
	 }]
}];

// Create a new speechSynthesis object
var synth = window.speechSynthesis;

/* Functions
-------------------------------------------------- */

// Function to bind all the items from the JSON
function bindArrayItems() {
	var randomWordIndex;

	// Loop through the five set of list
	for(let item of obj) {
		let elem = document.querySelector(item["nodeName"]);
		let btn = document.createElement("button");
		let listArray = item["wordList"];
		let randomColor = getRandomColor();

		btn.classList = "btn btn-primary btn-number";
		elem.style.backgroundColor = randomColor;
		btn.style.backgroundColor = randomColor;
		btn.style.borderColor = randomColor;
		btn.innerHTML = `<i class="far fa-hand-pointer"></i>`;
		elem.parentElement.insertBefore(btn, elem);

		// Loop through the list of words in each set to display the items
		for(let list of listArray){
			let listItem = document.createElement("li");
			let listImage = document.createElement("img");
			listImage.setAttribute('src', list.img);
			listItem.textContent = list.text;
			listItem.appendChild(listImage);
			elem.appendChild(listItem);
		}
		
		// Click event of buttons of each set of list
		btn.addEventListener('click', function(event) {
			listButtonClick(event, listArray);
		});
	}
	
}

// Function on click of each buttons
function listButtonClick(event, listArray) {
	let randomWord;
	let targetElement = event.currentTarget;
	let currentList = targetElement.parentElement.getElementsByTagName("ul")[0];

	targetElement.setAttribute('disabled', 'disabled');
	randomWord = randomValueFromArray(listArray);
	randomWordIndex = listArray.indexOf(randomWord);
	let selectedListItem = currentList.children[randomWordIndex];
	selectedListItem.classList.add('animated', 'heartBeat', 'active');

	playBtn.removeAttribute('disabled');
	speakNow(randomWord.text);
	pushRandomWord(randomWord.text);
}

// Function to get random value from the array
function randomValueFromArray(array){
	return array[Math.floor(Math.random()*array.length)];
}

// Function to get a random color : to set as the background color of buttons
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

//   Function to generate the textToSpeak
function pushRandomWord(word) {
	textToSpeak = textToSpeak + ' ' + word;
}

// Function to reset all
function reset() {
	var listELem = document.querySelectorAll(".list-box ul > li");
	var buttons = document.querySelectorAll(".list-box button");

	for(let elem of listELem) {
		elem.classList = "";
	}
	for(let button of buttons) {
		button.removeAttribute('disabled');
	}
	textToSpeak = '';
	playBtn.setAttribute('disabled', 'disabled');

	speakNow("Reset done");
}

// Function to speak the text
function speakNow(string) {
	// Create a new speech object, attaching the string of text to speak
	var utterThis = new SpeechSynthesisUtterance(string);
	// Actually speak the text
	synth.speak(utterThis);
}

// Call the main function to display all the list items
bindArrayItems();

/* Event Listeners*/
playBtn.addEventListener('click', function() {
	speakNow(textToSpeak);
});
resetBtn.addEventListener('click', reset);