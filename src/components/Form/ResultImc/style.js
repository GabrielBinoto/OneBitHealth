import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    resultImc:{
        flex:1,
        marginTop:15,
        paddingTop:60,
        borderRadius:50,
        alignItems: "center",
        width:"100%",

    },

    numberImc:{
        fontSize:18,
        color:"#ff0043",
        fontWeight:"bold",
        paddingBottom:20,
    },

    information:{
        fontSize:18,
        color:"#ff0043",
        fontWeight:"bold",
    },
    
    boxSharebutton:{
        width:"100%",
        alignItems: "center",
        marginBottom:10,
    },

    shared:{
        backgroundColor: "#1877f2",
        borderRadius:50,
        paddingBottom:5,
        paddingTop:5,
        textAlign:"center",

    },  

    sharedText:{
        color: "#ffffff",
        fontWeight: "bold",
        paddingHorizontal: 30,
    },

    textoResult:{
        fontSize:24,
        paddingBottom: 20,
    }


});

export default styles