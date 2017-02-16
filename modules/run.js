(function(){
    angular
    .module('app')
    .run(run);
    
    function run($window, $rootScope, $mdToast, $mdSidenav){
        
        /*authService.$onAuthStateChanged(function(firebaseUser) {
            $rootScope.firebaseUser = firebaseUser;
            if(firebaseUser)
                console.log('Firebase', firebaseUser);
        });*/

        
        $rootScope.online = navigator.online;
        $window.addEventListener("offline", offlineFunc, false);
        $window.addEventListener("online", onlineFunc, false);
        
        function offlineFunc() {
            
            
            $rootScope.$apply(function(){
                $rootScope.online = false;
                
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('No Internet Connection!')
                        .position('top right')
                        .hideDelay(0)
                );
                
                $rootScope.online = false;
            });
        }
        
        function onlineFunc() {
            $rootScope.$apply(function(){
                $rootScope.online = true;
                
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Internet connection is back!')
                        .position('top right')
                        .hideDelay(3000)
                );
                
                $rootScope.online = true;
            });
        }
    }
})();