let audio;
let playList = document.querySelectorAll('#playlist li');
document.querySelector('#pause').style.display = 'none';
initAudio(document.querySelector('#playlist li:first-child'));

function initAudio(element){
	let song = element.getAttribute('song');
	let title = element.textContent;
	let cover = element.getAttribute('cover');
	let artist = element.getAttribute('artist');
	
	//Create audio object
	audio = new Audio('media/'+ song);
//	console.dir(audio);
	
	//Insert audio info
	document.querySelector('.artist').textContent = artist;
	document.querySelector('.title').textContent = title;
	
	//Insert song cover
	document.querySelector('img.cover').setAttribute('src','images/covers/'+cover);
	for(let i=0; i<playList.length; i++){
		playList[i].classList.remove('active');
	}
	element.classList.add('active');
}

//Play button
document.querySelector('#play').onclick = function(){
	audio.play();
	document.querySelector('#play').style.display = 'none';
	document.querySelector('#pause').style.display = 'inline';
	showDuration();
}

//Pause button
document.querySelector('#pause').onclick = function(){
	audio.pause();
	document.querySelector('#play').style.display = 'inline';
	document.querySelector('#pause').style.display = 'none';
};

//Stop button
document.querySelector('#stop').onclick = function(){
	audio.pause();
	audio.currentTime = 0;
};

//Next button
document.querySelector('#next').onclick = function(){
	audio.pause();
	let next = document.querySelector('#playlist li.active').nextElementSibling;
	if(next == null){
		next = document.querySelector('#playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	showDuration();
};

//Prev button
document.querySelector('#prev').onclick = function(){
	audio.pause();
	let prev = document.querySelector('#playlist li.active').previousElementSibling;
	if(prev == null){
		prev = document.querySelector('#playlist li:last-child');
	}
	initAudio(prev);
	audio.play();
	showDuration();
};

//Playlist song click
for(let i=0; i<playList.length; i++){
	playList[i].onclick = function(e){
		audio.pause();
		initAudio(e.target);
		document.querySelector('#play').style.display = 'none';
		document.querySelector('#pause').style.display = 'inline';
		audio.play();
		showDuration();
	};
}
//Volume control
document.querySelector('#volume').onchange = function(){
	audio.volume = parseFloat(this.value / 10);
};

//Time/Duration
function showDuration(){
		audio.ontimeupdate = function(){
		//Get hours and minutes
		let s = parseInt(audio.currentTime % 60);
		let m = parseInt(audio.currentTime / 60) % 60;
		if(s < 10){
			s = '0'+s;
		}
		document.querySelector('#duration').innerHTML = m + ':'+ s;
		let value = 0;
		if(audio.currentTime > 0){
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		document.querySelector('#progress').style.width = value + '%';
	};
}