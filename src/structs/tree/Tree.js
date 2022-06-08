import Node from './Node';
class Tree {
    constructor() {
        this._root = new Node();
    };

    get root() {
        return this._root;
    };
    set root(data) {
        if (this._root === null) {
            this._root = new Node(data);
        }
    }

    walk(callback) {
        if (this.root === null) return;

        this.root.walk(callback, 1);
    }
}


export default Tree;