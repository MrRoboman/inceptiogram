var React = require('react');
var Modal = require('react-modal');
var imgTag = require('../utils/helper').imgTag;
var ProfileStore = require('../stores/profile_store');
var ModalHeader = require('./modal_header');
var PictureIndexItemFooter = require('./picture_index_item_footer');
var ModalComments = require('./modal_comments');

// var IndexItemHeader = require('./index-item-header');

var InceptionModal = React.createClass({
  getInitialState: function() {
    return {modalOpen: this.props.modalOpen, picId: this.props.picId};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({modalOpen: nextProps.modalOpen, picId: nextProps.picId});
  },

  render: function() {
    var pic = {};
    var img = "";
    var deets = "";
    var profile = {};
    var liking = false;
    if(this.state.picId) {
      pic = ProfileStore.getShowProfilePic(this.state.picId);
      img = <img src={pic.url} />;
      profile = {id: pic.owner.id, username: pic.owner.username};
      liking = pic.liking;
    }
    return (
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.props.closeModal}
          style={this.style}>

          <div className="modal-components">
            {img}

            <div className="modal-deets">
              <ModalHeader profile={profile} />
              <ModalComments likes={pic.likes}/>
            </div>
          </div>

        </Modal>
      </div>
    );
  },

  style: {
    content: {
      width: '900',
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
