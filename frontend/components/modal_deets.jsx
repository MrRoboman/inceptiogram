var React = require('react');
var IndexItemHeader = require('./index_item_header');

var ModalDeets = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {

    var username = "";
    if(this.props.owner){
      username = this.props.owner.username;
    }

    return (
      <div className="modal-deets">
        {username}
      </div>
    );
  }
});

module.exports = ModalDeets;
