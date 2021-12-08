import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Filter1 from "./filters/filter1";
import Filter2 from "./filters/filter2";
import Filter3 from "./filters/filter3";
import Filter4 from "./filters/filter4";

let data = [
  {
    id: "1",
    image: require("../assets/Frapp-00.png"),
  },
  {
    id: "2",
    image: require("../assets/Frapp-01.png"),
  },
  {
    id: "3",
    image: require("../assets/Frapp-02.png"),
  },
  {
    id: "4",
    image: require("../assets/Frapp-03.png"),
  },
];

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
      currentFilter: "filter1",
    };
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
  }

  onCameraPermission = (status) => {
    this.setState({ hasCameraPermission: status.status === "granted" });
  };

  onFacesDetected = (faces) => {
    this.setState({ faces: faces });
  };

  onFaceDetectionError = (error) => {
    console.log(error);
  };
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to Camera!</Text>
        </View>
      );
    }
    console.log(this.state.faces);
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.headingContainer}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Text style={styles.titleText1}>LENS</Text>
            <Text style={styles.titleText2}>STORE</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Text style={styles.subheading1}>😎 Try Our</Text>
            <Text style={styles.subheading2}> Cool Frames 😎</Text>
          </View>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all,
            }}
            onFacesDetected={this.onFacesDetected}
            onFaceDetectionError={this.onFaceDetectionError}
          />
          {this.state.faces.map((face) => {
            if (this.state.currentFilter === "filter1") {
              return <Filter1 key={face.faceID} face={face} />;
            } else if (this.state.currentFilter === "filter2") {
              return <Filter2 key={face.faceID} face={face} />;
            } else if (this.state.currentFilter === "filter3") {
              return <Filter3 key={face.faceID} face={face} />;
            } else if (this.state.currentFilter === "filter4") {
              return <Filter4 key={face.faceID} face={face} />;
            }
          })}
        </View>
        <View style={styles.framesContainer}>
          <ScrollView
            style={{
              flexDirection: "row",
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {data.map((filterData) => {
              return (
                <TouchableOpacity
                  style={styles.filterImageContainer}
                  onPress={() => {
                    this.setState({ currentFilter: `filter${filterData.id}` });
                  }}
                >
                  <Image
                    source={filter_data.image}
                    style={{
                      height: 32,
                      width: 80,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6278e4",
  },
  titleText1: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "#efb141",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  titleText2: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "white",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  subheading1: {
    fontSize: RFValue(20),
    color: "#efb141",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  subheading2: {
    fontSize: RFValue(20),
    color: "white",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  cameraStyle: {
    flex: 0.65,
  },
  framesContainer: {
    flex: 0.2,
    paddingLeft: RFValue(20),
    paddingRight: RFValue(20),
    paddingTop: RFValue(30),
    backgroundColor: "#6278e4",
  },
  filterImageContainer: {
    height: RFPercentage(8),
    width: RFPercentage(15),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4e7f8",
    borderRadius: 30,
    marginRight: 20,
  },
});
