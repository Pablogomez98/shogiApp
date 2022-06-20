var RangingRookRules = [
    {///////Forth column
        "priority":9,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="R" && ((this.column==1 && this.row==1 && this.player=="0")||(this.column==7 && this.row==7 && this.player=="1"))){notPositioned=true}
            R.when(
                notPositioned &&
                this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Yagura pawn")
            var new_position
            if(this.player=="0"){new_position="15"}
            else{new_position="73"}
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            this.priorities.push(10)
            this.moves.push(row+column)  
            R.next();
        }
    },

    {///////Third column
        "priority":9,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="R" && ((this.column==1 && this.row==1 && this.player=="0")||(this.column==7 && this.row==7 && this.player=="1"))){notPositioned=true}
            R.when(
                notPositioned &&
                this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Yagura pawn")
            var new_position
            if(this.player=="0"){new_position="16"}
            else{new_position="72"}
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            this.priorities.push(10)
            this.moves.push(row+column)  
            R.next();
        }
    },

    {///////Opposing rooks
        "priority":9,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="R" && ((this.column==1 && this.row==1 && this.player=="0")||(this.column==7 && this.row==7 && this.player=="1"))){notPositioned=true}
            R.when(
                notPositioned &&
                this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Yagura pawn")
            var new_position
            if(this.player=="0"){new_position="17"}
            else{new_position="71"}
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            this.priorities.push(10)
            this.moves.push(row+column)  
            R.next();
        }
    },
     
]
3
module.exports = {RangingRookRules};
