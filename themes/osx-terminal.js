
/** 
 * Official theme for Windows.js
 * name: OSX Terminal
 * author: Jean-Luc Perez, Ghom
 */

Window.addTheme('OSX Terminal', 'apple', {
    window: {
        boxShadow: '0 5px 20px #111',
        borderRadius: '10px',
        background: '#111'
    },
    header: {
        background: '-webkit-linear-gradient(top, #e8e8e8, #bcbbbc)',
        color: '#111',
    },
    body: {
        color: '#f0f0f0',
        fontFamily: "'Roboto Mono', monospace",
    },
    buttons: {
        width: '50px',
        padding: '0 0 0 10px',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        boxShadow: 'inset 0 1px 2px #11111155',
        transition: 'background-color 500ms'
    }, 
    close: { background: '#ff2c2c' },
    close_hover: { background: '#ff2c2c44' },
    minimize: { background: '#fc9b09' }, 
    minimize_hover: { background: '#fc9b0944' },
    fullscreen: { background: '#35d315' },
    fullscreen_hover: { background: '#35d31544' },
    title: {
        textShadow: '0 1px 0 #f0f0f0',
        paddingRight: '60px'
    }
})