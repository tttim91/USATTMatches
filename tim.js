$(document).ready(function() {
    //Get JSON File from Heroku API Server
    $.get("http://tim-pingpong-stats.herokuapp.com/2015").done(function(data) {
        //Click on submit button and names will populate below
        $('#button').click(function () {
            printNames(data, 1);
        });
        $('#button2').click(function() {
            printNames(data, 2);
        });
        //Click on any name and it will print their matches
        $(document).on('click', '.name', function() {
            $('.subcontainer').empty();
            var selectedName = $(this).text();
            printMatchData(data, selectedName, 1);
            printSimilarMatches(data);
        });
        $(document).on('click', '.name2', function() {
            $('.subcontainer2').empty();
            var selectedName = $(this).text();
            printMatchData(data, selectedName, 2);
            printSimilarMatches(data);
        });

        $('.hamburgermenu').click(function() {

        });

    });

    //Populates the middle section of the website and shows the matches that the two players played against each other
    function printSimilarMatches(data) {
        var person1 = $('.subcontainer p:first-child').text();
        var person2 = $('.subcontainer2 p:first-child').text();
        var person1Score = 0, person2Score = 0;
        $('.midcontainer').empty();
        for(var i = 1; i< data.length; i++) {
            if(person1 == getName(i, data) && person2 == getNameOpponent(i, data)) {
                $('.midcontainer').append("<p>" + getHeadToHead(i,data) + "</p>");
                person1Score++;
            }
            else if (person1 == getNameOpponent(i, data) && person2 == getName(i, data)) {
                $('.midcontainer').append("<p>" + getHeadToHeadOpponent(i,data) + "</p>");
                person2Score++;
            }
        }
        $('.midcontainer').prepend("<p class='score'>" + person1Score + " - " + person2Score + "</p>");
    }

    //This function prints out the player you select as well as all their matches below with details
    function printMatchData(data, selection, number) {
        if(number == 1) {
            var subcontainer = $('.subcontainer');
        }
        else if (number == 2) {
            var subcontainer = $('.subcontainer2');
        }
        subcontainer.append("<p><strong>" + selection + "</strong></p>");
        for(var i=1; i<data.length; i++) {
            if(selection == getName(i, data)) {
                subcontainer.append("<p>" + getGameStats(i, data) + "</p>");
            }
            else if(selection == getNameOpponent(i, data)) {
                subcontainer.append("<p>" + getGameStatsOpponent(i, data) + "</p>");
            }
        }
    }

    //This function prints out the names of all people with names that equal the name in the search box only once
    function printNames(data, number) {
        var currentArray = [];
        var counter = 0;
        if(number == 1) {
            var nameBox = $('#nameBox').val().toLowerCase();
            var subcontainer = $('.subcontainer');
            var name = "name";
        }
        else if (number == 2) {
            var nameBox = $('#nameBox2').val().toLowerCase();
            var subcontainer = $('.subcontainer2');
            var name = "name2";
        }
        subcontainer.empty();
        for(var i=1; i<data.length; i++) {
            if(nameBox == data[i]["FirstName"].toLowerCase()) {
                counter++;
                if(counter==1) {
                    subcontainer.append("<p class="+name+">" + getName(i,data) + "</p>");
                    currentArray.push(getName(i, data));
                }
                var truth = false;
                for(var j =0; j<currentArray.length; j++) {
                    if(getName(i, data) == currentArray[j]){
                        truth = true;
                    }
                }
                if(truth == false) {
                    currentArray.push(getName(i, data));
                    subcontainer.append("<p class="+name+">" + getName(i,data) + "</p>");
                }
            }

            else if(nameBox == data[i]["Opponent First Name"].toLowerCase()) {
                counter++;
                if(counter==1) {
                    subcontainer.append("<p class="+name+">" + getNameOpponent(i,data) + "</p>");
                    currentArray.push(getNameOpponent(i, data));
                }
                var truth = false;
                for(var j =0; j<currentArray.length; j++) {
                    if(getNameOpponent(i, data) == currentArray[j]){
                        truth = true;
                    }
                }
                if(truth == false) {
                    currentArray.push(getNameOpponent(i, data));
                    subcontainer.append("<p class="+name+">" + getNameOpponent(i,data) + "</p>");
                }
            }
            else if(nameBox == data[i]["LastName"].toLowerCase()) {
                counter++;
                if(counter==1) {
                    currentArray.push(getName(i, data));
                    subcontainer.append("<p class="+name+">" + getName(i,data) + "</p>");
                }
                var truth = false;
                for(var j =0; j<currentArray.length; j++) {
                    if(getName(i, data) == currentArray[j]){
                        truth = true;
                    }
                }
                if(truth == false) {
                    currentArray.push(getName(i, data));
                    subcontainer.append("<p class="+name+">" + getName(i,data) + "</p>");
                }
            }
            else if (nameBox == data[i]["Opponent Last Name"].toLowerCase()) {
                counter++;
                if(counter==1) {
                    currentArray.push(getNameOpponent(i, data));
                    subcontainer.append("<p class="+name+">" + getNameOpponent(i,data) + "</p>");
                }
                var truth = false;
                for(var j =0; j<currentArray.length; j++) {
                    if(getNameOpponent(i, data) == currentArray[j]){
                        truth = true;
                    }
                }
                if(truth == false) {
                    currentArray.push(getNameOpponent(i, data));
                    subcontainer.append("<p class="+name+">" + getNameOpponent(i,data) + "</p>");
                }
            }
        }
    }

    //This function returns a string with the First Players First Name + Last Name + USATT ID
    function getName(index, JSONdata) {
        return JSONdata[index]["FirstName"] + " " + JSONdata[index]["LastName"] + " (" + JSONdata[index]["USATT #"] + ")";
    }

    //This function returns a string with the Opponent Players First Name + Last Name + USATT ID
    function getNameOpponent(index, JSONdata) {
        return JSONdata[index]["Opponent First Name"] + " " + JSONdata[index]["Opponent Last Name"] + " (" + JSONdata[index]["Opponent USATT #"] + ")";
    }

    //This function returns a string with the Opponent Players Match Statistics for a certain match.
    function getGameStatsOpponent(index, JSONdata) {
        return "<strong>Opponent: </strong>" + JSONdata[index]["FirstName"] + " "+ JSONdata[index]["LastName"] + " (" + JSONdata[index]["USATT #"] + ")<br/><strong>Date:</strong> " + JSONdata[index]["Date"] + "<br/><strong>Game Scores: (L)</strong> " + JSONdata[index]["Match Score"] + "<br/><strong>Tournament: </strong>" + JSONdata[index]["Tournament Name"] + " (" + JSONdata[index]['Tournament ID'] + ")<br/><strong>Event: </strong>" + JSONdata[index]["Event"];
    }

    //This function returns a string with the First Players Match Statistics for a certain match.
    function getGameStats(index, JSONdata) {
        return "<strong>Opponent: </strong>" + JSONdata[index]["Opponent First Name"] + " "+ JSONdata[index]["Opponent Last Name"] + " (" + JSONdata[index]["USATT #"] + ")<br/><strong>Date:</strong> " + JSONdata[index]["Date"] + "<br/><strong>Game Scores: (W)</strong> " + JSONdata[index]["Match Score"] + "<br/><strong>Tournament: </strong>" + JSONdata[index]["Tournament Name"] + " (" + JSONdata[index]['Tournament ID'] + ")<br/><strong>Event: </strong>" + JSONdata[index]["Event"];
    }

    //This function returns a string that shows the head to head data format.
    function getHeadToHead(index, JSONdata) {
        return "<strong>" + JSONdata[index]["FirstName"] + " " + JSONdata[index]["LastName"] + "</strong> vs " + JSONdata[index]["Opponent First Name"] + " "+ JSONdata[index]["Opponent Last Name"] + "<br/><strong>Date:</strong> " + JSONdata[index]["Date"] + "<br/><strong>Game Scores: </strong> " + JSONdata[index]["Match Score"] + "<br/><strong>Tournament: </strong>" + JSONdata[index]["Tournament Name"] + " (" + JSONdata[index]['Tournament ID'] + ")<br/><strong>Event: </strong>" + JSONdata[index]["Event"];
    }

    //This function returns a string that shows the head to head data format for the opponent.
    function getHeadToHeadOpponent(index, JSONdata) {
        return JSONdata[index]["Opponent First Name"] + " " + JSONdata[index]["Opponent Last Name"] + " vs <strong>" + JSONdata[index]["FirstName"] + " "+ JSONdata[index]["LastName"] + "</strong><br/><strong>Date:</strong> " + JSONdata[index]["Date"] + "<br/><strong>Game Scores: </strong> " + JSONdata[index]["Match Score"] + "<br/><strong>Tournament: </strong>" + JSONdata[index]["Tournament Name"] + " (" + JSONdata[index]['Tournament ID'] + ")<br/><strong>Event: </strong>" + JSONdata[index]["Event"];
    }
})
