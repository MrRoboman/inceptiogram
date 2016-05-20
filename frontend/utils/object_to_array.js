module.exports = function(obj) {
  var arr = [];
  var keys = Object.keys(obj);
  keys.forEach(function(key){
    arr.push(obj[key]);
  });
  return arr;
};
