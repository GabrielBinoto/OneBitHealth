import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    formContext:{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingTop: 30,
        marginTop:30,

    },

    form:{
        width: "100%",
        height: "auto",
    },

    formLabel:{
        color:"#000000",
        fontSize: 18,
        paddingLeft: 20,
    },

    input:{
        width: "90%",
        borderRadius: 50,
        backgroundColor: "#f6f6f6",
        height: 40,
        margin: 12,
        paddingLeft: 10,
    },

    buttonCalculator:{
        borderRadius: 50,
        alignItems: "center",
        width: "60%",
        backgroundColor: "#ff0043",
        paddingTop: 14,
        paddingBottom: 14,
        marginBottom:5,
        marginLeft: 90,
    },

    textButtonCalculator:{
        fontSize: 16,
        color: "#ffffff",
    },

    errorMessage:{
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        paddingLeft: 20,
    },

    exibiResult:{
        width: "100%",
        height: "100%",
    },

    listImc:{
        paddingLeft:20,
        borderTopWidth:2,
        borderRadius:10,
        borderColor:"red",
        marginTop:20,
        height:"20%",
        marginBottom:20,
    },

    resultImcItem:{
        paddingTop: 20,
        color: "black",
        fontSize:20,
        height:50,
        width: "100%",
        marginLeft:10,
    },

    textResulItemList:{
        fontSize: 18,
        color: "black",

    },

    textResulItemListData:{
        fontSize:18,
        color:"#b94866",
    },

    totalIMC:{
        color:"#b94866",
        fontSize:18,
    },

    textoResult:{
        fontSize: 22,
        fontWeight: 'bold',
    }


});

export default styles