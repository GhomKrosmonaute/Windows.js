
Window.addTheme( 
    /* name: */ 'apple-terminal', 
    /* template: */ 'apple', 
    /* style: */ {
        window: {
            boxShadow: 'none',
            borderRadius: '10px',
            background: '#111'
        },
        header: {
            background: '#f0f0f0',
            color: '#111',
            height: '25px',
        },
        body: {
            color: '#f0f0f0',
        },
        buttons: {
            width: '50px',
            padding: '0 0 0 10px',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        button: {
            transition: 'background-color 50ms',
        },
        close: {},
        minimize: {},
        fullscreen: {},
        title: {
            padding: '2px 0 0 0'
        }
    }
)

document.addEventListener('DOMContentLoaded',()=>{

    new Window( 20, 20, 400, 200, {
        title: 'Windows.js',
        content: 'Hello World !'
    })

    new Window( 300, 50, 600, 300, {
        theme: 'apple-terminal',
        title: 'Window with custom theme',
        content: `
            <h1> h1 Title </h1>
            <h2> h2 Title </h2>
            <h3> h3 Title </h3>
            <p> Paragraphe </p>
        `
    })

    new Window(400,400)
    
})

