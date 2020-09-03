class Spike_trap extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        switch (char) {
            case "^":
                this.dir  = "up";
                this.size = new Vector(1, 0.5);
                this.pos  = this.pos.plus(new Vector(0, 0.5));
                break;
            case "V":
                this.dir  = "down";
                this.size = new Vector(1, 0.5);
                break;
            case "<":
                this.dir  = "left";
                this.size = new Vector(0.5, 1);
                this.pos  = this.pos.plus(new Vector(0.5, 0));
                break;
            case ">":
                this.dir  = "right";
                this.size = new Vector(0.5, 1);
                break;
        }
        
        this.collideable = true;
        
        this.active = !features_deleted["spike trap"];
    }
    
    cycle(lapse) {
        return;
    }
    
    draw(cxt) {
        var screen_coords = viewport.get_screen_coords(this.pos);
        cxt.save();
        cxt.translate(screen_coords.x, screen_coords.y);
        switch (this.dir) {
            case "up":
                // draw right side up
                this.draw_spikes(cxt);
                break;
            case "down":
                // draw spikes upside down, which means rotate 180 degrees, and then translate to the bottom right corner
                cxt.rotate(Math.PI);
                cxt.translate(-scale, -scale / 2);
                this.draw_spikes(cxt);
                break;
            case "right":
                // draw the spikes facing right, which means rotate 90 degrees (clockwise), and then translate to the top right corner
                cxt.rotate(Math.PI / 2);
                cxt.translate(0, -scale / 2);
                this.draw_spikes(cxt);
                break;
            case "left":
                // draw the spikes facing left, which means rotate 270 degrees (clockwise), and then translate to the bottom left corner
                cxt.rotate(Math.PI * 3 / 2);
                cxt.translate(-scale, 0);
                this.draw_spikes(cxt);
                break;
        }
        cxt.restore();
    }
    
    draw_spikes(cxt) {
        cxt.strokeStyle = "crimson", cxt.lineWidth = 2;
        // assume that the context is in the right place and right orientation
        cxt.beginPath();
        cxt.moveTo(0, scale / 2);
        cxt.lineTo(scale / 4, 0);
        cxt.lineTo(scale / 2, scale / 2);
        cxt.lineTo(3 * scale / 4, 0);
        cxt.lineTo(scale, scale / 2);
        cxt.lineTo(0, scale / 2);
        cxt.closePath();
        cxt.stroke();
    }
    
    collision(other) {
        this.active = true;
    }
}