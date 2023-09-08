export class Table {
    constructor (target, data, pageSize) {
        this.target = target
        this.data = data
        this.width = null
        this.pageSize = pageSize
        this.draw = this.draw.bind(this)
    }

    init () {
        this.createTable()
        this.createPagination()
    }

    createTable () {
        const target = this.target
        const tbody = target.querySelector('tbody')
        const fragment = document.createDocumentFragment()
        const data = this.data

        data.forEach(v => {
            const tr = document.createElement('tr')
            const td1 = document.createElement('th')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const canvas = this.draw(v.value)

            td1.textContent = v.index
            td2.textContent = v.name
            // td3.textContent = v.value
            td3.append(canvas)

            fragment.appendChild(tr)
            fragment.appendChild(td1)
            fragment.appendChild(td2)
            fragment.appendChild(td3)

            tbody.appendChild(fragment)
        })
    }

    createPagination () {
        const { total } = this.data.find(v => v.total)
        const fragment = document.createDocumentFragment()
        const tb = document.querySelector('nav')
        const ul = document.querySelector('.pagination')
        const pageSize = this.pageSize
        const page = total / pageSize

        let ix = 0

        while (ix < page) {
            const li = document.createElement('li')
            const a = document.createElement('a')
            li.setAttribute('class', 'page-item')
            a.href = 'http://localhost:8081/?page=' + ix
            a.setAttribute('class', 'page-link')
            a.textContent = ix + 1

            li.appendChild(a)
            ul.appendChild(li)
            ix++
        }
        fragment.appendChild(ul)
        tb.appendChild(fragment)
    }

    draw (curr) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const tot = 1000
        const percent = Math.floor((curr / tot) * 100)
        const height = 25

        if (this.width === null) {
            this.width = document.querySelectorAll('th')[2].clientWidth
        }

        const width = this.width * (percent / 100)

        canvas.width = width + 50
        canvas.height = height
        ctx.fillStyle = 'green'
        ctx.font = '10px Aria'
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = 'white'

        // 퍼센트값
        ctx.fillText(`${percent}%`, 8, height - 10)
        ctx.textAlign = 'right'

        // 실제값
        ctx.fillText(curr, width + 30, height - 10)
        ctx.textAlign = 'left'

        return canvas
    }
}
