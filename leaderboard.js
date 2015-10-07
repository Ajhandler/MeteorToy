PlayerList = new Mongo.Collection('players');

if(Meteor.isClient){
  // Only runs on the client
  console.log("Hello Client");
  // Template = searches templates
  //.leaderboard = reference to  the name of template
  //.helpers keyword to define multiple keyword functions in one
  Template.leaderboard.helpers({
    'player': function(){
      return PlayerList.find();
    },
    'numberOfPlayers': function(){
      return PlayerList.find().count();
    },
    'selectedClass':function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return 'selected';
      }
    }
  });
  //EVENTS
  //events keyword that specifies the events for named template
  Template.leaderboard.events({
    'click .player': function(){
     var playerId = this._id;
     Session.set('selectedPlayer', playerId);
    }
  });
} // end isClient

if(Meteor.isServer){
  // This only runs on server
}