var Mino = [
  ////////////// 10
{///////Pawn
    "priority":10,
    "condition": function(R) {	
        var notPositioned = false 
        if(this.piece=="P" && ((this.column==3 && this.row==6 && this.player=="1")||(this.column==5 && this.row==2 && this.player=="0"))){notPositioned=true}
        R.when(
            notPositioned &&
            this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
            );
    },
    "consequence": function(R) {
        var new_position
        if(this.player=="0"){new_position="35"}
        else{new_position="53"}
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        this.priorities.push(10)
        this.moves.push(row+column)  
        R.next();
    }
},

////////////// 9
{///////Pawn
"priority":9,
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
    this.priorities.push(9)
    this.moves.push(row+column)  
    R.next();
}
},

{///////Bishop
    "priority":9,
    "condition": function(R) {	
        var notPositioned = false 
        if(this.piece=="B" && ((this.column==1 && this.row==7 && this.player=="1")||(this.column==7 && this.row==1 && this.player=="0"))){notPositioned=true}
        R.when(
            notPositioned &&
            this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
            );
    },
    "consequence": function(R) {
        //console.log("Rule activated: Yagura pawn")
        var new_position
        if(this.player=="0"){new_position="26"}
        else{new_position="62"}
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        this.priorities.push(9)
        this.moves.push(row+column)  
        R.next();
    }
},

///////////////////////// 8 
{///////Silver
    "priority":8,
    "condition": function(R) {	
        var notPositioned = false 
        if(this.piece=="S" && ((this.column==2 && this.row==8 && this.player=="1")||(this.column==6 && this.row==0 && this.player=="0"))){notPositioned=true}
        R.when(
            notPositioned &&
            this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
            );
    },
    "consequence": function(R) {
        //console.log("Rule activated: Yagura silver 1")
        var new_position
        if(this.player=="0"){new_position="16"}
        else{new_position="72"}
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        this.priorities.push(8)
        this.moves.push(row+column)  
        R.next();
    }
},

{///////King
    "priority":8,
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
        if(this.player=="0"){new_position="13"}
        else{new_position="75"}
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        this.priorities.push(8)
        this.moves.push(row+column)  
        R.next();
    }
},

{///////King
    "priority":8,
    "condition": function(R) {	
        var notPositioned = false 
        if(this.piece=="KING" && ((this.column==5 && this.row==7 && this.player=="1")||(this.column==3 && this.row==1 && this.player=="0"))){notPositioned=true}
        R.when(
            notPositioned &&
            this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
            );
    },
    "consequence": function(R) {
        //console.log("Rule activated: Yagura pawn")
        var new_position
        if(this.player=="0"){new_position="12"}
        else{new_position="76"}
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        this.priorities.push(8)
        this.moves.push(row+column)  
        R.next();
    }
},

{///////King
    "priority":8,
    "condition": function(R) {	
        var notPositioned = false 
        if(this.piece=="KING" && ((this.column==6 && this.row==7 && this.player=="1")||(this.column==2 && this.row==1 && this.player=="0"))){notPositioned=true}
        R.when(
            notPositioned &&
            this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
            );
    },
    "consequence": function(R) {
        //console.log("Rule activated: Yagura pawn")
        var new_position
        if(this.player=="0"){new_position="11"}
        else{new_position="77"}
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        this.priorities.push(8)
        this.moves.push(row+column)  
        R.next();
    }
},

///////////////////// 7 
{///////Silver
    "priority":7,
    "condition": function(R) {	
        var notPositioned = false 
        if(this.piece=="S" && ((this.column==6 && this.row==8 && this.player=="1")||(this.column==2 && this.row==0 && this.player=="0"))){notPositioned=true}
        R.when(
            notPositioned &&
            this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
            );
    },
    "consequence": function(R) {
        //console.log("Rule activated: Yagura pawn")
        var new_position
        if(this.player=="0"){new_position="12"}
        else{new_position="76"}
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        this.priorities.push(7)
        this.moves.push(row+column)  
        R.next();
    }
},

{///////Golden
    "priority":7,
    "condition": function(R) {	
        var notPositioned = false 
        if(this.piece=="G" && ((this.column==3 && this.row==8 && this.player=="1")||(this.column==5 && this.row==0 && this.player=="0"))){notPositioned=true}
        R.when(
            notPositioned &&
            this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
            );
    },
    "consequence": function(R) {
        //console.log("Rule activated: Yagura pawn")
        var new_position
        if(this.player=="0"){new_position="14"}
        else{new_position="74"}
        var row = new_position.substr(0,1)
        var column = new_position.substr(1,1)
        this.priorities.push(7)
        this.moves.push(row+column)  
        R.next();
    }
},

]

module.exports = {Mino};