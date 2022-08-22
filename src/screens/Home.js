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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {FlatGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [index, setIndex] = useState(0);
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

  const api_key = '8389aa7c48574208963de2cf90cabcaa';

  const Loading = () => (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{color: 'black'}}>Loading....</Text>
    </View>
  );

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const responseDariRAWG = await axios.get(
          `https://api.rawg.io/api/games?key=${api_key}`,
        );
        const gameArray = await Promise.all(responseDariRAWG.data.results);
        setGames(gameArray);
      } catch (error) {
        console.log(error);
      }
    };

    if (games.length === 0) {
      fetchGames();
    }
  }, [games]);

  if (games.length === 0) {
    return <Loading />;
  }
  const screenWidth = Math.round(Dimensions.get('window').width);
  const banner = games.slice(0, 3);
  return (
    <View
      style={{
        backgroundColor: '#1C3F60',
        flex: 1,
      }}>
      <StatusBar backgroundColor="black" />

      <View style={{marginHorizontal: 10, marginVertical: 5}}>
        <FlatListSlider
          data={banner}
          timer={5000}
          imageKey={'background_image'}
          local={false}
          width={screenWidth}
          keyExtractor={item => item.id}
          separator={0}
          loop={true}
          contentContainerStyle={{borderRadius: 10}}
          height={200}
          autoscroll={true}
          currentIndexCallback={index => console.log('Index', index)}
          onPress={item => alert(JSON.stringify(item))}
          indicatorContainerStyle={{
            position: 'absolute',
            bottom: 20,
          }}
          indicatorActiveWidth={30}
          indicator
          animation
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
                style={{
                  marginHorizontal: 4,
                  elevation: 10,
                  maxHeight: 45,
                  marginTop: 10,
                }}>
                <View
                  key={isi}
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

      <FlatGrid
        data={games}
        keyExtractor={item => item.id}
        style={{flex: 1, borderRadius: 5}}
        renderItem={({item}) => {
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
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default Home;
