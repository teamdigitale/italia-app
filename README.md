<p align="center">
  <img src="https://raw.githubusercontent.com/pagopa/io-app/master/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png" width="100"/></br>
  IO - The public services app
</p>

<p align="center">
    <a href="https://circleci.com/gh/pagopa/io-app">
        <img src="https://circleci.com/gh/pagopa/io-app.svg?style=svg" />
    </a>
    <a href="https://codecov.io/gh/pagopa/io-app">
        <img src="https://codecov.io/gh/pagopa/io-app/branch/master/graph/badge.svg" />
    </a>
    <a href="CODE-OF-CONDUCT.md">
        <img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" />
    </a>
</p>

<p align="center">
    <a href="https://apps.apple.com/it/app/io/id1501681835">
        <img src="https://raw.githubusercontent.com/pagopa/io-app/master/img/badges/app-store-badge.png" />
    </a>
    <a href="https://play.google.com/store/apps/details?id=it.pagopa.io.app">
        <img src="https://raw.githubusercontent.com/pagopa/io-app/master/img/badges/google-play-badge.png" />
    </a>
</p>


# The mobile app of the Digital Citizenship project

- [FAQ](#faq)
  - [What is the Digital Citizenship project?](#what-is-the-digital-citizenship-project)
  - [What is the Digital Citizenship mobile app?](#what-is-the-digital-citizenship-mobile-app)
  - [Who develops the app?](#who-develops-the-app)
  - [Can I use the app?](#can-i-use-the-app)
  - [How can I help you?](#how-can-i-help-you)
- [Main technologies used](#main-technologies-used)
- [Architecture](#architecture)
  - [SPID Authentication](#spid-authentication)
- [How to contribute](#how-to-contribute)
  - [Pre-requisites](#pre-requisites)
  - [Building and launching on the simulator](#building-and-launching-on-the-simulator)
  - [Build (release)](#build-release)
  - [Installation on physical devices (development)](#installation-on-physical-devices-development)
  - [Development with Backend App and Local Test IDP](#development-with-backend-app-and-local-test-idp)
  - [Development with IO dev local server](#development-with-io-dev-api-server)
  - [Update the app icons](#update-the-app-icons)
  - [Internationalization](#internationalization)
  - [Error handling](#error-handling)
  - [Connection monitoring](#connection-monitoring)
  - [Deep linking](#deep-linking)
  - [Fonts](#fonts)
  - [Io-Icon-Font](#io-icon-font)
  - [Theming](#theming)
  - [Custom UI components](#custom-ui-components)
  - [End to end test with Detox (experimental)](#end-to-end-test-with-detox-experimental)
  - [Troubleshooting](#troubleshooting)

## FAQ

### What is the Digital Citizenship project?

Digital Citizenship aims at bringing citizens to the center of the Italian public administrations services.

The project comprises two main components:

* a platform made of elements that enable the development of citizen-centric digital services;
* an interface for citizens to manage their data and their digital citizen profiles.

### What is the Digital Citizenship mobile app?

The Digital Citizenship mobile app is a native mobile application for iOS and Android with a dual purpose:

* To be an interface for citizens to manage their data and their digital citizen profile;
* To act as _reference implementation_ of the integrations with the Digital Citizenship platform.

### Who develops the app?

The development of the app is carried out by several contributors:

* the [Digital Transformation Team](https://teamdigitale.governo.it/)
* volunteers who support the project.

### Can I use the app?

Sure! However you will need a [SPID account](https://www.agid.gov.it/en/platforms/spid) or have a [CIE](https://www.cartaidentita.interno.gov.it) (support ready for Android - soon for iOS) to login to the app.

### How can I help you?

[Reporting bugs](https://github.com/pagopa/io-app/issues), bug fixes, [translations](https://github.com/pagopa/io-app/tree/master/locales) and generally any improvement is welcome! [Send us a Pull Request](https://github.com/pagopa/io-app/pulls)!

If you have some time to spare and wish to get involved on a regular basis, [contact us](mailto:federico.feroldi@pagopa.it).

## Main technologies used

* [TypeScript](https://www.typescriptlang.org/)
* [Redux](http://redux.js.org/)
* [Redux Saga](https://redux-saga.js.org/)
* [React Native](https://facebook.github.io/react-native)
* [Native Base](http://nativebase.io)

## Architecture

### SPID Authentication

The application relies on a [backend](https://github.com/pagopa/io-backend) for the authentication through SPID (the Public System for Digital Identity) and for interacting with the other components and APIs that are part of the [digital citizenship project](https://github.com/teamdigitale/digital-citizenship).

The backend implements a SAML2 Service Provider that deals with user authentication with the SPID Identity Providers (IdP).

The authentication between the application and the backend takes place via a session token, generated by the backend at the time of the authentication with the SPID IdP.

Once the backend communicates the session token to the application, it is used for all subsequent calls that the application makes to the API exposed by the backend.

The authentication flow is as follows:

1. The user selects the IdP;
1. The app opens a webview on the SAML SP authentication endpoint implemented in the backend, which specifies: the entity ID of the IdP selected by the user and, as returns URL, the URL of the endpoint that generates a new session token.
1. The SAML SP logic takes over the authentication process by redirecting the user to the chosen IdP.
1. After the authentication, a redirect is made from the IdP to the backend endpoint that deals with the generation of a new session token.
1. The endpoint that generates a new token receives the SPID attributes via the HTTP header; then, it generates a new random session token and returns to the webview an HTTP redirect to an URL well-known containing the session token.
1. The app, which monitors the webview, intercepts this URL before the HTTP request is made, extracts the session token and ends the authentication flow by closing the webview.
1. Next, the session token is used by the app to make calls to the backend API.

## How to contribute

In the following there are instructions to build the app in your computer for development purposes.

### Pre-requisites

You need a recent macOS , Linux or Windows 10 based computer, and an Unix based development environment. On macOS and Linux this environment is available in the base install, while on Windows you need to install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10), the Windows Subsystem for Linux.

The following instructions have been tested on a macOS running Mojave, on Linux Ubuntu 18.04 and on Windows with Ubuntu 18.04 installed with WSL. The described procedure assume you are using the `bash` shell; they may work with other shells but you may need to tweak the configuration for your shell. In the following when we will refer to Linux we also mean Windows with WSL.

#### Install nodenv

On macOS and Linux we recommend the use of [nodenv](https://github.com/nodenv/nodenv) for managing multiple versions of NodeJS.

The node version used in this project is stored in [.node-version](.node-version).

If you already have nodenv installed and configured on your system, the correct version node will be set when you access the app directory.

To install, follow the steps described below.

##### Install nodenv on macOS

First, if you do not have it already, install [brew](https://brew.sh) following the installation instructions in the home page.

Install `nodenv` with the command:

```
brew install nodenv
```

Brew installs `nodenv` in the path so no more steps are needed. Check you have it available with the command `which nodenv`.

##### Install nodenv on Linux 

This is the generic installation procedure for Linux that should work on many distributions. The procedure has been tested on Ubuntu Linux. Your mileage may vary.

```
git clone https://github.com/nodenv/nodenv-installer
./nodenv-installer/bin/nodenv-installer
```

Add `nodenv` to the PATH, then reload the configuation as follows:

```
echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >>~/.bashrc
source ~/.bashrc
```

Check you have it available with the command `which nodenv`.

#### Completing and verifying configuration

Either on Mac or Linux you need to add to your shell the initialization command and reload the configuration:

```
echo 'eval "$(nodenv init -)"' >>~/.bashrc
source ~/.bashrc
```

(if you use a different shell than bash you may need to adapt the command to your shell initialization files).

Finally you can install your version of `node` using `nodenv` (replace `<work-dir>` with your actual work directory)

```
cd <work-dir>/io-app
nodenv install
```

You should now verify that the output of the `nodenv version` command and the version of the node in the PATH are the same as the content of the `.node-version` file. For example:

```
$ nodenv version
10.13.0 (set by <work-dir>/io-app/.node-version)
$ node -v
v10.13.0
$ cat .node-version
10.13.0
```

#### Install yarn

For the management of javascript dependencies we use [Yarn](https://yarnpkg.com/lang/en/). 


Yarn is a node application. IF you have already installed in your system version of node compatible with yarn, you can install it as a global command with:

```
npm install -g yarn
```

If you do not have node already installed you can install  `yarn` using `nodenv` with this procedure:

```
cd <work-dir>/io-app
nodenv global $(cat .node-version)
curl -o- -L https://yarnpkg.com/install.sh | bash
```

Now you have to login and logout again from the terminal as yarn installs the configuration in different places on macOS or Linux.

Verify it was installed correctly with the command `which yarn`. It should tell you the installation path of the command. 

#### Install rbenv

On macOS and Linux, for managing multiple versions of Ruby (needed for _Fastlane_ and _CocoaPods_), we recommend the use of [rbenv](https://github.com/rbenv/rbenv).

The Ruby version used in this project is stored in [.ruby-version](.ruby-version).

If you already have rbenv installed and configured on your system, the correct Ruby version will be set, when you access the app directory.

To install, follow the steps described below.

##### Installing `rbenv` on macOS

You should already have installed `brew` so use:

```
brew install rbenv
```

Brew installs `rbenv` in the path so no more steps are needed.

##### Installing `rbenv` on Linux 

This is the generic installation procedure for Linux that should work on many distributions. The procedure has been tested on Ubuntu Linux. 

```
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
mkdir ~/.rbenv/plugins
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

Add `rbenv` to the PATH as follows then reload the intialization file

```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >>~/.bashrc
source ~/.bashrc
```

Verify you have installed it correctly with the command `which rbenv`.

#### Completing and verifying configuration

Either on Mac or Linux you need to add to your shell the initialization command then reload the configuration:

```
echo 'eval "$(rbenv init -)"' >>~/.bashrc
source ~/.bashrc
```

(if you use a different shell than bash you may need to adapt the command to your shell initialization files).


Before you can install your version of Ruby, you need a C compiler and some libraries. On Ubuntu or Debian based systems use:

```
sudo apt-get update
sudo apt-get install build-essential libssl-dev libreadline-dev zlib1g-dev
 ```

Now you can install your version of `ruby` using `rbenv` (replace `<work-dir>` with your actual work directory)

```
cd <work-dir>/io-app
rbenv install
```

You should verify that the output of the `rbenv version` command and the content of the file `.ruby-version` are the same:

For example (replace `<work-dir>` with your actual work directory):

```
$ cd <work-dir>/io-app
$ rbenv version
2.4.2 (set by <work-dir>/io-app/.ruby-version)
$ ruby -v
ruby 2.4.2p198 (2017-09-14 revision 59899) [x86_64-linux]
$ cat .ruby-version
2.4.2
```

#### Install bundler

Some dependencies are installed via [bundler](https://bundler.io/) and [cocoapods](https://cocoapods.org/) 

Note that on Linux you do not need CocoaPods as you can only build for Android.

Bundler is a Ruby application. If you have installed a version of Ruby in your system you can use it to install the required tools with:

```
sudo gem install bundler:2.0.2
```

In some version of Linux you may not have Ruby installed. In some versions of macOS, bundler is not able to install the dependencies because the ruby provided by the system is not complete enough. 

In those cases, you need to install the bundler using the ruby installed by `rbenv` using the following procedure.

```
cd <work-dir>/io-app
rbenv global $(cat .ruby-version)
gem install bundler:2.0.2
```

Verify it was installed correctly with the command `which bundle`. It should show the installation path of the command. 

#### React Native

Follow the tutorial [Building Projects with Native Code](https://facebook.github.io/react-native/docs/getting-started.html) for your operating system.

If you have a macOS system, you can follow both the tutorial for iOS and for Android. If you have a Linux or Windows system, you need only to install the development environment for Android.

### Building and launching on the simulator

#### App build configuration

As a first step,  copy the sample configuration for the app.

```
$ cp .env.example .env
```

You need to edit it to match your environment. Here is a still NOT complete table of the environment variables you can set (check the comments in the file for more informations)ç

| NAME                           | DEFAULT |                                                                                                 |
|--------------------------------|---------|-------------------------------------------------------------------------------------------------|
| `DISPLAY_VERSION_INFO_OVERLAY` | NO | If set to "YES" the app version, backend version and current screen name are rendered in an overlay view. |
| `DEBUG_BIOMETRIC_IDENTIFICATION` | NO      | If set to "YES" an Alert is rendered with the exact result code of the biometric identification. |
| `TOT_MESSAGE_FETCH_WORKERS` | 5 | Number of workers to create for message detail fetching. This means that we will have at most a number of concurrent fetches (of the message detail) equal to the number of the workers.

_Note: The sample configuration sets the app to interface with our test environment, on which we work continuously; therefore, it may occur that some features are not always available or are fully working._


#### Dependencies

**module for CIE authentication**
IO uses a [react native module](https://github.com/pagopa/io-cie-android-sdk) to allow authentication through CIE (Carta di Indentità Elettronica)
This package is hosted on [Github Packages](https://github.com/features/packages). In order to install this package you need to be able to access the github registry.
The configuration is pretty simple and fast, you can follow [these instructions](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)
**If you don't do this step you can't download and install the cie module.**

Now you can install the libraries used by the project:

```
$ bundle install
$ yarn install
$ cd ios        # skip on linux
$ pod install   # skip on linux
```

#### Generating API definitions and translations

Finally, generate the definitions from the openapi specs and from the YAML translations:

```
$ yarn generate:all
```

#### Installation on the simulator

On Android (the device simulator must be [launched manually](https://medium.com/@deepak.gulati/running-react-native-app-on-the-android-emulator-11bf309443eb)):

```
$ react-native run-android
```

On iOS (the simulator will be launched automatically):

```
$ react-native run-ios
```

_Note: the app uses CocoaPods, the project to run is therefore `ItaliaApp.xcworkspace` instead of `ItaliaApp.xcodeproj` (`run-ios` will automatically detect it)._

### Build (release)

For the release of the app on the stores we use [Fastlane](https://fastlane.tools/).

#### iOS

The beta distribution is done with [TestFlight](https://developer.apple.com/testflight/).

To release a new beta:

```
$ cd ios
$ bundle exec fastlane testflight_beta
```

#### Android

To release a new alpha:

```
$ bundle exec fastlane alpha
```

_Note: the alpha releases on Android are automatically carried by the `alpha-release-android` job on [circleci](https://circleci.com/gh/pagopa/io-app) on each by merge to the master branch._

### Installation on physical devices (development)

#### iOS

For this step you’ll need to have a proper iOS development certificate on your dev machine that is also installed on your physical device.

To test the io-app on a real iOS device you must:
1. Open the project with Xcode and modify the bundle identifier (eg: add ‘.test’ to the existing one)  
1. Go to the 'Build Settings' tab and in the PROVISIONING_PROFILE section delete the existing ID. Then select 'ios developer' in the debug field of the 'Code Signing Identity'  
1. In General tab select the 'Automatically Menage Signing' checkbox  
1. You must have an Apple id developer and select it from the 'Team' drop-down menu  
1. (Without Xcode) navigate in the io-app project and open the package.json file, in the scripts section add: _"build: ios": "react-native bundle --entry-file = 'index.js' - bundle-output = '. / ios / main.jsbundle' --dev = false --platform = 'ios' "_ 
1. Open the Terminal and from the root directory project run _npm run build: ios_  
1. In Xcode navigate in the project, select _'main.jsbundle'_ and enable the checkbox on the right labeled 'ItaliaApp'
1. Always in Xcode select 'Product' -> 'Clean Build Folder'
1. On the real device connected, accept to trust the device
1. From Xcode select the device by the drop-down list and run ('Product' -> 'Run') on the iOS device, if the unit tests fail they can be disabled by going to Product -> Scheme -> Edit Scheme -> Build


### Development with Backend App and Local Test IDP

To develop the application on your machine using the Backend App and an IDP test, you need to follow some additional steps as described below.<br/>
If you prefer a light way to run IO app, you should consider using [io-dev-api-server](https://github.com/pagopa/io-dev-api-server). This local server mocks almost totally IO backend behaviours and APIs. Note: about SPID, io-dev-api-server acts a pass throught so you can't test it.

#### App Backend and test IDP installation

Follow the documentation of the repository [italia-backend](https://github.com/pagopa/io-backend).

#### WebView, HTTPS and self-signed certificates

At the moment, react-native does not allow to open WebView on HTTPS url with a self-signed certificate. However, the test IDP uses HTTPS and a self-signed certificate. To avoid this problem, it is possible to locally install a Proxy that acts as a proxy-pass to the Backend App and the IDP.

##### Installation of mitmproxy

[Mitmproxy](https://mitmproxy.org/) is a simple proxy to use and is also suitable for our purpose. For installation, follow the documentation page on the [official website](https://docs.mitmproxy.org/stable/overview-installation/).

The script `scripts/mitmproxy_metro_bundler.py` allows the proxy to intercept requests to the Simulator and, only in case of specific ports, to proxy the localhost. Start the proxy with the following command:

```
SIMULATOR_HOST_IP=XXXXX mitmweb --listen-port 9060 --web-port 9061 --ssl-insecure -s scripts/mitmproxy_metro_bundler.py
```

Add in place of `XXXXX`:

* `10.0.2.2` (Standard Android Emulator)
* `10.0.3.2` (Genymotion Android Emulator)

##### Installing the mitmproxy certificate within the emulator Android

Install certificate mitmproxy within the emulator following the official  [guide](https://docs.mitmproxy.org/stable/concepts-certificates/).

#### Set the proxy for the connection in the Android emulator

In the connection configuration enter:

* Proxy IP: `10.0.2.2` (or `10.0.3.2` if you use Genymotion)
* Proxy port: `9060`

### Development with IO dev local server
It is super easy to setup and run. [Here](https://github.com/pagopa/io-dev-api-server) you can find all instructions.
It can be used as it is or you can run it using the [docker image](https://github.com/pagopa/io-dev-api-server/packages).<br/>
`.env.local` pre-filled config file is ready to use with the local server, just run this command:
`cp .env.local .env && yarn postinstall`

### Update the app icons

Follow [this tutorial](https://blog.bam.tech/developper-news/change-your-react-native-app-icons-in-a-single-command-line).

### Internationalization

For multi-language support the application uses:

* [react-native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n) for the integration of translations with user preferences
* YAML files in the directory `locales`
* A YAML-to-typescript conversion script (`generate:locales`).

To add a new language you must:

1. Create a new directory under [locales](locales) using the language code as the name (e.g. `es` for Spanish, `de` for German, etc...).
1. Copy the content from the base language (`en`).
1. Proceed with the translation by editing the YAML and Markdown files.
1. Run the Typescript code generation script (`npm run generate:locales`).
1. Edit the file [ts/i18n.ts](ts/i18n.ts) by adding the new language in the variable `I18n.translations`.

### Error handling

The application uses a custom handler to intercept and notify javascript errors caused by unhandled exceptions. The custom handler code is visible in the file `ts/utils/configureErrorHandler.ts`

### Connection monitoring

The application uses the library [react-native-offline](https://github.com/rauliyohmc/react-native-offline) to monitor the connection status. In case of no connection, a bar is displayed that notifies the user.

The connection status is kept inside the Redux store in the variable `state.network.isConnected`, you can use this data to disable some functions during the absence of the connection.

### Deep linking

The application is able to manage _deep links_. The URL scheme is: `ioit://`. The link format is `ioit://<route-name>`.

### Fonts

The application uses the font _Titillium Web_. Fonts are handled differently than Android and iOS. To use the font, `TitilliumWeb-SemiBoldItalic` example, you must apply the following properties for Android:

```css
{
  fontFamily: 'TitilliumWeb-SemiBoldItalic'
}
```

while in iOS the code to be applied is:

```css
{
  fontFamily: 'Titillium Web',
  fontWeight: '600',
  fontStyle: 'italic'
}
```

To manage fonts and variants more easily, we have created utility functions within the file [ts/theme/fonts.ts](ts/theme/fonts.ts).

### Io-Icon-Font

The application uses a custom font-icon from the name 'io-icon-font'. Thanks to the library [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) which is included in the project, it is possible to create new IconSets. In particular, among the various methods shown in the [appropriate section](https://github.com/oblador/react-native-vector-icons#custom-fonts) of the documentation, we decided to use the one that allows to export the font through IcoMoon. When exporting from [IcoMoon](https://icomoon.io/), you should use the configuration shown in the following picture.

![IcoMoon Export Settings][icomoon-export-settings]

To update the icon-font to a new version, it is necessary to extract and correctly position the following two files from the archive '.zip' generated by IcoMoon:

* `selection.json` contained in the archive root, to be placed in [ts/theme/font-icons/io-icon-font/](ts/theme/font-icons/io-icon-font).
* `io-icon-font.ttf` contained in the directory fonts archive, to be placed in [assets/fonts/io-icon-font/](assets/fonts/io-icon-font).

Once the two files have been copied, it is necessary to update the link of the asset by installing globally and running react-native-asset (version 1.1.4):

```
$ yarn global add react-native-asset@2.0.0
$ react-native-asset
```

This last command deals in particular with copying the asset within a specific folder of the Android sub-project.

### Theming

The application uses [native-base](https://nativebase.io/) and its components for the graphical interface. In particular, we  decided to use as a basis the theme material provided by the library. Although native-base allows to customize part of the theme through the use of variables, it was nevertheless necessary to implement ad-hoc functions that allow to go to modify the theme of the individual components.

#### Extending Native Base default theme

In the [ts/theme](ts/theme) directory there are some files that allow you to manage the theme in a more flexible way than what native-base permits natively.

##### Variables

To define new variables to use in the components theme, you need to edit the file [ts/theme/variables.ts](ts/theme/variables.ts). This file deals with importing the basic variables defined by the `material` theme of native-base and allows to overwrite / define the value of new variables.

##### Components Theme

The native-base library defines the theme of each individual component in a separate `.ts` file that is named after the specific component. For example, the theme file related to the component `Button` is named `Button.ts`. To redefine the theme of the native-base components, it is necessary to create / modify the files in the [ts/theme/components](ts/theme/components) directory. Every file in this directory must export an object that defines the components theme. Take the file `Content.ts` as an example:

```javascript
import { type Theme } from '../types'
import variables from '../variables'

export default (): Theme => {
  const theme = {
    padding: variables.contentPadding,
    backgroundColor: variables.contentBackground
  }

  return theme
}
```

In this file, you can see how two attributes are redefined (`padding` and `backgroundColor`) using the values ​​in the relative variables. The returned object will be used in the file [ts/theme/index.ts](ts/theme/index.ts) to associate it with a specific component type (in this case `NativeBase.Component`).

A more complex example allows you to use the advanced features of the native-base theming layer.

```javascript
import { type Theme } from '../types'
import variables from '../variables'

export default (): Theme => {
  const theme = {
    '.spacer': {
      '.large': {
        height: variables.spacerLargeHeight
      },

      height: variables.spacerHeight
    },

    '.footer': {
      paddingTop: variables.footerPaddingTop,
      paddingLeft: variables.footerPaddingLeft,
      paddingBottom: variables.footerPaddingBottom,
      paddingRight: variables.footerPaddingRight,
      backgroundColor: variables.footerBackground,
      borderTopWidth: variables.footerShadowWidth,
      borderColor: variables.footerShadowColor
    }
  }

  return theme
}
```

Within the theme file of a single component, it is possible to define specific attributes that will be used only if this specific component has a specific property. By defining in the theme object something like:

```javascript
'.footer': {
  paddingTop: variables.footerPaddingTop
}
```

If necessary, you can use the component by associating the `footer` property in the following way `<Component footer />` and automatically the theming system will apply to the component the defined attributes (`paddingTop: variables.footerPaddingTop`).

Another advanced function allows to define the theme of the child components starting from the parent component. Let's take as an example the following code fragment of a generic component:

```javascript
...
render() {
  return(
    <Content>
      <Button>
        <Text>My button</Text>
      </Button>
    </Content>
  )
}
...
```

The native-base library allows you to define the appearance of the child component `Text` present in the parent `Button`. For example, to define the size of the text in all the buttons in the application, simply enter the following code in the file `ts/theme/components/Button.ts`:

```javascript
import variables from '../variables'

export default (): Theme => {
  const theme = {
    'NativeBase.Text': {
      fontSize: variables.btnTextFontSize
    }
  }

  return theme
}
```

You can go even further and combine the two features seen previously:

```javascript
import variables from '../variables'

export default (): Theme => {
  const theme = {
    '.small': {
      'NativeBase.Text': {
        fontSize: variables.btnTextFontSize
      }
    }
  }

  return theme
}
```

In this case, what is defined within the attribute `NativeBase.Text` will be used only if the button has associated a property with a name `small`.

### Custom UI components

#### TextWithIcon

A simple wrapper in which you can insert an icon and a text that will be rendered side by side.

Example of use:

```javascript
<TextWithIcon danger>
  <IconFont name="io-back" />
  <Text>{I18n.t('onboarding.pin.confirmInvalid')}</Text>
</TextWithIcon>
```

To change the wrapper, icon or text theme, edit the `ts/theme/components/TextWithIcon.ts` file.

### End to end test with Detox (experimental)

For integration tests on simulators we use [Detox](https://github.com/wix/detox).

End to end tests are found in [ts/__e2e__/](ts/__e2e__/).

To compile the app in preparation for the test:

```
$ detox build
```

(optional) Launch the iOS simulator (with [ios-sim](https://www.npmjs.com/package/ios-sim) for convenience):

```
$ ios-sim start --devicetypeid "iPhone-6, 10.2"
```

In case you do not launch the simulator, Detox will launch one in the background.

Launch of the tests:

```
$ detox test
```

[icomoon-export-settings]: docs/icomoon-font-export.png "IcoMoon Export Settings"

### Troubleshooting

#### iOS build warning

If, during the archive process, you see one or more warning like this `...RNTextInputMask.o)) was built for newer iOS version (10.3) than being linked (9.0)` you can fix it in this way:
1. Open the project io-app/ios with Xcode
1. Select the library (es. RNTextInputMask) in 'Libraries'
1. Select the name of the library under the label 'PROJECT' and change the iOS Deployment target from 10.3 to 9.0 
