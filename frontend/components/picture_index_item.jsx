var React = require('react');
var pictureStore = require('../stores/picture_store');
var PictureIndexItemHeader = require('./picture_index_item_header');

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
        <PictureIndexItemHeader username={this.props.picture.owner} />
        <img src={this.props.picture.url}/>
      </div>
    );
  }
});

module.exports = PictureIndexItem;
