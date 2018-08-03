var audio;
var slider;
var span;
var flag=1;
var value;
var id;
var forward;
var mypopup;
var backward;
var ulid;
$(document).ready(function() {
  
  var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      $pagination = $(".slider-pagi");
  
  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $("<li class='slider-pagi__elem'></li>");
      $li.addClass("slider-pagi__elem-"+i).data("page", i);
      if (!i) $li.addClass("active");
      $pagination.append($li);
    }
  };
  
  createBullets();
  
  function manageControls() {
    $(".slider-control").removeClass("inactive");
    if (!curSlide) $(".slider-control.left").addClass("inactive");
    if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };
  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };
  
  autoSlide();
  
  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass("animating");
      $slider.css("top");
      $(".slide").removeClass("active");
      $(".slide-"+curSlide).addClass("active");
      setTimeout(function() {
        $slider.removeClass("animating");
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-"+curSlide).addClass("active");
    $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
    $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on("mousedown touchstart", ".slider", function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;
    
    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
    });
  });
  
  $(document).on("mouseup touchend", function(e) {
    $(document).off("mousemove touchmove");
    if (animating) return;
    if (!diff) {
      changeSlides(true);
      return;
    }
    if (diff > -8 && diff < 8) {
      changeSlides();
      return;
    }
    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-control", function() {
    if ($(this).hasClass("left")) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-pagi__elem", function() {
    curSlide = $(this).data("page");
    changeSlides();
  });

  document.getElementById('selected').click();
  document.getElementById("defaultOpen").click();
  document.getElementById("activeone").click();

  



// popupsongs
var  ul2 = document.getElementById("listall");
for(var i=0;i<songsArray.length;i++){
  var li=document.createElement("li");
  var songText=document.createElement("span");
  songText.innerHTML=songsArray[i].songName;
  var coverImg = document.createElement("img");
  coverImg.className="cover";
  coverImg.setAttribute("src",songsArray[i].songImage);
  li.appendChild(songText);
  li.appendChild(coverImg);
  ul2.appendChild(li);
  songText.addEventListener("click",playSong);
}
//punjabilist
var ulpun = document.getElementById("Punlist");
console.log(uleng);
for(var i=0;i<punArray.length;i++){
  var li = document.createElement("li");
  var songText = document.createElement("span");
  var coverImg = document.createElement("img");
  coverImg.className='cover';
  coverImg.setAttribute('src',punArray[i].songImage);
  songText.innerHTML=punArray[i].songName;
  li.appendChild(songText);
  li.appendChild(coverImg);
  ulpun.appendChild(li);
  songText.addEventListener("click",playSong);
}
//hindilist
var ulhin = document.getElementById("Hinlist");
console.log(uleng);
for(var i=0;i<hinArray.length;i++){
  var li = document.createElement("li");
  var songText = document.createElement("span");
  var coverImg = document.createElement("img");
  coverImg.className='cover';
  coverImg.setAttribute('src',hinArray[i].songImage);
  songText.innerHTML=hinArray[i].songName;
  li.appendChild(songText);
  li.appendChild(coverImg);
  ulhin.appendChild(li);
  songText.addEventListener("click",playSong);
}
//englist
var uleng = document.getElementById("Englist");
console.log(uleng);
for(var i=0;i<engArray.length;i++){
  var li = document.createElement("li");
  var songText = document.createElement("span");
  var coverImg = document.createElement("img");
  coverImg.className='cover';
  coverImg.setAttribute('src',engArray[i].songImage);
  songText.innerHTML=engArray[i].songName;
  li.appendChild(songText);
  li.appendChild(coverImg);
  uleng.appendChild(li);
  songText.addEventListener("click",playSong);
}
//songList
audio = document.getElementById("audio");
var ul = document.getElementById("songList");
span = document.getElementById("songCovered");
slider = document.getElementById("slider");
slider.addEventListener("change",seekSong);
document.getElementById("save").addEventListener("click",savePlayList);
value=document.getElementById("play-pause");
forward = document.getElementById("forward");
forward.addEventListener("click",nextSong);
backward = document.getElementById("backward");
backward.addEventListener("click",prevSong);
value.className="fas fa-play fa-5x";
value.addEventListener("click",startSong);
for(var i=0;i<songsArray.length;i++){
  var li= document.createElement("li");
  var songText = document.createElement("span");
  var playListBtn = document.createElement("button");
  playListBtn.className = "fas fa-plus fa-1x playlistbtn popup";
  var coverImg = document.createElement("img");
  coverImg.className='cover';
  coverImg.setAttribute('src',songsArray[i].songImage);
  songText.innerHTML=songsArray[i].songName;
  li.appendChild(songText);
  li.appendChild(coverImg);
  li.appendChild(playListBtn);
  ul.appendChild(li);
  ulid=2;
  console.log(songText);
  songText.addEventListener("click",playSong);
  playListBtn.addEventListener("click",addToPlayList);

}
loadplayList();
});
function openTab(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
  // document.getElementById("defaultOpen").click();

function search(){
  console.log("function called");
  input = document.getElementById("input");
  input.style.display = "block";
  input.focus();
  input.classList.toggle("focus");
  // input.classList.toggle("focus");
  change();

}
function change(){
  console.log("function chnage");
  searchbtn = document.getElementById("searchbutton");
  searchbtn.classList.toggle("fa-times");
  // input = document.getElementById("input");
  // input.style.width=0+'%';
}
// function namesearch(){
//   var input, filter, ul, li, a, i;
//   input = document.getElementById("mySearch");
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("");
//   li = ul.getElementsByTagName("li");
//   for (i = 0; i < li.length; i++) {
//       a = li[i].getElementsByTagName("a")[0];
//       if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//           li[i].style.display = "";
//       } else {
//           li[i].style.display = "none";
//       }
//   }
// }
function openMenu(event , genreName){
  var i, menucontent, menulinks; 
  menucontent = document.getElementsByClassName("menucontent");
  for(i=0;i<menucontent.length;i++){
    menucontent[i].style.display = "none";
  }
  menulinks = document.getElementsByClassName("menulinks");
  for(i=0;i<menulinks.length;i++){
    menulinks[i].className = menulinks[i].className.replace(" active","");
  }
  document.getElementById(genreName).style.display = "block";
  event.currentTarget.className +=" active";
}

function openlist(event , genreName){
  var i, menucontent, menulinks; 
  menucontent = document.getElementsByClassName("menucontent2");
  for(i=0;i<menucontent.length;i++){
    menucontent[i].style.display = "none";
  }
  menulinks = document.getElementsByClassName("menulinks2");
  for(i=0;i<menulinks.length;i++){
    menulinks[i].className = menulinks[i].className.replace(" active","");
  }
  document.getElementById(genreName).style.display = "block";
  event.currentTarget.className +=" active";
}

function savePlayList(){
  if(window.localStorage){
      var json = JSON.stringify(obj.songsList);
      console.log(json);
      localStorage.setItem('playList',json);
  }
  else{
      alert("Update your Browser");
  }
}
function loadplayList(){
  console.log("loadplayList...");
  if(localStorage.playList){
      var data = localStorage.getItem('playList');
      obj.songsList = JSON.parse(data);
      printSongs();
  }
  else{
      console.log("Songs not found");
  }
}
function playSong(){
  console.log("Playing Song",songName);
  var songName = event.srcElement.innerHTML;
  var songCoverImg;
  var songUrl;
  console.log("ulid is",ulid);
  for(var i=0;i<engArray.length;i++){
    if(engArray[i].songName == songName){
        id=i;
        songUrl = engArray[i].songUrl;
        console.log("Song URL is ",songUrl,"Type of ",typeof songUrl);
        songCoverImg = engArray[i].songImage;
        value.className="fas fa-pause fa-5x";
        flag=0;
    }
  }
  for(var i=0;i<punArray.length;i++){
    if(punArray[i].songName == songName){
        id=i;
        songUrl = punArray[i].songUrl;
        console.log("Song URL is ",songUrl,"Type of ",typeof songUrl);
        songCoverImg = punArray[i].songImage;
        value.className="fas fa-pause fa-5x";
        flag=0;
    }
  }
  for(var i=0;i<hinArray.length;i++){
    if(hinArray[i].songName == songName){
        id=i;
        songUrl = hinArray[i].songUrl;
        console.log("Song URL is ",songUrl,"Type of ",typeof songUrl);
        songCoverImg = hinArray[i].songImage;
        value.className="fas fa-pause fa-5x";
        flag=0;
    }
  }
  for(var i=0;i<songsArray.length;i++){
      if(songsArray[i].songName == songName){
          id=i;
          songUrl = songsArray[i].songUrl;
          console.log("Song URL is ",songUrl,"Type of ",typeof songUrl);
          songCoverImg = songsArray[i].songImage;
          value.className="fas fa-pause fa-5x";
          flag=0;
      }
  }
  audio.src = songUrl;
  audio.play();
  setInterval(function(){
      slider.value = audio.currentTime;
      span.style.width = ((slider.value) / 1.9)+'%';
      console.log(slider.value);
  },500);
  setTimeout(function(){
      var duration = audio.duration;
      slider.max = duration;
  },500);
  
}


function startSong(){
  if(flag==1){
  audio.play();
  flag=0;
  value.removeClass="fas fa-play fa-5x";
  value.className="fas fa-pause fa-5x";
}
  else{
      audio.pause();
      flag=1;
      value.removeClass="fas fa-pause fa-5x";
      value.className="fas fa-play fa-5x";
  }
  
} 
function nextSong(){
  var j;
 j=id+1;
  console.log(length,"id is " ,id,"j is",j);
  if(j==songsArray.length){
    id=0;
    j=0;
  }
  console.log("j is ",j)
   var songUrl = songsArray[j].songUrl;
   console.log("Song URL is ",songUrl,"Type of ",typeof songUrl);
      
  audio.src = songUrl;
  audio.play();
  setInterval(function(){
      slider.value = audio.currentTime;
      span.style.width = ((slider.value) / 1.9)+'%';
      console.log(slider.value);
  },500);
  setTimeout(function(){
      var duration = audio.duration;
      slider.max = duration;
  },500);
  id=id+1;

}
function prevSong(){
  var j;
 j=id-1;
  console.log(length,"id is " ,id,"j is",j);
  if(id==0){
    return;
  }
  console.log("j is ",j)
   var songUrl = songsArray[j].songUrl;
   console.log("Song URL is ",songUrl,"Type of ",typeof songUrl);
      
  audio.src = songUrl;
  audio.play();
  setInterval(function(){
      slider.value = audio.currentTime;
      span.style.width = ((slider.value) / 1.9)+'%';
      console.log(slider.value);
  },500);
  setTimeout(function(){
      var duration = audio.duration;
      slider.max = duration;
  },500);
  id=id-1;

}

function seekSong(){
  audio.currentTime = slider.value;
}
function addToPlayList(){

var songToAdd = event.srcElement.parentElement.childNodes[0].innerHTML;
console.log("song to Add is ",songToAdd);
songsArray.forEach(function(currentSong){
    if(currentSong.songName==songToAdd){
        console.log("addd...",songToAdd);
        obj.addSong(currentSong.id,currentSong.songName,currentSong.songUrl,currentSong.songImage);
    }
});
printSongs();
// printSongs2();
}
function deleteToPlaylist(){
  var songId = event.srcElement.title;
  obj.deleteSong(songId);
  printSongs();
  // printSongs2();
}
function printSongs(){
  var ul = document.querySelector("#playList");
  ul.innerHTML = "";
  obj.songsList.forEach(function(obj){
      var li = document.createElement('li');
      var span = document.createElement("span");
      var playListBtn = document.createElement("button");
      playListBtn.className = 'fas fa-times fa-1x playlistbtn';
      playListBtn.setAttribute('title', obj.id);
      var coverImg = document.createElement('img');
      coverImg.setAttribute('src', obj.image);
      coverImg.className = 'cover';
      span.innerHTML = obj.name;
      li.appendChild(playListBtn);
      li.appendChild(coverImg);
      li.className = 'list-group-item';
      ul.appendChild(li);
      li.appendChild(span);
      span.addEventListener("click", playSong);
      playListBtn.addEventListener("click", deleteToPlaylist);
})
}

function openNav(){
  document.getElementById("allsongs").style.height="50%";
}
function closeNav(){
  console.log("inside nav");
  document.getElementById("allsongs").style.height="0%";
}
