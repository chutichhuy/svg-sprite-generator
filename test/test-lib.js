var ssg = require("../lib/main");

ssg.spriteFromFiles(["svg/harmony-button-chart.svg", "svg/harmony-game-boy.svg"])
    .then(function (rs) {
        console.log(rs);
    });

