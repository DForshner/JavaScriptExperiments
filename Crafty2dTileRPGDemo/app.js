
'use strict';

var Game = {

  constants: {
    map: {
      x: 30,
      y: 30,
    },
    tile: {
      width: 16,
      height: 16
    }
  },

  getMapWidth: function() {
    return this.constants.tile.width * this.constants.map.x;
  },

  getMapHeight: function() {
    return this.constants.tile.height * this.constants.map.y;
  },

  getMapHorizontalCenter: function() {
    return this.getMapWidth() / 2;
  },

  getMapVerticalCenter: function() {
    return this.getMapHeight() / 2;
  }

};

var Assets = {

  'sprites': {

    './16x16_forest_2.gif': {
        'tile': 16,
        'tileh': 16,
        'map': {
          'tree': [0, 0],
          'village': [0, 1],
          'bush': [1, 0],
          'rock': [1, 1]
        }
    },

    './hunter.png': {
    },

  }

};

Crafty.sprite(16, './hunter.png', {
  PlayerSprite: [0, 2]
}, 0, 2);

// Actor component - Entity that can be drawn on Grid
Crafty.c("Actor", {
  init: function() {
    this.requires("2D, Canvas, Grid");
  }
});

Crafty.c("Tree", {
  init: function() {
    this.requires("Actor, Solid, tree");
  }
});

Crafty.c("Bush", {
  init: function() {
    this.requires("Actor, Solid, bush");
  }
});

Crafty.scene('Loading', function() {
  console.log('Loading');

  Crafty.load(
    Assets,
    function() {
      console.log('Loaded content');
    },
    function(p) {
      console.log('Loading progress: [' + p.loaded + '/' + p.total +']');
    },
    function() {
      console.log('Failed to load content');
    });

  Crafty.e("2D, DOM, Text")
    .attr({
      x: Game.getMapHorizontalCenter(),
      y: Game.getMapVerticalCenter(),
      w: Game.getMapHorizontalCenter()
    })
    .text('Loading ...');

  Crafty.scene("Game");
});

var generateVillages = function() {
  for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * Game.getMapWidth());
    var y = Math.floor(Math.random() * Game.getMapHeight());
    console.log(x, y, Crafty);

    Crafty.e("2D, Canvas, village")
      .attr({ x: x, y: y, w: 16, h: 16});
  }
};

var generateTrees = function() {
  for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * Game.getMapWidth());
    var y = Math.floor(Math.random() * Game.getMapHeight());
    console.log(x, y, Crafty);

    Crafty.e("2D, Canvas, tree")
      .attr({ x: x, y: y, w: 16, h: 16});
  }
};

// Player
Crafty.c("PlayerCharacter", {
  init: function() {

    this.requires('2D, Canvas, Fourway, SpriteAnimation, PlayerSprite, PlayerAnimation, Collision, Actor, Keaboard')
      .fourway(4)
      .stopOnSolids()
      .onHit("Villages", this.visitVillage)
      .onHit("Tree", this.visitTree)
      .attr({x:100, y:100, w:16, h:16})
      .reel("PlayerMovingRight", 1000, [ [0, 1],  [1, 1], [2, 1] ])
      .reel('PlayerMovingLeft', 1000, [ [0, 3],  [1, 3], [2, 3] ])
      .reel("PlayerMovingDown", 1000, [ [0, 2],  [1, 2], [2, 2] ])
      .reel("PlayerMovingUp", 1000, [ [0, 0],  [1, 0], [2, 0] ]);

    var ANIMATION_SPEED = 8;
    this.bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('PlayerMovingRight', ANIMATION_SPEED, -1); 
      } else if (data.x < 0) {
        this.animate('PlayerMovingLeft', ANIMATION_SPEED, -1); 
      } else if (data.y > 0) {
        this.animate('PlayerMovingDown', ANIMATION_SPEED, -1); 
      } else if (data.y < 0) {
        this.animate('PlayerMovingUp', ANIMATION_SPEED, -1); 
      } else {
        this.pauseAnimation();
        //this.stop();
      }
    });
  },

  stopOnSolids: function() {
    this.onHit("Solid", this.stopMovement);
    return this;
  },

  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  visitVillage: function() {
    console.log("Visit Village!");
  },

  visitTree: function() {
    console.log("Visit Tree!");
  }

});

Crafty.c("Village", {

  init: function() {
    this.requires("Actor, village");
  }

});


// Game loop
Crafty.scene('Game', function() {
  console.log('Game');

  generateVillages();
  generateTrees();

  //Crafty.c("PlayerAnimation", {
    //init: function() {
      //this.requires("SpriteAnimation", "Keyboard")
      //.addComponent("PlayerSprite")
      //.reel("PlayerRunningUp", 1000, [ [0, 0],  [1, 0], [2, 0] ])
      //.reel('PlayerRunningLeft', 1000, [ [0, 2],  [1, 2], [2, 2] ]);
      
      //this.animate("PlayerRunningUp", -1);
      //this.animate("PlayerRunningLeft", -1);
    //}
  //});

  this.player = Crafty.e("PlayerCharacter")
    .attr({ x: 100, y: 100 });

  //var player = Crafty
    //.e('2D, Canvas, Color, Fourway, SpriteAnimation, PlayerSprite, PlayerAnimation')
    //.reel('PlayerRunningUp', 1000, [ [0, 0],  [1, 0], [2, 0] ])
    //.reel('PlayerRunningLeft', 20, [ [0, 2],  [1, 2], [2, 2] ])
    //.animate('PlayerRunningUp', -1)
    //.attr({x:100, y:100, w:16, h:16})
    //.color("blue")
    //.fourway(3)
    //.bind("NewDirection", function(data) {
      //console.log(data);
    //});

  this.button = Crafty.e("2D, Canvas, rock, Mouse")
    .attr({ x: Game.getMapWidth() / 2, y: Game.getMapHeight() - 200 })
    .bind("Click", function() { alert("Clicked Rock!"); });

});

Crafty.scene("Death", function() {
  Crafty.e("2D, DOM, Text")
    .attr({ x: Game.getMapHorizontalCenter(), y: Game.getMapVerticalCenter() })
    .text("You Died!");
});

Game.init =  function(container) {
  console.log('init');

  Crafty.init(this.getMapWidth(), this.getMapHeight(), container);
  Crafty.background('green');

  Crafty.scene("Loading");
}

// Grid component - Locates elements on a grid of tiles
Crafty.c('Grid', {

  init: function() {
    this.attr({
      w: Game.constants.tile.width,
      h: Game.constants.tile.height
    });
  },

  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return {
        x: this.x / Game.constants.map.tile.width,
        y: this.y / Game.constants.map.tile.height
      }
    }

    this.attr({
        x: this.x / Game.constants.map.tile.width,
        y: this.y / Game.constants.map.tile.height
    });
    return this;
  }

});

window.onload = function() {
  var container = document.getElementById('content');
  Game.init(container);
};

