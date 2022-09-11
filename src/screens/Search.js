import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FlatGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

function Search() {
  const navigation = useNavigation();
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, isLoading] = useState(false);

  const api_key = '247f561e517b4dde96fe9ed3496c64ff';

  useEffect(() => {
    const fetchGames = async () => {
      try {
        isLoading(true);
        const responseDariRAWG = await axios.get(
          `https://api.rawg.io/api/games?key=${api_key}${search}`,
        );
        const gameArray = await Promise.all(responseDariRAWG.data.results);
        setGames(gameArray);
        isLoading(false);
      } catch (error) {
        isLoading(false);
        console.log(error);
      }
    };
    if (search.length > 0) {
      fetchGames();
    }
  }, [search]);

  return (
    <View
      style={{
        backgroundColor: '#0B1320',
        flex: 1,
      }}>
      <StatusBar backgroundColor="black" />
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TextInput
          placeholder="Search game here"
          placeholderTextColor={'black'}
          style={styles.input}
          onChangeText={e => setSearch(`&search=${e}`)}
          inlineImageLeft="search"
          inlineImagePadding={5}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'white', marginHorizontal: 10, fontSize: 18}}>
          Results
        </Text>
        {loading === true ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : null}
      </View>

      {search.length === 0 ? (
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            No result 😞
          </Text>
        </View>
      ) : (
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
                style={{
                  backgroundColor: 'white',
                  height: 200,
                  borderRadius: 10,
                }}>
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
          }}
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
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    color: 'black',
  },
});

export default Search;
