import React from 'react';
import { StyleSheet, View, Text, Button, Linking, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { sites } from '../data/sites';

export default function SiteMapScreen() {
const initialRegion = {
latitude: 20.5937,
longitude: 78.9629,
latitudeDelta: 15,
longitudeDelta: 15,
};

// FIX 2: Added TypeScript types (number, number, string)
const openInGoogleMaps = (lat: number, lng: number, name: string) => {
const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });

// FIX 1: Changed single quotes to backticks (`)
const latLng = `${lat},${lng}`;
const label = name;
const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`
});

if (url) {
  Linking.openURL(url);
}
};

return (
<View style={styles.container}>
<MapView style={styles.map} initialRegion={initialRegion}>
{sites.map((site) => (
<Marker
key={site.id}
coordinate={{ latitude: site.location.lat, longitude: site.location.lng }}
title={site.name}
>
<Callout>
<View style={styles.callout}>
<Text style={styles.siteName}>{site.name}</Text>
<Text>Capacity: {site.capacity}</Text>
<View style={styles.navButton}>
<Button
title="Navigate"
onPress={() => openInGoogleMaps(site.location.lat, site.location.lng, site.name)}
/>
</View>
</View>
</Callout>
</Marker>
))}
</MapView>
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1 },
map: { width: '100%', height: '100%' },
callout: { padding: 10, minWidth: 150 },
siteName: { fontWeight: 'bold', marginBottom: 5 },
navButton: { marginTop: 10 }
});