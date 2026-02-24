import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Location from 'expo-location';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { sites } from '../data/sites';
import { schedule } from '../data/schedule';
import { getDistanceFromLatLonInKm } from '../utils/distance';

export default function MyVisitsScreen() {
const [hasPermission, setHasPermission] = useState(false);

const agendaItems = schedule.map((visit) => {
const matchingSite = sites.find((site) => site.id === visit.siteId);
return {
...visit,
siteName: matchingSite ? matchingSite.name : 'Unknown Site',
siteCapacity: matchingSite ? matchingSite.capacity : 'N/A',
location: matchingSite ? matchingSite.location : { lat: 0, lng: 0 }
};
});

useEffect(() => {
(async () => {
const { status } = await Calendar.requestCalendarPermissionsAsync();
if (status === 'granted') {
setHasPermission(true);
}
})();
}, []);

const syncToCalendar = async () => {
if (!hasPermission) {
Alert.alert('Permission Error', 'Please allow calendar access.');
return;
}
try {
const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
const primaryCalendar = calendars.find(cal => cal.allowsModifications) || calendars[0];
if (!primaryCalendar) return;

  Alert.alert('Syncing...', 'Adding visits to your calendar now.');
  for (const item of agendaItems) {
    const startDate = new Date();
    await Calendar.createEventAsync(primaryCalendar.id, {
      title: "🔧 " + item.title + " at " + item.siteName,
      startDate: startDate,
      endDate: new Date(startDate.getTime() + 2 * 60 * 60 * 1000),
      location: item.siteName,
      notes: "Time: " + item.time + "\nDate: " + item.date,
    });
  }
  Alert.alert('Success!', 'All visits added to your native Calendar!');
} catch (error) {
  Alert.alert('System Error', 'Could not sync to calendar.');
}
};

const handleCheckIn = async (site: any) => {
let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
Alert.alert('Permission Denied', 'We need your location.');
return;
}

try {
  let phoneLocation = await Location.getCurrentPositionAsync({});
  const distanceInMeters = getDistanceFromLatLonInKm(
    phoneLocation.coords.latitude, phoneLocation.coords.longitude,
    site.location.lat, site.location.lng
  );

  if (distanceInMeters <= 500) {
    Alert.alert('✅ Checked In!', 'Welcome to ' + site.siteName);
  } else {
    const distanceKm = (distanceInMeters / 1000).toFixed(1);
    Alert.alert('❌ Too Far Away', 'You are ' + distanceKm + ' km away from ' + site.siteName);
  }
} catch (error) {
  Alert.alert('Error', 'Could not fetch your location.');
}
};

// --- NEW FEATURE: Generate PDF Report ---
const generatePDF = async () => {
try {
// 1. We write the document in HTML
const htmlContent = `
<html>
<head>
<style>
body { font-family: 'Helvetica', sans-serif; padding: 40px; }
h1 { color: #007BFF; text-align: center; font-size: 32px; }
.header { text-align: center; margin-bottom: 40px; color: #555; }
.visit-card { border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
.site-name { font-size: 20px; font-weight: bold; color: #2c3e50; }
.details { font-size: 16px; color: #7f8c8d; margin-top: 5px; }
</style>
</head>
<body>
<h1>SolYield EOD Report</h1>
<div class="header">
<p>Technician: Arjun | Date: ${new Date().toLocaleDateString()}</p>
</div>

        ${agendaItems.map(item => `
          <div class="visit-card">
            <div class="site-name">📍 ${item.siteName}</div>
            <div class="details"><b>Task:</b> ${item.title}</div>
            <div class="details"><b>Scheduled:</b> ${item.date} at ${item.time}</div>
            <div class="details"><b>Status:</b> Pending Verification</div>
          </div>
        `).join('')}
        
      </body>
    </html>
  `;

  // 2. Convert HTML to a PDF file
  const { uri } = await Print.printToFileAsync({ html: htmlContent });
  
  // 3. Open the phone's native Share menu
  await Sharing.shareAsync(uri);

} catch (error) {
  Alert.alert('Error', 'Could not generate the PDF report.');
}
};

return (
<View style={styles.container}>
<Text style={styles.title}>Arjun's Daily Agenda</Text>

  <FlatList
    data={agendaItems}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardText}>📍 {item.siteName}</Text>
        <Text style={styles.cardText}>🕒 {item.date} at {item.time}</Text>
        <View style={styles.checkInButton}>
          <Button title="Check In (GPS)" onPress={() => handleCheckIn(item)} color="#28a745" />
        </View>
      </View>
    )}
  />

  <View style={styles.buttonContainer}>
    <Button title="Sync to Native Calendar" onPress={syncToCalendar} color="#007BFF" />
    <View style={{ marginTop: 10 }}>
      <Button title="📄 Generate PDF Report" onPress={generatePDF} color="#6c757d" />
    </View>
  </View>
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 20, paddingTop: 30, backgroundColor: '#f5f5f5' },
title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 15 },
cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#2c3e50' },
cardText: { fontSize: 14, color: '#7f8c8d', marginTop: 5 },
checkInButton: { marginTop: 15 },
buttonContainer: { marginTop: 10, marginBottom: 10 }
});