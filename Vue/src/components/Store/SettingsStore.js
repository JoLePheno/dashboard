module.exports = {
  getDesc: function (type) {
    if (type === 'weather')
      return 'Widget used to show current weather';
    else if (type === 'movie')
      return 'Widget show movies using differents categories';
    else if (type === 'media')
      return 'Widget show lasted media from different sources';
  }
};
