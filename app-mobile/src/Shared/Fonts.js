import { Dimensions, Platform, PixelRatio } from 'react-native';

    const { width, height } = Dimensions.get('window');
    const scale = width / 320;

    function normalize(size) {
        const newSize = size * scale 
        if (Platform.OS === 'ios') {
            return ((Math.round(PixelRatio.roundToNearestPixel(newSize))) ?? size)
        } else {
            return ((Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2) ?? size)
        }
    }

    const size = {
        s: normalize(10),
        xs: normalize(12),
        sm: normalize(14),
        md: normalize(16),
        lg: normalize(18),
        xl: normalize(20),
    };
  
    const weight = {
        normal: '400',
        bold: '700',
    };
  
    const family = {
        normal: 'Poppins-Regular',
        bold: 'Poppins-SemiBold',
        bolder: 'Poppins-Bold',
    };

  export default fonts = { size, weight, family };