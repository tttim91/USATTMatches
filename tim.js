$(document).ready(function() {
    //Get JSON File from Heroku API Server
    var year2015 = $.get("https://tim-pingpong-stats.herokuapp.com/2015", function(data) {
    });
    var year2014 = $.get("https://tim-pingpong-stats.herokuapp.com/2014", function(data) {
    });
    var year2013 = $.get("https://tim-pingpong-stats.herokuapp.com/2013", function(data) {
    });
    var year2012 = $.get("https://tim-pingpong-stats.herokuapp.com/2012", function(data) {
    });

    Promise.all([year2015, year2014, year2013, year2012]).then(function(data){
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
            printMatchData(data, selectedName, 1, 0, 4, "both");
            printSimilarMatches(data);
        });
        $(document).on('click', '.name2', function() {
            $('.subcontainer2').empty();
            var selectedName = $(this).text();
            printMatchData(data, selectedName, 2, 0, 4, "both");
            printSimilarMatches(data);
        });

        $(document).on('click', '#clear1', function() {
            clearPlayer(1);
        });
        $(document).on('click', '#clear2', function() {
            clearPlayer(2);
        });

        $(document).on('change', '#yearSelection1', function() {
            $('#typeFilter option:selected').attr("selected", true);
            $('#yearSelection1 option:selected').attr("selected", true);
            var selectedName = $('.subcontainer p:nth-child(5)').text();
            var selectedOption = $('#yearSelection1 option:selected').val();
            var selectedType = $('#typeFilter option:selected').val();
            if(selectedType == "both") {
                var type = "both";
                var option = "#typeFilter option:nth-child(1)";
            }
            else if(selectedType == "wins") {
                var type = "win";
                var option = "#typeFilter option:nth-child(2)";
            }
            if(selectedType == "losses") {
                var type = "loss";
                var option = "#typeFilter option:nth-child(3)";
            }
            $('.subcontainer').empty();
            if(selectedOption == "All") {
                printMatchData(data, selectedName, 1, 0, 4, type);
                $('#All').attr("selected", true);
                $(option).attr("selected", true);
            }
            else if(selectedOption == 2015) {
                printMatchData(data, selectedName, 1, 0, 1, type);
                $('#2015').attr("selected", true);
                $(option).attr("selected", true);
            }
            else if(selectedOption == 2014) {
                printMatchData(data, selectedName, 1, 1, 2, type);
                $('#2014').attr("selected", true);
                $(option).attr("selected", true);
            }
            else if(selectedOption == 2013) {
                printMatchData(data, selectedName, 1, 2, 3, type);
                $('#2013').attr("selected", true);
                $(option).attr("selected", true);
            }
            else if(selectedOption == 2012) {
                printMatchData(data, selectedName, 1, 3, 4, type);
                $('#2012').attr("selected", true);
                $(option).attr("selected", true);
            }
        });
        $(document).on('change', '#yearSelection2', function() {
            $('#typeFilter2 option:selected').attr("selected", true);
            $('#yearSelection2 option:selected').attr("selected", true);
            var selectedName = $('.subcontainer2 p:nth-child(5)').text();
            var selectedOption = $('#yearSelection2 option:selected').val();
            var selectedType = $('#typeFilter2 option:selected').val();
            if(selectedType == "bothtwo") {
                var type = "both";
                var option = "#typeFilter2 option:nth-child(1)";
            }
            else if(selectedType == "winstwo") {
                var type = "win";
                var option = "#typeFilter2 option:nth-child(2)";
            }
            if(selectedType == "lossestwo") {
                var type = "loss";
                var option = "#typeFilter2 option:nth-child(3)";
            }
            $('.subcontainer2').empty();
            if(selectedOption == "Alltwo") {
                printMatchData(data, selectedName, 2, 0, 4, type);
                $('#Alltwo').attr("selected", true);
            }
            else if(selectedOption == 2015) {
                printMatchData(data, selectedName, 2, 0, 1, type);
                $('#2015two').attr("selected", true);
            }
            else if(selectedOption == 2014) {
                printMatchData(data, selectedName, 2, 1, 2, type);
                $('#2014two').attr("selected", true);
            }
            else if(selectedOption == 2013) {
                printMatchData(data, selectedName, 2, 2, 3, type);
                $('#2013two').attr("selected", true);
            }
            else if(selectedOption == 2012) {
                printMatchData(data, selectedName, 2, 3, 4, type);
                $('#2012two').attr("selected", true);
            }
            $(option).attr("selected", true);
        });

        $(document).on('change', '#typeFilter', function() {
            $('#typeFilter option:selected').attr("selected", true);
            $('#yearSelection1 option:selected').attr("selected", true);
            var selectedName = $('.subcontainer p:nth-child(5)').text();
            var selectedOption = $('#typeFilter option:selected').val();
            var selectedYear = $('#yearSelection1 option:selected').val();
            if(selectedYear == "All") {
                var first = 0;
                var second = 4;
                var option = '#yearSelection1 option:nth-child(1)';
            }
            else if(selectedYear == 2015) {
                var first = 0;
                var second = 1;
                var option = '#yearSelection1 option:nth-child(2)';
            }
            else if(selectedYear == 2014) {
                var first = 1;
                var second = 2;
                var option = '#yearSelection1 option:nth-child(3)';
            }
            else if(selectedYear == 2013) {
                var first = 2;
                var second = 3;
                var option = '#yearSelection1 option:nth-child(4)';
            }
            else if(selectedYear == 2012) {
                var first = 3;
                var second = 4;
                var option = '#yearSelection1 option:nth-child(5)';
            }
            $('.subcontainer').empty();
            if(selectedOption == "both") {
                printMatchData(data, selectedName, 1, first, second, "both");
                $('#both').attr("selected", true);
                $(option).attr("selected", true);
            }
            else if(selectedOption == "wins") {
                printMatchData(data, selectedName, 1, first, second, "win");
                $('#wins').attr("selected", true);
                $(option).attr("selected", true);
            }
            else if(selectedOption == "losses") {
                printMatchData(data, selectedName, 1, first, second, "loss");
                $('#losses').attr("selected", true);
                $(option).attr("selected", true);
            }
        });

        $(document).on('change', '#typeFilter2', function() {
            $('#typeFilter2 option:selected').attr("selected", true);
            $('#yearSelection2 option:selected').attr("selected", true);
            var selectedName = $('.subcontainer2 p:nth-child(5)').text();
            var selectedOption = $('#typeFilter2 option:selected').val();
            var selectedYear = $('#yearSelection2 option:selected').val();
            if(selectedYear == "All") {
                var first = 0;
                var second = 4;
                var option = '#yearSelection2 option:nth-child(1)';
            }
            else if(selectedYear == 2015) {
                var first = 0;
                var second = 1;
                var option = '#yearSelection2 option:nth-child(2)';
            }
            else if(selectedYear == 2014) {
                var first = 1;
                var second = 2;
                var option = '#yearSelection2 option:nth-child(3)';
            }
            else if(selectedYear == 2013) {
                var first = 2;
                var second = 3;
                var option = '#yearSelection2 option:nth-child(4)';
            }
            else if(selectedYear == 2012) {
                var first = 3;
                var second = 4;
                var option = '#yearSelection2 option:nth-child(5)';
            }
            $('.subcontainer2').empty();
            if(selectedOption == "bothtwo") {
                printMatchData(data, selectedName, 2, first, second, "both");
                $('#bothtwo').attr("selected", true);
                $(option).attr("selected", true);
            }
            else if(selectedOption == "winstwo") {
                printMatchData(data, selectedName, 2, first, second, "win");
                $('#winstwo').attr("selected", true);
                $(option).attr("selected", true);
            }
            else if(selectedOption == "lossestwo") {
                printMatchData(data, selectedName, 2, first, second, "loss");
                $('#lossestwo').attr("selected", true);
                $(option).attr("selected", true);
            }
        });

        $('.hamburgermenu').click(function() {

        });

    });

    function clearPlayer(number) {
        if(number == 1) {
            var subcontainer = $('.subcontainer');
        }
        else if (number == 2) {
            var subcontainer = $('.subcontainer2');
        }
        subcontainer.empty();
    }

    //Populates the middle section of the website and shows the matches that the two players played against each other
    function printSimilarMatches(data) {
        var person1 = $('.subcontainer p:nth-child(5)').text();
        var person2 = $('.subcontainer2 p:nth-child(5)').text();
        var person1Score = 0, person2Score = 0;
        $('.midcontainer').empty();
        for(var year=0; year<4; year++){
            for(var i = 1; i< data[year].length; i++) {
                if(person1 == getName(year, i, data) && person2 == getNameOpponent(year, i, data)) {
                    $('.midcontainer').append("<p>" + getHeadToHead(year, i, data) + "</p>");
                    person1Score++;
                }
                else if (person1 == getNameOpponent(year, i, data) && person2 == getName(year, i, data)) {
                    $('.midcontainer').append("<p>" + getHeadToHeadOpponent(year, i, data) + "</p>");
                    person2Score++;
                }
            }
        }
        $('.midcontainer').prepend("<p class='score'>" + person1Score + " - " + person2Score + "</p>");
        $('.midcontainer').prepend("<h4>Match Score</h4>");
    }

    //This function prints out the player you select as well as all their matches below with details
    function printMatchData(data, selection, number, yearBeg, yearEnd, type) {
        var wins=0, losses=0;
        if(number == 1) {
            var subcontainer = $('.subcontainer');
        }
        else if (number == 2) {
            var subcontainer = $('.subcontainer2');
        }
        subcontainer.append("<p><strong>" + selection + "</strong></p>");
        for(var year=yearBeg; year<yearEnd; year++){
            for(var i=1; i<data[year].length; i++) {
                if(selection == getName(year, i, data) && (type=="both" || type=="win")) {
                    subcontainer.append("<p>" + getGameStats(year, i, data) + "</p>");
                    wins++;
                }
                else if(selection == getNameOpponent(year, i, data) && (type=="both" || type=="loss")) {
                    subcontainer.append("<p>" + getGameStatsOpponent(year, i, data) + "</p>");
                    losses++;
                }
            }
        }
        if(number == 1) {
            subcontainer.prepend("<input type='button' value='Clear Player' id='clear1'>");
            subcontainer.prepend("<select id='typeFilter'><option value='both' id='both'>Both wins/losses</option><option value='wins' id='wins'>wins</option><option value='losses' id='losses'>losses</option></select>");
            subcontainer.prepend("<select id='yearSelection1'><option value='All' id='All'>All years</option><option value='2015' id='2015'>2015</option><option value='2014' id='2014'>2014</option><option value='2013' id='2013'>2013</option><option value='2012' id='2012'>2012</option></select>");
        }
        else if (number == 2) {
            subcontainer.prepend("<input type='button' value='Clear Player' id='clear2'>");
            subcontainer.prepend("<select id='typeFilter2'><option value='bothtwo' id='bothtwo'>Both wins/losses</option><option value='winstwo' id='winstwo'>wins</option><option value='lossestwo' id='lossestwo'>Losses</option></select>");
            subcontainer.prepend("<select id='yearSelection2'><option value='All' id='Alltwo'>All years</option><option value='2015' id='2015two'>2015</option><option value='2014' id='2014two'>2014</option><option value='2013' id='2013two'>2013</option><option value='2012' id='2012two'>2012</option></select>");
        }

        subcontainer.prepend("<h4>Match History: (" + wins + "-" + losses + ")</h4>");

    }

    //This function prints out the names of all people with names that equal the name in the search box only once
    function printNames(data, number) {
        var currentArray = [];
        var counter = 0;
        if(number == 1) {
            var nameBox = $('#nameBox').val().toLowerCase();
            nameBox = nameBox.trim();
            var subcontainer = $('.subcontainer');
            var name = "name";
        }
        else if (number == 2) {
            var nameBox = $('#nameBox2').val().toLowerCase();
            nameBox = nameBox.trim();
            var subcontainer = $('.subcontainer2');
            var name = "name2";
        }
        var length = nameBox.length;
        subcontainer.empty();
        for(var year=0; year<4; year++){
            for(var i=1; i<data[year].length; i++) {
                var playerName = null;
                if(nameBox == data[year][i]["FirstName"].substr(0,length).toLowerCase()) {
                    counter++;
                    playerName = getName(year, i, data);
                }

                else if(nameBox == data[year][i]["Opponent First Name"].substr(0,length).toLowerCase()) {
                    counter++;
                    playerName = getNameOpponent(year, i, data);
                }
                else if(nameBox == data[year][i]["LastName"].substr(0,length).toLowerCase()) {
                    counter++;
                    playerName = getName(year, i, data);
                }
                else if (nameBox == data[year][i]["Opponent Last Name"].substr(0,length).toLowerCase()) {
                    counter++;
                    playerName = getNameOpponent(year, i, data);
                }
                else if (nameBox == (data[year][i]["FirstName"].toLowerCase() + " " + data[year][i]["LastName"].toLowerCase())) {
                    counter++;
                    playerName = getName(year, i, data);
                }
                else if (nameBox == (data[year][i]["Opponent First Name"].toLowerCase() + " " + data[year][i]["Opponent Last Name"].toLowerCase())) {
                    counter++;
                    playerName = getNameOpponent(year, i, data);
                }

                if(playerName) {
                    if(counter==1) {
                        subcontainer.append("<h4>Select a person</h4>");
                        subcontainer.append("<p class="+name+">" + playerName + "</p>");
                        currentArray.push(playerName);
                    }
                    var truth = false;
                    for(var j =0; j<currentArray.length; j++) {
                        if(playerName == currentArray[j]){
                            truth = true;
                        }
                    }
                    if(truth == false) {
                        currentArray.push(playerName);
                        subcontainer.append("<p class="+name+">" + playerName + "</p>");
                    }
                }
            }
        }
    }

    //This function returns a string with the First Players First Name + Last Name + USATT ID
    function getName(year, index, JSONdata) {
        return JSONdata[year][index]["FirstName"] + " " + JSONdata[year][index]["LastName"] + " (" + JSONdata[year][index]["USATT #"] + ")";
    }

    //This function returns a string with the Opponent Players First Name + Last Name + USATT ID
    function getNameOpponent(year, index, JSONdata) {
        return JSONdata[year][index]["Opponent First Name"] + " " + JSONdata[year][index]["Opponent Last Name"] + " (" + JSONdata[year][index]["Opponent USATT #"] + ")";
    }

    //This function returns a string with the Opponent Players Match Statistics for a certain match.
    function getGameStatsOpponent(year, index, JSONdata) {
        return "<strong>Opponent: </strong>" + JSONdata[year][index]["FirstName"] + " "+ JSONdata[year][index]["LastName"] + " (" + JSONdata[year][index]["USATT #"] + ")<br/><strong>Date:</strong> " + JSONdata[year][index]["Date"] + "<br/><strong>Game Scores: (L)</strong> " + JSONdata[year][index]["Match Score"]
        + "<br/><strong>Tournament: </strong>" + JSONdata[year][index]["Tournament Name"] + " (" + JSONdata[year][index]['Tournament ID'] + ")<br/><strong>Event: </strong>" + JSONdata[year][index]["Event"];
    }

    //This function returns a string with the First Players Match Statistics for a certain match.
    function getGameStats(year, index, JSONdata) {
        return "<strong>Opponent: </strong>" + JSONdata[year][index]["Opponent First Name"] + " "+ JSONdata[year][index]["Opponent Last Name"] + " (" + JSONdata[year][index]["USATT #"] + ")<br/><strong>Date:</strong> " + JSONdata[year][index]["Date"] + "<br/><strong>Game Scores: (W)</strong> " + JSONdata[year][index]["Match Score"]
        + "<br/><strong>Tournament: </strong>" + JSONdata[year][index]["Tournament Name"] + " (" + JSONdata[year][index]['Tournament ID'] + ")<br/><strong>Event: </strong>" + JSONdata[year][index]["Event"];
    }

    //This function returns a string that shows the head to head data format.
    function getHeadToHead(year, index, JSONdata) {
        return "<strong>" + JSONdata[year][index]["FirstName"] + " " + JSONdata[year][index]["LastName"] + "</strong> vs " + JSONdata[year][index]["Opponent First Name"] + " "+ JSONdata[year][index]["Opponent Last Name"] + "<br/><strong>Date:</strong> " + JSONdata[year][index]["Date"]
        + "<br/><strong>Game Scores: </strong> " + JSONdata[year][index]["Match Score"] + "<br/><strong>Tournament: </strong>" + JSONdata[year][index]["Tournament Name"] + " (" + JSONdata[year][index]['Tournament ID'] + ")<br/><strong>Event: </strong>" + JSONdata[year][index]["Event"];
    }

    //This function returns a string that shows the head to head data format for the opponent.
    function getHeadToHeadOpponent(year, index, JSONdata) {
        return JSONdata[year][index]["Opponent First Name"] + " " + JSONdata[year][index]["Opponent Last Name"] + " vs <strong>" + JSONdata[year][index]["FirstName"] + " "+ JSONdata[year][index]["LastName"] + "</strong><br/><strong>Date:</strong> " + JSONdata[year][index]["Date"] + "<br/><strong>Game Scores: </strong> "
        + JSONdata[year][index]["Match Score"] + "<br/><strong>Tournament: </strong>" + JSONdata[year][index]["Tournament Name"] + " (" + JSONdata[year][index]['Tournament ID'] + ")<br/><strong>Event: </strong>" + JSONdata[year][index]["Event"];
    }
})
