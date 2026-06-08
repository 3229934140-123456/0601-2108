import { Notice, QuickEntry } from '@/types';

export const noticeList: Notice[] = [
  {
    id: '1',
    title: '关于开展2026年度农村医保缴费的通知',
    content:
      '各位村民：2026年度农村合作医疗保险缴费工作已开始，请于6月30日前完成缴费。缴费标准为每人每年380元。可通过微信、支付宝或到村委会现金缴费。如有疑问请咨询王会计：135****1234。',
    type: 'announcement',
    publishTime: '2026-06-08 09:00',
    publisher: '村委会',
    isTop: true,
  },
  {
    id: '2',
    title: '【紧急】6月10日全村停水通知',
    content:
      '因自来水管道检修，定于6月10日（周三）上午8:00至下午18:00全村停水。请各位村民提前做好储水准备。给您带来不便，敬请谅解。',
    type: 'water',
    publishTime: '2026-06-08 14:30',
    publisher: '自来水站',
  },
  {
    id: '3',
    title: '6月12日东片区临时停电通知',
    content:
      '为配合电网升级改造，6月12日（周五）上午7:00至下午16:00村东片区停电。涉及范围：1-5组。请相关村民提前做好准备。',
    type: 'electric',
    publishTime: '2026-06-07 10:15',
    publisher: '供电所',
  },
  {
    id: '4',
    title: '幸福村大集每月逢五逢十开集',
    content:
      '幸福村大集定于每月农历初五、初十、十五、二十、二十五、三十开集，欢迎广大村民和周边商户前来赶集！地点：村中心文化广场。经营品类：蔬菜水果、日用百货、服装鞋帽、农资农具等。',
    type: 'market',
    publishTime: '2026-06-06 08:00',
    publisher: '村集体经济合作社',
  },
  {
    id: '5',
    title: '【防汛预警】近期强降雨天气提醒',
    content:
      '据气象部门预报，未来三天我地将迎来强降雨过程，累计降雨量可达80-120毫米。请各位村民注意防范：1.远离河道、低洼地带；2.检查房屋防雨排水；3.储备必要生活物资；4.遇紧急情况及时拨打村应急电话：135****9999。',
    type: 'flood',
    publishTime: '2026-06-09 07:00',
    publisher: '村应急办',
    isTop: true,
  },
  {
    id: '6',
    title: '关于开展夏季人居环境整治的通知',
    content:
      '为进一步改善村容村貌，村委会决定于6月15日组织全村人居环境整治活动。请各户清理房前屋后杂物，保持环境卫生整洁。积极参与的村民将获得积分奖励。',
    type: 'announcement',
    publishTime: '2026-06-05 15:00',
    publisher: '村委会',
  },
];

export const quickEntries: QuickEntry[] = [
  { id: '1', name: '证明申请', action: 'certificate', iconBg: '#E8F7EF', iconColor: '#2BA471', letter: '证' },
  { id: '2', name: '道路报修', action: 'road', iconBg: '#FFF3E0', iconColor: '#FF8A00', letter: '路' },
  { id: '3', name: '环境卫生', action: 'environment', iconBg: '#E8F3FF', iconColor: '#165DFF', letter: '环' },
  { id: '4', name: '困难帮扶', action: 'assistance', iconBg: '#FFECE8', iconColor: '#F53F3F', letter: '帮' },
  { id: '5', name: '村民投票', pagePath: '/pages/village/index', iconBg: '#F0EAFF', iconColor: '#8657FF', letter: '投' },
  { id: '6', name: '志愿服务', pagePath: '/pages/village/index', iconBg: '#FFF8E0', iconColor: '#F7BA1E', letter: '志' },
  { id: '7', name: '农机借用', pagePath: '/pages/mutual/index', iconBg: '#E6F7FF', iconColor: '#14C9C9', letter: '农' },
  { id: '8', name: '更多服务', pagePath: '/pages/services/index', iconBg: '#F2F3F5', iconColor: '#4E5969', letter: '+' },
];

export const weatherInfo = {
  temperature: '28°C',
  weather: '多云转小雨',
  humidity: '75%',
  wind: '东南风3级',
  warning: '暴雨蓝色预警',
};
