var fs  = require("fs");
var test = [];
var id = 0;
fs.readFileSync('./routeCoords.txt').toString().split('\n').forEach(function (line) { 
    console.log(line);
    test[id] = line;
    id ++;
});

console.log (test[0]);