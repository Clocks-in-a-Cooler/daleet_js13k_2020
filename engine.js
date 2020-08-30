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
}

function save_progress() {
    // save the current level, however that works
}

function load_progress() {
    // load the saved level, however that works
}