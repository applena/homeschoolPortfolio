

module.exports = {
  "name": "homeschool-portfolio",
  "slug": "homeschool-portfolio",
  "version": "1.1.2",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "infoPlist": {
      "NSPhotoLibraryUsageDescription": "Use of the camera allows users to take photos of the portfolio work"
    },
    "supportsTablet": true,
    "bundleIdentifier": "com.homeschoolPortfolio.homeschoolportfolio"
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#FFFFFF"
    }
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "extra": {
    "eas": {
      "projectId": "ccdba707-48fa-4a52-bc0d-162100609c81"
    }
  }
}