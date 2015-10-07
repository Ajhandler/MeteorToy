PlayerList = new Mongo.Collection('players');
if(Meteor.isClient){
  // Only runs on the client
  // Template = searches templates
  //.leaderboard = reference to  the name of template
  //.helpers keyword to define multiple keyword functions in one
  Template.leaderboard.helpers({
    'player': function(){
      var currentUserId = Meteor.userId();
      return PlayerList.find({createdBy: currentUserId},
                             {sort: {score: -1, name: 1} });
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
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayerList.findOne(selectedPlayer)
    }
  });//end helpers
  //EVENTS
  //events keyword that specifies the events for named template
  Template.leaderboard.events({
    'click .player': function(){
     var playerId = this._id;
     Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.update(selectedPlayer, {$inc: {score: -5} });
    },
    'click .remove':function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayerList.remove(selectedPlayer)
    }
  });// end leaderboard events
  Template.addPlayerForm.events({
    'submit form':function(event){
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      var currentUserId = Meteor.userId();
      PlayerList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });

    }
  });
} // end isClient

if(Meteor.isServer){
  // This only runs on server
}