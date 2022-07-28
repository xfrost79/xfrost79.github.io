var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game and looping
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 100, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 800, "y": groundY },
                { "type": "flamebolt", "x": 900, "y": groundY },
                { "type": "enemy", "x": 700, "y": groundY },
                { "type": "reward", "x": 2000, "y": groundY - 60},
            ]
        };
                for (var i = 0; i < levelData.length; i++)  {
                var GameItemObject = levelData.gameItems[i];
                var x = GameItemObject.x;
                var y = GameItemObject.y;
                var type = GameItemObject.type;
                
                if (type === "sawblade"){
                    createSawBlade(x, y);
                }
                
                } 


        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
        var hitZoneSize = 35;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = Math.random()*800 + 600;
        sawBladeHitZone.y = 240;
        sawBladeHitZone.rotationalVelocity = 10;
        game.addGameItem(sawBladeHitZone); 
        var obstacleImage = draw.bitmap('img/sawblade.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);
        }
        //call createSawblade 3 times
      
        //createSawBlade();
       //createSawBlade();
        //createSawBlade();

        function createMyObstacle(x,y)  {
            var hitZoneSize = 35;
            var damageFromObstacle = 30;
            var flameBoltHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            flameBoltHitZone.x = Math.random()*500 + 900;
            flameBoltHitZone.y = Math.random()*100 + 280;
            game.addGameItem(flameBoltHitZone); 
            var obstacleImage = draw.bitmap('img/flamebolt.png');
            obstacleImage.scaleX = .25;
            obstacleImage.scaleY = .25;
            obstacleImage.x = -95;
            obstacleImage.y = -135;
            flameBoltHitZone.addChild(obstacleImage);
            };

        //createMyObstacle();
        
        function createEnemy(x,y){
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-40)
                enemy.fadeOut();
            };

            enemy.onProjectileCollision = function() {
                console.log('Halle hit an enemy');
                game.increaseScore(100)
                enemy.shrink();
            };
        }   
           //createEnemy(400,groundY-20);
            //createEnemy(800,groundY-60);
            //createEnemy(1200,groundY-50);
        
            function createReward(x,y){
                var reward = game.createGameItem('reward',25);
                var blueSquare = draw.rect(50,50,'blue');
                blueSquare.x = -25;
                blueSquare.y = -25;
                reward.addChild(blueSquare);
                reward.x = x;
                reward.y = y;
                game.addGameItem(reward);
                reward.velocityX = -1;
                reward.rotationalVelocity = 10;

                reward.onPlayerCollision = function() {
                    console.log('The reward has hit Halle');
                    game.changeIntegrity(60)
                    reward.fadeOut();
                };

                
            }
            //createReward(800,groundY-120);
    



        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
