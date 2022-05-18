import {getPossibleCells,getPossibleRevive} from '../Game.js'

var StrategyRules = [
    {///////rook strategy
        "condition": function(R) {	
            console.log("Rule: define rook strategy")
            R.when(
                this.rook == null
                && this.player==this.state.ctx.currentPlayer
                && this.phase == 0
                );
        },
        "consequence": function(R) {
            console.log("Rule activated: define rook strategy")
            var rand = Math.round(Math.random())
            if (rand == 1) {this.rook = "static"}
            else {this.rook = "ranging"}
            console.log("Rook: " + this.rook)
            R.next();
        }
    },
    {///////rook ruleSet
        "condition": function(R) {	
            console.log("Rule: rook static strategy")
            R.when(
                this.rook == "static"
                && this.player==this.state.ctx.currentPlayer
                );
        },
        "consequence": function(R) {
            console.log("Rule activated: static rook strategy")
            let ruleSet = this.strategy
            console.log(ruleSet)
            ruleSet.push("StaticRookRules")
            this.strategy = ruleSet
            R.next();
        }
    },
    {///////rook ruleSet

        "condition": function(R) {	
            console.log("Rule: ranging rook strategy")
            R.when(
                this.rook == "ranging"
                && this.player==this.state.ctx.currentPlayer
                );
        },
        "consequence": function(R) {
            console.log("Rule activated: ranging rook strategy")
            let ruleSet = this.strategy
            console.log(ruleSet)
            ruleSet.push("RangingRookRules")
            this.strategy = ruleSet
            R.next();
        }
    }
     
]

module.exports = {StrategyRules};
