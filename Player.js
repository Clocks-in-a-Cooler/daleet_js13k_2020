class Player extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        this.size = new Vector(0.8, 1.8);
        this.pos  = this.pos.minus(this.size).plus(new Vector(0, 0.7));
        this.dir  = "right";
        
        this.jumped = false;
        this.fired  = false;
        
        this.vertical_motion = 0;
    }
    
    move_x(lapse) {
        var motion  = (keys.left ? -1 : 0) + (keys.right ? 1 : 0);
        var new_pos = this.pos.plus(new Vector(lapse * this.speed_x, 0).times(motion));
        
        if (motion > 0) this.dir = "right";
        if (motion < 0) this.dir = "left";
        
        // check for collisions
        var tile_obstacle    = this.level.get_tile_obstacles(new_pos, this.size);
        var entity_obstacles = this.level.get_entities(this, new_pos, this.size);
        
        if (!(tile_obstacle || entity_obstacles.some(e => e.collideable))) {
            // if there is no wall and no collideable entity, update to new position
            this.pos = new_pos;
        }
        
        // cycle through all of the entities we hit...
        entity_obstacles.forEach(e => {
            e.collision(this);
            // i dunno, like...?
        });
    }
    
    move_y(lapse) {
        // first update vertical motion
        this.vertical_motion += this.gravity * lapse;
        if (!this.jumped && keys.jump) {
            this.jumped = true;
            this.vertical_motion = -this.jump;
        }
        this.jumped = this.jumped && keys.jump;
        
        this.vertical_motion = Math.min(this.terminal_velocity, this.vertical_motion);
        
        // generate a new position
        var new_pos = this.pos.plus(new Vector(0, this.vertical_motion * lapse));
        
        // check for any collisions
        var tile_obstacle    = this.level.get_tile_obstacles(new_pos, this.size);
        var entity_obstacles = this.level.get_entities(this, new_pos, this.size);
        
        if (!(tile_obstacle || entity_obstacles.some(e => e.collideable))) {
            // if there is no wall and no collideable entity, update to new position
            this.pos = new_pos;
        }
        
        // cycle through all of the entities we hit...
        entity_obstacles.forEach(e => {
            e.collision(this);
            // i dunno, like...?
        });
    }
    
    move_y_no_physics(lapse) {
        var motion  = (keys.jump ? -1 : 0) + (keys.down ? 1 : 0);
        var new_pos = this.pos.plus(new Vector(0, lapse * this.speed_x).times(motion));
        
        // check for collisions
        var tile_obstacle    = this.level.get_tile_obstacles(new_pos, this.size);
        var entity_obstacles = this.level.get_entities(this, new_pos, this.size);
        
        if (!(tile_obstacle || entity_obstacles.some(e => e.collideable))) {
            // if there is no wall and no collideable entity, update to new position
            this.pos = new_pos;
        } else {
            this.vertical_motion = 0;
        }
        
        // cycle through all of the entities we hit...
        entity_obstacles.forEach(e => {
            e.collision(this);
            // i dunno, like...?
        });
    }
    
    cycle(lapse) {
        this.move_x(lapse);
        
        if (features_deleted["physics"]) {
            this.move_y_no_physics(lapse);
        } else {
            this.move_y(lapse);
        }
    }
    
    draw(cxt) {
        // a cute little box
        super.draw(cxt);
        var screen_coords = viewport.get_screen_coords(this.pos.plus(new Vector(this.dir == "left" ? 0.2 : 0.4, 0.3)));
        cxt.strokeRect(screen_coords.x, screen_coords.y, 1, 1);
        cxt.strokeRect(screen_coords.x + 0.2 * scale, screen_coords.y, 1, 1);
    }
    
    collision(other) {
        // ignore, since collisions with the player are handled with cycle()
        this.active = true;
    }
}

Player.prototype.speed_x = 0.007;
Player.prototype.jump    = 0.017;