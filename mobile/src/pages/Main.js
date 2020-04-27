import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native'; 
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main( {navigation} ){
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;

                setCurrentRegion({
                    latitude, 
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    }, []);

    if (!currentRegion){
        return null;
    }

    return (
    <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{latitude: -9.6987457, longitude: -36.5769928}}>
            <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/24641532?s=460&u=aac779f39774da3e5ff1d39298c937b6a97f5567&v=4' }}/>
            <Callout onPress={() => {
                navigation.navigate('Profile', { github_username: 'legeannd'});
            }}>
                <View style={styles.callout}>
                    <Text style={styles.devName}>Gean Lucas</Text>
                    <Text style={styles.devBio}>Computer Science student - Learning how to say "Hello World" in different ways</Text>
                    <Text style={styles.devTechs}>ReactJS, React Native, Node.js</Text>
                </View>
            </Callout>
        </Marker>
    </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 4
    }
})

export default Main;