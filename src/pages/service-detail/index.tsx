import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import StatusTag from '@/components/StatusTag';
import EmptyState from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import {
  getServiceCategoryName,
  getServiceStatusColor,
  getServiceStatusName,
} from '@/utils';
import styles from './index.module.scss';

const ServiceDetailPage: React.FC = () => {
  const router = useRouter();
  const { serviceRecords } = useAppStore();
  const [record, setRecord] = useState(serviceRecords.find((r) => r.id === router.params.id));

  useEffect(() => {
    const found = serviceRecords.find((r) => r.id === router.params.id);
    setRecord(found);
  }, [router.params.id, serviceRecords]);

  if (!record) {
    return (
      <PageContainer>
        <EmptyState text="记录不存在" icon="📋" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <View className={styles.card}>
        <Text className={styles.title}>{record.title}</Text>
        <View className={styles.meta}>
          <StatusTag
            text={getServiceStatusName(record.status)}
            color={getServiceStatusColor(record.status)}
            bgColor={getServiceStatusColor(record.status) + '15'}
          />
          <StatusTag
            text={getServiceCategoryName(record.category)}
            color="#165DFF"
            bgColor="#E8F3FF"
          />
          <Text className={styles.metaItem}>提交时间：{record.submitTime}</Text>
        </View>

        <Text className={styles.sectionTitle}>问题描述</Text>
        <Text className={styles.desc}>{record.description}</Text>

        {(record.contact || record.phone) && (
          <View className={styles.contactBox}>
            {record.contact && (
              <View className={styles.contactRow}>
                <Text className={styles.contactLabel}>联系人</Text>
                <Text className={styles.contactValue}>{record.contact}</Text>
              </View>
            )}
            {record.phone && (
              <View className={styles.contactRow}>
                <Text className={styles.contactLabel}>联系电话</Text>
                <Text className={styles.contactValue}>{record.phone}</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {(record.location || (record.images && record.images.length > 0)) && (
        <View className={styles.card}>
          {record.location && (
            <View className={styles.infoRow}>
              <Text className={styles.infoLabel}>📍 位置</Text>
              <Text className={styles.infoValue}>{record.location}</Text>
            </View>
          )}
          {record.images && record.images.length > 0 && (
            <>
              <Text className={styles.sectionTitle} style={{ marginTop: '24rpx' }}>
                现场照片
              </Text>
              <View className={styles.imageGrid}>
                {record.images.map((img, index) => (
                  <View key={index} className={styles.imageItem}>
                    <Image
                      src={img}
                      mode="aspectFill"
                      style={{ width: '100%', height: '100%' }}
                      onError={(e) => console.error('[ServiceDetail] 图片加载失败', e)}
                    />
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      )}

      <View className={styles.card}>
        <Text className={styles.sectionTitle}>办理进度</Text>
        <View className={styles.timeline}>
          {record.progressList && record.progressList.length > 0 ? (
            record.progressList.map((progress, index) => (
              <View key={index} className={styles.timelineItem}>
                <View className={styles.timelineDot} />
                <Text className={styles.timelineTime}>{progress.time}</Text>
                <Text className={styles.timelineStatus}>{progress.status}</Text>
                <Text className={styles.timelineDesc}>{progress.description}</Text>
              </View>
            ))
          ) : (
            <Text className={styles.desc}>暂无进度信息</Text>
          )}
        </View>
      </View>
    </PageContainer>
  );
};

export default ServiceDetailPage;
