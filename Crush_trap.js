class Crush_trap extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        this.last_move = 0;
        this.size = new Vector(0.9, 0.9);
        this.dir  = null;
    }
    
    cycle(lapse) {
        if (this.dir) {
            
        } else {
            // is there something else we can crush?
        }
    }
    
    draw(cxt) {
        super.draw(cxt);
        if (dir) {
            
        }
    }
}

Crush_trap.prototype.speed = 0.0075;