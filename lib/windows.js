
var mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', event => {
    mouseX = event.clientX
    mouseY = event.clientY
})

const instances = []
const templates = {
    'apple': {
        header: {
            buttons: {
                close: null,
                minimize: null,
                fullscreen: null
            },
            title: 'title'
        },
        body: 'content'
    },
    'microsoft': {
        header: {
            title: 'title',
            buttons: {
                minimize: null,
                fullscreen: null,
                close: null
            }
        },
        body: 'content',
        footer: null
    },
    'gnome': {
        header: {
            icon: 'icon',
            title: 'title',
            buttons: {
                minimize: null,
                fullscreen: null,
                close: null
            }
        },
        body: 'content'
    }
}
const themes = {
    'Default Theme': {
        template: 'apple',
        style: {},
        defaultOptions: {}
    }
}

class Window {

    constructor( _x, _y, _width, _height, options={} ){

        this.id = instances.length
        this.attachX = 0
        this.attachY = 0
        this.drag = false
        this.resizing = false
        this.closed = false
        this.minimized = false
        this.fullscreen = false

        const theme = themes[options.theme||'Default Theme'] || themes['Default Theme']
        const template = templates[theme.template||'apple']
        this.borderRadius = theme.style.window ? theme.style.window.borderRadius : ""

        const 
            x = _x || 0,
            y = _y || 0,
            width = _width || 500,
            height = _height || 250;

        const container = document.createElement('div')
        container.setAttribute('class','window')
        container.setAttribute('id','window-' + this.id)
        container.style.position = 'absolute'

        function createElement(key){
            const element = document.createElement('div')
            element.setAttribute('class','window-' + key)
            return element
        }

        // generate and append children
        for(const key in template){
            const element = createElement(key)
            if(template[key] && typeof template[key] == 'object'){
                for(const _key in template[key]){
                    const _element = createElement(_key)
                    if(template[key][_key] && typeof template[key][_key] == 'object'){
                        for(const __key in template[key][_key]){
                            const __element = createElement(__key)
                            _element.appendChild(__element)
                        }
                    }else if(typeof template[key][_key] == 'string'){
                        _element.innerHTML = options[template[key][_key]] || theme.defaultOptions[template[key][_key]] || `- missing "options.${template[key][_key]}" -`
                    }
                    element.appendChild(_element)
                }
            }else if(typeof template[key] == 'string'){
                element.innerHTML = options[template[key]] || theme.defaultOptions[template[key]] ||  `- missing "options.${template[key]}" -`
            }
            container.appendChild(element)
        }
        const buttons = container.querySelectorAll('.window-buttons > *')
        for(const button of buttons){
            button.classList.add("window-button");
        }
        document.body.appendChild(container)


        // styles
        const style = options.style ? options.style.replace(/\s*([^}{]+)\s*{/gm, g => {
            return g.split(',').map(e => `#window-${this.id} .window-body ` + e).join(',')
        }) : ''
        let styleBalise = document.getElementById('window-style')
        let styleExists = true
        if(!styleBalise){
            styleExists = false
            styleBalise = document.createElement('style')
            styleBalise.setAttribute('id','window-style')
        }
        let css = ''
        for(const id in theme.style){
            if(id.endsWith('_hover')){
                const props = []
                for(const prop in theme.style[id]){
                    props.push({
                        name : prop.replace(/([A-Z])/g, g => '-' + g[0].toLowerCase()),
                        value : theme.style[id][prop] + ' !important'
                    })
                }
                css += `#window-${this.id} .window-${id.replace('_hover','')}:hover {\n${props.map(prop => '\t' + prop.name + ': ' + prop.value + ';').join('\n')}\n}\n`
            }else{
                let e = this.get(id)
                if(!e) continue
                for(const prop in theme.style[id]){
                    if(e instanceof HTMLElement) e = [e]
                    for(const _e of e){
                        _e.style[prop] = theme.style[id][prop]
                    }
                }
            }
        }
        styleBalise.appendChild(document.createTextNode(css + '\n' + style))
        if(!styleExists) document.getElementsByTagName('head')[0].appendChild(styleBalise)

        // setting
        this.size(width,height)
        this.place(x,y)

        // listeners
        this.element.addEventListener('mousedown', ()=>this.onClick())
        this.get('close').addEventListener('click', ()=>this.onClose())
        this.get('fullscreen').addEventListener('click', ()=>this.onFullscreen())
        this.get('minimize').addEventListener('click', ()=>this.onMinimize())
        this.get('title').addEventListener('mousedown', ()=>this.onDrag())
        document.addEventListener('mouseup', ()=>this.onDrop())
        this.startListeners()

        instances.push(this)
    }

    startListeners(){
        this.interval = setInterval(()=>{
            if(this.resizing){
                switch(this.resizing){
                    case 'left' : 
                        break
                    case 'right' :  
                        break
                    case 'top' : 
                        break
                    case 'bottom' : 
                        break
                }
            }else if(this.drag){
                const newX = mouseX + this.attachX
                const newY = mouseY + this.attachY
                this.move(...Window.easeOut(
                    [ this.x, this.y ],
                    [ newX, newY ]
                ))
            }else{
                const border = this.mouseOnBorder()
                let cursor = false
                switch(border){
                    case 'left' :
                    case 'right' :
                        cursor = 'w-resize'
                        break
                    case 'bottom' :
                    case 'top' :
                        cursor = 'n-resize'
                        break
                }
                this.element.style.cursor = cursor || 'default'
                this.get('header').style.cursor = cursor || 'grab'
            }
        },20)
    }

    clearListeners(){
        clearInterval(this.interval)
    }

    get x(){ return this._x }
    get y(){ return this._y }
    get width(){ return this._width }
    get height(){ return this._height }
    get right(){ return this.x + this.width }
    get bottom(){ return this.y + this.height }

    set x(x){
        this._x = x
        this.element.style.left = x + 'px'
    }
    set y(y){
        this._y = y
        this.element.style.top = y + 'px'
    }
    set width(width){
        this._width = width
        this.element.style.width = width + 'px'
    }
    set height(height){
        this._height = height
        this.element.style.height = height + 'px'
    }

    get element(){
        return document.getElementById('window-' + this.id)
    }
    get (name){
        if(name == 'window') return this.element
        const results = this.element.querySelectorAll('.window-' + name)
        return results.length === 1 ? results[0] : results
    }

    reset(){
        this.element.style.borderRadius = this.borderRadius
        this.place(
            this.x,
            this.y
        )
        this.size(
            this.width,
            this.height
        )
    }

    move(x,y){
        this.place(
            this.x + x,
            this.y + y
        )
    }

    place(x,y){
        this.x = x
        this.y = y
    }

    resize(width,height){
        this.size(
            this.width + width,
            this.height + height
        )
    }

    size(width,height){
        this.width = width
        this.height = height
    }

    mouseOnBorder(){
        const distance = 5
        if(
            mouseX > this.x && mouseX < this.x + distance  &&
            mouseY > this.y && mouseY < this.bottom
        ) return 'left'
        if(
            mouseX > this.right - distance && mouseX < this.right &&
            mouseY > this.y && mouseY < this.bottom
        ) return 'right'
        if(
            mouseX > this.x && mouseX < this.right &&
            mouseY > this.y && mouseY < this.y + distance
        ) return 'top'
        if(
            mouseX > this.x && mouseX < this.right &&
            mouseY > this.bottom - distance && mouseY < this.bottom
        ) return 'bottom'
        return false
    }

    onOpen(){
        console.log('open')
        this.startListeners()
    }
    onClose(){
        console.log('close')
        this.clearListeners()
        this.closed = true
        this.element.style.display = 'none'
    }
    onFullscreen(){
        console.log('fullscreen')
        this.fullscreen = !this.fullscreen
        if(this.fullscreen){
            this.element.style.borderRadius = '0'
            this.element.style.left = '0px'
            this.element.style.top = '0px'
            this.element.style.width ='100%'
            this.element.style.height = '100%'
        }else{
            this.reset()
        }
        if(this.minimized){
            this.onMinimize()
        }
    }
    onMinimize(){
        console.log('minimize')
        this.minimized = !this.minimized
        if(this.minimized){
            this.get('body').style.display = 'none'
            this.element.style.height = 'var(--window-header-height)'
        }else{
            this.get('body').style.display = 'block'
            if(this.fullscreen){
                this.fullscreen = false
                this.onFullscreen()
            }else{
                this.reset()
            }
        }
    }
    onClick(){
        console.log('click')
        instances.forEach(instance => {
            instance.element.style.zIndex = 50
        })
        this.element.style.zIndex = 51
        this.resizing = this.mouseOnBorder()
    }
    onDrag(){
        console.log('drag')
        if(this.fullscreen){
            this.onFullscreen()
            this.place(
                mouseX - this.width / 2,
                mouseY - 10
            ) 
        }
        this.attachX = this.x - mouseX
        this.attachY = this.y - mouseY
        this.drag = true
        this.get('header').style.cursor = 'grabbing'
    }
    onDrop(){
        console.log('drop')
        this.resizing = false
        if(this.drag){
            const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
            if(mouseX < 10){
                this.fullscreen = false
                this.onFullscreen()
                this.element.style.width = '50%'
                this.element.style.height = '100%'
            }else if(mouseX > width - 10){
                this.fullscreen = false
                this.onFullscreen()
                this.x = width / 2
                this.element.style.width = '50%'
                this.element.style.height = '100%'
            }else if(!this.minimized){
                this.reset()
            }
        }
        this.drag = false
        this.get('header').style.cursor = 'grab'
        if(this.y < 0){
            this.fullscreen = false
            this.onFullscreen()
        }
    }

    static easeOut( point, target ){
        return point.map(( value, index )=>{
            const dist = target[index] - value
            return dist / 2
        })
    }

    static addTheme( name, template, options, defaultOptions={} ){
        themes[name] = {
            template : template,
            style : options,
            defaultOptions : defaultOptions
        }
    }
    static addTemplate( name, template ){
        templates[name] = template
    }
    static get themes(){ return themes }
    static get templates(){ return templates }
}