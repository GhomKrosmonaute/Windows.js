# Windows JS

A window manager for your website style !

- Inspired by <a href="http://www.devjl.fr">devjl.fr</a>, for <a href="http://www.devjl.fr">devjl.fr</a>.
- To test it go <a href="https://camilleabella.github.io/Windows.js/">HERE</a> !
- To use this library, take the content of **./lib/**.
- This library is fast and light, make on full vanilla CSS & JS.
- CSS is simple to custom and more themes are coming !

## Usage

```html
<link rel="stylesheet" href="windows.css">
<script src="windows.js"></script>
```

```js
// all props are optionals
const
    x = Number, // left
    y = Number, // top
    width = Number,
    height = Number,
    options = {
        theme = String, // theme to use
        title = String, // title visible on top
        content = String, // HTML content of body
        style = String // StyleSheet of window
    };

new Window( x, y, width, height, options ) 
```

## Create a theme

```js
Window.addTheme( 'Theme name', 'template', {

    // Styles

    window: { // base container

        /* 
            Name css properties like the 
            HTMLElement.style properties.
            like this : 
        */
        boxShadow: '0 5px 20px #111',
        borderRadius: '10px',
        background: '#111'

    },

    header: { /* title container */ },
    body: { /* content container */ },

    button: { /* for each button */ }, 

    close: { /* close button */ }, 
    close_hover: { /* close button hovered */ },

    minimize: { /* minimize button */ }, 
    minimize_hover: { /* minimize button hovered */ },

    fullscreen: { /* fullscreen button */ }, 
    fullscreen_hover: { /* fullscreen button hovered */ },

    title: { /* title side of header */ },
    buttons: { /* buttons side of header */ }
    
})
```