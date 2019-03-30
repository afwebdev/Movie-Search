/// <reference path="./typings/index.d.ts" />

API_KEY = '6d59ec8';

$(document).ready(function () {

  function getMovies(title) {
    $.get("https://www.omdbapi.com/?type=movie&s=" + title + "&apikey=" + API_KEY, function (data) {
      console.log("Search Results: \n");
      $('#info').html('');
      //results of API call. Complete data here. Send data
      //to other function(s) to complete work
      makeThumb(data);
    });
  }

  //Get FULL movie info based on title from search results.
  //this will get called when a user clicks a title after search.
  function getFullInfo(id) {
    $.get("https://www.omdbapi.com/?type=movie&t=" + id + "&apikey=" + API_KEY, function (fullInfo) {
      console.log(fullInfo);
      //SEND fullinfo over to makeInfo so we can use our data
      //to fill our page content.
      makeInfo(fullInfo);
    });
  }

  function makeInfo(movie) {
    var title = movie.Title;
    var actors = movie.Actors;
    var genre = movie.Genre;
    var plot = movie.Plot;
    var metascore = movie.Metascore;
    var production = movie.Production;
    var director = movie.Director;
    var release = movie.Released;
    var boxoffice = movie.BoxOffice;
    var award = movie.Awards;
    var poster = movie.Poster;
    var rating = movie.Rated;


    $('.movie').show();

    //place title
    $('.movieTitle').html(title);
    //place poster
    $('.moviePoster').html('<img src=' + poster + 'alt="poster"></img>');
    //PLACE REMAINDER OF INFO.
    $('#summary').text(plot);
    $('.rating').text(`Rated: ${rating}`);
    $('.release').text(`Released: ${release}`);
    $('.director').text(`Directed by: ${director} `);
    $('.award').text(`Awards: ${award}`);
    $('.production').text(`Production: ${production}`);
  }

  function makeThumb(data) {

    var shortMovieInfo = data.Search; //Total Search results. stored in var shortMovieInfo
    var movieInfo = data.Search[0]; // first search result, stored in var movieInfo
    console.log(data.Search.length); //Display # of result in console

    for (i = 0; i < shortMovieInfo.length; i++) {
      var shortMovie = shortMovieInfo[i]; // parse over each result inside of search. each 'result' is an  movie array
      var title = shortMovie.Title;
      var poster = shortMovie.Poster;
      if (poster === "N/A") { //If Poster is N/A the movie is probably irrelvant and not useful to display.
        console.log("Removed: " + title + ": " + poster);
      } else {
        $('#movieList').append('<li class="movieThumb"><div class="imgcontainer"><img class="image" src=' + poster + 'alt="poster"><div class="overlay"><div class="text">' + title + '</div></div></div></li>');
      }
    }
  }
  // Grab movie title from text-field id "search-term"
  $('#search-form').on('submit', function (e) {
    e.preventDefault();
    var movieTitle = $('#search-term').val();
    console.log("User searched: " + movieTitle);
    getMovies(movieTitle);
    $("#movieList li").remove();
    $('.movie').hide();
    $('#search-term').val('');

  });



  $(document).on('click', '.overlay', function (e) {
    var sendTitle = $(this).text();
    $("#movieList li").fadeOut(1000);
    $('.movie').fadeIn(3500);
    $('.wrapper').css("height", "100%");
    console.log(sendTitle);
    getFullInfo(sendTitle);
  });








});