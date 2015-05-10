//flatten out the trie - harvest all the states
//replace states with id references
//create a template that generates SCXML code

var trie = require('./morse-to-trie');

var states = [];

function walk(node){
  if(!node.transitions) return;
  states.push(node);
  node.transitions = Object.keys(node.transitions).map(function(event){
    var childState = node.transitions[event];
    walk(childState);
    return {
      event : event,
      target : childState.id
    };
  });
}

walk(trie);

//console.log(JSON.stringify(states,4,4))

//now generate SCXML
var scxmlString = 
  '<?xml version="1.0" encoding="UTF-8"?>' + 
  '<scxml xmlns="http://www.w3.org/2005/07/scxml" name="morse" datamodel="ecmascript" version="1.0">' + 
    states.map(function(state){
      return '<state id="' + state.id + '">' + 
        (
          state.emit ? 
            '<onentry><send type="http://scxml.io/scxmld" target="scxml://publish" event="character" contentexpr="\'' + state.emit + '\'"></send></onentry>' +
            '<transition target="idle"/>' //go back to start 
            : '' ) + 
        state.transitions.map(function(t){
          return '<transition target="' + t.target + '" event="' + t.event + '"/>' 
        }).join('') + 
    '</state>' 
    }).join('') + 
  '</scxml>';

console.log(scxmlString);
