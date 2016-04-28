var React = require('react');
var ClientActions = require('../actions/client_actions');

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
    var likes = this.props.picture.likes.map(function(like, idx){
      if(idx === len - 1){
        return <span key={like.id}><a href="#">{like.username}</a></span>;
      }else {
        return <span key={like.id}><a href="#">{like.username}</a>, </span>;
      }
    });
    return <span>{likes} like this</span>;
  },

  render: function() {
    var comments = this.props.picture.comments.map(function(comment){
      return (<li key={comment.id}>
                <a href="#">{comment.author} </a>{comment.body}
              </li>
             );
    });
    return (
      <div>
        <span>{this.likeString()}</span>
        <h4>Comments</h4>
        <ul>
          {comments}
        </ul>
        <form onSubmit={this.onSubmit}>
          <input type="text"
                 placeholder="Add a comment..."
                 onChange={this.onFormTextChange}
                 value={this.state.formText}/>
        </form>
      </div>
    );
  }
});

module.exports = PictureIndexItemFooter;
