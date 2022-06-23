/* Creating Rule Engine instance */
var RuleEngine = require('node-rules');

///Variables
var G
var state
var rooks = [null,null]

////////////////////////////////////////////////////////////////////////////////////////
/////submit of rules////
var strategy_rules = require('./rules/StrategyRules.js')
var R = new RuleEngine(strategy_rules.StrategyRules,{ignoreFactChanges:true});

/* Run engine for each fact */
export async function executeStrategyEngine(gameState,fn){
    state = gameState
    
    var result_facts =  function func(){
        return new Promise((resolve ,reject)=>{
            submitFacts(gameState,function(result){
            resolve(result)
          }); 
        });
    };  
    let facts = await result_facts(); 
    console.log("Strategy facts: " )  
    console.log(facts)  
    let rules = []
        for (let fact of facts) {
            let m = await new Promise(resolve => 
                R.execute(fact, function (data) {
                    if (data.strategy!=null) {
                        if(data.rook!=null){
                        rooks[parseInt(data.player)]=data.rook}
                        let move_info = data.strategy               
                        resolve(move_info)   
                    } 
                    else{resolve("")}
                })
            );
            
            if(m!=""){rules.push(m)}  
        }
    //console.log("Final rules: " + rules)
    fn(rules)      
}
/////submit of facts////
function submitFacts(state,fn){
    var facts = []
    let G = state.G
    var player_and_piece
    for(let i=0;i<state.ctx.numPlayers;i++){
        var fact = createFact(state,i.toString())
        facts.push(fact)
    }
    
    //facts.push(fact2)
    fn(facts)
}

function createFact(state,player_id){
    var factName = player_id
    if(player_id=="0"){var rival_id="1"}
    else{var rival_id="0"}
    var ruleSet = []
    var factName = {
        "player": player_id.toString(),
        "rook": rooks[player_id],
        "oposing_rook": rooks[rival_id],
        "castle" : null,
        "state" : state,
        "strategy" : ruleSet
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