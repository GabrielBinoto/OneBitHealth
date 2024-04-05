import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default function Tabela() {

  return (
    <View style={styles.textoTabela}>
        <Text style={styles.textoMagreza}>Menor que 18,5 - Magreza</Text>
        <Text style={styles.textoNormal}>Entre 18,5 e 24,9 - Normal</Text>
        <Text style={styles.textoSobrepeso}>Entre 25,0 e 29,9 - Sobrepeso</Text>
        <Text style={styles.textoObesidade}>Entre 30,0 e 39,9 - Obesidade</Text>
        <Text style={styles.textoObesidadeGrave}>Maior que 40,0 - Obesidade Grave</Text>
    </View>
  );
  
}