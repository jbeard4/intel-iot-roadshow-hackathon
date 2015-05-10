var morseCode = require('./morse-code.json');

function State(id,emit){
  this.id = id;
  this.transitions = {};
  this.emit = emit;
}

var trieRoot = new State('idle');

var re = /[a-z]/;
Object.keys(morseCode).forEach(function(c){

  if(!c.match(re)) return;    //only deal with letters for now

  var code = morseCode[c]; 
  var sequence = code.split('').map(function(x){ return x === '.' ? 'dot' : 'dash'});

  var currentNode = trieRoot; 
  var prefix = '';
  //traverse the tree, lazy-initing nodes as needed, until we reach a terminal
  sequence.forEach(function(s){
    prefix += s;

    currentNode =
      currentNode.transitions[s] = 
        currentNode.transitions[s] || new State(prefix);
  });
  currentNode.transitions['short_pause'] = new State(c,c);   //followed by a dash, takes you to terminal

  //anything else takes you to a parser error
});

module.exports = trieRoot;
