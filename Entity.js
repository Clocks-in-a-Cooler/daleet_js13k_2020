class Entity {
    // the superclass to ALL the entities!
    // probably want to override a lot of this
    
    constructor(pos, level, char) {
        this.pos    = pos;
        this.size   = new Vector(0, 0);
        this.motion = new Vector(0, 0);
        
        this.level  = level;
        this.active = true;
        
        this.colour = "dodgerblue";
        
        this.collideable = false;
        
        // char can be used to encode extra data about the entity, such as the orientation of spike traps
    }
    
    cycle(lapse) {
        // this might have to be overriden in the Player class...
        this.pos = this.pos.plus(this.motion.times(lapse));
        this.update(lapse);
    }
    
    update(lapse) {
        // nothing...yet
        // override in child classes
    }
    
    destroy() {
        if (this.pos.x + this.size.x < 0 || this.pos.x > this.level.width ||
            this.pos.y + this.size.y < 0 || this.pos.y > this.level.height
        ) {
            this.active = false;
        }
    }
    
    draw(cxt) {
        // override in child classes, if needed
        
        // the default is to draw a box
        cxt.strokeStyle   = this.colour, cxt.lineWidth = 2;
        var screen_coords = viewport.get_screen_coords(this.pos);
        cxt.strokeRect(screen_coords.x, screen_coords.y, this.size.x * scale, this.size.y * scale);
    }
    
    collision(other) {
        // override in traps, monster, and bullets...
        this.active = false;
    }
    
    check_collision(new_pos) {
        var tile_obstacle    = this.level.get_tile_obstacles(new_pos, this.size);
        var entity_obstacles = this.level.get_entities(this, new_pos, this.size);
        
        var collision = true;
        
        if (!(tile_obstacle || entity_obstacles.some(e => e.collideable))) {
            // if there is no wall and no collideable entity, then go to the new position
            this.pos  = new_pos;
            collision = false;
        }
        
        return {
            entities: entity_obstacles,
            collided: collision,
        }; // in case the caller wants to do something with the collideable entities
    }
}

Entity.prototype.gravity           = 0.00003; // use for Player and Monster
Entity.prototype.terminal_velocity = 0.03;