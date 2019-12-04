
Window.addTheme( 
    /* name: */ 'Apple Terminal', 
    /* template: */ 'apple', 
    /* style: */ {

        window: { // base container
            boxShadow: '0 5px 20px #111',
            borderRadius: '10px',
            background: '#111'
        },

        header: { // title container
            background: '-webkit-linear-gradient(top, #e8e8e8, #bcbbbc)',
            color: '#111',
            height: '25px',
        },

        body: { // content container
            color: '#f0f0f0',
            fontFamily: "'Roboto Mono', monospace",
        },

        buttons: { // buttons container
            width: '50px',
            padding: '0 0 0 10px',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        button: { // for each button
            boxShadow: 'inset 0 1px 2px #11111155',
            transition: 'background-color 500ms'
        }, 
        close: { background: '#ff2c2c' }, // close button
        close_hover: { background: '#ff2c2c44' }, // close button hovered
        minimize: { background: '#fc9b09' }, 
        minimize_hover: { background: '#fc9b0944' },
        fullscreen: { background: '#35d315' },
        fullscreen_hover: { background: '#35d31544' },

        title: {
            textShadow: '0 1px 0 #f0f0f0',
            padding: '2px 0 0 0'
        }
    }
)

document.addEventListener('DOMContentLoaded',()=>{

    new Window( 0, 0, 600, 300, {
        title: 'Windows.js - Online test',
        content: `
            <h1> Hello World ! </h1>
            <h3> Apply css inside window is very simply: </h3>
            <pre><code>
    new Window( x, y, width, height, {
        style: \`
            h1 { 
                text-align: center; 
                padding: 15px;
                font-size: 38px;
                color: gray;
            }
        \`
    })
            </code></pre>
        `,
        style: `
            h1 { 
                text-align: center; 
                padding: 15px;
                font-size: 38px;
                color: gray;
            }
        `
    })

    let i=0
    for(const name in Window.themes){ i++
        new Window( i*300, i*150, 600, 300, {
            theme: name,
            title: 'Theme - ' + name,
            content: `
                <h1> h1 Title </h1>
                <h2> h2 Title </h2>
                <h3> h3 Title </h3>
                <p> Paragraphe </p>
            `
        })
    }
    
})

