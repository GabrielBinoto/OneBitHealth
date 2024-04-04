import React, {useState} from "react";
import {View, Text, TextInput, Vibration, TouchableOpacity, Keyboard, Pressable, FlatList } from "react-native"
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){

const [height , setHeight]= useState(null);
const [weight , setWeight]= useState(null);
const [messageImc , setMessageImc]= useState("Preencha o Peso/Altura");
const [imc, setImc]= useState(null);
const [textButton , setTextButton]= useState("Calcular");
const [errorMessage , setErrorMessage] = useState(null);
const [imcList , setImcList] = useState([])

function formatarData(milliseconds) {
    const data = new Date(milliseconds);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}



// Funcao para calcular o Imc
function imcCalculator(){
    // Formatado para calculo
    let heightFormat = height ? height.replace(",", ".") : null;
    let weightFormat = weight ? weight.replace(",", ".") : null;
    
    if (heightFormat && weightFormat) {
        let totalImc = (weightFormat / (heightFormat * heightFormat)).toFixed(2);
        
        setImc(totalImc);
        setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
    } else {
        // Lidar com cenário em que altura ou peso são nulos
        setImc(null);
        setImcList([]);
    }
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

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={styles.listImc}
                        data={imcList.reverse()}
                        renderItem={({item}) => {
                            return (
                                <View>
                                    <Text style={styles.resultImcItem}>Data:<Text style={styles.textResulItemListData}>{formatarData(item.id)}</Text> </Text>
                                    
                                    <Text style={styles.textResulItemList}>  Resultado IMC: <Text style={styles.totalIMC}>{item.imc}</Text></Text>

                                </View>
                            ) 
                        }}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            } 

        </View>      
    );
}