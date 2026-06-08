import React, { useState } from 'react';
import { View, Text, Input, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import { useAppStore } from '@/store/useAppStore';
import { MutualCategory, MutualItem } from '@/types';
import { formatTime, generateId } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

const MutualPublishPage: React.FC = () => {
  const { userInfo, addMutualItem } = useAppStore();
  const [category, setCategory] = useState<MutualCategory>('machine');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState(userInfo.name);
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = title.trim() && description.trim() && phone.trim() && !submitting;

  const handleSubmit = () => {
    if (!canSubmit) {
      if (!title.trim() || !description.trim() || !phone.trim()) {
        Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      }
      return;
    }

    setSubmitting(true);
    const newItem: MutualItem = {
      id: generateId(),
      category,
      title: title.trim(),
      description: description.trim(),
      price: price.trim() || undefined,
      contact: contact.trim() || userInfo.name,
      phone: phone.trim(),
      location: location.trim(),
      publishTime: formatTime(new Date()),
      publisher: contact.trim() || userInfo.name,
    };

    addMutualItem(newItem);
    console.log('[MutualPublish] 发布成功写入store', newItem);

    Taro.showToast({ title: '发布成功', icon: 'success' });
    setTimeout(() => Taro.navigateBack(), 1200);
  };

  return (
    <PageContainer>
      <View className={styles.formCard}>
        <View className={styles.formItem}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>信息类别
          </Text>
          <View className={styles.categoryTabs}>
            <View
              className={classnames(styles.categoryTab, category === 'machine' && styles.active)}
              onClick={() => setCategory('machine')}
            >
              <Text>农机借用</Text>
            </View>
            <View
              className={classnames(styles.categoryTab, category === 'product' && styles.active)}
              onClick={() => setCategory('product')}
            >
              <Text>农产品供应</Text>
            </View>
          </View>
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>标题
          </Text>
          <Input
            className={styles.input}
            placeholder={category === 'machine' ? '如：大型联合收割机出租' : '如：自家散养土鸡蛋出售'}
            value={title}
            onInput={(e) => setTitle(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>详细描述
          </Text>
          <Textarea
            className={styles.textarea}
            placeholder="请详细描述设备/产品情况，如规格、数量、使用状况等"
            value={description}
            onInput={(e) => setDescription(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>价格（可选）</Text>
          <Input
            className={styles.input}
            placeholder="如：面议 / 80元/亩 / 1.5元/个"
            value={price}
            onInput={(e) => setPrice(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>所在位置（可选）</Text>
          <Input
            className={styles.input}
            placeholder="请输入位置信息"
            value={location}
            onInput={(e) => setLocation(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>联系人
          </Text>
          <Input
            className={styles.input}
            placeholder="请输入联系人姓名"
            value={contact}
            onInput={(e) => setContact(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>联系电话
          </Text>
          <Input
            className={styles.input}
            type="number"
            placeholder="请输入联系电话"
            value={phone}
            onInput={(e) => setPhone(e.detail.value)}
          />
        </View>
      </View>

      <View
        className={classnames(styles.submitBtn, !canSubmit && styles.disabled)}
        onClick={handleSubmit}
      >
        <Text>发布信息</Text>
      </View>
    </PageContainer>
  );
};

export default MutualPublishPage;
