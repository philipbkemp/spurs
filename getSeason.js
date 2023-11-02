results = document.querySelectorAll("table.spurs tbody tr");
s = [];
results.forEach(function(game){
    score = game.querySelectorAll("td")[3].innerHTML.split("–");
    spursScore = score[0];
    opponentScore = score[1];
    res = spursScore === opponentScore ? "d" : ( spursScore > opponentScore ? "w" : "l" );
    s.push('"'+[res,spursScore,opponentScore].join("-")+'"');
});
console.log(s.join(","));