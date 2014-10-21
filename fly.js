(function($){

  var gifSrcs = [
    'fly-1.gif',
    'fly-2.gif',
    'fly-3.gif'
  ];

  window.Fly = function(i, cssClass){
      
      if( typeof i == 'undefined' ) i = 0; // Use this to pull different gifs
      if( typeof cssClass == 'undefined' ) cssClass = 'fly';

      var self = this;

      this.height = null;
      this.width  = null;
      this.speed  = 0.01;
      this.klass = cssClass;

      this.img = new Image();
      this.img.onload = function(){
        self.initialize();
      };
      this.img.src = gifSrcs[ i % gifSrcs.length ];

      return this;
  };

  Fly.prototype.initialize = function(){
    this.$el    = $(this.img);
    this.$el.addClass( this.klass );

    this.height = this.$el.height();
    this.width  = this.$el.width();

    $('body').prepend( this.$el );

    this.repositionAndAnimate();

    return this;
  };

  Fly.prototype.repositionAndAnimate = function(){
    this.setRandomPosition();
    this.animate();

    return this;
  };

  Fly.prototype.setRandomPosition = function(){
    var randomPosition = this.getRandomPosition();

    this.$el.css({
      top:  randomPosition.y,
      left: randomPosition.x
    });

    return this;

  };

  Fly.prototype.getRandomPosition = function(){ // Random position in the viewport where the fly is still visible
    var h = $(window).height() - this.height;
    var w = $(window).width()  - this.width;

    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h)
    };

  };

  Fly.prototype.getDistanceToNewPosition = function(newPosition){
    var offset = this.$el.offset();
    var currentPosition = {
      x: offset.left,
      y: offset.top
    };
    var xSqrd = Math.pow(newPosition.x - currentPosition.x, 2);
    var ySqrd = Math.pow(newPosition.y - currentPosition.y, 2);

    return Math.sqrt( xSqrd + ySqrd );

  };

  Fly.prototype.stop = function(){
    this.$el.stop();

    return this;
  };

  Fly.prototype.animate = function(){
    
    var self = this;

    var newPosition           = this.getRandomPosition();
    var distanceToNewPosition = this.getDistanceToNewPosition( newPosition );
    var animationDuration     = distanceToNewPosition / this.speed;

    if( this.$el.is(':animated') ) this.stop();

    this.$el.animate({
      top: newPosition.y,
      left: newPosition.x,
    }, animationDuration, function(){
      self.animate();
    });

    return this;
  };

 })(jQuery) 