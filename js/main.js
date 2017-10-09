jQuery(document).ready(function() {

	updateScoreboard();
});

function updateScoreboard() {
	$.getJSON("scoreboard/json", function(result) {

		var $scoreboard = $("#scoreboard");
        var game_list = [];
        var html = '';
        var game_types = {
            "live" : "Live Games",
            "pre" : "Upcoming Games",
            "final" : "Finished Games"
        }

        // Create a list of games by type
        $.each(game_types, function (i, gtype) {
            game_list[i] = [];
        });

        $.each(result.games, function(i, board) {
            game_list[board.game.gameState].push(board.game);
        });

        // Loop through the game types
        $.each(game_types, function (i, gtype) {

            game_list[i].sort(gamesort);

            html += '<h1>' + gtype + '</h1><ul>';

            // Loop through the games for this type
            $.each(game_list[i], function(j, game) {

                var class_box = "";
                var class_lost_away = "";
                var class_lost_home = "";
                var head_text = "";
                var video = "";

                switch(game.gameState) {
                    case "live":
                        head_text = "<p>Live - </p> " + game.currentPeriod;
                        class_box = ' class="islive"';
                    break;
                    case "final":
                        head_text = "Final";
                        class_box = ' class="isfinal"';
                        game.network = "";

                        if (game.home.winner == true) {
                            class_lost_away = ' class="lost"';
                        } else {
                            class_lost_home = ' class="lost"';
                        }

                    break;
                    default:
                        head_text = "<p>Upcoming - </p> " + game.startTime;
                        game.away.score = "";
                        game.home.score = "";
                    break;
                }

                html += '<li' + class_box + '><section>' +
                    '<h2>' + head_text + '<span>' + game.network + video + '</span></h2>' +
                    '<h3' + class_lost_away + '><div>' + game.away.names.short + '</div><p>' + game.away.names.char6 + '</p><span>' + game.away.score + '</span></h3>' +
                    '<h3' + class_lost_home + '><div>' + game.home.names.short + '</div><p>' + game.home.names.char6 + '</p><span>' + game.home.score + '</span></h3>' +
                    '</section></li>';
            });

            html += '</ul>';
        });


        $scoreboard.html(html);
	});
}

function gamesort(a,b) {
    if (a.startTimeEpoch < b.startTimeEpoch)
        return -1;
    if (a.startTimeEpoch > b.startTimeEpoch)
        return 1;
    return 0;
}