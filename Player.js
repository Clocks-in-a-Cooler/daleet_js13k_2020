class Player extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        this.size = new Vector(0.8, 1.8);
        this.pos  = this.pos.minus(this.size).plus(new Vector(0, 0.7));
        this.dir  = "right";
        
        this.jumped = false;
        this.fired  = false;
        
        this.double_jump = true;
    }
    
    move_x(lapse) {
        if (this.level.status == "lost") return;
        var motion  = (keys.left ? -1 : 0) + (keys.right ? 1 : 0);
        var new_pos = this.pos.plus(new Vector(lapse * this.speed_x, 0).times(motion));
        
        if (motion > 0) this.dir = "right";
        if (motion < 0) this.dir = "left";
        
        var data = this.check_collision(new_pos);
        if (data.collided) {
            this.double_jump = true;
        }
        data.entities.forEach(e => {
            e.collision(this);
            this.check_kill(e);
        });
    }
    
    move_y(lapse) {
        // first update vertical motion
        if (!this.jumped && keys.jump && (this.vertical_motion == 0 || this.double_jump) && this.level.status != "lost") {
            this.jumped = true;
            if (this.vertical_motion != 0) {
                this.double_jump = false;
            }
            this.vertical_motion = -this.jump;
        }
        this.jumped = this.jumped && keys.jump;
        
        this.vertical_motion += this.gravity * lapse;
        
        this.vertical_motion = Math.min(this.terminal_velocity, this.vertical_motion);
        
        // generate a new position
        var new_pos = this.pos.plus(new Vector(0, this.vertical_motion * lapse));

        var data = this.check_collision(new_pos);
        
        if (data.collided) {
            this.vertical_motion = 0;
            this.double_jump     = true;
        }
        
        // cycle through all of the entities we hit...
        data.entities.forEach(e => {
            e.collision(this);
            this.check_kill(e);
        });
    }
    
    move_y_no_physics(lapse) {
        if (this.level.status == "lost") return;
        var motion  = (keys.jump ? -1 : 0) + (keys.down ? 1 : 0);
        var new_pos = this.pos.plus(new Vector(0, lapse * this.speed_x).times(motion));
        
        this.check_collision(new_pos).entities.forEach(e => {
            e.collision(this);
            this.check_kill(e);
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
        // a cute little blue box
        super.draw(cxt);
        if (this.level.status == "won") {
            // ^_^
            this.colour = "deepskyblue";
            
            var start_coords = viewport.get_screen_coords(this.pos.plus(new Vector(0.1, 0.4)));
            cxt.beginPath();
            cxt.moveTo(start_coords.x, start_coords.y);
            cxt.lineTo(start_coords.x + scale * 0.1, start_coords.y - scale * 0.1);
            cxt.lineTo(start_coords.x + scale * 0.2, start_coords.y);
            cxt.moveTo(start_coords.x + scale * 0.4, start_coords.y);
            cxt.lineTo(start_coords.x + scale * 0.5, start_coords.y - scale * 0.1);
            cxt.lineTo(start_coords.x + scale * 0.6, start_coords.y);
            cxt.moveTo(start_coords.x, start_coords.y);
            cxt.closePath();
            cxt.stroke();
            return;
        }
        
        if (this.level.status == "lost") {
            // x_x
            this.colour = "lightsteelblue";
            
            var start_coords = viewport.get_screen_coords(this.pos.plus(new Vector(0.1, 0.4)));
            cxt.beginPath();
            cxt.moveTo(start_coords.x, start_coords.y);
            cxt.lineTo(start_coords.x + scale * 0.2, start_coords.y + scale * 0.2);
            cxt.moveTo(start_coords.x, start_coords.y + scale * 0.2);
            cxt.lineTo(start_coords.x + scale * 0.2, start_coords.y);
            cxt.moveTo(start_coords.x + scale * 0.4, start_coords.y);
            cxt.lineTo(start_coords.x + scale * 0.6, start_coords.y + scale * 0.2);
            cxt.moveTo(start_coords.x + scale * 0.4, start_coords.y + scale * 0.2);
            cxt.lineTo(start_coords.x + scale * 0.6, start_coords.y);
            cxt.closePath();
            cxt.stroke();
            return;
        }
        var screen_coords = viewport.get_screen_coords(this.pos.plus(new Vector(this.dir == "left" ? 0.2 : 0.4, 0.3)));
        cxt.strokeRect(screen_coords.x, screen_coords.y, 1, 1);
        cxt.strokeRect(screen_coords.x + 0.2 * scale, screen_coords.y, 1, 1);
    }
    
    collision(other) {
        // ignore, since collisions with the player are handled with cycle()
        this.active = true;
    }
    
    check_kill(entity) {
        if (
            entity instanceof Bullet ||
            entity instanceof Crush_trap ||
            entity instanceof Spike_trap
        ) {
            this.level.lose();
        }
        
        if (entity instanceof Crush_trap && entity.dir != null) {
            this.level.lose(); // a stationary crush trap is safe
        }
        
        if (entity instanceof Monster && entity.pos.y + entity.size.y <= this.pos.y + this.size.y && !entity.dead) {
            this.level.lose();
        }
    }
}

Player.prototype.speed_x = 0.007;
Player.prototype.jump    = 0.017;