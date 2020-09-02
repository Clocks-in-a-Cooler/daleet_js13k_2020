class Bullet extends Entity {
    constructor(pos, level, char, colour, motion, ignore_gravity) {
        super(pos, level, char);
        
        this.ignore_gravity = ignore_gravity;
        this.motion         = motion.times(this.speed);
        this.colour         = colour;
    }
    
    cycle(lapse) {
        // if (this.ignore_gravity) {
            this.pos = this.pos.plus(this.motion.times(lapse));
        // }
    }
}

Bullet.prototype.speed = 0.2;