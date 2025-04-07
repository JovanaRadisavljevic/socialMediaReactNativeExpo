import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function login() {
    const { startSSOFlow } = useSSO();
    const router = useRouter();
    const handleGoogleSignIn = async () => {
        try {
          const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });
      
          if (setActive && createdSessionId) {
            setActive({session: createdSessionId})
            //onda ga odvedi na novu stranicu ako je ulogovan
            router.replace("/(tabs)");
          }
        } catch (error) {
          console.error("OAuth error: ", error);
        }
      };
      

  return (
    <View style={styles.container}>
      {/*brand section */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>drustevene mreze</Text>
        <Text style={styles.tagline}>budite u koraku sa svetom</Text>
      </View>
      {/*image */}
      <View style={styles.illustrationContainer}>
        <Image
            source={require("../../assets/images/auth-bg-3.png")}
            style={styles.illustration}
            resizeMode='cover'
        />
      </View>
      {/*login section*/}
      <View style={styles.loginSection}>
        <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            activeOpacity={0.9}
        >
            <View style={styles.googleIconContainer}>
                <Ionicons name="logo-google" size={20} color={COLORS.surface} />
            </View>
            <Text style={styles.googleButtonText}>Nastavite sa google nalogom</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
            Klikom na dugme slazete se sa nasom politikom koriscenja informacija
        </Text>
      </View>


    </View>
  )
}