import React, { useState, useContext } from "react"; // 1. Import useContext
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../context/ThemeContext"; // 2. Import ThemeContext

const EditProfileScreen = ({ route, navigation }) => {
  // 3. Use theme context
  const { colors } = useContext(ThemeContext);

  const { profile, onSave } = route.params;
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!editedProfile.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!editedProfile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editedProfile.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!editedProfile.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the errors and try again");
      return;
    }

    onSave(editedProfile);
    navigation.goBack();
  };

  const handleInputChange = (field, value) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // 4. Create dynamic styles
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    label: {
      color: colors.text,
    },
    inputWrapper: {
      backgroundColor: colors.card,
      borderColor: colors.border || "#E5E7EB", // Add a border color to your theme context if you want
    },
    input: {
      color: colors.text,
    },
    footer: {
      backgroundColor: colors.card,
      borderTopColor: colors.border || "#E5E7EB",
    },
  });

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, dynamicStyles.label]}>
                Full Name *
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  dynamicStyles.inputWrapper,
                  errors.name && styles.inputError,
                ]}
              >
                <Icon
                  name="person"
                  size={20}
                  color="#7F8C8D"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, dynamicStyles.input]}
                  value={editedProfile.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  placeholder="Enter your full name"
                  placeholderTextColor="#7F8C8D"
                />
              </View>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, dynamicStyles.label]}>
                Email Address *
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  dynamicStyles.inputWrapper,
                  errors.email && styles.inputError,
                ]}
              >
                <Icon
                  name="mail"
                  size={20}
                  color="#7F8C8D"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, dynamicStyles.input]}
                  value={editedProfile.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#7F8C8D"
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, dynamicStyles.label]}>
                Phone Number *
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  dynamicStyles.inputWrapper,
                  errors.phone && styles.inputError,
                ]}
              >
                <Icon
                  name="call"
                  size={20}
                  color="#7F8C8D"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, dynamicStyles.input]}
                  value={editedProfile.phone}
                  onChangeText={(value) => handleInputChange("phone", value)}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  placeholderTextColor="#7F8C8D"
                />
              </View>
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Location Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, dynamicStyles.label]}>Location</Text>
              <View style={[styles.inputWrapper, dynamicStyles.inputWrapper]}>
                <Icon
                  name="location"
                  size={20}
                  color="#7F8C8D"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, dynamicStyles.input]}
                  value={editedProfile.location}
                  onChangeText={(value) => handleInputChange("location", value)}
                  placeholder="Enter your location"
                  placeholderTextColor="#7F8C8D"
                />
              </View>
            </View>

            {/* Bio Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, dynamicStyles.label]}>Bio</Text>
              <View
                style={[
                  styles.inputWrapper,
                  dynamicStyles.inputWrapper,
                  styles.bioWrapper,
                ]}
              >
                <TextInput
                  style={[styles.input, dynamicStyles.input, styles.bioInput]}
                  value={editedProfile.bio}
                  onChangeText={(value) => handleInputChange("bio", value)}
                  placeholder="Tell us about yourself"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor="#7F8C8D"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={[styles.footer, dynamicStyles.footer]}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon
              name="checkmark"
              size={20}
              color="#fff"
              style={styles.saveIcon}
            />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20 },
  form: { paddingVertical: 20 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: { borderColor: "#E74C3C" },
  bioWrapper: { height: 120, alignItems: "flex-start", paddingVertical: 16 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16 },
  bioInput: { textAlignVertical: "top" },
  errorText: { fontSize: 14, color: "#E74C3C", marginTop: 4 },
  footer: { padding: 20, borderTopWidth: 1 },
  saveButton: {
    backgroundColor: "#27AE60",
    borderRadius: 12,
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  saveIcon: { marginRight: 8 },
  saveButtonText: { fontSize: 16, fontWeight: "600", color: "#fff" },
});

export default EditProfileScreen;
