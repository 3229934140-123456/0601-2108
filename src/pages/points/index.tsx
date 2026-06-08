import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import { pointsExchangeList } from '@/data/mine';
import { generateId } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

const PointsPage: React.FC = () => {
  const { userInfo, pointsRecords, addPointsRecord } = useAppStore();
  const [activeTab, setActiveTab] = useState<'record' | 'exchange'>('record');

  const earnRecords = pointsRecords.filter((r) => r.type === 'earn');
  const spendRecords = pointsRecords.filter((r) => r.type === 'spend');

  const handleExchange = (item: (typeof pointsExchangeList)[0]) => {
    if (userInfo.points < item.points) {
      Taro.showToast({ title: '积分不足', icon: 'none' });
      return;
    }

    Taro.showModal({
      title: '确认兑换',
      content: `确定使用 ${item.points} 积分兑换"${item.name}"？`,
      success: (res) => {
        if (res.confirm) {
          addPointsRecord({
            id: generateId(),
            title: `积分兑换：${item.name}`,
            points: -item.points,
            type: 'spend',
            time: new Date().toISOString().slice(0, 10),
          });
          console.log('[Points] 兑换成功', item);
          Taro.showToast({ title: '兑换成功', icon: 'success' });
        }
      },
    });
  };

  return (
    <PageContainer padding={false}>
      <View className={styles.header}>
        <Text className={styles.pointsValue}>{userInfo.points}</Text>
        <Text className={styles.pointsLabel}>我的积分</Text>
      </View>

      <View className={styles.tabs}>
        <View
          className={classnames(styles.tabItem, activeTab === 'record' && styles.tabActive)}
          onClick={() => setActiveTab('record')}
        >
          <Text>积分记录</Text>
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'exchange' && styles.tabActive)}
          onClick={() => setActiveTab('exchange')}
        >
          <Text>积分兑换</Text>
        </View>
      </View>

      <View style={{ padding: '0 32rpx' }}>
        {activeTab === 'record' ? (
          pointsRecords.length === 0 ? (
            <EmptyState text="暂无积分记录" icon="💰" />
          ) : (
            pointsRecords.map((record) => (
              <View key={record.id} className={styles.recordItem}>
                <View className={styles.recordLeft}>
                  <Text className={styles.recordTitle}>{record.title}</Text>
                  <Text className={styles.recordTime}>{record.time}</Text>
                </View>
                <Text
                  className={classnames(
                    styles.recordPoints,
                    record.type === 'earn' ? styles.earn : styles.spend
                  )}
                >
                  {record.type === 'earn' ? '+' : ''}
                  {record.points}
                </Text>
              </View>
            ))
          )
        ) : (
          <View className={styles.exchangeGrid}>
            {pointsExchangeList.map((item) => (
              <View key={item.id} className={styles.exchangeCard}>
                <Text className={styles.exchangeIcon}>🎁</Text>
                <Text className={styles.exchangeName}>{item.name}</Text>
                <Text className={styles.exchangePoints}>{item.points} 积分</Text>
                <Text className={styles.exchangeStock}>库存：{item.stock}</Text>
                <View
                  className={styles.exchangeBtn}
                  onClick={() => handleExchange(item)}
                >
                  <Text>立即兑换</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </PageContainer>
  );
};

export default PointsPage;
