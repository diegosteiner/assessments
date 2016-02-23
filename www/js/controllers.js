angular.module('starter.controllers', [])

.controller('NewsCtrl', function($scope, $state, Posts, $ionicListDelegate) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  // $scope.$on('$ionicView.enter', function(e) {
  // });
  $scope.posts = Posts.all();

  $scope.like = function(post) {
    Posts.like(post);
    $ionicListDelegate.closeOptionButtons();
  };
})

.controller('NewPostCtrl', function($scope, $state, Posts) {
  $scope.newPost = {};

  $scope.addPost = function() {
    $scope.newPost.name = 'User 1';
    $scope.newPost.face = 'img/max.png';
    Posts.add($scope.newPost);
    $state.go('tab.news');
  };
})

.controller('PostDetailCtrl', function($scope, $stateParams, Posts) {
  $scope.post = Posts.get($stateParams.postId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    showPictures: true
  };
});
