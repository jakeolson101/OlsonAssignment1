"use strict";

// declare global variables
let gl; 
let points;
let colors;


window.onload = function init()
{
    function getRandomArbitrary() {
        return Math.random() * (2) + -1;
      }
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    //
    //  Initialize our data for a single triangle
    //
    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    colors = [
        
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random()),
        vec3(Math.random(), Math.random(), Math.random())
        
    ];

    // And, add our vertices point into our array of points
    points = [
        vec2(getRandomArbitrary(), getRandomArbitrary() ), //1st triangle
        vec2( getRandomArbitrary(), getRandomArbitrary() ), 
        vec2(getRandomArbitrary(), getRandomArbitrary() ),
        vec2(getRandomArbitrary(), getRandomArbitrary()), //2nd triangle
        vec2( getRandomArbitrary(), getRandomArbitrary() ), 
        vec2(getRandomArbitrary(),getRandomArbitrary() ),
        vec2(getRandomArbitrary(), getRandomArbitrary()), //3rd triangle
        vec2( getRandomArbitrary(), getRandomArbitrary() ), 
        vec2(getRandomArbitrary(),getRandomArbitrary() )
        ];

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    
    // Load the data into the GPU

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
