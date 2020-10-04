class Crush_trap extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        this.last_move = 0;
        this.colour    = "silver";
        this.size      = new Vector(0.9, 0.9);
        this.dir       = null;
        this.active    = !features_deleted["crush trap"];
        
        this.collideable = true;
    }
    
    cycle(lapse) {
        var new_pos = this.pos;
        switch (this.dir) {
            case "up":
                new_pos = this.pos.plus(new Vector(0, -this.speed));
                break;
            case "down":
                new_pos = this.pos.plus(new Vector(0, this.speed));
                break;
            case "left":
                new_pos = this.pos.plus(new Vector(-this.speed, 0));
                break;
            case "right":
                new_pos = this.pos.plus(new Vector(this.speed, 0));
                break;
        }
        var data = this.check_collision(new_pos);
        if (data.collided) {
            data.entities.forEach(e => {
                e.collision(this);
            });
            this.dir = null;
            
            this.last_move = 0;
        }
        
        if (this.dir == null) {
            /*
                to move:
                - the player is at most 8 tiles away, horizontally or vertically
                - the player is at the same height or in the same column
                - the trap has not moved in the last 3 seconds
                
                note that the player might get lucky by having a wall or a solid (collideable == true) entity in the way
            */
            var pos = this.level.player.pos;
            if (
                (Math.abs(pos.x - this.pos.x) < 8 || Math.abs(pos.y - this.pos.y)) < 8 &&
                ((this.pos.x + this.size.x > pos.x && this.pos.x < pos.x + this.level.player.size.x) || (this.pos.y + this.size.y > pos.y && this.pos.y < pos.y + this.level.player.size.y)) &&
                this.last_move > 3000
            ) {
                /*
                    pick a direction:
                    compare the absolute values of the horizontal and vertical distances
                    if the horizontal distance is greater, pick left (negative) or right (positive)
                    if the vertical distance is greater, pick up (negative) or down (positive)
                    if it's a tie, pick the horizontal
                */
                var hor_or_vert = Math.sign(Math.abs(this.pos.x - pos.x) - Math.abs(this.pos.y - pos.y));
                if (hor_or_vert >= 0) {
                    // horizontal
                    this.dir = Math.sign(pos.x - this.pos.x) < 0 ? "left" : "right";
                } else {
                    // vertical
                    this.dir = Math.sign(pos.y - this.pos.y) < 0 ? "up" : "down";
                }
                this.last_move = 0;
            } else {
                this.last_move += lapse;
            }
        }
    }
    
    draw(cxt) {
        super.draw(cxt);
    }
    
    collision(other) {
        this.active = true;
    }
}

Crush_trap.prototype.speed = 0.2;