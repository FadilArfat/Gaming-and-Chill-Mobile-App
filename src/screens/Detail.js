import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import rawg from '../api/rawg';
import {Rating} from 'react-native-ratings';
import CustomImage from './component/CustomImage';

const Detail = ({route}) => {
  const [gamedetail, setGameDetail] = useState([]);
  const [loading, setLoading] = useState('false');
  const [platforms, setPlatform] = useState([]);

  const platformData = [
    {
      name: 'android',
      src: require('../platforms/android.png'),
    },
    {
      name: 'atari',
      src: require('../platforms/atari.png'),
    },
    {
      name: 'ios',
      src: require('../platforms/ios.png'),
    },
    {
      name: 'linux',
      src: require('../platforms/linux.png'),
    },
    {
      name: 'mac',
      src: require('../platforms/mac.png'),
    },
    {
      name: 'neo-geo',
      src: require('../platforms/neo-geo.png'),
    },
    {
      name: 'nintendo',
      src: require('../platforms/nintendo.png'),
    },
    {
      name: 'pc',
      src: require('../platforms/pc.png'),
    },
    {
      name: 'playstation',
      src: require('../platforms/playstation.png'),
    },
    {
      name: 'sega',
      src: require('../platforms/sega.png'),
    },
    {
      name: 'web',
      src: require('../platforms/web.png'),
    },
    {
      name: 'xbox',
      src: require('../platforms/xbox.png'),
    },
  ];

  const Loading = () => (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{color: 'black'}}>Loading....</Text>
    </View>
  );

  useEffect(() => {
    const fetchDataGamesDetail = async () => {
      try {
        setLoading(true);
        const responseDariRAWG = await rawg.get(
          `/games/${route.params.paramKey}`,
        );
        console.log(responseDariRAWG.data);
        setGameDetail(responseDariRAWG.data);
        setPlatform(platformData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataGamesDetail();
  }, [route.params.paramKey]);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={{uri: gamedetail.background_image_additional}}
        style={{
          height: '100%',
          width: '100%',
        }}
        resizeMode="cover">
        <View
          style={{
            height: '50%',
            backgroundColor: 'rgba(8,8,8,0.5)',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: gamedetail.background_image}}
            style={{
              width: 150,
              height: 200,
              marginVertical: 20,
              marginLeft: 5,
              borderRadius: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              marginVertical: 20,
              height: '50%',
              backgroundColor: 'red',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {gamedetail.name}
            </Text>
            {/* {gamedetail.parent_platforms &&
              gamedetail.parent_platforms.map(platform => {
                const {id, slug} = platform.platform;
                return (
                  <Image
                    key={id}
                    source={platforms.map( (isi) => {
                      if (slug === isi.name) {
                        return isi.src;
                      } else {
                        return null;
                      }
                    })}
                  />
                );
              })} */}
            <Rating
              type="custom"
              tintColor="none"
              readonly
              ratingBackgroundColor="white"
              style={{paddingVertical: 10, backgroundColor: 'none'}}
              imageSize={15}
            />
            <Text style={{color: 'white', fontWeight: '300'}}>
              {gamedetail.description?.replace(/<\/?[^>]+(>|$)/g, '')}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          height: '50%',
          width: '100%',
          backgroundColor: 'rgba(8,8,8,0.4)',
          zIndex: 1,
        }}
      />

      <Text>{gamedetail.name}</Text>
    </View>
  );
};

export default Detail;
