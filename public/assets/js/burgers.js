$(function() {
    $(".change-devoured").on("click", function(event) {
        var burgerId= $(this).data("id");

        var eatenBurger = {
            devoured: "1"
        }
        //send the put request

        $.ajax("/api/burgers/" + burgerId, {
            type: "PUT", 
            data: eatenBurger
        }).then(
            function() {
                console.log("Status changed devoured to", newDevoured);
                //reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {

        event.preventDefault();

        var newBurger = {
            burger_name: $("#ca").val().trim(),
        };

        //send the POST request

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("Created new burger");
                //reload the page to get the update list
                location.reload();
                $("#ca").val("");
            }
        );
    });
});