import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import StatusTag from '@/components/StatusTag';
import { voteTopics, volunteerActivities } from '@/data/village';
import styles from './index.module.scss';
import classnames from 'classnames';

const VillagePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vote' | 'volunteer'>('vote');
  const [topics, setTopics] = useState(voteTopics);
  const [activities, setActivities] = useState(volunteerActivities);

  const handleVoteClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/vote-detail/index?id=${id}` });
  };

  const handleVolunteerClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/volunteer-detail/index?id=${id}` });
  };

  return (
    <PageContainer padding={false}>
      <View className={styles.tabs}>
        <View
          className={classnames(styles.tabItem, activeTab === 'vote' && styles.tabActive)}
          onClick={() => setActiveTab('vote')}
        >
          <Text>村民投票</Text>
        </View>
        <View
          className={classnames(styles.tabItem, activeTab === 'volunteer' && styles.tabActive)}
          onClick={() => setActiveTab('volunteer')}
        >
          <Text>志愿服务</Text>
        </View>
      </View>

      <View style={{ padding: '0 32rpx' }}>
        {activeTab === 'vote' ? (
          <>
            <SectionTitle title="进行中的议题" />
            {topics.length === 0 ? (
              <EmptyState text="暂无可投票议题" icon="🗳️" />
            ) : (
              topics.map((topic) => {
                const total = topic.totalVotes || 1;
                return (
                  <View
                    key={topic.id}
                    className={styles.voteCard}
                    onClick={() => handleVoteClick(topic.id)}
                  >
                    <View className={styles.voteHeader}>
                      <Text className={styles.voteTitle}>{topic.title}</Text>
                      {topic.hasVoted && (
                        <StatusTag text="已投票" color="#00B42A" bgColor="#E8F8EC" />
                      )}
                    </View>
                    <Text className={styles.voteDesc}>{topic.description}</Text>

                    <View className={styles.voteProgress}>
                      {topic.options.slice(0, 2).map((opt) => (
                        <View key={opt.id} className={styles.voteOption}>
                          <View className={styles.voteOptionHeader}>
                            <Text className={styles.voteOptionLabel}>{opt.label}</Text>
                            <Text className={styles.voteOptionCount}>
                              {opt.count}票 ({Math.round((opt.count / total) * 100)}%)
                            </Text>
                          </View>
                          <View className={styles.voteBar}>
                            <View
                              className={styles.voteBarFill}
                              style={{ width: `${(opt.count / total) * 100}%` }}
                            />
                          </View>
                        </View>
                      ))}
                    </View>

                    <View className={styles.voteFooter}>
                      <Text className={styles.voteMeta}>
                        共 {total} 人参与 · 截止 {topic.deadline}
                      </Text>
                      <View
                        className={classnames(styles.voteBtn, topic.hasVoted && styles.voted)}
                      >
                        <Text>{topic.hasVoted ? '查看详情' : '去投票'}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </>
        ) : (
          <>
            <SectionTitle title="志愿活动" />
            {activities.length === 0 ? (
              <EmptyState text="暂无志愿活动" icon="💚" />
            ) : (
              activities.map((activity) => (
                <View
                  key={activity.id}
                  className={styles.activityCard}
                  onClick={() => handleVolunteerClick(activity.id)}
                >
                  <Text className={styles.activityTitle}>{activity.title}</Text>
                  <Text className={styles.activityDesc}>{activity.description}</Text>

                  <View className={styles.activityInfo}>
                    <View className={styles.activityInfoItem}>
                      <Text>🕐</Text>
                      <Text>{activity.time}</Text>
                    </View>
                    <View className={styles.activityInfoItem}>
                      <Text>📍</Text>
                      <Text>{activity.location}</Text>
                    </View>
                  </View>

                  <View className={styles.activityFooter}>
                    <View>
                      <Text className={styles.activityProgress}>
                        已报名 {activity.currentPeople}/{activity.maxPeople} 人
                      </Text>
                      <Text className={styles.activityProgress}>
                        参与奖励 +{activity.points} 积分
                      </Text>
                    </View>
                    <View
                      className={classnames(
                        styles.activitySignBtn,
                        activity.hasSigned && styles.signed
                      )}
                    >
                      <Text>{activity.hasSigned ? '已报名' : '立即报名'}</Text>
                    </View>
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

export default VillagePage;
