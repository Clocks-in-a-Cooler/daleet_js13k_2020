function create_element(className, content, click_handler) {
    var elt       = document.createElement("div");
    elt.className = className;
    elt.innerHTML = content;
    if (click_handler) {
        elt.addEventListener("click", click_handler);
    }
    return elt;
}

// shorter alias for something i'll use a lot
var getElt = document.getElementById;

class Vector {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    
    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    
    times(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }
}