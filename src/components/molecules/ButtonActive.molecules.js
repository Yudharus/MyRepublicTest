import React from 'react'
import Tailwind from '../../libs/tailwind/Tailwind.lib'
import Text from '../atoms/Text.atom';
import { TouchableOpacity, ActivityIndicator } from 'react-native';


const ButtonActive = ({ className, classNameText, text, onPress, isLoading }) => {
  return (
    <TouchableOpacity style={Tailwind`${className}`} onPress={onPress}>
      <Text className={classNameText}>{text}</Text>
      {
        isLoading ? <ActivityIndicator style={Tailwind`ml-2`} color="#FFF5F2" /> : null
      }
    </TouchableOpacity>
  )
}

export default ButtonActive