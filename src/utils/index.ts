import dayjs from 'dayjs';

export const formatTime = (date: string | Date, format = 'YYYY-MM-DD HH:mm') => {
  return dayjs(date).format(format);
};

export const formatDate = (date: string | Date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const getServiceCategoryName = (category: string): string => {
  const map: Record<string, string> = {
    certificate: '证明申请',
    road: '道路报修',
    environment: '环境卫生',
    assistance: '困难帮扶',
  };
  return map[category] || category;
};

export const getServiceStatusName = (status: string): string => {
  const map: Record<string, string> = {
    pending: '待受理',
    processing: '处理中',
    completed: '已完成',
    rejected: '已驳回',
  };
  return map[status] || status;
};

export const getServiceStatusColor = (status: string): string => {
  const map: Record<string, string> = {
    pending: '#FF7D00',
    processing: '#165DFF',
    completed: '#00B42A',
    rejected: '#F53F3F',
  };
  return map[status] || '#86909C';
};

export const getNoticeTypeName = (type: string): string => {
  const map: Record<string, string> = {
    announcement: '公告',
    water: '停水通知',
    electric: '停电通知',
    market: '集市信息',
    flood: '防汛提醒',
  };
  return map[type] || '通知';
};

export const getNoticeTypeColor = (type: string): string => {
  const map: Record<string, string> = {
    announcement: '#2BA471',
    water: '#165DFF',
    electric: '#FF7D00',
    market: '#8657FF',
    flood: '#F53F3F',
  };
  return map[type] || '#86909C';
};

export const getMutualCategoryName = (category: string): string => {
  return category === 'machine' ? '农机借用' : '农产品供应';
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
