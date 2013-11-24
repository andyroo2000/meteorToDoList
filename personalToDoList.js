Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  Meteor.subscribe("items");

  Template.userItemsList.helpers({
    userItem: function() {
      return Items.find();
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

  Template.item.editing = function() {
    return Session.get("edit-" + this._id);
  };

  Template.item.events({
    'click .list-group-item': function (e, t) {
      Session.set("edit-" + t.data._id, true);
    },
    'keypress input': function (e, t) {
      if (e.keyCode === 13) {
        Items.update(t.data._id, { $set: { item: e.currentTarget.value }});
        Session.set("edit-" + t.data._id, false);
      }
    },
    'click .delete': function (e, t) {
      Items.remove(t.data._id);
    }
  });

  Template.item.rendered = function () {
    var input = this.find("input");
    if (input) {
      input.focus();
    }
  };
}

if (Meteor.isServer) {

  Meteor.startup(function () {
    Meteor.publish("items", function() {
      return Items.find();
    });

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



// http://andyroo2000-todo-list.meteor.com