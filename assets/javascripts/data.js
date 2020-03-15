// Js for getting data from the API basically pass the category(paarameter) for which you want to get the songs

function doAjax(parameter){
    var pr = new Promise((resolve,reject)=>{
        const url =`https://itunes.apple.com/search?term=${parameter}&media=music`;
        fetch(url).then(response=>response.json().then(json=>{
           resolve(json.results); 
        })).catch(err=>console.log(err));
    });
    return pr;
}    

    
