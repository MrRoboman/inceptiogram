var AllTimePicStore = require('../stores/all_time_pic_store');
var ClientActions = require('../actions/client_actions');
var PictureStore = require('../stores/picture_store');

var Inception = function(canvas, pictureJson) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');

  this.loadedPicCount = 0;
  this.makePictures(pictureJson);

  this.resize();
  window.onresize = function() {
    this.resize();
  }.bind(this);

  this.zoomSeconds = 10;
  this.scale = 1;

  this.superAlpha = .2;
  this.subAlpha = 0;

  this.offsetX = 0;
  this.offsetY = 0;

  this.canClick = true;


  // this.initPics();

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

  makePictures: function(json) {
    this.pictures = {
      array: [],
      object: {}
    };
    var keys = Object.keys(json);
    keys.forEach(function(key){
      var img = new Image();
      img.src = json[key].url;
      img.loadAlpha = 0;
      img.onload = this.onPictureLoad.bind(this);
      this.pictures.array.push(img);
      this.pictures.object[key] = img;
    }.bind(this));

    this.buildMap();
    // this.imgMap = this.subImgMap;
    // this.buildMap();
    this.mainFrame.imageGrid = this.imgMap;

    this.startTime = Date.now();
    window.requestAnimationFrame(this.update.bind(this));
    this.robotChooseCell();
  },

  calculate: function() {
    var msComplete = this.zoomSeconds * 1000;
    var elapsed = Date.now() - this.startTime;
    if(elapsed >= msComplete){
      this.startTime += elapsed;
      this.grid.superImages = this.grid.images;
      this.mainFrame.imageGrid = this.imgMap;
      this.imgMap = this.subImgMap;
    }
    var percentComplete = elapsed / msComplete;
    percentComplete *= percentComplete;
    // var rateChange = percentComplete
    this.scale = 1 + (this.grid.rows - 1) * percentComplete;
    this.offsetX = this.destOffsetX * percentComplete;
    this.offsetY = this.destOffsetY * percentComplete;
    this.subAlpha = .2 * percentComplete;
    this.superAlpha = .2 - (.2 * percentComplete);
    // console.log(elapsed);
  },

  onPictureLoad: function(e) {
    // this.loadedPicCount++;
    TweenLite.to(e.currentTarget, 2, {loadAlpha: 1});
    // if(this.loadedPicCount === this.pictures.array.length) {
      // this.buildMap();
      // this.imgMap = this.subImgMap;
      // this.buildMap();
      // this.mainFrame.imageGrid = this.imgMap;
      // window.requestAnimationFrame(this.update.bind(this));
      // this.click(100,100);
      // this.robotChooseCell();
    // }
  },

  // initPics: function() {
  //   //do a fetch for pic index if number is fewer than ten
  //   this.pics = AllTimePicStore.all();
  //   var keys = Object.keys(this.pics);
  //   keys.forEach(function(key){
  //     var img = new Image();
  //     img.src = this.pics[key].url;
  //     this.pics[key].img = img;
  //   }.bind(this));
  //   this.buildMap();
  //   this.imgMap = this.subImgMap;
  //   this.buildMap(); // doing it twice to fill both imgMap and subImgMap
  // },

  buildMap: function(){
    this.subImgMap = [];
    var len = this.pictures.array.length;
    var totalCells = this.grid.getTotalCells();
    for(var i = 0; i < totalCells; i++){
      var r = Math.floor(Math.random()*len);
      this.subImgMap.push(this.pictures.array[r]);
    }
  },

  resize: function() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    // this.screenWidth = 640;
    // this.screenHeight = 640;
    this.canvas.width = this.screenWidth;
    this.canvas.height= this.screenHeight;
  },

  click: function(X, Y){
    // debugger;
    if(!this.canClick || this.clickOutOfBounds(X, Y)) return;

    this.selectedCell = this.getIndex(X,Y);
    // ClientActions.fetchSinglePicture(this.imgMap[this.selectedCell].id);

    var x = this.getCellX(X);
    var y = this.getCellY(Y);

    this.buildMap();
    // debugger
    this.zoomIn(x, y);
    this.canClick = false;
  },

  robotChooseCell: function () {
    this.selectedCell = 55;
    var x = this.selectedCell % this.grid.cols;
    var y = Math.floor(this.selectedCell / this.grid.rows);
    // debugger;
    this.buildMap();
    this.zoomIn(x,y);
  },

  zoomIn: function(x, y) {
    var offsetX = (this.grid.rows - 1) - (2 * x);
    offsetX *= (this.mainFrame.width / 2);
    var offsetY = (this.grid.rows - 1) - (2 * y);
    offsetY *= (this.mainFrame.height / 2);

    this.destOffsetX = offsetX;
    this.destOffsetY = offsetY;

    // TweenLite.to(this, this.zoomSeconds,
    //             {//scale: this.grid.rows,
    //              //superAlpha: 0,
    //              //subAlpha: .2,
    //              //offsetX: offsetX,
    //              //offsetY: offsetY,
    //              ease: Power1.easeIn,
    //              onComplete: this.onZoomComplete.bind(this)
    //            });
  },

  onZoomComplete: function() {
    this.grid.superImages = this.grid.images;

    this.scale = 1;

    this.superAlpha = .2;
    this.subAlpha = 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.mainFrame.imageGrid = this.imgMap;
    // this.buildMap();
    this.imgMap = this.subImgMap;
    this.robotChooseCell();
    // this.canClick = true;
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

  // drawMainFrameImage: function() {
  //   if(!this.mainFrame.image) return;
  //   var x = this.getMainFrameX();
  //   var y = this.getMainFrameY();
  //   var w = this.getMainFrameW();
  //   var h = this.getMainFrameH();
  //   this.ctx.drawImage(this.mainFrame.image,x,y,w,h);
  // },

  drawMainFrameImageGrid: function() {
    // debugger;
    if(!this.mainFrame.imageGrid) return;
    for(var i = 0; i < this.grid.cols*this.grid.rows; i++){
      var X = i % this.grid.cols - Math.floor(this.grid.cols/2);
      var Y = Math.floor(i/this.grid.rows) - Math.floor(this.grid.rows/2);
      var w = this.getMainFrameW();
      var h = this.getMainFrameH();
      var x = this.getMainFrameX() + w * X;
      var y = this.getMainFrameY() + h * Y;
      // debugger;
      if(y + h < 0) {
        // i += this.grid.cols;
        continue;
      }
      else if(x + w < 0 || x > this.canvas.width) {
        continue;
      }
      else if(y > this.canvas.height) {
        break;
      }
      if(this.isOnScreen(x,y,w,h)){
        this.ctx.globalAlpha = this.superAlpha * this.mainFrame.imageGrid[i].loadAlpha;
        this.ctx.drawImage(this.mainFrame.imageGrid[i],x,y,w,h);
        this.ctx.globalAlpha = 1;
      }
    }
  },

  drawSubImage: function(idx, subIdx, img) {
    // if(!this.selectedCell) return;
    var cellX = subIdx % this.grid.rows;
    var cellY = Math.floor(subIdx / this.grid.cols);
    var w = this.getGridFrameW() / this.grid.rows;
    var h = this.getGridFrameH() / this.grid.cols;
    var x = this.getGridFrameX(idx) + (cellX * w);
    var y = this.getGridFrameY(idx) + (cellY * h);

    if(this.isOnScreen(x,y,w,h)){
      this.ctx.globalAlpha = this.subAlpha * img.loadAlpha;
      this.ctx.drawImage(img,x,y,w,h);
      this.ctx.globalAlpha = 1;
    }
  },

  drawAllSubImages: function() {
    if(!(this.selectedCell >= 0)) return;
    var totalCells = this.grid.getTotalCells();
    for(var i = 0; i < totalCells; i++){
      this.drawSubImage(this.selectedCell, i, this.subImgMap[i]);
      this.drawSubImage(this.selectedCell-1, i, this.subImgMap[i]);
      this.drawSubImage(this.selectedCell+1, i, this.subImgMap[i]);
      this.drawSubImage(this.selectedCell+this.grid.rows, i, this.subImgMap[i]);
      this.drawSubImage(this.selectedCell+this.grid.rows+1, i, this.subImgMap[i]);
      this.drawSubImage(this.selectedCell+this.grid.rows-1, i, this.subImgMap[i]);
      this.drawSubImage(this.selectedCell-this.grid.rows, i, this.subImgMap[i]);
      this.drawSubImage(this.selectedCell-this.grid.rows+1, i, this.subImgMap[i]);
      this.drawSubImage(this.selectedCell-this.grid.rows-1, i, this.subImgMap[i]);
    }
  },


  drawGridImage: function(bigIdx, idx, img) {
    if(!img) return;
    var X = bigIdx % 3 - 1;
    var Y = Math.floor(bigIdx / 3) - 1;
    var w = this.getGridFrameW();
    var h = this.getGridFrameH();
    var x = this.getGridFrameX(idx) + this.getMainFrameW() * X;
    var y = this.getGridFrameY(idx) + this.getMainFrameH() * Y;
    // debugger;
    if(this.isOnScreen(x,y,w,h)){
      this.ctx.globalAlpha = .2 * img.loadAlpha;
      this.ctx.drawImage(img,x,y,w,h);
      // console.log('THERE');
      this.ctx.globalAlpha = 1;
    }
  },

  drawAllGridImages: function() {
    // for(var i = 0; i < this.grid.images.length; i++){
    //   this.ctx.globalAlpha = this.superAlpha;
    //   this.drawGridImage(i, this.grid.images[i]);
    //   this.ctx.globalAlpha = 1;
    // }
    if(!this.imgMap) return;
    for(var i = 0; i < this.imgMap.length; i++){
      this.ctx.globalAlpha = this.superAlpha * this.imgMap[i].loadAlpha;
      this.drawGridImage(0, i, this.imgMap[i]);
      this.drawGridImage(1, i, this.imgMap[i]);
      this.drawGridImage(2, i, this.imgMap[i]);
      this.drawGridImage(3, i, this.imgMap[i]);
      this.drawGridImage(4, i, this.imgMap[i]);
      this.drawGridImage(5, i, this.imgMap[i]);
      this.drawGridImage(6, i, this.imgMap[i]);
      this.drawGridImage(7, i, this.imgMap[i]);
      this.drawGridImage(8, i, this.imgMap[i]);
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
  // loadMainFrameImage: function(url) {
  //   var img = new Image();
  //   img.src = url;
  //   img.onload = this.onload.bind(this);
  //   this.mainFrame.image = img;
  // },

  loadGridImages: function(url) {
    var img = new Image();
    img.src = url;
    this.mainFrame.image = img;
    // var totalCells = this.grid.getTotalCells();
    // this.grid.images = [];
    // for(var i = 0; i < totalCells; i++){
    //   var img = new Image();
    //   img.idx = i;
    //   img.src = url;
    //   img.onload = this.onload.bind(this);
    //   this.grid.images.push(img);
    //   //TODO this is for testing
    //   // this.grid.subImages.push(img);
    // }
    this.listener = PictureStore.addListener(this.onChange);
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

  isOnScreen: function(x,y,w,h) {
    return (x+w > 0 && x < this.canvas.width && y+h > 0 && y < this.canvas.height);
  },

  update: function() {
    // debugger;
    this.calculate();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.drawMainFrameImageGrid();
    this.drawAllGridImages();
    this.drawAllSubImages();
    window.requestAnimationFrame(this.update.bind(this));
    // if(this.canvas) {
    //   console.log('DRAW');
      // this.clear();
      //
      // this.drawMainFrameImage();
      // this.drawAllGridImages();
      // this.drawAllSubImages();
    // }
    // else {
    //   this.loadCanvas();
    // }
    //
    // if(this.canvasRunning){
    //   window.requestAnimationFrame(this.update.bind(this));
    // } else {
    //   this.canvas = null;
    // }
  }
};


module.exports = Inception;
