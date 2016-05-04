var React = require('react');
var PictureStore = require('../stores/picture_store');
var Inception = require('../utils/inception');

var Inceptioview = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    this.listener = PictureStore.addListener(this.onChange);
    var canvas = document.getElementById("inception-view");
    window.inc = new Inception(canvas);
    this.inception = window.inc;
    var url = 'http://res.cloudinary.com/dxhizunmp/image/upload/v1462137423/ngzfw7gc6w14woppphva.jpg';

    window.inc.loadGridImages(url);
    // window.inc.loadImage(url);

    window.onresize = function() {
      window.inc.resize();
    };
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {

  },

  onCanvasClick: function(e) {
    this.inception.click(e.clientX, e.clientY);
  },

  render: function() {
    return (
      <div>
        <canvas id="inception-view" onClick={this.onCanvasClick}></canvas>
      </div>
    );
  }
});

module.exports = Inceptioview;
