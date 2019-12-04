
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
                close: null,
                minimize: null,
                fullscreen: null
            }
        },
        body: 'content'
    }
}
const themes = {
    _default: {
        template: 'apple',
        style: {}
    }
}

class Window {

    constructor( _x, _y, _width, _height, options={} ){

        this.id = instances.length
        this.drag = false
        this.attachX = 0
        this.attachY = 0
        this.mouseX = 0
        this.mouseY = 0
        this.closed = false
        this.minimized = false
        this.fullscreen = false

        const theme = themes[options.theme||'_default'] || themes._default
        const template = templates[theme.template||'apple']

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
                        _element.innerHTML = options[template[key][_key]] || `- missing ${template[key][_key]} -`
                    }
                    element.appendChild(_element)
                }
            }else if(typeof template[key] == 'string'){
                element.innerHTML = options[template[key]] || `- missing ${template[key]} -`
            }
            container.appendChild(element)
        }
        const buttons = container.querySelectorAll('.window-buttons > *')
        for(const button of buttons){
            button.classList.add("window-button");
        }
        document.body.appendChild(container)


        // styles
        for(const id in theme.style){
            let e = this.get(id)
            if(!e) continue
            for(const prop in theme.style[id]){
                if(e instanceof HTMLElement) e = [e]
                for(const _e of e){
                    _e.style[prop] = theme.style[id][prop]
                    // TODO: hover
                }
            }
        }

        // setting
        this.size(width,height)
        this.place(x,y)

        // listeners
        this.element.addEventListener('mousedown', event => {
            instances.forEach(instance => {
                instance.element.style.zIndex = 50
            })
            this.element.style.zIndex = 51
        })
        this.get('close').addEventListener('click', ()=>this.onClose())
        this.get('fullscreen').addEventListener('click', ()=>this.onFullscreen())
        this.get('minimize').addEventListener('click', ()=>this.onMinimize())
        this.get('title').addEventListener('mousedown', event=>this.onDrag(event))
        document.addEventListener('mouseup', event=>this.onDrop(event))
        document.addEventListener('mousemove', event => {
            this.mouseX = event.clientX
            this.mouseY = event.clientY
        })
        setInterval(()=>{
            if(this.drag){
                const newX = this.mouseX + this.attachX
                const newY = this.mouseY + this.attachY
                const distX = newX - this.x
                const distY = newY - this.y
                this.move(
                    distX / 2,
                    distY / 2
                )
            }
        },20)

        instances.push(this)
    }
    get x(){ return this._x }
    get y(){ return this._y }
    get width(){ return this._width }
    get height(){ return this._height }

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
    get(name){
        if(name == 'window') return this.element
        const results = this.element.querySelectorAll('.window-' + name)
        return results.length === 1 ? results[0] : results
    }

    reset(){
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

    size(width,height){
        this.width = width
        this.height = height
    }

    onClose(){
        console.log('close')
        this.closed = true
        this.element.style.display = 'none'
    }
    onFullscreen(){
        console.log('fullscreen')
        this.fullscreen = !this.fullscreen
        if(this.fullscreen){
            this.element.style.left = '0px'
            this.element.style.top = '0px'
            this.element.style.width ='100%'
            this.element.style.height = '100%'
        }else{
            this.reset()
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
            this.reset()
        }
    }
    onDrag(){
        console.log('drag')
        this.attachX = this.x - this.mouseX
        this.attachY = this.y - this.mouseY
        this.drag = true
        this.get('header').style.cursor = 'grabbing'
    }
    onDrop(){
        console.log('drop')
        this.drag = false
        this.get('header').style.cursor = 'grab'
    }

    static addTheme( name, template, options ){
        themes[name] = {
            template : template,
            style : options
        }
    }
}