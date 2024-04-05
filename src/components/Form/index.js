import React, { useState } from "react";
import { View, Text, TextInput, Vibration, TouchableOpacity, Keyboard, Pressable, FlatList } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";
import Tabela from "./Tabela";

export default function Form() {
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o Peso/Altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);
    const [imcList, setImcList] = useState([]);
    const [classificationList, setClassificationList] = useState([]);

    function formatarData(milliseconds) {
        const data = new Date(milliseconds);
        const dia = String(data.getDate()).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function imcCalculator() {
        let heightFormat = height ? height.replace(",", ".") : null;
        let weightFormat = weight ? weight.replace(",", ".") : null;

        if (heightFormat && weightFormat) {
            let totalImc = (weightFormat / (heightFormat * heightFormat)).toFixed(2);

            setImc(totalImc);
            setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
            updateClassification(totalImc);
        } else {
            setImc(null);
            setImcList([]);
            setClassificationList([]);
        }
    }

    function updateClassification(resultImc) {
        let classificationResult = PaintResult(resultImc);
        setClassificationList((arr) => [
            { id: new Date().getTime(), classification: classificationResult.classificacao, color: classificationResult.color },
            ...arr,
        ]);
    }

    function PaintResult(resultImc) {
        switch (true) {
            case resultImc < 18.5:
                return {
                    color: "#ADD8E6",
                    classificacao: "Magreza",
                };
            case resultImc >= 18.5 && resultImc <= 24.9:
                return {
                    color: "#008000",
                    classificacao: "Normal",
                };
            case resultImc >= 25.0 && resultImc <= 29.9:
                return {
                    color: "#FFA500",
                    classificacao: "Sobrepeso",
                };
            case resultImc >= 30.0 && resultImc <= 39.9:
                return {
                    color: "#FF0000",
                    classificacao: "Obesidade",
                };
            case resultImc > 40.0:
                return {
                    color: "purple",
                    classificacao: "Obesidade Grave",
                };
            default:
                return {
                    color: "black",
                    classificacao: "Classificação desconhecida",
                };
        }
    }

    function verificaImc() {
        if (imc == null) {
            Vibration.vibrate();
            return setErrorMessage("Campo Obrigatorio*");
        }
    }

    function validationImc() {
        if (height != null && weight != null) {
            imcCalculator();
            setHeight(null);
            setWeight(null);
            setMessageImc("Seu Imc é igual: ");
            setTextButton("Calcular Novamente");
            setErrorMessage(null);
        } else {
            verificaImc();
            setImc(null);
            setTextButton("Calcular");
            setMessageImc("Preencha o Peso/Altura");
        }
    }

    return (
        <View style={styles.formContext}>
            {imc == null ? (
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
                    <Tabela style={styles.textoTabela} />
                </Pressable>
            ) : (
                <View style={styles.exibiResult}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} classificacao={classificationList} />
                    <TouchableOpacity
                        onPress={() => validationImc()}
                        style={styles.buttonCalculator}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={styles.listImc}
                        data={imcList}
                        renderItem={({ item, index }) => {
                            const classificationIndex = classificationList.length - index - 1;
                            return (
                                <View>
                                    <Text style={styles.resultImcItem}>*Data:
                                        <Text style={styles.textResulItemListData}>
                                            {formatarData(item.id)}
                                        </Text>{" "}
                                    </Text>

                                    <Text style={styles.textResulItemList}>
                                        Resultado IMC:
                                        <Text style={styles.totalIMC}> {item.imc}</Text>
                                    </Text>
                                    <Text
                                        style={[
                                            styles.textResulItemList,
                                            {
                                                color:
                                                    classificationList[classificationIndex]?.color || "black",
                                            },
                                        ]}
                                    >
                                        {classificationList[classificationIndex]?.classification}
                                    </Text>
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
        </View>
    );
}
