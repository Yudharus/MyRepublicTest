import React, { useEffect, useState } from 'react'
import View from '../components/atoms/View.atom'
import Text from '../components/atoms/Text.atom'
import ButtonActive from '../components/molecules/ButtonActive.molecules'
import { Image, PermissionsAndroid, Linking, ScrollView } from 'react-native'
import Tailwind from '../libs/tailwind/Tailwind.lib'
import { Camera, PhotoFile, TakePhotoOptions, useCameraDevice } from 'react-native-vision-camera'
import { connect } from 'react-redux'
import Exif from 'react-native-exif'

const Home = ({ navigation, data }) => {
    const [exifData, setExifData] = useState([])
    useEffect(() => {
        async function getPermission() {
            const permission = await Camera.requestCameraPermission();
            if (permission === 'denied') await Linking.openSettings();
        }
        getPermission();
        requestLocationPermission()
    }, []);

    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Test Case',
                    'message': 'Test Case App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
            } else {
                console.log("location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }


    const getMetaData = () => {
        Exif.getExif(data.imagePath)
            .then(msg => setExifData(JSON.stringify(msg)))
            .catch(msg => console.log('ERROR: ' + msg))
    }

    return (
        <ScrollView style={Tailwind`bg-white px-6 py-6`}>
            <View className="bg-black w-full h-40 rounded-lg">
                <Image source={{ uri: 'file://' + data.imagePath }} style={Tailwind`w-full h-full rounded-lg`} />
                {
                    data.imagePath == "" ?
                        null :
                        <Image source={require('../assets/myRepublic.png')} style={Tailwind`w-20 h-20 absolute right-3 bottom-0`} resizeMethod='resize' resizeMode='contain' />
                }

            </View>
            <View className="mt-8">
                <View className="flex-row items-cente justify-evenly mb-6">
                    <ButtonActive
                        className="bg-primary--green px-2 py-8 rounded-md items-center justify-center"
                        text="Take a Photo"
                        classNameText="text-white text-base font-semibold"
                        onPress={() => navigation.push("TakePicture")} />
                    <ButtonActive
                        className="bg-primary--green px-2 py-8 rounded-md items-center justify-center"
                        text="Get Metadata"
                        classNameText="text-white text-base font-semibold"
                        onPress={() => getMetaData()} />

                </View>
                <Text className="text-black text-base font-semibold">Photo Information</Text>
                <View className="mb-20">
                    <View className="items-center justify-between flex-row mt-4">
                        <Text className="text-black text-sm font-normal ">Datetime : </Text>
                        <Text className="text-black text-sm font-normal">{data.dateTime}</Text>
                    </View>
                    <View className="items-center justify-between flex-row mt-4">
                        <Text className="text-black text-sm font-normal ">Latitude : </Text>
                        <Text className="text-black text-sm font-normal">{data.latitude == 0 ? "" : data.latitude}</Text>
                    </View>
                    <View className="items-center justify-between flex-row mt-4">
                        <Text className="text-black text-sm font-normal ">Longitude : </Text>
                        <Text className="text-black text-sm font-normal">{data.longitude == 0 ? "" : data.longitude}</Text>
                    </View>
                    <View className="items-center justify-between flex-row mt-4">
                        <Text className="text-black text-sm font-normal ">Mock Location : </Text>
                        <Text className="text-black text-sm font-normal">{data.isMock}</Text>
                    </View>
                    <View className="flex-col mt-4 ">
                        <Text className="text-black text-sm font-normal mb-4">Exif Data : </Text>
                        <Text className="text-black text-sm font-normal">{exifData.length == 0 ? "" : exifData}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        data: state.data,
    };
};

export default connect(mapStateToProps, null)(Home);