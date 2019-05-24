#!/bin/bash 

JARSIGNER="/usr/src/android-studio/jre/bin/jarsigner"
ZIPALIGN="/root/Android/Sdk/build-tools/28.0.3/zipalign"
APK="app-release-unsigned.apk"
APK_SIGNED="opecalc-release-signed.apk"
KEY="my-release-key.keystore"

rm -f *.apk
cp ../platforms/android/app/build/outputs/apk/release/$APK .
$JARSIGNER -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEY $APK survoz_key
$ZIPALIGN -v 4 $APK $APK_SIGNED
