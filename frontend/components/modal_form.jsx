var React = require('react');
var ClientActions = require('../actions/client_actions');
var LikeButton = require('./like_button');
var PictureStore = require('../stores/picture_store');

var ModalForm = React.createClass({
  getInitialState: function() {
    return {formText: "", picture: this.props.picture};
  },

  onFormTextChange: function(e) {
    this.setState({formText: e.target.value});
  },

  componentDidMount: function() {
    this.listener = PictureStore.addListener(this.onChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    this.setState({picture: PictureStore.getSinglePicture()});
  },

  onSubmit: function(e) {
    e.preventDefault();
    ClientActions.createComment({pictureId: this.props.picture.id,
                                 body: this.state.formText});
    this.setState({formText: ""});
  },

  render: function() {
    return (
      <div className="modal-form">
        <LikeButton picture={this.state.picture}/>
        <form onSubmit={this.onSubmit}>
          <input className="comment-text-field"
                 type="text"
                 placeholder="Add a comment..."
                 onChange={this.onFormTextChange}
                 value={this.state.formText}/>
        </form>
      </div>
    );
  }
});

module.exports = ModalForm;
