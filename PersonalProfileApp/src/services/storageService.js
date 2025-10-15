import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageService = {
  async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log("Data stored successfully:", key);
    } catch (error) {
      console.error("Storage error:", error);
      throw error;
    }
  },

  async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (error) {
      console.error("Retrieval error:", error);
      throw error;
    }
  },

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Data removed successfully:", key);
    } catch (error) {
      console.error("Remove error:", error);
      throw error;
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.clear();
      console.log("All data cleared successfully");
    } catch (error) {
      console.error("Clear error:", error);
      throw error;
    }
  },

  async getAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error("Get keys error:", error);
      throw error;
    }
  },
};
