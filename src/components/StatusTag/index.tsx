import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import classnames from 'classnames';

interface StatusTagProps {
  text: string;
  color?: string;
  bgColor?: string;
  className?: string;
}

const StatusTag: React.FC<StatusTagProps> = ({
  text,
  color,
  bgColor,
  className,
}) => {
  return (
    <View
      className={classnames(styles.tag, className)}
      style={{
        color: color || '#2BA471',
        backgroundColor: bgColor || '#E8F7EF',
      }}
    >
      <Text>{text}</Text>
    </View>
  );
};

export default StatusTag;
