export function Route (name, htmlName, defaultRoute, initCallback) {
    try {
        if (!name || !htmlName) {
            throw new Error('error: name and htmlName params are mandatories')
        }
        this.constructor(name, htmlName, defaultRoute, initCallback)
    } catch (e) {
        console.error(e)
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor: function (name, htmlName, defaultRoute, initCallback) {
        this.name = name
        this.htmlName = htmlName
        this.default = defaultRoute
        this.initCallback = initCallback
    },
    isActiveRoute: function (hashedPath) {
        const [url, page] = hashedPath.split('#')
        return page === this.name
    },
    executeInitCallback: function () {
        if (typeof (this.initCallback) === 'function') this.initCallback()
    }
}
