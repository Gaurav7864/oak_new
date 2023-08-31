const { response } = require("../../../app")
const { method } = require("../../../models/users.model")

app.controller("LoginController", ($scope, $http) => {
    $scope.onLogin = function () {
      $http({
        url : BASE_URL,
        method : "POST",
        cache : false,
        data : $scope.form,
        headers :{
            "Content-Type" : "application/json; charset=UTF-8"
        },
      }).then(
        function (response){
            if(response.data.IsSuccess == ture && response.data.Data != 0){
                window.location.href = "/dashbord";
            }else{
                swal("Oops", response.data.Message, "error")
            }
        },
        function (error) {
        console.log(error);
        if (error.status = 401) {
            window.location,href = AUTO_LOGOUT;
        }
        console.error("Somthing Went Wrong!");
        }
      );
    }
});