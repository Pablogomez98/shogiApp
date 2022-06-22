import {getPossibleCells,getPossibleRevive} from './Game.js'
//import GenshiBougin from './Openings.js'

/* Creating Rule Engine instance */
var NodeRules = require('node-rules');
var RuleEngine = require('node-rules');

///Variables
var state


////////////////////////////////////////////////////////////////////////////////////////
/////submit of rules////

/* Run engine for each fact */
export async function executeEngine(gameState,rules,fn){
    var R = new RuleEngine(rules,{ignoreFactChanges:true});
    state = gameState

    var result_facts =  function func(){
        return new Promise((resolve ,reject)=>{
            submitFacts(gameState,function(result){
            resolve(result)
          }); 
        });
    };  
    let facts = await result_facts(); 
    let moves = []
    let final_moves = []
        for (let fact of facts) {
            let m = await new Promise(resolve => 
                R.execute(fact, function (data) {
                    if (data.moves[0]!=null) {
                        //console.log("Movimiento:" + data.moves + " Prioridad: " + data.priorities)
                        moves = []
                        for (let [index ,mv] of data.moves.entries()){
                            var move_info = []                  
                            move_info.push(data.row)
                            move_info.push(data.column)
                            move_info.push(mv)
                            move_info.push(data.piece)
                            move_info.push(data.isHand)
                            move_info.push(data.priorities[index])
                            moves.push(move_info)
                            resolve(moves) 
                        }  
                        
                    } 
                    else{resolve("")}
                })
            );
            
            if(m!=""){for(let mv of m){final_moves.push(mv)}}

        }  
    //console.log("Final moves: " + final_moves)
    fn(final_moves)      
}
/////submit of facts////
function submitFacts(state,fn){
    var facts = []
    let G = state.G
    var player_and_piece
    for(let i=0;i<G.cells.length;i++){
        let row = G.cells[i]
        for(let j=0;j<G.cells[i].length;j++){
          if(row[j]!=null){
            player_and_piece = row[j]
            var piece = player_and_piece.substr(1,4)
            var player = player_and_piece.substr(0,1)
            var fact = createFact(state,piece,i,j,player,0);
            facts.push(fact)
          }
        }
    }
    for(let i=0;i<G.sente_captured_pieces.length;i++){      
        player_and_piece = G.sente_captured_pieces[i]
        var piece = player_and_piece.substr(0,4)
        var fact = createReviveFact(state,piece,0,0,"0",1);
        facts.push(fact)
          
    }
    for(let i=0;i<G.gote_captured_pieces.length;i++){      
        player_and_piece = G.gote_captured_pieces[i]
        var piece = player_and_piece.substr(0,4)
        var fact = createReviveFact(state,piece,0,0,"1",1);
        facts.push(fact)
          
    }
    
    //facts.push(fact2)
    fn(facts)
}
function createFact(state,piece_type,row_id,column_id,player_id,hand){
    var factName = player_id.concat(piece_type).concat(row_id.toString()).concat(column_id.toString()).concat(hand.toString())
    var value = getValueOfPiece(piece_type,hand)
    var factMoves = []
    var factPriorities = []
    var factName = {
        "piece": piece_type.toString(),
        "player": player_id.toString(),
        "row": row_id.toString(),
        "column" : column_id.toString(),
        "isHand" : hand.toString(),
        "value" : value.toString(),
        "state" : state,
        "possibleMoves" : getPossibleCells(state.G.cells,parseInt(row_id),parseInt(column_id),piece_type,player_id),
        "moves" : factMoves,
        "priorities" : factPriorities
    }
    return factName
}
function createReviveFact(state,piece_type,row_id,column_id,player_id,hand){
    var factName = player_id.concat(piece_type).concat(row_id.toString()).concat(column_id.toString()).concat(hand.toString())
    var value = getValueOfPiece(piece_type,hand)
    var factMoves = []
    var factPriorities = []
    var factName = {
        "piece": piece_type.toString(),
        "player": player_id.toString(),
        "row": row_id.toString(),
        "column" : column_id.toString(),
        "isHand" : hand.toString(),
        "value" : value.toString(),
        "state" : state,
        "possibleMoves" : getPossibleRevive(state.G.cells,piece_type,player_id),
        "moves" : factMoves,
        "priorities" : factPriorities
    }
    return factName
}
function getValueOfPiece(piece,isHand){
    var value
    if(isHand){
        if(piece=="P"){value=1.15}
        if(piece=="L"){value=4.8}
        if(piece=="K"){value=5.1}
        if(piece=="S"){value=7.2}
        if(piece=="G"){value=7.8}
        if(piece=="B"){value=11.1}
        if(piece=="R"){value=12.70} 
    }
    else{
        if(piece=="P"){value=1}
        if(piece=="L"){value=4.3}
        if(piece=="K"){value=4.5}
        if(piece=="S"){value=6.4}
        if(piece=="G"){value=6.9}
        if(piece=="B"){value=8.9}
        if(piece=="R"){value=10.40}
        if(piece=="KING"){value=1000000000}

        if(piece=="AP"){value=4.2}
        if(piece=="AL"){value=6.3}
        if(piece=="AK"){value=6.4}
        if(piece=="AS"){value=6.7}
        if(piece=="AB"){value=11.5}
        if(piece=="AR"){value=13} 
    }

    return value
}