import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, useAnimatedValue } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const addresses = [
    { latitude: -23.563210, longitude: -46.654250, title: "Ponto A" },
    { latitude: -23.562408, longitude: -46.655641, title: "Ponto B" },
    // Adicione mais endereços conforme necessário
  ];

  const [lat, setLat] = useState(-23.563210);
  const [long, setLong] = useState(-46.654250);


  const pegarLocalizacao = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permissão para acessar a localização foi negada');
            return;
        }
        const options = {
            accuracy: Location.Accuracy.Highest,
            maximumAge: 1000 // Considera as localizações obtidas nos últimos 1 segundo
        };

        var loc = await Location.getCurrentPositionAsync(options);
        var latitude = loc.coords.latitude;
        var longitude = loc.coords.longitude;
        setLat(latitude);
        setLong(longitude);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.563210,
          longitude: -46.654250,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {addresses.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.title}
          />
        ))}

          <Marker
            key={3}
            coordinate={{ latitude: lat, longitude: long }}
            title="Você esta aqui"
          />

      </MapView>
      <button onPress={pegarLocalizacao}>Atualizar Local</button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '60%',
  },
});
