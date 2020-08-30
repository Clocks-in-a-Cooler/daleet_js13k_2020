class Level {
    // i've done a million times before, i swear...
    constructor(plan) {
        this.height   = plan.length;
        this.width    = plan[0].length;
        this.grid     = [];
        this.entities = [];
        
        for (var y = 0; y < this.height; y++) {
            var gridline = plan[y];
            for (var x = 0; x < this.width; x++) {
                var char  = gridline[x];
                var Actor = entity_keys
                // finish
            }
        }
    }
    
    cycle(step) {
        // finish
    }
    
    get_tile(coords) {
        if (coords.y > this.height || coords.y < 0) {
            return null;
        }
        if (coords.x > this.width || coords.x < 0) {
            return null;
        }
        return this.grid = [coords.y][coords.x];
    }
    
    get_obstacles(pos, size) {
        var x = Math.ceil(pos.x + size.x + 1); var y = Math.ceil(pos.y + size.y + 1);
        while (y --> pos.y) {
            while (x --> pos.x) {
                var tile = this.get_tile(new Vector(x, y)); // GC: "NOOOO you can't just use up all the memory" | program: "haha objects go brrrr"
                if (tile) {
                    return tile;
                }
            }
        }
        return null;
    }
}

var tile_keys = {
    "#": "wall",
    " ": null, // a blank space on the level
};

var entity_keys = {
    // most of these will be implemented...promise!
    "§": Player,
    ">": Spike_trap,
    "<": Spike_trap,
    "^": Spike_trap,
    "V": Spike_trap,
    "X": Crush_trap,
    "_": Spring_trap,
    "M": Monster,
    "«": Shooting_trap,
    "»": Shooting_trap,
}