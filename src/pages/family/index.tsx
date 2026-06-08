import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import { FamilyMember } from '@/types';
import { generateId } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

interface EditingMember {
  id?: string;
  name: string;
  relation: string;
  phone: string;
  idCard: string;
}

const emptyMember: EditingMember = {
  name: '',
  relation: '',
  phone: '',
  idCard: '',
};

const FamilyPage: React.FC = () => {
  const { familyMembers, addFamilyMember, removeFamilyMember, updateFamilyMember } =
    useAppStore();

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<EditingMember>(emptyMember);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setForm(emptyMember);
    setShowModal(true);
  };

  const handleOpenEdit = (member: FamilyMember) => {
    setIsEditing(true);
    setForm({
      id: member.id,
      name: member.name,
      relation: member.relation,
      phone: member.phone || '',
      idCard: member.idCard || '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      Taro.showToast({ title: '请输入姓名', icon: 'none' });
      return;
    }
    if (!form.relation.trim()) {
      Taro.showToast({ title: '请输入与本人关系', icon: 'none' });
      return;
    }

    if (isEditing && form.id) {
      updateFamilyMember(form.id, {
        name: form.name.trim(),
        relation: form.relation.trim(),
        phone: form.phone.trim(),
        idCard: form.idCard.trim() || undefined,
      });
      console.log('[Family] 更新成员', form.id, form);
      Taro.showToast({ title: '保存成功', icon: 'success' });
    } else {
      const newMember: FamilyMember = {
        id: generateId(),
        name: form.name.trim(),
        relation: form.relation.trim(),
        phone: form.phone.trim(),
        idCard: form.idCard.trim() || undefined,
      };
      addFamilyMember(newMember);
      console.log('[Family] 新增成员', newMember);
      Taro.showToast({ title: '添加成功', icon: 'success' });
    }

    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    Taro.showModal({
      title: '删除确认',
      content: `确定要删除家庭成员"${name}"吗？`,
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
                onClick={() => handleOpenEdit(member)}
              >
                <Text>编辑</Text>
              </View>
              {member.relation !== '本人' && (
                <View
                  className={classnames(styles.actionBtn, styles.deleteBtn)}
                  onClick={() => handleDelete(member.id, member.name)}
                >
                  <Text>删除</Text>
                </View>
              )}
            </View>
          </View>
        ))
      )}

      <View className={styles.addBtn} onClick={handleOpenAdd}>
        <Text>+ 添加家庭成员</Text>
      </View>

      {showModal && (
        <View className={styles.modalMask} onClick={handleCloseModal}>
          <View className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>
              {isEditing ? '编辑家庭成员' : '添加家庭成员'}
            </Text>

            <View className={styles.formItem}>
              <Text className={styles.formLabel}>姓名 *</Text>
              <Input
                className={styles.formInput}
                placeholder="请输入姓名"
                value={form.name}
                onInput={(e) => setForm({ ...form, name: e.detail.value })}
              />
            </View>

            <View className={styles.formItem}>
              <Text className={styles.formLabel}>与本人关系 *</Text>
              <Input
                className={styles.formInput}
                placeholder="如：配偶、子女、父母等"
                value={form.relation}
                onInput={(e) => setForm({ ...form, relation: e.detail.value })}
              />
            </View>

            <View className={styles.formItem}>
              <Text className={styles.formLabel}>联系电话</Text>
              <Input
                className={styles.formInput}
                type="number"
                placeholder="请输入联系电话"
                value={form.phone}
                onInput={(e) => setForm({ ...form, phone: e.detail.value })}
              />
            </View>

            <View className={styles.formItem}>
              <Text className={styles.formLabel}>身份证号</Text>
              <Input
                className={styles.formInput}
                placeholder="请输入身份证号（可选）"
                value={form.idCard}
                onInput={(e) => setForm({ ...form, idCard: e.detail.value })}
              />
            </View>

            <View className={styles.modalActions}>
              <View
                className={classnames(styles.modalBtn, styles.modalBtnCancel)}
                onClick={handleCloseModal}
              >
                <Text>取消</Text>
              </View>
              <View
                className={classnames(styles.modalBtn, styles.modalBtnConfirm)}
                onClick={handleSave}
              >
                <Text>保存</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </PageContainer>
  );
};

export default FamilyPage;
