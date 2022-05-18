import {getPossibleCells,getPossibleRevive} from '../Game.js'
//import G from './Openings.js'
//export var GenshiBouginRules = []


var GenshiBougin = [
        {///////playBoardPiece
            "condition": function(R) {	
                //console.log("Rule: playBoard")
                //console.log("player: " + this.player + this.state.ctx.currentPlayer)
                
                //console.log(this);
               //var state = require('./ShogiRBS.js')
                //var G = state.G

                //var possible_cells = getPossibleCells(this.state.G.cells,parseInt(this.row),parseInt(this.column),this.piece,this.player)
                //console.log(this.state.G);
                //console.log(possible_cells);
                R.when(this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0");
            },
            "consequence": function(R) {
                //console.log("Rule activated: playBoard")
                //var state = require('./ShogiRBS.js')
                //var G = state.G
                var possible_cells = getPossibleCells(this.state.G.cells,parseInt(this.row),parseInt(this.column),this.piece,this.player)
                //console.log(possible_cells)
                var rand = parseInt(Math.random() * (possible_cells.length - 0) + 0);
                var new_position = possible_cells[rand]
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                //this.result = true;
                this.reason = this.row+this.column+row+column+this.piece
                this.move = row+column
                //console.log(this);
                R.next();
            }
        }
]

var Inglesa = [
    {///////playBoardPiece
        "condition": function(R) {	
            console.log("INGLESA")
            console.log(this);
            var state = require('../GameRBS.js')
            var G = state.G
            var possible_cells = getPossibleCells(G.cells,parseInt(this.row),parseInt(this.column),this.piece,this.player)
            R.when(possible_cells!="" && this.player==state.ctx.currentPlayer && this.isHand=="0");
        },
        "consequence": function(R) {
            console.log("move")
            var state = require('../GameRBS.js')
            var G = state.G
            var possible_cells = getPossibleCells(G.cells,parseInt(this.row),parseInt(this.column),this.piece,this.player)
            var rand = parseInt(Math.random() * (possible_cells.length - 0) + 0);
            var new_position = possible_cells[rand]
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            //this.result = true;
            this.reason = this.row+this.column+row+column+this.piece
            this.move = row+column
            //console.log(this);
            R.next();
        }
    }
]

//GenshiBouginRules.push(GenshiBougin)*/
//var GenshiBougin = ["A","B"]
module.exports = {GenshiBougin , Inglesa};
