app.controller("Singupcontroller", ($scope, $http) => {
    $scope.onSingup = function () {
        console.log('here...');
      $http({
        url : BASE_URL + "singup",
        method : "POST",
        cache : false,
        data : $scope.from,
        headers :{
            "Content-Type" : "application/json; charset=UTF-8"
        },
      }).then(
        function (response){
            if(response.data.IsSuccess ==  && response.data.Data != 0){
                window.location.href = "/";
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