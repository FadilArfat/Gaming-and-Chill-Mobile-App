import React from 'react';
import {StyleSheet, Image, View, Dimensions, Platform} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

Banner = ({item, imageKey, onPress, index, active, local}) => {
  return (
    <View style={[styles.videoContainer]} onPress={() => onPress(item)}>
      <View style={[styles.imageContainer, styles.shadow]}>
        <Image
          style={[styles.videoPreview, active ? {} : {height: 200}]}
          source={{uri: item[imageKey]}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  videoPreview: {
    width: screenWidth,
    borderRadius: 8,
    resizeMode: 'cover',
    height: 200,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: screenWidth,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default Banner;
