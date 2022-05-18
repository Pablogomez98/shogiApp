import {executeEngine,setRules} from './GameRBS.js' 
import {executeStrategyEngine} from './StrategyRBS.js' 
import { movePiece, revivePiece } from './Game.js'; 

var currentPlayer 
var depth = 4
export async function requestMoveAI(event){
  var client = event.currentTarget.parameter
  var state = client.getState()
  currentPlayer = state.ctx.currentPlayer
  /////Get rules -> Strategy//////
  var getRuleSet =  function func(){
    return new Promise((resolve ,reject)=>{
      getStrategy(state,function(result){
        resolve(result)
      });
      
    });
  };  
  let ruleSet = await getRuleSet();
  console.log("Rules: ")
  console.log(ruleSet)
  //////////Get rules//////

  var rules = getAllRules(ruleSet)
  ////Best move//////
  ////////////console.log("Primer nodo => ") 
  var first_node_promise =  function func(){
    return new Promise((resolve ,reject)=>{
      getMovesKBS(state,rules,function(result){
        resolve(result)
      });
      
    });
  };  
  let moves = await first_node_promise();
  moves.splice(2)
  //console.log("Moves: ") 
  //console.log(moves) 

  var count = 0
  var minmax_promise =  function func(){
    return new Promise((resolve ,reject)=>{
      getBestMove(moves,state,0,0,function(result){
        resolve(result)
      });
      
    });
  };  
  var bestmove = await minmax_promise();
  //console.log(bestmove)
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

async function getMovesKBS(state,rules,fn){
  //console.log("SBC cells: ");
  //console.log(state.G.cells);
  let resultKBS = ()=>{
    return new Promise((resolve,reject)=>{
      executeEngine(state,rules,function(result){
        resolve(result)
      });
    });
  };
  let moves = await resultKBS();
  console.log("Resultado del SBC: ");
  console.log(moves);
  //console.log(state.G.cells)
  fn(moves)


}

async function getBestMove(moves,state,node_depth,count,fn) {
  
  //console.log("////////MinMax////////")
  //////////////////////console.log("Nodo: " + node_depth+" "+count) 
  //const {parse, stringify} = require('flatted/cjs');
  //console.log()
  //console.log( state.G.cells)
  var possibleScores = [];
  var possibleMoves = [];

  //////////////////////CHANGE PLAYER////////////////////////
  /////////////////////////console.log("Jugador: " + state.ctx.currentPlayer + currentPlayer)
  let player = state.ctx.currentPlayer
  if(player=="0"){ player = "1"}
    else{ player = "0"}
  //console.log("Player now: " + player)
  ////////////////CREATE STATES//////////////////////////////
  var possibleStates = moves.map(function(el) {
    //console.log("Hijo " + count + " : ") 
    //count = count + 1
    //console.log(state.G.cells)
    const new_state = JSON.parse(JSON.stringify(state));
    //console.log(new_state.G.cells)
    //console.log(el)
    //console.log(new_state.ctx.currentPlayer)
    //console.log(new_state.G.cells)
    possibleMoves.push(el);

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
      new_state.G = revivePiece(new_state.G, new_state.ctx, row_target,column_target,state.ctx.currentPlayer.concat(piece));  
    }
    possibleScores.push(getHeuristic(new_state))
    new_state.ctx.currentPlayer = player
    return new_state;
  });
  ///////////////////////////////////////console.log("Todos los hijos de : "+ node_depth + " "+count)
  ///////////////////////////////////////////console.log(possibleStates);
  //console.log("Possible Scores: ")
  //console.log(possibleScores);


  //////////////CHECK STOP OR BOTTOM LEVEL////////////////////
  node_depth = node_depth +1
  //console.log("Depth: " + (depth-1))
  if (node_depth===depth){
    
    if(currentPlayer==player){//////////////////////////////console.log("Bottom node. Min heurístic: " + getMin(possibleScores)) ;
    return fn(getMin(possibleScores))}
    else{///////////////////////////////////console.log("Bottom node. Max heurístic: " + getMax(possibleScores)); 
    return fn(getMax(possibleScores))}
  }

   if (possibleMoves.length < 1) {
    console.log("NO MOVES")
    return -1;
  }

  //////////////////CREATE SONS  -  RECURSIVE///////////////////
  var heuristics = []
  
  
  let makeNodes = ()=>{
    return new Promise((resolve,reject)=>{
      possibleStates.forEach(async function (state, i) {
        /////////////////////////////////////console.log("A explorar hijo: " + i +" de " + (node_depth-1) + " "+ count)
        //console.log(node.G.cells)
       //node es cada estado <-
       /* let getMoveK = (node)=>{
          return new Promise((resolve,reject)=>{
            //console.log("lets get moves from player: " + node.ctx.currentPlayer)
            getMovesKBS(node,(res)=>{resolve(res);})
          })
        }
        let moves = await getMoveK(node)*/
        ////////////////get moves//////////////
        var first_node_promise =  function func(){
          return new Promise((resolve ,reject)=>{
            getMovesKBS(state,function(result){
              resolve(result)
              });
                
            });
          }; 
          let new_moves = await first_node_promise()
          new_moves.splice(2)
        //////////////Recursive Minmax////////////////
        let callMinmaxLoop = function func(){
          return new Promise((resolve,reject)=>{
            //console.log("lets loop " + depth)
            getBestMove(new_moves,state,node_depth,count,function(result){
              resolve(result)
            });
                
          });
        }; 
        var heur = await callMinmaxLoop()
        count = count + 1
        //console.log("Heur: " + bstmov)
        heuristics.push(heur)   
        resolve(heuristics)  
    });
    })
  }
  let heuristicas = await makeNodes()
  ///////////////////////////////////console.log("Heurísticas de : "+ (node_depth-1) + " "+ count)
  ///////////////////////////////////////console.log(heuristicas)
///////////////MINMAX BACKPROPAGATION -> FINAL///////////////////////
  if(node_depth== 1){
      var bestmov = possibleMoves[indexOfMax(heuristicas)];
      ////////////////////////////////console.log("FINAL MOVE: ")
      ////////////////////////////////console.log(bestmov)
      fn(bestmov)
  }
  else{///////////////////////////console.log("Navigatin through node " +currentPlayer+player )
    //fn(getMax(heuristics))}*/
    if(currentPlayer==player){///////////////////////////////////////console.log("Nav node de: "+ (node_depth-1) + " "+ count+". Min heurístic: " + getMin(heuristics)) ;
    return fn(getMin(heuristics))}
    else{///////////////////////////////////////console.log("Nav node de: "+ (node_depth-1) + " "+ count+". Max heurístic: " + getMax(heuristics)); 
    return fn(getMax(heuristics))}
  }
  
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
  //console.log("Resultado del SBC: ");
  //console.log(moves);
  //console.log(state.G.cells)
  fn(ruleSet)
}



///////////////////////
function getHeuristic(new_state){
 /* var gote_eaten = new_state.G.gote_captured_pieces
  var sente_eaten = new_state.G.sente_captured_pieces
  if(gote_eaten.length < sente_eaten.length){return -10000000}
  if(gote_eaten.length > sente_eaten.length){return 10000000}*/
  return Math.floor(Math.random() * (50 + 50)) ;
}
function getAllRules(ruleSet){
  var importedRules = new Array()
  var rules = []
  var statrul = require('./rules/OpeningRookRules/StaticRookRules.js')
  for(let i=0;i<ruleSet.length;i++){
    if(ruleSet[i]=="StaticRookRules"){importedRules.push(require('./rules/OpeningRookRules/StaticRookRules.js').StaticRookRules)}
    if(ruleSet[i]=="RangingRookRules"){importedRules.push(require('./rules/OpeningRookRules/RangingRookRules.js').RangingRookRules)}
  }
  importedRules.push(require('./rules/BasicRules.js').BasicRules)
  for(let i=0;i<importedRules.length;i++){
    for(let j=0;j<importedRules[i].length;j++){
      rules.push(importedRules[i][j])
    }
  }
  return rules
}

function indexOfMax(arr) {
  var max = arr.reduce(function(a,b) {
    return b > a ? b : a;   
  });
  return arr.indexOf(max);
}
function getMax(arr) {
  var max = arr.reduce(function(a,b) {
    return b > a ? b : a;   
  });
  
  return max;
}
function getMin(arr) {
  var max = arr.reduce(function(a,b) {
    return b < a ? b : a;   
  });
  
  return max;
}