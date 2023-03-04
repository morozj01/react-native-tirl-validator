/*eslint-disable react-hooks/exhaustive-deps*/
/*eslint-disable react-native/no-inline-styles*/
import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  Platform,
} from 'react-native';

import { TirlValidator } from 'tirl-validator';

import {
  Camera,
  CameraPermissionStatus,
  CameraDevice,
} from 'react-native-vision-camera';

import fs from 'react-native-fs';

const App = () => {
  const [cameraPermission, setCameraPermission] = React.useState(
    'not-determined' as CameraPermissionStatus
  );

  const [cameraDevice, setCameraDevice] = React.useState<
    CameraDevice | undefined
  >(undefined);

  const [scanningActive, setScanningActive] = React.useState(false);

  const [validatorResponse, setValidatorResponse] = React.useState<
    | {
        labelId?: string;
        scanDone?: string;
        scanRight?: string;
        scanLeft?: string;
        valid?: boolean;
      }
    | undefined
  >(undefined);

  const intervalRef = useRef<NodeJS.Timer | undefined>(undefined);

  const ref = useRef<Camera>(null);

  const { current: tirlValidator } = useRef(
    //Iterati community endpoint
    new TirlValidator('https://dev.iterati.art')
  );

  //Check camera permissions on load
  useEffect(() => {
    async function checkCameraPermissions() {
      const permission = await Camera.getCameraPermissionStatus();
      setCameraPermission(permission);
    }

    checkCameraPermissions();
  }, []);

  //Get available camera device
  useEffect(() => {
    async function getAvailableDevices() {
      const devices = await Camera.getAvailableCameraDevices();
      setCameraDevice(devices[0]);
    }

    if (cameraPermission === 'authorized') getAvailableDevices();
  }, [cameraPermission]);

  useEffect(() => {
    async function scan() {
      if (scanningActive) {
        //Set interval ref to interval ID
        intervalRef.current = setInterval(
          async () => {
            //Take photo
            const photo =
              Platform.OS === 'android'
                ? await ref?.current?.takeSnapshot()
                : await ref?.current?.takePhoto();

            //Pass in path to photo as input for tirl-validator
            const result = await tirlValidator.validate(photo?.path as string);

            //Scan complete. End image capture && log result
            if (result.scanDone) {
              clearInterval(intervalRef.current);
              intervalRef.current = undefined;
              setScanningActive(false);
              console.log(`The result of this scan is ${result.valid}`);
            }

            //See https://github.com/ZKLadder/tirl-validator#readme for more detail on handling common error types
            if (result.error) {
              console.log(result.error.code, result.error.message);
              //Handle error
              return;
            }

            //Set response as state for display
            setValidatorResponse(result);

            //Good practice to delete captured images on every invocation
            await fs.unlink(photo?.path as string);
          },
          //Capture new image every half second
          500
        );
      }

      if (!scanningActive) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    }

    scan();
  }, [scanningActive]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={{ height: '100%' }}>
        <View
          style={{
            height: '60%',
            borderBottomWidth: 1,
          }}
        >
          {cameraPermission === 'not-determined' ? <ActivityIndicator /> : null}

          {cameraPermission === 'authorized' && cameraDevice ? (
            <Camera
              ref={ref}
              style={StyleSheet.absoluteFill}
              device={cameraDevice}
              isActive={true}
              photo={true}
            />
          ) : null}

          {cameraPermission === 'denied' ||
          cameraPermission === 'restricted' ? (
            <Text style={{ fontSize: 14, margin: 5 }}>
              Please manually grant camera permission in your device's settings
              and reload app
            </Text>
          ) : null}
        </View>

        <ScrollView>
          {scanningActive ? (
            <Button
              title="End Capture"
              onPress={() => {
                setScanningActive(false);
              }}
            />
          ) : (
            <Button
              title="Start Capture"
              onPress={() => {
                setScanningActive(true);
              }}
            />
          )}

          <Text style={{ fontSize: 14, margin: 5 }}>
            {JSON.stringify(validatorResponse, null, 4)}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;
