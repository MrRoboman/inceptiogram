var React = require('react');

var PictureIndexItemFooter = React.createClass({
  render: function() {
    var comments = this.props.comments.map(function(comment){
      return (<li key={comment.id}>
                <a href="#">{comment.author} </a>{comment.body}
              </li>
             );
    });
    return (
      <div>
        <h4>Comments</h4>
        <ul>
          {comments}
        </ul>
      </div>
    );
  }
});

module.exports = PictureIndexItemFooter;
