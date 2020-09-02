class Spring_trap extends Entity {
    // not to be confused with Springtrap, who's much more scarier
    constructor(pos, level, char) {
        super(pos, level, char);
        this.size     = new Vector(1, 0.1);
        this.base_pos = this.pos.plus(new Vector(1, 1));
        this.get_pos();
        
        this.collideable = true;
        this.colour      = "deeppink";
        
        this.bouncing        = false;
        this.bounce_progress = 0;
        this.last_bounce     = 0;
    }
    
    get_pos() {
        this.pos = this.base_pos.minus(this.size);
    }
    
    cycle(lapse) {
        if (this.bouncing && this.bounce_progress <= 750) {
            this.size.y           = Math.sin(Math.PI * this.bounce_progress / 750) + 0.1;
            this.bounce_progress += lapse;
            this.get_pos();
        } else {
            this.size.y          = 0.1;
            this.bounce_progress = 0;
            this.bouncing        = false;
            this.get_pos();
        }
        this.last_bounce += lapse;
    }
    
    collision(other) {
        this.active = true;
        
        // to bounce: it must be at least 750 milliseconds since the start of last bounce
        if (this.last_bounce >= 750) {
            other.bounce();
            this.bouncing = true;
        }
    }
}