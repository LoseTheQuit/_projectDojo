'use strict';

console.log("OUTSIDE alloyController");

angular.module("mainModule").controller('alloyController', function($scope, alloy) {

    console.log("INSIDE alloyController");

    $scope.refresh = function(instaQuery) {
        alloy.getUsers(function(response) {
            $scope.serverData = response.data;
            console.log(response.data);
        });
    };

    // CRUD SECTION
    $scope.makeUser = function(instaQuery) {

        alloy.createUser(function(response) {
            $scope.serverData = response.data;
            console.log(response.data);
            $scope.refresh();
        });


    };

    $scope.remove = function(id) {
        alloy.delUser(id, function(response) {
            console.log("_________________________________");
            console.log("remove SUCCESS");
            $scope.refresh();
        });
    }

    let passTheDays;
    let daysPassed = 0;

    $scope._buyCredits = function(id) {

        alloy._edit(id, function(response) {
            console.log("_________________________________");
            console.log("buyCredits SUCCESS");
            console.log(response);
            $scope.updateUI(id);
        });

        clearInterval(passTheDays);
        daysPassed = 0;

        passTheDays = setInterval(function() {

            daysPassed += 1;
            // console.log(`Days Passed: ${daysPassed}`);

            switch (daysPassed) {
                case 30:
                    daysPassed = 0;
                    alloy.delCredits(id, function(response) {
                        $scope.refresh();
                    });
                    clearInterval(passTheDays);
                    break
            }
        }, 1000);

    };

    $scope.updateUI = function(id) {
        alloy.putCreditsAWS(id, function(response) {
            $scope.refresh();
        })
    };

    $scope.serviceOne = function(id) {
        alloy.useServiceOne(id, function(response) {
            console.log("_________________________________");
            $scope.refresh();
        });
    };

    $scope.serviceTwo = function(id) {
        alloy.useServiceTwo(id, function(response) {
            console.log("_________________________________");
            $scope.refresh();
        });
    };

    $scope.refresh();

});
