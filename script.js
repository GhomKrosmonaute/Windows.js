
document.addEventListener('DOMContentLoaded',()=>{

    new Window(20,20,400,200,
        'Windows.js',`
            Hello World !
        `
    );

    new Window(300,50,600,300,
        'Secondary window',`
            <h1> Header </h1>
            <p> Paragraphe </p>
        `
    )
    
})