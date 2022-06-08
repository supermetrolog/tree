class TreeRenderer {
    constructor(tree, container_id, multiplier = 70) {
        this._tree = tree;
        this._multiplier = multiplier;
        this._container = document.getElementById(container_id);
        if (!this._container) {
            console.error('container not found');
            return;
        }
        this._rootX = this._container.offsetWidth / 2 - 100;
        this._nodeWidth = 70;
    }

    get tree() {
        return this._tree;
    }
    _createElem(tagname) {
        return document.createElement(tagname);
    }
    _setStyles(elem, styles) {
        let stylesStr = "";
        Object.keys(styles).forEach(key => {
            stylesStr += `${key}: ${styles[key]};`
        });
        elem.setAttribute('style', stylesStr);
    }

    _getColor(node) {
        // if (node.data < this.tree.root.data) return 'red';
        if (node.data === this.tree.root.data) return 'green';
        else return 'blue';
    }
    draw() {
        this.tree.walk((node, level) => {
            const elem = this._createElem('span');
            this._setStyles(elem, {
                top: level * this._multiplier + "px",
                background: this._getColor(node)
            })
            const text = document.createTextNode(node.data);
            elem.appendChild(text);
            this._container.appendChild(elem);
        });
    }
}

export default TreeRenderer;