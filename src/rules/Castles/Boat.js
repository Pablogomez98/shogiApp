var Boat = [
    //////////////10
    {///////Pawn
        "priority":10,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="P" && ((this.column==2 && this.row==6 && this.player=="1")||(this.column==6 && this.row==2 && this.player=="0"))){notPositioned=true}
            R.when(
                notPositioned &&
                this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                );
        },
        "consequence": function(R) {
            var new_position
            if(this.player=="0"){new_position="36"}
            else{new_position="52"}
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            this.priorities.push(10)
            this.moves.push(row+column)  
            R.next();
        }
    },
    /////////////9
    {///////King
        "priority":9,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="KING" && ((this.column==4 && this.row==8 && this.player=="1")||(this.column==4 && this.row==0 && this.player=="0"))){notPositioned=true}
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
            this.priorities.push(9)
            this.moves.push(row+column)  
            R.next();
        }
    },

    {///////King
        "priority":9,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="KING" && ((this.column==3 && this.row==7 && this.player=="1")||(this.column==5 && this.row==1 && this.player=="0"))){notPositioned=true}
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
            this.priorities.push(9)
            this.moves.push(row+column)  
            R.next();
        }
    },
    //////////////8
    {///////Golden
        "priority":8,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="G" && ((this.column==5 && this.row==8 && this.player=="1")||(this.column==3 && this.row==0 && this.player=="0"))){notPositioned=true}
            R.when(
                notPositioned &&
                this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Yagura golden 1")
            var new_position
            if(this.player=="0"){new_position="14"}
            else{new_position="74"}
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            this.priorities.push(8)
            //console.log(row+column)
            this.moves.push(row+column)  
            R.next();
        }
    },

    {///////Pawn
        "priority":8,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="P" && ((this.column==4 && this.row==6 && this.player=="1")||(this.column==4 && this.row==2 && this.player=="0"))){notPositioned=true}
            R.when(
                notPositioned &&
                this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Yagura pawn")
            var new_position
            if(this.player=="0"){new_position="34"}
            else{new_position="54"}
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            this.priorities.push(8)
            this.moves.push(row+column)  
            R.next();
        }
    },

    {///////Pawn
        "priority":8,
        "condition": function(R) {	
            var notPositioned = false 
            if(this.piece=="P" && ((this.column==0 && this.row==6 && this.player=="1")||(this.column==8 && this.row==2 && this.player=="0"))){notPositioned=true}
            R.when(
                notPositioned &&
                this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Yagura pawn")
            var new_position
            if(this.player=="0"){new_position="38"}
            else{new_position="50"}
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            this.priorities.push(8)
            this.moves.push(row+column)  
            R.next();
        }
    }

]

module.exports = {Boat};