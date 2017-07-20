$("document").ready(function() {
  
  var $root = $('html, body');
  $('a').on('mouseup',function() {
      $root.animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 1000);
      return false;
  });    
  
  
  //This removes the current quote.
  $("#getQuoteTwit").on("click", function() {
    $('p.content')
      .html("")
      .removeClass("newFirstClass", 800);

    $('p.author')
      .removeClass("newSecondClass", 800)
      .html("");
  });

  var post;
   
  //This is the "GET A TWEETABLE QUOTE!" button.
  $('#getQuoteTwit').on('click', function(e) {

    e.preventDefault();
   
    $.ajax({

      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
    
        //The data is an array of posts. Here we Grab the first one.
        post = data.pop();
        var $content = post.content;
        var $author = post.title;
        // Here is where the quote appears with some magic.
        $('p.content')
          .html('<q>' + $content + '</q>');

        $('p.author').html("- " + $author);

        //Adds 2 classes that are going to do a animation on the paragraphs.
        $('p.content').addClass("newFirstClass", 1000);
        $('p.author').addClass("newSecondClass", 1000);
        
        // The backgroundCollor effect uses this array of colors.
        var colorArr = [
          "205430",
          "428C82",
          "022617",
          "323614",
          "063D35"
        ];

        //Here we use Math's floor and random methods to find a random number between the "colorArr" length.
        var color = Math.floor(Math.random() * colorArr.length);
        var colorToBody = colorArr[color];
        $('div#main-container').animate({
          backgroundColor: "#" + colorArr[color]
        }, 1000);
        $("body").animate({
          backgroundColor: "#" + colorArr[color]
        }, 1000);
        
        //Catches the text inside the p elements containing data from quote server.
        var newContent = $("p.content");
        var newAutor = $("p.author");

        $('a#twitter').on("click", function(evt) {
          $(this).attr('href', "https://twitter.com/intent/tweet?text=" + newContent.text() + " " + newAutor.text());
        });
            
      },
      error : function (){
        alert("Sorry, there is a problem in the API's server. Try again in few seconds");
      },

      //Used to clean the storage info about the post.
      cache: false
      
    });
    
  });
  
});