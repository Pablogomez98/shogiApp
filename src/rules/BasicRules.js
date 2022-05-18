import {getPossibleCells,getPossibleRevive} from '../Game.js'

var BasicRules = [
    {///////moveRandom
        "priority": 2,
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
    },
     {///////Capture if u can
        "priority": 3,
        "condition": function(R) {	
            //console.log("Rule: Capture")
            //console.log("player: " + this.player + this.state.ctx.currentPlayer)
            let threats = getThreats(this.state.G,this.possibleMoves,this.state.ctx.currentPlayer)
            //console.log(threads)
            R.when(
                this.player==this.state.ctx.currentPlayer 
                && this.isHand=="0"
                && threats!="" 
                );
        },
        "consequence": function(R) {
            console.log("Rule activated: Capture")
            //var state = require('./ShogiRBS.js')
            //var G = state.G
            let threats = getThreats(this.state.G,this.possibleMoves,this.state.ctx.currentPlayer)
            var rand = parseInt(Math.random() * (threats.length - 0) + 0);
            var thread = threats[rand]
            var row = thread[1].substr(0,1)
            var column = thread[2].substr(0,1)
            console.log(thread)
            console.log(row)
            console.log(column)
            //this.result = true;
            this.reason = this.row+this.column+row+column+this.piece
            this.move = row+column
            //console.log(this);
            R.stop();
        }
    }
]

module.exports = {BasicRules};

function getThreats(G,possibleMoves,player){
    let threats = []
    var row
    var column
    var G_row
    var count = 0
    for (let cell of possibleMoves){
        row = cell.substr(0,1)
        column = cell.substr(1,1)
        G_row = G.cells[row]
        //console.log(G_row[column])
        if( G_row[column]!=null && G_row[column].substr(0,1)!=player.toString()){
            var thread = [G_row[column],row,column]
            threats[count] = thread
            count = count+1
        }
    }
    for(let th of threats){
        console.log("threat: ")
        console.log(th)
    }
    return threats
}