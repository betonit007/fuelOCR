$(function() {

        var editId;
    
        $(".file-field :input").change(function(e) {

    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

        var file = e.originalEvent.srcElement.files[i];
        console.log(file);

        var img = document.createElement("img");
        var reader = new FileReader();
        reader.onloadend = function() {
             img.src = reader.result;
             
        }
        reader.readAsDataURL(file);

        $("#picField").append(img);

        $("#subButton").css("visibility", "visible");
        $("input").css("visibility", "hidden");

        
        }
    });

    $("#add-btn").on('click', function(event) {
        event.preventDefault();

        var newReading = {
            place: $("#place").val().trim(),
            address: $("#address").val().trim(),
            gallons: $("#gallons").val().trim(),
            total: $("#total").val().trim(),
            perGallon: $("#perGallon").val().trim()
        };


        $("#place").val("");
        $("#address").val("");
        $("#gallons").val("");
        $("#total").val("");
        $("#perGallon").val("");

        $.post("/api/readings", newReading).then(function(result) {
    
            console.log(result);
            location.reload();
          });
          
    });

    $(".delete").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr("id");
        
        $.ajax({
            method: "DELETE",
            url: "/api/delete/" + id
          })
            .then(function(result) {
             console.log("ID: " + result + " deleted"); 
             location.reload();
            });
    });

    $(".edit").on("click", function(event) {
       event.preventDefault();
       editId = $(this).attr("data-edit");
       $.get("/api/find/" + editId).then(function(result) {
           console.log(result);

           $("#edit-btn").css("visibility", "visible");
           $("#add-btn").css("visibility", "hidden");
           
           $("#place").val(result.place);
           $("#address").val(result.address);
           $("#gallons").val(result.gallons);
           $("#total").val(result.price);
           $("#perGallon").val(result.perGallon);
       });
    });

    $("#edit-btn").on("click", function(event) {
        event.preventDefault();

        var editReading = {
            place: $("#place").val().trim(),
            address: $("#address").val().trim(),
            gallons: $("#gallons").val().trim(),
            total: $("#total").val().trim(),
            perGallon: $("#perGallon").val().trim()
        };


        $("#place").val("");
        $("#address").val("");
        $("#gallons").val("");
        $("#total").val("");
        $("#perGallon").val("");
        $.ajax({
            method: "PUT",
            url: "/api/update/" + editId,
            data: editReading
          }).then(function(result) {
              console.log(result);
              location.reload();
          })
        
    });
});