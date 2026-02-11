
import { Inter_400Regular, Inter_700Bold, useFonts as useInter } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold, useFonts as useRoboto } from '@expo-google-fonts/roboto';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type CustomTextProps = TextProps & {
  variant?: 'heading' | 'body';
};

const CustomText: React.FC<CustomTextProps> = ({ variant = 'body', style, children, ...rest }) => {
  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!robotoLoaded || !interLoaded) {
    return null;
  }

  const fontStyle =
    variant === 'heading'
      ? styles.robotoBold
      : styles.inter;

  return (
    <Text style={[fontStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  roboto: {
    fontFamily: 'Roboto_400Regular',
  },
  robotoBold:{
    fontFamily: 'Roboto_700Bold',
  },
  interBOld:{
    fontFamily: 'Inter_700Bold',
  },
  inter: {
    fontFamily: 'Inter_400Regular',
  },
});

export default CustomText;
