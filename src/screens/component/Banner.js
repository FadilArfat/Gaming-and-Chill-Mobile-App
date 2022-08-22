import React from 'react';
import {Image, View} from 'react-native';

const Banner = ({banner}) => {
  console.log(banner?.released);
  return (
    <View style={{flex: 1, height: 500}}>
      <Image
        style={{width: 100, height: 50}}
        source={{uri: banner?.background_image}}
        resizeMode="stretch"
      />
    </View>
  );
};

export default Banner;
