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
    _calculateY(level) {
        return level * this._multiplier;
    }
    _calculateX(node, level) {
            let offset = 100;
            let x = 0;
            let parentX = 0;
            if (node.parent === null) return this._rootX;
            parentX = this._calculateX(node.parent, level - 1);
            if (node.data < node.parent.data) {
                x = parentX - offset;

            } else {
                x = parentX + offset;
            }

            if (node.data > this.tree.root.data) {
                let count = 1;
                if (node.data > node.parent.data) {
                    if (node.left) {
                        node.left.walkLeft(() => {
                            count++;
                        });
                    }
                }


                if (count > 1 && node.data > node.parent.data) {
                    x = x + offset * count - offset - this._multiplier;
                }
            } else {
                let count = 1;
                if (node.data < node.parent.data) {
                    if (node.right) {
                        node.right.walkLeft(() => {
                            count++;
                        });
                    }
                }

                if (count > 1 && node.data < node.parent.data) {
                    x = x - offset * count - offset + this._multiplier;
                }
            }

            return x;
        }
        // _calculateX(node, level) {
        //     let offset = 100;
        //     let x = 0;
        //     let parentX = 0;
        //     if (node.parent === null) return this._rootX;
        //     parentX = this._calculateX(node.parent, level - 1);
        //     if (node.data < node.parent.data) {
        //         x = parentX - offset;

    //     } else {
    //         x = parentX + offset;
    //     }

    //     if (node.data > this.tree.root.data) {
    //         let leftCount = 1;
    //         let leftX = 0;
    //         if (node.left) {
    //             node.left.walkLeft((_, level) => {
    //                 leftX = x - offset * level;
    //                 if (leftX <= this._rootX) {
    //                     leftCount++;
    //                 }
    //             });
    //         }

    //         console.error(node.data, leftCount);
    //         if (leftCount > 1 && node.data > node.parent.data) {

    //             x = x + offset * leftCount - offset - this._multiplier;
    //         }
    //     } else {
    //         let rightCount = 1;
    //         let rightX = 0;
    //         if (node.right) {
    //             node.right.walkLeft((_, level) => {
    //                 rightX = x + offset * level;
    //                 if (rightX <= this._rootX) {
    //                     rightCount++;
    //                 }
    //             });
    //         }

    //         console.error(node.data, rightCount);
    //         if (rightCount > 1 && node.data < node.parent.data) {

    //             x = x - offset * rightCount - offset + this._multiplier;
    //         }
    //     }

    //     return x;
    // }

    _getColor(node) {
        if (node.data < this.tree.root.data) return 'red';
        else if (node.data === this.tree.root.data) return 'green';
        else return 'blue';
    }
    draw() {
        this.tree.walk((node, level) => {
            const elem = this._createElem('span');
            this._setStyles(elem, {
                left: this._calculateX(node, level) + "px",
                top: this._calculateY(level) + "px",
                background: this._getColor(node)
            })
            const text = document.createTextNode(node.data);
            elem.appendChild(text);
            this._container.appendChild(elem);
        });
    }
}

export default TreeRenderer;