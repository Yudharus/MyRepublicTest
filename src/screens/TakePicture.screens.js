import React, { useRef, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Camera, PhotoFile, TakePhotoOptions, useCameraDevice } from 'react-native-vision-camera'
import View from '../components/atoms/View.atom';
import Tailwind from '../libs/tailwind/Tailwind.lib';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';

const TakePicture = ({ navigation, changeData, data }) => {
    const [type, setType] = useState("back")
    const camera = useRef(null);
    const device = useCameraDevice(type);

    const handleTypeCamera = () => {
        if (type == "back") {
            setType("front")
        } else {
            setType("back")
        }
    }

    const capturePhoto = async () => {
        const photo = await camera.current.takePhoto({});
        Geolocation.getCurrentPosition(info =>
            changeData({ ...data, latitude: info.coords.latitude, longitude: info.coords.longitude, dateTime: moment().format('MMMM Do YYYY, h:mm:ss a'), imagePath: photo.path, isMock: info.mocked.toString() })
        );
        navigation.replace("Home")
    };

    return (
        <View className="flex-1">
            <Camera
                ref={camera}
                style={Tailwind`flex-1`}
                device={device}
                isActive={true}
                photo={true}
            />
            <View className="w-full flex-row items-center justify-between absolute bottom-10 px-4">
                <TouchableOpacity onPress={handleTypeCamera}>
                    <View className="rounded-full h-18 w-18 bg-primary--green border-2 border-grey items-center justify-center">
                        <Image source={require('../assets/flip.png')} style={Tailwind`w-12 h-12`} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={capturePhoto}>
                    <View className="rounded-full h-18 w-18 bg-primary--green border-4 border-grey" />
                </TouchableOpacity>
                <View className="rounded-full h-18 w-18" />
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        data: state.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeData: (value) => dispatch({ type: 'CHANGE_DATA', newValue: value }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TakePicture);