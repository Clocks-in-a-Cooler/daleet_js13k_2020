class Goal extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        this.size = new Vector(0.7, 0.7);
        
        this.wobble   = Math.random() * 2 * Math.PI;
        this.base_pos = this.pos.plus(new Vector(0, 0));
        this.colour   = "mediumspringgreen";
    }
    
    cycle(lapse) {
        this.wobble += this.wobble_speed * lapse;
        
        var wobble_height = Math.sin(this.wobble) * this.wobble_dist;
        
        this.pos = this.base_pos.plus(new Vector(0, wobble_height));
    }
    
    collision(other) {
        if (other == this.level.player) {
            this.level.win();
            this.active = false;
            return;
        }
        this.active = true;
    }
    
    draw(cxt) {
        // a star!
        cxt.strokeStyle = this.colour;
        cxt.save();
        var screen_coords = viewport.get_screen_coords(this.pos);
        cxt.translate(screen_coords.x, screen_coords.y);
        cxt.beginPath();
        cxt.moveTo(scale * 0.35, 0);
        cxt.lineTo(scale * 0.6, scale * 0.7);
        cxt.lineTo(0, scale * 0.3);
        cxt.lineTo(scale * 0.7, scale * 0.3);
        cxt.lineTo(scale * 0.1, scale * 0.7);
        cxt.lineTo(scale * 0.35, 0);
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
    }
}

Goal.prototype.wobble_speed = 0.008;
Goal.prototype.wobble_dist  = 0.1;