// ============================================
// 全局类型定义
// ============================================

// 公告类型
export interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'water' | 'electric' | 'market' | 'flood';
  publishTime: string;
  publisher: string;
  isTop?: boolean;
}

// 办事类型
export type ServiceCategory = 'certificate' | 'road' | 'environment' | 'assistance';

export interface ServiceRecord {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  submitTime: string;
  updateTime: string;
  location?: string;
  images?: string[];
  progressList?: ServiceProgress[];
}

export interface ServiceProgress {
  time: string;
  status: string;
  description: string;
}

// 投票议题
export interface VoteTopic {
  id: string;
  title: string;
  description: string;
  options: VoteOption[];
  deadline: string;
  totalVotes: number;
  hasVoted: boolean;
  myVote?: string;
}

export interface VoteOption {
  id: string;
  label: string;
  count: number;
}

// 志愿服务
export interface VolunteerActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  location: string;
  maxPeople: number;
  currentPeople: number;
  hasSigned: boolean;
  points: number;
}

// 互助信息
export type MutualCategory = 'machine' | 'product';

export interface MutualItem {
  id: string;
  category: MutualCategory;
  title: string;
  description: string;
  price?: string;
  contact: string;
  phone: string;
  location: string;
  publishTime: string;
  publisher: string;
  images?: string[];
}

// 积分记录
export interface PointsRecord {
  id: string;
  title: string;
  points: number;
  type: 'earn' | 'spend';
  time: string;
}

// 家庭成员
export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  idCard?: string;
}

// 常用联系人
export interface Contact {
  id: string;
  name: string;
  title: string;
  phone: string;
  department: string;
  avatar?: string;
}

// 用户信息
export interface UserInfo {
  name: string;
  phone: string;
  village: string;
  group: string;
  points: number;
  avatar?: string;
}

// 快捷入口
export interface QuickEntry {
  id: string;
  name: string;
  pagePath?: string;
  action?: string;
  iconBg: string;
  iconColor: string;
  letter: string;
}
