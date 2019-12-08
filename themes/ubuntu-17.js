
/** 
 * Official theme for Windows.js
 * name: Ubuntu 17
 * author: Jean-Luc Perez, Ghom
 */

Window.addTheme('Ubuntu 17', 'gnome', {
    window: {
        boxShadow: '0 5px 20px #111',
        borderRadius: '10px 10px 2px 2px',
        background: '#420533'
    },
    header: {
        background: '-webkit-linear-gradient(top, #706f68, #3C3B37)',
        fontFamily: "'Ubuntu', sans-serif",
        color: '#f0f0f0',
        height: '40px',
    },
    body: {
        color: '#f0f0f0',
        fontFamily: "'Ubuntu Mono', monospace",
    },
    buttons: {
        width: '60px',
        padding: '0 10px 0 0',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        boxShadow: 'inset 0 1px 2px #f0f0f044, 0 2px 3px #11111144',
        width: '16px',
        height: '16px',
        backgroundColor: '#949390'
    }, 
    button_hover: {
        backgroundColor: '#b4b4b4'
    },
    close: { 
        backgroundImage: 'url("https://img.icons8.com/ios/50/000000/multiply.png")',
        backgroundColor: '#FD613B'
    },
    close_hover: { 
        backgroundColor: '#ff8163',
    },
    minimize: { 
        backgroundImage: 'url("https://img.icons8.com/material-sharp/24/000000/minus.png")' 
    },
    fullscreen: { 
        backgroundImage: 'url("https://img.icons8.com/windows/32/000000/rounded-square.png")',
    },
    title: {
        textAlign: 'left'
    }
}, {
    icon : '<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ubuntu" class="svg-inline--fa fa-ubuntu fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm52.7 93c8.8-15.2 28.3-20.5 43.5-11.7 15.3 8.8 20.5 28.3 11.7 43.6-8.8 15.2-28.3 20.5-43.5 11.7-15.3-8.9-20.5-28.4-11.7-43.6zM87.4 287.9c-17.6 0-31.9-14.3-31.9-31.9 0-17.6 14.3-31.9 31.9-31.9 17.6 0 31.9 14.3 31.9 31.9 0 17.6-14.3 31.9-31.9 31.9zm28.1 3.1c22.3-17.9 22.4-51.9 0-69.9 8.6-32.8 29.1-60.7 56.5-79.1l23.7 39.6c-51.5 36.3-51.5 112.5 0 148.8L172 370c-27.4-18.3-47.8-46.3-56.5-79zm228.7 131.7c-15.3 8.8-34.7 3.6-43.5-11.7-8.8-15.3-3.6-34.8 11.7-43.6 15.2-8.8 34.7-3.6 43.5 11.7 8.8 15.3 3.6 34.8-11.7 43.6zm.3-69.5c-26.7-10.3-56.1 6.6-60.5 35-5.2 1.4-48.9 14.3-96.7-9.4l22.5-40.3c57 26.5 123.4-11.7 128.9-74.4l46.1.7c-2.3 34.5-17.3 65.5-40.3 88.4zm-5.9-105.3c-5.4-62-71.3-101.2-128.9-74.4l-22.5-40.3c47.9-23.7 91.5-10.8 96.7-9.4 4.4 28.3 33.8 45.3 60.5 35 23.1 22.9 38 53.9 40.2 88.5l-46 .6z"></path></svg>'
})