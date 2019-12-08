

document.addEventListener('DOMContentLoaded',()=>{

    let i=0
    for(const name in Window.themes){ i++
        new Window( i*100, 150+i*34, 600, 300, {
            theme: name,
            title: 'Theme — ' + name,
            content: `
                <h1> h1 Title </h1>
                <h2> h2 Title </h2>
                <h3> h3 Title </h3>
                <p> Paragraphe </p>
            `
        })
    }
    
})

