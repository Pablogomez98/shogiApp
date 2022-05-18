var RangingRookRules = [
   {///////moveRandom
    "priority": 1,
    "condition": function(R) {	
        //console.log("Rule: moveRandom")
        //console.log("player: " + this.player + this.state.ctx.currentPlayer)
        R.when(
            this.possibleMoves!="" 
            && this.player==this.state.ctx.currentPlayer 
            && this.isHand=="0"
            );
    },
    "consequence": function(R) {
        //console.log("Rule activated: playBoard")
        //var state = require('./ShogiRBS.js')
        //var G = state.G
        var rand = parseInt(Math.random() * (this.possibleMoves.length - 0) + 0);
        var new_position = this.possibleMoves[rand]
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        //this.result = true;
        this.reason = this.row+this.column+row+column+this.piece
        this.move = row+column
        //console.log(this);
        R.stop();
    }
}
     
]

module.exports = {RangingRookRules};
