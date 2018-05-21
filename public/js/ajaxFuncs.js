// Remove a shop from the preferred shops page
$(function () {
    $(".delete").click(function () {
        var commentContainer = $(this).parent();
        var id = $(this).attr("id");
        var string = 'id=' + id;
        console.log('id of the shops ajax => ', id);
        $.ajax({
            type: "POST",
            url: "/removeShop/" + id,
            success: function (data) {
                console.log('Success! Message: ', data.message);
                // console.log(commentContainer);
                commentContainer.remove();
            }
        });
    });
});

// Remove a shop from the main page if it is liked by the user


