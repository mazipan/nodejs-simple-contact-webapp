(function(){

  angular
       .module('users')
       .controller('UserController', [
          '$scope', '$timeout', 'userService', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$timeout', '$log',
          UserController
       ]);

  function UserController($scope, $timeout, userService, $mdSidenav, $mdBottomSheet, $mdDialog, $timeout, $log ) {
    var self = this;
    $scope.isOpen               = false;
    $scope.topDirections        = ['left', 'up'];
    $scope.bottomDirections     = ['down', 'right'];
    $scope.isAuthenticated      = false;
    $scope.isLoading            = false;

    self.users                = [];
    self.selected             = null;
    self.selectUser           = selectUser;
    self.toggleList           = toggleUsersList;
    self.makeContact          = makeContact;
    self.showAuthPrompt       = showAuthPrompt;
    self.showPasswordPrompt   = showPasswordPrompt;
    self.removeUser           = removeUser;
    self.removeUserData       = removeUserData;
    self.doRefresh            = doRefresh;

    // Load all registered users
    doRefresh();
    // *********************************
    // Internal methods
    // *********************************

    function doRefresh(){
        $scope.isLoading = true;
        userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = users;
            $timeout(function () {
                self.selected = users[0];
                $scope.isLoading = false;
            }, 500);  
          });
    }

    function getAuth(){
      var auth = sessionStorage.getItem("token");
      if(typeof auth !== "undefined" && auth !== null){
          $scope.isAuthenticated = true;
      }
    }
    getAuth();

    function showAuthPrompt(ev) {
        var confirm = $mdDialog.prompt()
              .title('Do you need Authentication?')
              .textContent('Please, input your credential info')
              .placeholder('Type your username')
              .targetEvent(ev)
              .ok('Next step')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
          if(typeof result !== "undefined" && result !== ""){
            showPasswordPrompt(result);
          }
        });
    };

    function showPasswordPrompt(username) {
        var confirm = $mdDialog.prompt()
              .title('One step again to Authenticated')
              .placeholder('Type your password')
              .ok('Get me In')
              .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
            $scope.isLoading = true;
            userService
                      .authenticate(username, result)
                      .then( function(response) {
                          if(response && response.data.result){                             
                              sessionStorage.setItem("token", response.data.token);
                              $scope.isAuthenticated = true;
                          }
                          $scope.isLoading = false;
                      });
        });
    };

    function removeUser() {
      $scope.isLoading = true;
      self.selected.token = sessionStorage.getItem("token");
      userService
              .deleteUser(self.selected)
              .then( function(response) {
                  self.selected.token = "";
                  if(response){
                    var contact = response.data.contact;
                    contact.avatar = 'svg-1';
                    removeUserData(contact);
                  } 
                  $scope.isLoading = false;
              });
    };

    function removeUserData(userRemover){
        var temp = self.users;
        self.users = [];
        angular.forEach(temp, function (user) {
          user.avatar = 'svg-1';

          if(user._id !== userRemover._id){
            this.push(user);
          }

        }, self.users);
        self.selected = self.users[0];
    };

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? self.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(isActionSave) {

        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './view/contactSheet.html',
          controller    : ['$scope','$mdBottomSheet', 'userService', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController($scope, $mdBottomSheet, userService) {
          var self_child = $scope;
          if(isActionSave){
            self_child.user = {            
                "name": "",
                "title": "",
                "email": "",
                "email1": "",
                "email2": "",
                "email3": "",
                "phone": "",
                "phone1": "",
                "phone2": "",
                "phone3": "",
                "address": "",
                "company": "",
                "token": ""
            };
          }else{
            self_child.user = self.selected;
          }
          

          self_child.saveOrUpdateUser = function(action) {
            if(isActionSave){
              self_child.saveUser();
            }else{
              self_child.updateUser();
            }

            $mdBottomSheet.hide(action);
          };

          self_child.saveUser = function(action) {
            $scope.isLoading = true;
            self_child.user.token = sessionStorage.getItem("token");
            userService
                    .saveUser(self_child.user)
                    .then( function(response) {
                        if(response){
                          var contact = response.data.contact;
                          contact.avatar = 'svg-1';
                          self.users.push(contact);
                        } 
                        $scope.isLoading = false;
                    });
          };


          self_child.updateUser = function(action) {
            $scope.isLoading = true;
            self_child.user.token = sessionStorage.getItem("token");
            userService
                    .updateUser(self_child.user)
                    .then( function(response) {
                        if(response){
                          var contact = response.data.contact;
                          contact.avatar = 'svg-1';
                          self_child.replaceUserData(contact);
                        } 
                        $scope.isLoading = false;
                    });
          };

          self_child.replaceUserData = function(userReplacer){
              var temp = self.users;
              self.users = [];
              angular.forEach(temp, function (user) {
                if(user._id === userReplacer._id){
                  user = userReplacer;
                }
                user.avatar = 'svg-1';
                this.push(user);
              }, self.users);
          };

        }
    }

  }

})();
