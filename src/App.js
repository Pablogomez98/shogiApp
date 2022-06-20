import { Client } from 'boardgame.io/client';
import { Shogi,getPossibleCells,getPossibleRevive } from './Game.js';
import  {requestMoveAI} from './ShogiAI.js'
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
import AraisedLanceIcon from './img/lance_rr.png';
import AraisedKnightIcon from './img/knight_rr.png';
import AraisedSilverSoldierIcon from './img/gnral_de_plata_rr.png';
import AraisedBishopIcon from './img/semental_r.png';
import AraisedRookIcon from './img/dragon_r.png';
import AraisedPawnIcon from './img/raised_pawn_r.png';

class ShogiClient {
  constructor(rootElement) {
    this.client = Client({
       game: Shogi,
       //debug: false,
     });
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

    /////////////AI//////////////
    const aiButtonMove = document.getElementById("AI_button_move")
    aiButtonMove.parameter = this.client;
    aiButtonMove.addEventListener('click', requestMoveAI, false);
        ////////////////////////
    
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
        if(owner_piece=="0"){cell.innerHTML = `<img src="${AraisedPawnIcon}" class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${AraisedPawnIcon}"class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AL"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${AraisedLanceIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${AraisedLanceIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AS"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${AraisedSilverSoldierIcon}" class="piece"id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${AraisedSilverSoldierIcon}"class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AK"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${AraisedKnightIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${AraisedKnightIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AB"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${AraisedBishopIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${AraisedBishopIcon}" class="piece" id="gote_piece"/>`}
      }
      else if(piece_name=="AR"){
        if(owner_piece=="0"){cell.innerHTML = `<img src="${AraisedRookIcon}"class="piece" id="sente_piece"/>`}
        else{cell.innerHTML = `<img src="${AraisedRookIcon}" class="piece" id="gote_piece"/>`}
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



const appElement = document.getElementById('panel_central');
const app = new ShogiClient(appElement);