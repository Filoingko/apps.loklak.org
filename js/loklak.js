var app = angular.module("loklak", ['ngRoute']);
app.controller("status", function ($scope, $http) {
  $http.get("http://loklak.org/api/status.json").
    success(function (data, status, headers, config) {
      $scope.index = data.index;
    });
});

app.controller("search", function ($scope, $http) {
  $scope.query = '';
  $scope.results = [];
  $scope.search = function () {
    if ($scope.query != '') {
      $scope.results = [];
      $http.get("http://loklak.org/api/search.json?q=" + $scope.query).
        success(function (data, status, headers, config) {
          for (var i = 0; i < data.statuses.length; i++) {
            $scope.results.push(data.statuses[i].text);
          }
        });
    }
  }
});

app.filter("reverse", function () {
  return function (items) {
    if (!items || !items.length) {
      return;
    }
    return items.slice().reverse();
  };
});

angular.element(document).ready(function () {
  var navString = "";
  var winLocation = window.location.href;
  $.getJSON("/cms/topmenu.json", function (data) {
    navItems = data.items;
    navItems = navItems.reverse();
    var count = 0;
    $.each( navItems, function (index, itemData) {
      name = Object.keys(itemData);
      link = itemData[name];
      // Now construct the li items
      liItem = "<li>";
      if (winLocation.indexOf(link) != -1 && count != 1) {
        liItem = "<li class='active'>";
        count = count + 1;
      }

        liItem += "<a href='"+link+"'>"+name+"</a></li>";
      liItem = $(liItem);
      $('#navbar > ul').prepend(liItem);
    });
  });
  var lastScrollTop = $(window).scrollTop();
  var sidebarTop = $('.sidebar').position().top;
  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st <= 100){
      $('nav').animate({
        top: "0"
      }, 10);
      $('.sidebar').animate({
        top: sidebarTop
      }, 10);
    }
    else if(st > lastScrollTop && st > 100){
      $('nav').animate({
        top: "-50%"
      }, 5);
      $('.sidebar').animate({
        top: "-5%"
      }, 20);
    }
    lastScrollTop = st;
  });
});
