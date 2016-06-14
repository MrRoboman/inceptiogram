
/**************
* Middle Grid *
**************/

var MiddleGrid = function(mosaic, mainImage, smallImages, images, startAlpha, endAlpha) {
  this.mosaic = mosaic;
  this.smallImages = smallImages;
  this.images = images;
  this.mainImage = mainImage;
  this.startAlpha = startAlpha;
  this.endAlpha = endAlpha;
  this.loading = true;
};

MiddleGrid.prototype = {
  draw: function() {

    //Big
    if(!this.loading){
      var img = this.mainImage;
      var x = this.getX(0);
      var y = this.getY(0);
      var w = this.mosaic.width * this.mosaic.scale;
      var h = this.mosaic.height * this.mosaic.scale;
      var a = this.getAlpha(1,0) * img.loadAlpha;
      this.mosaic.draw(img, x, y, w, h, a);
    }

    // Middle
    var bounds = this.getDrawBounds();
    for(var c = bounds.left; c < bounds.right; c++){
      for(var r = bounds.top; r < bounds.bottom; r++) {
        img = this.images[c][r];
        x = this.getX(c, img);
        y = this.getY(r, img);
        w = this.getW(img);
        h = this.getH(img);
        a = this.getAlpha(this.startAlpha, this.endAlpha) * img.loadAlpha;
        if(this.loading && img.loaded){
          this.mosaic.drawChunk(this.mainImage, this.getX(c), this.getY(r), this.getW(), this.getH(), x, y, w, h, 1);
        }
        this.mosaic.draw(img, x, y, w, h, a);

        //Small
        if(c === this.mosaic.selectedCell.x && r === this.mosaic.selectedCell.y){
          var smBounds = this.getSmallDrawBounds(c, r);
          for(var smC = smBounds.left; smC < smBounds.right; smC++){
            for(var smR = smBounds.top; smR < smBounds.bottom; smR++){
              img = this.smallImages[smC][smR];
              x = this.getSmallX(c, smC);
              y = this.getSmallY(r, smR);
              w = this.getSmallW();
              h = this.getSmallH();
              a = this.getAlpha(0, this.startAlpha) * img.loadAlpha;
              this.mosaic.draw(img, x, y, w, h, a);
            }
          }
        }
      }
    }
  },

  //Small

  getSmallDrawBounds: function(col, row) {
    // x y indices
    var bounds = {
      left: 0,
      right: this.mosaic.cols,
      top: 0,
      bottom: this.mosaic.rows
    };

    var w = this.getSmallW();
    var h = this.getSmallH();

    var left = this.getSmallX(col,0);
    var right = this.getSmallX(col, this.mosaic.cols-1) + w;
    var top = this.getSmallY(row, 0);
    var bottom = this.getSmallY(row, this.mosaic.rows-1) + h;

    if(left < 0) {
      bounds.left = Math.floor(-left / w);
    }

    if(top < 0){
      bounds.top = Math.floor(-top / h);
    }

    if(right > this.mosaic.width) {
      right -= this.mosaic.width;
      right = Math.floor(right / w);
      bounds.right -= right;
    }

    if(bottom > this.mosaic.height) {
      bottom -= this.mosaic.height;
      bottom = Math.floor(bottom / h);
      bounds.bottom -= bottom;
    }

    return bounds;
  },

  getSmallX: function(cellX, smallCellX) {
    var middleCellX = this.mosaic.width / this.mosaic.cols * cellX * this.mosaic.scale + this.offsetX(this.mosaic.selectedCell.x);
    return middleCellX + this.getSmallW() * smallCellX;
  },

  getSmallY: function(cellY, smallCellY) {
    var middleCellY = this.getY(cellY);
    return middleCellY + this.getSmallH() * smallCellY;
  },

  getSmallW: function() {
    return this.mosaic.width / this.mosaic.cols / this.mosaic.cols * this.mosaic.scale;
  },

  getSmallH: function() {
    return this.mosaic.height / this.mosaic.rows / this.mosaic.rows * this.mosaic.scale;
  },



  //Middle

  getDrawBounds: function() {
    var bounds = {
      left: 0,
      right: this.mosaic.cols,
      top: 0,
      bottom: this.mosaic.rows
    };

    var w = this.getW();
    var h = this.getH();

    var left = this.getX(0);
    var right = this.getX(this.mosaic.cols-1) + w;
    var top = this.getY(0);
    var bottom = this.getY(this.mosaic.rows-1) + h;

    if(left < 0) {
      bounds.left = Math.floor(-left / w);
    }

    if(top < 0){
      bounds.top = Math.floor(-top / h);
    }

    if(right > this.mosaic.width) {
      right -= this.mosaic.width;
      right = Math.floor(right / w);
      bounds.right -= right;
    }

    if(bottom > this.mosaic.height) {
      bottom -= this.mosaic.height;
      bottom = Math.floor(bottom / h);
      bounds.bottom -= bottom;
    }

    return bounds;
  },

  getAlpha: function(startAlpha, endAlpha) {
    var alphaRange = endAlpha - startAlpha;
    return alphaRange * this.mosaic.getScaleProgress() + startAlpha;
  },

  offsetX: function(cellX) {
    return -this.mosaic.width * cellX * this.mosaic.getScaleProgress();
  },

  offsetY: function(cellY) {
    return -this.mosaic.height * cellY * this.mosaic.getScaleProgress();
  },

  getX: function(cellX, img) {
    var loadX = 1;
    if(img){
      loadX = img.loadX;
    }
    var middle = this.mosaic.width / 2;
    var destX = this.mosaic.width / this.mosaic.cols * cellX * this.mosaic.scale + this.offsetX(this.mosaic.selectedCell.x);
    var midDiff = destX - middle;
    return middle + (midDiff * loadX);
  },

  getY: function(cellY, img) {
    var loadY = 1;
    if(img){
      loadY = img.loadY;
    }
    var middle = this.mosaic.height / 2;
    var destY = this.mosaic.height / this.mosaic.rows * cellY * this.mosaic.scale + this.offsetY(this.mosaic.selectedCell.y);
    var midDiff = destY - middle;
    return middle + (midDiff * loadY);
  },

  getW: function(img) {
    var loadScale = img ? img.loadScale : 1;
    return this.mosaic.width / this.mosaic.cols * this.mosaic.scale * loadScale;
  },

  getH: function(img) {
    var loadScale = img ? img.loadScale : 1;
    return this.mosaic.height / this.mosaic.rows * this.mosaic.scale * loadScale;
  },

  swapImages: function(selectedCell) {
    this.mainImage = this.images[selectedCell.x][selectedCell.y];
    this.images = this.smallImages;
  }
};
