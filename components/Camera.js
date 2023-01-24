import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [debug, setDebug] = useState([]);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={{ flex: 1, minHeight: 500 }}>
      {debug.length ?
        debug.map((item, i) => (
          <Text key={i}>{item}</Text>
        ))
        :
        <Text>''</Text>
      }
      <View>
        <Text>Image Below!!!!</Text>
        <Image style={{ minHeight: 500 }} source={{ uri: photo }} />
      </View>
      <Camera style={{ flex: 1, minHeight: 500 }} type={type} ref={ref => {
        setCameraRef(ref);
      }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={async () => {

            if (cameraRef) {
              let photo = await cameraRef.takePictureAsync();
              setDebug([...debug, 'photo uri', photo.uri, ...Object.keys(photo)]);
              setPhoto(photo.uri);
              props.setPhoto(photo.uri);
            }
          }}>
            <View style={{
              borderWidth: 2,
              borderRadius: "50%",
              borderColor: 'white',
              height: 50,
              width: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
              <View style={{
                borderWidth: 2,
                borderRadius: "50%",
                borderColor: 'white',
                height: 40,
                width: 40,
                backgroundColor: 'white'
              }} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraComponent;