
let id_gen = 0

class Window {

    constructor(x,y,width,height,_title,_content){
        id_gen ++
        this.id = id_gen
        this.closed = false
        this.minimized = false
        this.displayMode = false /*
            false = normal
            true = fullscreen
        */

        const template = {
            header: {
                buttons: {
                    close: null,
                    displayMode: null,
                    minimize: null
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
        for(key in template){
            const element = createElement(key)
            if(template[key] && typeof template[key] == 'object'){
                for(_key in template[key]){
                    const _element = createElement(_key)
                    if(template[key][_key] && typeof template[key][_key] == 'object'){
                        for(__key in template[key][_key]){
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

        // setting
        this.size(width,height)
        this.place(x,y)

        // listeners
        this.closeButton.addEventListener('click', this.onClose)
        this.displayModeButton.addEventListener('click', this.onDisplayMode)
        this.minimizeButton.addEventListener('click', this.onMinimize)
    }

    get element(){
        return document.getElementById('window-' + this.id)
    }
    get closeButton(){
        return this.element.getElementsByClassName('window-close')
    }
    get displayModeButton(){
        return this.element.getElementsByClassName('window-displayMode')
    }
    get minimizeButton(){
        return this.element.getElementsByClassName('window-minimize')
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
    onDisplayMode(){
        this.displayMode = !this.displayMode
        if(this.displayMode){
            this.element.style.left = '0px'
            this.element.style.top = '0px'
            this.element.style.width ='100%'
            this.element.style.height = '100%'
        }else{
            this.place(
                this.x,
                this.y
            )
            this.size(
                this.width,
                this.height
            )
        }
    }
    onMinimize(){
        this.minimized = !this.minimized
        if(this.minimized){
            this.body.style.display = 'none'
        }else{
            this.body.style.display = 'block'
        }
    }
}