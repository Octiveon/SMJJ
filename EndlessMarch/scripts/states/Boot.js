var Boot = function(game) {};
Boot.prototype = {
    preload: function () {
    },
    create: function () {
      //Sets up game window settings
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.state.start('preload');
    },

};
