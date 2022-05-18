import {getPossibleCells,getPossibleRevive} from './Game.js'
//import GenshiBougin from './Openings.js'

/* Creating Rule Engine instance */
var NodeRules = require('node-rules');
var RuleEngine = require('node-rules');

///Variables
var G
var state

//////////FACTS///////////////////


//////////RULES/////////////////
var rules2 = [
        {///////playBoardPiece
            "condition": function(R) {	
                console.log("Rule: playBoard")
                console.log(this);
                //var state = require('./ShogiRBS.js')
                //var G = state.G
                var possible_cells = getPossibleCells(G.cells,parseInt(this.row),parseInt(this.column),this.piece,this.player)
                console.log(G);
                console.log(possible_cells);
                R.when(possible_cells!="" && this.player==state.ctx.currentPlayer && this.isHand=="0");
            },
            "consequence": function(R) {
                console.log("Rule activated: playBoard")
                var state = require('./GameRBS.js')
                var G = state.G
                var possible_cells = getPossibleCells(G.cells,parseInt(this.row),parseInt(this.column),this.piece,this.player)
                console.log(possible_cells)
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
////////////////////////////////////////////////////////////////////////////////////////
/////submit of rules////
var basic_rules = require('./rules/BasicRules.js')

/* Run engine for each fact */
export async function executeEngine(gameState,rules,fn){
    var ruleSet = [rules]
    var R = new RuleEngine(basic_rules,{ignoreFactChanges:true});
    console.log(rules)
    console.log(ruleSet)
    console.log(basic_rules)
    state = gameState
    //module.exports = state
    //console.log("Engine: ")  
    //console.log(state.G.cells)  
    
    //console.log("GenshiBoushin: ")
    //console.log(rules.GenshiBougin)
    
    var result_facts =  function func(){
        return new Promise((resolve ,reject)=>{
            submitFacts(gameState,function(result){
            resolve(result)
          }); 
        });
    };  
    let facts = await result_facts();
    //console.log("facts: " )  
    //console.log(facts)  
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
    console.log("Final moves: " + final_moves)
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
        var fact = createFact(state,piece,0,0,"0",1);
        facts.push(fact)
          
    }
    for(let i=0;i<G.gote_captured_pieces.length;i++){      
        player_and_piece = G.gote_captured_pieces[i]
        var piece = player_and_piece.substr(0,4)
        var fact = createFact(state,piece,0,0,"1",1);
        facts.push(fact)
          
    }
    
    //facts.push(fact2)
    fn(facts)
}
function createFact(state,piece_type,row_id,column_id,player_id,hand){
    var factName = player_id.concat(piece_type).concat(row_id.toString()).concat(column_id.toString()).concat(hand.toString())
    var value = getValueOfPiece(piece_type,hand)
    var factName = {
        "piece": piece_type.toString(),
        "player": player_id.toString(),
        "row": row_id.toString(),
        "column" : column_id.toString(),
        "isHand" : hand.toString(),
        "value" : value.toString(),
        "state" : state,
        "possibleMoves" : getPossibleCells(state.G.cells,parseInt(row_id),parseInt(column_id),piece_type,player_id)
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