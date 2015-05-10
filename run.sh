# build and start an ephemeral instance

node trie-to-scxml.js > build/morse.scxml
scxml save build/morse.scxml
scxml run morse.scxml -n test
scxml viz morse.scxml/test 
scxml send morse.scxml/test system.start
scxml interact morse.scxml/test
scxml rm morse.scxml/test   # clean up when shell terminates - delete the instance
