import React, { useState } from "react";
import {View, Text, TouchableOpacity, Share } from "react-native"
import styles from "./style";

export default function ResultImc(props){


const onShare = async () =>{
    const result = await Share.share({
        message: "Meu IMC é:" + props.resultImc
    });
}


function PaintResult(resultImc) {
    switch (true) {
        case resultImc < 18.5:
            return {
                color: '#ADD8E6',
                classificacao: 'Magreza'
            };
        case resultImc >= 18.5 && resultImc <= 24.9:
            return {
                color: '#008000',
                classificacao: 'Normal'
            };
        case resultImc >= 25.0 && resultImc <= 29.9:
            return {
                color: '#FFA500',
                classificacao: 'Sobrepeso'
            };
        case resultImc >= 30.0 && resultImc <= 39.9:
            return {
                color: '#FF0000',
                classificacao: 'Obesidade'
            };
        case resultImc > 40.0:
            return {
                color: 'purple',
                classificacao: 'Obesidade Grave'
            };
        default:
            return {
                color: 'black',
                classificacao: 'Classificação desconhecida'
            };
    }
}

    const { color: resultColor, classificacao: textoResultado} = PaintResult(props.resultImc)

    return(
        <View style={styles.resultImc}>
            <View  style={styles.boxSharebutton}>
                <Text style={[styles.information, {color:resultColor}]}>{props.messageResultImc}</Text>
                <Text style={[styles.numberImc, {color:resultColor}]}>{props.resultImc}</Text>
                <Text style={[styles.textoResult, {color:resultColor}]}> {textoResultado}</Text>

                    <TouchableOpacity  style={styles.shared}
                        onPress={onShare}               
                    >
                    <Text style={styles.sharedText}>Compartilhar IMC</Text>
                    </TouchableOpacity> 
                    
            </View>
        </View>
    );
}