import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";


export default function InitialLayout() {
  const {isLoaded,isSignedIn} = useAuth();
  const segments = useSegments();
  //vraca mi gde sam trenutno
  //ako sam u home /
  // /(auth)/login
  // /notifications
  const router = useRouter();
  useEffect(()=>{
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