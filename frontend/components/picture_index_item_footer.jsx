var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;
var ClientActions = require('../actions/client_actions');
var LikeButton = require('./like_button');

var PictureIndexItemFooter = React.createClass({

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

  likeString: function(){
    var len = this.props.picture.likes.length;
    var likePhrase = "like";
    var and = "";

    if(len === 0) {
      return <span></span>;
    } else if (len === 1) {
      likePhrase = "likes";
    } else {
      and = "and ";
    }

    var likes = this.props.picture.likes.map(function(like, idx){
      if(idx === len - 1){
        return <span key={like.id}>{and}{linkToProfile(like.user)}</span>;
      }else {
        return <span key={like.id}>{linkToProfile(like.user)}, </span>;
      }
    });
    return <span>{likes} {likePhrase} this</span>;
  },

  render: function() {
    var liking = this.props.picture.liking ? "unlike" : "like";
    var comments = this.props.picture.comments.map(function(comment){
      return (<li key={comment.id}>
                {linkToProfile(comment.author)}
                {" " + comment.body}
              </li>
             );
    });
    return (
      <div className="footer">

        <span>{this.likeString()}</span>

        <ul className="comments">
          {comments}
        </ul>

          <div className="comment-form">
            <LikeButton picture={this.props.picture}/>
            <form onSubmit={this.onSubmit}>
              <input className="comment-text-field"
                     type="text"
                     placeholder="Add a comment..."
                     onChange={this.onFormTextChange}
                     value={this.state.formText}/>
            </form>
        </div>
      </div>
    );
  }
});

module.exports = PictureIndexItemFooter;
