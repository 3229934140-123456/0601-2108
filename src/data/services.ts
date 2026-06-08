import { ServiceCategory } from '@/types';

export const serviceCategories: {
  key: ServiceCategory;
  name: string;
  description: string;
  iconBg: string;
  iconColor: string;
  letter: string;
}[] = [
  {
    key: 'certificate',
    name: '证明申请',
    description: '贫困证明、户籍证明、土地证明等',
    iconBg: '#E8F7EF',
    iconColor: '#2BA471',
    letter: '证',
  },
  {
    key: 'road',
    name: '道路报修',
    description: '路面损坏、路灯故障、排水堵塞等',
    iconBg: '#FFF3E0',
    iconColor: '#FF8A00',
    letter: '路',
  },
  {
    key: 'environment',
    name: '环境卫生',
    description: '垃圾清运、污水排放、违建投诉等',
    iconBg: '#E8F3FF',
    iconColor: '#165DFF',
    letter: '环',
  },
  {
    key: 'assistance',
    name: '困难帮扶',
    description: '低保申请、临时救助、医疗救助等',
    iconBg: '#FFECE8',
    iconColor: '#F53F3F',
    letter: '帮',
  },
];

export const certificateTypes = [
  '贫困证明',
  '户籍证明',
  '婚姻状况证明',
  '土地承包证明',
  '房屋产权证明',
  '独生子女证明',
  '其他证明',
];
