class TreemapSvgRenderer {
    constructor(data, svgElemId) {
        this._svgElem = document.getElementById(svgElemId)
        if (!this._svgElem) {
            console.error('svg tag not found');
            return;
        }
        this._data = data
        this._sum = 0
        this._data.forEach(item => this._sum += item)
        this._startX = 1
        this._startY = 1

        this._width = this._svgElem.clientWidth
        this._height = this._svgElem.clientHeight
        this._endX = this._svgElem.clientWidth - 1
        this._endY = this._svgElem.clientHeight - 1

        this._elementList = []

        this._preventRect = []
    }

    _createElem(name, options = {}) {
        const elem = document.createElementNS("http://www.w3.org/2000/svg", name)
        Object.keys(options).forEach(key => {
            let value = options[key]
            elem.setAttribute(key, value)
        })
        return elem;
    }

    _append(elem, container = null) {
        if (container === null) {
            container = this._svgElem
        }
        // this._elementList.push({ container, elem })
        container.appendChild(elem)
    }

    _render() {
        this._svgElem.innerHTML = ""
        this._elementList.forEach(item => {
            this._append(this._createElem(item.elem.name, item.elem.attr), item.container)
        });
    }
    _popStart(array) {
            if (array.length <= 1) return null
            if (array.length <= 6) return null
            return array.slice(-(array.length - 1))
        }
        // _addRect(options, i) {
        //     if (options.data === null) {
        //         return;
        //     }
        //     const rectAttr = {}

    //     if (this._preventRect.length) {
    //         this._elementList.map(item => {
    //             if (item.elem.attr.i == this._preventRect[0].i) {
    //                 item.elem.attr.height = item.elem.attr.height / 2
    //                 item.elem.attr.width += item.elem.attr.height / 2

    //                 options.width = options.width * 1.5
    //                 options.height = item.elem.attr.height
    //                     // options.y = options.height
    //                 console.log("FUCK")
    //             }

    //             return item
    //         })
    //     }
    //     rectAttr.x = options.sx
    //     rectAttr.y = options.sy
    //     const aspectRatio = options.width / options.height;
    //     const value = options.data[0]
    //     rectAttr.data = value
    //     rectAttr.i = i
    //     if (aspectRatio > 0) {
    //         rectAttr.width = 1.5 * (value / this._sum) * options.width / 2
    //         rectAttr.height = options.height - 2
    //     } else {
    //         rectAttr.width = options.width - 2
    //         rectAttr.height = 1.5 * (value / this._sum) * options.height / 2
    //     }
    //     this._preventRect.push(rectAttr)
    //     this._elementList.push({ container: this._svgElem, elem: { name: "rect", attr: rectAttr } })
    //     options.data = this._popStart(options.data)
    //     this._addRect(options, i + 1)
    // }
    draw() {
        // this._addRect({ sx: this._startX, ex: this._endX, sy: this._startY, ey: this._endY, width: this._width, height: this._height, data: this._data }, 1)
        // this._refresh()
        const { getTreemap } = require('treemap-squarify')

        const result = getTreemap({
            data: [
                { value: 432, color: "red" },
                { value: 432, color: "blue" },
                { value: 500, color: "brown" },
                { value: 300, color: "grey" },
                { value: 400, color: "black" },
                { value: 124, color: "orange" },
                { value: 1000, color: "yellow" },
            ],
            width: this._width,
            height: this._height
        })


        result.forEach(res => {

            this._elementList.push({ container: this._svgElem, elem: { name: "rect", attr: { fill: res.data.color, ...res } } })
        })
        this._render()
    }
}

export default TreemapSvgRenderer