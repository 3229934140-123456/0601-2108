import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import StatusTag from '@/components/StatusTag';
import EmptyState from '@/components/EmptyState';
import { noticeList } from '@/data/home';
import { getNoticeTypeColor, getNoticeTypeName } from '@/utils';
import styles from './index.module.scss';

const NoticeDetailPage: React.FC = () => {
  const router = useRouter();
  const [notice, setNotice] = useState(noticeList.find((n) => n.id === router.params.id));

  useEffect(() => {
    const id = router.params.id;
    const found = noticeList.find((n) => n.id === id);
    setNotice(found);
    if (found) {
      Taro.setNavigationBarTitle({ title: getNoticeTypeName(found.type) });
    }
  }, [router.params.id]);

  if (!notice) {
    return (
      <PageContainer>
        <EmptyState text="公告不存在" icon="📄" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <View className={styles.card}>
        <Text className={styles.title}>{notice.title}</Text>
        <View className={styles.meta}>
          <StatusTag
            text={getNoticeTypeName(notice.type)}
            color={getNoticeTypeColor(notice.type)}
            bgColor={getNoticeTypeColor(notice.type) + '15'}
          />
          <Text className={styles.metaItem}>{notice.publisher}</Text>
          <Text className={styles.metaItem}>{notice.publishTime}</Text>
        </View>
        <Text className={styles.content}>{notice.content}</Text>
      </View>
    </PageContainer>
  );
};

export default NoticeDetailPage;
