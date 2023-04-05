import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

const schoolsURL = "https://data.cityofnewyork.us/resource/s3k6-pzi2.json";

const detailsURL = "https://data.cityofnewyork.us/resource/f9bf-2cp4.json";

const schoolIcon = "🏫";

itemSeparator = () => {
  return <View style={styles.separator} />
}

const Home = (props) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(schoolsURL)
      .then((response) => response.json()) //get data from JSON
      .then((json) => setData(json)) //set JSON data
      .catch((error) => alert(error)) //check for errors
      .then(setLoading(false)); //stop loading
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (<ActivityIndicator />) : (
        <View>
          <FlatList
            data={data}
            // ItemSeparatorComponent={itemSeparator}
            keyExtractor={item => item.dbn.toString()} //unique IDs for list elements
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => props.navigation.navigate('Details', { item })}>
                <Text style={styles.icon}>{schoolIcon}</Text>
                <Text style={{ textAlign: 'justify', width: '80%', color: 'gray' }}>{item.school_name}</Text>
                <View>
                  {/* {item.school_name} */}

                </View>
              </TouchableOpacity>
            )}
          />
        </View>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC',
  },
  icon: {
    fontSize: 50,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  card: {
    width: '97%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 3,
    backgroundColor: '#fff',
    shadowRadius: 3.84,
    margin: 5,
    elevation: 5,
  }
});

export default Home;