import React, {useState} from "react";
import {View, Text, TextInput, Button ,Vibration , TouchableOpacity, Keyboard , Pressable } from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){

const [height , setHeight]= useState(null);
const [weight , setWeight]= useState(null);
const [messageImc , setMessageImc]= useState("Preencha o Peso/Altura");
const [imc, setImc]= useState(null);
const [textButton , setTextButton]= useState("Calcular");
const [errorMessage , setErrorMessage] = useState(null);


// Funcao para calcular o Imc
function imcCalculator(){
    // Formatado para calculo
    let heightFormat = height.replace(",", ".");
    let weightFormat = weight.replace(",", ".");

    return setImc((weightFormat/(heightFormat*heightFormat)).toFixed(2));
}


function verificaImc(){
    if(imc == null){
        Vibration.vibrate();
        return setErrorMessage("Campo Obrigatorio*");
    } 
}

// Funcao para validar os campos e alterar textos
function validationImc(){
    
    if(height != null && weight != null){

        imcCalculator();

        setHeight(null);
        setWeight(null);

        setMessageImc("Sei Imc é igual: ");
        setTextButton("Calcular Novamente");
        setErrorMessage(null);
        
    }else{

        verificaImc();
        setImc(null)
        setTextButton("Calcular");
        setMessageImc("Preencha o Peso/Altura");
        
    }

}

    return(
        <View style={styles.formContext}>
            {imc == null ? 
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Altura</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex: 1.75"
                        keyboardType="numeric"
                    />

                    <Text style={styles.formLabel}>Peso</Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput  
                        style={styles.input} 
                        onChangeText={setWeight} 
                        value={weight}
                        placeholder="Ex: 75"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        onPress={() => validationImc()}
                        style={styles.buttonCalculator}
                            
                    >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </Pressable>
            : 
                <View style={styles.exibiResult}>
                    <ResultImc messageResultImc ={messageImc} resultImc = {imc}/>
                    <TouchableOpacity
                        onPress={() => validationImc()}
                        style={styles.buttonCalculator}
                            
                    >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            } 
        </View>      
    );
}