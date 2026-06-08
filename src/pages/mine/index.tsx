import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import { useAppStore } from '@/store/useAppStore';
import { menuItems } from '@/data/mine';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const { userInfo, serviceRecords, pointsRecords, familyMembers, contacts } =
    useAppStore();

  const handleMenuClick = (pagePath: string) => {
    if (pagePath.startsWith('/pages/services')) {
      Taro.switchTab({ url: pagePath });
    } else {
      Taro.navigateTo({ url: pagePath });
    }
  };

  const handlePointsClick = () => {
    Taro.navigateTo({ url: '/pages/points/index' });
  };

  const completedCount = serviceRecords.filter(
    (r) => r.status === 'completed'
  ).length;

  const earnedPoints = pointsRecords
    .filter((r) => r.type === 'earn')
    .reduce((sum, r) => sum + r.points, 0);

  return (
    <PageContainer padding={false}>
      <View className={styles.userHeader}>
        <View className={styles.userInfo}>
          <View className={styles.avatar}>👨‍🌾</View>
          <View className={styles.userText}>
            <Text className={styles.userName}>{userInfo.name}</Text>
            <Text className={styles.userVillage}>
              {userInfo.village} · {userInfo.group}
            </Text>
          </View>
        </View>

        <View className={styles.pointsCard}>
          <View className={styles.pointsRow}>
            <Text className={styles.pointsLabel}>我的积分</Text>
            <Text className={styles.pointsValue}>{userInfo.points}</Text>
          </View>
          <View className={styles.pointsRow}>
            <Text className={styles.pointsLabel}>查看积分明细和兑换记录</Text>
            <View className={styles.pointsAction} onClick={handlePointsClick}>
              <Text>去查看 ›</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ padding: '0 32rpx' }}>
        <View className={styles.statsSection}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{serviceRecords.length}</Text>
            <Text className={styles.statLabel}>办事记录</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{completedCount}</Text>
            <Text className={styles.statLabel}>已办结</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{earnedPoints}</Text>
            <Text className={styles.statLabel}>累计获得积分</Text>
          </View>
        </View>

        <View className={styles.menuSection}>
          {menuItems.map((item) => (
            <View
              key={item.id}
              className={styles.menuItem}
              onClick={() => handleMenuClick(item.pagePath)}
            >
              <View
                className={styles.menuIcon}
                style={{
                  backgroundColor: item.iconBg,
                  color: item.iconColor,
                }}
              >
                {item.letter}
              </View>
              <Text className={styles.menuText}>{item.name}</Text>
              {item.id === '1' && (
                <Text className={styles.menuArrow}>{serviceRecords.length} 条 ›</Text>
              )}
              {item.id === '2' && (
                <Text className={styles.menuArrow}>{pointsRecords.length} 条 ›</Text>
              )}
              {item.id === '3' && (
                <Text className={styles.menuArrow}>{familyMembers.length} 人 ›</Text>
              )}
              {item.id === '4' && (
                <Text className={styles.menuArrow}>{contacts.length} 人 ›</Text>
              )}
              {!['1', '2', '3', '4'].includes(item.id) && (
                <Text className={styles.menuArrow}>›</Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </PageContainer>
  );
};

export default MinePage;
