import React, { isValidElement, useEffect, useState } from 'react';
import tw from 'twrnc';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Dimensions
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { object, string, number} from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
let passwordSchema = object({
  length: number().min(4,"Length should be min 4 characters")
  .max(16,"Length should be max of 16 characters")
  .required("Length is Required"),
 
});
const App = () =>{
  const [password,setPassword] = useState('');
  const [ispasswordg,setIspasswordg] = useState<boolean>(false);
  const [lower,setLower] = useState<boolean>(true);
  const [upper,setUpper] = useState<boolean>(false);
  const [numbers,setNumbers] = useState<boolean>(false);
  const [symbols,setSymbol] = useState<boolean>(false);
  const [Height,setHeight] = useState<number | string>();
  const [Width,setWidth] = useState<number| string>();
  const generateCharacter = (length:number)=>{
  let character:string = "";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const number = "0123456789";
  const symbol = '!@#$%^&*()_+';
  if(upper){
    character += uppercase ;
  }
  if(lower){
    character += lowercase ;
  }
  if(numbers){
    character += number ;
  }
  if(symbols){
    character += symbol ;
  }
  const passwordResult  = CreatePassword(length,character);
  setPassword(passwordResult);
  setIspasswordg(true);
  }

const CreatePassword = (length:number,character:String)=>{
  let result = '';
  for(let i=0;i<length;i++){
    const characterIndex = Math.round(Math.random() * character.length);
    result += character.charAt(characterIndex);
  }
  return result;
}

const Reset =()=>{
  setPassword('');
  setLower(true);
  setIspasswordg(false);
  setUpper(false);
  setSymbol(false);
  setNumbers(false);

}
  useEffect(()=>{
    setHeight(Dimensions.get('window').height);
    setWidth(Dimensions.get('window').width);
  },[]);
  console.log(Height);
  console.log(Width);

  return(
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView >
        <View  style={tw`pr-4 pl-4 flex gap-2`}>
          <View style={tw`flex items-center`}>
          <Text style={tw`text-red-600 text-${responsiveFontSize(.9)} font-bold mt-2 mb-2`}>🔑Password Generator🔑</Text>
          </View>
          <Formik
       initialValues={{length:'' }}
       validationSchema={passwordSchema}
       onSubmit={values =>{
        generateCharacter(+values.length);
       }}>
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
        handleReset
       }) => (
         <>
          <View style={tw`flex flex-row items-center justify-between`}>
          <Text style={tw`text-xl`}>Password Length</Text>
          <TextInput
          value={values.length}
          keyboardType='numeric'
           onChangeText={handleChange('length')} style={tw`border text-xl rounded-md w-20`} placeholder='Ex:10'/>
          </View>
          <View style={tw`h-5`}>
          {touched.length && errors.length && (
              <Text style={tw`text-[#e80202]`}>{errors.length}</Text>
          )}
            </View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text>Include Lowercase</Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked={lower}
            onPress={()=>setLower(!lower)}
            fillColor='#238636'
            />
          </View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text>Include Uppercase</Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked={upper}
            onPress={()=>setUpper(!upper)}
            fillColor='#238636'
            />
          </View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text>Include Number</Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked={numbers}
            onPress={()=>setNumbers(!numbers)}
            fillColor='#238636'
            />
          </View>
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text>Include Symbol</Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked={symbols}
            onPress={()=>setSymbol(!symbols)}
            fillColor='#238636'
            />
          </View>
        <View style={tw`flex flex-row justify-center mt-4 gap-2`}>
        <TouchableOpacity disabled={!isValid} onPress={handleSubmit}>
          <View style={tw`bg-[#06c22b] rounded-md p-5`}>
            <Text style={tw`text-white font-bold text-xl`}>Generate Password</Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity onPress={handleReset}>
          <View  style={tw`bg-[#e80202] rounded-md p-5`}>
          <Text style={tw`text-white font-bold text-xl`}>Reset</Text>
          </View>
          </TouchableOpacity>
        </View>
         </>
       )}
     </Formik>
        </View>
        {ispasswordg?(
          <View style={tw`flex items-center mt-10 bg-[#121212] mr-4 ml-4 p-5`}>
            <Text style={tw`text-2xl text-white`} selectable>{password}</Text>
          </View>
        ):null}

        {ispasswordg?(
          <View style={[tw` flex justify-end items-center`,Style.div1]}>
          <Text style={tw`text-black text-xl font-bold`}>
            Made with ❤️ By Pritam Joardar
          </Text>
        </View>
        ):(
          <View style={[tw` flex justify-end items-center`,Style.div]}>
          <Text style={tw`text-black text-xl font-bold`}>
            Made with ❤️ By Pritam Joardar
          </Text>
        </View>
        )}
        
      </SafeAreaView>
    </ScrollView>
  )
  }

const Style = StyleSheet.create({
  div:{
    height:responsiveHeight(49),    
  },
  div1:{
    height:responsiveHeight(35),    
  }
})
export default App;