import React, { useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import StatusTag from '@/components/StatusTag';
import { serviceCategories } from '@/data/services';
import { useAppStore } from '@/store/useAppStore';
import {
  getServiceCategoryName,
  getServiceStatusColor,
  getServiceStatusName,
} from '@/utils';
import { ServiceCategory } from '@/types';
import styles from './index.module.scss';
import classnames from 'classnames';

type StatusFilter = 'all' | 'pending' | 'processing' | 'completed' | 'rejected';
type CategoryFilter = 'all' | ServiceCategory;

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: '全部状态' },
  { value: 'pending', label: '待受理' },
  { value: 'processing', label: '处理中' },
  { value: 'completed', label: '已完成' },
  { value: 'rejected', label: '已驳回' },
];

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: '全部类型' },
  ...serviceCategories.map((c) => ({
    value: c.key as ServiceCategory,
    label: c.name,
  })),
];

const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'record'>('apply');
  const { serviceRecords } = useAppStore();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const filteredRecords = useMemo(() => {
    return serviceRecords.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
      return true;
    });
  }, [serviceRecords, statusFilter, categoryFilter]);

  const handleCategoryClick = (key: string) => {
    Taro.navigateTo({
      url: `/pages/service-apply/index?category=${key}`,
    });
  };

  const handleRecordClick = (id: string) => {
    Taro.navigateTo({
      url: `/pages/service-detail/index?id=${id}`,
    });
  };

  return (
    <PageContainer padding={false}>
      <View className={styles.tabs}>
        <View
          className={classnames(styles.tabItem, activeTab === 'apply' && styles.tabActive)}
          onClick={() => setActiveTab('apply')}
        >
          <Text>办事申请</Text>
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'record' && styles.tabActive)}
          onClick={() => setActiveTab('record')}
        >
          <Text>我的办事 ({serviceRecords.length})</Text>
        </View>
      </View>

      <View style={{ padding: '0 32rpx' }}>
        {activeTab === 'apply' ? (
          <>
            <SectionTitle title="选择办事类型" />
            <View className={styles.categoryGrid}>
              {serviceCategories.map((cat) => (
                <View
                  key={cat.key}
                  className={styles.categoryCard}
                  onClick={() => handleCategoryClick(cat.key)}
                >
                  <View
                    className={styles.categoryIcon}
                    style={{
                      backgroundColor: cat.iconBg,
                      color: cat.iconColor,
                    }}
                  >
                    {cat.letter}
                  </View>
                  <Text className={styles.categoryName}>{cat.name}</Text>
                  <Text className={styles.categoryDesc}>{cat.description}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <SectionTitle title={`办事记录（${filteredRecords.length}/${serviceRecords.length}）`} />

            <View className={styles.filterGroup}>
              <Text className={styles.filterGroupLabel}>按状态筛选</Text>
              <View className={styles.filterRow}>
                {STATUS_OPTIONS.map((opt) => (
                  <View
                    key={opt.value}
                    className={classnames(
                      styles.filterChip,
                      statusFilter === opt.value && styles.filterChipActive
                    )}
                    onClick={() => setStatusFilter(opt.value)}
                  >
                    <Text>{opt.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className={styles.filterGroup}>
              <Text className={styles.filterGroupLabel}>按类型筛选</Text>
              <View className={styles.filterRow}>
                {CATEGORY_OPTIONS.map((opt) => (
                  <View
                    key={opt.value}
                    className={classnames(
                      styles.filterChip,
                      categoryFilter === opt.value && styles.filterChipActive
                    )}
                    onClick={() => setCategoryFilter(opt.value)}
                  >
                    <Text>{opt.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {filteredRecords.length === 0 ? (
              <EmptyState
                text={serviceRecords.length === 0 ? '暂无办事记录' : '筛选条件下没有记录'}
                icon="📋"
              />
            ) : (
              filteredRecords.map((record) => (
                <View
                  key={record.id}
                  className={styles.recordCard}
                  onClick={() => handleRecordClick(record.id)}
                >
                  <View className={styles.recordHeader}>
                    <Text className={styles.recordTitle}>{record.title}</Text>
                    <StatusTag
                      text={getServiceStatusName(record.status)}
                      color={getServiceStatusColor(record.status)}
                      bgColor={getServiceStatusColor(record.status) + '15'}
                    />
                  </View>
                  <Text className={styles.recordDesc}>{record.description}</Text>
                  <View className={styles.recordMeta}>
                    <Text className={styles.recordTime}>
                      {getServiceCategoryName(record.category)} · {record.submitTime}
                    </Text>
                    <Text className={styles.recordAction}>查看详情 ›</Text>
                  </View>
                </View>
              ))
            )}
          </>
        )}
      </View>
    </PageContainer>
  );
};

export default ServicesPage;
