//variables
const listaTweets = document.getElementById('lista-tweets');


//event listeners
eventListeners();

function eventListeners(){
    //Cuando se envia el formulario 
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)


}




//funciones

function agregarTweet(e){
    e.preventDefault();
    //Leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    if (tweet != ''){
        //crear boton para borrar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        
        //Crear un valor y agregarle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        li.appendChild(botonBorrar);
        listaTweets.appendChild(li);

        //Agregar el tweet a local storage
        agregarTweetLocalStorage(tweet);
    }
}
//elimina el tweet del DOM
function borrarTweet(e){
    e.preventDefault;
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();

        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }


}
//agrega el tweet a local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //agregar el nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo para el local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;

    //revisamos lo que haya en local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];

    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));

    }
    return tweets;
}

//Mostrar los datos del local storage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

 

    tweets.forEach(function(tweet){
        //crear boton para borrar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        
        //Crear un valor y agregarle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        li.appendChild(botonBorrar);
        listaTweets.appendChild(li);
    })


}

//Eliminar tweet del local Storage
function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    // Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
         if(tweetBorrar === tweet) {
              tweets.splice(index, 1);
         }
    }) ;

    localStorage.setItem('tweets', JSON.stringify(tweets) );
}