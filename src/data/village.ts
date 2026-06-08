import { VoteTopic, VolunteerActivity } from '@/types';

export const voteTopics: VoteTopic[] = [
  {
    id: '1',
    title: '关于村文化活动中心建设方案的投票',
    description:
      '为丰富村民文化生活，村委会拟新建村文化活动中心，现对两个建设方案进行投票表决：\n方案A：原址翻修，预算80万元，工期3个月\n方案B：异地新建，预算150万元，工期6个月，面积更大',
    options: [
      { id: 'opt1', label: '方案A：原址翻修', count: 128 },
      { id: 'opt2', label: '方案B：异地新建', count: 96 },
    ],
    deadline: '2026-06-15',
    totalVotes: 224,
    hasVoted: false,
  },
  {
    id: '2',
    title: '村集体土地流转方案投票',
    description:
      '村东片区50亩集体土地拟对外流转发展高效农业，流转期限20年，年租金每亩1200元，每5年递增10%。租金收入按村民人口平均分配。',
    options: [
      { id: 'opt1', label: '同意流转', count: 256 },
      { id: 'opt2', label: '不同意流转', count: 38 },
      { id: 'opt3', label: '需进一步讨论', count: 45 },
    ],
    deadline: '2026-06-20',
    totalVotes: 339,
    hasVoted: true,
    myVote: 'opt1',
  },
  {
    id: '3',
    title: '关于增加村保洁人员的提案投票',
    description:
      '随着村庄面积扩大，现有保洁人员3名已无法满足需求。提案新增保洁人员2名，工资从村集体收入中列支，每人每月2200元。',
    options: [
      { id: 'opt1', label: '同意', count: 189 },
      { id: 'opt2', label: '不同意', count: 67 },
    ],
    deadline: '2026-06-10',
    totalVotes: 256,
    hasVoted: false,
  },
];

export const volunteerActivities: VolunteerActivity[] = [
  {
    id: '1',
    title: '夏季人居环境整治志愿服务',
    description:
      '组织志愿者对全村主要道路、河道沿岸、文化广场等公共区域进行大扫除，清理垃圾、铲除小广告、美化环境。参与即可获得积分奖励。',
    time: '2026-06-15 08:00 - 11:30',
    location: '全村各公共区域',
    maxPeople: 50,
    currentPeople: 28,
    hasSigned: false,
    points: 50,
  },
  {
    id: '2',
    title: '关爱独居老人助老志愿服务',
    description:
      '志愿者分组探望村内独居老人，帮助打扫卫生、代购生活用品、陪老人聊天解闷，传递温暖与关怀。',
    time: '2026-06-18 09:00 - 16:00',
    location: '幸福村各村民小组',
    maxPeople: 30,
    currentPeople: 22,
    hasSigned: true,
    points: 80,
  },
  {
    id: '3',
    title: '暑期儿童防溺水安全教育宣传',
    description:
      '面向村内儿童及家长开展防溺水安全教育宣讲，发放宣传材料，在河道、池塘等危险区域设置警示标识。',
    time: '2026-06-25 14:00 - 17:00',
    location: '村文化活动中心',
    maxPeople: 20,
    currentPeople: 12,
    hasSigned: false,
    points: 60,
  },
  {
    id: '4',
    title: '夏收夏种帮扶志愿服务',
    description:
      '帮助村内劳动力不足的家庭抢收抢种，确保夏粮颗粒归仓、秋粮适时播种。请有劳动能力的村民积极报名。',
    time: '2026-06-28 至 2026-07-05',
    location: '村东、村西片区农田',
    maxPeople: 40,
    currentPeople: 15,
    hasSigned: false,
    points: 100,
  },
];
