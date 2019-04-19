// Office Hours: linking css and js to html
// some validatoins

var Friend = function (name, photo, scores) {
    //constructor to create object of friend
    this.name = name;
    this.photo = photo;
    this.scores = scores;
}

var friendFinder = {
    surveyLength: 10,

    bestMatch: function (userScores, friendScores) {
        // function that will take userScores submitted from form as an array and the friendScores as an array of arrays 
        // Function will find the index of the best Match, aka lowest sum of absolute value of difference of each score

        var bestMatchIndex = -1; // the best match index that will eventually be returned
        var bestMatchSum = 100;  // the current lowest sum found initially set at 100 arbitrarily as no sum should exceed 40.

        for (var friendsNum = 0; friendsNum < friendScores.length; friendsNum++) {
            var sum = 0;
            for (var i = 0; i < userScores.length; i++) {
                sum += Math.abs(parseInt(userScores[i]) - parseInt(friendScores[friendsNum][i]));
            }
            if (sum < bestMatchSum) {
                bestMatchSum = sum;
                bestMatchIndex = friendsNum;
            }
        }

        return bestMatchIndex;
    },



    displayFriend: function (displayid, friendArr, index) {
        //function that will take the id of the html element which want to append to, the friendArr json and the index of the bestmatch friend
        //Will display the related json data: name+photo onto the html element

        $(displayid).empty();
        var newDiv = $("<div>");
        var nameTag = $("<h3>").text(friendArr[index].name);
        var photoTag = $("<img>").attr("src", friendArr[index].photo);
        photoTag.attr("alt", "friend" + index + "photo");
        newDiv.append(nameTag, photoTag);

        $(displayid).append(newDiv)

    },

    postInfo: function (path, friendData) {
        //takes path of post req listener and data to pass into post request
        $.post(path, friendData)
            .then(function (data) { 
                console.log(data);
            });
    }


}

validation = function () {
    // validation for survey
    var valid = true;

    if ($("#name").val() === "") {
        $("#nameValidation").show();
        valid = false;
    }
    if ($("#photo").val() === "") {
        $("#photoValidation").show()
        valid = false;
    }

    for (var i = 1; i <= friendFinder.surveyLength; i++) {
        if (isNaN($("#question" + i).val())) {
            $("#question" + i + "Validation").show();
            valid = false;
        }
    }

    return valid;
};



$("#modalTrigger").on("click", function (event) {
    event.preventDefault()
});

$("#surveySubmit").on("click", function (event) {
    event.preventDefault();
    //initially hide all validation
    $(".surveyValidation").hide();
    if (!validation()) {    //validation will also trigger html elements indicating invalid inputs
        //if invalid input then also show an error under submit button
        $("#submitValidation").show();
    } else {
        //Validation true, grabs survey data
        name = $("#name").val().trim();
        photo = $("#photo").val().trim();
        scores = [];
        for (var i = 1; i <= friendFinder.surveyLength; i++) {
            scores.push($("#question" + i).val())
        }
        // passes data into friend constructor
        var userJson = new Friend(name, photo, scores);


        $.get("/api/friends", function (data) {
            // get data from api to see all friends

            // get array of friend score to pass into bestMatch function
            var friendScores = [];
            for (var i = 0; i < data.length; i++) {
                var scores = [];
                for (var j = 0; j < friendFinder.surveyLength; j++) {
                    scores.push(data[i].scores[j]);
                }
                friendScores.push(scores)
            }

            // find the index of the best matched friend
            var bestMatchIndex = friendFinder.bestMatch(userJson.scores, friendScores);
            // update DOM
            friendFinder.displayFriend("#friendDisplay", data, bestMatchIndex);

            // push user information to api
            friendFinder.postInfo("/api/friends", userJson);

        });

        // trigger modal to popup
        $("#modalTrigger").click();

    };




})

