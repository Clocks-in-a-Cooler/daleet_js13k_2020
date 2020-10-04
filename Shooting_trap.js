class Shooting_trap extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        this.size = new Vector (1, 1);
        switch (char) {
            case "«":
                this.dir = -1;
                break;
            case "»":
                this.dir = 1;
                break;
        }
        
        this.colour = "orangered";
        this.active = !features_deleted["shooting trap"];
        
        this.collideable = true;
        this.last_shot   = 0;
    }
    
    cycle(lapse) {
        /*
            to shoot:
            - the player is at most 10 tiles away, horizontally
            - the player is at the same height, vertically
            - the trap is facing the player
            - the trap has not shot a bullet in the last 0.75 seconds (give or take a random interval)
            - has 20% chance of failing
        */
        
        this.last_shot += lapse;
        
        var pos = this.level.player.pos;
        
        if (
            Math.abs(pos.x - this.pos.x) < 10 &&
            this.pos.y + this.size.y > pos.y && this.pos.y < pos.y + this.level.player.size.y &&
            Math.sign(pos.x - this.pos.x) == this.dir &&
            this.last_shot >= this.cooldown
        ) {
            this.last_shot = 0;
            if (Math.random() < 0.2) return;
            this.level.entities.push(new Bullet(
                new Vector(this.pos.x + this.dir + 0.5, this.pos.y + 0.5), // pos
                this.level, // level
                " ", // char (unused for bullets)
                this.colour, // colour
                new Vector(this.dir, 0), // motion
                true // shoot straight, so let's ignore gravity. sorry Newton.
            ));
        }
    }
    
    draw(cxt) {
        super.draw(cxt);
        if (this.dir < 0) {
            // draw a small barrel facing left
            var screen_coords = viewport.get_screen_coords(this.pos.plus(new Vector(-0.1, 0.25)));
        } else {
            var screen_coords = viewport.get_screen_coords(this.pos.plus(new Vector(1, 0.25)));
        }
        cxt.strokeRect(screen_coords.x, screen_coords.y, scale / 10, scale / 2);
    }
    
    collision(other) {
        this.active = true;
    }
}

Shooting_trap.prototype.cooldown = 750;