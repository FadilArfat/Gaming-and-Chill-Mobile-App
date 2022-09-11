import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor="black" highlightColor="#0B1320">
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
        }}>
        <View>
          <View
            style={{
              width: 300,
              height: 150,
              borderRadius: 4,
              marginVertical: 0,
            }}
          />
          <View
            style={{marginTop: 160, width: 300, height: 20, borderRadius: 4}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginTop: 200,

                width: 140,
                height: 180,
                borderRadius: 4,
              }}
            />
            <View
              style={{marginTop: 200, width: 140, height: 180, borderRadius: 4}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 190,
            }}>
            <View
              style={{
                marginTop: 200,
                width: 140,
                height: 180,
                borderRadius: 4,
              }}
            />
            <View
              style={{marginTop: 200, width: 140, height: 180, borderRadius: 4}}
            />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default HomeSkeleton;
