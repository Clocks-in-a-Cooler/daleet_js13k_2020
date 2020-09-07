// handles animation, timing, key event handlers, and saving game data that's not the features

var current_level = null;
var game_progress = 0;

// i've done this more times than i can count...
var last_time = null;
function animate(time) {
    var lapse;
    if (last_time == null) {
        lapse = 0;
    } else {
        lapse = time - last_time;
    }
    last_time = time;
    
    if (current_level == null) {
        return;
    }
    
    var max_step = 50;
    
    while (lapse > 0) {
        var step = Math.min(max_step, lapse);
        lapse   -= step;
        current_level.cycle(step);
    }
    
    viewport.update().draw();
    requestAnimationFrame(animate);
}

function save_progress() {
    sessionStorage.setItem("game progress", game_progress);
}

function load_progress() {
    game_progress = sessionStorage.getItem("game progress") || 0;
}

function next_level() {
    game_progress++; // i wish life was as simple as life_progress++
    if (game_progress < GAME_LEVELS.length) {
        current_level = new Level(GAME_LEVELS[game_progress]);
    } else {
        notify("You've won!");
        setTimeout(() => {
            notify(`Your score is ${error_score}`);
        }, 2000);
        if (error_score > 2020) {
            setTimeout(() => {
                notify("Your score could have been lower. There were some features you could have kept.");
            }, 4000);
        }
    }
    save_progress();
}

function restart_level() {
    current_level = new Level(GAME_LEVELS[game_progress]);
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
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        var left_bound = Math.floor(this.left), right_bound = Math.ceil(this.left + this.width);
        var top_bound  = Math.floor(this.top), bottom_bound = Math.ceil(this.top + this.height);
        
        for (var y = top_bound; y <= bottom_bound; y++) {
            for (var x = left_bound; x <= right_bound; x++) {
                if (current_level.get_tile(new Vector(x, y))) {
                    var screen_coords = this.get_screen_coords(new Vector(x, y));
                    // we're goin' fancy, boys
                    // bloatin' the game beyond its limits
                    context.strokeStyle = "black", context.lineWidth = 2;
                    if (!current_level.get_tile(new Vector(x, y - 1))) {
                        context.strokeRect(screen_coords.x, screen_coords.y, scale, 0);
                    }
                    if (!current_level.get_tile(new Vector(x, y + 1))) {
                        context.strokeRect(screen_coords.x, screen_coords.y + scale, scale, 0);
                    }
                    if (!current_level.get_tile(new Vector(x - 1, y))) {
                        context.strokeRect(screen_coords.x, screen_coords.y, 0, scale);
                    }
                    if (!current_level.get_tile(new Vector(x + 1, y))) {
                        context.strokeRect(screen_coords.x + scale, screen_coords.y, 0, scale);
                    }
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

var keys = {
    jump: false, // UP arrow or W
    down: false, // DOWN arrow or S
    left: false, // LEFT arrow or A
    right: false, // RIGHT arrow or D
    action: false, // SPACE or (right) SHIFT
}

addEventListener("keydown", evt => {
    switch (evt.code) {
        case "KeyW":
        case "ArrowUp":
            keys.jump = true;
            break;
        case "KeyS":
        case "ArrowDown":
            keys.down = true;
            break;
        case "KeyA":
        case "ArrowLeft":
            keys.left = true;
            break;
        case "KeyD":
        case "ArrowRight":
            keys.right = true;
            break;
        case "Space":
        case "ShiftRight":
            keys.action = true;
            break;
    }
});

addEventListener("keyup", evt => {
    switch (evt.code) {
        case "KeyW":
        case "ArrowUp":
            keys.jump = false;
            break;
        case "KeyS":
        case "ArrowDown":
            keys.down = false;
            break;
        case "KeyA":
        case "ArrowLeft":
            keys.left = false;
            break;
        case "KeyD":
        case "ArrowRight":
            keys.right = false;
            break;
        case "Space":
        case "ShiftRight":
            keys.action = false;
            break;
    }
});

if (!sessionStorage.getItem("delete: tutorial 1")) {
    tell({
        "Hey!": 0,
        "Before we begin, let's go through your abilities first.": 2000,
        "You can move left and right with the left and right arrow keys.": 4000,
        "You can jump with the up arrow.": 6000,
        "You can hug a wall and jump up it.": 8000,
        "You can jump in midair, only once. This ability reloads when you touch the ground.": 10000,
        "You can die. In a lot of ways.": 15000,
        "Okay now. Take a deep breath.": 17000,
        "Every level is impossible, unless you delete just one feature.": 19000,
        "You should only delete one feature at a time.": 22000,
        "Simply select the feature, click delete, then reload the page.": 25000,
        "If you think you deleted the wrong feature, you can reset the whole game.": 28000,
    });
    
    sessionStorage.setItem("delete: tutorial 1", "done");
}
var current_level = 0;