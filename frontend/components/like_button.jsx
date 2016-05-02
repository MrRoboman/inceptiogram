var React = require('react');
var ClientActions = require('../actions/client_actions');

var LikeButton = React.createClass({

  clickLikeButton: function(e) {
    e.preventDefault();
    ClientActions.createLike(this.props.picture.id);
  },

  render: function() {
    var className = this.props.picture.liking ? "fa fa-heart fa-2x red" : "fa fa-heart-o fa-2x gray";
    return (
      <div className="like-button">
        <i onClick={this.clickLikeButton} className={className}></i>
      </div>
    );
  }
});

module.exports = LikeButton;
