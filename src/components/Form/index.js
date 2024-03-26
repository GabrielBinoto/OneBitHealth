import React, {useState} from "react";
import {View, Text, TextInput, Button , TouchableOpacity } from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){

const [height , setHeight]= useState(null);
const [weight , setWeight]= useState(null);
const [messageImc , setMessageImc]= useState("Preencha o Peso/Altura");
const [imc, setImc]= useState(null);
const [textButton , setTextButton]= useState("Calcular");

// Funcao para calcular o Imc
function imcCalculator(){
    return setImc((weight/(height*height)).toFixed(2));
}

// Funcao para validar os campos e alterar textos
function validationImc(){
    if(height != null && weight != null){
        imcCalculator();

        setHeight(null);
        setWeight(null);

        setMessageImc("Sei Imc é igual: ");
        setTextButton("Calcular Novamente");
        return
    }
    
    setImc(null)
    setTextButton("Calcular");
    setMessageImc("Preencha o Peso/Altura");

}

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>

                <Text style={styles.formLabel}>Altura</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <TextInput  
                    style={styles.input} 
                    onChangeText={setWeight} 
                    value={weight}
                    placeholder="Ex: 75"
                    keyboardType="numeric"
                />
                {/* <Button onPress={() => validationImc()} title={textButton}/> */}
                
                <TouchableOpacity
                    onPress={() => validationImc()}
                    style={styles.buttonCalculator}
                    
                >
                <Text style={styles.textButtonCalculator}>{textButton}</Text>

                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc ={messageImc} resultImc = {imc}/>
        </View>
    );
}