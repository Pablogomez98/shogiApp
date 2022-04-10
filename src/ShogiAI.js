import {getPossibleCells,getPossibleRevive} from './Game.js'

/* Creating Rule Engine instance */
var NodeRules = require('node-rules');
var RuleEngine = require('node-rules');

///Variables
var G
var state

//////////FACTS///////////////////






//////////RULES/////////////////
var rules = [
    {///////playBoardPiece
        "condition": function(R) {	
        //console.log("playBoard")
        //console.log(this);
        var possible_cells = getPossibleCells(G.cells,parseInt(this.row),parseInt(this.column),this.piece,this.player)
        //console.log(possible_cells)
        R.when(possible_cells!="" && this.player==state.ctx.currentPlayer && this.isHand=="0");
    },
    "consequence": function(R) {
        //console.log("move")
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
    },
    {
        "condition": function(R) {	
            //console.log(this);
            var possible_cells = getPossibleRevive(G.cells,this.piece,this.player)
            //console.log(possible_cells)
            R.when(possible_cells!="" && this.player==state.ctx.currentPlayer && this.isHand=="1");
        },
        "consequence": function(R) {
            //console.log("move")
            var possible_cells = getPossibleRevive(G.cells,this.piece,this.player)
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

];

var playBoardPiece2 = {
    "condition": function(R) {	
        //console.log("playBoard2")
        //console.log(this);
        var possible_cells = getPossibleCells(G.cells,parseInt(this.row),parseInt(this.column),this.piece,this.player)
        //console.log(possible_cells)
        R.when(possible_cells!="" && this.player==state.ctx.currentPlayer && this.isHand=="0" && this.piece=="G");
    },
    "consequence": function(R) {
        //console.log("move")
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
};

/////submit of rules////
//rules.push(playBoardPiece)
//rules.push(playBoardPiece2)
//rules.push(playHandPiece)
/* Register Rule */
var R = new RuleEngine(rules,{ignoreFactChanges:true});



/* Run engine for each fact */
export async function executeEngine(gameState,fn){
    state = gameState
    G = state.G
    var result_facts =  function func(){
        return new Promise((resolve ,reject)=>{
            submitFacts(function(result){
            resolve(result)
          }); 
        });
    };  
    let facts = await result_facts();
    let moves = []
    let final_moves = []
    //console.log("facts: " + facts)  
        for (let fact of facts) {
            //console.log("Voy por: " + fact.piece)
            let m = await new Promise(resolve => 
                R.execute(fact, function (data) {
                    if (data.move!=null) {
                        //console.log("Movimiento: " + data.move)
                        let move_info = []                  
                        move_info.push(data.row)
                        move_info.push(data.column)
                        move_info.push(data.move)
                        move_info.push(data.piece)
                        move_info.push(data.isHand)
                        move_info.push(data.player)
                        moves.push(move_info)
                        resolve(move_info)   
                    } 
                    else{resolve("")}
                })
            );
            
            if(m!=""){final_moves.push(m)}  
        }
    //console.log("Final moves: " + final_moves)
    fn(final_moves)      
}
/////submit of facts////
function submitFacts(fn){
    var facts = []
    var player_and_piece
    for(let i=0;i<G.cells.length;i++){
        let row = G.cells[i]
        for(let j=0;j<G.cells[i].length;j++){
          if(row[j]!=null){
            player_and_piece = row[j]
            var piece = player_and_piece.substr(1,4)
            var player = player_and_piece.substr(0,1)
            var fact = createFact(piece,i,j,player,0);
            facts.push(fact)
          }
        }
    }
    for(let i=0;i<G.sente_captured_pieces.length;i++){      
        player_and_piece = G.sente_captured_pieces[i]
        var piece = player_and_piece.substr(0,4)
        var fact = createFact(piece,0,0,"0",1);
        facts.push(fact)
          
    }
    for(let i=0;i<G.gote_captured_pieces.length;i++){      
        player_and_piece = G.gote_captured_pieces[i]
        var piece = player_and_piece.substr(0,4)
        var fact = createFact(piece,0,0,"1",1);
        facts.push(fact)
          
    }
    
    //facts.push(fact2)
    fn(facts)
}
function createFact(piece_type,row_id,column_id,player_id,hand){
    var factName = player_id.concat(piece_type).concat(row_id.toString()).concat(column_id.toString()).concat(hand.toString())
    var factName = {
        "piece": piece_type.toString(),
        "player": player_id.toString(),
        "row": row_id.toString(),
        "column" : column_id.toString(),
        "isHand" : hand.toString()
    }
    return factName
}