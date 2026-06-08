import React, { useState } from 'react';
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
import styles from './index.module.scss';
import classnames from 'classnames';

const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'record'>('apply');
  const { serviceRecords } = useAppStore();

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
            <SectionTitle title="办事记录" />
            {serviceRecords.length === 0 ? (
              <EmptyState text="暂无办事记录" icon="📋" />
            ) : (
              serviceRecords.map((record) => (
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
