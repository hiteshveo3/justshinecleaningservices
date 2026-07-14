# Just Shine Booking App

Flutter customer booking app for Just Shine Cleaning Services.

## Current foundation

- Mobile-first Flutter shell
- Iconsax icons via `iconsax_flutter`
- Thin system typography
- Home, quote, bookings, chat, and profile tabs
- Starter booking form UI
- Firebase, Maps, image upload, notifications, and URL launcher dependencies installed

## Firebase setup still needed

Run FlutterFire after the final Firebase project is confirmed:

```powershell
dart pub global activate flutterfire_cli
flutterfire configure --project=YOUR_FIREBASE_PROJECT_ID
```

This should generate `lib/firebase_options.dart` and platform Firebase config files.

## Google APIs to enable

- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Cloud Messaging
- Cloud Functions for Firebase
- Google Maps SDK for Android
- Google Maps SDK for iOS
- Places API
- Geocoding API
- Routes API or Distance Matrix API

## Local checks

```powershell
flutter analyze
flutter test
```
