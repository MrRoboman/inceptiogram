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
    this.setState({modalOpen: nextProps.modalOpen, picId: nextProps.picId});
  },

  render: function() {
    var img = "";
    if(this.state.picId) {
      img = <img src={ProfileStore.getShowProfilePic(this.state.picId).url} />;
    }
    if(this.state.picId){
      img = <canvas className="canvas"></canvas>;
      this.inception.loadGridImages('http://res.cloudinary.com/dxhizunmp/image/upload/v1462384608/zgotfkct0u49dr2bvdad.png');
    }

    return (
      <div>

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
