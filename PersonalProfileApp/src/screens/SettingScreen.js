import React, { useContext, useState, useEffect } from "react"; 
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { StorageService } from "../services/storageService";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";

const NOTIFICATION_KEY = "notificationsEnabled"; 

const SettingScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme, colors } = useContext(ThemeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const loadPreference = async () => {
      try {
        const savedPreference = await StorageService.getData(NOTIFICATION_KEY);
        if (savedPreference !== null) {
          setNotificationsEnabled(savedPreference);
        }
      } catch (error) {
        console.error("Failed to load notification preference:", error);
      }
    };

    loadPreference();
  }, []);

  // 3. Update the handler to save the preference
  const handleNotificationToggle = async (newValue) => {
    setNotificationsEnabled(newValue); 

    try {
      await StorageService.storeData(NOTIFICATION_KEY, newValue);

      if (newValue) {
        ToastAndroid.show(
          "Notifications have been enabled",
          ToastAndroid.SHORT
        );
        
      } else {
        ToastAndroid.show(
          "Notifications have been disabled",
          ToastAndroid.SHORT
        );
        
      }
    } catch (error) {
      console.error("Failed to save notification preference:", error);
      setNotificationsEnabled(!newValue);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to clear all your profile data? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear Data",
          onPress: async () => {
            try {
              await StorageService.clearAll();
              Alert.alert(
                "Success",
                "All profile data has been cleared successfully."
              );
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "Failed to clear data.");
              console.error("Error clearing data:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Preferences Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        {/* Dark Mode Toggle */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        <View style={styles.divider} />

        {/* Notification Preferences Toggle */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>
            Push Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Other sections remain the same... */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>
            App Version
          </Text>
          <Text style={[styles.versionText, { color: colors.text }]}>
            {Constants.expoConfig?.version || "1.0.0"}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleClearData}>
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.settingItem}>
            <Text style={[styles.settingText, styles.destructiveText]}>
              Clear All Data
            </Text>
            <Icon name="trash-outline" size={22} color="#E74C3C" />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  versionText: {
    fontSize: 16,
    color: "#8E8E93",
  },
  destructiveText: {
    color: "#E74C3C",
    fontWeight: "600",
  },
});

export default SettingScreen;
