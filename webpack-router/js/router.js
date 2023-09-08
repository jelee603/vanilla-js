export function Router (routes) {
    try {
        if (!routes) {
            throw new Error('error: routes param is mandatory')
        }
        this.constructor(routes)
        this.init()
    } catch (e) {
        console.error(e)
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes
        this.rootElem = document.getElementById('app')
    },
    init: function () {
        const r = this.routes;
        (function (scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r)
            })
        })(this, r)
        this.hasChanged(this, r)
    },
    hasChanged: function (scope, r) {
        if (window.location.hash.length > 0) {
            for (let i = 0, length = r.length; i < length; i++) {
                const route = r[i]
                if (route.isActiveRoute(window.location.href.substr(1))) {
                    window.myLayout && window.myLayout.destroy()
                    scope.goToRoute(route.htmlName).then(() => {
                        route.executeInitCallback()
                    })
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        return new Promise((resolve, reject) => {
            (function (scope) {
                const url = 'views/' + htmlName
                const xhttp = new XMLHttpRequest()
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        scope.rootElem.innerHTML = this.responseText
                        resolve()
                    }
                }
                xhttp.open('GET', url, true)
                xhttp.send()
            })(this)
        })
    }
}
