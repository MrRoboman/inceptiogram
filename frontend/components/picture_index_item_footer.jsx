var React = require('react');
var Link = require('react-router').Link;
var ClientActions = require('../actions/client_actions');

var PictureIndexItemFooter = React.createClass({

  getInitialState: function() {
    return {formText: ""};
  },

  onFormTextChange: function(e) {
    this.setState({formText: e.target.value});
  },

  clickLikeButton: function(e) {
    e.preventDefault();
    ClientActions.createLike(this.props.picture.id);
  },

  onSubmit: function(e) {
    e.preventDefault();
    ClientActions.createComment({pictureId: this.props.picture.id,
                                 body: this.state.formText});
    this.setState({formText: ""});
  },

  likeString: function(){
    var len = this.props.picture.likes.length;
    var likes = this.props.picture.likes.map(function(like, idx){
      if(idx === len - 1){
        return <span key={like.id}><Link to={"profile/"+like.user.id}>{like.user.username}</Link></span>;
      }else {
        return <span key={like.id}><Link to={"profile/"+like.user.id}>{like.user.username}</Link>, </span>;
      }
    });
    return <span>{likes} like this</span>;
  },

  render: function() {
    var liking = this.props.picture.liking ? "unlike" : "like";
    var comments = this.props.picture.comments.map(function(comment){
      return (<li key={comment.id}>
                <Link to={"profile/"+comment.author.id}>{comment.author.username}</Link>
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
            <button onClick={this.clickLikeButton}>{liking}</button>
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
