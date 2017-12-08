var gl;
var shaderProgram;
var vertexBuffer; // буфер вершин
var indexBuffer; //буфер индексов
// установка шейдеров
function initShaders() {
    // получаем шейдеры
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
    //создаем объект программы шейдеров
    shaderProgram = gl.createProgram();
    // прикрепляем к ней шейдеры
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    // связываем программу с контекстом webgl
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
         alert("Не удалось установить шейдеры");
    }

    gl.useProgram(shaderProgram);
    // установка атрибута программы
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
}
// Функция создания шейдера по типу и id источника в структуре DOM
function getShader(type,id) {
    var source = document.getElementById(id).innerHTML;
    // создаем шейдер по типу
    var shader = gl.createShader(type);
    // установка источника шейдера
    gl.shaderSource(shader, source);
    // компилируем шейдер
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initBuffers() {

    vertices =[ -0.5, -0.5, 0.0,
                -0.5, 0.5, 0.0,
                 0.5, 0.5, 0.0,
                0.5, -0.5, 0.0];

    indices = [0, 1, 1,2, 2, 3, 3,0];
 // установка буфера вершин
  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  // указываем размерность
  vertexBuffer.itemSize = 3;

  // создание буфера индексов
  indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    // указываем число линий. это число равно числу индексов
    indexBuffer.numberOfItems = indices.length;
    vertexBuffer.numberOfItems = 4;
    x = getRandomValue(1, 300);
    y = getRandomValue(1, 300);
    z = getRandomValue(1, 300);
    var сolors = [
          x, 0, 0,
          0, y, 0,
          0, 0, z,
          0, z,0
      ];
      colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}
function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min) / 100;

function draw() {

    // установка фона
    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    // установка области отрисовки
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    // отрисовка примитивов - линий
    gl.drawElements(gl.LINE_LOOP, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
                        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
                        gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}

window.onload=function(){

    var canvas = document.getElementById("canvas3D");
    try {
         gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
    }
    if(gl){
        // установка размеров области рисования
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        initShaders();

        initBuffers();

        draw();
    }
}
