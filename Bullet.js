class Bullet extends Entity {
    constructor(pos, level, char, colour, motion, ignore_gravity) {
        super(pos, level, char);
        
        this.size = new Vector(0.3, 0.3);
        
        this.ignore_gravity = ignore_gravity;
        this.motion         = motion.times(this.speed);
        this.colour         = colour;
    }
    
    cycle(lapse) {
        if (this.ignore_gravity) {
            this.pos = this.pos.plus(this.motion.times(lapse));
        } else {
            this.vertical_motion += this.gravity * lapse;
            this.vertical_motion = Math.min(this.terminal_velocity, this.vertical_motion);
            
            var new_pos = this.pos.plus(new Vector(0, this.vertical_motion * lapse));
            
            var data = this.check_collision(new_pos);
            
            if (data.collided) {
                this.active = false;
            }
        }
        this.destroy(); // failsafe, even though it probably doesn't work
    }
}

Bullet.prototype.speed      = 0.005;
Bullet.prototype.bounciness = 0.003;