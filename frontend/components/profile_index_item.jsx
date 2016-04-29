var React = require('react');
var IndexItemHeader = require('./index_item_header');

var ProfileIndexItem = React.createClass({

  render: function() {
    var pictures = this.props.profile.pictures;
    var pics = [];
    for(var i = 0; i < 3 && i < pictures.length; i++){
      pics.push(<img key={pictures[i].id}
                     className="picture-preview"
                     src={pictures[i].url}/>);
    }
    return (
      <div className="profile-index-item">
        <IndexItemHeader profile={this.props.profile} showFlwBtn={true}/>
        <div className="profile-index-item-pics">
          <ul>
            {pics}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = ProfileIndexItem;
