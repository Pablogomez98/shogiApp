import {getPossibleCells,getPossibleRevive} from '../../Game.js'

var Yagura = [
        {///////Pawn
            "priority":10,
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
                this.priorities.push(10)
                this.moves.push(row+column)  
                R.next();
            }
        },
        //////////////////////// 9
        {///////Silver
            "priority":9,
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
                if(this.player=="0"){new_position="15"}
                else{new_position="73"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(9)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////Silver
            "priority":8,
            "condition": function(R) {	
                //console.log("Rule: Yagura silver 2")
                var notPositioned = false 
                if(this.piece=="S" && ((this.column==3 && this.row==7 && this.player=="1")||(this.column==5 && this.row==1 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura silver 2")
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
        /////////////// if bishop exchange
        {///////Silver
            "priority":8,
            "condition": function(R) {	
                //console.log("Rule: Yagura silver 2")
                var notPositioned = false 
                var sente_row = this.state.G.cells[1]
                var gote_row = this.state.G.cells[7]
                //console.log(sente_row[7])
                if(this.piece=="S" && ((this.column==2 && this.row==8 && this.player=="1")||(this.column==6 && this.row==0 && this.player=="0"))
                && ((this.player=="0" && sente_row[7]=="1AB") || (this.player=="1" && gote_row[1]=="0AB") || (this.player=="0" && sente_row[7]=="1B") || (this.player=="1" && gote_row[1]=="0B")))
                {notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura silver 2")
                var new_position
                if(this.player=="0"){new_position="17"}
                else{new_position="71"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(9)
                this.moves.push(row+column)  
                R.next();
            }
        },
        {///////Silver
            "priority":8,
            "condition": function(R) {	
                //console.log("Rule: Yagura silver 2")
                var notPositioned = false 
                if(this.piece=="S" && ((this.column==1 && this.row==7 && this.player=="1")||(this.column==7 && this.row==1 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura silver 2")
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
        //////////////////////// 7
        {///////Pawn
            "priority":7,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="P" && ((this.column==4 && this.row==6 && this.player=="1")||(this.column==4 && this.row==2 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="34"}
                else{new_position="54"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(7)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////Pawn
            "priority":7,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="P" && ((this.column==3 && this.row==6 && this.player=="1")||(this.column==5 && this.row==2 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="35"}
                else{new_position="53"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(7)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////Golden
            "priority":6,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="G" && ((this.column==5 && this.row==8 && this.player=="1")||(this.column==3 && this.row==0 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura golden 1")
                var new_position
                if(this.player=="0"){new_position="14"}
                else{new_position="74"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(7)
                //console.log(row+column)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////Golden
            "priority":4,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="G" && ((this.column==3 && this.row==8 && this.player=="1")||(this.column==5 && this.row==0 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura golden 2")
                var new_position
                if(this.player=="0"){new_position="16"}
                else{new_position="72"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(7)
                this.moves.push(row+column)  
                R.next();
            }
        },

        /////////////////////// 5
        {///////Bishop
            "priority":7,
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
                if(this.player=="0"){new_position="06"}
                else{new_position="82"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(5)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////Bishop
            "priority":7,
            "condition": function(R) {	
                var notPositioned = false 
                var sente_row = this.state.G.cells[1]
                var gote_row = this.state.G.cells[7]
                if(this.piece=="B" && ((this.column==2 && this.row==8 && this.player=="1")||(this.column==6 && this.row==0 && this.player=="0"))
                    && ((this.player=="0" && sente_row[6]!=null) || ((this.player=="1" && gote_row[2]!=null)))
                ){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="15"}
                else{new_position="73"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(5)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////King
            "priority":6,
            "condition": function(R) {	
                var notPositioned = false 
                var sente_row = this.state.G.cells[0]
                var gote_row = this.state.G.cells[8]
                if(this.piece=="KING" && ((this.column==4 && this.row==8 && this.player=="1")||(this.column==4 && this.row==0 && this.player=="0"))
                && !((this.player=="0" && sente_row[5]!=null) || ((this.player=="1" && gote_row[3]!=null)))
                ){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="05"}
                else{new_position="83"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(5)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////Golden
            "priority":6,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="G" && ((this.column==4 && this.row==7 && this.player=="1")||(this.column==4 && this.row==1 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="25"}
                else{new_position="63"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(5)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////King
            "priority":5,
            "condition": function(R) {	
                var notPositioned = false 
                var sente_row = this.state.G.cells[1]
                var gote_row = this.state.G.cells[7]
                if(this.piece=="KING" && ((this.column==3 && this.row==8 && this.player=="1")||(this.column==5 && this.row==0 && this.player=="0"))
                && !((this.player=="0" && sente_row[6]!=null) || ((this.player=="1" && gote_row[2]!=null)))
                ){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="16"}
                else{new_position="72"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(5)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////King
            "priority":5,
            "condition": function(R) {	
                var notPositioned = false 
                var sente_row = this.state.G.cells[1]
                var gote_row = this.state.G.cells[7]
                var sente_row_bishop = this.state.G.cells[0]
                var gote_row_bishop = this.state.G.cells[8]
                if(this.piece=="KING" && ((this.column==3 && this.row==8 && this.player=="1")||(this.column==5 && this.row==0 && this.player=="0"))
                && ((this.player=="0" && sente_row[6]!=null) || ((this.player=="1" && gote_row[2]!=null)))
                && !((this.player=="0" && sente_row[7]!=null) || ((this.player=="1" && gote_row[1]!=null)))
                ){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="06"}
                else{new_position="82"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(5)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////King
            "priority":5,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="KING" && ((this.column==2 && this.row==7 && this.player=="1")||(this.column==6 && this.row==1 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="17"}
                else{new_position="71"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(5)
                this.moves.push(row+column)  
                R.next();
            }
        },

        {///////King
            "priority":5,
            "condition": function(R) {	
                var notPositioned = false 
                if(this.piece=="KING" && ((this.column==2 && this.row==8 && this.player=="1")||(this.column==6 && this.row==0 && this.player=="0"))){notPositioned=true}
                R.when(
                    notPositioned &&
                    this.possibleMoves!="" && this.player==this.state.ctx.currentPlayer && this.isHand=="0"
                    );
            },
            "consequence": function(R) {
                //console.log("Rule activated: Yagura pawn")
                var new_position
                if(this.player=="0"){new_position="17"}
                else{new_position="71"}
                var row = new_position.substr(0,1)
                var column = new_position.substr(1,1)
                this.priorities.push(5)
                this.moves.push(row+column)  
                R.next();
            }
        },


        
]

module.exports = {Yagura};
