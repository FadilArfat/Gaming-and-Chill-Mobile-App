import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  InteractionManager,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from 'axios';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {FlatGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Banner from './component/Banner';
import {useDispatch, useSelector} from 'react-redux';
import {addUserData, getAllData} from '../context/SliceUser';
import firestore from '@react-native-firebase/firestore';
import {auth} from '../authentication/firebase';
import HomeSkeleton from './skeleton/HomeSkeleton';
import {newGames} from '../api/defaultVal';
import Banner1 from '../images/Banner.png';
import Banner2 from '../images/Banner1.png';
import Banner3 from '../images/Banner2.png';

function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const list = useSelector(getAllData);
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [didFinishInitialAnimation, setdidFinishInitialAnimation] =
    useState(false);

  const genre = [
    {name: 'action', filter: `&genres=4`},
    {name: 'indie', filter: `&genres=51`},
    {name: 'adventure', filter: `&genres=3`},
    {name: 'rpg', filter: `&genres=5`},
    {name: 'strategy', filter: `&genres=10`},
    {name: 'shooter', filter: `&genres=2`},
    {name: 'casual', filter: `&genres=40`},
    {name: 'simulation', filter: `&genres=14`},
    {name: 'puzzle', filter: `&genres=11`},
    {name: 'arcade', filter: `&genres=51`},
    {name: 'platformer', filter: `&genres=83`},
    {name: 'racing', filter: `&genres=1`},
    {name: 'sports', filter: `&genres=15`},
    {name: 'fighting', filter: `&genres=6`},
  ];

  const api_key = ''; //ADD YOUR OWN RAWG API

  const Loading = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#0B1320',
      }}>
      <HomeSkeleton />
    </View>
  );

  const getData = async () => {
    try {
      const users = await firestore()
        .collection('favorites')
        .doc(auth.currentUser.uid)
        .get();
      const pas = users.data();
      dispatch(addUserData(pas));
    } catch (error) {
      console.log(error);
    }
  };

  //OPTIMIZE FLATGRID

  //CLOSE OPTIMIZE FLATGRID

  const componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setdidFinishInitialAnimation(true);
    });
  };

  const ITEM_HEIGHT = 200;

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Detail', {
            paramKey: item.id,
          })
        }
        style={{backgroundColor: 'white', height: 200, borderRadius: 10}}>
        <Image
          source={{uri: item.background_image}}
          style={{
            position: 'absolute',
            width: 165,
            height: 200,
            borderRadius: 10,
          }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.0)', 'rgb(0,0,0)']}
          style={styles.linearGradient}>
          <Text
            style={{
              color: 'white',
              flex: 1,
              justifyContent: 'flex-end',
              textAlignVertical: 'bottom',
              paddingHorizontal: 5,
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback(item => item.id.toString(), []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const responseDariRAWG = await axios.get(
          `https://api.rawg.io/api/games?key=${api_key}${newGames}${genres}`,
          {
            params: {
              _limit: 20,
            },
          },
        );
        const gameArray = responseDariRAWG.data.results;
        setGames(gameArray);
      } catch (error) {
        alert('Network Error');
        console.log(error);
      }
    };

    if (games.length === 0 || genre.length > 0) {
      fetchGames();
      componentDidMount();
    }

    auth.onAuthStateChanged(user => {
      if (user) {
        getData();
      } else {
        navigation.navigate('Login');
      }
    });
  }, [genres, list]); //list

  if (games.length === 0) {
    return <Loading />;
  }

  const banner = [
    {
      key: 1,
      background_image:
        'https://firebasestorage.googleapis.com/v0/b/dts-final-project-d650a.appspot.com/o/Banner.png?alt=media&token=e7a0482f-159e-4061-9ec9-aed8718cb24f',
    },
    {
      key: 2,
      background_image:
        'https://firebasestorage.googleapis.com/v0/b/dts-final-project-d650a.appspot.com/o/Banner1.png?alt=media&token=1ad9ccdf-0266-42da-8f2f-b5fc4687c79a',
    },
    {
      key: 3,
      background_image:
        'https://firebasestorage.googleapis.com/v0/b/dts-final-project-d650a.appspot.com/o/Banner2.png?alt=media&token=776b161f-7709-41d0-91e9-70f8259e35d4',
    },
  ];

  return (
    <View
      style={{
        backgroundColor: '#0B1320',
        flex: 1,
      }}>
      <StatusBar backgroundColor="black" />

      <View>
        <FlatListSlider
          data={banner}
          timer={5000}
          imageKey={'background_image'}
          local={false}
          loop={false}
          component={<Banner />}
          autoscroll={true}
          // currentIndexCallback={index => console.log('Index', index)}
          onPress={item => alert(JSON.stringify(item))}
          indicatorContainerStyle={{
            position: 'absolute',
            bottom: 20,
          }}
          indicatorActiveWidth={30}
          indicator
        />
      </View>

      <View
        style={{
          height: 60,
        }}>
        <ScrollView horizontal={true}>
          {genre?.map(isi => {
            return (
              <TouchableOpacity
                key={isi.name}
                onPress={() => setGenres(isi.filter)}
                style={{
                  marginHorizontal: 4,
                  elevation: 10,
                  maxHeight: 45,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    borderRadius: 12,
                    padding: 10,
                    backgroundColor: '#0B1320',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      textAlignVertical: 'top',
                    }}>
                    {isi.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <Text style={{color: 'white', marginHorizontal: 10, fontSize: 18}}>
        Favorite Games
      </Text>

      {didFinishInitialAnimation && (
        <FlatGrid
          data={games}
          getItemLayout={getItemLayout}
          keyExtractor={keyExtractor}
          style={{flex: 1, borderRadius: 5}}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
});

export default Home;
