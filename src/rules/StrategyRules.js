import {getPossibleCells,getPossibleRevive} from '../Game.js'

var StrategyRules = [
    {///////rook strategy
        "condition": function(R) {	
            //console.log("Rule: define rook strategy")
            R.when(
                this.rook == null
                && this.player==this.state.ctx.currentPlayer
                && this.phase == 0
                );
        },
        "consequence": function(R) {
           // console.log("Rule activated: define rook strategy")
            var rand = Math.round(Math.random())
            if (rand == 1) {this.rook = "static"}
            else {this.rook = "ranging"}
            //console.log("Rook: " + this.rook)
            R.next();
        }
    },
    {///////Static rook ruleSet
        "condition": function(R) {	
           // console.log("Rule: rook static strategy")
            R.when(
                this.rook == "static"
                && this.player==this.state.ctx.currentPlayer
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: static rook strategy")
            let ruleSet = this.strategy
            ruleSet.push("StaticRookRules")
            this.strategy = ruleSet
            R.next();
        }
    },
    {///////Rangling rook ruleSet

        "condition": function(R) {	
            //console.log("Rule: ranging rook strategy")
            R.when(
                this.rook == "ranging"
                && this.player==this.state.ctx.currentPlayer
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: ranging rook strategy")
            let ruleSet = this.strategy
            ruleSet.push("RangingRookRules")
            this.strategy = ruleSet
            R.next();
        }
    },
    {///////Yagura Castle

        "condition": function(R) {	
            //console.log("Rule: Yagura Castle")
            R.when(
                this.castle == null
                && this.rook == "static"
                && this.oposing_rook == "static"
                && this.player==this.state.ctx.currentPlayer
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Yagura Castle")
            let ruleSet = this.strategy
            ruleSet.push("Yagura")
            this.strategy = ruleSet
            //this.castle = "Yagura"
            R.next();
        }
    },
    {///////Boat Castle set

        "condition": function(R) {	
            //console.log("Rule: Boat Castle")
            R.when(
                this.castle == null
                && this.rook == "static"
                && this.oposing_rook == "ranging"
                && this.player==this.state.ctx.currentPlayer
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Boat Castle")
            let ruleSet = this.strategy
            ruleSet.push("Boat")
            this.strategy = ruleSet
            //this.castle = "Boat"
            R.next();
           
        }
    },
    {///////Mino Castle set

        "condition": function(R) {	
            //console.log("Rule: Mino Castle")
            R.when(
                this.castle == null
                && this.rook == "ranging"
                && this.oposing_rook == "static"
                && this.player==this.state.ctx.currentPlayer
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Mino Castle")
            let ruleSet = this.strategy
            ruleSet.push("Mino")
            this.strategy = ruleSet
            //this.castle = "Mino"
            R.next();
        }
    },
     
]

module.exports = {StrategyRules};
