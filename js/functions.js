function menuFadeOut() {
    if ($('.menu').is(":visible") === true) {
        $('.menu').fadeOut(300);
    }
}

//Returns a given stat such as wins, losses, both or ratio for a given year and player
function getStat(data, selection, yearBeg, yearEnd, type) {
    var wins = 0, losses = 0;
    var subcontainer = $(this);
    for (var year=yearBeg; year<yearEnd; year++){
        for (var i=1; i<data[year].length; i++) {
            if ((selection == getName(year, i, data)) && (type=="both" || type=="win" || type=="ratio")) {
                wins++;
            }
            else if ((selection == getNameOpponent(year, i, data)) && (type=="both" || type=="loss" || type=="ratio")) {
                losses++;
            }
        }
    }
    if (type=="both") {
        return wins+losses;
    }
    else if (type=="win") {
        return wins;
    }
    else if (type=="loss") {
        return losses;
    }
    else if (type="ratio") {
        if (losses == 0) {
            return 0;
        }
        else {
            return ((wins/losses).toFixed(2));
        }
    }
}

//Empties both subcontainers and midcontainer so it appears as a "homepage"
function emptyEverything() {
    $('.subcontainer').empty();
    $('.midcontainer').empty();
}

//This function will allow the win/loss toggle to filter the match data for each player
function selectType(data) {
    var subcontainer = $(this).parents('.subcontainer');
    subcontainer.find('.typeFilter option:selected').attr("selected", true);
    subcontainer.find('.yearSelection option:selected').attr("selected", true);
    var selectedName = subcontainer.find('p:nth-child(1)').text();
    var selectedOption = subcontainer.find('.typeFilter option:selected').val();
    var selectedYear = subcontainer.find('.yearSelection option:selected').val();
    if(selectedYear == "All") {
        var first = 0;
        var second = 4;
        var option = '.yearSelection option:nth-child(1)';
    }
    else if(selectedYear == "2015") {
        var first = 0;
        var second = 1;
        var option = '.yearSelection option:nth-child(2)';
    }
    else if(selectedYear == "2014") {
        var first = 1;
        var second = 2;
        var option = '.yearSelection option:nth-child(3)';
    }
    else if(selectedYear == "2013") {
        var first = 2;
        var second = 3;
        var option = '.yearSelection option:nth-child(4)';
    }
    else if(selectedYear == "2012") {
        var first = 3;
        var second = 4;
        var option = '.yearSelection option:nth-child(5)';
    }
    subcontainer.empty();
    if(selectedOption == "both") {
        printMatchData.bind(subcontainer)(data, selectedName, first, second, "both");
        subcontainer.find('.both').attr("selected", true);
    }
    else if(selectedOption == "wins") {
        printMatchData.bind(subcontainer)(data, selectedName, first, second, "win");
        subcontainer.find('.wins').attr("selected", true);
    }
    else if(selectedOption == "losses") {
        printMatchData.bind(subcontainer)(data, selectedName, first, second, "loss");
        subcontainer.find('.losses').attr("selected", true);
    }
    subcontainer.find(option).attr("selected", true);
}

//This function will allow the year selection to filter the match data for each player
function selectYear(data) {
    var subcontainer = $(this).parents('.subcontainer');
    subcontainer.find('.typeFilter option:selected').attr("selected", true);
    $(this).find('option:selected').attr("selected", true);
    var selectedName = subcontainer.find('p:nth-child(1)').text();
    var selectedOption = $(this).find('option:selected').val();
    var selectedType = subcontainer.find('.typeFilter option:selected').val();
    if(selectedType == "both") {
        var type = "both";
        var option = ".typeFilter option:nth-child(1)";
    }
    else if(selectedType == "wins") {
        var type = "win";
        var option = ".typeFilter option:nth-child(2)";
    }
    if(selectedType == "losses") {
        var type = "loss";
        var option = ".typeFilter option:nth-child(3)";
    }
    subcontainer.empty();
    if(selectedOption == "All") {
        printMatchData.bind(subcontainer)(data, selectedName, 0, 4, type);
        subcontainer.find('.All').attr("selected", true);
    }
    else if(selectedOption == 2015) {
        printMatchData.bind(subcontainer)(data, selectedName, 0, 1, type);
        subcontainer.find('.2015').attr("selected", true);
    }
    else if(selectedOption == 2014) {
        printMatchData.bind(subcontainer)(data, selectedName, 1, 2, type);
        subcontainer.find('.2014').attr("selected", true);
    }
    else if(selectedOption == 2013) {
        printMatchData.bind(subcontainer)(data, selectedName, 2, 3, type);
        subcontainer.find('.2013').attr("selected", true);
    }
    else if(selectedOption == 2012) {
        printMatchData.bind(subcontainer)(data, selectedName, 3, 4, type);
        subcontainer.find('.2012').attr("selected", true);
    }
    subcontainer.find(option).attr("selected", true);
}

//Will clear out all match, graph, and player information for one of the players
function clearPlayer() {
    var subcontainer = $(this).parents('.subcontainer');
    subcontainer.empty();
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
