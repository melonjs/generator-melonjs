game.PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        var image = me.loader.getImage('melonjs');
        var bgImage = me.loader.getImage('bg');

        this.bg = new me.Sprite(0, 0, bgImage);

        this.logo = new me.Sprite(
            me.video.renderer.getWidth()/2 - image.width/2,
            me.video.renderer.getHeight()/2 - image.height/2,
            image
        );

        me.game.world.addChild(this.bg, 1);
        me.game.world.addChild(this.logo, 2);

        this.logo.scale(0.1);
        this.scaleRatio = 0.1;
        var tween = new me.Tween(this).to({scaleRatio: 1}, 3000)
            .onUpdate(function() {this.logo.scale(this.scaleRatio);})
            .repeat(Infinity)
            .yoyo(true)
            .easing(me.Tween.Easing.Cubic.InOut)
            .start();

    },

    onDestroyEvent: function() {
        me.game.world.removeChild(this.logo);
    }
});
