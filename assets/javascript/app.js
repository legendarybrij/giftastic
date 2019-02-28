

var animals = ["lion","panda"];
var random = [];

$(document).ready(function(){

    function animate() {
         console.log("you are here")
        var state= $(".gif").attr("data-state");
          
              if (state === "still"){
                $(this).attr("src", "animate").attr("src", $(this).attr("data-animate"));
                $(".gif").attr("data-state","animate");
              } else {
                $(this).attr("data-state", "still").attr("src", $(this).attr("data-still"));
                $(".gif").attr("data-state","still");
                console.log($(".gif").attr("data-state"));
              }
              
      }

    function displayGif() {
        $("#gifs-appear-here").empty();
        //console.log("hello");
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+
        animal + "&api_key=7Mj3wQGHtOX85mskRa8PJKeGrMyVqwtR&limit=100";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            console.log(response);
            for (var i=0; i<10; i++)
            {
               random[i] = Math.floor(Math.random()*100);
            }
           
            //console.log(random);
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
        });
    }



// This function handles events where the add animal button is clicked
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



$(document).on("click", "button", displayGif);
$(document).on("click", ".gif", animate);
  renderButtons();



});



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

  
 


  