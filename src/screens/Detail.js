import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import rawg from '../api/rawg';
import {AirbnbRating} from 'react-native-ratings';
import platformData from '../screens/Platform';
import {FlatListSlider} from 'react-native-flatlist-slider';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {auth} from '../authentication/firebase';
import {Button} from 'galio-framework';
import {useSelector} from 'react-redux';
import {getAllData, getApi} from '../context/SliceUser';
import axios from 'axios';

const Detail = ({route}) => {
  const [gamedetail, setGameDetail] = useState([]);
  const [loading, setLoading] = useState('false');
  const [screenShoot, setScreenShoot] = useState([]);
  const [loadingSS, setLoadingSS] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [savingSpinner, setSavingSpinner] = useState(false);
  const list = useSelector(getAllData);
  const key = useSelector(getApi);
  console.log(key);

  const Loading = () => (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{color: 'black'}}>Loading....</Text>
    </View>
  );

  const saveToFavorites = async () => {
    try {
      setSavingSpinner(true);
      const data = {
        id: gamedetail.id,
        name: gamedetail.name,
        slug: gamedetail.slug,
        background_image: gamedetail.background_image,
      };
      await firestore()
        .collection('favorites')
        .doc(auth.currentUser.uid)
        .update({
          game: firebase.firestore.FieldValue.arrayUnion(data),
        })
        .then(() => {
          alert('User updated!');
          setIsExist(true);
        });
      setSavingSpinner(false);
    } catch (error) {
      setSavingSpinner(false);
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      setSavingSpinner(true);
      const copy = list.game.filter(obj => obj.id !== gamedetail.id);
      await firestore()
        .collection('favorites')
        .doc(auth.currentUser.uid)
        .update({
          game: copy,
        })
        .then(() => {
          alert('User deleted!');
          setIsExist(false);
        });
      setSavingSpinner(false);
    } catch (error) {
      setSavingSpinner(false);
      console.log(error);
    }
    alert(`${gamedetail.id} Berhasil dihapus`);
  };

  const gameScreenshoot = async () => {
    try {
      setLoadingSS(true);
      const resScreenshoot = await axios.get(
        `https://api.rawg.io/api/games/${route.params.paramKey}/screenshots?key=${key}`,
      );
      const newArr = await Promise.all(resScreenshoot.data.results);
      setScreenShoot(newArr);
      setLoadingSS(false);
    } catch (error) {
      setLoadingSS(true);
      console.log(error);
    }
  };

  const handleExist = async () => {
    const databaru = await list.game.find(e => e.id === route.params.paramKey);
    if (databaru) {
      setIsExist(true);
    } else {
      setIsExist(false);
    }
  };

  useEffect(() => {
    const fetchDataGamesDetail = async () => {
      try {
        setLoading(true);
        const responseDariRAWG = await axios.get(
          `https://api.rawg.io/api/games/${route.params.paramKey}?key=${key}`,
        );
        setGameDetail(responseDariRAWG.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataGamesDetail();
    gameScreenshoot();
    handleExist();
  }, [isExist]);

  if (loading === true) {
    return <Loading />;
  }
  const metacritic = score => {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

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
            backgroundColor: 'rgba(8,8,8,0.5)',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Image
              source={{uri: gamedetail.background_image}}
              resizeMode="cover"
              style={{
                width: 150,
                height: 200,
                marginVertical: 20,
                marginLeft: 5,
                borderRadius: 5,
                elevation: 10,
              }}
            />
            {isExist ? (
              <Button color="danger" onPress={handleDelete}>
                Remove
              </Button>
            ) : (
              <Button color="success" onPress={saveToFavorites}>
                Save
              </Button>
            )}
            {savingSpinner && (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 10,
              marginVertical: 20,
              height: '50%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
              {gamedetail.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 3,
              }}>
              {gamedetail.parent_platforms &&
                gamedetail.parent_platforms.map(platform => {
                  const {id, slug} = platform.platform;
                  return (
                    <Image
                      style={{
                        width: 25,
                        height: 15,
                        flexWrap: 'wrap',
                      }}
                      key={id}
                      resizeMode={'contain'}
                      source={platformData[slug]}
                    />
                  );
                })}
            </View>
            <Text style={{color: 'white', marginTop: 5}}>Developer : </Text>
            {gamedetail.developers?.map(developer => {
              const {name} = developer;
              return (
                <Text key={name} style={{color: 'white'}}>
                  {name}
                </Text>
              );
            })}
            <Text style={{color: 'white', marginTop: 5}}>
              Release Date : {gamedetail.released}
            </Text>
            <Text style={{color: 'white'}}>
              Playtime :{' '}
              {gamedetail.playtime > 0
                ? `${gamedetail.playtime} Hours`
                : 'Unknown'}
            </Text>
            <Text style={{color: 'white'}}>Website :</Text>
            {gamedetail.website ? (
              <Text
                style={{color: 'white', marginBottom: 5}}
                onPress={() =>
                  Linking.openURL(gamedetail.website)
                    .then(() => console.log('ok'))
                    .catch(er => console.log(er))
                }>
                {gamedetail.website}
              </Text>
            ) : (
              <Text style={{color: 'white', marginBottom: 5}}>
                There are no website for this game
              </Text>
            )}

            <AirbnbRating
              isDisabled={true}
              readonly={true}
              showRating={false}
              count={5}
              defaultRating={metacritic(Math.round(gamedetail.metacritic / 2))}
              size={15}
              unSelectedColor={'#fff'}
            />
            {/* <Text style={{color: 'white', fontWeight: '300'}}>
              {gamedetail.description?.replace(/<\/?[^>]+(>|$)/g, '')}
            </Text> */}
          </View>
        </View>
        <View
          style={{
            height: 35,
            backgroundColor: 'rgba(8, 8, 8, 0.5)',
          }}>
          <Text
            style={{
              color: 'white',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginHorizontal: 5,
              fontWeight: 'bold',
              fontSize: 18,
              paddingVertical: 5,
              elevation: 10,
            }}>
            About
          </Text>
        </View>

        <ScrollView
          style={{
            flex: 1,

            backgroundColor: 'rgba(8,8,8,0.5)',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '300',
              marginHorizontal: 5,
              marginVertical: 5,
              textAlign: 'justify',
            }}>
            {gamedetail.description?.replace(/<\/?[^>]+(>|$)/g, '')}
          </Text>
          {loadingSS === true ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>No Image Found</Text>
            </View>
          ) : (
            <View style={{marginHorizontal: 5, marginVertical: 10}}>
              <FlatListSlider
                data={screenShoot}
                timer={5000}
                imageKey={'image'}
                local={false}
                keyExtractor={item => item.id}
                separator={0}
                loop={true}
                contentContainerStyle={{borderRadius: 10}}
                height={200}
                autoscroll={true}
                currentIndexCallback={index => console.log('Index', index)}
                indicatorContainerStyle={{
                  position: 'absolute',
                  bottom: 20,
                }}
                indicatorActiveWidth={30}
                indicator
                animation
              />
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Detail;
