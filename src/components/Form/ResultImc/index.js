import React, { useState } from "react";
import {View, Text, TouchableOpacity, Share } from "react-native"
import styles from "./style";

export default function ResultImc(props){

    const lastClassification = props.classificacao.length > 0 ? props.classificacao[0] : null;
    const resultColor = lastClassification ? lastClassification.color : 'black';

const onShare = async () =>{
    const result = await Share.share({
        message: "Meu IMC é:" + props.resultImc
    });
}

    return(
        <View style={styles.resultImc}>
            <View  style={styles.boxSharebutton}>
                <Text style={[styles.information, {color:{props}}]}>{props.messageResultImc}</Text>
                <Text style={[styles.numberImc, {color:resultColor}]}>{props.resultImc}</Text>
                <Text style={[styles.textoResult, {color:resultColor}]}> {props.classificacao.length > 0 ? props.classificacao[0].classification : ''}</Text>

                    <TouchableOpacity  style={styles.shared}
                        onPress={onShare}               
                    >
                    <Text style={styles.sharedText}>Compartilhar IMC</Text>
                    </TouchableOpacity> 
            </View>
        </View>
    );
}