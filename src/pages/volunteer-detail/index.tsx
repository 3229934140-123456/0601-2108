import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';
import { volunteerActivities } from '@/data/village';
import { useAppStore } from '@/store/useAppStore';
import { generateId } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

const VolunteerDetailPage: React.FC = () => {
  const router = useRouter();
  const { addPointsRecord } = useAppStore();
  const [activity, setActivity] = useState(
    volunteerActivities.find((a) => a.id === router.params.id)
  );

  useEffect(() => {
    const found = volunteerActivities.find((a) => a.id === router.params.id);
    setActivity(found);
  }, [router.params.id]);

  if (!activity) {
    return (
      <PageContainer>
        <EmptyState text="活动不存在" icon="💚" />
      </PageContainer>
    );
  }

  const percent = Math.round((activity.currentPeople / activity.maxPeople) * 100);
  const isFull = activity.currentPeople >= activity.maxPeople;

  const handleSign = () => {
    if (activity.hasSigned || isFull) return;

    Taro.showModal({
      title: '确认报名',
      content: `确认报名参加"${activity.title}"？`,
      success: (res) => {
        if (res.confirm) {
          console.log('[VolunteerDetail] 报名成功');
          addPointsRecord({
            id: generateId(),
            title: `志愿服务报名：${activity.title.slice(0, 15)}...`,
            points: activity.points,
            type: 'earn',
            time: new Date().toISOString().slice(0, 10),
          });
          Taro.showToast({
            title: `报名成功 +${activity.points}积分`,
            icon: 'success',
          });
          setTimeout(() => Taro.navigateBack(), 1500);
        }
      },
    });
  };

  return (
    <PageContainer>
      <View className={styles.card}>
        <Text className={styles.title}>{activity.title}</Text>
        <View className={styles.pointsBadge}>
          <Text>参与奖励 +{activity.points} 积分</Text>
        </View>
        <Text className={styles.desc}>{activity.description}</Text>
      </View>

      <View className={styles.card}>
        <View className={styles.infoList}>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>🕐 时间</Text>
            <Text className={styles.infoValue}>{activity.time}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>📍 地点</Text>
            <Text className={styles.infoValue}>{activity.location}</Text>
          </View>
        </View>

        <View className={styles.progress}>
          <View className={styles.progressBar}>
            <View className={styles.progressFill} style={{ width: `${percent}%` }} />
          </View>
          <Text className={styles.progressText}>
            {activity.currentPeople}/{activity.maxPeople} 人已报名
          </Text>
        </View>
      </View>

      <View
        className={classnames(styles.signBtn, (activity.hasSigned || isFull) && styles.signed)}
        onClick={handleSign}
      >
        <Text>
          {activity.hasSigned
            ? '您已报名'
            : isFull
            ? '名额已满'
            : '立即报名'}
        </Text>
      </View>
    </PageContainer>
  );
};

export default VolunteerDetailPage;
