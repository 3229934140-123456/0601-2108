import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import StatusTag from '@/components/StatusTag';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';
import classnames from 'classnames';

const VillagePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vote' | 'volunteer'>('vote');
  const [volunteerSubTab, setVolunteerSubTab] = useState<'all' | 'mine'>('all');
  const voteTopics = useAppStore((s) => s.voteTopics);
  const volunteerActivities = useAppStore((s) => s.volunteerActivities);
  const { signUpVolunteer, addPointsRecord } = useAppStore();
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const todayStr = new Date().toISOString().slice(0, 10);
  const isExpired = (deadline: string) => deadline < todayStr;
  const mySignedActivities = volunteerActivities.filter((a) => a.hasSigned);

  const handleVoteClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/vote-detail/index?id=${id}` });
  };

  const handleVolunteerSign = (e: React.MouseEvent, activityId: string) => {
    e.stopPropagation();
    const activity = volunteerActivities.find((a) => a.id === activityId);
    if (!activity) return;
    if (activity.hasSigned) {
      Taro.showToast({ title: '您已报名该活动', icon: 'none' });
      return;
    }
    if (activity.currentPeople >= activity.maxPeople) {
      Taro.showToast({ title: '活动名额已满', icon: 'none' });
      return;
    }
    Taro.showModal({
      title: '确认报名',
      content: `确认报名参加"${activity.title}"？`,
      success: (res) => {
        if (res.confirm) {
          const result = signUpVolunteer(activityId);
          if (result.success && result.points) {
            addPointsRecord({
              id: generateId(),
              title: `志愿服务报名：${activity.title.slice(0, 15)}...`,
              points: result.points,
              type: 'earn',
              time: new Date().toISOString().slice(0, 10),
            });
            Taro.showToast({
              title: `报名成功 +${result.points}积分`,
              icon: 'success',
            });
          } else if (!result.success) {
            Taro.showToast({ title: result.message, icon: 'none' });
          }
        }
      },
    });
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
            {voteTopics.length === 0 ? (
              <EmptyState text="暂无可投票议题" icon="🗳️" />
            ) : (
              voteTopics.map((topic) => {
                const total = topic.totalVotes || 1;
                const expired = isExpired(topic.deadline);
                return (
                  <View
                    key={topic.id}
                    className={styles.voteCard}
                    onClick={() => handleVoteClick(topic.id)}
                  >
                    <View className={styles.voteHeader}>
                      <Text className={styles.voteTitle}>{topic.title}</Text>
                      <View className={styles.voteTagRow}>
                        {expired && (
                          <StatusTag text="已截止" color="#86909C" bgColor="#F2F3F5" />
                        )}
                        {topic.hasVoted && (
                          <StatusTag text="已投票" color="#00B42A" bgColor="#E8F8EC" />
                        )}
                      </View>
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
                        {expired ? '（已截止）' : ''}
                      </Text>
                      <View
                        className={classnames(styles.voteBtn, topic.hasVoted && styles.voted)}
                      >
                        <Text>{topic.hasVoted ? '查看详情' : expired ? '查看结果' : '去投票'}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </>
        ) : (
          <>
            <View className={styles.subTabs}>
              <View
                className={classnames(
                  styles.subTabItem,
                  volunteerSubTab === 'all' && styles.subTabActive
                )}
                onClick={() => setVolunteerSubTab('all')}
              >
                <Text>全部活动</Text>
              </View>
              <View
                className={classnames(
                  styles.subTabItem,
                  volunteerSubTab === 'mine' && styles.subTabActive
                )}
                onClick={() => setVolunteerSubTab('mine')}
              >
                <Text>我的报名 ({mySignedActivities.length})</Text>
              </View>
            </View>

            {volunteerSubTab === 'all' ? (
              <>
                <SectionTitle title="志愿活动" />
                {volunteerActivities.length === 0 ? (
                  <EmptyState text="暂无志愿活动" icon="💚" />
                ) : (
                  volunteerActivities.map((activity) => {
                    const isFull = activity.currentPeople >= activity.maxPeople;
                    const btnText = activity.hasSigned
                      ? '已报名'
                      : isFull
                      ? '名额已满'
                      : '立即报名';
                    return (
                      <View
                        key={activity.id}
                        className={styles.activityCard}
                        onClick={() =>
                          Taro.navigateTo({
                            url: `/pages/volunteer-detail/index?id=${activity.id}`,
                          })
                        }
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
                              (activity.hasSigned || isFull) && styles.signed
                            )}
                            onClick={(e) => handleVolunteerSign(e, activity.id)}
                          >
                            <Text>{btnText}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })
                )}
              </>
            ) : (
              <>
                <SectionTitle title={`我已报名（${mySignedActivities.length}）`} />
                {mySignedActivities.length === 0 ? (
                  <EmptyState text="您还未报名任何志愿活动" icon="💚" />
                ) : (
                  mySignedActivities.map((activity) => (
                    <View
                      key={activity.id}
                      className={styles.mySignCard}
                      onClick={() =>
                        Taro.navigateTo({
                          url: `/pages/volunteer-detail/index?id=${activity.id}`,
                        })
                      }
                    >
                      <Text className={styles.mySignTitle}>{activity.title}</Text>
                      <View className={styles.mySignInfo}>
                        <View className={styles.mySignInfoItem}>
                          <Text>🕐</Text>
                          <Text>{activity.time}</Text>
                        </View>
                        <View className={styles.mySignInfoItem}>
                          <Text>📍</Text>
                          <Text>{activity.location}</Text>
                        </View>
                      </View>
                      <Text className={styles.mySignPoints}>
                        已报名 · 参与可获得 +{activity.points} 积分
                      </Text>
                    </View>
                  ))
                )}
              </>
            )}
          </>
        )}
      </View>
    </PageContainer>
  );
};

export default VillagePage;
