This file describes the reason for the patches applied.


### @types/react-native+0.63.2
Created on **29/07/2020**

#### Reason:
- Missing accessibility types.


### react-native-mixpanel+1.2.0

#### Reason:
- **20/03/2020** Change the endpoint to european server.
- **04/03/2021** Improve track function type definition.


### react-native-safe-area-view+0.12.0
Created on **27/07/2020**

#### Reason:
- Temporary fix, in order to execute the application after the porting to 0.63.x, waiting to replace react-navigation and remove this patch.


### react-native-touch-id+4.4.1
Created on **09/05/2019** and **20/12/2019**

#### Reason:
- Solve crash on Android and export types.


### reactotron-redux-saga+2.1.4
Created on **13/12/2019**

#### Reason:
- Change type export.


### native-base+2.13.13
Created on **30/07/2020**

#### Reason:
- Integrate the pr https://github.com/GeekyAnts/NativeBase/pull/3200 waiting the official release. (remove this patch after the release)
- Use TouchableHighlight instead of TouchableNativeFeedback on Android sdk < 19 to avoid crash.


### react-native-i18n+2.0.15
Created on **05/08/2020**

#### Reason:
- Removed minSdkVersion from gradle to allow the compilation on Android. 

### danger-plugin-digitalcitizenship+0.3.1
Created on **06/08/2020**

#### Reason:
- Recognizes the ids of pivotal stories even if they are not at the beginning of the line


### react-native-popup-menu+0.14.2
Created on **12/08/2020**

#### Reason:

- Use TouchableHighlight instead of TouchableNativeFeedback on Android sdk < 19 to avoid crash.

### react-native-push-notification+7.3.1

Created on **10/05/2021**

#### Reason:

- Add backwards compatibility to the legacy GCM format (this patch will be removed in a next version) for Android
  notification.

### react-native-maps+0.28.0

Created on **27/05/2021**

#### Reason:

- NativeEvent for the onPress handler on a map is missing attributes used to distinguish what user is pressing (eg. "
  marker-press") 

