var React = require('react');
var ClientActions = require('../actions/client_actions');
var LikeButton = require('./like_button');

var ModalForm = React.createClass({
  getInitialState: function() {
    return {formText: ""};
  },

  onFormTextChange: function(e) {
    this.setState({formText: e.target.value});
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
        <LikeButton picture={this.props.picture}/>
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
