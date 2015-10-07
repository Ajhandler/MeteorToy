 Meteor.subscribe('thePlayers');
  // Only runs on the client
  // Template = searches templates
  //.leaderboard = reference to  the name of template
  //.helpers keyword to define multiple keyword functions in one
  Template.leaderboard.helpers({
    'player': function(){
      var currentUserId = Meteor.userId();
      return PlayerList.find({},
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
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove':function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlaye);
    }
  });// end leaderboard events
  Template.addPlayerForm.events({
    'submit form':function(event){
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      Meteor.call('insertPlayerData', playerNameVar);
    }
  });