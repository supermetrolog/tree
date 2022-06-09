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
        console.log(this._elementList)
        this._elementList.forEach(item => {
            const newElem = this._createElem(item.elem.name, item.elem.attr)
            this._append(newElem, item.container)
            if (item.elem.inner) {
                item.elem.inner.forEach(el => {
                    const newNode = this._createElem(el.name, el.attr)
                    this._append(document.createTextNode(el.textContent), newNode)
                        // this._append(newNode, newElem)
                    this._append(newNode, item.container)

                });
            }
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

    _normalizeData(data) {
        let sortedData = data.sort((a, b) => {
            if (a.value < b.value) {
                return -1
            }
            if (a.value > b.value) {
                return 1
            }

            return 0
        })
        let i = 1
        sortedData.map((item) => item.value = i++)
        return sortedData
    }
    draw() {
        // this._addRect({ sx: this._startX, ex: this._endX, sy: this._startY, ey: this._endY, width: this._width, height: this._height, data: this._data }, 1)
        // this._refresh()

        let data = [
            { value: 6000, color: "red", valueOrigin: 6000 },
            { value: 6000, color: "blue", valueOrigin: 6000 },
            { value: 1250, color: "brown", valueOrigin: 1250 },
            { value: 2500, color: "grey", valueOrigin: 2500 },
            { value: 5000, color: "black", valueOrigin: 5000 },
            { value: 3000, color: "orange", valueOrigin: 3000 },
            { value: 200000, color: "rgb(100, 50, 70)", valueOrigin: 200000 },
        ]

        data = this._normalizeData(data)
        console.log(data)
        const { getTreemap } = require('treemap-squarify')

        const result = getTreemap({
            data: data,
            width: this._width,
            height: this._height
        })


        result.forEach(res => {

            this._elementList.push({
                container: this._svgElem,
                elem: {
                    name: "rect",
                    attr: { title: res.data.valueOrigin, fill: res.data.color, ...res },
                    inner: [{
                        name: "text",
                        attr: {
                            x: (res.x + res.width / 2) - (res.data.valueOrigin.toString().length / 2 * 8),
                            y: (res.y + res.height / 2) + 10,
                            fill: "white"
                        },
                        textContent: res.data.valueOrigin
                    }]
                }
            })
        })
        this._render()
    }
}

export default TreemapSvgRenderer