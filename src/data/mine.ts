interface MenuItem {
  id: string;
  name: string;
  pagePath: string;
  iconBg: string;
  iconColor: string;
  letter: string;
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: '我的办事',
    pagePath: '/pages/services/index',
    iconBg: '#E8F7EF',
    iconColor: '#2BA471',
    letter: '办',
  },
  {
    id: '2',
    name: '积分记录',
    pagePath: '/pages/points/index',
    iconBg: '#FFF3E0',
    iconColor: '#FF8A00',
    letter: '积',
  },
  {
    id: '3',
    name: '家庭成员',
    pagePath: '/pages/family/index',
    iconBg: '#E8F3FF',
    iconColor: '#165DFF',
    letter: '家',
  },
  {
    id: '4',
    name: '常用联系人',
    pagePath: '/pages/contacts/index',
    iconBg: '#FFECE8',
    iconColor: '#F53F3F',
    letter: '联',
  },
];

export const pointsExchangeList = [
  { id: '1', name: '洗衣液（1kg）', points: 200, stock: 50 },
  { id: '2', name: '大米（10斤）', points: 300, stock: 30 },
  { id: '3', name: '食用油（5L）', points: 500, stock: 20 },
  { id: '4', name: '卫生纸（10卷）', points: 150, stock: 80 },
  { id: '5', name: '洗洁精', points: 100, stock: 60 },
];
