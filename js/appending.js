//Will print out table and graph with all information on first page of player profile
function printTable(data, selection) {
    var subcontainer = $(this);
    $('#hint').fadeOut();

    subcontainer.append("<p style='font-size:1rem; color: darkblue;'><strong>" + selection + "</strong></p><br/>");

    var tableHeader = "<tr><td></td><th scope='col'>All</th><th scope='col'>Wins</th><th scope='col'>Losses</th><th scope='col'>Ratio</th></tr>";

    var tableRow2015 = "<tr><th scope='row'>All</th><td>"+getStat(data,selection, 0, 4, "both")+"</td><td>"+getStat(data,selection,0,4,'win')+"</td><td>"+getStat(data,selection,0,4,'loss')+"</td><td>"+getStat(data,selection,0,4,"ratio")+"</td></tr>";
    getStat(data,selection,0,1,'win')+"</td><td>"+getStat(data,selection,0,1,'loss')+"</td><td>"+getStat(data,selection,0,1,"ratio")+"</td></tr>";

    var tableRow2014 = "<tr><th scope='row'>2014</th><td>"+getStat(data,selection, 1, 2, 'both')+"</td><td>"+ getStat(data,selection,1,2,'win')+"</td><td>"+getStat(data,selection,1,2,'loss')+"</td><td>"+getStat(data,selection,1,2,"ratio")+"</td></tr>";

    var tableRow2013 = "<tr><th scope='row'>2013</th><td>"+getStat(data,selection, 2, 3, 'both')+"</td><td>"+
    getStat(data,selection,2,3,'win')+"</td><td>"+getStat(data,selection,2,3,'loss')+"</td><td>"+getStat(data,selection,2,3,"ratio")+"</td></tr>";

    var tableRow2012 = "<tr><th scope='row'>2012</th><td>"+getStat(data,selection, 3, 4, 'both')+"</td><td>"+
    getStat(data,selection,3,4,'win')+"</td><td>"+getStat(data,selection,3,4,'loss')+"</td><td>"+getStat(data,selection,3,4,"ratio")+"</td></tr>";

    subcontainer.append("<table class='table'>"+tableHeader+tableRow2015+tableRow2014+tableRow2013+tableRow2012+"</table><br/>");

    subcontainer.append('<div class="surroundGraph"><h5 id="title">Win/Loss Ratio</h5><div id="placeholder"></div></div>');
    var options = {yaxis: {ticks:4, tickDecimals:0}, xaxis: {ticks:4, tickDecimals:0}, colors:["blue"], series: {points: {show:true, radius:2, fill:true}, lines:{show:true}}};

    $.plot(subcontainer.find('#placeholder'), [[[2012,getStat(data,selection,3,4,"ratio")], [2013,getStat(data,selection,2,3,"ratio")], [2014,getStat(data,selection,1,2,"ratio")], [2015,getStat(data,selection,0,1,"ratio")]]],options);

    subcontainer.append("<br/><input type='button' class='seeMatches' value='See ALL Matches'>");
}

//Prints out the most played opponent given a certain filter
function printMostPlayedOpponent(data) {
    var subcontainer = $(this);
    var answer;
    var currentOpponents = [];
    var totalP = subcontainer.find('p');
    var length = totalP.length-1;
    for(var i=1; i<length; i++) {
        currentOpponents.push(totalP[i].innerText.substring(10,totalP[i].innerText.indexOf(")")+1));
    }
    if (currentOpponents.length == 0)
        return null;

    var nameMap = {},
        mostFrequentName = currentOpponents[0],
        maxCount = 1;

    length = currentOpponents.length;
    for(var i = 0; i < length; i++)
    {
        var frequentName = currentOpponents[i];

        if (nameMap[frequentName] == null)
            nameMap[frequentName] = 1;
        else
            nameMap[frequentName]++;

        if (nameMap[frequentName] > maxCount)
        {
            mostFrequentName = frequentName;
            maxCount = nameMap[frequentName];
        }
        else if (nameMap[frequentName] == maxCount)
        {
            mostFrequentName += ', ' + frequentName;
            maxCount = nameMap[frequentName];
        }
    }
    subcontainer.find('input:nth-child(5)').after("<p><strong>Most Played Opponent(s):</strong></br>"+mostFrequentName+"<br/><strong>Games:</strong> "+maxCount+"</p>");
}

//Populates the middle section of the website and shows the matches that the two players played against each other
function printSimilarMatches(data) {
    var subcontainer = $(this);
    var person1 = $('#subcontainer1 p:nth-child(1)').text();
    var person2 = $('#subcontainer2 p:nth-child(1)').text();
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
    $('.midcontainer').prepend("<h4>Head-to-Head Match Score</h4>");
}

//This function prints out the player you select as well as all their matches below with details
function printMatchData(data, selection, yearBeg, yearEnd, type) {
    var wins = 0, losses = 0;
    var subcontainer = $(this);
    subcontainer.empty();
    subcontainer.append("<p style='font-size:1rem; color: darkblue;'><strong>" + selection + "</strong></p>");
    for(var year=yearBeg; year<yearEnd; year++){
        for(var i=1; i<data[year].length; i++) {
            if(selection == getName(year, i, data) && (type=="both" || type=="win")) {
                subcontainer.append("<p class='matchCard'>"+getGameStats(year, i, data)+"</p>");
                wins++;
            }
            else if(selection == getNameOpponent(year, i, data) && (type=="both" || type=="loss")) {
                subcontainer.append("<p class='matchCard'>"+getGameStatsOpponent(year, i, data)+"</p>");
                losses++;
            }
        }
    }
    subcontainer.find('p:first-child').after("<h3>Match History ("+wins+"-"+losses+")</h3>");

    subcontainer.find('p:first-child').after("<input type='button' value='Table Format' class='returnTable'>");

    subcontainer.find('p:first-child').after("<input type='button' value='Clear Player' class='clear'>");

    subcontainer.find('p:first-child').after("<select class='typeFilter'><option value='both' class='both'>Both wins/losses</option><option value='wins' class='wins'>wins</option><option value='losses' class='losses'>losses</option></select>");

    subcontainer.find('p:first-child').after("<select class='yearSelection'><option value='All' class='All'>All years</option><option value='2015' class='2015'>2015</option><option value='2014' class='2014'>2014</option><option value='2013' class='2013'>2013</option><option value='2012' class='2012'>2012</option></select>");

    subcontainer.append("<a href='index.html#top'>Back to Top</a>");

    printMostPlayedOpponent.bind(subcontainer)(data);
    $('#hint').fadeOut();
}

//This function prints out the names of all people with names that equal the name in the search box only once
function printNames(data) {
    var search = $(this).parents('.search');
    var currentArray = [];
    var counter = 0;
    var nameBox = search.find('.nameBox').val().toLowerCase();
    nameBox = nameBox.trim();
    if(nameBox == "") {
        nameBox = null;
    }
    var subcontainer = search.find('.subcontainer');
    var name = "name";
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
                    subcontainer.append("<br/><br/><h4>Select a person</h4>");
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
    $('#hint').fadeOut();
}
