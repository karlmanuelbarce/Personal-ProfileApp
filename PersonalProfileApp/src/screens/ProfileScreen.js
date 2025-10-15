import React, { useState, useContext, useCallback } from "react"; // 1. Import useCallback
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { StorageService } from "../services/storageService";
import Constants from "expo-constants";
import { ThemeContext } from "../context/ThemeContext";
import { useFocusEffect } from "@react-navigation/native"; // 2. Import useFocusEffect

// 3. Define the initial state as a constant for reusability
const initialProfileState = {
  name: "Karl Barce",
  email: "barcekarl515@gmail.com",
  phone: "+1 (555) 123-4567",
  location: "Guiguinto, Bulacan",
  bio: "Mobile developer passionate about React Native and modern app development.",
  avatar: null,
};

const ProfileScreen = ({ navigation }) => {
  const { colors } = useContext(ThemeContext);

  // Use the constant for the initial state
  const [profile, setProfile] = useState(initialProfileState);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // 4. Use `useFocusEffect` to reload data whenever the screen is shown
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const savedProfile = await StorageService.getData("userProfile");
      // 5. If data is cleared (null), reset to the initial default state
      if (savedProfile) {
        setProfile(savedProfile);
      } else {
        setProfile(initialProfileState); // This resets the profile
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setProfile(initialProfileState); // Also reset on error
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", { profile, onSave: handleSaveProfile });
  };

  const handleSettings = () => {
    navigation.navigate("Setting");
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      await StorageService.storeData("userProfile", updatedProfile);
      setProfile(updatedProfile);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile");
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
    },
    section: {
      backgroundColor: colors.card,
    },
    sectionTitle: {
      color: colors.text,
    },
    infoText: {
      color: colors.text,
    },
    bioText: {
      color: colors.text,
    },
    avatarPlaceholderText: {
      fontSize: 40,
      fontWeight: "bold",
      color: "#fff",
    },
  });

  return (
    // The rest of your JSX remains unchanged
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={[styles.header, dynamicStyles.header]}>
          <View style={styles.headerTopRow}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
          <View style={styles.avatarContainer}>
            {profile.avatar ? (
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={dynamicStyles.avatarPlaceholderText}>
                  {getInitials(profile.name)}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Icon
              name="pencil"
              size={16}
              color="#fff"
              style={styles.editIcon}
            />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={[styles.section, dynamicStyles.section]}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            Contact Information
          </Text>
          <View style={styles.infoItem}>
            <Icon
              name="call"
              size={20}
              color={colors.primary}
              style={styles.infoIcon}
            />
            <Text style={[styles.infoText, dynamicStyles.infoText]}>
              {profile.phone}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon
              name="location"
              size={20}
              color={colors.primary}
              style={styles.infoIcon}
            />
            <Text style={[styles.infoText, dynamicStyles.infoText]}>
              {profile.location}
            </Text>
          </View>
        </View>

        {/* Bio Section */}
        <View style={[styles.section, dynamicStyles.section]}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>
            About Me
          </Text>
          <Text style={[styles.bioText, dynamicStyles.bioText]}>
            {profile.bio}
          </Text>
        </View>

        {/* App Info Section is removed as it's now in Settings */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettings}
        >
          <Icon
            name="settings-outline"
            size={20}
            color={colors.text}
            style={styles.editIcon}
          />
          <Text style={[styles.settingsButtonText, { color: colors.text }]}>
            Settings
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain the same...
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  header: { alignItems: "center", paddingVertical: 20, paddingHorizontal: 20 },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  avatarContainer: { marginBottom: 16 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2C3E50",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  email: { fontSize: 16, color: "#ECF0F1", marginBottom: 20 },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  editIcon: { marginRight: 8 },
  editButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  section: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  infoItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  infoIcon: { marginRight: 16, width: 24 },
  infoText: { fontSize: 16, flex: 1 },
  bioText: { fontSize: 16, lineHeight: 24 },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    paddingVertical: 12,
    borderRadius: 25,
  },
  settingsButtonText: { fontSize: 16, fontWeight: "600" },
});

export default ProfileScreen;
