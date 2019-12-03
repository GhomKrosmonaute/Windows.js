
const instances = []

class Window {

    constructor(x,y,width,height,_title,_content){
        this.id = instances.length
        this.drag = false
        this.attachX = 0
        this.attachY = 0
        this.mouseX = 0
        this.mouseY = 0
        this.closed = false
        this.minimized = false
        this.fullscreen = false

        const template = {
            header: {
                buttons: {
                    close: null,
                    minimize: null,
                    fullscreen: null
                },
                title: _title
            },
            body: _content
        }

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
                        _element.innerHTML = template[key][_key]
                    }
                    element.appendChild(_element)
                }
            }else if(typeof template[key] == 'string'){
                element.innerHTML = template[key]
            }
            container.appendChild(element)
        }

        document.body.appendChild(container)

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
        this.get('header').addEventListener('mousedown', ()=>this.onDrag())
        document.addEventListener('mouseup', ()=>this.onDrop())
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

    get element(){
        return document.getElementById('window-' + this.id)
    }
    get(name){
        return this.element.querySelector('.window-' + name)
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
        this.element.style.left = x + 'px'
        this.element.style.top = y + 'px'
    }

    size(width,height){
        this.width = width
        this.height = height
        this.element.style.width = width + 'px'
        this.element.style.height = height + 'px'
    }

    onClose(){
        this.closed = true
        this.element.style.display = 'none'
    }
    onFullscreen(){
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
        this.minimized = !this.minimized
        if(this.minimized){
            this.get('body').style.display = 'none'
            this.element.style.height = '25px'
        }else{
            this.get('body').style.display = 'block'
            this.reset()
        }
    }
    onDrag(){
        this.attachX = this.x - this.mouseX
        this.attachY = this.y - this.mouseY
        this.drag = true
        this.get('header').style.cursor = 'grabbing'
    }
    onDrop(){
        this.drag = false
        this.get('header').style.cursor = 'grab'
    }
}