(function(){
  'use strict';

  angular.module('users')
         .service('userService', ['$q', '$http', UserService]);

  function UserService($q, $http){
    // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        var users = [];    
        $http({
          method: 'GET',
          url: 'http://localhost:10010/api/contacts'
        }).then(function successCallback(response) {
          if(response){
            angular.forEach(response.data.contacts, function (contact) {
              contact.avatar = 'svg-1';
              this.push(contact);
            }, users);
          }
        }, function errorCallback(response) {
            users = [];
        });
        return $q.when(users);
      },


      saveUser: function(user){
        var savePromise = $http({
          method: 'POST',
          url: 'http://localhost:10010/api/contacts',
          data: {
              "name": user.name,
              "title": user.title,
              "email": user.email,
              "email1": user.email1,
              "email2": user.email2,
              "email3": user.email3,
              "phone": user.phone,
              "phone1": user.phone1,
              "phone2": user.phone2,
              "phone3": user.phone3,
              "address": user.address,
              "company": user.company,
              "token": user.token
          }
        });     

        savePromise.then(function(response){
            return response;
        });   

        return savePromise;
      },

      updateUser: function(user){
        var updatePromise = $http({
          method: 'PUT',
          url: 'http://localhost:10010/api/contacts/' + user._id,
          data: {
              "name": user.name,
              "title": user.title,
              "email": user.email,
              "email1": user.email1,
              "email2": user.email2,
              "email3": user.email3,
              "phone": user.phone,
              "phone1": user.phone1,
              "phone2": user.phone2,
              "phone3": user.phone3,
              "address": user.address,
              "company": user.company,
              "token": user.token
          }
        });     

        updatePromise.then(function(response){
            return response;
        });   

        return updatePromise;
      },

      deleteUser: function(user){
        var deletePromise = $http({
          method: 'DELETE',
          url: 'http://localhost:10010/api/contacts/' + user._id +"?token=" + user.token
        });     

        deletePromise.then(function(response){
            return response;
        });   

        return deletePromise;
      },


      authenticate: function(username, password){
        var promiseAuth = $http({
          method: 'POST',
          url: 'http://localhost:10010/api/authenticate',
          data: {
              "username": username,
              "password": password,
          }
        });  

        promiseAuth.then(function(response){
            return response;
        });   

        return promiseAuth;
      }


    };
  }

})();


