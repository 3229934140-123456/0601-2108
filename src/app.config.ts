export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/services/index',
    'pages/village/index',
    'pages/mutual/index',
    'pages/mine/index',
    'pages/notice-detail/index',
    'pages/service-apply/index',
    'pages/service-detail/index',
    'pages/vote-detail/index',
    'pages/volunteer-detail/index',
    'pages/mutual-detail/index',
    'pages/mutual-publish/index',
    'pages/points/index',
    'pages/family/index',
    'pages/contacts/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#2BA471',
    navigationBarTitleText: '数字乡村',
    navigationBarTextStyle: 'white',
    backgroundColor: '#F6F8F5'
  },
  tabBar: {
    color: '#86909C',
    selectedColor: '#2BA471',
    backgroundColor: '#FFFFFF',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/services/index',
        text: '办事'
      },
      {
        pagePath: 'pages/village/index',
        text: '村务'
      },
      {
        pagePath: 'pages/mutual/index',
        text: '互助'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
