import { Table } from './js/table'
import { Chart } from './js/chart'
import axios from 'axios'
import GoldenLayout from 'golden-layout'
import { Route } from './js/route'
import { Router } from './js/router'

const router = new Router([
    new Route('tablePage', 'tablePage.html', true, tableInit),
    new Route('testPage', 'testPage.html', true),
    new Route('chartPage', 'chartPage.html', true, chartInit)
])

function tableInit () {
    const { search } = window.location
    const [page, pageNum] = search.split('=')
    const pageSize = 5
    const config = {
        content: [
            {
                type: 'row',
                content: [
                    {
                        type: 'component',
                        componentName: 'testComponent',
                        componentState: { label: 'A' }
                    },
                    {
                        type: 'column',
                        content: [
                            {
                                type: 'component',
                                componentName: 'testComponent',
                                componentState: { label: 'B' }
                            },
                            {
                                type: 'component',
                                componentName: 'testComponent',
                                componentState: { label: 'C' }
                            }
                        ]
                    }
                ]
            }
        ]
    }
    const target = document.createElement('div')
    target.innerHTML = `<table class="table table-hover table-light">
    <thead class="thead-light">
    <tr>
    <th scope="col">#</th>
    <th scope="col">Name</th>
    <th scope="col">Value</th>
    </tr>
    </thead>
    <tbody></tbody>
    </table>
    <nav aria-label="Page navigation example">
    <ul class="pagination"> </ul>
    </nav>`

    const myLayout = window.myLayout = new GoldenLayout(config)
    myLayout.registerComponent('testComponent', function (container, componentState) {
        if (componentState.label === 'A') {
            axios
                .get('http://localhost:3000/', {
                    params: {
                        page: pageNum,
                        pageSize: pageSize
                    }
                })
                .then(res => {
                    const { data } = res
                    const table = new Table(target, data, pageSize)
                    table.init()
                })

            container.getElement().html(target)
        } else {
            container.getElement().html('<h2 style="color:deepskyblue">' + componentState.label + '</h2>')
        }
    })
    myLayout.init()
}

function chartInit () {
    const chart = new Chart()
    chart.init()
}
