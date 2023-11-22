import React, { Fragment } from "react"
import { View } from "react-native"
import Tailwind from "../../libs/tailwind/Tailwind.lib"

const Spacer = ({ width, height }) => {
    return (
        <Fragment>
            <View style={ Tailwind`w-${ width } h-${ height }` }/>
        </Fragment>
    )
}

export default Spacer