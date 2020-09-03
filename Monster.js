class Monster extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        this.size   = new Vector(0.9, 1.6);
        this.colour = "darkmagenta";
        this.type   = Math.random() > game_progress / 10 ? "easy" : "hard";
        
        this.pos.y -= 0.7;
        
        this.vertical_motion = 0;
        
        this.die_delay = -1;
        this.dead      = false; // not yet...
        
        this.facing    = Math.random() > 0.5 ? -1 : 1;
        
        this.active = !features_deleted["monster"];
    }
    
    cycle(lapse) {
        if (this.die_delay > 0) {
            this.die_delay -= lapse;
            if (this.die_delay < 0) {
                this.active = false;
            }
        }
        
        this.last_shot += lapse;
        
        /*
            monster ai
            easy:
            - just move left and right, falling off ledges. when it bumps into something, it changes direction
            
            hard:
            - if there is a wall, attempt to jump or turn around (random chance)
        */
        if (!this.dead) {
            this.vertical_motion += lapse * this.gravity;
            
            var new_pos_x = this.pos.plus(new Vector(this.speed * this.facing * lapse, 0));
            var new_pos_y = this.pos.plus(new Vector(0, this.vertical_motion * lapse));
            
            var data_x = this.check_collision(new_pos_x);
            if (data_x.collided) {
                this.facing *= -1;
                data_x.entities.forEach(e => {
                    e.collision(this);
                    this.check_kill(e);
                });
            }
            var data_y = this.check_collision(new_pos_y);
            if (data_y.collided) {
                this.vertical_motion = 0;
                data_y.entities.forEach(e => {
                    e.collision(this);
                    this.check_kill(e);
                });
            }
            
            if (this.dead) return;
            if (this.type == "hard" && Math.random() < 0.01 && this.vertical_motion == 0) {
                this.bounce();
            }
        }
    }
    
    check_kill(entity) {
        if (
            entity instanceof Bullet ||
            entity instanceof Crush_trap ||
            entity instanceof Spike_trap
        ) {
            this.die();
        }
        
        if (entity instanceof Crush_trap && entity.dir != null) {
            this.die();
        }
        
        if (entity instanceof Player && ((entity.pos.y + entity.size.y) < (this.pos.y + this.size.y)) && this.level.status != "lost") {
            this.die();
            entity.bounce();
        }
    }
    
    collision(other) {
        this.active = true; // dying to be handled by cycle()
    }
    
    die() {
        this.die_delay = 2000;
        this.dead      = true;
        this.colour    = "indianred";
    }
    
    draw(cxt) {
        super.draw(cxt);
        
        if (this.dead) {
            var starting_coords = viewport.get_screen_coords(this.pos.plus(new Vector(0.15, 0.3)));
            cxt.save();
            cxt.translate(starting_coords.x, starting_coords.y);
            cxt.beginPath();
            cxt.moveTo(0, 0);
            cxt.lineTo(scale * 0.2, scale * 0.2);
            cxt.moveTo(0, scale * 0.2);
            cxt.lineTo(scale * 0.2, 0);
            cxt.moveTo(scale * 0.4, 0);
            cxt.lineTo(scale * 0.6, scale * 0.2);
            cxt.moveTo(scale * 0.4, scale * 0.2);
            cxt.lineTo(scale * 0.6, 0);
            cxt.moveTo(0, 0);
            cxt.closePath();
            cxt.stroke();
            cxt.restore();
            return;
        }
        
        var starting_coords = viewport.get_screen_coords(this.pos.plus(new Vector(this.facing < 0 ? 0.1 : 0.3, 0.3)));
        cxt.strokeRect(starting_coords.x, starting_coords.y, scale * 0.2, 5);
        cxt.strokeRect(starting_coords.x + scale * 0.4, starting_coords.y, scale * 0.2, 5);
    }
}

Monster.prototype.speed = 0.005;