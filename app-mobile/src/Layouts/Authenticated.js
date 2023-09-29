import { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { AppContext } from '../Data/AppContext';
import styles from '../Shared/Styles';

export default function Authenticated({ children, style = "" }) {
  const {  } = useContext(AppContext);

  return (
    <View
      style={[styles.container, ...style]}
      //onStartShouldSetResponder={}
      >
        {children}
    </View>
  );
}