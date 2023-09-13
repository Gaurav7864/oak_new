app.controller("SingupController",($scope, $http)=>{
    $scope.onSingup = function(){
        if(Object.keys($scope.from).length > 0){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.from.email) && $scope.from.username && $scope.from.password && $scope.from.password.trim() != ''){
        $http({
            url : SINGUP_URL,
            method : "POST",
            cache : false,
            data : $scope.from,
            headers : {
                "Content-Type":"application/json; charset=UTF-8",
            },
        }).then(
            function(response){
                if(response.data.IsSuccess == true && response.data.Data != 0){
                    window.location.href = "/";
                }else{
                    swal("Oops",response.data.Message,"error")
                }
        },
        function(error){
            swal("Oops", error.data.Message, "error");
            if(error.status == 401){
                window.location.href = AUTO_LOGOUT;
            }
            console.error("something went wrong! try again");
        }
        );
    }else{
        swal("Oops", "invalid email and password to create user", "error");
    }
    
}else{
    swal("Oops", "invalid data to create user", "error");
}
}
});