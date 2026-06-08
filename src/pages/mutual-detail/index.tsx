import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import StatusTag from '@/components/StatusTag';
import EmptyState from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import { getMutualCategoryName } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

const MutualDetailPage: React.FC = () => {
  const router = useRouter();
  const mutualList = useAppStore((s) => s.mutualList);
  const item = mutualList.find((m) => m.id === router.params.id);

  if (!item) {
    return (
      <PageContainer>
        <EmptyState text="信息不存在" icon="🤝" />
      </PageContainer>
    );
  }

  const handleCall = () => {
    if (item.phone) {
      Taro.makePhoneCall({
        phoneNumber: item.phone.replace(/\*/g, '0'),
      }).catch((err) => console.error('[MutualDetail] 拨打电话失败', err));
    }
  };

  const handleContact = () => {
    Taro.setClipboardData({
      data: item.phone,
      success: () => Taro.showToast({ title: '联系方式已复制', icon: 'success' }),
    });
  };

  return (
    <PageContainer>
      <View className={styles.card}>
        <Text className={styles.title}>{item.title}</Text>
        <StatusTag
          text={getMutualCategoryName(item.category)}
          color={item.category === 'machine' ? '#14C9C9' : '#FF8A00'}
          bgColor={item.category === 'machine' ? '#E6FAFA' : '#FFF3E0'}
        />
        {item.price && <Text className={styles.price}>{item.price}</Text>}
        <Text className={styles.desc}>{item.description}</Text>
      </View>

      <View className={styles.card} style={{ marginBottom: '200rpx' }}>
        <View className={styles.infoRow}>
          <Text className={styles.infoLabel}>👤 发布人</Text>
          <Text className={styles.infoValue}>{item.publisher}</Text>
        </View>
        <View className={styles.infoRow}>
          <Text className={styles.infoLabel}>📞 联系电话</Text>
          <Text className={styles.infoValue}>{item.phone}</Text>
        </View>
        <View className={styles.infoRow}>
          <Text className={styles.infoLabel}>📍 所在位置</Text>
          <Text className={styles.infoValue}>{item.location}</Text>
        </View>
        <View className={styles.infoRow}>
          <Text className={styles.infoLabel}>🕐 发布时间</Text>
          <Text className={styles.infoValue}>{item.publishTime}</Text>
        </View>
      </View>

      <View className={styles.footer}>
        <View
          className={classnames(styles.btn, styles.btnSecondary)}
          onClick={handleContact}
        >
          <Text>复制联系方式</Text>
        </View>
        <View
          className={classnames(styles.btn, styles.btnPrimary)}
          onClick={handleCall}
        >
          <Text>拨打电话</Text>
        </View>
      </View>
    </PageContainer>
  );
};

export default MutualDetailPage;
