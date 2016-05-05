var PictureStore = require('../stores/picture_store');
var ProfileStore = require('../stores/profile_store');

var Inception = function() {
  // this.canvas = canvas;
  // this.ctx = canvas.getContext('2d');

  // this.resize();
  window.onresize = function() {
    this.resize();
  }.bind(this);

  this.zoomSeconds = 2;
  this.scale = 1;

  this.superAlpha = .33;
  this.subAlpha = 0;

  this.offsetX = 0;
  this.offsetY = 0;

  this.canClick = true;

  // window.requestAnimationFrame(this.update.bind(this));
};

Inception.prototype = {
  mainFrame: {
    width: 640,
    height: 640,
    image: null
  },

  grid: {
    rows: 10,
    cols: 10,
    getTotalCells: function() {
      return this.rows * this.cols;
    },
    images: [],
    subImages: []
  },

  resize: function() {
    // this.screenWidth = window.innerWidth;
    // this.screenHeight = window.innerHeight;
    this.screenWidth = 640;
    this.screenHeight = 640;
    this.canvas.width = this.screenWidth;
    this.canvas.height= this.screenHeight;
  },

  click: function(X, Y){
    if(!this.canClick || this.clickOutOfBounds(X, Y)) return;

    this.selectedCell = this.getIndex(X,Y);
    console.log(this.selectedCell);
    var x = this.getCellX(X);
    var y = this.getCellY(Y);

    this.zoomIn(x, y);
    this.canClick = false;
  },

  zoomIn: function(x, y) {
    var offsetX = (this.grid.rows - 1) - (2 * x);
    offsetX *= (this.mainFrame.width / 2);
    var offsetY = (this.grid.rows - 1) - (2 * y);
    offsetY *= (this.mainFrame.height / 2);

    TweenLite.to(this, this.zoomSeconds,
                {scale: this.grid.rows,
                 superAlpha: 1,
                 subAlpha: .33,
                 offsetX: offsetX,
                 offsetY: offsetY,
                 onComplete: this.onZoomComplete.bind(this)
               });
  },

  onZoomComplete: function() {
    this.grid.superImages = this.grid.images;

    this.scale = 1;

    this.superAlpha = .33;
    this.subAlpha = 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.canClick = true;
  },

  clickOutOfBounds: function(X, Y) {
    var x = this.getCellX(X);
    var y = this.getCellY(Y);
    return (x < 0 || x >= this.grid.rows || y < 0 || y >= this.grid.cols);
  },

  getMainFrameX: function() {
    return this.screenWidth / 2 - this.getMainFrameW() / 2 + this.offsetX;
  },

  getMainFrameY: function() {
    return this.screenHeight / 2 - this.getMainFrameH() / 2 + this.offsetY;
  },

  getMainFrameW: function() {
    return this.mainFrame.width * this.scale;
  },

  getMainFrameH: function() {
    return this.mainFrame.height * this.scale;
  },

  getGridFrameX: function(idx) {
    return this.getMainFrameX() + this.getGridFrameW() * (idx % this.grid.cols);
  },

  getGridFrameY: function(idx) {
    return this.getMainFrameY() + this.getGridFrameH() * Math.floor(idx / this.grid.rows);
  },

  getGridFrameW: function() {
    return this.getMainFrameW() / this.grid.cols;
  },

  getGridFrameH: function() {
    return this.getMainFrameH() / this.grid.rows;
  },

  getSuperScale: function() {
    return this.scale * this.grid.rows;
  },

  drawMainFrameImage: function() {
    var x = this.getMainFrameX();
    var y = this.getMainFrameY();
    var w = this.getMainFrameW();
    var h = this.getMainFrameH();
    this.ctx.drawImage(this.mainFrame.image,x,y,w,h);
  },

  drawSubImage: function(idx, subIdx, img) {
    // if(!this.selectedCell) return;
    var cellX = subIdx % this.grid.rows;
    var cellY = Math.floor(subIdx / this.grid.cols);
    var w = this.getGridFrameW() / this.grid.rows;
    var h = this.getGridFrameH() / this.grid.cols;
    var x = this.getGridFrameX(idx) + (cellX * w);
    var y = this.getGridFrameY(idx) + (cellY * h);
    this.ctx.globalAlpha = this.subAlpha;
    this.ctx.drawImage(img,x,y,w,h);
    this.ctx.globalAlpha = 1;
  },

  drawAllSubImages: function() {
    if(!(this.selectedCell >= 0)) return;
    var totalCells = this.grid.getTotalCells();
    for(var i = 0; i < totalCells; i++){
      this.drawSubImage(this.selectedCell, i, this.grid.images[0]);
    }
  },


  drawGridImage: function(idx, img) {
    if(!img) return;
    var x = this.getGridFrameX(idx);
    var y = this.getGridFrameY(idx);
    var w = this.getGridFrameW();
    var h = this.getGridFrameH();
    this.ctx.drawImage(img,x,y,w,h);
  },

  drawAllGridImages: function() {
    for(var i = 0; i < this.grid.images.length; i++){
      this.ctx.globalAlpha = this.superAlpha;
      this.drawGridImage(i, this.grid.images[i]);
      this.ctx.globalAlpha = 1;
    }
  },

  clear: function() {
    var c = this.getMainFrameCoords();
    var x = 0;
    var y = 0;
    var w = this.screenWidth;
    var h = this.screenHeight;
    this.ctx.clearRect(x, y, w, h);
  },

// util
  getMainFrameCoords: function() {
    var x = this.getMainFrameX();
    var y = this.getMainFrameY();
    var w = this.mainFrame.width;
    var h = this.mainFrame.height;
    return {x: x, y: y, w: w, h: h};
  },

  getCellX: function(X) {
    return Math.floor((X - this.getMainFrameX()) / this.getGridFrameW());
  },

  getCellY: function(Y) {
    return Math.floor((Y - this.getMainFrameY()) / this.getGridFrameH());
  },

  getIndex: function(X, Y) {
    var x = this.getCellX(X);
    var y = this.getCellY(Y);
    var idx = y * this.grid.rows + x;
    return idx;
  },

// loading client stuff
  loadMainFrameImage: function(url) {
    var img = new Image();
    img.src = url;
    img.onload = this.onload.bind(this);
    this.mainFrame.image = img;
  },

  getRandomPicture: function() {
    var pics = [];
    var pic;
    pic = PictureStore.getRandomPicture();
    if(pic) pics.push(pic);
    pic = ProfileStore.getRandomPicture();
    if(pic) pics.push(pic);
    return pics[Math.floor(Math.random() * pics.length)];
  },

  loadGridImages: function(url) {
    var totalCells = this.grid.getTotalCells();
    this.grid.images = [];
    for(var i = 0; i < totalCells; i++){
      var img = new Image();
      this.mainFrame.image = img;
      img.idx = i;
      img.src = this.getRandomPicture().url;
      img.onload = this.onload.bind(this);
      this.grid.images.push(img);
      //TODO this is for testing
      // this.grid.subImages.push(img);
    }

    window.requestAnimationFrame(this.update.bind(this));
  },

  loadCanvas: function() {
    this.modalContainer = document.getElementById('modal-container');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.resize();
    window.onresize = function() {
      this.resize();
    }.bind(this);

    //TODO hard coding coords bad
    this.canvas.addEventListener('click', function(e) {
      var x = e.clientX - this.modalContainer.offsetLeft + 26;
      var y = e.clientY - this.modalContainer.offsetTop - 11;
      // var offsetX = (window.innerWidth - 1000) / 2;
      // var x = e.clientX - offsetX;
      // var offsetY
      console.log(x,y);
      this.click(x, y);
    }.bind(this));

    this.canvasRunning = true;
  },

  unloadCanvas: function() {
    this.canvasRunning = false;
  },

  //loads each image as it loads
  onload: function(e) {
    e.currentTarget.loaded = true;
  },

  update: function() {
    if(this.canvas) {
      this.clear();

      this.drawMainFrameImage();
      this.drawAllGridImages();
      this.drawAllSubImages();
    }
    else {
      this.loadCanvas();
    }

    if(this.canvasRunning){
      window.requestAnimationFrame(this.update.bind(this));
    } else {
      this.canvas = null;
    }
  }
};


module.exports = Inception;
