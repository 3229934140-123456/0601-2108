import { create } from 'zustand';
import Taro from '@tarojs/taro';
import {
  UserInfo,
  FamilyMember,
  Contact,
  ServiceRecord,
  PointsRecord,
  MutualItem,
  VoteTopic,
  VolunteerActivity,
} from '@/types';
import { mutualList as initMutualList } from '@/data/mutual';
import {
  voteTopics as initVoteTopics,
  volunteerActivities as initVolunteerActivities,
} from '@/data/village';

const STORAGE_KEY = 'digital_village_store_v1';

interface AppState {
  userInfo: UserInfo;
  familyMembers: FamilyMember[];
  contacts: Contact[];
  serviceRecords: ServiceRecord[];
  pointsRecords: PointsRecord[];
  mutualList: MutualItem[];
  voteTopics: VoteTopic[];
  volunteerActivities: VolunteerActivity[];

  setUserInfo: (info: Partial<UserInfo>) => void;

  addFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
  updateFamilyMember: (id: string, member: Partial<FamilyMember>) => void;

  addContact: (contact: Contact) => void;
  removeContact: (id: string) => void;

  addServiceRecord: (record: ServiceRecord) => void;

  addPointsRecord: (record: PointsRecord) => void;

  addMutualItem: (item: MutualItem) => void;

  submitVote: (topicId: string, optionId: string) => { success: boolean; message: string };

  signUpVolunteer: (activityId: string) => { success: boolean; message: string; points?: number };
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

interface PersistedState {
  userInfo: UserInfo;
  familyMembers: FamilyMember[];
  contacts: Contact[];
  serviceRecords: ServiceRecord[];
  pointsRecords: PointsRecord[];
  mutualList: MutualItem[];
  voteTopics: VoteTopic[];
  volunteerActivities: VolunteerActivity[];
}

const loadPersistedState = (): Partial<PersistedState> => {
  try {
    const data = Taro.getStorageSync(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data) as PersistedState;
      console.log('[Store] 从本地存储加载数据成功');
      return parsed;
    }
  } catch (err) {
    console.error('[Store] 读取本地存储失败', err);
  }
  return {};
};

const persisted = loadPersistedState();

export const useAppStore = create<AppState>((set, get) => {
  const persist = (state: AppState) => {
    try {
      const data: PersistedState = {
        userInfo: state.userInfo,
        familyMembers: state.familyMembers,
        contacts: state.contacts,
        serviceRecords: state.serviceRecords,
        pointsRecords: state.pointsRecords,
        mutualList: state.mutualList,
        voteTopics: state.voteTopics,
        volunteerActivities: state.volunteerActivities,
      };
      Taro.setStorageSync(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('[Store] 写入本地存储失败', err);
    }
  };

  return {
    userInfo: persisted.userInfo || initialUserInfo,
    familyMembers: persisted.familyMembers || initialFamilyMembers,
    contacts: persisted.contacts || initialContacts,
    serviceRecords: persisted.serviceRecords || initialServiceRecords,
    pointsRecords: persisted.pointsRecords || initialPointsRecords,
    mutualList: persisted.mutualList || initMutualList,
    voteTopics: persisted.voteTopics || initVoteTopics,
    volunteerActivities: persisted.volunteerActivities || initVolunteerActivities,

    setUserInfo: (info) =>
      set((state) => {
        const newState = { ...state, userInfo: { ...state.userInfo, ...info } };
        persist(newState);
        return newState;
      }),

    addFamilyMember: (member) =>
      set((state) => {
        const newState = {
          ...state,
          familyMembers: [...state.familyMembers, member],
        };
        persist(newState);
        console.log('[Store] 新增家庭成员', member);
        return newState;
      }),

    removeFamilyMember: (id) =>
      set((state) => {
        const newState = {
          ...state,
          familyMembers: state.familyMembers.filter((m) => m.id !== id),
        };
        persist(newState);
        console.log('[Store] 删除家庭成员', id);
        return newState;
      }),

    updateFamilyMember: (id, member) =>
      set((state) => {
        const newState = {
          ...state,
          familyMembers: state.familyMembers.map((m) =>
            m.id === id ? { ...m, ...member } : m
          ),
        };
        persist(newState);
        console.log('[Store] 更新家庭成员', id, member);
        return newState;
      }),

    addContact: (contact) =>
      set((state) => {
        const newState = {
          ...state,
          contacts: [...state.contacts, contact],
        };
        persist(newState);
        console.log('[Store] 新增联系人', contact);
        return newState;
      }),

    removeContact: (id) =>
      set((state) => {
        const newState = {
          ...state,
          contacts: state.contacts.filter((c) => c.id !== id),
        };
        persist(newState);
        console.log('[Store] 删除联系人', id);
        return newState;
      }),

    addServiceRecord: (record) =>
      set((state) => {
        const newState = {
          ...state,
          serviceRecords: [record, ...state.serviceRecords],
        };
        persist(newState);
        console.log('[Store] 新增办事记录', record);
        return newState;
      }),

    addPointsRecord: (record) =>
      set((state) => {
        const newState = {
          ...state,
          pointsRecords: [record, ...state.pointsRecords],
          userInfo: {
            ...state.userInfo,
            points: state.userInfo.points + record.points,
          },
        };
        persist(newState);
        console.log('[Store] 新增积分记录', record, '当前积分', newState.userInfo.points);
        return newState;
      }),

    addMutualItem: (item) =>
      set((state) => {
        const newState = {
          ...state,
          mutualList: [item, ...state.mutualList],
        };
        persist(newState);
        console.log('[Store] 新增互助信息', item);
        return newState;
      }),

    submitVote: (topicId, optionId) => {
      const state = get();
      const topic = state.voteTopics.find((t) => t.id === topicId);
      if (!topic) {
        return { success: false, message: '议题不存在' };
      }
      if (topic.hasVoted) {
        return { success: false, message: '您已投过票' };
      }

      set((s) => {
        const newState = {
          ...s,
          voteTopics: s.voteTopics.map((t) => {
            if (t.id !== topicId) return t;
            return {
              ...t,
              hasVoted: true,
              myVote: optionId,
              totalVotes: t.totalVotes + 1,
              options: t.options.map((o) =>
                o.id === optionId ? { ...o, count: o.count + 1 } : o
              ),
            };
          }),
        };
        persist(newState);
        return newState;
      });

      console.log('[Store] 投票成功', topicId, optionId);
      return { success: true, message: '投票成功' };
    },

    signUpVolunteer: (activityId) => {
      const state = get();
      const activity = state.volunteerActivities.find((a) => a.id === activityId);
      if (!activity) {
        return { success: false, message: '活动不存在' };
      }
      if (activity.hasSigned) {
        return { success: false, message: '您已报名该活动' };
      }
      if (activity.currentPeople >= activity.maxPeople) {
        return { success: false, message: '活动名额已满' };
      }

      set((s) => {
        const newState = {
          ...s,
          volunteerActivities: s.volunteerActivities.map((a) =>
            a.id === activityId
              ? { ...a, hasSigned: true, currentPeople: a.currentPeople + 1 }
              : a
          ),
        };
        persist(newState);
        return newState;
      });

      console.log('[Store] 志愿报名成功', activityId);
      return { success: true, message: '报名成功', points: activity.points };
    },
  };
});
