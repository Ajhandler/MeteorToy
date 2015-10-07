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
    otherHelperFunction: function(){
      return "some other function"
    }
  });
} // end isClient

if(Meteor.isServer){
  // This only runs on server
  console.log("Hello Server");
}