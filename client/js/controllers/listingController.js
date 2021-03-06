angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
      Listings.create($scope.newListing).then(function(response) {
        Listings.getAll().then(function(response) {
          $scope.listings = response.data;
          $scope.newListing.code = '';
          $scope.newListing.name = '';
          $scope.newListing.address = '';
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }, function(error) {
        console.log('Unable to create listing:', error);
      });
    };

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      Listings.delete($scope.listings[index]._id).then(function(response) {
        Listings.getAll().then(function(response) {
          $scope.listings = response.data;
        }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }, function(error) {
        console.log('Unable to delete listing:', error);
      });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);