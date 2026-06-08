import { create } from 'zustand';
import { UserInfo, FamilyMember, Contact, ServiceRecord, PointsRecord } from '@/types';

interface AppState {
  userInfo: UserInfo;
  familyMembers: FamilyMember[];
  contacts: Contact[];
  serviceRecords: ServiceRecord[];
  pointsRecords: PointsRecord[];

  setUserInfo: (info: Partial<UserInfo>) => void;
  addFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
  updateFamilyMember: (id: string, member: Partial<FamilyMember>) => void;
  addContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
  addServiceRecord: (record: ServiceRecord) => void;
  addPointsRecord: (record: PointsRecord) => void;
}

const initialUserInfo: UserInfo = {
  name: '张大山',
  phone: '138****5678',
  village: '幸福村',
  group: '第三村民小组',
  points: 1280,
};

const initialFamilyMembers: FamilyMember[] = [
  { id: '1', name: '张大山', relation: '本人', phone: '138****5678', idCard: '320***********1234' },
  { id: '2', name: '李秀兰', relation: '配偶', phone: '139****8765', idCard: '320***********5678' },
  { id: '3', name: '张小明', relation: '子女', phone: '137****4321', idCard: '320***********9012' },
];

const initialContacts: Contact[] = [
  { id: '1', name: '王村长', title: '村主任', phone: '135****1111', department: '村委会' },
  { id: '2', name: '李书记', title: '村支书', phone: '136****2222', department: '村党委' },
  { id: '3', name: '赵医生', title: '村医', phone: '137****3333', department: '村卫生室' },
];

const initialServiceRecords: ServiceRecord[] = [
  {
    id: '1',
    category: 'certificate',
    title: '贫困证明申请',
    description: '申请家庭贫困证明用于子女学费减免',
    status: 'completed',
    submitTime: '2026-05-20 09:30',
    updateTime: '2026-05-22 14:00',
    progressList: [
      { time: '2026-05-20 09:30', status: '已提交', description: '申请已提交，等待审核' },
      { time: '2026-05-21 10:15', status: '审核中', description: '村委会正在审核材料' },
      { time: '2026-05-22 14:00', status: '已完成', description: '证明已开具，请至村委会领取' },
    ],
  },
  {
    id: '2',
    category: 'road',
    title: '村口道路损坏报修',
    description: '村口向东50米路面有坑洼，影响通行',
    status: 'processing',
    submitTime: '2026-06-05 16:20',
    updateTime: '2026-06-07 10:00',
    location: '幸福村村口向东50米',
    progressList: [
      { time: '2026-06-05 16:20', status: '已提交', description: '报修已提交' },
      { time: '2026-06-07 10:00', status: '处理中', description: '已安排施工队现场查看' },
    ],
  },
];

const initialPointsRecords: PointsRecord[] = [
  { id: '1', title: '志愿服务：环境清扫', points: 50, type: 'earn', time: '2026-06-01' },
  { id: '2', title: '积分兑换：洗衣液', points: -200, type: 'spend', time: '2026-05-28' },
  { id: '3', title: '村务投票参与', points: 20, type: 'earn', time: '2026-05-25' },
  { id: '4', title: '志愿服务：助老活动', points: 80, type: 'earn', time: '2026-05-20' },
  { id: '5', title: '积分兑换：大米10斤', points: -300, type: 'spend', time: '2026-05-15' },
];

export const useAppStore = create<AppState>((set) => ({
  userInfo: initialUserInfo,
  familyMembers: initialFamilyMembers,
  contacts: initialContacts,
  serviceRecords: initialServiceRecords,
  pointsRecords: initialPointsRecords,

  setUserInfo: (info) =>
    set((state) => ({ userInfo: { ...state.userInfo, ...info } })),

  addFamilyMember: (member) =>
    set((state) => ({ familyMembers: [...state.familyMembers, member] })),

  removeFamilyMember: (id) =>
    set((state) => ({
      familyMembers: state.familyMembers.filter((m) => m.id !== id),
    })),

  updateFamilyMember: (id, member) =>
    set((state) => ({
      familyMembers: state.familyMembers.map((m) =>
        m.id === id ? { ...m, ...member } : m
      ),
    })),

  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),

  removeContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    })),

  addServiceRecord: (record) =>
    set((state) => ({ serviceRecords: [record, ...state.serviceRecords] })),

  addPointsRecord: (record) =>
    set((state) => ({
      pointsRecords: [record, ...state.pointsRecords],
      userInfo: {
        ...state.userInfo,
        points: state.userInfo.points + record.points,
      },
    })),
}));
