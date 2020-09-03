class Bullet extends Entity {
    constructor(pos, level, char, colour, motion) {
        super(pos, level, char);
        
        this.size = new Vector(0.3, 0.3);
        this.pos  = this.pos.minus(this.size.times(0.5));
        
        this.motion = motion.times(this.speed);
        this.colour = colour;
        this.active = !features_deleted["bullets"];
    }
    
    cycle(lapse) {
        var new_pos = this.pos.plus(this.motion.times(lapse));
        
        var data = this.check_collision(new_pos);
        
        if (data.collided) {
            this.active = false;
        }
            
        this.destroy(); // failsafe, even though it probably doesn't work
    }
}

Bullet.prototype.speed      = 0.005;
Bullet.prototype.bounciness = 0.003;
Bullet.prototype.gravity    = 0.005;