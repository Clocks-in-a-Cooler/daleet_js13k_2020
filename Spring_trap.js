class Spring_trap extends Entity {
    // not to be confused with Springtrap, who's much more scarier
    constructor(pos, level, char) {
        super(pos, level, char);
        this.size     = new Vector(1, 0.1);
        this.base_pos = this.pos.plus(new Vector(1, 1));
        this.get_pos();
        
        // this.collideable = !features_deleted["physics"];
        this.colour      = "deeppink";
        
        this.bouncing        = false;
        this.bounce_progress = 0;
        
        this.active = !features_deleted["spring trap"];
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
    }
    
    collision(other) {
        this.active = true;
        if (!this.bouncing) other.bounce();
        this.bouncing = true;
    }
}