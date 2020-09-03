class Bullet extends Entity {
    constructor(pos, level, char, colour, motion, ignore_gravity) {
        super(pos, level, char);
        
        this.size = new Vector(0.3, 0.3);
        this.pos  = this.pos.minus(this.size.times(0.5));
        
        this.ignore_gravity = ignore_gravity;
        this.motion         = motion.times(this.speed);
        this.colour         = colour;
        this.bounces        = 0;
    }
    
    cycle(lapse) {
        if (this.ignore_gravity) {
            var new_pos = this.pos.plus(this.motion.times(lapse));
            
            var data = this.check_collision(new_pos);
            
            if (data.collided) {
                this.active = false;
            }
        } else {
            this.vertical_motion += this.gravity * lapse;
            
            var new_pos_y = this.pos.plus(new Vector(0, this.vertical_motion * lapse));
            var new_pos_x = this.pos.plus(new Vector(this.motion.x * lapse, 0));
            
            if (this.check_collision(new_pos_y).collided) {
                this.bounces++;
                this.bounce();
                if (this.bounces > 4) {
                    this.active = false;
                }
            }
            
            if (this.check_collision(new_pos_x).collided) {
                this.active = false;
            }
        }
        this.destroy(); // failsafe, even though it probably doesn't work
    }
}

Bullet.prototype.speed      = 0.005;
Bullet.prototype.bounciness = 0.003;
Bullet.prototype.gravity    = 0.005;