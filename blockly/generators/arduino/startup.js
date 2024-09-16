'use strict';

goog.provide('Blockly.Arduino.startup');

goog.require('Blockly.Arduino');

Blockly.Arduino['starter_block'] = function(block) {
//  Blockly.Arduino.addInclude('starterimp1', '#include <SPI.h>');

  Blockly.Arduino.addInclude('starterimp1', '#include <WiFi.h>');
  Blockly.Arduino.addInclude('starterimp2', '#include <HTTPClient.h>');
  Blockly.Arduino.addInclude('starterimp3', '#include <Update.h>');
  Blockly.Arduino.addInclude('starterimp4', '#include <WebServer.h>');
  Blockly.Arduino.addInclude('starterimp5', '#include <ArduinoJson.h>');
  Blockly.Arduino.addInclude('starterimp6', '#include <EEPROM.h>');
  Blockly.Arduino.addInclude('starterimp7', '#include <ESP32httpUpdate.h>');

  Blockly.Arduino.addDeclaration('eep_rom_size' , 'const int EEPROM_SIZE = 512;');
  Blockly.Arduino.addDeclaration('user_id_addr' , 'const int USER_ID_ADDRESS = 128;');
  Blockly.Arduino.addDeclaration('version_addr' , 'const int VERSION_ADDRESS = 64;');
  Blockly.Arduino.addDeclaration('user_id_length' , 'const int USER_ID_LENGTH = 32;');
  Blockly.Arduino.addDeclaration('version_length' , 'const int VERSION_LENGTH = 32;');
  Blockly.Arduino.addDeclaration('base_url' , 'const char *checkUrlBase = "https://999666.link/getLatestOTA?userID=";');
  Blockly.Arduino.addDeclaration('api_port' , 'const int AP_PORT = 80;');
  Blockly.Arduino.addDeclaration('webserver' , 'WebServer server(AP_PORT);');

//  Blockly.Arduino.addSetup(null, 'Serial.begin(115200);', true);
Blockly.Arduino.addSetup('serial_begin', 'Serial.begin(115200);', true);

Blockly.Arduino.addSetup('serial_println_booting', 'Serial.println("Booting");', true);

Blockly.Arduino.addSetup('eeprom_begin', 'EEPROM.begin(EEPROM_SIZE);', true);

var savedSSID = 'String savedSSID;';
var savedPassword = 'String savedPassword;';
var savedUserID = 'String savedUserID;';
var savedVersion = 'String savedVersion;';


  Blockly.Arduino.addSetup('declare_variables', savedSSID + savedPassword + savedUserID + savedVersion, true);

  // Load credentials and handle Wi-Fi connection or AP mode
  Blockly.Arduino.addSetup('load_credentials', `
    if (!loadCredentialsFromEEPROM(savedSSID, savedPassword)) {
      Serial.println("No saved credentials found. Starting AP.");
      startAP();
    } else {
      Serial.println("Saved credentials found. Connecting to Wi-Fi.");
      WiFi.begin(savedSSID.c_str(), savedPassword.c_str());
      connectToWiFi();

      if (WiFi.status() != WL_CONNECTED) {
        Serial.println("Failed to connect to Wi-Fi. Starting AP.");
        startAP();
      } else {
        Serial.println("Connected to Wi-Fi");
        if (!loadUserIDFromEEPROM(savedUserID)) {
          Serial.println("No userID found. Starting AP.");
          startAP();
        } else {
          Serial.print("Loaded userID: ");
          Serial.println(savedUserID);
          fetchLatestVersionAndUpdate();
        }
      }
    }
  `, true);


  // Define the connectToWiFi function
  Blockly.Arduino.addFunction('connectToWiFi', `
    void connectToWiFi() {
      int attempts = 0;
      while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        Serial.print(".");
        delay(1000);
        attempts++;
      }
      if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Connected to Wi-Fi");
      } else {
        Serial.println("Failed to connect to Wi-Fi");
      }
    }
  `);

  // Define the startAP function
  Blockly.Arduino.addFunction('startAP', `
    void startAP() {
      WiFi.softAP("ESP32-AP", "password");  // Start an Access Point with SSID and password
      IPAddress IP = WiFi.softAPIP();
      Serial.print("AP IP address: ");
      Serial.println(IP);

      // Define web server routes
      server.on("/", HTTP_GET, handleRoot);
      server.on("/save", HTTP_POST, handleSaveCredentials);

      server.begin();
      Serial.println("Access Point started. Awaiting Wi-Fi credentials.");
    }
  `);

  // Define the handleRoot function
  Blockly.Arduino.addFunction('handleRoot', `
    void handleRoot() {
      if (!server.hasArg("userID")) {
        Serial.println("No userID provided. Starting AP and clearing EEPROM.");
        clearEEPROM();  // Clear EEPROM
        startAP();      // Start Access Point mode
        return;
      }
      fetchLatestVersionAndUpdate();
    }
  `);

  // Define the handleSaveCredentials function
Blockly.Arduino.addFunction('handleSaveCredentials', `
    void handleSaveCredentials() {
      if (server.hasArg("plain")) {
        String body = server.arg("plain");
        DynamicJsonDocument doc(1024);
        DeserializationError error = deserializeJson(doc, body);

        if (error) {
          Serial.print("Failed to parse JSON: ");
          Serial.println(error.f_str());
          server.send(400); // Send only the status code 400
          return;
        }

        String ssid = doc["ssid"].as<String>();
        String password = doc["password"].as<String>();
        String userID = doc["userID"].as<String>();

        Serial.print("Received userID: ");
        Serial.println(userID);

        // Save Wi-Fi credentials and userID to EEPROM
        saveCredentialsToEEPROM(ssid, password);
        saveUserIDToEEPROM(userID);

        server.send(200); // Send only the status code 200
        delay(1000);
        ESP.restart();  // Restart to apply the new credentials
      } else {
        server.send(400); // Send only the status code 400
      }
    }
`);

  // Define the saveCredentialsToEEPROM function
  Blockly.Arduino.addFunction('saveCredentialsToEEPROM', `
    void saveCredentialsToEEPROM(const String& ssid, const String& password) {
      // Start by clearing EEPROM
      clearEEPROM();  // Clear EEPROM to avoid leftover data

      // Save SSID
      EEPROM.write(0, ssid.length());
      for (int i = 0; i < ssid.length(); i++) {
        EEPROM.write(1 + i, ssid[i]);
      }

      // Save Password
      int ssidEnd = 1 + ssid.length();
      EEPROM.write(ssidEnd, password.length());
      for (int i = 0; i < password.length(); i++) {
        EEPROM.write(ssidEnd + 1 + i, password[i]);
      }

      EEPROM.commit();
      Serial.println("Credentials saved to EEPROM.");
    }
  `);

  // Define the loadCredentialsFromEEPROM function
  Blockly.Arduino.addFunction('loadCredentialsFromEEPROM', `
    bool loadCredentialsFromEEPROM(String& ssid, String& password) {
      int ssidLength = EEPROM.read(0);
      if (ssidLength > 0 && ssidLength < EEPROM_SIZE) {
        ssid = "";
        for (int i = 0; i < ssidLength; i++) {
          ssid += char(EEPROM.read(1 + i));
        }
        int passwordLength = EEPROM.read(1 + ssidLength);
        password = "";
        for (int i = 0; i < passwordLength; i++) {
          password += char(EEPROM.read(2 + ssidLength + i));
        }
        Serial.println("Credentials loaded from EEPROM.");
        return true;
      }
      return false;
    }
  `);

  // Define the saveUserIDToEEPROM function
  Blockly.Arduino.addFunction('saveUserIDToEEPROM', `
    void saveUserIDToEEPROM(const String& userID) {
      EEPROM.write(USER_ID_ADDRESS, userID.length());
      for (int i = 0; i < userID.length(); i++) {
        EEPROM.write(USER_ID_ADDRESS + 1 + i, userID[i]);
      }
      EEPROM.commit();
      Serial.println("UserID saved to EEPROM.");
    }
  `);

  // Define the loadUserIDFromEEPROM function
  Blockly.Arduino.addFunction('loadUserIDFromEEPROM', `
    bool loadUserIDFromEEPROM(String& userID) {
      int userIDLength = EEPROM.read(USER_ID_ADDRESS);
      if (userIDLength > 0 && userIDLength <= USER_ID_LENGTH) {
        userID = "";
        for (int i = 0; i < userIDLength; i++) {
          userID += char(EEPROM.read(USER_ID_ADDRESS + 1 + i));
        }
        Serial.println("UserID loaded from EEPROM.");
        return true;
      }
      return false;
    }
  `);

  // Define the saveVersionToEEPROM function
  Blockly.Arduino.addFunction('saveVersionToEEPROM', `
    void saveVersionToEEPROM(const String& version) {
      EEPROM.write(VERSION_ADDRESS, version.length());
      for (int i = 0; i < version.length(); i++) {
        EEPROM.write(VERSION_ADDRESS + 1 + i, version[i]);
      }
      EEPROM.commit();
      Serial.println("Version saved to EEPROM.");
    }
  `);

  Blockly.Arduino.addFunction('clearEEPROM', `
    void clearEEPROM() {
      for (int i = 0; i < EEPROM_SIZE; i++) {
        EEPROM.write(i, 0);
      }
      EEPROM.commit();
      Serial.println("EEPROM cleared.");
    }
  `);

  // Define the fetchLatestVersionAndUpdate function
  Blockly.Arduino.addFunction('fetchLatestVersionAndUpdate', `
    void fetchLatestVersionAndUpdate() {
      if (WiFi.status() != WL_CONNECTED) {
          Serial.println("Not connected to Wi-Fi. Exiting.");
          return;
        }

        String userID;
        if (!loadUserIDFromEEPROM(userID) || userID.isEmpty()) {
          Serial.println("No userID available. Starting AP.");
          startAP();
          return;
        }

        String otaUrlWithUserID = checkUrlBase + userID;
      HTTPClient http;
      http.begin(otaUrlWithUserID);
      int httpCode = http.GET();

  if (httpCode == HTTP_CODE_OK) {
    String payload = http.getString();
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, payload);

    if (error) {
      Serial.print("Failed to parse JSON: ");
      Serial.println(error.f_str());
      return;
    }

    String latestVersion = doc["version"].as<String>();
    String otaUrl = doc["url"].as<String>();

    String currentVersion;
    if (!loadVersionFromEEPROM(currentVersion) || currentVersion != latestVersion) {
      Serial.print("New version available: ");
      Serial.println(latestVersion);

      ESP32HTTPUpdate httpUpdate;  // Create an instance of ESP32HTTPUpdate
      HTTPUpdateResult ret = httpUpdate.update(otaUrl);  // Use the instance to update

      if (ret == HTTP_UPDATE_OK) {
        saveVersionToEEPROM(latestVersion);
        Serial.println("OTA update successful. New version saved.");
      } else {
        Serial.println("OTA update failed.");
      }
    } else {
      Serial.println("No new version available.");
    }
  } else {
    Serial.print("HTTP GET failed with code: ");
    Serial.println(httpCode);
    clearEEPROM();
    startAP();
  }

  http.end();
    }
  `);

  // Define the loadVersionFromEEPROM function
  Blockly.Arduino.addFunction('loadVersionFromEEPROM', `
    bool loadVersionFromEEPROM(String& version) {
      int versionLength = EEPROM.read(VERSION_ADDRESS);
      if (versionLength > 0 && versionLength <= VERSION_LENGTH) {
        version = "";
        for (int i = 0; i < versionLength; i++) {
          version += char(EEPROM.read(VERSION_ADDRESS + 1 + i));
        }
        Serial.println("Version loaded from EEPROM.");
        return true;
      }
      return false;
    }
  `);

  // Handle client requests for the server
  var code = 'server.handleClient();';
  return code;
};