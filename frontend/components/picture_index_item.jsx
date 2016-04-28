var React = require('react');
var pictureStore = require('../stores/picture_store');

var PictureIndexItem = React.createClass({
  // getInitialState: function() {
  //   return {};
  // },

  // componentDidMount: function() {
  //   this.listener = pictureStore.addListener(this.onChange);
  // },
  //
  // componentWillUnmount: function() {
  //   this.listener.remove();
  // },
  //
  // onChange: function() {
  //
  // },

  render: function() {
    return (
      <div>
        <img src={this.props.picture.url}/>
      </div>
    );
  }
});

module.exports = PictureIndexItem;
