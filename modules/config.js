(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyArb4xb5Uzq39I2YZ4ehByhx7MRmSC1LP8",
        authDomain: "mapchat-bb1b6.firebaseapp.com",
        databaseURL: "https://mapchat-bb1b6.firebaseio.com",
        storageBucket: "mapchat-bb1b6.appspot.com",
        messagingSenderId: "277831411644"
      };
      firebase.initializeApp(config);
    
    
    angular
    .module('app')
    .config(function($mdThemingProvider){
        
        $mdThemingProvider
        .theme('default')
        .dark();
        //.primaryPalette('red')
        //.accentPalette('light-blue');
        //.warnPalette('red');
        
    });
    
    
})();