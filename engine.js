var current_level = null;

// i've done this more times than i can count...
var last_time = null;
function animate(time) {
    var lapse;
    if (last_time == null) {
        lapse = 0;
    } else {
        lapse = time - last_time;
    }
    
    if (current_level == null) {
        return;
    }
    
    var max_step = features_deleted["physics"] ? lapse : 25; // BREAK THE GAME
    
    while (lapse > 0) {
        var step = Math.min(max_step, lapse);
        lapse   -= step;
        current_level.cycle(step);
    }
    
    viewport.update().draw();
}

function save_progress() {
    // save the current level, however that works
}

function load_progress() {
    // load the saved level, however that works
}

var canvas   = document.querySelector("canvas");
canvas.width = canvas.height = 550;
var context  = canvas.getContext("2d");
var scale    = 25;

var viewport = {
    width: canvas.width / scale,
    height: canvas.height / scale,
    
    top: null,
    left: null,
    
    update: function() {
        var left_margin = this.left + this.width / 3, right_margin  = this.left + 2 * this.width / 3;
        var top_margin  = this.top + this.height / 3, bottom_margin = this.top + 2 * this.height / 3;
        
        var player = current_level.player;
        if (player.pos.x < left_margin) {
            this.left -= left_margin - player.pos.x;
        }
        if (player.pos.x > right_margin) {
            this.left += player.pos.x - right_margin;
        }
        if (player.pos.y < top_margin) {
            this.top -= top_margin - player.pos.y;
        }
        if (player.pos.y > bottom_margin) {
            this.top += player.pos.y - bottom_margin;
        }
        
        return this;
    },
    
    // don't know if this is the most efficient way to do it...but whatever. it's Spidermonkey's problem, not mine
    draw: function() {
        var left_bound = Math.floor(this.left), right_bound = Math.ceil(this.left + this.width);
        var top_bound  = Math.floor(this.top), bottom_bound = Math.ceil(this.top + this.height);
        
        for (var y = top_bound; y <= bottom_bound; y++) {
            for (var x = left_bound; x <= right_bound; x++) {
                if (current_level.get_tile(new Vector(x, y))) {
                    var screen_coords = this.get_screen_coords(new Vector(x, y));
                    // just draw a box for a wall
                    context.strokeStyle = "black", context.lineWidth = 2;
                    context.strokeRect(screen_coords.x, screen_coords.y, scale, scale);
                }
            }
        }
        
        // draw the entities...by letting them draw themselves
        current_level.entities.forEach(e => e.draw(context));
    },
    
    get_screen_coords: function(pos) {
        return pos.minus(new Vector(this.left, this.top)).times(scale);
    },
};