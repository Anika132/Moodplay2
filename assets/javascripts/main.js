function Song(id,name,url,image){
    this.id=id;
    this.name=name;
    this.url=url;
    this.image=image;
    this.delete = false;
}

var obj = {
    songsList:[],
    addSong : function(id,name,url,image){
        var song = new Song(id,name,url,image);
        this.songsList.push(song);
        console.log(this.songsList);
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