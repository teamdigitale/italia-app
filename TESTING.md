## requirements

* brew install wix/brew/applesimutils
* npm install -g detox-cli (this may not be needed)

## to run the tests

```
# build
detox build --configuration ios.sim.debug
# test
detox test --configuration ios.sim.debug
# test verbose
detox test --loglevel verbose --configuration ios.sim.debug
```

## runnin io-dev-api-server via docker

* docker login https://github.com/pagopa/io-dev-api-server/blob/master/.github/workflows/dockerpush.yml#L53
* https://github.com/pagopa/io-dev-api-server/packages/143158
* docker run -p 3000:3000 -d _id_

## useful links
* https://stackoverflow.com/questions/63607158/xcode-12-building-for-ios-simulator-but-linking-in-object-file-built-for-ios/63955114#63955114

