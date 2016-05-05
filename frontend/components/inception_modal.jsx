var React = require('react');
var Modal = require('react-modal');
var imgTag = require('../utils/helper').imgTag;
var ProfileStore = require('../stores/profile_store');
var Inception = require('../utils/inception');

// var IndexItemHeader = require('./index-item-header');

var InceptionModal = React.createClass({
  getInitialState: function() {
    return {modalOpen: this.props.modalOpen, picId: this.props.picId};
  },

  componentDidMount: function() {
    this.inception = new Inception();
  },

  componentWillReceiveProps: function(nextProps) {
    if(!nextProps.modalOpen){
      this.inception.unloadCanvas();
    }
    this.setState({modalOpen: nextProps.modalOpen, picId: nextProps.picId});
  },

  render: function() {
    var img = "";
    // if(this.state.picId) {
    //   img = <img src={ProfileStore.getShowProfilePic(this.state.picId).url} />;
    // }
    if(this.state.picId){
      this.inception.loadGridImages(this.props.picUrl);
    }

    return (
      <div id='modal-container'>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.props.closeModal}
          style={this.style}>

          <div className="modal-image" ref="canvas">
            <canvas id="canvas"></canvas>
          </div>

        </Modal>

      </div>
    );
  },

  style: {
    content: {
      width: '1000',
      height: '640',
      padding: '0',
      margin: '100px auto',
      position: 'absolute',
      overflow: 'hidden'

    }
  }
});

module.exports = InceptionModal;

// {imgTag('qdoiqtyte3olcbv4sutm')}
