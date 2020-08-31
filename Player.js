class Player extends Entity {
    constructor(pos, level, char) {
        super(pos, level, char);
        this.size = new Vector(0.8, 1.8);
        this.pos  = this.pos.plus(this.size.times(-1));
    }
}