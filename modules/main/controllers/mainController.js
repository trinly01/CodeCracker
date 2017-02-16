(function(){
    
    angular
    .module('app')
    .controller('mainController', mainController);

    function mainController($scope, $mdDialog, $mdToast) {
        $scope.codeInput = [0,0,0];
        $scope.passcode = [0,0,0];
        $scope.clues = [];
        $scope.level = 0;
        $scope.score = 0;
        $scope.step = 7;
        $scope.numberOfClues = 5;
        
        $scope.levelInWord = function(lvl){
            if(lvl<1)
                return 'Easy';
            else if(lvl<2)
                return 'Moderate';
            else
                return 'Hard';
        }
        
        $scope.generateRandomNumber = function(min, max){
            return Math.floor(Math.random()*(max-min+1)+min);
        }
        
        $scope.generatePasscode = function(){
            $scope.clues=[];
            for(var x=0; x<$scope.numberOfClues; x++){
                $scope.clues.push({0:0,1:0,2:0});
            }
            
            var arr = [];
            for (key in $scope.passcode){
                var newCode = $scope.generateRandomNumber(0, $scope.level+$scope.step);
                while(arr.indexOf(newCode)>-1){
                    newCode = $scope.generateRandomNumber(0, $scope.level+$scope.step);
                }
                $scope.passcode[key] = newCode;
                arr.push(newCode);
            }
            console.log('ANSWER', $scope.passcode);
            
            for (clue in $scope.clues){
                var arr = [];
                for (ind in $scope.clues[clue]){
                    var newCode = $scope.generateRandomNumber(0, $scope.level+$scope.step);
                    while(arr.indexOf(newCode)>-1){
                        newCode = $scope.generateRandomNumber(0, $scope.level+$scope.step);
                    }
                    $scope.clues[clue][ind] = newCode;
                    arr.push(newCode);
                }
            }
        }
        
        $scope.countCorrectCode = function(clue){
            var count = 0;
            for (key in $scope.passcode){
                for (ind in clue){
                    if(clue[ind] == $scope.passcode[key])
                        count++;
                }
            }
            return count;
        }
        
        $scope.countCorrectPosition = function(clue){
            var count = 0;
            for (key in $scope.passcode){
                if(clue[key] == $scope.passcode[key])
                    count++;
            }
            return count;
        }
        
        $scope.showDialPad = function(){
            
            $mdDialog.show({
                //locals:{user: user, myAccount: $scope.myAccount},
                controller: dialPadController,
                templateUrl: 'modules/main/views/dialPad.html',
                parent: angular.element(document.querySelector('#clues')),
                clickOutsideToClose:true,
                fullscreen: false // Only for -xs, -sm breakpoints.
            });
            
            var codeInput = $scope.codeInput;
            var passcode = $scope.passcode;
            var $parentScope = $scope;
            
            function dialPadController($scope, $timeout){
                $scope.codeInput = codeInput;
                var counter = 0
                $scope.changeCode = function(num) {
                    $scope.codeInput[counter] = num;
                    
                    if(counter==2){
                        console.log($scope.codeInput);
                        
                        
                        for(var x=0; x<$scope.codeInput.length; x++){

                            if($scope.codeInput[x]!=passcode[x]){
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent("Wrong Code! Try again")
                                        .position('top right')
                                        .hideDelay(3000)
                                        .parent(angular.element( document.querySelector( '#dialPad' ) ))
                                );
                                
                                $timeout(function(){
                                    $scope.codeInput[0] = 0;
                                    $timeout(function(){
                                        $scope.codeInput[1] = 0;
                                        $timeout(function(){
                                            $scope.codeInput[2] = 0;
                                        },150);
                                    },250);
                                },500);
                                
                                x=2;
                                break;
                            }
                            else {
                                if($parentScope.score<20)
                                    $timeout(function(){
                                        $parentScope.score++;
                                        $timeout(function(){
                                            $parentScope.score++;
                                        }, 250);
                                    }, 500);
                                else if ($parentScope.score<50)
                                    $timeout(function(){
                                        $parentScope.score++;
                                        $timeout(function(){
                                            $parentScope.score++;
                                            $timeout(function(){
                                                $parentScope.score++;
                                                $parentScope.level++;
                                                $parentScope.numberOfClues = $parentScope.numberOfClues + 2;
                                            }, 200);
                                        }, 250);
                                    }, 500);
                                else if ($parentScope.score<75)
                                    $timeout(function(){
                                        $parentScope.score++;
                                        $timeout(function(){
                                            $parentScope.score++;
                                            $timeout(function(){
                                                $parentScope.score++;
                                                $timeout(function(){
                                                    $parentScope.score++;
                                                    $timeout(function(){
                                                        $parentScope.score++;
                                                        $parentScope.level++;
                                                        $parentScope.numberOfClues = $parentScope.numberOfClues + 2;
                                                        if($parentScope.level>2){
                                                            $parentScope.level--;
                                                            $parentScope.numberOfClues = $parentScope.numberOfClues - 2;
                                                        }
                                                    }, 150);
                                                }, 200);
                                            }, 250);
                                        }, 500);
                                    }, 750);
                                
                                $parentScope.generatePasscode();
                                $scope.codeInput
                                
                                $mdToast.show(
                                    $mdToast.simple()
                                        .textContent("Correct!")
                                        .position('top right')
                                        .hideDelay(3000)
                                        .parent(angular.element( document.querySelector( '#main-container' ) ))
                                );
                                $timeout(function(){
                                    $scope.codeInput[0] = 0;
                                    $timeout(function(){
                                        $scope.codeInput[1] = 0;
                                        $timeout(function(){
                                            $scope.codeInput[2] = 0;
                                        },150);
                                    },250);
                                },500);
                                $mdDialog.hide();
                                x=2;
                                break;
                            }
                        }
                        counter = 0;
                    } 
                    else
                        counter++;
                }
            }
            
        }
        
        $scope.generatePasscode();
    }
})();