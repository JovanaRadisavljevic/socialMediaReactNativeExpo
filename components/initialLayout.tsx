import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';


export default function InitialLayout() {
  const {isLoaded,isSignedIn} = useAuth();
  const segments = useSegments();
  //vraca mi gde sam trenutno
  //ako sam u home /
  // /(auth)/login
  // /notifications
  const router = useRouter();

//test
useEffect(() => {
  (async () => {
    try {
      await SecureStore.setItemAsync('test_key', 'test_value');
      const test = await SecureStore.getItemAsync('test_key');
      console.log('✅ SecureStore test:', test);
    } catch (error) {
      console.error('❌ SecureStore test failed:', error);
    }
  })();
}, []);

  useEffect(()=>{
    console.log("🟢 isLoaded:", isLoaded);
  console.log("🟢 isSignedIn:", isSignedIn);
  console.log("🟢 segments:", segments);
    if(!isLoaded) return
    const inAuthScreen = segments[0]==="(auth)"
    if(!isSignedIn && !inAuthScreen)
        router.replace("/(auth)/login")
    else if(isSignedIn && inAuthScreen) 
        router.replace("/(tabs)")
  },[isLoaded,isSignedIn,segments])
  //ako se promeni nesto od ove tri stvari []
  //ponovo se izvrsi useeffect
  if(!isLoaded) return null
  return <Stack screenOptions={{headerShown: false}}/>;
}