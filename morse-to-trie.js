var morseCode = require('./morse-code.json');

function State(id,emit){
  this.id = id;
  this.transitions = {};
  this.emit = emit;
}

var trieRoot = new State('idle');

Object.keys(morseCode).forEach(function(c){
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
  currentNode.transitions['shortpause'] = new State(prefix + '-terminal',c);   //followed by a dash, takes you to terminal

  //anything else takes you to a parser error
});

module.exports = trieRoot;
