import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';
import StatusTag from '@/components/StatusTag';
import { mutualList } from '@/data/mutual';
import { getMutualCategoryName } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

const MutualPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'machine' | 'product'>('all');
  const [list, setList] = useState(mutualList);

  const filteredList =
    activeTab === 'all' ? list : list.filter((item) => item.category === activeTab);

  const handlePublish = () => {
    Taro.navigateTo({ url: '/pages/mutual-publish/index' });
  };

  const handleItemClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/mutual-detail/index?id=${id}` });
  };

  return (
    <PageContainer padding={false}>
      <View className={styles.header}>
        <Text className={styles.headerText}>邻里互助 · 共建共享</Text>
        <View className={styles.publishBtn} onClick={handlePublish}>
          <Text>+ 发布信息</Text>
        </View>
      </View>

      <View className={styles.tabs}>
        <View
          className={classnames(styles.tabItem, activeTab === 'all' && styles.tabActive)}
          onClick={() => setActiveTab('all')}
        >
          <Text>全部</Text>
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'machine' && styles.tabActive)}
          onClick={() => setActiveTab('machine')}
        >
          <Text>农机借用</Text>
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'product' && styles.tabActive)}
          onClick={() => setActiveTab('product')}
        >
          <Text>农产品</Text>
        </View>
      </View>

      <View style={{ padding: '0 32rpx' }}>
        {filteredList.length === 0 ? (
          <EmptyState text="暂无相关信息" icon="🤝" />
        ) : (
          filteredList.map((item) => (
            <View
              key={item.id}
              className={styles.mutualCard}
              onClick={() => handleItemClick(item.id)}
            >
              <View className={styles.mutualHeader}>
                <Text className={styles.mutualTitle}>{item.title}</Text>
                <StatusTag
                  text={getMutualCategoryName(item.category)}
                  color={item.category === 'machine' ? '#14C9C9' : '#FF8A00'}
                  bgColor={item.category === 'machine' ? '#E6FAFA' : '#FFF3E0'}
                />
              </View>
              <Text className={styles.mutualDesc}>{item.description}</Text>
              {item.price && <Text className={styles.mutualPrice}>{item.price}</Text>}
              <View className={styles.mutualMeta}>
                <View className={styles.mutualMetaItem}>
                  <Text>📍</Text>
                  <Text>{item.location}</Text>
                </View>
                <View className={styles.mutualMetaItem}>
                  <Text>👤</Text>
                  <Text>{item.publisher} · {item.phone}</Text>
                </View>
                <View className={styles.mutualMetaItem}>
                  <Text>🕐</Text>
                  <Text>{item.publishTime}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>
    </PageContainer>
  );
};

export default MutualPage;
