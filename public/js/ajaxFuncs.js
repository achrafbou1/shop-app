$(function() {
    // select all boxes (shops) that have the dislike id
    $(".getShops").click(function() {
        var boxes = $('#disliked').closest('.box');
        console.log('test clicking on link');
        $.ajax({
            type: 'POST',  // post request to the backend to display the shops
            url: '/shops',
            data: boxes,
            success: function (data) {
                console.log('Message => ', data.message);
            },
            error: function () {
                console.log('Failure to send disliked shops');
            }
        });
    });
});

// Remove a shop from the preferred shops page
$(function () {
    $(".delete").click(function() {
        var boxContainer = $(this).closest('.box');
        var id = $(this).attr("id");

        $.ajax({
            type: "POST",
            url: "/removeShop/" + id,
            success: function (data) {
                console.log('Success! Message: ', data.message);
                boxContainer.remove();
            },
            error: function() {
                console.log('Failure to execute "delete" post request');
            }
        });
    });
});

// Remove a shop from the main page if it is liked by the user
$(function() {
    $(".container").on("click", ".like", function() {
        var boxContainer = $(this).closest('.box');
        var id = $(this).attr("id");

        $.ajax({
            url: '/like/' + id, // sendin the id of the shop to the backend server
            type: 'POST',
            success: function(data) {
                console.log('Success! Message: ', data.message);
                boxContainer.remove();
            },
            error: function() {
                console.log('Failure to execute "Like" post request.');
            }
        });
    });
});

// Sort shops by distance
$(function() {
    $('.sort').click(function() {
        $('.container').html(''); // remove all the shops from the page
        $('.container').append("<div id='loader' style='display: none;'><h1>Loading...</h1></div>"); // loading text 
        $.ajax({
            url: '/sortShops',
            type: 'GET',
            success: function(data) {
                console.log('Success! Message: ', data.message);
            },
            failure: function() {
                console.log('Failure to execute "Sort Shops" get request');
            },
            beforeSend: function() {
                console.log('Before sending ajax request');
                $('#loader').show();
            },
            complete: function() {
                console.log('Ajax request completed');
                $('#loader').hide();
            }
        }).done(function(data) {
            
            // insert the sorted data received from the server
            $.each(data.shops, function(index, value) {
                // construct a box element (same format as in shops.ejs)
                var box = $('<div></div>').addClass('box');
                var h3 = $('<h3></h3>').attr('id', value.name).html(value.name);
                var imageContainer = $('<div></div>').addClass('image-container');
                var image = $('<img>').attr('src', value.picture);
                var buttons = $('<div></div>').addClass('buttons');
                var dislikeButton = $('<button type="button" style="float:left" id="dislikeBtn"></button>').addClass('dislike btn btn-danger').html('<i class="fa fa-thumbs-o-down"></i>Dislike');
                var likeButton = $('<button type="button" style="float:right"></button>').addClass('like btn btn-success').html('<i class="fa fa-thumbs-o-up"></i>Like');
                likeButton.attr('id', value._id);
                
                $('.container').append(box);
                $('.container div.box:last').append(h3);
                $('.container div.box:last').append(imageContainer);
                $('div.box:last .image-container').append(image);
                $('.container div.box:last').append(buttons);
                $('div.box:last .buttons').append(dislikeButton);
                $('div.box:last .buttons').append(likeButton);
            });
        });;
    });
});