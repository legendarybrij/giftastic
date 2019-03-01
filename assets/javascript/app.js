

var animals = ["lion","panda", "sheep", "peacock", "dolphin", "eagle", "pony", "ape", "cow", "deer", "duck", "wolf", "turkey", "tiger", "snake", "bird", "bear", "fish", "chicken", "cat", "horse", "dog"];
var random = [];  
var nextTen = 100; //This variable is used to pull gifs after first 100 gifs
var results;  //This variable saves 1000 response request from Giphy

$(document).ready(function(){
    $(".more").hide();
//This function animates and pauses the .gif image on click
    function animate() {
         
        var state= $(".gif").attr("data-state");
          
              if (state === "still"){
                $(this).attr("src", "animate").attr("src", $(this).attr("data-animate"));
                $(".gif").attr("data-state","animate");
              } else {
                $(this).attr("data-state", "still").attr("src", $(this).attr("data-still"));
                $(".gif").attr("data-state","still");
                
              }
              
      }

//This function displays initial gifs when clicked on any animal
    function displayGif() {

        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+
        animal + "&api_key=7Mj3wQGHtOX85mskRa8PJKeGrMyVqwtR&limit=1000";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            results = response.data;
           // This for loop creates 10 random numbers and saves into random array from 100 numbers 
           // so when user click on the same animal button it generates different gifs instead of same 10
            for (var i=0; i<10; i++)
            {
               random[i] = Math.floor(Math.random()*100);
            }
             
            $("#gifs-appear-here").empty();
            
            for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div>");

            var rating = results[random[i]].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[random[i]].images.fixed_height_still.url);
            animalImage.attr("data-still", results[random[i]].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[random[i]].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.addClass("gif");

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);
            
           
            $("#gifs-appear-here").append(gifDiv);
            }
            $(".more").show();

            

        });
        
    }



// This function adds new animal into buttons div
$("#add-animal").on("click", function() {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();


    if ($("#animal-input").val().trim()==="")
    {
        window.alert("Please write name of animal")
    }else{
    var animal = $("#animal-input").val().trim();
    
    animals.push(animal);
    

    animalBut = $("<button>");
    animalBut.addClass("btn btn-success animal");
    animalBut.attr("data-animal",animal);
    
    animalBut.text(animal);
   
    $("#buttons").append(animalBut);

    renderButtons();
    }

  });

//This function loops next 10 gifs after first 100 gifs
  function nextTenLoop() {
    
    for (var i = nextTen; i < nextTen+10; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        animalImage.addClass("gif");

        gifDiv.prepend(p);
        gifDiv.prepend(animalImage);
        
       
        $("#gifs-appear-here").append(gifDiv);
        }
       
       $(".more").show();
        nextTen+=10;

}



$(document).on("click", ".more", nextTenLoop);
$(document).on("click", ".animal", displayGif);
$(document).on("click", ".gif", animate);
  renderButtons();



});


//This function renders buttons for the array of animals given on top of this page
function renderButtons() {

      $("#buttons").empty();
    
    for(var i=0; i<animals.length; i++) {
    animalBut = $("<button>");
    animalBut.addClass("btn btn-success animal");
    animalBut.attr("data-animal",animals[i]);
    animalBut.val(animals[i]);
    
    animalBut.text(animals[i]);
    
    $("#buttons").append(animalBut);
  }
  }

 
 


  