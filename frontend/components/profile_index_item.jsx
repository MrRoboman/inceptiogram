var React = require('react');
var IndexItemHeader = require('./index_item_header');
var imgTag = require('../utils/helper').imgTag;

var ProfileIndexItem = React.createClass({

  render: function() {
    var pictures = this.props.profile.pictures;
    var pics = [];
    for(var i = 0; i < 3 && i < pictures.length; i++){
      pics.push(imgTag(pictures[i].public_id, {
                          key: pictures[i].id,
                          className: "picture-preview"
                      }));
    }
    
    return (
      <div className="profile-index-item">
        <IndexItemHeader user={this.props.profile} showFlwBtn={true}/>
          <ul className="profile-index-item-pics">
            {pics}
          </ul>
      </div>
    );
  }
});

module.exports = ProfileIndexItem;
