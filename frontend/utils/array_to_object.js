module.exports = function(arr){
  var obj = {};
  arr.forEach(function(item){
    obj[item.id] = item;
  });
  return obj;
};
