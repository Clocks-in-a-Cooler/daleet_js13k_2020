class Entity {
    // the superclass to ALL the entities!
    // probably want to override a lot of this
    
    constructor(pos, level, char) {
        this.pos    = pos;
        this.size   = New Vector(0, 0);
        this.motion = new Vector(0, 0);
        
        this.level  = level;
        this.active = true;
        
        // char can be used to encode extra data about the entity, such as the orientation of spike traps
    }
    
    cycle(lapse) {
        this.pos = this.pos.plus(this.motion.times(lapse));
        this.update(lapse);
    }
    
    update(lapse) {
        // nothing...yet
        // override in child classes
    }
    
    destroy() {
        if (this.pos.x + this.size.x < 0 || this.pos.x > this.level.width ||
            this.pos.y + this.size.y < 0 || this.pos.y > this.level.height
        ) {
            this.active = false;
        }
    }
}