import React, { ReactNode } from 'react';
import { View, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';

interface PageContainerProps {
  children: ReactNode;
  scroll?: boolean;
  className?: string;
  padding?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  scroll = true,
  className,
  padding = true,
}) => {
  const contentClass = classnames({
    [styles.content]: padding,
  });

  if (scroll) {
    return (
      <ScrollView scrollY className={styles.container}>
        <View className={classnames(contentClass, className)}>{children}</View>
      </ScrollView>
    );
  }

  return (
    <View className={styles.container}>
      <View className={classnames(contentClass, className)}>{children}</View>
    </View>
  );
};

export default PageContainer;
