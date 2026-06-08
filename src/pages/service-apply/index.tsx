import React, { useState, useEffect } from 'react';
import { View, Text, Input, Textarea, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import { serviceCategories, certificateTypes } from '@/data/services';
import { useAppStore } from '@/store/useAppStore';
import { getServiceCategoryName, generateId, formatTime } from '@/utils';
import { ServiceRecord } from '@/types';
import styles from './index.module.scss';
import classnames from 'classnames';

const ServiceApplyPage: React.FC = () => {
  const router = useRouter();
  const { addServiceRecord } = useAppStore();
  const category = (router.params.category as ServiceRecord['category']) || 'certificate';
  const categoryInfo = serviceCategories.find((c) => c.key === category);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [certType, setCertType] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (categoryInfo) {
      Taro.setNavigationBarTitle({ title: `${categoryInfo.name}申请` });
    }
  }, [category, categoryInfo]);

  const handleChooseLocation = async () => {
    try {
      const res = await Taro.chooseLocation({});
      if (res) {
        setLocation(`${res.address || ''}${res.name ? ' (' + res.name + ')' : ''}`);
      }
    } catch (err) {
      console.error('[ServiceApply] 选择位置失败', err);
      Taro.showToast({ title: '获取位置失败', icon: 'none' });
    }
  };

  const handleChooseImage = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 9 - images.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
      });
      if (res.tempFilePaths) {
        setImages([...images, ...res.tempFilePaths]);
      }
    } catch (err) {
      console.error('[ServiceApply] 选择图片失败', err);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const canSubmit = title.trim() && description.trim();

  const handleSubmit = () => {
    if (!canSubmit) {
      Taro.showToast({ title: '请填写标题和描述', icon: 'none' });
      return;
    }

    const fullTitle =
      category === 'certificate' && certType
        ? `${certType}申请`
        : title;

    const record: ServiceRecord = {
      id: generateId(),
      category,
      title: fullTitle,
      description,
      status: 'pending',
      submitTime: formatTime(new Date()),
      updateTime: formatTime(new Date()),
      contact: contact.trim() || undefined,
      phone: phone.trim() || undefined,
      location,
      images,
      progressList: [
        {
          time: formatTime(new Date()),
          status: '已提交',
          description: '申请已提交，等待工作人员受理',
        },
      ],
    };

    addServiceRecord(record);
    console.log('[ServiceApply] 提交申请成功', record);

    Taro.showToast({ title: '提交成功', icon: 'success' });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  };

  return (
    <PageContainer>
      <View className={styles.formCard}>
        <View className={styles.formItem}>
          <Text className={styles.label}>
            办事类型
          </Text>
          <View className={styles.input}>
            <Text>{getServiceCategoryName(category)}</Text>
          </View>
        </View>

        {category === 'certificate' && (
          <View className={styles.formItem}>
            <Text className={styles.label}>
              <Text className={styles.required}>*</Text>证明类型
            </Text>
            <View style={{ display: 'flex', flexWrap: 'wrap', gap: '16rpx' }}>
              {certificateTypes.map((type) => (
                <View
                  key={type}
                  onClick={() => {
                    setCertType(type);
                    setTitle(`${type}申请`);
                  }}
                  style={{
                    padding: '12rpx 24rpx',
                    borderRadius: '8rpx',
                    fontSize: '26rpx',
                    background: certType === type ? '#E8F7EF' : '#F6F8F5',
                    color: certType === type ? '#2BA471' : '#4E5969',
                    border: certType === type ? '2rpx solid #2BA471' : '2rpx solid transparent',
                  }}
                >
                  <Text>{type}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View className={styles.formItem}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>
            {category === 'certificate' ? '申请标题' : '问题标题'}
          </Text>
          <Input
            className={styles.input}
            placeholder={`请输入${category === 'certificate' ? '申请' : '问题'}标题`}
            value={title}
            onInput={(e) => setTitle(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>
            {category === 'certificate' ? '申请说明' : '详细描述'}
          </Text>
          <Textarea
            className={styles.textarea}
            placeholder={`请详细描述${category === 'certificate' ? '申请事由和用途' : '问题情况'}`}
            value={description}
            onInput={(e) => setDescription(e.detail.value)}
          />
        </View>

        {(category === 'road' || category === 'environment') && (
          <View className={styles.formItem}>
            <Text className={styles.label}>📍 位置信息</Text>
            <View className={styles.locationBox}>
              {location ? (
                <Text className={styles.locationText}>{location}</Text>
              ) : (
                <Text className={styles.locationPlaceholder}>点击获取当前位置</Text>
              )}
              <View className={styles.locationBtn} onClick={handleChooseLocation}>
                <Text>获取位置</Text>
              </View>
            </View>
          </View>
        )}

        <View className={styles.formItem}>
          <Text className={styles.label}>📷 上传图片（可选）</Text>
          <View className={styles.imageList}>
            {images.map((img, index) => (
              <View key={index} className={styles.imageItem}>
                <Image
                  className={styles.imageItemImg}
                  src={img}
                  mode="aspectFill"
                  onError={(e) => console.error('[ServiceApply] 图片加载失败', e)}
                />
                <View
                  className={styles.imageRemove}
                  onClick={() => handleRemoveImage(index)}
                >
                  <Text>×</Text>
                </View>
              </View>
            ))}
            {images.length < 9 && (
              <View className={styles.imageAdd} onClick={handleChooseImage}>
                <Text className={styles.imageAddIcon}>+</Text>
                <Text className={styles.imageAddText}>上传图片</Text>
              </View>
            )}
          </View>
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>联系人（可选）</Text>
          <Input
            className={styles.input}
            placeholder="请输入联系人姓名"
            value={contact}
            onInput={(e) => setContact(e.detail.value)}
          />
        </View>

        <View className={styles.formItem}>
          <Text className={styles.label}>联系电话（可选）</Text>
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
        <Text>提交申请</Text>
      </View>
    </PageContainer>
  );
};

export default ServiceApplyPage;
