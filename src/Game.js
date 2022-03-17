import { INVALID_MOVE } from 'boardgame.io/core';

export const Shogi = {

    setup: () => { 
      let cells = fillBoard();
      
      return {
        cells: cells,     
        sente_captured_pieces: [],
        gote_captured_pieces: [],
        sente_king_position: "04",
        gote_king_position: "84",
        
      }
    },
  
    turn: {
      minMoves: 1,
      maxMoves:1,   
    },

    moves: {
      movePiece: (G, ctx, initial_row,initial_column, target_row,target_column,player_piece,highlight=null) => {
        /////////////////////////// MOVIMIENTO //////////////////////////
        //console.log("Player: " + ctx.currentPlayer + " wants to move " + player_piece + " de " + initial_row+ " a " + target_row )
        let possible_cells = getPossibleCells(G.cells,initial_row,initial_column,ctx.currentPlayer.concat(player_piece))
        //console.log("Movimientos validos: " + possible_cells)

        var valid_move = false;
        var row = G.cells[initial_row];
        var new_row = G.cells[target_row];
        var capture = false;
        var target_piece 

        for(let valid of possible_cells){
          let valid_row = valid.substr(0,1)
          let valid_column = valid.substr(1,2)
          if(valid_row==target_row && valid_column==target_column){
            valid_move = true;
            //quitar pieza
            row[initial_column]=null;
            G.cells[initial_row] = row;
            //poner pieza
            if(new_row[target_column]!=null){
              capture = true; 
              if(new_row[target_column].substr(1,1)=="A"){target_piece=new_row[target_column].substr(2,2)}
              else{target_piece=new_row[target_column].substr(1,2)}
            }
            new_row[target_column] = ctx.currentPlayer.concat(player_piece)
            if(capture){
                if(ctx.currentPlayer=="0"){G.sente_captured_pieces.push(target_piece)}
                else{G.gote_captured_pieces.push(target_piece)}
            }
            break;
          }
        }
        if(valid_move == false){return INVALID_MOVE}
        /////////////////////////// MOVIMIENTO REY //////////////////////////
        if(player_piece=="KING"){
          if(ctx.currentPlayer=="0"){
            G.sente_king_position = target_row.toString().concat(target_column)
          }
          if(ctx.currentPlayer=="1"){
            G.gote_king_position = target_row.toString().concat(target_column)
          }
        }
        ////////////////////////////////////////////////////////////////////

        /////////////////////////CHECK SITUATION/////////////////////////
        let still_check = true        
          if(ctx.currentPlayer=="0"){still_check = isCheck(G,"1")} 
          if(ctx.currentPlayer=="1"){still_check = isCheck(G,"0")}
          if(still_check){return INVALID_MOVE}      
        ////////////////////////////////////////////////////////////////    

        /////////////////////////// PROMOCIÓN //////////////////////////////
        let arised_piece = player_piece.substr(0,1);
        if(   ((target_row>=6 && ctx.currentPlayer==0) || (target_row<=2 && ctx.currentPlayer==1) 
              || (initial_row>=6 && ctx.currentPlayer==0) || (initial_row<=2 && ctx.currentPlayer==1))
              && (player_piece!="KING" && player_piece!="G" && arised_piece!="A")
          ){ 
            arisePiece(G,ctx.currentPlayer.concat(player_piece),target_row,target_column);
          /*if (confirm("Arise piece?")) {
            arisePiece(G,ctx.currentPlayer.concat(player_piece),target_row,target_column);
          }*/
        }
        ///////////////////////////////////////////////////////////////////
        if(highlight!=null){highlight.className = "cell";}

        
      },
      revivePiece: (G, ctx, target_row,target_column,player_piece,highlight=None) => {
        /////////////////////////// MOVIMIENTO //////////////////////////
        let possible_cells = getPossibleRevive(G.cells,player_piece)
        var valid_move = false;
        var new_row = G.cells[target_row];

        for(let valid of possible_cells){
          let valid_row = valid.substr(0,1)
          let valid_column = valid.substr(1,2)
          if(valid_row==target_row && valid_column==target_column){
            valid_move = true;
            //poner pieza
            new_row[target_column] = player_piece
            break;
          }
        }
        if(valid_move == false){return INVALID_MOVE}
        ////////////////////////TAKE OUT FROM CAPTURED PIECES///////////
          if(ctx.currentPlayer=="0"){
            const index = G.sente_captured_pieces.indexOf(player_piece.substr(1,4));
            if(index<0){return INVALID_MOVE}
            G.sente_captured_pieces.splice(index, 1); 
          }
          if(ctx.currentPlayer=="1"){
            const index = G.gote_captured_pieces.indexOf(player_piece.substr(1,4));
            if(index<0){return INVALID_MOVE}
            G.gote_captured_pieces.splice(index, 1);
          }
        ////////////////////////////////////////////////////////////////

        /////////////////////////CHECK SITUATION/////////////////////////
        let still_check = true        
          if(ctx.currentPlayer=="0"){still_check = isCheck(G,"1")} 
          if(ctx.currentPlayer=="1"){still_check = isCheck(G,"0")}
          if(still_check){return INVALID_MOVE}      
        ////////////////////////////////////////////////////////////////    
        isCheck(G,ctx.currentPlayer)
        highlight.className = "cell";
      }
    
    },

    ai: {
      enumerate: (G, ctx) => {
        let moves = [];
        var possible_moves = []
        for (let [row_id,row] of G.cells.entries()){
          for (let [column_id,piece] of row.entries()){
            if(piece !=null && piece.substr(0,1)==ctx.currentPlayer){
              possible_moves = getPossibleCells(G.cells,row_id,column_id,piece)
              if(possible_moves!=null && possible_moves.length>0){
                for(let move of possible_moves){
                  //console.log("Mando..." + row_id + " " + column_id + " a " + move + " y mando " + piece.substr(1,4))
                  moves.push({move: 'movePiece', args: [row_id,column_id,move.substr(0,1),move.substr(1,2),piece.substr(1,4)]})
                }
              }
            }
          }
        }
        return moves;
      },
    },

    endIf: (G,ctx)=> {
      if(isCheckMate(G,ctx)){
        //alert("¡FIN! GANADOR: " + ctx.currentPlayer)
        return { winner: ctx.currentPlayer };
      }
    }
  };


  //////////------------PIECES------------//////////

  const pieces = {
    GOTE_KING: '1KING',
    GOTE_GOLDEN_GENERAL: '1G',
    GOTE_SILVER_GENERAL: '1S',
    GOTE_KNIGHT: '1K',
    GOTE_LANCE: '1L',
    GOTE_BISHOP: '1B',
    GOTE_ROOK:'1R',
    GOTE_PAWN: '1P',

    SENTE_KING: '0KING',
    SENTE_GOLDEN_GENERAL: '0G',
    SENTE_SILVER_GENERAL: '0S',
    SENTE_KNIGHT: '0K',
    SENTE_LANCE: '0L',
    SENTE_BISHOP: '0B',
    SENTE_ROOK:'0R',
    SENTE_PAWN: '0P',


    ARISED_GOTE_SILVER_GENERAL: '1AS',
    ARISED_GOTE_KNIGHT: '1AK',
    ARISED_GOTE_LANCE: '1AL',
    ARISED_GOTE_BISHOP: '1AB',
    ARISED_GOTE_ROOK:'1AR',
    ARISED_GOTE_PAWN: '1AP',

    ARISED_SENTE_SILVER_GENERAL: '0AS',
    ARISED_SENTE_KNIGHT: '0AK',
    ARISED_SENTE_LANCE: '0AL',
    ARISED_SENTE_BISHOP: '0AB',
    ARISED_SENTE_ROOK:'0AR',
    ARISED_SENTE_PAWN: '0AP'
};
  //////////------------FUNCTIONS------------//////////
  function fillBoard(){
    let board = new Array(9).fill(null);
    var tablero = new Array(9).fill(null);
    for(let i=0;i<9;i++){
      board[i] = new Array(9).fill(null);
      tablero[i] = new Array(9).fill(null);
      for(let j=0;j<9;j++){
        if(i==2){board[i][j] = pieces.SENTE_PAWN; } 
        if(i==6){board[i][j]= pieces.GOTE_PAWN;}

        if(i==0){
          if(j==0 || j==8){board[i][j]= pieces.SENTE_LANCE}
          if(j==1 || j==7){board[i][j]= pieces.SENTE_KNIGHT}
          if(j==2 ||j==6){board[i][j]= pieces.SENTE_SILVER_GENERAL}
          if(j==3 ||j==5){board[i][j]= pieces.SENTE_GOLDEN_GENERAL}
          if(j==4){board[i][j]= pieces.SENTE_KING}
        }
        if(i==8){
          if(j==0 || j==8){board[i][j]= pieces.GOTE_LANCE}
          if(j==1 || j==7){board[i][j]= pieces.GOTE_KNIGHT}
          if(j==2 ||j==6){board[i][j]= pieces.GOTE_SILVER_GENERAL}
          if(j==3 ||j==5){board[i][j]= pieces.GOTE_GOLDEN_GENERAL}
          if(j==4){board[i][j]= pieces.GOTE_KING}
        }

        if(i==1){if(j==1){board[i][j]=pieces.SENTE_ROOK}if(j==7){board[i][j]=pieces.SENTE_BISHOP}}
        if(i==7){if(j==1){board[i][j]=pieces.GOTE_BISHOP}if(j==7){board[i][j]=pieces.GOTE_ROOK}}        
      }

    }
    return board;

  }

  function arisePiece(G,player_and_piece,target_row,target_column){
    var new_row = G.cells[target_row];
    var player = player_and_piece.substr(0,1)
    var player_piece = player_and_piece.substr(1,4)
    if(player=="0"){
      if(player_piece=="S"){new_row[target_column]=pieces.ARISED_SENTE_SILVER_GENERAL}
      else if(player_piece=="K"){new_row[target_column]=pieces.ARISED_SENTE_KNIGHT}
      else if(player_piece=="L"){new_row[target_column]=pieces.ARISED_SENTE_LANCE}
      else if(player_piece=="B"){new_row[target_column]=pieces.ARISED_SENTE_BISHOP}
      else if(player_piece=="R"){new_row[target_column]=pieces.ARISED_SENTE_ROOK}
      else if(player_piece=="P"){new_row[target_column]=pieces.ARISED_SENTE_PAWN}
    }
    else{
      if(player_piece=="S"){new_row[target_column]=pieces.ARISED_GOTE_SILVER_GENERAL}
      else if(player_piece=="K"){new_row[target_column]=pieces.ARISED_GOTE_KNIGHT}
      else if(player_piece=="L"){new_row[target_column]=pieces.ARISED_GOTE_LANCE}
      else if(player_piece=="B"){new_row[target_column]=pieces.ARISED_GOTE_BISHOP}
      else if(player_piece=="R"){new_row[target_column]=pieces.ARISED_GOTE_ROOK}
      else if(player_piece=="P"){new_row[target_column]=pieces.ARISED_GOTE_PAWN}
    }
  }
  export function getPossibleCells(cells,row_id,column_id,piece){
    if(piece.substr(0,1)=="0"){return getPossibleCellsSente(cells,row_id,column_id,piece)}
    if(piece.substr(0,1)=="1"){return getPossibleCellsGote(cells,row_id,column_id,piece)}

  }
  function getPossibleCellsSente(cells,row_id,column_id,piece){
    var possible_cells = [];
    var row = 0;
    piece = piece.substr(1,4)
 
        if(piece=="P"){ 
          let next_row = cells[row_id+1];
          if(row_id<8 && (next_row[column_id]==null || next_row[column_id].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id);
            possible_cells.push(possible_cell)
          } 
        }  
        else if(piece=="L"){
          var stop = false
              for(let i=row_id+1;i<9;i++){
                row = cells[i];
                if(!stop && (row[column_id]==null || row[column_id].substr(0,1)=="1")){
                  let possible_cell = i.toString().concat(column_id);
                  possible_cells.push(possible_cell)
                  if(row[column_id]!=null && row[column_id].substr(0,1)=="1"){stop=true}
                }
                else{break;}
              }
        }
        else if(piece=="K"){
          row = cells[row_id+2];
          if(row_id<7){
            if((row[column_id+1]==null || row[column_id+1].substr(0,1)=="1") && column_id<8 ){
              let possible_cell = (row_id+2).toString().concat(column_id+1);
              possible_cells.push(possible_cell)        
             }
            if((row[column_id-1]==null || row[column_id-1].substr(0,1)=="1") && (column_id-1)>=0 ){
              let possible_cell = (row_id+2).toString().concat(column_id-1);
              possible_cells.push(possible_cell)
             }
          }
         
         
        }
        else if(piece=="G" || piece=="AP" || piece=="AL"  || piece=="AK" || piece=="AS"){
            row = cells[row_id-1];
            if(row_id>0 && (row[column_id]==null || row[column_id].substr(0,1)=="1")){
              let possible_cell = (row_id-1).toString().concat(column_id);
              possible_cells.push(possible_cell)
            } 
            row = cells[row_id];
            if(column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
              let possible_cell = (row_id).toString().concat(column_id-1);
              possible_cells.push(possible_cell)
            }
            if(column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
              let possible_cell = (row_id).toString().concat(column_id+1);
              possible_cells.push(possible_cell)
            }
            
            row = cells[row_id+1];
            if(row_id<8 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
              let possible_cell = (row_id+1).toString().concat(column_id-1);
              possible_cells.push(possible_cell)
            }
            if(row_id<8 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
              let possible_cell = (row_id+1).toString().concat(column_id+1);
              possible_cells.push(possible_cell)
            }
            if(row_id<8 && (row[column_id]==null || row[column_id].substr(0,1)=="1")){
              let possible_cell = (row_id+1).toString().concat(column_id);
              possible_cells.push(possible_cell)
            }
        }
        else if(piece=="S"){
          row = cells[row_id-1];
          if(row_id>0  && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
            let possible_cell = (row_id-1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
          if(row_id>0 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
            let possible_cell = (row_id-1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
          
          row = cells[row_id+1];
          if(row_id<8 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
          if(row_id<8 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
          if(row_id<8 && (row[column_id]==null || row[column_id].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
        }
        else if(piece=="KING"){
          row = cells[row_id-1];
          if(row_id>0 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
            let possible_cell = (row_id-1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
          }
          if(row_id>0 && (row[column_id]==null || row[column_id].substr(0,1)=="1")){
            let possible_cell = (row_id-1).toString().concat(column_id);
            possible_cells.push(possible_cell)
          }
          if(row_id>0 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
            let possible_cell = (row_id-1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
          }
          
          row = cells[row_id];
          if(column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
            let possible_cell = (row_id).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
          }
          if(column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
            let possible_cell = (row_id).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
          }

          row = cells[row_id+1];
          if(row_id<8 && (row[column_id]==null || row[column_id].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id);
            possible_cells.push(possible_cell)
          }
          if(row_id<8 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
          }
          if(row_id<8 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
          }
        }
        else if(piece=="R"){
          var actual_row = cells[row_id]
          var back_row
          var front_row
          var right_stop = false
          var left_stop = false
          var back_stop = false
          var front_stop = false
          for(let i=1;i<9;i++){
                if(!right_stop && (column_id-i)>=0 && (actual_row[column_id-i]==null || actual_row[column_id-i].substr(0,1)=="1")){
                  let possible_cell = row_id.toString().concat(column_id-i);
                  possible_cells.push(possible_cell)
                  //console.log("Rook move 1: " + possible_cell);
                }  
                if(!left_stop && (column_id+i)<=8 && (actual_row[column_id+i]==null || actual_row[column_id+i].substr(0,1)=="1") ){
                  let possible_cell = row_id.toString().concat(column_id+i);
                  possible_cells.push(possible_cell)
                  //console.log("Rook move 2: " + possible_cell);
                } 
                if(!right_stop && (column_id-i)>=0 && actual_row[column_id-i]!=null && (actual_row[column_id-i].substr(0,1)=="0" || actual_row[column_id-i].substr(0,1)=="1")){right_stop=true} 
                if(!left_stop && (column_id+i)<=8 && actual_row[column_id+i]!=null && (actual_row[column_id+i].substr(0,1)=="0" || actual_row[column_id+i].substr(0,1)=="1")){left_stop=true} 
                
                back_row = cells[row_id-i]
                front_row = cells[row_id+i]
                if(!back_stop && (row_id-i)>=0 && (back_row[column_id]==null || back_row[column_id].substr(0,1)=="1")){
                  let possible_cell = (row_id-i).toString().concat(column_id);
                  possible_cells.push(possible_cell)
                 // console.log("Rook move 3: " + possible_cell);
                }  
                if(!front_stop && (row_id+i)<=8 && (front_row[column_id]==null || front_row[column_id].substr(0,1)=="1") ){
                  let possible_cell = (row_id+i).toString().concat(column_id);
                  possible_cells.push(possible_cell)
                  //console.log("Rook move 4: " + possible_cell);
                } 
                if(!back_stop && (row_id-i)>=0 && back_row[column_id]!=null &&  (back_row[column_id].substr(0,1)=="0" || back_row[column_id].substr(0,1)=="1")){back_stop=true} 
                if(!front_stop && (row_id+i)<=8 && front_row[column_id]!=null && (front_row[column_id].substr(0,1)=="0" || front_row[column_id].substr(0,1)=="1")){front_stop=true} 

          }
        }
        else if(piece=="B"){
          var back_row = cells[row_id]
          var front_row = cells[row_id]

          var back_right_stop = false
          var back_left_stop = false
          var front_right_stop = false
          var front_left_stop = false
          for(let i=1;i<10;i++){
            back_row = cells[row_id-i]
            front_row = cells[row_id+i]
            //back_right
              if(!back_right_stop && back_row!=null && (column_id+i)<9 && (back_row[column_id+i]==null || back_row[column_id+i].substr(0,1)=="1")){
                  let possible_cell = (row_id-i).toString().concat(column_id+i);
                  possible_cells.push(possible_cell)
                  //console.log("Bishop move 1: " + possible_cell);
              }  
              if(!back_right_stop &&  back_row!=null && (column_id+i)<9 && back_row[column_id+i]!=null &&(back_row[column_id+i].substr(0,1)=="0" || back_row[column_id+i].substr(0,1)=="1")){back_right_stop=true} 
            
            //back left
              if(!back_left_stop && back_row!=null && (column_id-i)>=0 && (back_row[column_id-i]==null || back_row[column_id-i].substr(0,1)=="1")){
                  let possible_cell = (row_id-i).toString().concat(column_id-i);
                  possible_cells.push(possible_cell)
                  //console.log("Bishop move 2: " + possible_cell);
              } 
              if(!back_left_stop && back_row!=null && (column_id-i)>=0 && back_row[column_id-i]!=null  &&  (back_row[column_id-i].substr(0,1)=="0" || back_row[column_id-i].substr(0,1)=="1")){back_left_stop=true} 

            //front right
              if(!front_right_stop && front_row!=null && (column_id+i)<9 && (front_row[column_id+i]==null || front_row[column_id+i].substr(0,1)=="1")){
                let possible_cell = (row_id+i).toString().concat(column_id+i);
                possible_cells.push(possible_cell)
                //console.log("Bishop move 3: " + possible_cell);
              } 
              if(!front_right_stop && front_row!=null && (column_id+i)<9 && front_row[column_id+i]!=null &&  (front_row[column_id+i].substr(0,1)=="0" || front_row[column_id+i].substr(0,1)=="1")){front_right_stop=true} 

            //front left  
              if(!front_left_stop && front_row!=null && (column_id-i)>=0 && (front_row[column_id-i]==null || front_row[column_id-i].substr(0,1)=="1")){
                let possible_cell = (row_id+i).toString().concat(column_id-i);
                possible_cells.push(possible_cell)
                //console.log("Bishop move 4: " + possible_cell);
              } 
              if(!front_left_stop && front_row!=null && (column_id-i)>=0 && front_row[column_id-i]!=null &&   (front_row[column_id-i].substr(0,1)=="0" || front_row[column_id-i].substr(0,1)=="1")){front_left_stop=true} 

            
          }
          
        }
        else if(piece=="AB"){
          var back_row = cells[row_id]
          var front_row = cells[row_id]

          var back_right_stop = false
          var back_left_stop = false
          var front_right_stop = false
          var front_left_stop = false
          for(let i=1;i<10;i++){
            back_row = cells[row_id-i]
            front_row = cells[row_id+i]
            //back_right
              if(!back_right_stop && back_row!=null && (column_id+i)<9 && (back_row[column_id+i]==null || back_row[column_id+i].substr(0,1)=="1")){
                  let possible_cell = (row_id-i).toString().concat(column_id+i);
                  possible_cells.push(possible_cell)
                  //console.log("Semental move 1: " + possible_cell);
              }  
              if(!back_right_stop &&  back_row!=null && (column_id+i)<9 && back_row[column_id+i]!=null &&(back_row[column_id+i].substr(0,1)=="0" || back_row[column_id+i].substr(0,1)=="1")){back_right_stop=true} 
            
            //back left
              if(!back_left_stop && back_row!=null && (column_id-i)>=0 && (back_row[column_id-i]==null || back_row[column_id-i].substr(0,1)=="1")){
                  let possible_cell = (row_id-i).toString().concat(column_id-i);
                  possible_cells.push(possible_cell)
                  //console.log("Semental move 2: " + possible_cell);
              } 
              if(!back_left_stop && back_row!=null && (column_id-i)>=0 && back_row[column_id-i]!=null  &&  (back_row[column_id-i].substr(0,1)=="0" || back_row[column_id-i].substr(0,1)=="1")){back_left_stop=true} 

            //front right
              if(!front_right_stop && front_row!=null && (column_id+i)<9 && (front_row[column_id+i]==null || front_row[column_id+i].substr(0,1)=="1")){
                let possible_cell = (row_id+i).toString().concat(column_id+i);
                possible_cells.push(possible_cell)
                //console.log("Semental move 3: " + possible_cell);
              } 
              if(!front_right_stop && front_row!=null && (column_id+i)<9 && front_row[column_id+i]!=null &&  (front_row[column_id+i].substr(0,1)=="0" || front_row[column_id+i].substr(0,1)=="1")){front_right_stop=true} 

            //front left  
              if(!front_left_stop && front_row!=null && (column_id-i)>=0 && (front_row[column_id-i]==null || front_row[column_id-i].substr(0,1)=="1")){
                let possible_cell = (row_id+i).toString().concat(column_id-i);
                possible_cells.push(possible_cell)
                //console.log("Semental move 4: " + possible_cell);
              } 
              if(!front_left_stop && front_row!=null && (column_id-i)>=0 && front_row[column_id-i]!=null &&   (front_row[column_id-i].substr(0,1)=="0" || front_row[column_id-i].substr(0,1)=="1")){front_left_stop=true} 
          }

          row = cells[row_id-1];
          if(row_id>0 && (row[column_id]==null || row[column_id].substr(0,1)=="1")){
            let possible_cell = (row_id-1).toString().concat(column_id);
            possible_cells.push(possible_cell)
            //console.log("Semental move 1.2: " + possible_cell);
          }
          
          row = cells[row_id];
          if(column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
            let possible_cell = (row_id).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Semental move 1.4: " + possible_cell);
          }
          if(column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
            let possible_cell = (row_id).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Semental move 1.5: " + possible_cell);
          }

          row = cells[row_id+1];
          if(row_id<8 && (row[column_id]==null || row[column_id].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id);
            possible_cells.push(possible_cell)
            //console.log("Semental move 1.7: " + possible_cell);
          }


        }
        else if(piece=="AR"){ 
          var actual_row = cells[row_id]
          var back_row
          var front_row
          var right_stop = false
          var left_stop = false
          var back_stop = false
          var front_stop = false
          for(let i=1;i<9;i++){
                if(!right_stop && (column_id-i)>=0 && (actual_row[column_id-i]==null || actual_row[column_id-i].substr(0,1)=="1")){
                  let possible_cell = row_id.toString().concat(column_id-i);
                  possible_cells.push(possible_cell)
                  //console.log("Dragon move 1: " + possible_cell);
                }  
                if(!left_stop && (column_id+i)<=8 && (actual_row[column_id+i]==null || actual_row[column_id+i].substr(0,1)=="1") ){
                  let possible_cell = row_id.toString().concat(column_id+i);
                  possible_cells.push(possible_cell)
                  //console.log("Dragon move 2: " + possible_cell);
                } 
                if(!right_stop && (column_id-i)>=0 && actual_row[column_id-i]!=null && (actual_row[column_id-i].substr(0,1)=="0" || actual_row[column_id-i].substr(0,1)=="1")){right_stop=true} 
                if(!left_stop && (column_id+i)<=8 && actual_row[column_id+i]!=null && (actual_row[column_id+i].substr(0,1)=="0" || actual_row[column_id+i].substr(0,1)=="1")){left_stop=true} 
                
                back_row = cells[row_id-i]
                front_row = cells[row_id+i]
                if(!back_stop && (row_id-i)>=0 && (back_row[column_id]==null || back_row[column_id].substr(0,1)=="1")){
                  let possible_cell = (row_id-i).toString().concat(column_id);
                  possible_cells.push(possible_cell)
                  //console.log("Dragon move 3: " + possible_cell);
                }  
                if(!front_stop && (row_id+i)<=8 && (front_row[column_id]==null || front_row[column_id].substr(0,1)=="1") ){
                  let possible_cell = (row_id+i).toString().concat(column_id);
                  possible_cells.push(possible_cell)
                  //console.log("Dragon move 4: " + possible_cell);
                } 
                if(!back_stop && (row_id-i)>=0 && back_row[column_id]!=null &&  (back_row[column_id].substr(0,1)=="0" || back_row[column_id].substr(0,1)=="1")){back_stop=true} 
                if(!front_stop && (row_id+i)<=8 && front_row[column_id]!=null && (front_row[column_id].substr(0,1)=="0" || front_row[column_id].substr(0,1)=="1")){front_stop=true} 

          }
          row = cells[row_id-1];
          if(row_id>0 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
            let possible_cell = (row_id-1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Dragon move 1.1: " + possible_cell);
          }
          
          if(row_id>0 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
            let possible_cell = (row_id-1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Dragon move 1.2: " + possible_cell);
          }

          row = cells[row_id+1];
          if(row_id<8 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Dragon move 1.4: " + possible_cell);
          }
          if(row_id<8 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="1")){
            let possible_cell = (row_id+1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Dragon move 1.3: " + possible_cell);
          }
        }
        return possible_cells;
  }
  function getPossibleCellsGote(cells,row_id,column_id,piece){
    var possible_cells = [];
    var row = 0;
    piece = piece.substr(1,4)
        if(piece=="P"){ 
          let next_row = cells[row_id-1];
          if(row_id>0 && (next_row[column_id]==null || next_row[column_id].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id);
            possible_cells.push(possible_cell)
            //console.log("Pawn moves to: " + possible_cell)
          }
           
          
        }  
        else if(piece=="L"){
          var stop = false
              for(let i=row_id-1;i>=0;i--){
                row = cells[i];
                if(!stop && (row[column_id]==null || row[column_id].substr(0,1)=="0")){
                  let possible_cell = i.toString().concat(column_id);
                  possible_cells.push(possible_cell)
                  if(row[column_id]!=null && row[column_id].substr(0,1)=="0"){stop=true}
                  //console.log("Lance moves to: " + possible_cell)
                }
                else{break;}
              }
        }
        else if(piece=="K"){
          row = cells[row_id-2];
          if(row_id>1){
            if((row[column_id+1]==null || row[column_id+1].substr(0,1)=="0") && column_id<8 ){
              let possible_cell = (row_id-2).toString().concat(column_id+1);
              possible_cells.push(possible_cell)  
              //console.log("Knight moves to: " + possible_cell)      
             }
            if((row[column_id-1]==null || row[column_id-1].substr(0,1)=="0") && (column_id-1)>=0 ){
              let possible_cell = (row_id-2).toString().concat(column_id-1);
              possible_cells.push(possible_cell)
              //console.log("Knight moves to: " + possible_cell)
             }
          }
         
         
        }
        else if(piece=="G" || piece=="AP" || piece=="AL"  || piece=="AK" || piece=="AS"){
            row = cells[row_id+1];
            if(row_id<8 && (row[column_id]==null || row[column_id].substr(0,1)=="0")){
              let possible_cell = (row_id+1).toString().concat(column_id);
              possible_cells.push(possible_cell)
              //console.log("G moves to: " + possible_cell)
            } 
            row = cells[row_id];
            if(column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
              let possible_cell = (row_id).toString().concat(column_id-1);
              possible_cells.push(possible_cell)
            }
            if(column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
              let possible_cell = (row_id).toString().concat(column_id+1);
              possible_cells.push(possible_cell)
            }
            
            row = cells[row_id-1];
            if(row_id>0 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
              let possible_cell = (row_id-1).toString().concat(column_id-1);
              possible_cells.push(possible_cell)
            }
            if(row_id>0 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
              let possible_cell = (row_id-1).toString().concat(column_id+1);
              possible_cells.push(possible_cell)
            }
            if(row_id>0 && (row[column_id]==null || row[column_id].substr(0,1)=="0")){
              let possible_cell = (row_id-1).toString().concat(column_id);
              possible_cells.push(possible_cell)
            }
        }
        else if(piece=="S"){
          row = cells[row_id+1];
          if(row_id<8  && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
            let possible_cell = (row_id+1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
          if(row_id<8 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
            let possible_cell = (row_id+1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
          
          row = cells[row_id-1];
          if(row_id>0 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
          if(row_id>0 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
          if(row_id>0 && (row[column_id]==null || row[column_id].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id);
            possible_cells.push(possible_cell)
            //console.log("Silver move: " + possible_cell);
          }
        }
        else if(piece=="KING"){
          row = cells[row_id-1];
          if(row_id>0 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
          }
          if(row_id>0 && (row[column_id]==null || row[column_id].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id);
            possible_cells.push(possible_cell)
          }
          if(row_id>0 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
          }
          
          row = cells[row_id];
          if(column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
            let possible_cell = (row_id).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
          }
          if(column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
            let possible_cell = (row_id).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
          }

          row = cells[row_id+1];
          if(row_id<8 && (row[column_id]==null || row[column_id].substr(0,1)=="0")){
            let possible_cell = (row_id+1).toString().concat(column_id);
            possible_cells.push(possible_cell)
          }
          if(row_id<8 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
            let possible_cell = (row_id+1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
          }
          if(row_id<8 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
            let possible_cell = (row_id+1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
          }
        }
        else if(piece=="R"){
          var actual_row = cells[row_id]
          var back_row
          var front_row
          var right_stop = false
          var left_stop = false
          var back_stop = false
          var front_stop = false
          for(let i=1;i<9;i++){
                if(!right_stop && (column_id-i)>=0 && (actual_row[column_id-i]==null || actual_row[column_id-i].substr(0,1)=="0")){
                  let possible_cell = row_id.toString().concat(column_id-i);
                  possible_cells.push(possible_cell)
                  //console.log("Rook move 1: " + possible_cell);
                }  
                if(!left_stop && (column_id+i)<=8 && (actual_row[column_id+i]==null || actual_row[column_id+i].substr(0,1)=="0") ){
                  let possible_cell = row_id.toString().concat(column_id+i);
                  possible_cells.push(possible_cell)
                  //console.log("Rook move 2: " + possible_cell);
                } 
                if(!right_stop && (column_id-i)>=0 && actual_row[column_id-i]!=null && (actual_row[column_id-i].substr(0,1)=="0" || actual_row[column_id-i].substr(0,1)=="1")){right_stop=true} 
                if(!left_stop && (column_id+i)<=8 && actual_row[column_id+i]!=null && (actual_row[column_id+i].substr(0,1)=="0" || actual_row[column_id+i].substr(0,1)=="1")){left_stop=true} 
                
                back_row = cells[row_id-i]
                front_row = cells[row_id+i]
                if(!back_stop && (row_id-i)>=0 && (back_row[column_id]==null || back_row[column_id].substr(0,1)=="0")){
                  let possible_cell = (row_id-i).toString().concat(column_id);
                  possible_cells.push(possible_cell)
                 // console.log("Rook move 3: " + possible_cell);
                }  
                if(!front_stop && (row_id+i)<=8 && (front_row[column_id]==null || front_row[column_id].substr(0,1)=="0") ){
                  let possible_cell = (row_id+i).toString().concat(column_id);
                  possible_cells.push(possible_cell)
                  //console.log("Rook move 4: " + possible_cell);
                } 
                if(!back_stop && (row_id-i)>=0 && back_row[column_id]!=null &&  (back_row[column_id].substr(0,1)=="0" || back_row[column_id].substr(0,1)=="1")){back_stop=true} 
                if(!front_stop && (row_id+i)<=8 && front_row[column_id]!=null && (front_row[column_id].substr(0,1)=="0" || front_row[column_id].substr(0,1)=="1")){front_stop=true} 

          }
        }
        else if(piece=="B"){
          var back_row = cells[row_id]
          var front_row = cells[row_id]

          var back_right_stop = false
          var back_left_stop = false
          var front_right_stop = false
          var front_left_stop = false
          for(let i=1;i<10;i++){
            back_row = cells[row_id-i]
            front_row = cells[row_id+i]
            //back_right
              if(!back_right_stop && back_row!=null && (column_id+i)<9 && (back_row[column_id+i]==null || back_row[column_id+i].substr(0,1)=="0")){
                  let possible_cell = (row_id-i).toString().concat(column_id+i);
                  possible_cells.push(possible_cell)
                  //console.log("Bishop move 1: " + possible_cell);
              }  
              if(!back_right_stop &&  back_row!=null && (column_id+i)<9 && back_row[column_id+i]!=null &&(back_row[column_id+i].substr(0,1)=="0" || back_row[column_id+i].substr(0,1)=="1")){back_right_stop=true} 
            
            //back left
              if(!back_left_stop && back_row!=null && (column_id-i)>=0 && (back_row[column_id-i]==null || back_row[column_id-i].substr(0,1)=="0")){
                  let possible_cell = (row_id-i).toString().concat(column_id-i);
                  possible_cells.push(possible_cell)
                  //console.log("Bishop move 2: " + possible_cell);
              } 
              if(!back_left_stop && back_row!=null && (column_id-i)>=0 && back_row[column_id-i]!=null  &&  (back_row[column_id-i].substr(0,1)=="0" || back_row[column_id-i].substr(0,1)=="1")){back_left_stop=true} 

            //front right
              if(!front_right_stop && front_row!=null && (column_id+i)<9 && (front_row[column_id+i]==null || front_row[column_id+i].substr(0,1)=="0")){
                let possible_cell = (row_id+i).toString().concat(column_id+i);
                possible_cells.push(possible_cell)
                //console.log("Bishop move 3: " + possible_cell);
              } 
              if(!front_right_stop && front_row!=null && (column_id+i)<9 && front_row[column_id+i]!=null &&  (front_row[column_id+i].substr(0,1)=="0" || front_row[column_id+i].substr(0,1)=="1")){front_right_stop=true} 

            //front left  
              if(!front_left_stop && front_row!=null && (column_id-i)>=0 && (front_row[column_id-i]==null || front_row[column_id-i].substr(0,1)=="0")){
                let possible_cell = (row_id+i).toString().concat(column_id-i);
                possible_cells.push(possible_cell)
                //console.log("Bishop move 4: " + possible_cell);
              } 
              if(!front_left_stop && front_row!=null && (column_id-i)>=0 && front_row[column_id-i]!=null &&   (front_row[column_id-i].substr(0,1)=="0" || front_row[column_id-i].substr(0,1)=="1")){front_left_stop=true} 

            
          }
          
        }
        else if(piece=="AB"){
          var back_row = cells[row_id]
          var front_row = cells[row_id]

          var back_right_stop = false
          var back_left_stop = false
          var front_right_stop = false
          var front_left_stop = false
          for(let i=1;i<10;i++){
            back_row = cells[row_id-i]
            front_row = cells[row_id+i]
            //back_right
              if(!back_right_stop && back_row!=null && (column_id+i)<9 && (back_row[column_id+i]==null || back_row[column_id+i].substr(0,1)=="0")){
                  let possible_cell = (row_id-i).toString().concat(column_id+i);
                  possible_cells.push(possible_cell)
                  //console.log("Semental move 1: " + possible_cell);
              }  
              if(!back_right_stop &&  back_row!=null && (column_id+i)<9 && back_row[column_id+i]!=null &&(back_row[column_id+i].substr(0,1)=="0" || back_row[column_id+i].substr(0,1)=="1")){back_right_stop=true} 
            
            //back left
              if(!back_left_stop && back_row!=null && (column_id-i)>=0 && (back_row[column_id-i]==null || back_row[column_id-i].substr(0,1)=="0")){
                  let possible_cell = (row_id-i).toString().concat(column_id-i);
                  possible_cells.push(possible_cell)
                  //console.log("Semental move 2: " + possible_cell);
              } 
              if(!back_left_stop && back_row!=null && (column_id-i)>=0 && back_row[column_id-i]!=null  &&  (back_row[column_id-i].substr(0,1)=="0" || back_row[column_id-i].substr(0,1)=="1")){back_left_stop=true} 

            //front right
              if(!front_right_stop && front_row!=null && (column_id+i)<9 && (front_row[column_id+i]==null || front_row[column_id+i].substr(0,1)=="0")){
                let possible_cell = (row_id+i).toString().concat(column_id+i);
                possible_cells.push(possible_cell)
                //console.log("Semental move 3: " + possible_cell);
              } 
              if(!front_right_stop && front_row!=null && (column_id+i)<9 && front_row[column_id+i]!=null &&  (front_row[column_id+i].substr(0,1)=="0" || front_row[column_id+i].substr(0,1)=="1")){front_right_stop=true} 

            //front left  
              if(!front_left_stop && front_row!=null && (column_id-i)>=0 && (front_row[column_id-i]==null || front_row[column_id-i].substr(0,1)=="0")){
                let possible_cell = (row_id+i).toString().concat(column_id-i);
                possible_cells.push(possible_cell)
                //console.log("Semental move 4: " + possible_cell);
              } 
              if(!front_left_stop && front_row!=null && (column_id-i)>=0 && front_row[column_id-i]!=null &&   (front_row[column_id-i].substr(0,1)=="0" || front_row[column_id-i].substr(0,1)=="1")){front_left_stop=true} 
          }

          row = cells[row_id-1];
          if(row_id>0 && (row[column_id]==null || row[column_id].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id);
            possible_cells.push(possible_cell)
            //console.log("Semental move 1.2: " + possible_cell);
          }
          
          row = cells[row_id];
          if(column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
            let possible_cell = (row_id).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Semental move 1.4: " + possible_cell);
          }
          if(column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
            let possible_cell = (row_id).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Semental move 1.5: " + possible_cell);
          }

          row = cells[row_id+1];
          if(row_id<8 && (row[column_id]==null || row[column_id].substr(0,1)=="0")){
            let possible_cell = (row_id+1).toString().concat(column_id);
            possible_cells.push(possible_cell)
            //console.log("Semental move 1.7: " + possible_cell);
          }


        }
        else if(piece=="AR"){ 
          var actual_row = cells[row_id]
          var back_row
          var front_row
          var right_stop = false
          var left_stop = false
          var back_stop = false
          var front_stop = false
          for(let i=1;i<9;i++){
                if(!right_stop && (column_id-i)>=0 && (actual_row[column_id-i]==null || actual_row[column_id-i].substr(0,1)=="0")){
                  let possible_cell = row_id.toString().concat(column_id-i);
                  possible_cells.push(possible_cell)
                  //console.log("Dragon move 1: " + possible_cell);
                }  
                if(!left_stop && (column_id+i)<=8 && (actual_row[column_id+i]==null || actual_row[column_id+i].substr(0,1)=="0") ){
                  let possible_cell = row_id.toString().concat(column_id+i);
                  possible_cells.push(possible_cell)
                  //console.log("Dragon move 2: " + possible_cell);
                } 
                if(!right_stop && (column_id-i)>=0 && actual_row[column_id-i]!=null && (actual_row[column_id-i].substr(0,1)=="0" || actual_row[column_id-i].substr(0,1)=="1")){right_stop=true} 
                if(!left_stop && (column_id+i)<=8 && actual_row[column_id+i]!=null && (actual_row[column_id+i].substr(0,1)=="0" || actual_row[column_id+i].substr(0,1)=="1")){left_stop=true} 
                
                back_row = cells[row_id-i]
                front_row = cells[row_id+i]
                if(!back_stop && (row_id-i)>=0 && (back_row[column_id]==null || back_row[column_id].substr(0,1)=="0")){
                  let possible_cell = (row_id-i).toString().concat(column_id);
                  possible_cells.push(possible_cell)
                  //console.log("Dragon move 3: " + possible_cell);
                }  
                if(!front_stop && (row_id+i)<=8 && (front_row[column_id]==null || front_row[column_id].substr(0,1)=="0") ){
                  let possible_cell = (row_id+i).toString().concat(column_id);
                  possible_cells.push(possible_cell)
                  //console.log("Dragon move 4: " + possible_cell);
                } 
                if(!back_stop && (row_id-i)>=0 && back_row[column_id]!=null &&  (back_row[column_id].substr(0,1)=="0" || back_row[column_id].substr(0,1)=="1")){back_stop=true} 
                if(!front_stop && (row_id+i)<=8 && front_row[column_id]!=null && (front_row[column_id].substr(0,1)=="0" || front_row[column_id].substr(0,1)=="1")){front_stop=true} 

          }
          row = cells[row_id-1];
          if(row_id>0 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Dragon move 1.1: " + possible_cell);
          }
          
          if(row_id>0 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
            let possible_cell = (row_id-1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Dragon move 1.2: " + possible_cell);
          }

          row = cells[row_id+1];
          if(row_id<8 && column_id<8 && (row[column_id+1]==null || row[column_id+1].substr(0,1)=="0")){
            let possible_cell = (row_id+1).toString().concat(column_id+1);
            possible_cells.push(possible_cell)
            //console.log("Dragon move 1.4: " + possible_cell);
          }
          if(row_id<8 && column_id>0 && (row[column_id-1]==null || row[column_id-1].substr(0,1)=="0")){
            let possible_cell = (row_id+1).toString().concat(column_id-1);
            possible_cells.push(possible_cell)
            //console.log("Dragon move 1.3: " + possible_cell);
          }
        }
  
        return possible_cells;
  }
  export function getPossibleRevive(cells,piece){
    var pawn_free_columns = []
    var possible_revive_cells = []
    if(piece.substr(1,2)=="P"){pawn_free_columns = getFreePawnColumns(cells,piece.substr(0,1))}
    for (let [row_id,row] of cells.entries()){
      for (let [column_id,cell] of row.entries()){
        if(!(piece.substr(1,2)=="P" || piece.substr(1,2)=="K")&& cell==null){//cualquiera}
        possible_revive_cells.push(row_id.toString().concat(column_id.toString()))
        }
        else if(cell==null){
          if(piece.substr(1,2)=="P"){
            if(pawn_free_columns!=null && pawn_free_columns.indexOf(column_id)>=0){
              if(piece.substr(0,1)=="0" && row_id<8){possible_revive_cells.push(row_id.toString().concat(column_id.toString()))}
              if(piece.substr(0,1)=="1" && row_id>0){possible_revive_cells.push(row_id.toString().concat(column_id.toString()))}
            }
          }
          if(piece.substr(1,2)=="K"){
            if(piece.substr(0,1)=="0" && row_id<7){possible_revive_cells.push(row_id.toString().concat(column_id.toString()))}
            if(piece.substr(0,1)=="1" && row_id>1){possible_revive_cells.push(row_id.toString().concat(column_id.toString()))}
          }
        }
        
      }
    }  
    return possible_revive_cells
  }
  function getFreePawnColumns(cells,player){
    let pawn_free_columns = []
    var row
    var piece
    var free
    for(let i=0;i<9;i++){
      free = true
      for(let j=0;j<9;j++){
        row = cells[j]
        piece = row[i]
        //console.log("Voy por: " + i.toString() + " " + j.toString() + " y es " + piece + " y soy " + player)
        if(piece!=null && piece.substr(1,2)=="P" && piece.substr(0,1)==player){free=false;break;}
      }
      if(free){pawn_free_columns.push(i)}
    }
    return pawn_free_columns
  }
  function movePieceToAvoidMate(G, player_and_piece, initial_row,initial_column, target_row,target_column)  {
    /////////////////////////// MOVIMIENTO //////////////////////////
    const G_clone = JSON.parse(JSON.stringify(G));
    var player = player_and_piece.substr(0,1)
    var player_piece = player_and_piece.substr(1,4)
    //console.log("Player: " + player + " wants to move " + player_piece)
    let possible_cells = getPossibleCells(G_clone.cells,initial_row,initial_column,player_and_piece)
    //console.log("Movimientos validos: " + possible_cells)
    var valid_move = false;
    var row = G_clone.cells[initial_row];
    var new_row = G_clone.cells[target_row];
    var capture = false;
    var target_piece 
    for(let valid of possible_cells){
      let valid_row = valid.substr(0,1)
      let valid_column = valid.substr(1,2)
      if(valid_row==target_row && valid_column==target_column){
        valid_move = true;
        //quitar pieza
        row[initial_column]=null;
        G_clone.cells[initial_row] = row;
        //poner pieza
        if(new_row[target_column]!=null){
          capture = true; 
          if(new_row[target_column].substr(1,1)=="A"){target_piece=new_row[target_column].substr(2,2)}
          else{target_piece=new_row[target_column].substr(1,2)}
        }
        new_row[target_column] = player_and_piece
        if(capture){
            if(player=="0"){G_clone.sente_captured_pieces.push(target_piece)}
            else{G_clone.gote_captured_pieces.push(target_piece)}
        }
        //console.log("Flag D. Movimiento realizado: -> fila actualizada: " + G_clone.cells[target_row] + " -> Nueva pieza: " + new_row[target_column])
        break;
      }
    }
    
    if(valid_move == false){return false}
    /////////////////////////// MOVIMIENTO REY //////////////////////////
    if(player_piece=="KING"){
      if(player=="0"){
        G_clone.sente_king_position = target_row.toString().concat(target_column)
      }
      if(player=="1"){
        G_clone.gote_king_position = target_row.toString().concat(target_column)
      }
    }
    ////////////////////////////////////////////////////////////////////

    /////////////////////////CHECK SITUATION/////////////////////////
    let still_check = true        
      if(player=="0"){still_check = isCheck(G_clone,"1");  } 
      if(player=="1"){still_check = isCheck(G_clone,"0");  }
      if(still_check){return false}   
    //console.log("Flag F.3. Check: " + still_check)   
    ////////////////////////////////////////////////////////////////    
    isCheck(G_clone,player)
    //console.log("Flag G. Final: " + mmm)
    return true
  }
  function revivePieceToAvoidMate (G,target_row,target_column,player_and_piece){
    /////////////////////////// MOVIMIENTO //////////////////////////
    const G_clone = JSON.parse(JSON.stringify(G));
    let possible_cells = getPossibleRevive(G_clone.cells,player_and_piece)
    var valid_move = false;
    var new_row = G_clone.cells[target_row];
    var player = player_and_piece.substr(0,1)
    var piece_type = player_and_piece.substr(1,4)

    for(let valid of possible_cells){
      let valid_row = valid.substr(0,1)
      let valid_column = valid.substr(1,2)
      if(valid_row==target_row && valid_column==target_column){
        valid_move = true;
        //poner pieza
        new_row[target_column] = player_and_piece
        break;
      }
    }
    if(valid_move == false){return INVALID_MOVE}

    /////////////////////////CHECK SITUATION/////////////////////////
    let still_check = true        
      if(player=="0"){still_check = isCheck(G_clone,"1")} 
      if(player=="1"){still_check = isCheck(G_clone,"0")}
      if(still_check){return false}      
    ////////////////////////////////////////////////////////////////    
    isCheck(G_clone,player)
    return true
  }
  //////////------END FUNCTIONS---------------/////////
  function isCheck(G,player){
      let players_piece;
      let possible_cells;
      let check = false

      for(let i=0;i<G.cells.length;i++){
        let row = G.cells[i]
        for(let j=0;j<G.cells[i].length;j++){
          if(row[j]!=null){
            players_piece = row[j].substr(0,1)
            if(players_piece==player){
              possible_cells = getPossibleCells(G.cells,i,j,row[j]);
              possible_cells.forEach(cell=>{
                if(player=="0" && cell.substr(0,1)==G.gote_king_position.substr(0,1) && cell.substr(1,2)==G.gote_king_position.substr(1,2)){check=true}
                if(player=="1" && cell.substr(0,1)==G.sente_king_position.substr(0,1) && cell.substr(1,2)==G.sente_king_position.substr(1,2)){check=true}
              })
            }
          }
        }
      }
      return check
  }
  function isCheckMate(G,ctx){
    var save_mate = false
    let possible_cells;
    var is_check
    //Primero vemos si hay jaque, según del jugador
    if(ctx.currentPlayer=="1"){is_check = isCheck(G,"1")}
    else{is_check = isCheck(G,"0")}
    //console.log("Lets check the Mate..is Check??: " + is_check + " and im " + ctx.currentPlayer)
    //Si hay jaque, exploramos todas las fichas del otro jugador para ver si hay algún movimiento que evite el jaque mate
    if(is_check){
      for(let i=0;i<G.cells.length;i++){
        let row = G.cells[i]
        for(let j=0;j<G.cells[i].length;j++){
          if(row[j]!=null && row[j].substr(0,1)!=ctx.currentPlayer){
            possible_cells = getPossibleCells(G.cells,i,j,row[j]);   
            possible_cells.forEach(cell=>{
              //Analizar si un movimiento evita el jaque mate. Para ello utilizo un método parecido al movePiece
              var saved = movePieceToAvoidMate(G,row[j],i,j,cell.substr(0,1),cell.substr(1,2))
              if(saved){save_mate=true}
            })
          }
        }
      }
      let all_captured = new Array(2).fill(null);
      all_captured[0] = G.sente_captured_pieces
      all_captured[1] = G.gote_captured_pieces
      var index
      var player
      if(ctx.currentPlayer=="0"){index=1;player="1"}
      else{index=0;player="0"}
      for(let piece of all_captured[index]){
        possible_cells = getPossibleRevive(G.cells,player.concat(piece))
        possible_cells.forEach(cell=>{
          //Analizar si un colocar una pieza evita el jaque mate. Para ello utilizo un método parecido al revivePiece
          var saved = revivePieceToAvoidMate(G,cell.substr(0,1),cell.substr(1,4),player.concat(piece))
          if(saved){save_mate=true}
        })
      }
    }
    //Según el análisis, devolvemos true para JAQUE MATE y false si no hay JAQUE MATE
    if(is_check){
      if(save_mate){return false}
      else{console.log("MATE");return true}
    }
    else{return false}   
  }