Users = new Meteor.Collection('users');
Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Template.userItemsList.helpers({
    userItem: function() {
      return Items.find();
    },
    user: function() {
      return Users.findOne();
    }
  });

  Template.userItemsForm.events({
    'click #addItem' : function(e, t) {
      e.preventDefault();
        var el = t.find("#item");
        Items.insert({
          item: el.value,
          date: new Date().toTimeString()
        });
        item.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Users.find().count() === 0) {
      Users.insert({
        total: 120,
        goal: 200
      });
    }
    
    if(Items.find().count() === 0) {
      Items.insert({
        item: 'buy some dental floss',
        date: new Date().toTimeString()
      });
      Items.insert({
        item: 'drop off the laundry',
        date: new Date().toTimeString()
      });
    }

  });

}



