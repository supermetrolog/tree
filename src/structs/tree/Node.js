class Node {
    constructor(data = null, parent = null) {
        this._data = data;
        this._children = []
        this._parent = parent;
        this._prevSibling = null;
    };

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
    get data() {
        return this._data;
    };
    get children() {
        return this._children;
    };
    set(data) {
        if (this.parent === null && this.data === null) {
            this._data = data;
            return;
        }
        this._children.push(new Node(data, this))
    }

    walk(callback, level = 1) {
        callback(this, level);
        if (!this.children.length) {
            return
        }
        this.children.forEach(node => {
            node.walk(callback, level + 1)
        });
    }
}

export default Node;