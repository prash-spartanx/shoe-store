angular.module('adminApp', [])
.controller('AdminController', function($scope, $http, $window) {
    $scope.checkAuth = function() {
        $scope.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!$scope.currentUser || $scope.currentUser.role !== 'admin') {
            $window.location.href = 'login.html';
        }

        // Load all rentals
        $http.get('http://localhost:3000/rentals')
            .then(function(response) {
                $scope.rentals = response.data;
            })
            .catch(function() {
                alert('Failed to load rentals.');
            });
    };

    $scope.logout = function() {
        sessionStorage.removeItem('currentUser');
        $window.location.href = 'login.html';
    };

    $scope.newFurniture = {};

    // Load all furniture
    $http.get('http://localhost:3000/furnitures')
        .then(function(response) {
            $scope.furnitures = response.data;
        })
        .catch(function() {
            alert('Failed to load furnitures.');
        });

    $scope.addFurniture = function() {
        $scope.newFurniture.rented = false; // default state
        $http.post('http://localhost:3000/furnitures', $scope.newFurniture)
            .then(function() {
                alert('Furniture added successfully!');
                $scope.newFurniture = {};

                // Refresh list
                $http.get('http://localhost:3000/furnitures')
                    .then(function(response) {
                        $scope.furnitures = response.data;
                    });
            })
            .catch(function() {
                alert('Failed to add furniture.');
            });
    };

    $scope.deleteFurniture = function(furnitureId) {
        if (confirm('Are you sure you want to delete this item?')) {
            $http.delete('http://localhost:3000/furnitures/' + furnitureId)
                .then(function() {
                    $scope.furnitures = $scope.furnitures.filter(function(f) {
                        return f.id !== furnitureId;
                    });
                    alert('Furniture deleted successfully!');
                })
                .catch(function() {
                    alert('Failed to delete furniture.');
                });
        }
    };

    $scope.viewRentalDetails = function(rental) {
        alert(
            'Rental Details:\n\n' +
            'Item ID: ' + rental.itemId + '\n' +
            'User Name: ' + rental.userName + '\n' +
            'Email: ' + rental.email + '\n' +
            'Phone: ' + rental.phone + '\n' +
            'Rental Date: ' + new Date(rental.rentalDate).toLocaleDateString()
        );
    };
});