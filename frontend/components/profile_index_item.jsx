var React = require('react');
var IndexItemHeader = require('./index_item_header');

var ProfileIndexItem = React.createClass({

  render: function() {

    return (
      <div>
        <IndexItemHeader pic={this.props.user} flwBtn={false} />
        <ul>

        </ul>
      </div>
    );
  }
});

module.exports = ProfileIndexItem;
