import React, { ReactNode } from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface SectionTitleProps {
  title: string;
  extra?: ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, extra }) => {
  return (
    <View className={styles.wrapper}>
      <View className={styles.left}>
        <View className={styles.bar} />
        <Text className={styles.title}>{title}</Text>
      </View>
      {extra && <View className={styles.extra}>{extra}</View>}
    </View>
  );
};

export default SectionTitle;
