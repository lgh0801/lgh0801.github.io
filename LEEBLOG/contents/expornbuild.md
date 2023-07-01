---
date: '2023-07-01'
title: 'Expo 앱 빌드 및 배포'
categories: ['React Native', 'Expo']
summary: 'Expo 개발 ReactNative 앱 빌드 및 배포'
thumbnail: './reactthumbnail.png'
---

# Expo로 개발한 React Native 앱 배포

개발한 앱을 배포하는것은 개발에서 중요한 단계입니다. 

Expo 문서를 정리하면서 어떻게 앱을 배포하는지 알아보겠습니다.

# Standalone App 빌드

ios와 안드로이드를 위한 standalone 바이너리를 생성합니다.

iOS 앱을 빌드하기 위해서는 애플 개발자 계정이 필요합니다.

그러나 안드로이드 앱을 빌드하기 위해서는 꼭 필요하지는 않습니다.

하지만 스토어에 올리기 위해서는 계정이 필요합니다.

# Code Challenge

저는 우선 React Native가 무엇인지 기초를 배우고싶어서

유튜버 노마드코더님에 기초(왕초보를 위한 React Native 101)강의를 수강완료 하였습니다.

기초과정은 무료이고 심화는 유료입니다.

강의 링크: https://nomadcoders.co/react-native-for-beginners/lobby

강의를 끝으로 몇가지 Code Challenge 과제를 내주셔서

복습할겸 과제를 완료하며 React Native에 기본을 학습했습니다.

# app.json 설정

```javascript
 {
   "expo": {
    "name": "Your App Name",
    "icon": "./path/to/your/app-icon.png",
    "version": "1.0.0",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourappname",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.yourcompany.yourappname",
      "versionCode": 1
    }
   }
 }
```

 - iOS bundleIdentifier와 Android package 항목은 DNS를 거꾸로 한것과 같습니다. 
   하지만 꼭 도메인과 관련이 있어야하지는 않습니다.

 - name, icon,version들을 채웁니다.
 
 - slug는 나의 앱 자바스크립트 들이 배포될 이름입니다. 
   그 예로 expo.io/@community/native-component-list, community은 나의 사용자 이름이며 
   native-component-list가 slug입니다.

 - ios.buildNumber와 android.versionCode는 나의 앱의 다른 바이너리를 구별합니다. 
   각 빌드가 스토어에 올라갈때 숫자가 증가 하도록 작성합니다.

   추가 사용자 지정을 위해  JavaScript 또는 TypeScript ( app.config.js 또는 app.config.ts )를 사용할 수 있습니다. 

   공식문서를 참조해서 사용하시면됩니다. (https://docs.expo.dev/workflow/configuration/) 
   
   현재 실무에서는 app.config.js를 사용중입니다.

# 앱 빌드(eas.json)

### Android 에뮬레이터 및 기기용 APK 빌드
```javascript
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  }
}
```

위 preview apk를 빌드이고

빌드 명령어 예시(eas build -p android --profile preview)

preview3는 실제 빌드 환경가 똑같이 console.log()등을 뿌려서 확인할수있는 빌드이며

production은 실제로 앱스토어에 올릴 .aab 빌드입니다. 

빌드가 끝나면 .apk, .aab, .ipa파일들을 확인하고 다운 받을 수 있습니다.


# 적절한 스토어에 제출하기

https://docs.expo.dev/submit/introduction/ 공식문서 참조


# 앱 업데이트

expo-update 라이브러리를 사용하면 빌드한 내용을 실시간으로 수정할 수 있습니다.

앱 스토어에서 새로운 버전을 다시 제출하지 않고도 앱의 변경 사항을 사용자에게 제공이 가능합니다.

앱의 이름과 아이콘을 변경하는경우, SDK 버전을 업그레이드 하는 경우에는 새로 빌드 해서 제출해야합니다.

그리고 앱의 변경을 추적하기 위해서는 app.json이나 app.config.js안에 

versionCode와 buildNumber를 업데이트 해야합니다.