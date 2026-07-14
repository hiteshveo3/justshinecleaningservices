import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

class DefaultFirebaseOptions {
  static const androidApiKey = 'PASTE_ANDROID_API_KEY_HERE';
  static const androidAppId = 'PASTE_ANDROID_APP_ID_HERE';
  static const messagingSenderId = 'PASTE_MESSAGING_SENDER_ID_HERE';
  static const projectId = 'just-shine-cleaning-app';
  static const storageBucket = 'just-shine-cleaning-app.appspot.com';

  static bool get isConfigured {
    return androidApiKey.startsWith('PASTE_') == false &&
        androidAppId.startsWith('PASTE_') == false &&
        messagingSenderId.startsWith('PASTE_') == false;
  }

  static FirebaseOptions get currentPlatform {
    if (defaultTargetPlatform != TargetPlatform.android) {
      return android;
    }
    return android;
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: androidApiKey,
    appId: androidAppId,
    messagingSenderId: messagingSenderId,
    projectId: projectId,
    storageBucket: storageBucket,
  );
}
