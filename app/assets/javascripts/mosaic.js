var Mosaic = function(options) {
  this.canvasId = options.canvasId;
  this.imageUrls = options.imageUrls || [];
  this.fullscreen = options.fullscreen || false;
  if(this.fullscreen){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    window.onresize = this.onresize.bind(this);
  } else {
    this.width = options.width || 640;
    this.height = options.height || 640;
  }
  this.setRowsCols(options.rows, options.cols);
  this.zoomMs = options.zoomMs || 3000;
  this.selectedIdx = null;
  this.selectedCell = {x: 0, y: 0};
  this.scale = 1;
  this.loadedImageCount = 0;
  this.playing = false;

  this.initCanvas();
  this.initImages();

  this.middleGrid = new MiddleGrid(this, this.getRandomImages(), this.getRandomImages(), .33, 1);

  this.load();
};

Mosaic.prototype = {

  onresize: function() {
    this.canvas.width  = this.width  = window.innerWidth;
    this.canvas.height = this.height = window.innerHeight;
  },

  dismount: function() {
    this.stop();
    this.canvas.removeEventListener('click', this.onClickCanvas.bind(this));

    this.canvas = null;
    this.ctx = null;
    this.imageUrls = null;
    this.images = null;
    this.middleGrid = null;
  },

  initCanvas: function() {
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resize();

    if(!this.fullscreen){
      this.canvas.addEventListener('click', this.onClickCanvas.bind(this));
    }
  },

  initImages: function() {
    this.loadedImages = 0;
    this.images = [];
    this.imageUrls.forEach(function(imgUrl){
      var img = new Image();
      img.loaded = false;
      img.loadAlpha = 0;
      img.loadScale = 1;
      img.loadX = 1;
      img.loadY = 1;
      img.onload = this.onImageLoad.bind(this);
      img.src = imgUrl;
      this.images.push(img);
    }.bind(this));
  },

//old
  // initImages: function() {
  //   this.images = [];
  //   this.imageUrls.forEach(function(imgDeets){
  //     var img = new Image();
  //     img.loaded = false;
  //     img.loadAlpha = 0;
  //     img.loadScale = 1;
  //     img.onload = this.onImageLoad.bind(this);
  //     img.id = imgDeets.id;
  //     img.src = imgDeets.url;
  //     this.images.push(img);
  //   }.bind(this));
  // },

  // onImageLoad: function(e) {
  //   e.currentTarget.loadAlpha = 1;
  //
  //   this.loadedImages++;
  //   if(this.loadedImages === 1){
  //     this.middleGrid.mainImage = e.currentTarget;
  //     // this.stop();
  //   }
  //   else if(this.loadedImages === this.images.length) {
  //
  //   }
  // },
//b4e20ef9425259ed3698b0b4e8a7f64579c0a56b
  onImageLoad: function(e) {
    // if(this.loadedImageCount > 1) return;
    e.currentTarget.loaded = true;
    e.currentTarget.loadAlpha = 1;
    this.loadedImageCount++;
    var loadComplete = null;

    if(this.loadedImageCount === 1){
      this.middleGrid.mainImage = e.currentTarget;
      // this.callback(this.middleGrid.mainImage.id);
    }
    else if(this.loadedImageCount === this.images.length) {
      loadComplete = function() {
        this.middleGrid.loading = false;
        this.stop();
      }.bind(this);
      // this.callback(this.middleGrid.mainImage.id);
    }

    var delay = 0;
    // if(!this.lastLoadTime){
    //   this.lastLoadTime = Date.now();
    // } else if(Date.now() - this.lastLoadTime < .1){
    //   delay = .1;
    // }

    // TODO: loadX and loadY are hard coded

    TweenLite.from(e.currentTarget, 1, {
                    loadScale: 0,
                    loadX: 0,
                    loadY: 0,
                    ease: Back.easeOut.config(1),
                    delay: delay,
                    onComplete: loadComplete });
  },

  onClickCanvas: function(e) {
    if(this.playing) return;

    var x = e.clientX;
    var y = e.clientY;
    if(!this.fullscreen){
      x += document.body.scrollLeft + this.canvas.scrollLeft - this.canvas.offsetLeft;
      y += document.body.scrollTop + this.canvas.scrollTop - this.canvas.offsetTop;
    }
    var cellX = Math.floor(x / (this.width / this.cols));
    var cellY = Math.floor(y / (this.height / this.rows));
    debugger;
    this.selectedIdx = this.getIndex(cellX, cellY);
    this.selectedCell = {x: cellX, y: cellY};
    this.middleGrid.smallImages = this.getRandomImages();
    this.play();
  },

  load: function() {
    this.playing = true;
    window.requestAnimationFrame(this.update.bind(this));
  },

  play: function() {
    this.playing = true;
    TweenLite.to(this, 2, {scale: this.cols, ease: Back.easeOut.config(2), onComplete: this.onTweenComplete.bind(this)});
    window.requestAnimationFrame(this.update.bind(this));
  },

  stop: function() {
    this.playing = false;
  },

  onTweenComplete: function() {
    this.middleGrid.swapImages(this.selectedCell);
    this.scale = 1;
    this.middleGrid.draw();
    this.stop();
  },

  getRandomImages: function() {
    var images = [];
    for(var c = 0; c < this.cols; c++){
      images.push([]);
      for(var r = 0; r < this.rows; r++) {
        images[c].push(this.getRandomElement(this.images));
      }
    }
    return images;
  },

  setRowsCols: function(rows, cols) {
    this.rows = rows || 10;
    this.cols = cols || 10;
    this.totalCells = rows * cols;
  },

  resize: function() {
    if(this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  draw: function(img, x, y, w, h, alpha){
    if(this.isInCanvasBounds(x, y, w, h)) {
      this.ctx.globalAlpha = alpha;
      this.ctx.drawImage(img, x, y, w, h);
      this.ctx.globalAlpha = 1;
    }
  },

  isInCanvasBounds: function(x, y, w, h) {
    return x < this.width && x + w > 0 && y < this.width && y + h > 0;
  },

  getScaleProgress: function() {
    return (this.scale-1) / (this.cols-1);
  },

  getRandomElement: function(arr) {
    var r = Math.floor(Math.random() * arr.length);
    return arr[r];
  },

  getCellX: function(idx) {
    return idx % this.cols;
  },

  getCellY: function(idx) {
    return Math.floor(idx / this.rows);
  },

  getIndex: function(cellX, cellY){
    return cellY * this.cols + cellX;
  },

  update: function() {
    if(this.playing) {

      // this.clear();
      this.middleGrid.draw();
      window.requestAnimationFrame(this.update.bind(this));
    }
  }
};