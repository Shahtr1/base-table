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

## Use this in package.json in lib and main project to publish to nexus
```
"publishConfig": {
    "registry": "http://localhost:8081/repository/npm-private/"
  },
```
