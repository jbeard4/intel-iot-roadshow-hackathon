# build and start an ephemeral instance

scxml save event_processor.scxml
scxml run event_processor.scxml -n _singleton
scxml viz event_processor.scxml/_singleton 
scxml send event_processor.scxml/_singleton system.start
scxml interact event_processor.scxml/_singleton
scxml rm event_processor.scxml/_singleton   # clean up when shell terminates - delete the instance

