var React = require('react');
var Modal = require('react-modal');
var ProfileStore = require('../stores/profile_store');
var PictureStore = require('../stores/picture_store');
var IndexItemHeader = require('./index_item_header');
var IndexItemFooter = require('./index_item_footer');
var imgTag = require('../utils/helper').imgTag;


var PictureModal = React.createClass({
  getInitialState: function() {
    return {modalOpen: this.props.modalOpen,
      picture: ProfileStore.getSingleProfilePic(this.props.picId)};
  },

  onPictureChange: function() {
    this.setState({picture: PictureStore.getPicture(this.props.picId)});
  },

  componentDidMount: function() {
    this.pictureListener = PictureStore.addListener(this.onPictureChange);
  },

  componentWillUnmount: function() {
    this.pictureListener.remove();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({modalOpen: nextProps.modalOpen,
      pic: ProfileStore.getSingleProfilePic(nextProps.picId)});
  },

  render: function() {
    var pic = {};
    var img = "";
    var deets = "";
    var profile = {};
    var liking = false;
    if(this.state.modalOpen) {
      pic = this.state.picture;
      img = imgTag(pic.public_id, {scale: {width: 640, height: 640}});
      profile = {id: pic.owner.id, username: pic.owner.username, picture_public_id: pic.owner.picture_public_id};
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
              <IndexItemHeader user={profile} />
              <IndexItemFooter picture={pic} />
            </div>

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

module.exports = PictureModal;

// {imgTag('qdoiqtyte3olcbv4sutm')}
