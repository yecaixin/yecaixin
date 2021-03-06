Page({
  data: {
    city: '',
    complete:'kaishi'
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({ city: options.id})
    this.loadInfo();
  },
  loadInfo: function () {
    var page = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        // success  
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      },
      fail: function () {
        // fail  
      },
      complete: function () {
        // complete  
      }
    })
  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=RBL088gye5vGMNomZ3LbSSHMzGh8nDRE&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        console.log(res);
        var city = res.data.result.addressComponent.city;
        page.setData({ city: city });
      },
      fail: function () {
        // fail  
        console.log('fail');
        
      },
      complete: function () {
        // complete  
        console.log('complete');
        var complete = '完成了！！！';
        page.setData({ complete: complete });
      }
    })
  }
})