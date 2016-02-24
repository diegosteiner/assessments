angular.module('starter.services', [])

.factory('Posts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Martin',
    text: 'Trying Ionic!',
    face: 'img/ben.png',
    likes: 0,
    comments: [
      {id: 1, user: 'Max Lynx', text: 'That\'s great!'}
    ]
  }, {
    id: 1,
    name: 'Max Lynx',
    text: 'Hey, it\'s me',
    face: 'img/max.png',
    likes: 0,
    comments: [
      {id: 2, user: 'Adam Bradleyson', text: 'This is a comment!'}
    ]
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    text: 'I should buy a boat',
    face: 'img/adam.jpg',
    likes: 0,
    comments: []
  }, {
    id: 3,
    name: 'Perry Governor',
    text: 'Look at my mukluks!',
    face: 'img/perry.png',
    likes: 0,
    comments: []
  }, {
    id: 4,
    name: 'Mike Harrington',
    text: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    likes: 0,
    comments: []
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    like: function(post) {
      post.likes++;
    },
    add: function(data) {
      var maxId;
      angular.forEach(chats, function(obj) {
        maxId = Math.max(maxId, obj.id);
      });
      chats.splice(0, 0, angular.extend(data, {likes: 0, id: maxId}));
    },
    addComment: function(post, comment) {
      post.comments.push(comment);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
