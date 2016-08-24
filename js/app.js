//When all DOM elements finish loading - THEN run Javascript code
$(document).ready(function () {
    //Get JSON Files from Heroku API Server (2012-2015) and store promise resolution
    var year2015 = $.get("https://tim-pingpong-stats.herokuapp.com/2015");
    var year2014 = $.get("https://tim-pingpong-stats.herokuapp.com/2014");
    var year2013 = $.get("https://tim-pingpong-stats.herokuapp.com/2013");
    var year2012 = $.get("https://tim-pingpong-stats.herokuapp.com/2012");

    //Click anywhere to close the popout menu
    $(".container-fluid").click(menuFadeOut);
    $("header section:first-child").click(menuFadeOut);

    var menuToggle =function() {
        $('.menu').toggle(300);
    }

    //Click on hamburgermenu to open popout menu
    $('.hamburgermenu').click(menuToggle);

    //Returns all JSON data from 2012-2015 in ARRAY with each year as an index from 0-3.
    Promise.all([year2015, year2014, year2013, year2012]).then(function (data) {

        //Click on submit button and names will populate below for either player
        $('.button').on("click", function () {
            printNames.bind(this)(data);
        });

        //Type ENTER and names will populate (same as above handler)
        $(".nameBox").keyup(function (e) {
            if (e.keyCode === 13) {
                printNames.bind(this)(data);
            }
        });

        //Click "See ALL Matches" button to go to match view
        $(document).on('click', '.seeMatches', function () {
            var subcontainer = $(this).parents('.subcontainer');
            var selectedName = subcontainer.find('p:first-child').text();
            printMatchData.bind(subcontainer)(data, selectedName, 0, 4, "both");
            printSimilarMatches.bind(subcontainer)(data);
        });

        //Click on "Table Format" button to return to table/graph view
        $(document).on('click', '.returnTable', function () {
            var subcontainer = $(this).parents('.subcontainer');
            var selectedName = subcontainer.find('p:first-child').text();
            subcontainer.empty();
            printTable.bind(subcontainer)(data, selectedName);
            printSimilarMatches.bind(subcontainer)(data);
        });

        //Click on any populated name and it will print their match history and also the head to head with other player
        $(document).on('click', '.name', function () {
            var subcontainer = $(this).parents('.subcontainer');
            subcontainer.empty();
            var selectedName = $(this).text();
            printTable.bind(subcontainer)(data, selectedName);
            printSimilarMatches.bind(subcontainer)(data);
        });

        //Click on clear button and clear player on both sides
        $(document).on('click', '.clear', function () {
            clearPlayer.bind(this)();
        });

        //Toggle year selection and data will filter
        $(document).on('change', '.yearSelection', function () {
            filterMatches.bind(this)(data);
        });

        //Toggle the win/loss selection and data will filter
        $(document).on('change', '.typeFilter', function () {
            filterMatches.bind(this)(data);
        });

        //Click on USATT logo to go back to a "homepage" (just clears everything except search boxes)
        $('#top').click(function () {
            emptyEverything();
        });

    }).catch(function(error) {
        $('.midcontainer').append("<h1>"+error+"</h1>");
    });

});
