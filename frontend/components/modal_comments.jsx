var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;

var ModalComments = React.createClass({
  getInitialState: function() {
    return {};
  },

  likeString: function(){
    if(this.props.likes === undefined) return <span></span>;
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
    var comments;
    if(this.props.comments){
      comments = this.props.comments.map(function(comment){
        return (<li key={comment.id}>
                  {linkToProfile(comment.author)}
                  {" " + comment.body}
                </li>
               );
      });
    }
    else {
      comments = [];
    }

    return (
      <div className="modal-comments">
        <span className="likes">{this.likeString()}</span>
        <ul className="comments">
          {comments}
        </ul>
      </div>
    );
  }
});

module.exports = ModalComments;
