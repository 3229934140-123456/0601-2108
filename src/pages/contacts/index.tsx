import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageContainer from '@/components/PageContainer';
import EmptyState from '@/components/EmptyState';
import { useAppStore } from '@/store/useAppStore';
import { generateId } from '@/utils';
import styles from './index.module.scss';
import classnames from 'classnames';

const ContactsPage: React.FC = () => {
  const { contacts, addContact, removeContact } = useAppStore();

  const handleCall = (phone: string) => {
    const realPhone = phone.replace(/\*/g, '0');
    Taro.makePhoneCall({
      phoneNumber: realPhone,
    }).catch((err) => console.error('[Contacts] 拨打电话失败', err));
  };

  const handleDelete = (id: string, name: string) => {
    Taro.showModal({
      title: '删除确认',
      content: `确定要删除联系人"${name}"吗？`,
      success: (res) => {
        if (res.confirm) {
          removeContact(id);
          console.log('[Contacts] 删除联系人', id);
          Taro.showToast({ title: '删除成功', icon: 'success' });
        }
      },
    });
  };

  const handleAdd = () => {
    Taro.showModal({
      title: '新增联系人',
      editable: true,
      placeholderText: '请输入姓名',
      success: (res) => {
        if (res.confirm && res.content) {
          const name = res.content.trim();
          if (!name) return;
          Taro.showModal({
            title: '联系电话',
            editable: true,
            placeholderText: '请输入电话',
            success: (res2) => {
              if (res2.confirm && res2.content) {
                addContact({
                  id: generateId(),
                  name,
                  title: '联系人',
                  phone: res2.content,
                  department: '',
                });
                console.log('[Contacts] 新增联系人', name);
                Taro.showToast({ title: '添加成功', icon: 'success' });
              }
            },
          });
        }
      },
    });
  };

  return (
    <PageContainer>
      {contacts.length === 0 ? (
        <EmptyState text="暂无常用联系人" icon="📇" />
      ) : (
        contacts.map((contact) => (
          <View key={contact.id} className={styles.contactCard}>
            <View className={styles.avatar}>
              <Text>{contact.name.slice(0, 1)}</Text>
            </View>
            <View className={styles.contactInfo}>
              <View className={styles.contactHeader}>
                <Text className={styles.contactName}>{contact.name}</Text>
                <Text className={styles.contactTitle}>{contact.title}</Text>
              </View>
              {contact.department && (
                <Text className={styles.contactDept}>{contact.department}</Text>
              )}
              <Text className={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <View className={styles.contactActions}>
              <View
                className={classnames(styles.actionIcon, styles.callIcon)}
                onClick={() => handleCall(contact.phone)}
              >
                <Text>📞</Text>
              </View>
              <View
                className={classnames(styles.actionIcon, styles.deleteIcon)}
                onClick={() => handleDelete(contact.id, contact.name)}
              >
                <Text>🗑️</Text>
              </View>
            </View>
          </View>
        ))
      )}

      <View className={styles.addBtn} onClick={handleAdd}>
        <Text>+ 添加联系人</Text>
      </View>
    </PageContainer>
  );
};

export default ContactsPage;
