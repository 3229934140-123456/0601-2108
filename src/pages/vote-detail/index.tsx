import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import StatusTag from '@/components/StatusTag';
import EmptyState from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import { generateId } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

const VoteDetailPage: React.FC = () => {
  const router = useRouter();
  const { voteTopics, submitVote, addPointsRecord } = useAppStore();
  const topic = voteTopics.find((t) => t.id === router.params.id);
  const [selectedOption, setSelectedOption] = useState<string | null>(topic?.myVote || null);
  const [submitting, setSubmitting] = useState(false);

  if (!topic) {
    return (
      <PageContainer>
        <EmptyState text="议题不存在" icon="🗳️" />
      </PageContainer>
    );
  }

  const total = topic.totalVotes || 1;

  const handleVote = () => {
    if (!selectedOption || topic.hasVoted || submitting) return;

    Taro.showModal({
      title: '确认投票',
      content: '确认提交投票？投票后不可修改。',
      success: (res) => {
        if (res.confirm) {
          setSubmitting(true);
          const result = submitVote(topic.id, selectedOption);
          if (result.success) {
            addPointsRecord({
              id: generateId(),
              title: `村务投票：${topic.title.slice(0, 15)}...`,
              points: 20,
              type: 'earn',
              time: new Date().toISOString().slice(0, 10),
            });
            console.log('[VoteDetail] 投票成功写入store', topic.id, selectedOption);
            Taro.showToast({ title: '投票成功 +20积分', icon: 'success' });
            setTimeout(() => Taro.navigateBack(), 1200);
          } else {
            Taro.showToast({ title: result.message, icon: 'none' });
            setSubmitting(false);
          }
        }
      },
    });
  };

  return (
    <PageContainer>
      <View className={styles.card}>
        <Text className={styles.title}>{topic.title}</Text>
        <Text className={styles.desc}>{topic.description}</Text>
        <View className={styles.meta}>
          <Text>截止时间：{topic.deadline}</Text>
          {topic.hasVoted && <StatusTag text="已投票" color="#00B42A" bgColor="#E8F8EC" />}
        </View>
      </View>

      <View className={styles.card}>
        <View className={styles.options}>
          {topic.options.map((opt) => (
            <View
              key={opt.id}
              className={classnames(
                styles.optionItem,
                selectedOption === opt.id && !topic.hasVoted && styles.selected,
                topic.hasVoted && styles.voted
              )}
              onClick={() => !topic.hasVoted && setSelectedOption(opt.id)}
            >
              <View className={styles.optionHeader}>
                <Text className={styles.optionLabel}>{opt.label}</Text>
                <Text className={styles.optionCount}>
                  {opt.count}票 ({Math.round((opt.count / total) * 100)}%)
                </Text>
              </View>
              <View className={styles.optionBar}>
                <View
                  className={styles.optionBarFill}
                  style={{ width: `${(opt.count / total) * 100}%` }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View
        className={classnames(
          styles.submitBtn,
          (!selectedOption || topic.hasVoted || submitting) && styles.disabled
        )}
        onClick={handleVote}
      >
        <Text>{topic.hasVoted ? '您已完成投票，仅可查看结果' : '确认投票'}</Text>
      </View>
    </PageContainer>
  );
};

export default VoteDetailPage;
