class Level {
    // i've done a million times before, i swear...
    constructor(plan) {
        this.height   = plan.length;
        this.width    = plan[0].length;
        this.grid     = [];
        this.entities = [];
        
        for (var y = 0; y < this.height; y++) {
            var plan_gridline = plan[y];
            var gridline      = [];
            for (var x = 0; x < this.width; x++) {
                var char  = plan_gridline[x];
                var Actor = entity_keys[char];
                if (Actor) {
                    var entity = new Actor(new Vector(x, y), this, char);
                    if (Actor == Player) {
                        this.player = entity;
                    }
                    this.entities.push(entity);
                }
                var tile = tile_keys[char];
                gridline.push(tile);
            }
            this.grid.push(gridline);
        }
    }
    
    cycle(lapse) {
        this.entities = this.entities.filter(e => e.active);
        this.entities.forEach(e => e.cycle(lapse));
    }
    
    get_tile(coords) {
        if (coords.y >= this.height || coords.y < 0) {
            return null;
        }
        if (coords.x >= this.width || coords.x < 0) {
            return null;
        }
        return this.grid[coords.y][coords.x];
    }
    
    get_tile_obstacles(pos, size) {
        var left_bound = Math.floor(pos.x), right_bound  = Math.ceil(pos.x + size.x);
        var top_bound  = Math.floor(pos.y), bottom_bound = Math.ceil(pos.y + size.y);
        
        if (left_bound < 0 || right_bound > this.width || top_bound < 0 || bottom_bound > this.height) {
            return "wall";
        }
        
        for (var y = top_bound; y < bottom_bound; y++) {
            for (var x = left_bound; x < right_bound; x++) {
                var tile = this.grid[y][x];
                if (tile) return tile;
            }
        }
        return null;
    }
    
    get_entities(entity, pos, size) {
        // gets overlapping entities
        return this.entities.filter(e => {
            return e != entity &&
                e.pos.x + e.size.x > pos.x &&
                e.pos.x < pos.x + entity.size.x &&
                e.pos.y + e.size.y > pos.y &&
                e.pos.y < pos.y + entity.size.y;
        });
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
    "«": Shooting_trap, // "«" is ALT + [
    "»": Shooting_trap, // "»" is ALT + ]
}