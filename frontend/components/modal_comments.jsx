var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;

var ModalComments = React.createClass({
  getInitialState: function() {
    return {};
  },

  likeString: function(){
    var len = this.props.likes.length;
    var likePhrase = "like";
    var and = "";

    if(len === 0) {
      return <span></span>;
    } else if (len === 1) {
      likePhrase = "likes";
    } else {
      and = "and ";
    }

    var likes = this.props.likes.map(function(like, idx){
      if(idx === len - 1){
        return <span key={like.id}>{and}{linkToProfile(like.user)}</span>;
      }else {
        return <span key={like.id}>{linkToProfile(like.user)}, </span>;
      }
    });

    return <span>{likes} {likePhrase} this</span>;
  },

  render: function() {
    return (
      <div className="modal-comments">
        <span>{this.likeString()}</span>
      </div>
    );
  }
});

module.exports = ModalComments;
