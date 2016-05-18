var React = require('react');
var Link = require('react-router').Link;

var Helper = {
  linkToProfile: function(user) {
    return <Link to={"profile/"+user.id}>{user.username}</Link>;
  },
  imgTag: function(publicId, options){
    options = options || {};
    // var optionString = "c_scale,h_640,w_640/";
    var optionString = "c_crop,g_face,h_640,w_640/";
    var className = options.className || "";
    var key = options.key || "";
    if(options.scale) {
      // optionString = "c_scale,h_"+options.scale.height+",w_"+options.scale.width+"/";
      optionString = "c_scale,h_"+options.scale.height+",w_"+options.scale.width+"/";
    }else if(options.circle) {
      optionString = "w_"+options.circle.width+",h_"+options.circle.height+",c_fill,g_face,r_max/";
    }

    var url = "http://res.cloudinary.com/"
            + cloudinary_options.cloud_name
            + "/image/upload/"
            + optionString
            + publicId;
    // return <img key={key} className={className} src={url}/>;
    return <img key={key} className={className} src="/assets/falcon.jpg"/>;
  }
};

module.exports = Helper;
