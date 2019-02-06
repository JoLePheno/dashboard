module.exports = {
  listService: [
    'Media',
    'Weather',
    "Clock"
  ],
  listMedia: [
    'media',
    'movie'
  ],
  listClock: [
    'clock'
  ],
  listWeather: [
    'weather'
  ],
  listMediaApi: [
    'google-news-fr',
    'le-monde',
    'abc-news'
  ],
  listMediaMovie: [
    'popular',
    'upcoming',
    'top_rated'
  ],
  itemList: [
    {"icon":"home","service":"Home"},
    {"service":"Weather","icon":"cloud"},
    {"service":"Media","icon":"content_copy"},
    {"service": "Clock", "icon":"notification_important"}
  ],
  getSizeW(type) {
      if (type === 'movie')
        return 3;
      if (type === 'weather')
        return 6;
      if (type === 'clock')
        return 5;
    return 4
  },
  getSizeH(type) {
      if (type === 'weather')
        return 7;
      else if (type === 'movie')
        return 13;
      else if (type === 'clock')
        return 5;
    return 15
  }
}
