import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import { generateId } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

const FamilyPage: React.FC = () => {
  const { familyMembers, addFamilyMember, removeFamilyMember } = useAppStore();

  const handleAdd = () => {
    Taro.showModal({
      title: '新增家庭成员',
      editable: true,
      placeholderText: '请输入姓名',
      success: (res) => {
        if (res.confirm && res.content) {
          const name = res.content.trim();
          if (!name) return;
          Taro.showModal({
            title: '与本人关系',
            editable: true,
            placeholderText: '如：配偶、子女、父母等',
            success: (res2) => {
              if (res2.confirm && res2.content) {
                addFamilyMember({
                  id: generateId(),
                  name,
                  relation: res2.content,
                  phone: '',
                });
                console.log('[Family] 新增成员', name);
                Taro.showToast({ title: '添加成功', icon: 'success' });
              }
            },
          });
        }
      },
    });
  };

  const handleEdit = (member: typeof familyMembers[0]) => {
    Taro.showToast({ title: '编辑功能开发中', icon: 'none' });
  };

  const handleDelete = (id: string) => {
    Taro.showModal({
      title: '删除确认',
      content: '确定要删除该家庭成员吗？',
      success: (res) => {
        if (res.confirm) {
          removeFamilyMember(id);
          console.log('[Family] 删除成员', id);
          Taro.showToast({ title: '删除成功', icon: 'success' });
        }
      },
    });
  };

  return (
    <PageContainer>
      {familyMembers.length === 0 ? (
        <EmptyState text="暂无家庭成员" icon="👨‍👩‍👧‍👦" />
      ) : (
        familyMembers.map((member) => (
          <View key={member.id} className={styles.memberCard}>
            <View className={styles.memberHeader}>
              <View className={styles.avatar}>
                <Text>{member.name.slice(0, 1)}</Text>
              </View>
              <View className={styles.memberInfo}>
                <Text className={styles.memberName}>{member.name}</Text>
                <Text className={styles.memberRelation}>{member.relation}</Text>
              </View>
            </View>

            <View className={styles.memberDetail}>
              <View className={styles.detailRow}>
                <Text className={styles.detailLabel}>联系电话</Text>
                <Text className={styles.detailValue}>
                  {member.phone || '未填写'}
                </Text>
              </View>
              {member.idCard && (
                <View className={styles.detailRow}>
                  <Text className={styles.detailLabel}>身份证号</Text>
                  <Text className={styles.detailValue}>{member.idCard}</Text>
                </View>
              )}
            </View>

            <View className={styles.memberActions}>
              <View
                className={classnames(styles.actionBtn, styles.editBtn)}
                onClick={() => handleEdit(member)}
              >
                <Text>编辑</Text>
              </View>
              {member.relation !== '本人' && (
                <View
                  className={classnames(styles.actionBtn, styles.deleteBtn)}
                  onClick={() => handleDelete(member.id)}
                >
                  <Text>删除</Text>
                </View>
              )}
            </View>
          </View>
        ))
      )}

      <View className={styles.addBtn} onClick={handleAdd}>
        <Text>+ 添加家庭成员</Text>
      </View>
    </PageContainer>
  );
};

export default FamilyPage;
