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
            printPlayerData(data, selectedName, 1);
        });
        $(document).on('click', '.name2', function() {
            $('.subcontainer2').empty();
            var selectedName = $(this).text();
            printPlayerData(data, selectedName, 2);
        });

    });

    //This function prints out the player you select as well as all their matches below with details
    function printPlayerData(data, selection, number) {
        if(number == 1) {
            var subcontainer = $('.subcontainer');
        }
        else if (number == 2) {
            var subcontainer = $('.subcontainer2');
        }
        subcontainer.append("<p>" + selection + "</p>");
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
            var nameBox = $('#nameBox').val();
            var subcontainer = $('.subcontainer');
            var name = "name";
        }
        else if (number == 2) {
            var nameBox = $('#nameBox2').val();
            var subcontainer = $('.subcontainer2');
            var name = "name2";
        }
        subcontainer.empty();
        for(var i=1; i<data.length; i++) {
            if(nameBox == data[i]["FirstName"]) {
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

            else if(nameBox == data[i]["Opponent First Name"]) {
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
            else if(nameBox == data[i]["LastName"]) {
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
            else if (nameBox == data[i]["Opponent Last Name"]) {
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
})
