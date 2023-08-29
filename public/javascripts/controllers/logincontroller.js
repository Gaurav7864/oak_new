app.controller("LoginController", ($scope, $http) => {
    $scope.onLogin = function () {
      console.log('velue', $scope.form)  
    }
})