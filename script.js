function moveToSelected(element) {

    if (element == "next") {
      var selected = $(".selected").next();
    } else if (element == "prev") {
      var selected = $(".selected").prev();
    } else {
      var selected = element;
    }
  
    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();
  
    $(selected).removeClass().addClass("selected");
  
    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");
  
    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");
  
    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');
  
  }
  
  const songPicker = function songPicker() {
    switch (document.querySelector('.selected img').id) {
      case '1':
        audio.src = "./snowfall.mp3"
        songTitle('Snowfall · øneheart x reidenshi')
        break;
      case '2':
        audio.src = "./nuages.mp3"
        songTitle('Nauges · Distant')
        break;
      case '3':
        audio.src = "./Imbre.mp3"
        songTitle('Imbre · Jordan Critz')
        break;
      case '4':
        audio.src = "./InterstellarMainTheme.mp3"
        songTitle('Hans Zimmer · Interstellar Main Theme')
        break;
      case '5':
        audio.src = "./Labyrinthine.mp3"
        songTitle('Labyrinthine · Lena Raine')
        break;
      case '6':
        audio.src = "./analog.mp3"
        songTitle('milk cassette · analog_mannequin')
        break;
      case '7':
        audio.src = "./night.mp3"
        songTitle('Starry Night (Piano) · Jordan Critz')
        break;
      default:
        break;
  }}
const songStatusUpdate = function songStatusUpdate() {
    songStatus = true
    document.querySelector('.songStatus').classList.remove('hidden')
    document.querySelector('.songStatus').classList.add('playing')
    document.querySelector('.songStatus').innerHTML = 'Playing...'
}
  $(document).keydown(function(e) {
      switch(e.which) {
          case 37: // left
          moveToSelected('prev');
          break;
  
          case 39: // right
          moveToSelected('next');
          break;
  
          default: return;
      }
      e.preventDefault();
  });
  
  $('#carousel div').click(function() {
    moveToSelected($(this));
  });
  
  $('#prev').click(function() {
    moveToSelected('prev');
  });
  
  $('#next').click(function() {
    moveToSelected('next');
  });
  $(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        moveToSelected('next');
    }
    else {
        moveToSelected('prev');
    }
});  

const span = $('.startText')
let i = 0 

function typeWriter() {
    const words = ['Adjust your ambient', 'Chill your mind and soul', 'Do not let anyone to upset you']
    let wordCount = 0
    let letterCount = 0

    let timeOut = 1

    let isDeleting = false

    function type() {
        if(wordCount === words.length) {
            wordCount = 0
        }

        currentWord = words[wordCount]

        if(isDeleting) {
            currentText = currentWord.slice(0, --letterCount)
        } else {
            currentText = currentWord.slice(0, ++letterCount)
        }

        document.querySelector('.typewrite').textContent = currentText
        timeOut = isDeleting ? 50 : 200;

        if(!isDeleting && currentText.length === currentWord.length) {
            timeOut = 2000
            isDeleting = true
        } else if(isDeleting && currentText.length === 0){
            timeOut = 1000
            isDeleting = false
            wordCount++
        }
        setTimeout(type, timeOut)
    }
    type()

}
typeWriter()

let audio = new Audio();
let songStatus = false
let lastSongID = ''
const button = document.querySelector('.songPlay')

button.addEventListener('click', function (event) {
  if (lastSongID == '') {
    lastSongID = document.querySelector('.selected img').id
    songPicker()
    audio.play()
    songStatusUpdate()
    document.querySelector('.songPlay').innerHTML = 'Pause'
  } else {
      if (songStatus == false) {
          songStatusUpdate()
          if (lastSongID == document.querySelector('.selected img').id) {
              audio.play()
              lastSongID = document.querySelector('.selected img').id
              document.querySelector('.songPlay').innerHTML = 'Pause'
            }
            else {
              songPicker()
              audio.play()
              lastSongID = document.querySelector('.selected img').id
              document.querySelector('.songPlay').innerHTML = Pause
            }
       } else {
        document.querySelector('.songStatus').innerHTML = 'Pause'
        document.querySelector('.songStatus').classList.remove('playing')
        audio.pause()
        songStatus = false
        document.querySelector('.songPlay').innerHTML = 'Play'
  
      }
  }
})

const songTitle = function songTitle(Title) {
  document.querySelector('.songInfo').innerHTML = Title
}


const volumeMaster = function volumeMaster(a) {
  audio.volume = (a/100)
}

audio.addEventListener("ended", function(){
  audio.currentTime = 0;
  console.log("ended");
  document.querySelector('.songStatus').innerHTML = 'Pause'
  document.querySelector('.songStatus').classList.remove('playing')
  document.querySelector('.songStatus').innerHTML = "Ambient ended! AutoPlay feature soon!"

});