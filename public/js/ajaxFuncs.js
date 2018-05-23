// Remove a shop from the preferred shops page
$(function () {
    $(".delete").click(function() {
        // var buttonsContainer = $(this).parent();
        // var boxContainer = buttonsContainer.parent();
        var boxContainer = $(this).closest('.box');
        var id = $(this).attr("id");
        //console.log('id of the shops ajax => ', id);

        $.ajax({
            type: "POST",
            url: "/removeShop/" + id,
            success: function (data) {
                console.log('Success! Message: ', data.message);
                // console.log(commentContainer);
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
    $(".like").click(function() {
        // var buttonsContainer = $(this).parent();
        // var boxContainer = buttonsContainer.parent();
        // select the closest 'box' to the current element
        var boxContainer = $(this).closest('.box');
        var id = $(this).attr("id");

        $.ajax({
            url: '/like/' + id,
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
        $('.container').append("<div id='loader' style='display: none;'>Loading...</div>"); // loading text 
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
            //console.log('done function data => ', data.shops[0].picture);
            
            // insert the sorted data received from the server
            $.each(data.shops, function(index, value) {
                //console.log(index + ' : ' + value.name);
                var box = $('<div></div>').addClass('box');
                var h3 = $('<h3></h3>').attr('id', value.name).html(value.name);
                var imageContainer = $('<div></div>').addClass('image-container');
                var image = $('<img>').attr('src', value.picture);
                var buttons = $('<div></div>').addClass('buttons');
                var dislikeButton = $('<button type="button" style="float:left"></button>').addClass('dislike btn btn-danger').html('<i class="fa fa-thumbs-o-down"></i>dislike');
                var likeButton = $('<button type="button" style="float:right"></button>').addClass('like btn btn-success').html('<i class="fa fa-thumbs-o-up"></i>like');
                likeButton.attr('id', value._id);
                //console.log('box => ', box);
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