var React = require('react');
var Modal = require('react-modal');
var imgTag = require('../utils/helper').imgTag;

// var IndexItemHeader = require('./index-item-header');

var InceptionModal = React.createClass({
  getInitialState: function() {
    return {modalOpen: this.props.modalOpen, picId: this.props.picId};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({modalOpen: nextProps.modalOpen, picId: nextProps.picId});
  },

  render: function() {
    console.log(this.state.picId);
    return (
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.props.closeModal}
          style={this.style}>

          <div className="modal-image">
            {imgTag('qdoiqtyte3olcbv4sutm')}
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
