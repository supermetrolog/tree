class Node {
    constructor(data, parent = null) {
        this._data = data;
        this._left = null;
        this._right = null;
        this._parent = parent;
        this._prevSibling = null;
        this._x = null;
        this._y = null;
    };
    get x() {
        return this._x;
    };
    set x(coord) {
        this._x = coord;
    }
    get y() {
        return this._y;
    };
    set y(coord) {
        this._y = coord;
    }
    get parent() {
        return this._parent;
    };
    set parent(node) {
        this._parent = node;
    }
    get prevSibling() {
        return this._prevSibling;
    };
    set prevSibling(node) {
        this._prevSibling = node;
    }
    get right() {
        return this._right;
    };
    get left() {
        return this._left;
    };
    get data() {
        return this._data;
    };
    set left(node) {
        this._left = node;
    };

    set right(node) {
        this._right = node;
    };
    set(data) {
        if (this.data > data) {
            if (this.left === null) {
                return this.left = new Node(data, this);
            }
            return this.left.set(data);
        }

        if (this.data < data) {
            if (this.right === null) {
                return this.right = new Node(data, this);
            }
            return this.right.set(data);
        }
    }

    walk(callback, level = 1) {
        if (this.left !== null) this.left.walk(callback, level + 1);
        callback(this, level);
        if (this.right !== null) this.right.walk(callback, level + 1);
    }

    walkLeft(callback, level = 1) {
        callback(this, level);
        if (this.left !== null) this.left.walk(callback, level + 1);
    }
}

export default Node;