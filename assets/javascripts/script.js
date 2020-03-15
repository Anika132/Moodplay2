var audio;
var slider;
var span;
var flag=1;
var value;
var id;
var search;
var songImageplaying;
var songNameplaying;
var singers;
var currentSongId;
var forward;
var mypopup;
var backward;
var ulid;
var songCount;
var addedSongs=[];
var isplaying = false;
var allTypes=["Pop","EDM","Melody","Bollywood","Classics","Punjabi"];
$(document).ready(function() {
  document.getElementById("defaultOpen").click();
  autocomplete(document.getElementById("search-input"), songsArray);

  for(let i=0;i<allTypes.length;i++){
    var SongPromise = doAjax(allTypes[i]);
    SongPromise.then(data=>{
      var types=document.getElementById(allTypes[i]);
      var content=document.querySelector("#maincontent");
      var heading = document.createElement("div");
      var type = document.createElement("h1");
      var moveleft = document.createElement("button");
      moveleft.className="fas fa-chevron-left fa-5x move moveleft";
      moveleft.addEventListener("click",()=>{
        $('#'+allTypes[i]+'>.outer').animate({scrollLeft:'-=400px'});
      });
      var moveright = document.createElement("button");
      moveright.className="fas fa-chevron-right fa-5x move moveright";
      moveright.addEventListener("click",()=>{
        $('#'+allTypes[i]+'>.outer').animate({scrollLeft:'+=400px'});
      });
      type.innerText=allTypes[i];
      type.className="headname";
      heading.className="heading";
      var line = document.createElement("hr");
      line.className="underline";
      heading.appendChild(type);
      heading.appendChild(moveleft);
      heading.appendChild(moveright);
      heading.appendChild(line);
      types.appendChild(heading);
      var SongObject = data;
      var scrolldiv = document.createElement("div");
      for(x=0;x<SongObject.length;x++){
        var id=songsArray.length;
        var outerdiv = document.createElement("div");
        var songImage = document.createElement("img");
        var overlaydiv = document.createElement("div");
        var span = document.createElement("span");
        var text = document.createElement("div");
        var songname = document.createElement("div");
        var songId = document.createElement("span");
        if(moveNameOverlay(SongObject[x].trackCensoredName)){
          songname.className="text-marquee";
        }
        songname.innerHTML=SongObject[x].trackCensoredName;
        var playBtn = document.createElement("span");
        playBtn.className = "fas fa-headphones playborder";
        playBtn.addEventListener("click",playSong2);
        text.appendChild(playBtn);
        songCount=parseInt(id)+1;
        songId.className="hide";
        songId.innerHTML=songCount;
        text.appendChild(songId);
        text.appendChild(songname);
        text.className="text";
        overlaydiv.className="overlay";
        overlaydiv.appendChild(text);
        songImage.setAttribute('src',SongObject[x].artworkUrl100);
        var object={
          "id":songCount,
          "songName":SongObject[x].trackCensoredName,
          "songImage":SongObject[x].artworkUrl100,
          "singers":SongObject[x].artistName,
          "songUrl":SongObject[x].previewUrl
        }
        span.addEventListener("click",openNav);
        outerdiv.appendChild(songImage);
        outerdiv.appendChild(overlaydiv);
        outerdiv.className="column";
        scrolldiv.appendChild(outerdiv);
        songsArray.push(object);
      }
      types.appendChild(scrolldiv);
      scrolldiv.className="outer";
      content.appendChild(types); 
    }) 

  }
function performSearch(){
    document.getElementById("pre-search-div").className="hide";
    var resultCont = document.getElementById("post-search-div");
    resultCont.className="show search-result";
    var child = resultCont.lastElementChild;  
    while (child) { 
      resultCont.removeChild(child); 
      child = resultCont.lastElementChild; 
    } 
    var ul = document.createElement("ul");
    ul.className="list-group";
    var searched=false;
    var searchValue = document.getElementById("search-input").value;
    for(var i=0;i<songsArray.length;i++){
      if(searchValue===songsArray[i].songName){
       var songItem =createSongItem(songsArray[i]);
       ul.appendChild(songItem);
       searched=true;
      }else if ((songsArray[i].songName.substr(0, searchValue.length).toUpperCase() == searchValue.toUpperCase())&&(!searched)) {
        var songItem =createSongItem(songsArray[i]);
        ul.appendChild(songItem);
        searched=true;
      }else if(!searched){
        var SongPromise = doAjax(searchValue);
        SongPromise.then(data=>{
          var SongObject=data;
          for(let x=0;x<SongObject.length;x++){
            var object={
              "id":parseInt(songCount)+1,
              "songName":SongObject[x].trackCensoredName,
              "songImage":SongObject[x].artworkUrl100,
              "singers":SongObject[x].artistName,
              "songUrl":SongObject[x].previewUrl
            }
            songCount++;
            songsArray.push(object);
            var songItem =createSongItem(object);
            ul.appendChild(songItem);
          }
        });
        searched=true;
      }
    }
    if(searched)
      resultCont.appendChild(ul);
    else{
      var img=document.createElement("img");
      // img.setAttribute("src","https://lh3.googleusercontent.com/proxy/UCvEW_07RSfVFh5-vTySW45O7DANcOAWRwRz-uJ-AlFCTRHo5-nZ83mDQj2O-rLWCANYdcYFlqgtml-FdvFvhPtk1M0G7ZMKoyKwiVGcQtyRggK9nwTZrOAbddyzZtEVtJ7STLQvWQIdGlvai7EarA");
      img.setAttribute("src","https://emine.ht2techinfo.cd/mines/img/404.gif");
      // img.setAttribute("src","https://i.gifer.com/Yg6Q.gif");
      img.className="not-found";
      resultCont.appendChild(img);
      
    }  

}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  var cont  = document.getElementById("autocomplete-options-cont");
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("div");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      cont.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].songName.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].songName.substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].songName.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].songName + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}



//songList
audio = document.getElementById("audio");
span = document.getElementById("songCovered");
slider = document.getElementById("slider");
slider.addEventListener("change",seekSong);
document.getElementById("save").addEventListener("click",savePlayList);
value=document.getElementById("play-pause");
songImageplaying = document.getElementById("songImageplaying");
songNameplaying=document.getElementById("songNameplaying");
forward = document.getElementById("forward");
singers = document.getElementById("singerName");
forward.addEventListener("click",nextSong);
backward = document.getElementById("backward");
backward.addEventListener("click",prevSong);
value.className="fas fa-play fa-3x borderplaypause";
value.addEventListener("click",startSong);
search=document.getElementById("do-search-btn");
search.addEventListener("click",performSearch);
addToPlayListBtn = document.getElementById("addtoplay");
addToPlayListBtn.addEventListener("click",addToPlayList2);
currentSongId = document.getElementById("SongPlayingId");
loadplayList();
});

function openTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function savePlayList(){
  if(window.localStorage){
      var json = JSON.stringify(obj.songsList);
      localStorage.setItem('playList',json);
  }
  else{
      alert("Update your Browser");
  }
}
function loadplayList(){
  if(localStorage.playList){
      var data = localStorage.getItem('playList');
      obj.songsList = JSON.parse(data);
      obj.songsList.forEach(function(obj){
        var obj={
          "songid":parseInt(obj.id),
          "songname":obj.name
        };
        addedSongs.push(obj);
        })
      printSongs();
  }
  else{
     // console.log("Songs not found");
  }
}
function movename(name){
  if(name.length>=32){
    return 1 ;
  }else {
    return 0;
  }
}
function moveNameOverlay(name){
  if(name.length>=20)
    return 1;
  else
    return 0;  
}
function containsObject(obj){
  return addedSongs.some( song =>  song.songid === obj.songid && song.songname === obj.songname);
}
function playSong(){
  var songName = event.srcElement.innerHTML;
  var songId = parseInt(event.srcElement.parentElement.childNodes[1].innerText);
  var isplay = document.createElement("img");
  isplay.className="gif";
  isplay.src="assets/images/3.gif";
  var songUrl;
  for(var i=0;i<songsArray.length;i++){
      if(songsArray[i].songName == songName && songsArray[i].id===songId){
          // id=i;
          currentSongId.innerText=songsArray[i].id;
          songUrl = songsArray[i].songUrl;
          songImageplaying.src = songsArray[i].songImage;
          songImageplaying.className='cover cover2';
          if(movename(songsArray[i].songName)){
            songNameplaying.innerHTML=`<marquee behaviour="scroll" direction="left" loop="infinite">`+songsArray[i].songName+"</marquee>";
          }else{
            songNameplaying.innerText=songsArray[i].songName;
          }
          if(movename(songsArray[i].singers)){
            singers.innerHTML=`<marquee behaviour="scroll" direction="left" loop="infinite">`+songsArray[i].singers+"</marquee>";
          }else{
            singers.innerText=songsArray[i].singers;
          }
          value.className="fas fa-pause fa-3x borderplaypause";
          flag=0;
      }
  }
  var obj ={
    "songid":parseInt(currentSongId.innerText),
    "songname":songName
  }
  if(containsObject(obj)){
    document.querySelector("#addtoplay").className="fas fa-plus fa-3x selected";
  }else{
    document.querySelector("#addtoplay").className="fas fa-plus fa-3x";
  }
  audio.src = songUrl;
  audio.play();
  setInterval(function(){
      slider.value = audio.currentTime;
      span.style.width = ((slider.value) / 1.9)+'%';
  },500);
  setTimeout(function(){
      var duration = audio.duration;
      slider.max = duration;
  },500);
  
}
function playSong2(){
  var songName = event.srcElement.nextSibling.nextSibling.innerText;
  var songId = parseInt(event.srcElement.nextSibling.innerText);
  var isplay = document.createElement("img");
  isplay.className="gif";
  isplay.src="assets/images/3.gif";
  var songUrl;
  for(var i=0;i<songsArray.length;i++){
      if(songsArray[i].songName == songName && songsArray[i].id===songId){
          id=i;
          currentSongId.innerText=songsArray[i].id;
          songUrl = songsArray[i].songUrl;
          songImageplaying.src = songsArray[i].songImage;
          songImageplaying.className='cover cover2';
          if(movename(songsArray[i].songName)){
            songNameplaying.innerHTML=`<marquee behaviour="scroll" direction="left" loop="infinite">`+songsArray[i].songName+"</marquee>";
          }else{
            songNameplaying.innerText=songsArray[i].songName;
          }
          if(movename(songsArray[i].singers)){
            singers.innerHTML=`<marquee behaviour="scroll" direction="left" loop="infinite">`+songsArray[i].singers+"</marquee>";
          }else{
            singers.innerText=songsArray[i].singers;
          }
          value.className="fas fa-pause fa-3x borderplaypause";
          flag=0;
      }
  }
  var obj ={
    "songid":parseInt(currentSongId.innerText),
    "songname":songName
  }
  if(containsObject(obj)){
    document.querySelector("#addtoplay").className="fas fa-plus fa-3x selected";
  }else{
    document.querySelector("#addtoplay").className="fas fa-plus fa-3x";
  }
  audio.src = songUrl;
  audio.play();
  setInterval(function(){
      slider.value = audio.currentTime;
      span.style.width = ((slider.value) / 1.9)+'%';
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
  value.removeClass="fas fa-play fa-3x ";
  value.className="fas fa-pause fa-3x borderplaypause";
}
  else{
      audio.pause();
      flag=1;
      value.removeClass="fas fa-pause fa-3x ";
      value.className="fas fa-play fa-3x borderplaypause";
  }
  
} 
function nextSong(){
  var j;
 j=id+1;
  if(j==songsArray.length){
    id=0;
    j=0;
  }
   var songUrl = songsArray[j].songUrl;
   currentSongId.innerText=songsArray[j].id;
   songImageplaying.src = songsArray[j].songImage;
   songImageplaying.className="cover cover2";
   if(movename(songsArray[j].songName)){
      songNameplaying.innerHTML=`<marquee behaviour="scroll" direction="left" loop="infinite">`+songsArray[j].songName+"</marquee>";
   }else{
      songNameplaying.innerText=songsArray[j].songName;
   }
   if(movename(songsArray[j].singers)){
    singers.innerHTML=`<marquee behaviour="scroll" direction="left" loop="infinite">`+songsArray[j].singers+"</marquee>";
   }else{
     singers.innerText=songsArray[j].singers;
   }

  audio.src = songUrl;
  audio.play();
  setInterval(function(){
      slider.value = audio.currentTime;
      span.style.width = ((slider.value) / 1.9)+'%';
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
  if(id==0){
    return;
  }
   var songUrl = songsArray[j].songUrl;
   currentSongId.innerText=songsArray[j].id;
   songImageplaying.src = songsArray[j].songImage;
   songImageplaying.className='cover cover2';
   if(movename(songsArray[j].songName)){
     songNameplaying.innerHTML=`<marquee behaviour="scroll" direction="left" loop="infinite">`+songsArray[j].songName+"</marquee>";
   }else{
      songNameplaying.innerText=songsArray[j].songName;
   }
   if(movename(songsArray[j].singers)){
    singers.innerHTML=`<marquee behaviour="scroll" direction="left"loop="infinite">`+songsArray[j].singers+"</marquee>";
   }else{
     singers.innerText=songsArray[j].singers;
   }
      
  audio.src = songUrl;
  audio.play();
  setInterval(function(){
      slider.value = audio.currentTime;
      span.style.width = ((slider.value) / 1.9)+'%';
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
var songToAddID = event.srcElement.parentElement.childNodes[1].innerHTML;
var songToAddName = event.srcElement.parentElement.childNodes[0].innerText;
var selectedButton =event.srcElement;
selectedButton.classList.add("selected");
var object={
  "songid":parseInt(songToAddID),
  "songname": songToAddName,
}
songsArray.forEach(function(currentSong){
    if(currentSong.id==songToAddID && !containsObject(object)){
        obj.addSong(currentSong.id,currentSong.songName,currentSong.songUrl,currentSong.songImage,currentSong.singers);
        addedSongs.push(object);
    }
});
printSongs();
}
function addToPlayList2(){
  var songToAddId = document.getElementById("SongPlayingId").innerHTML;
  var songToAddName = document.getElementById("songNameplaying").innerHTML;
  var selectedButton =event.srcElement;
  selectedButton.classList.add("selected");
  var object={
    "songid":parseInt(songToAddId),
    "songname": songToAddName,
  }
  songsArray.forEach(function(currentSong){
      if(currentSong.id==songToAddId && !containsObject(object)){
        obj.addSong(currentSong.id,currentSong.songName,currentSong.songUrl,currentSong.songImage,currentSong.singers);
        addedSongs.push(object); 
      }
  });
printSongs();
}
function deleteToPlaylist(){
  var songId = parseInt(event.srcElement.parentElement.childNodes[1].innerText);
  var songName = event.srcElement.parentElement.childNodes[0].innerText;
  if(parseInt(currentSongId.innerText)===songId){
    document.querySelector("#addtoplay").className="fas fa-plus fa-3x";
  }
  addedSongs = addedSongs.filter((song) => song.songid !== songId&&song.songname!==songName);
  obj.deleteSong(songId);
  printSongs();
}
function printSongs(){
  var resultCont= document.getElementById("playListResult");
  var notFoundImg = document.querySelector("#not-found-playList");
  var ul = document.querySelector("#playList");
  if(obj.songsList.length===0){
    resultCont.className="search-result";
    notFoundImg.className="show not-found2";
    ul.className="hide";
  }else{
    notFoundImg.className="hide";
    ul.className="show";
    ul.innerHTML = "";
    obj.songsList.forEach(function(obj){
      var object={
        "songid":obj.id,
        "songname":obj.name
      }
      if(!obj.delete && containsObject(object))
      {
        var songData={
          "id":obj.id,
          "songName":obj.name,
          "songImage":obj.image,
          "singers":obj.singers,
          "songUrl":obj.url
          
        }
        var songItem = createPlaylistItem(songData);
        ul.appendChild(songItem);
      }  
    })
  }
}
function createSongItem(songData){
  var li = document.createElement("li");
  var songText = document.createElement("span");
  var songId = document.createElement("span");
  var coverImg = document.createElement("img");
  var playListBtn = document.createElement("button");
  playListBtn.className = "fas fa-plus fa-1x playlistbtn";
  var obj={
    "songid":parseInt(songData.id),
    "songname":songData.songName
  }
  if(containsObject(obj)){
    playListBtn.className = "fas fa-plus fa-1x playlistbtn popup selected";
  }else{
    playListBtn.className = "fas fa-plus fa-1x playlistbtn popup";
   }
  songId.className="hide";
  songId.innerHTML=songData.id;
  playListBtn.addEventListener("click",addToPlayList);
  coverImg.className='cover';
  coverImg.setAttribute('src',songData.songImage);
  songText.innerHTML=songData.songName;
  songText.addEventListener("click",playSong);
  li.appendChild(songText);
  li.appendChild(songId);   
  li.appendChild(coverImg);
  li.appendChild(playListBtn);
  return li;
}
function createPlaylistItem(songData){
  var li = document.createElement("li");
  var songText = document.createElement("span");
  var songId = document.createElement("span");
  var coverImg = document.createElement("img");
  var playListBtn = document.createElement("button");
  playListBtn.className = 'fas fa-times fa-1x playlistbtn popup';
  var obj={
    "songid":parseInt(songData.id),
    "songname":songData.songName
  }
  songId.className="hide";
  songId.innerHTML=songData.id;
  playListBtn.addEventListener("click",deleteToPlaylist);
  coverImg.className='cover';
  coverImg.setAttribute('src',songData.songImage);
  songText.innerHTML=songData.songName;
  songText.addEventListener("click",playSong);
  li.appendChild(songText);
  li.appendChild(songId);   
  li.appendChild(coverImg);
  li.appendChild(playListBtn);
  return li;
}
function openNav(){
  document.getElementById("allsongs").style.height="50%";
}
function closeNav(){
  document.getElementById("allsongs").style.height="0%";
}
