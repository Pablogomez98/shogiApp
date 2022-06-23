import {getPossibleCells,getPossibleRevive, movePiece,revivePiece, isCheck, isCheckMate} from '../Game.js'

var BasicRules = [
    {///////Capture
        "priority": 5,
        "condition": function(R) {	
            //console.log("Rule: Capture")
            //console.log("player: " + this.player + this.state.ctx.currentPlayer)
            var threats
            if(this.player==this.state.ctx.currentPlayer){
                threats = getThreats(this.state.G,this.possibleMoves,this.state.ctx.currentPlayer,this)
            }
            //console.log(threads)
            R.when(
                this.player==this.state.ctx.currentPlayer 
                && this.isHand=="0"
                && threats!="" 
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Capture")
            //var state = require('./ShogiRBS.js')
            //var G = state.G
            let threats = getThreats(this.state.G,this.possibleMoves,this.state.ctx.currentPlayer)
            var rand = parseInt(Math.random() * (threats.length - 0) + 0);
            var thread = threats[rand]
            var row = thread[1].substr(0,1)
            var column = thread[2].substr(0,1)
            //console.log(thread)
            //console.log(row)
            //console.log(column)
            this.priorities.push(3)
            this.moves.push(row+column)
            //console.log(this);
            R.next();
        }
    },

    {///////Check
        "priority": 5,
        "condition": function(R) {	
            //console.log("Rule: Capture")
            var check_moves
            if(this.player==this.state.ctx.currentPlayer){
                check_moves = doesCheck(this.state.G,this.state.ctx,this.row,this.column,this.piece,this.possibleMoves,this.player)
            }
            R.when(
                this.player==this.state.ctx.currentPlayer 
                && check_moves!="" 
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Check")
            let check_moves = doesCheck(this.state.G,this.state.ctx,this.row,this.column,this.piece,this.possibleMoves,this.player)
            var rand = parseInt(Math.random() * (check_moves.length - 0) + 0);
            var mov = check_moves[rand]
            var row = mov[0].substr(0,1)
            var column = mov[1].substr(0,1)
            //console.log(check_moves)
            this.priorities.push(3)
            this.moves.push(row+column)
            R.next();
        }
    },

    {///////Check Mate
        "priority": 5,
        "condition": function(R) {	
            //console.log("Rule: Capture")
            var check_moves
            var mate_moves
            if(this.player==this.state.ctx.currentPlayer){
                check_moves = doesCheck(this.state.G,this.state.ctx,this.row,this.column,this.piece,this.possibleMoves,this.player)
                if (check_moves!=""){
                    mate_moves = doesMate(this.state.G,this.state.ctx,this.row,this.column,this.piece,this.possibleMoves,this.player)
                }
            }
            R.when(
                this.player==this.state.ctx.currentPlayer 
                && check_moves!="" && mate_moves!=""
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Check Mate")
            var mate_moves = doesMate(this.state.G,this.state.ctx,this.row,this.column,this.piece,this.possibleMoves,this.player)
            var rand = parseInt(Math.random() * (mate_moves.length - 0) + 0);
            var mov = mate_moves[rand]
            var row = mov[0].substr(0,1)
            var column = mov[1].substr(0,1)
            //console.log(mate_moves)
            this.priorities.push(10000000000000000000000000)
            this.moves.push(row+column)
            R.next();
        }
    },

    {///////Fork
        "priority": 5,
        "condition": function(R) {
            var forkMoves	
            if(this.player==this.state.ctx.currentPlayer){
                forkMoves = doesFork(this.state,this.possibleMoves,this)
            }
            //console.log(threads)
            R.when(
                this.player==this.state.ctx.currentPlayer 
                && forkMoves!="" 
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Fork")
            let forkMoves = doesFork(this.state,this.possibleMoves,this)
            for(let mv of forkMoves){
                var row = mv.substr(0,1)
                var column = mv.substr(1,1)
                //console.log(row+column)
                this.moves.push(row+column)
                this.priorities.push(0)
            }
            R.next();
        }
    },

    {///////Scape
        "priority": 5,
        "condition": function(R) {	
            var threatened = false
            if(this.player==this.state.ctx.currentPlayer){
                threatened = isThreatened(this.state,this.player,this.row,this.column)
            }
            R.when(
                this.player==this.state.ctx.currentPlayer 
                && threatened
                && this.possibleMoves!="" 
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Scape")
            var factRow = parseInt(this.row)
            var factColumn = parseInt(this.column)
            var threatened = true
            for(let move of this.possibleMoves){
                var newState = JSON.parse(JSON.stringify(this.state));
                newState.G = movePiece(newState.G,newState.ctx, factRow,factColumn,parseInt(move.substr(0,1)),parseInt(move.substr(1,1)),this.piece);
                if (newState.G !="INVALID_MOVE"){
                    //console.log(newState)
                    threatened = isThreatened(newState,this.player,move.substr(0,1),move.substr(1,1))
                if(!threatened){
                    var row = move.substr(0,1)
                    var column = move.substr(1,1)
                    //console.log(row+column)
                    this.moves.push(row+column)
                    this.priorities.push(2)
                }
                }   
            }
            R.next();
        }
    },

    {///////Attack
        "priority": 5,
        "condition": function(R) {	
            var moves
            if(this.player==this.state.ctx.currentPlayer){
                moves = canAttack(this.state,this.possibleMoves,this)
            }
            R.when(
                this.player==this.state.ctx.currentPlayer 
                && moves!=null
                && this.possibleMoves!="" 
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: Attack")
            //console.log(this)
            let  moves = canAttack(this.state,this.possibleMoves,this)
            for(let mv of moves){
                var row = mv.substr(0,1)
                var column = mv.substr(1,1)
                //console.log(row+column)
                this.moves.push(row+column)
                this.priorities.push(1)
            }
            
            R.next();
        }
    },

    {///////moveRandom
        "priority": 0,
        "condition": function(R) {	
            //console.log("Rule: moveRandom")
            R.when(
                this.possibleMoves!="" 
                && this.player==this.state.ctx.currentPlayer 
                && this.moves ==""
                );
        },
        "consequence": function(R) {
            //console.log("Rule activated: moveRandom")
            //var state = require('./ShogiRBS.js')
            //var G = state.G
            var rand = parseInt(Math.random() * ((this.possibleMoves.length-1) - 0) + 0);
            var new_position = this.possibleMoves[rand]
            var row = new_position.substr(0,1)
            var column = new_position.substr(1,1)
            //this.result = true;
            this.priorities.push(-0.25)
            this.moves.push(row+column)  
            //console.log(this);
            //console.log(row+column)
            //console.log(this);
            R.next();
        }
    }

]

module.exports = {BasicRules};

function getThreats(G,possibleMoves,player,fact){
    let threats = []
    var row
    var column
    var G_row
    var count = 0
    
    for (let cell of possibleMoves){
        row = cell.substr(0,1)
        column = cell.substr(1,1)
        G_row = G.cells[row]
        
        if( G_row[column]!=null && G_row[column].substr(0,1)!=player.toString()){
            var thread = [G_row[column],row,column]
            threats[count] = thread
            count = count+1
        }
    }
    for(let th of threats){
        //console.log("threat: ")
        //console.log(th)
        //console.log(fact)
        //console.log(G)
        //console.log(possibleMoves)
    }
    return threats
}

function doesCheck(G,ctx,row,column,piece,possibleMoves,player){
    let newG 
    let check_cells = []
    var mov = []
    for(let cell of possibleMoves){
        newG = JSON.parse(JSON.stringify(G));
        var row = newG.cells[cell.substr(0,1)]
        row[cell.substr(1,1)] = player.concat(piece)
        newG.cells[cell.substr(0,1)] = row
        if (isCheck(newG,player)){
            mov = [cell.substr(0,1),cell.substr(1,1)]
            check_cells.push(mov)
        }
    }
    return check_cells
}

function doesMate(G,ctx,row,column,piece,possibleMoves,player){
    let newG 
    let check_cells = []
    var mov = []
    for(let cell of possibleMoves){
        newG = JSON.parse(JSON.stringify(G));
        var row = newG.cells[cell.substr(0,1)]
        row[cell.substr(1,1)] = player.concat(piece)
        newG.cells[cell.substr(0,1)] = row
        if (isCheckMate(newG,ctx)){
            mov = [cell.substr(0,1),cell.substr(1,1)]
            check_cells.push(mov)
        }
    }
    return check_cells
}

function doesFork(state,possibleMoves,fact){
    var threats
    var newPossibleMoves
    var forkMoves = []
    var factRow = parseInt(fact.row)
    var factColumn = parseInt(fact.column)
    //console.log(fact)
    if(fact.isHand=="0"){
        for (let move of possibleMoves){
            var newState = JSON.parse(JSON.stringify(state));
            newState.G = movePiece(newState.G,newState.ctx, factRow,factColumn,parseInt(move.substr(0,1)),parseInt(move.substr(1,1)),fact.piece);
            if (newState.G !="INVALID_MOVE"){
            newPossibleMoves = getPossibleCells(newState.G.cells,parseInt(move.substr(0,1)),parseInt(move.substr(1,1)),fact.piece,fact.player)
            threats =  getThreats(newState.G,newPossibleMoves,fact.player,fact)
            if(threats.length>1){forkMoves.push(move)}
            }
        }
    }
    else{
        for (let move of possibleMoves){
            var newState = JSON.parse(JSON.stringify(state));
            newState.G = revivePiece(newState.G,newState.ctx, move.substr(0,1),move.substr(1,1),fact.player.concat(fact.piece));
            if (newState.G !="INVALID_MOVE"){
            newPossibleMoves = getPossibleCells(newState.G.cells,parseInt(move.substr(0,1)),parseInt(move.substr(1,1)),fact.piece,fact.player)
            threats =  getThreats(newState.G,newPossibleMoves,fact.player,fact)
            if(threats.length>1){forkMoves.push(move)}
            }   
        }    
    }
    return forkMoves
}

function isThreatened(state,player,prow,pcolumn){
    var cells = state.G.cells
    var row = -1
    var column = -1
    var scape_moves = []
    var threatened = false
    for(let cell of cells){
        row = row + 1 
        column = -1
        for(let c of cell){
            column = column + 1
            if(c!=null && c.substr(0,1)!=player){
                var op_moves = getPossibleCells(state.G.cells,row,column,c.substr(1,4),c.substr(0,1)) //string
                if(op_moves.includes(prow.concat(pcolumn)) ){
                    //console.log("THREATNEED")
                    threatened = true
                    break;
                }
            }
            
        }
        
    }
    return threatened
}

function canAttack(state,possibleMoves,fact){

    var threats = null
    var newPossibleMoves
    var attackMoves = []
    var factRow = parseInt(fact.row)
    var factColumn = parseInt(fact.column)
    //console.log(fact)
    if(fact.isHand=="0"){
        for (let move of possibleMoves){
            threats = null
            var newState = JSON.parse(JSON.stringify(state));
            newState.G = movePiece(newState.G,newState.ctx, factRow,factColumn,parseInt(move.substr(0,1)),parseInt(move.substr(1,1)),fact.piece);
            if (newState.G !="INVALID_MOVE"){
            newPossibleMoves = getPossibleCells(newState.G.cells,parseInt(move.substr(0,1)),parseInt(move.substr(1,1)),fact.piece,fact.player)
            threats = getThreats(newState.G,newPossibleMoves,fact.player,fact)
            if(threats!=""){attackMoves.push(move) }
            }
        }
    }
    else{
        for (let move of possibleMoves){
            threats = null
            var newState = JSON.parse(JSON.stringify(state));
            newState.G = revivePiece(newState.G,newState.ctx, move.substr(0,1),move.substr(1,1),fact.player.concat(fact.piece));
            if (newState.G !="INVALID_MOVE"){
            newPossibleMoves = getPossibleCells(newState.G.cells,parseInt(move.substr(0,1)),parseInt(move.substr(1,1)),fact.piece,fact.player)
            threats =  getThreats(newState.G,newPossibleMoves,fact.player,fact)
            if(threats!=""){attackMoves.push(move)}
            }   
        }    
    }
    return attackMoves
}

