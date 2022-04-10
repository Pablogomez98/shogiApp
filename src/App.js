import { Client } from 'boardgame.io/client';
import { Shogi } from './Game';
//import { RulesEngine } from './AIExpertSystem.js';
/////////IMAGENES PIEZAS//////////
import LanceIcon from './img/lance_r.png';
import PawnIcon from './img/pawn_r.png';
import GoldenSoldierIcon from './img/gnal_de_oro_r.png';
import KnightIcon from './img/knight_r.png';
import SilverSoldierIcon from './img/gnral de plata_r.png';
import BishopIcon from './img/bishop_r.png';
import RookIcon from './img/rook_r.png';
import SenteKingIcon from './img/sente_king_r.png';
import GoteKingIcon from './img/gote_king_r.png';

import {getPossibleCells,getPossibleRevive} from './Game.js'
import {executeEngine} from './ShogiAI.js'


class ShogiClient {
  constructor(rootElement) {
    this.client = Client({ game: Shogi });
    this.client.start();
    this.rootElement = rootElement;
    this.createBoard();
    this.attachListeners();
    this.client.subscribe(state => this.update(state));
  }

  createBoard() {
    const rows = [];
    for (let i = 0; i < 9; i++) {
      const cells = [];
      for (let j = 0; j < 9; j++) {
        /*////////Los "if" son por si se quiere personalizar cada td por pieza. De momento no afecta///////////*/
        if(i==2){cells.push(`<td class="cell" data-column="${j}" data-row="${i}" data-piece="" ></td>`) } 
        else if(i==6){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}

        else if(i==0){
          if(j==0 || j==8){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          if(j==1 || j==7){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          if(j==2 ||j==6){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          if(j==3 ||j==5){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          if(j==4){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`);}
        }
        else if(i==8){
          if(j==0 || j==8){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          if(j==1 || j==7){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          if(j==2 ||j==6){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          if(j==3 ||j==5){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          if(j==4){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
        }

        else if(i==1){
          if(j==1){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          else if(j==7){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          else{cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
        }
        else if(i==7){
          if(j==1){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          else if(j==7){cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
          else{cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
        }  
        else{cells.push(`<td class="cell" data-column="${j}" data-row="${i}"  > </td>`)}
        
        ///////////////////////        
      }
      rows.push(`<tr>${cells.join('')}</tr>`);
    }
    this.rootElement.innerHTML = `
      <table id="tablero">${rows.join('')}</table>
      <p class="winner"></p>
    `;
  }

  attachListeners() {

    const sente_table = document.getElementById('sente_table');
    const gote_table = document.getElementById('gote_table');

    const cells = this.rootElement.querySelectorAll('.cell');
    var captured_cells_sente = sente_table.querySelectorAll('.captured_piece');
    var captured_cells_gote = gote_table.querySelectorAll('.captured_piece');
    
    var possible_cells = []
    var row_id = null;
    var column_id = null;

    var row_target = null;
    var column_target = null;

    var piece = null; 
    var piece_revive = null;

    ////AI////
    const aiButton = document.getElementById("AI_button")
    aiButton.parameter = this.client;
    aiButton.addEventListener('click', requestMoveAI, false);
    

    
    const choosePieceToMove = event =>{

      let cell = event.target.parentNode;
      row_id = parseInt(cell.dataset.row);
      column_id = parseInt(cell.dataset.column);
      piece = cell.dataset.piece
      possible_cells = []

      var state = this.client.getState();
      if(piece.substr(0,1)==state.ctx.currentPlayer){
          ///ver que pieza es y mostrar posibles
          possible_cells = getPossibleCells(state.G.cells,row_id,column_id,piece.substr(1,4),piece.substr(0,1))
          highlightPossibleMoves(possible_cells,cells,state.ctx.currentPlayer)
          cells.forEach(cell =>{ cell.onclick = clickFinalMove; });  
      }       
    };

    const clickFinalMove = event => {
      if(event.target.parentNode.className=="cell_capture_highlight"){
        row_target = parseInt(event.target.parentNode.dataset.row);
        column_target = parseInt(event.target.parentNode.dataset.column);
        this.client.moves.movePiece(row_id,column_id,row_target,column_target,piece.substr(1,4), event.target.parentNode);    
        capturePiece();
      }

      else{
        row_target = parseInt(event.target.dataset.row);
        column_target = parseInt(event.target.dataset.column);
        this.client.moves.movePiece(row_id,column_id,row_target,column_target,piece.substr(1,4), event.target);
      }
            
      cells.forEach(cell=>{cell.className="cell"});
      cells.forEach(cell => {cell.onclick = choosePieceToMove;});
      captured_cells_sente = sente_table.querySelectorAll('.captured_piece');
      captured_cells_gote = gote_table.querySelectorAll('.captured_piece');
      captured_cells_sente.forEach(cell => {cell.onclick = chooseWhereToRevive;});
      captured_cells_gote.forEach(cell => {cell.onclick = chooseWhereToRevive;});
    };

    const chooseWhereToRevive = event =>{
      piece_revive = event.target.parentNode
      var state = this.client.getState();

      if(piece_revive.id==state.ctx.currentPlayer){
        var possible_revival = getPossibleRevive(state.G.cells,piece_revive.dataset.type,piece_revive.id)
        highlightPossibleMoves(possible_revival,cells,state.ctx.currentPlayer)
        cells.forEach(cell =>{ cell.onclick = clickFinalRevive; });
        captured_cells_sente = sente_table.querySelectorAll('.captured_piece');
        captured_cells_gote = gote_table.querySelectorAll('.captured_piece');
        captured_cells_sente.forEach(cell => {cell.onclick = clickFinalRevive;});
        captured_cells_gote.forEach(cell => {cell.onclick = clickFinalRevive;});
      }

    };

    const clickFinalRevive = event => {    
        row_target = parseInt(event.target.dataset.row);
        column_target = parseInt(event.target.dataset.column);
        this.client.moves.revivePiece(row_target,column_target,piece_revive.id.concat(piece_revive.dataset.type), event.target);
            
        cells.forEach(cell=>{cell.className="cell"});
        cells.forEach(cell => {cell.onclick = choosePieceToMove;});
        captured_cells_sente = sente_table.querySelectorAll('.captured_piece');
        captured_cells_gote = gote_table.querySelectorAll('.captured_piece');
        captured_cells_sente.forEach(cell => {cell.onclick = chooseWhereToRevive;});
        captured_cells_gote.forEach(cell => {cell.onclick = chooseWhereToRevive;});
    };
    
    cells.forEach(cell => {cell.onclick = choosePieceToMove;});  
  }

  update(state) {
    updateBoard(state,this.rootElement)
    updateCaptured(state) 
    capturePiece()
  }
}
function highlightPossibleMoves(possible_cells,cells,player){
  var column
  var row
  var owner_piece
  for(let cell of cells){
    for(let possible_cell of possible_cells){
      column=cell.dataset.column;
      row = cell.dataset.row;
      owner_piece = cell.dataset.piece
      if(row==possible_cell.substr(0,1) && column==possible_cell.substr(1,2)){
        if(owner_piece!= "" && owner_piece.substr(0,1)!=player){cell.className = "cell_capture_highlight";}
        else{cell.className = "cell_highlight"}
      }
    }
  }
}
function showPossibleMoves0(cells,row_id,column_id,piece){
  var possible_cells = [];
  var column = 0;
  var row = 0;
  var owner_piece = null;

      if(piece=="P"){ 
      cells.forEach(cell=>{
            column=cell.dataset.column;
            row = cell.dataset.row
            owner_piece = cell.dataset.piece.substr(0,1);
            if(row==row_id+1 &&  column==column_id){
              if(owner_piece=="1"){cell.className = "cell_capture_highlight"; possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
            }
      }) 
      }
      else if(piece=="L"){
           for (let cell of cells) {
                column=cell.dataset.column;
                row = cell.dataset.row
                if(column==column_id && row>row_id){
                  owner_piece = cell.dataset.piece.substr(0,1);
                  if(owner_piece=="0"){ break;} 
                  else if(owner_piece =="1"){cell.className="cell_capture_highlight";possible_cells.push(cell);break;}
                  else{cell.className = "cell_highlight";possible_cells.push(cell);
                  }
                }
            }
      }
      else if(piece=="K"){
        for (let cell of cells) {
            column=cell.dataset.column;
            row = cell.dataset.row
              if((column==column_id+1 ||column==column_id-1)  && row==row_id+2){
                owner_piece = cell.dataset.piece.substr(0,1);
                if(owner_piece=="0"){} 
                else if(owner_piece =="1"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
                else{cell.className = "cell_highlight";possible_cells.push(cell);
                }
              }
        } 
      }
      else if(piece=="G" || piece=="AP" || piece=="AL"  || piece=="AK" || piece=="AS"){
          for (let cell of cells) {
            column=cell.dataset.column;
            row = cell.dataset.row
            if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
                owner_piece = cell.dataset.piece.substr(0,1);
                if(owner_piece=="0"||(row==row_id-1 && column==column_id+1) || (row==row_id-1 && column==column_id-1)  ){ } 
                else if(owner_piece =="1"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
                else{cell.className = "cell_highlight";possible_cells.push(cell);}
            }
          }
      }
      else if(piece=="S"){
        for (let cell of cells) {
          column=cell.dataset.column;
          row = cell.dataset.row
          if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(owner_piece=="0"||(row==row_id-1 && column==column_id) || (row==row_id && column==column_id-1)|| (row==row_id && column==column_id+1)  ){ } 
              else if(owner_piece =="1"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
          }
        }
      }
      else if(piece=="KING"){
        for (let cell of cells) {
          column=cell.dataset.column;
          row = cell.dataset.row
          if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(owner_piece=="0"){ } 
              else if(owner_piece =="1"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
          }
        }
      }
      else if(piece=="R"){

        var row_cells = [];
        var rook_found = false;
        cells.forEach(cell=>{if(cell.dataset.row==row_id){row_cells.push(cell)}})
        for(let cell of row_cells){
          owner_piece = cell.dataset.piece.substr(0,1);
          column=cell.dataset.column;
          row = cell.dataset.row;
          if(column==column_id){rook_found = true}
          else if(cell.dataset.piece=="" ){possible_cells.push(cell)}
          else if(owner_piece=="0" && !rook_found){possible_cells = []}
          else if(owner_piece=="0" && rook_found){break;}
          else if(owner_piece=="1" && !rook_found){possible_cells = [];possible_cells.push(cell)}
          else if(owner_piece=="1" && rook_found){possible_cells.push(cell);break;}
          
        }

        var column_cells = [];
        rook_found = false;
        var possible_cells_column = []
        cells.forEach(cell=>{if(cell.dataset.column==column_id){column_cells.push(cell)}})
        for(let cell of column_cells){
          owner_piece = cell.dataset.piece.substr(0,1);
          column=cell.dataset.column;
          row = cell.dataset.row;
          if(row==row_id){rook_found = true}
          else if(cell.dataset.piece=="" ){possible_cells_column.push(cell)}
          else if(owner_piece=="0" && !rook_found){possible_cells_column = []}
          else if(owner_piece=="0" && rook_found){break;}
          else if(owner_piece=="1" && !rook_found){possible_cells_column = [];possible_cells_column.push(cell)}
          else if(owner_piece=="1" && rook_found){possible_cells_column.push(cell);break;}
        }
        possible_cells= possible_cells.concat(possible_cells_column);

        possible_cells.forEach(cell=>{if(cell.dataset.piece.substr(0,1)=="1"){cell.className="cell_capture_highlight"}else{cell.className="cell_highlight"}})
      }
      else if(piece=="B"){
        
        var diagonals1 = [];
        var diagonals2 = [];
        var diagonals3 = [];
        var diagonals4 = [];
        ////Guardamos el tablero en array de 2 dimensiones -> se podría sacar de aqui para que solo se haga 1 vez
        var row_cells = []
        var ind = 0;
        var cells_array = []
        for(let i=0;i<9;i++){
          row_cells=[]
          for(let j=0;j<9;j++){
            row_cells[j] = cells[ind];
            ind++;
          }
          cells_array[i]=row_cells;
        }
        //Recorremos el tablero obteniendo las diagonales que parten de la pieza -> creamos 4 diagonales
        var roww = []
        var cell=0;
       for(let i=1;i<10;i++){
         if(cells_array[row_id+i]!=undefined){
          roww = cells_array[row_id+i]
              if(roww[column_id+i]!=undefined){
                cell = roww[column_id+i]
                diagonals3.push(cell)
              }
         }
         if(cells_array[row_id+i]!=undefined){
          roww = cells_array[row_id+i]
              if(roww[column_id-i]!=undefined){
                cell = roww[column_id-i]
                diagonals4.push(cell)
              }
         }
         if(cells_array[row_id-i]!=undefined){
          roww = cells_array[row_id-i]
              if(roww[column_id+i]!=undefined){
                cell = roww[column_id+i]
                diagonals2.push(cell)
              }
         }
         if(cells_array[row_id-i]!=undefined){
          roww = cells_array[row_id-i]
              if(roww[column_id-i]!=undefined){
                cell = roww[column_id-i]
                diagonals1.push(cell)
              }
         }
        }
        //Para cada diagonal, elegimos las casillas donde se puede mover el alfil
        possible_cells = []
        var diagonal_name;
        for(let i=1;i<5;i++){
          if(i==1){diagonal_name=diagonals1}
          if(i==2){diagonal_name=diagonals2}
          if(i==3){diagonal_name=diagonals3}
          if(i==4){diagonal_name=diagonals4}
            for(let cell of diagonal_name){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(cell.dataset.piece=="" ){possible_cells.push(cell)}
              else if(owner_piece=="1"){possible_cells.push(cell);break;}
              else {break;}
            }
        }

        possible_cells.forEach(cell=>{if(cell.dataset.piece.substr(0,1)=="1"){cell.className="cell_capture_highlight"}else{cell.className="cell_highlight"}})
        
      }
    else if(piece=="AB"){
       
      var diagonals1 = [];
      var diagonals2 = [];
      var diagonals3 = [];
      var diagonals4 = [];
      ////Guardamos el tablero en array de 2 dimensiones -> se podría sacar de aqui para que solo se haga 1 vez
      var row_cells = []
      var ind = 0;
      var cells_array = []
      for(let i=0;i<9;i++){
        row_cells=[]
        for(let j=0;j<9;j++){
          row_cells[j] = cells[ind];
          ind++;
        }
        cells_array[i]=row_cells;
      }
      //Recorremos el tablero obteniendo las diagonales que parten de la pieza -> creamos 4 diagonales
      var roww = []
      var cell=0;
     for(let i=1;i<10;i++){
       if(cells_array[row_id+i]!=undefined){
        roww = cells_array[row_id+i]
            if(roww[column_id+i]!=undefined){
              cell = roww[column_id+i]
              diagonals3.push(cell)
            }
       }
       if(cells_array[row_id+i]!=undefined){
        roww = cells_array[row_id+i]
            if(roww[column_id-i]!=undefined){
              cell = roww[column_id-i]
              diagonals4.push(cell)
            }
       }
       if(cells_array[row_id-i]!=undefined){
        roww = cells_array[row_id-i]
            if(roww[column_id+i]!=undefined){
              cell = roww[column_id+i]
              diagonals2.push(cell)
            }
       }
       if(cells_array[row_id-i]!=undefined){
        roww = cells_array[row_id-i]
            if(roww[column_id-i]!=undefined){
              cell = roww[column_id-i]
              diagonals1.push(cell)
            }
       }
      }
      //Para cada diagonal, elegimos las casillas donde se puede mover el alfil
      possible_cells = []
      var diagonal_name;
      for(let i=1;i<5;i++){
        if(i==1){diagonal_name=diagonals1}
        if(i==2){diagonal_name=diagonals2}
        if(i==3){diagonal_name=diagonals3}
        if(i==4){diagonal_name=diagonals4}
          for(let cell of diagonal_name){
            owner_piece = cell.dataset.piece.substr(0,1);
            if(cell.dataset.piece=="" ){possible_cells.push(cell)}
            else if(owner_piece=="1"){possible_cells.push(cell);break;}
            else {break;}
          }
      }

      possible_cells.forEach(cell=>{if(cell.dataset.piece.substr(0,1)=="1"){cell.className="cell_capture_highlight"}else{cell.className="cell_highlight"}})
      for (let cell of cells) {
        column=cell.dataset.column;
        row = cell.dataset.row
        if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
            owner_piece = cell.dataset.piece.substr(0,1);
            if(owner_piece=="0"){ } 
            else if(owner_piece =="1"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
            else{cell.className = "cell_highlight";possible_cells.push(cell);}
        }
      }
    }
    else if(piece=="AR"){
      var row_cells = [];
        var rook_found = false;
        cells.forEach(cell=>{if(cell.dataset.row==row_id){row_cells.push(cell)}})
        for(let cell of row_cells){
          owner_piece = cell.dataset.piece.substr(0,1);
          column=cell.dataset.column;
          row = cell.dataset.row;
          if(column==column_id){rook_found = true}
          else if(cell.dataset.piece=="" ){possible_cells.push(cell)}
          else if(owner_piece=="0" && !rook_found){possible_cells = []}
          else if(owner_piece=="0" && rook_found){break;}
          else if(owner_piece=="1" && !rook_found){possible_cells = [];possible_cells.push(cell)}
          else if(owner_piece=="1" && rook_found){possible_cells.push(cell);break;}
          
        }

        var column_cells = [];
        rook_found = false;
        var possible_cells_column = []
        cells.forEach(cell=>{if(cell.dataset.column==column_id){column_cells.push(cell)}})
        for(let cell of column_cells){
          owner_piece = cell.dataset.piece.substr(0,1);
          column=cell.dataset.column;
          row = cell.dataset.row;
          if(row==row_id){rook_found = true}
          else if(cell.dataset.piece=="" ){possible_cells_column.push(cell)}
          else if(owner_piece=="0" && !rook_found){possible_cells_column = []}
          else if(owner_piece=="0" && rook_found){break;}
          else if(owner_piece=="1" && !rook_found){possible_cells_column = [];possible_cells_column.push(cell)}
          else if(owner_piece=="1" && rook_found){possible_cells_column.push(cell);break;}
        }
        possible_cells= possible_cells.concat(possible_cells_column);

        possible_cells.forEach(cell=>{if(cell.dataset.piece.substr(0,1)=="1"){cell.className="cell_capture_highlight"}else{cell.className="cell_highlight"}})
        for (let cell of cells) {
          column=cell.dataset.column;
          row = cell.dataset.row
          if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(owner_piece=="0"){ } 
              else if(owner_piece =="1"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
          }
        }
    }

      return possible_cells;
}
function showPossibleMoves1(cells,row_id,column_id,piece){
  var possible_cells = [];
  var column = 0;
  var row = 0;

      if(piece=="P"){ 
      cells.forEach(cell=>{
            column=cell.dataset.column;
            row = cell.dataset.row;
            owner_piece = cell.dataset.piece.substr(0,1);
            if(row==row_id-1 &&  column==column_id){
              if(owner_piece=="0"){cell.className = "cell_capture_highlight"; possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
            }
              }) 
      }
      else if(piece=="L"){
           for (let cell of cells) {
                column=cell.dataset.column;
                row = cell.dataset.row
                if(column==column_id && row<row_id){
                  var owner_piece = cell.dataset.piece.substr(0,1);
                  if(owner_piece=="1"){ break;} 
                  else if(owner_piece =="0"){cell.className="cell_capture_highlight";possible_cells.push(cell);break;}
                  else{cell.className = "cell_highlight";possible_cells.push(cell);
                  }
                }
            }
      }
      else if(piece=="K"){
        for (let cell of cells) {
            column=cell.dataset.column;
            row = cell.dataset.row
              if((column==column_id+1 ||column==column_id-1)  && row==row_id-2){
                var owner_piece = cell.dataset.piece.substr(0,1);
                if(owner_piece=="1"){} 
                else if(owner_piece =="0"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
                else{cell.className = "cell_highlight";possible_cells.push(cell);
                }
              }
        } 
      }
      else if(piece=="G" || piece=="AP" || piece=="AL"  || piece=="AK" || piece=="AS"){
          for (let cell of cells) {
            column=cell.dataset.column;
            row = cell.dataset.row
            if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
                var owner_piece = cell.dataset.piece.substr(0,1);
                if(owner_piece=="1"||(row==row_id+1 && column==column_id-1) || (row==row_id+1 && column==column_id+1)  ){ } 
                else if(owner_piece =="0"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
                else{cell.className = "cell_highlight";possible_cells.push(cell);}
            }
          }
      }
      else if(piece=="S"){
        for (let cell of cells) {
          column=cell.dataset.column;
          row = cell.dataset.row
          if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(owner_piece=="1"||(row==row_id+1 && column==column_id) || (row==row_id && column==column_id+1)|| (row==row_id && column==column_id-1)  ){ } 
              else if(owner_piece =="0"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
          }
        }
      }
      else if(piece=="KING"){
        for (let cell of cells) {
          column=cell.dataset.column;
          row = cell.dataset.row
          if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(owner_piece=="1"){ } 
              else if(owner_piece =="0"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
          }
        }
      }
      else if(piece=="R"){
        var row_cells = [];
        var rook_found = false;
        cells.forEach(cell=>{if(cell.dataset.row==row_id){row_cells.push(cell)}})
        for(let cell of row_cells){
          owner_piece = cell.dataset.piece.substr(0,1);
          column=cell.dataset.column;
          row = cell.dataset.row;
          if(column==column_id){rook_found = true}
          else if(cell.dataset.piece=="" ){possible_cells.push(cell)}
          else if(owner_piece=="1" && !rook_found){possible_cells = []}
          else if(owner_piece=="1" && rook_found){break;}
          else if(owner_piece=="0" && !rook_found){possible_cells = [];possible_cells.push(cell)}
          else if(owner_piece=="0" && rook_found){possible_cells.push(cell);break;}
          
        }

        var column_cells = [];
        rook_found = false;
        var possible_cells_column = []
        cells.forEach(cell=>{if(cell.dataset.column==column_id){column_cells.push(cell)}})
        for(let cell of column_cells){
          owner_piece = cell.dataset.piece.substr(0,1);
          column=cell.dataset.column;
          row = cell.dataset.row;
          if(row==row_id){rook_found = true}
          else if(cell.dataset.piece=="" ){possible_cells_column.push(cell)}
          else if(owner_piece=="1" && !rook_found){possible_cells_column = []}
          else if(owner_piece=="1" && rook_found){break;}
          else if(owner_piece=="0" && !rook_found){possible_cells_column = [];possible_cells_column.push(cell)}
          else if(owner_piece=="0" && rook_found){possible_cells_column.push(cell);break;}
        }
        possible_cells= possible_cells.concat(possible_cells_column);

        possible_cells.forEach(cell=>{if(cell.dataset.piece.substr(0,1)=="0"){cell.className="cell_capture_highlight"}else{cell.className="cell_highlight"}})
      }
      else if(piece=="B"){
        var diagonals1 = [];
        var diagonals2 = [];
        var diagonals3 = [];
        var diagonals4 = [];
        ////Guardamos el tablero en array de 2 dimensiones   -> se podría sacar de aqui para que solo se haga 1 vez
        var row_cells = []
        var ind = 0;
        var cells_array = []
        var cells_r = Array.prototype.slice.call(cells).reverse();
        for(let i=0;i<9;i++){
          row_cells=[]
          for(let j=0;j<9;j++){
            row_cells[j] = cells_r[ind];
            ind++;
          }
          cells_array[i]=row_cells;
        }
        //Recorremos el tablero obteniendo las diagonales que parten de la pieza -> creamos 4 diagonales
        var roww = []
        var cell=0;
       for(let i=1;i<10;i++){
         if(cells_array[row_id+i]!=undefined){
          roww = cells_array[row_id+i]
              if(roww[column_id+i]!=undefined){
                cell = roww[column_id+i]
                diagonals3.push(cell)
              }
         }
         if(cells_array[row_id+i]!=undefined){
          roww = cells_array[row_id+i]
              if(roww[column_id-i]!=undefined){
                cell = roww[column_id-i]
                diagonals4.push(cell)
              }
         }
         if(cells_array[row_id-i]!=undefined){
          roww = cells_array[row_id-i]
              if(roww[column_id+i]!=undefined){
                cell = roww[column_id+i]
                diagonals2.push(cell)
              }
         }
         if(cells_array[row_id-i]!=undefined){
          roww = cells_array[row_id-i]
              if(roww[column_id-i]!=undefined){
                cell = roww[column_id-i]
                diagonals1.push(cell)
              }
         }
        }
        //Para cada diagonal, elegimos las casillas donde se puede mover el alfil
        possible_cells = []
        var diagonal_name;
        for(let i=1;i<5;i++){
          if(i==1){diagonal_name=diagonals1}
          if(i==2){diagonal_name=diagonals2}
          if(i==3){diagonal_name=diagonals3}
          if(i==4){diagonal_name=diagonals4}
            for(let cell of diagonal_name){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(cell.dataset.piece=="" ){possible_cells.push(cell)}
              else if(owner_piece=="0"){possible_cells.push(cell);break;}
              else {break;}
            }
        }

        possible_cells.forEach(cell=>{if(cell.dataset.piece.substr(0,1)=="0"){cell.className="cell_capture_highlight"}else{cell.className="cell_highlight"}})
      }
      else if(piece=="AR"){
        var row_cells = [];
        var rook_found = false;
        cells.forEach(cell=>{if(cell.dataset.row==row_id){row_cells.push(cell)}})
        for(let cell of row_cells){
          owner_piece = cell.dataset.piece.substr(0,1);
          column=cell.dataset.column;
          row = cell.dataset.row;
          if(column==column_id){rook_found = true}
          else if(cell.dataset.piece=="" ){possible_cells.push(cell)}
          else if(owner_piece=="1" && !rook_found){possible_cells = []}
          else if(owner_piece=="1" && rook_found){break;}
          else if(owner_piece=="0" && !rook_found){possible_cells = [];possible_cells.push(cell)}
          else if(owner_piece=="0" && rook_found){possible_cells.push(cell);break;}
          
        }

        var column_cells = [];
        rook_found = false;
        var possible_cells_column = []
        cells.forEach(cell=>{if(cell.dataset.column==column_id){column_cells.push(cell)}})
        for(let cell of column_cells){
          owner_piece = cell.dataset.piece.substr(0,1);
          column=cell.dataset.column;
          row = cell.dataset.row;
          if(row==row_id){rook_found = true}
          else if(cell.dataset.piece=="" ){possible_cells_column.push(cell)}
          else if(owner_piece=="1" && !rook_found){possible_cells_column = []}
          else if(owner_piece=="1" && rook_found){break;}
          else if(owner_piece=="0" && !rook_found){possible_cells_column = [];possible_cells_column.push(cell)}
          else if(owner_piece=="0" && rook_found){possible_cells_column.push(cell);break;}
        }
        possible_cells= possible_cells.concat(possible_cells_column);

        possible_cells.forEach(cell=>{if(cell.dataset.piece.substr(0,1)=="0"){cell.className="cell_capture_highlight"}else{cell.className="cell_highlight"}})
        for (let cell of cells) {
          column=cell.dataset.column;
          row = cell.dataset.row
          if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(owner_piece=="1"){ } 
              else if(owner_piece =="0"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
          }
        }
      }
      else if(piece=="AB"){
        var diagonals1 = [];
        var diagonals2 = [];
        var diagonals3 = [];
        var diagonals4 = [];
        ////Guardamos el tablero en array de 2 dimensiones   -> se podría sacar de aqui para que solo se haga 1 vez
        var row_cells = []
        var ind = 0;
        var cells_array = []
        var cells_r = Array.prototype.slice.call(cells).reverse();
        for(let i=0;i<9;i++){
          row_cells=[]
          for(let j=0;j<9;j++){
            row_cells[j] = cells_r[ind];
            ind++;
          }
          cells_array[i]=row_cells;
        }
        //Recorremos el tablero obteniendo las diagonales que parten de la pieza -> creamos 4 diagonales
        var roww = []
        var cell=0;
       for(let i=1;i<10;i++){
         if(cells_array[row_id+i]!=undefined){
          roww = cells_array[row_id+i]
              if(roww[column_id+i]!=undefined){
                cell = roww[column_id+i]
                diagonals3.push(cell)
              }
         }
         if(cells_array[row_id+i]!=undefined){
          roww = cells_array[row_id+i]
              if(roww[column_id-i]!=undefined){
                cell = roww[column_id-i]
                diagonals4.push(cell)
              }
         }
         if(cells_array[row_id-i]!=undefined){
          roww = cells_array[row_id-i]
              if(roww[column_id+i]!=undefined){
                cell = roww[column_id+i]
                diagonals2.push(cell)
              }
         }
         if(cells_array[row_id-i]!=undefined){
          roww = cells_array[row_id-i]
              if(roww[column_id-i]!=undefined){
                cell = roww[column_id-i]
                diagonals1.push(cell)
              }
         }
        }
        //Para cada diagonal, elegimos las casillas donde se puede mover el alfil
        possible_cells = []
        var diagonal_name;
        for(let i=1;i<5;i++){
          if(i==1){diagonal_name=diagonals1}
          if(i==2){diagonal_name=diagonals2}
          if(i==3){diagonal_name=diagonals3}
          if(i==4){diagonal_name=diagonals4}
            for(let cell of diagonal_name){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(cell.dataset.piece=="" ){possible_cells.push(cell)}
              else if(owner_piece=="0"){possible_cells.push(cell);break;}
              else {break;}
            }
        }

        possible_cells.forEach(cell=>{if(cell.dataset.piece.substr(0,1)=="0"){cell.className="cell_capture_highlight"}else{cell.className="cell_highlight"}})
        for (let cell of cells) {
          column=cell.dataset.column;
          row = cell.dataset.row
          if((column==column_id+1 ||column==column_id-1 ||column==column_id) && ((row==row_id+1)||row==row_id-1 || row==row_id) ){
              owner_piece = cell.dataset.piece.substr(0,1);
              if(owner_piece=="1"){ } 
              else if(owner_piece =="0"){cell.className="cell_capture_highlight";possible_cells.push(cell);}
              else{cell.className = "cell_highlight";possible_cells.push(cell);}
          }
        }
      }
      return possible_cells;

}
function capturePiece(){
  const gameplay = document.getElementById('gameplay');
    const captured = gameplay.querySelectorAll('.captured_piece');
    captured.forEach(piece=>{
      var piece_type = piece.dataset.type;
      var owner_captured_piece = piece.id.substr(9,14);
     
     if(piece_type=="P"){
      if(owner_captured_piece=="sente"){piece.innerHTML = `<img src="${PawnIcon}" class="piece" id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${PawnIcon}"class="piece" id="gote_piece"/>`}
    }
    else if(piece_type=="L"){
      if(owner_captured_piece=="sente"){piece.innerHTML = `<img src="${LanceIcon}"class="piece" id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${LanceIcon}" class="piece" id="gote_piece"/>`}
    }
    else if(piece_type=="G"){
      if(owner_captured_piece=="sente"){piece.innerHTML = `<img src="${GoldenSoldierIcon}" class="piece"id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${GoldenSoldierIcon}" class="piece" id="gote_piece"/>`}
    }
    else if(piece_type=="S"){
      if(owner_captured_piece=="sente"){piece.innerHTML = `<img src="${SilverSoldierIcon}" class="piece"id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${SilverSoldierIcon}"class="piece" id="gote_piece"/>`}
    }
    else if(piece_type=="K"){
      if(owner_captured_piece=="sente"){piece.innerHTML = `<img src="${KnightIcon}"class="piece" id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${KnightIcon}" class="piece" id="gote_piece"/>`}
    }
    else if(piece_type=="B"){
      if(owner_captured_piece=="sente"){piece.innerHTML = `<img src="${BishopIcon}"class="piece" id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${BishopIcon}" class="piece" id="gote_piece"/>`}
    }
    else if(piece_type=="KING"){
      if(owner_captured_piece=="sente"){piece.innerHTML = `<img src="${SenteKingIcon}"class="piece" id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${GoteKingIcon}" class="piece" id="gote_piece"/>`}
    }
    else if(piece_type=="R"){
      if(owner_captured_piece=="sente"){piece.innerHTML = `<img src="${RookIcon}"class="piece" id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${RookIcon}" class="piece" id="gote_piece"/>`}
    }
    else{
      if(piece_type=="sente"){piece.innerHTML = `<img src="${PawnIcon}" class="piece" id="sente_piece"/>`}
      else{piece.innerHTML = `<img src="${PawnIcon}"class="piece" id="gote_piece"/>`}
    }
    })
}
function updateBoard(state,rootElement){
  const cells = rootElement.querySelectorAll('.cell');
  var piece_name;
  var owner_piece;
  cells.forEach(cell => {
    const cell_row = parseInt(cell.dataset.row);
    const cell_column = parseInt(cell.dataset.column);
    const cellRow = state.G.cells[cell_row];
    const cellValue = cellRow[cell_column];
    cell.textContent = cellValue !== null ? cellValue : '';
    cell.dataset.piece = cellValue !== null ? cellValue : '';   

    piece_name = cell.dataset.piece.substr(1,4);
    owner_piece = cell.dataset.piece.substr(0,1);
      //falta hacer los dibujos del resto de fichas, de momento todo peones
      if(piece_name=="P"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${PawnIcon}" class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${PawnIcon}"class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="L"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${LanceIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${LanceIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="G"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${GoldenSoldierIcon}" class="piece"id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${GoldenSoldierIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="S"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${SilverSoldierIcon}" class="piece"id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${SilverSoldierIcon}"class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="K"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${KnightIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${KnightIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="B"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${BishopIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${BishopIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="KING"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${SenteKingIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${GoteKingIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="R"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${RookIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${RookIcon}" class="piece" id="gote_piece"/>`}
      }
      //arised
      if(piece_name=="AP"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${RookIcon}" class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${RookIcon}"class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AL"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${RookIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${RookIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AS"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${RookIcon}" class="piece"id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${RookIcon}"class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AK"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${RookIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${RookIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AB"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${RookIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${RookIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AR"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${RookIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${RookIcon}" class="piece" id="gote_piece"/>`}
      }

      else if(piece_name==""){
       cell.innerHTML = '' 
      }
      
      

  });
}
function updateCaptured(state){
  var captured_pieces = state.G.sente_captured_pieces;
  var captured_divs = [];
  captured_pieces.forEach(piece=>{captured_divs.push(`<div class="captured_piece" id="0" data-type="${piece}"></div>`);})
  sente_table.innerHTML = captured_divs.join('');

  var captured_pieces = state.G.gote_captured_pieces;
  var captured_divs = [];
  captured_pieces.forEach(piece=>{captured_divs.push(`<div class="captured_piece" id="1" data-type="${piece}"></div>`);})
  gote_table.innerHTML = captured_divs.join('');

}

 async function requestMoveAI(event){
  var client = event.currentTarget.parameter
  var state = client.getState()
  
  var result =  function func(){
    return new Promise((resolve ,reject)=>{
      executeEngine(state,function(result){
        resolve(result)
      });
      
    });
  };  
    let moves = await result();
    console.log(moves);
    var rand = parseInt(Math.random() * (moves.length - 0) + 0);
    var move = moves[rand]
    //console.log(rand);
    console.log(move);
    let row_id = parseInt(move[0])
    let column_id = parseInt(move[1])
    let row_target = parseInt(move[2].substr(0,1))
    let column_target = parseInt(move[2].substr(1,1))
    let piece = move[3]
    let isHand = move[4]
    //console.log("a ver aqui: " + row_id + column_id + row_target + column_target + piece)
    if(isHand!=1){
      client.moves.movePiece(row_id,column_id,row_target,column_target,piece);  
    }
    else{
      client.moves.revivePiece(row_target,column_target,state.ctx.currentPlayer.concat(piece));  
    }
    
  /*let moves="";
  let move
  (async () => {
    var promise1 = new Promise((resolve ,reject)=>{
      var result =executeEngine(state,function(result){
        resolve(result)
      })
    });
    
    var thenedPromise = promise1.then(function(value) {
     move=value;
      console.log("val" + value); // this logs "foo"
    });

    await thenedPromise; // wait before the promise generated by "then" is resolved
    
    console.log(move);
    //console.log("length: " + moves.length);
    var rand = parseInt(Math.random() * (16 - 0) + 0);
    //var move = moves[rand]
    //console.log(rand);
    //console.log(move);
    let row_id = parseInt(move.substr(0,1))
    let column_id = parseInt(move.substr(1,1))
    let row_target = parseInt(move.substr(2,1))
    let column_target = parseInt(move.substr(3,1))
    let piece = move.substr(4,1)
    let isHand = move.substr(5,1)
    console.log("a ver aqui: " + row_id + column_id + row_target + column_target + piece)
    if(isHand!=1){
      client.moves.movePiece(row_id,column_id,row_target,column_target,piece);  
    }
    else{
      client.moves.revivePiece(row_target,column_target,state.ctx.currentPlayer.concat(piece));  
    }
    
     
    })();*/
        

}


const appElement = document.getElementById('panel_central');
const app = new ShogiClient(appElement);