SolYield - FIELD TECHNICIAN ASSIST
SolYield is a React Native mobile application designed to assist field technicians in managing remote solar park maintenance. It provides a reliable toolset for scheduling, location verification, and reporting in off-grid environments.

LEVEL 1 FEATURES
Schedule: A dynamic list of site visits that merges scheduling data with site metadata and syncs directly to the phone’s native calendar.

Check-In: A geofencing feature that uses real-time GPS coordinates to validate the technician's presence within a 500m radius.

Map: An interactive map view displaying all assigned solar farm locations with integrated native navigation support.

Report: An automated system that generates a professional PDF summary of the day's tasks for easy sharing via email or WhatsApp.

 APPROACH & ARCHITECTURE
Data Relational Mapping: We designed the app to "join" two separate datasets—schedule.js and sites.js—ensuring that scheduling remains flexible while site metadata stays consistent.

Utility-First Logic: The geolocation validation is decoupled into a standalone utility using the Haversine Formula to ensure high-accuracy distance calculations on a spherical coordinate system.

Native Module Integration: The architecture leverages Expo SDKs for Calendar, Location, and Printing to ensure robust hardware performance across both iOS and Android.

State & Navigation: We used a Bottom Tab Navigator to create a clear separation between data viewing (Agenda) and visual orientation (Map), improving technician workflow.

TECH STACK
Framework: React Native (Expo)

Language: TypeScript

Navigation: React Navigation (Bottom Tabs)

Libraries: expo-calendar, expo-location, expo-print, expo-sharing, react-native-maps


SCREEN RECORDING:
https://github.com/user-attachments/assets/ec6ed0c0-b7d5-4117-95e0-aada6da4a749


SCREENSHOTS: 

https://github.com/user-attachments/assets/9136eb14-c2fd-4c5d-adb1-0a8df1388857

https://github.com/user-attachments/assets/8658777b-cbab-44e0-8014-b587de30c690

https://github.com/user-attachments/assets/9908130f-c5fe-4606-814f-fa72e5fbdd5e




REPORT:
https://github.com/user-attachments/files/25576315/ff384aec-8386-45c3-bbfc-1383307ed654.pdf
