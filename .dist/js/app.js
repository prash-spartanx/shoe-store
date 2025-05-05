angular.module('furnitureRentalApp', [])
.controller('FurnitureController', function($scope, $http, $window) {

    $scope.checkAuth = function() {
        $scope.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!$scope.currentUser) {
            $window.location.href = 'login.html';
        }

        $scope.selectedItem = null;
        $scope.rentalDetails = {};

        $http.get('http://localhost:3000/furnitures')
            .then(function(response) {
                $scope.furnitures = response.data;
            });
    };

    $scope.logout = function() {
        sessionStorage.removeItem('currentUser');
        $window.location.href = 'login.html';
    };

    $scope.showRentalForm = function(itemId) {
        $scope.selectedItem = itemId;
        $scope.rentalDetails = {}; // Clear previous form data
    };

    $scope.cancelRentalForm = function() {
        $scope.selectedItem = null;
    };

    $scope.submitRentalForm = function(itemId) {
        // Step 1: Get existing furniture
        $http.get('http://localhost:3000/furnitures/' + itemId)
            .then(function(response) {
                var updatedFurniture = response.data;
                updatedFurniture.rented = true;
                updatedFurniture.rentedBy = {
                    userId: $scope.currentUser.id,
                    username: $scope.currentUser.username,
                    name: $scope.rentalDetails.name,
                    email: $scope.rentalDetails.email,
                    phone: $scope.rentalDetails.phone,
                    address: $scope.rentalDetails.address,
                    offerPrice: $scope.rentalDetails.offerPrice,
                    rentalDate: new Date().toISOString()
                };

                // Step 2: Update the full object using PUT
                return $http.put('http://localhost:3000/furnitures/' + itemId, updatedFurniture);
            })
            .then(function() {
                // Step 3: Log the rental
                var rentalRecord = {
                    itemId: itemId,
                    userId: $scope.currentUser.id,
                    rentalDetails: $scope.rentalDetails,
                    rentalDate: new Date().toISOString()
                };

                return $http.post('http://localhost:3000/rentals', rentalRecord);
            })
            .then(function() {
                alert('Rental submitted successfully!');
                $scope.selectedItem = null;

                // Refresh furniture list
                $http.get('http://localhost:3000/furnitures')
                    .then(function(response) {
                        $scope.furnitures = response.data;
                    });
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Error submitting rental. Please try again.');
            });
    };
});
