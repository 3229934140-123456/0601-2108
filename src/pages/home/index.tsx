import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import SectionTitle from '@/components/SectionTitle';
import StatusTag from '@/components/StatusTag';
import { noticeList, quickEntries, weatherInfo } from '@/data/home';
import { useAppStore } from '@/store/useAppStore';
import { getNoticeTypeColor, getNoticeTypeName } from '@/utils';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const { userInfo } = useAppStore();
  const [topNotices, setTopNotices] = useState(
    noticeList.filter((n) => n.isTop).slice(0, 3)
  );
  const [allNotices, setAllNotices] = useState(noticeList.slice(0, 5));

  const handleQuickEntry = (entry: typeof quickEntries[0]) => {
    if (entry.pagePath) {
      Taro.switchTab({ url: entry.pagePath }).catch(() => {
        Taro.navigateTo({ url: entry.pagePath });
      });
    } else if (entry.action) {
      Taro.navigateTo({
        url: `/pages/service-apply/index?category=${entry.action}`,
      });
    }
  };

  const handleNoticeClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/notice-detail/index?id=${id}` });
  };

  return (
    <PageContainer padding={false}>
      <View className={styles.banner}>
        <Text className={styles.greeting}>
          你好，{userInfo.name} 👋
        </Text>
        <Text className={styles.subGreeting}>
          欢迎来到{userInfo.village}数字乡村服务平台
        </Text>

        <View className={styles.weatherCard}>
          <View className={styles.weatherLeft}>
            <Text className={styles.weatherIcon}>⛅</Text>
            <View>
              <Text className={styles.weatherTemp}>{weatherInfo.temperature}</Text>
              <Text className={styles.weatherDesc}>
                {weatherInfo.weather} · {weatherInfo.wind}
              </Text>
            </View>
          </View>
          <View className={styles.weatherWarning}>⚠️ {weatherInfo.warning}</View>
        </View>
      </View>

      <View className={styles.noticeSection} style={{ padding: '0 32rpx' }}>
        <View className={styles.noticeCard}>
          <View className={styles.noticeHeader}>
            <Text className={styles.noticeIcon}>📢</Text>
            <Text className={styles.noticeHeaderText}>置顶公告</Text>
          </View>
          {topNotices.map((notice) => (
            <View
              key={notice.id}
              className={styles.noticeItem}
              onClick={() => handleNoticeClick(notice.id)}
            >
              <Text className={styles.noticeTitle}>
                <StatusTag
                  text={getNoticeTypeName(notice.type)}
                  color={getNoticeTypeColor(notice.type)}
                  bgColor={getNoticeTypeColor(notice.type) + '15'}
                />
                {notice.title}
              </Text>
              <Text className={styles.noticeTime}>{notice.publishTime}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ padding: '0 32rpx' }}>
        <SectionTitle title="快捷办事" />
        <View className={styles.quickGrid}>
          {quickEntries.map((entry) => (
            <View
              key={entry.id}
              className={styles.quickItem}
              onClick={() => handleQuickEntry(entry)}
            >
              <View
                className={styles.quickIcon}
                style={{
                  backgroundColor: entry.iconBg,
                  color: entry.iconColor,
                }}
              >
                {entry.letter}
              </View>
              <Text className={styles.quickName}>{entry.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ padding: '0 32rpx' }}>
        <SectionTitle title="通知动态" extra="查看全部" />
        <View className={styles.listCard}>
          {allNotices.map((notice) => (
            <View
              key={notice.id}
              className={styles.listItem}
              onClick={() => handleNoticeClick(notice.id)}
            >
              <View className={styles.listItemLeft}>
                <Text className={styles.listItemTitle}>
                  <StatusTag
                    text={getNoticeTypeName(notice.type)}
                    color={getNoticeTypeColor(notice.type)}
                    bgColor={getNoticeTypeColor(notice.type) + '15'}
                  />
                  {notice.title}
                </Text>
                <Text className={styles.listItemDesc}>{notice.publisher}</Text>
              </View>
              <Text className={styles.listItemRight}>
                {notice.publishTime.split(' ')[0]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </PageContainer>
  );
};

export default HomePage;
