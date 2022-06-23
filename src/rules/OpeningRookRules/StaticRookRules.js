var StaticRookRules = [
        {///////Advance Pawn
            "priority":8,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="P" && ((this.column==1 && this.row==2 && this.player=="0")||(this.column==7 && this.row==6 && this.player=="1"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="31"}
                else{new_position="57"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(8)
                this.moves.push(row+column)  
                R.next();
            }
        },
        {///////Advance Pawn
            "priority":8,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="P" && ((this.column==1 && this.row==3 && this.player=="0")||(this.column==7 && this.row==5 && this.player=="1"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="41"}
                else{new_position="47"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(8)
                this.moves.push(row+column)  
                R.next();
            }
        },
        {///////Advance Pawn
            "priority":8,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="P" && ((this.column==1 && this.row==4 && this.player=="0")||(this.column==7 && this.row==4 && this.player=="1"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="51"}
                else{new_position="37"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(7)
                this.moves.push(row+column)  
                R.next();
            }
        },
     
]

module.exports = {StaticRookRules};
