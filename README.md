# AscWorkspace

# Add these to angular.json file to suppress warnings of CommonJS dependencies

```
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
      "allowedCommonJsDependencies": [
        "jspdf-autotable",
        "jspdf",
        "file-saver",
        "raf",
        "core-js",
        "rgbcolor"
      ],

```
