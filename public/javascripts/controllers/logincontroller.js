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
            if(response.data.IsSuccess == true && response.data.Data != 0){
                window.location.href = "/dashborad";
            }else{
                swal("Oops", response.data.Message, "error");
            }
        },
        function (error) {
          swal("Oops", error.data.Message, "error");
        if (error.status = 401) {
            window.location,href = AUTO_LOGOUT;
        }
        console.error("Somthing Went Wrong!");
        }
      );
    }
});