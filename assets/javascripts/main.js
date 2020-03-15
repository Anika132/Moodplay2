// Basically a song object is here which contains all the main properties needed to find a unique song and we have a songList which contains all the song which user have selected to be stored in the playlist


function Song(id,name,url,image,singers){
    this.id=id;
    this.name=name;
    this.url=url;
    this.image=image;
    this.singers = singers;
    this.delete = false;
}

var obj = {
    songsList:[],
    addSong : function(id,name,url,image,singers){
        var song = new Song(id,name,url,image,singers);
        this.songsList.push(song);
        console.log("SOng LIST IS ",this.songsList);
    },
    deleteSong : function(songId){
    var toDelete = this.songsList.filter(function(obj){
        return obj.id == songId;
    })
    toDelete[0].delete = true;
    this.songsList = this.songsList.filter(function(obj){
        return obj.delete == false; 
    })
    console.log("Updated List",this.songsList);
    }
}