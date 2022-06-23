import {executeEngine,setRules} from './GameRBS.js' 
import {executeStrategyEngine} from './StrategyRBS.js' 
import { movePiece, revivePiece, isCheck} from './Game.js'; 

var player 
var currentPlayer
var rivalPlayer
var depth = 4

export async function requestMoveAI(event){
  var startTime = performance.now()
  var client = event.currentTarget.parameter
  var state = client.getState()
  player = state.ctx.currentPlayer
  currentPlayer = player
  if(player=="0"){rivalPlayer="1"}
  else{rivalPlayer="0"}
  /////Get rules -> Strategy//////
  var getRuleSet =  function func(){
    return new Promise((resolve ,reject)=>{
      getStrategy(state,function(result){
        resolve(result)
      });
      
    });
  };  
  let ruleSet = await getRuleSet();

  var rules = getAllRules(ruleSet)
  //console.log(rules)
  /////////////// Primer nodo => 
  var first_node_promise =  function func(){
    return new Promise((resolve ,reject)=>{
      getMovesKBS(state,rules,function(result){
        resolve(result)
      });
      
    });
  };  
  let moves = await first_node_promise();

  var count = 0
  var minmax_promise =  function func(){
    return new Promise((resolve ,reject)=>{
      getBestMove(moves,state,0,0,function(result){
        resolve(result)
      });
      
    });
  };  
  var bestmove = await minmax_promise();
  var endTime = performance.now()  
  //console.log(endTime-startTime)
  let row_id = parseInt(bestmove[0])
  let column_id = parseInt(bestmove[1])
  let row_target = parseInt(bestmove[2].substr(0,1))
  let column_target = parseInt(bestmove[2].substr(1,1))
  let piece = bestmove[3]
  let isHand = bestmove[4]
  if(isHand!=1){
    client.moves.movePiece(row_id,column_id,row_target,column_target,piece);  
  }
  else{
    client.moves.revivePiece(row_target,column_target,state.ctx.currentPlayer.concat(piece));  
  } 
     
}

async function getBestMove(moves,state,node_depth,last_move,fn) {
    var possibleScores = [];
    var possibleMoves = [];

  //////////////////////CHANGE PLAYER////////////////////////
    if(node_depth%2=="0"){ player = rivalPlayer}
    else{ player = currentPlayer}    
  ////////////////CREATE STATES//////////////////////////////
  
  var possibleStates = moves.map(function(el) {

    const new_state = JSON.parse(JSON.stringify(state));

    let row_id = parseInt(el[0])
    let column_id = parseInt(el[1])
    let row_target = parseInt(el[2].substr(0,1))
    let column_target = parseInt(el[2].substr(1,1))
    let piece = el[3]
    let isHand = el[4]
    if(isHand!=1){
      new_state.G = movePiece(new_state.G,new_state.ctx, row_id,column_id,row_target,column_target,piece);  
    }
    else{
      ////////OJO ESTO DE PLAYER///////////
      new_state.G = revivePiece(new_state.G, new_state.ctx, row_target,column_target,new_state.ctx.currentPlayer.concat(piece));  
    }
    if(new_state.G=="INVALID_MOVE"){
    }
    else{
    ///////heursiticis////////
    possibleMoves.push(el);
    if(node_depth==0){new_state.player_priority=0;new_state.rival_priority=0}
    if(new_state.ctx.currentPlayer==currentPlayer){
      new_state.player_priority = new_state.player_priority + parseInt(el[5])}
    else{new_state.rival_priority = new_state.rival_priority + parseInt(el[5])}
    var heuris = getHeuristic(new_state, node_depth)
    possibleScores.push(heuris)
    //console.log("Heuristic: " + heuris)
    new_state.ctx.currentPlayer = player
    
    return new_state;}
  });

  possibleStates = possibleStates.filter(function( element ) {
    return element !== undefined;
  });
  possibleMoves = possibleMoves.filter(function( element ) {
    return element !== undefined;
  });
  //console.log(myPreviousMove)
  //console.log("Todos los hijos de : "+ node_depth)
  //console.log(possibleStates);

  //console.log("Possible Scores: ")
  //console.log(possibleScores);


  //////////////CHECK STOP OR BOTTOM LEVEL////////////////////
  node_depth = node_depth +1
  var myPreviousMove = last_move
  //console.log("Depth: " + (depth-1))
  if (node_depth===depth){
    var retorno = []
    if(depth%2==0){//console.log("Bottom node. Min heurístic: " + getMinScore(possibleScores) + " y movimiento: " + myPreviousMove) ;
    retorno.push(getMinScore(possibleScores))
    retorno.push(myPreviousMove)
    return fn(retorno)}
    else{//console.log("Bottom node. Max heurístic: " + getMaxScore(possibleScores) + " y movimiento: " + myPreviousMove);
    retorno.push(getMaxScore(possibleScores))
    retorno.push(myPreviousMove) 
    return fn(retorno)}
  }

  if (possibleMoves.length < 1) {
    //console.log("NO MOVES")  
    var leaf = []
    leaf.push(getHeuristic(state, node_depth))
    leaf.push(myPreviousMove)    
    return fn(leaf)
  }

  //////////////////CREATE SONS  -  RECURSIVE///////////////////
  var heuristics = []

  let makeNodes = ()=>{
    return new Promise((resolve,reject)=>{
      possibleStates.forEach(async function (state, i) {

        //////////////// get rules ////////////
        var getRuleSet =  function func(){
          return new Promise((resolve ,reject)=>{
            getStrategy(state,function(result){
              resolve(result)
            });
          });
        };  
        let ruleSet = await getRuleSet();

        //////////Get all rules//////
        var rules = getAllRules(ruleSet)

        ////////////////get moves//////////////
        var first_node_promise =  function func(){
          return new Promise((resolve ,reject)=>{
            getMovesKBS(state,rules,function(result){
              resolve(result)
              });
                
            });
          }; 
          let new_moves = await first_node_promise()

        //////////////Recursive Minmax///////////////
        let callMinmaxLoop = function func(){
          return new Promise((resolve,reject)=>{
            //console.log("lets loop " + depth)
            getBestMove(new_moves,state,node_depth,possibleMoves[i],function(result){
              resolve(result)
            });
                
          });
        }; 
        var heur = await callMinmaxLoop()
        heuristics.push(heur) 
        resolve(heuristics)  
    });
    })
  }
  let heuristicas = await makeNodes()
  //console.log(state)
  //console.log("Heurísticas de : "+ (node_depth-1))
  //console.log(heuristicas)
 for (let h of heuristicas){
    //console.log("Move: " + h[1])
   // console.log("H: " + h[0])
  }
  
///////////////MINMAX BACKPROPAGATION -> FINAL///////////////////////
  if(node_depth== 1){
      let maxMove = -1000000000000000
      let bestmov
      //console.log("FINAL MOVE: ")
      for (let h of heuristicas){
        //console.log("Move: " + h[1])
        //console.log("H: " + h[0])
        if(h[0]>maxMove){
          maxMove = h[0]
          bestmov = h[1]
        }
      }
      //console.log(bestmov)
      fn(bestmov)
  }
  else{///////////////////////////console.log("Navigatin through node " +currentPlayer+player )
    //fn(getMax(heuristics))}*/
    var retorno = []
    //console.log(heuristicas)
    if((node_depth-1)%2==1){
    //console.log("Nav node de: "+ (node_depth-1) +". Min heurístic: " + getMin(heuristicas)+ " y movimiento: " + myPreviousMove) ;
    retorno.push(getMin(heuristicas))
    retorno.push(myPreviousMove)
    return fn(retorno)}
    else{
    //console.log("Nav node de: "+ (node_depth-1) +". Max heurístic: " + getMax(heuristicas)+" y movimiento: " +myPreviousMove); 
    retorno.push(getMax(heuristicas))
    retorno.push(myPreviousMove)
    return fn(retorno)}
    
  }
  
}

async function getMovesKBS(state,rules,fn){
  let resultKBS = ()=>{
    return new Promise((resolve,reject)=>{
      executeEngine(state,rules,function(result){
        resolve(result)
      });
    });
  };
  let moves = await resultKBS();
  moves = Array.from(new Set(moves.map(JSON.stringify)), JSON.parse)
  //console.log("Resultado del SBC: ");
  //console.log(moves);
  //console.log(state.G.cells)
  fn(moves)


}

async function getStrategy(state,fn){
  let resultStrategy = ()=>{
    return new Promise((resolve,reject)=>{
      executeStrategyEngine(state,function(result){
        resolve(result)
      });
    });
  };
  let ruleSet = await resultStrategy();
  fn(ruleSet)
}

///////////////////////
function getHeuristic(new_state, node_depth){
  var gote_eaten = new_state.G.gote_captured_pieces
  var sente_eaten = new_state.G.sente_captured_pieces
  var board_pieces = new_state.G.cells
  var player = new_state.ctx.currentPlayer
  var piece_owner
  var piece_type
  var piece_value
  var player_score = 0
  var rival_score = 0
  for (let row of board_pieces){
    for (let piece of row){
      if(piece!=null){
      piece_owner = piece.substr(0,1)
      piece_type = piece.substr(1,4)
      piece_value = getValueOfPiece(piece_type,false)
      if (piece_owner==currentPlayer){player_score += piece_value}
      else{rival_score+=piece_value}
      }
    }
  }
  for (let piece of gote_eaten){
      piece_type = piece.substr(0,4)
      piece_value = getValueOfPiece(piece_type,false)
      if (currentPlayer=="1"){player_score += piece_value}
      else{rival_score+=piece_value}  
  }
  for (let piece of sente_eaten){
    piece_type = piece.substr(0,4)
    piece_value = getValueOfPiece(piece_type,false)
    if (currentPlayer=="0"){player_score += piece_value}
    else{rival_score+=piece_value}  
}

  var check = isCheck(new_state.G,player)
  var multiplier
  if(player==currentPlayer){multiplier = 5;}
  else{multiplier = -5 }
  
  player_score = Math.round((player_score + Number.EPSILON) * 1000) / 100;
  rival_score = Math.round((rival_score + Number.EPSILON) * 1000) / 100;
  //console.log("puntuación: " + player_score + ".Rival score: " + rival_score)
  // console.log("Priority: Player: "+ new_state.player_priority)
  //console.log("Rival: " + new_state.rival_priority)
  return (player_score-rival_score) + (new_state.player_priority-new_state.rival_priority)*9

}

function getAllRules(ruleSet){

  var importedRules = new Array()
  var rules = []
  for(let i=0;i<ruleSet[0].length;i++){
    if(ruleSet[0][i]=="StaticRookRules"){importedRules.push(require('./rules/OpeningRookRules/StaticRookRules.js').StaticRookRules)}
    if(ruleSet[0][i]=="RangingRookRules"){importedRules.push(require('./rules/OpeningRookRules/RangingRookRules.js').RangingRookRules)}
    if(ruleSet[0][i]=="Yagura"){importedRules.push(require('./rules/Castles/Yagura.js').Yagura)}
    if(ruleSet[0][i]=="Boat"){importedRules.push(require('./rules/Castles/Boat.js').Boat)}
    if(ruleSet[0][i]=="Mino"){importedRules.push(require('./rules/Castles/Mino.js').Mino)}
    if(ruleSet[0][i]=="PeerlessGold"){importedRules.push(require('./rules/Castles/PeerlessGold.js').PeerlessGold)}
  }
  importedRules.push(require('./rules/BasicRules.js').BasicRules)
  for(let i=0;i<importedRules.length;i++){
    for(let j=0;j<importedRules[i].length;j++){
      rules.push(importedRules[i][j])
    }
  }

  return rules
}


function getMaxScore(arr){
  var max = -1000000000000000000
  for (let h of arr){
    if(h>max){max = h}
  }  
  return max;
}
function getMinScore(arr){
  var min = 10000000000000000000
  for (let h of arr){
    if(h<min){min = h}
  }  
  return min;
}
function getMax(arr) {
  var max = 0
  for (let h of arr){
    if(h[0]>max){max = h[0]}
  }  
  return max;
}
function getMin(arr) {
  var min = 100000000000000000000
  for (let h of arr){
    if(h[0]<min){min = h[0]}
  }  
  return min;
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
      if(piece=="KING"){value=10000}

      if(piece=="AP"){value=4.2}
      if(piece=="AL"){value=6.3}
      if(piece=="AK"){value=6.4}
      if(piece=="AS"){value=6.7}
      if(piece=="AB"){value=11.5}
      if(piece=="AR"){value=13} 
  }

  return value
}