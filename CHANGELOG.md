# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.26.0-rc.5](https://github.com/pagopa/io-app/compare/1.26.0-rc.4...1.26.0-rc.5) (2021-06-08)


### Features

* **EU Covid Certificate:** [[IAGP-16](https://pagopa.atlassian.net/browse/IAGP-16),[IAGP-19](https://pagopa.atlassian.net/browse/IAGP-19),[IAGP-33](https://pagopa.atlassian.net/browse/IAGP-33)] Display of valid certificate, full-screen QR code and additional textual details  ([#3094](https://github.com/pagopa/io-app/issues/3094)) ([b971c70](https://github.com/pagopa/io-app/commit/b971c707b796a7c0e5b88e85b723c00228cb1032))
* **EU Covid Certificate:** [[IAGP-17](https://pagopa.atlassian.net/browse/IAGP-17),[IAGP-37](https://pagopa.atlassian.net/browse/IAGP-37)] Save QRCode and certificate details as image ([#3103](https://github.com/pagopa/io-app/issues/3103)) ([b4eff4c](https://github.com/pagopa/io-app/commit/b4eff4cba83bd71def44c87b51f39bb80d375092))
* **EU Covid Certificate:** [[IAGP-2](https://pagopa.atlassian.net/browse/IAGP-2)] Introduces the SectionStatusComponent on BaseEuCovidCertificateLayout component ([#3101](https://github.com/pagopa/io-app/issues/3101)) ([8195eee](https://github.com/pagopa/io-app/commit/8195eee50545a3fe5ab2b28328b77d3880cfb3a8))
* **EU Covid Certificate:** [[IAGP-20](https://pagopa.atlassian.net/browse/IAGP-20)] Expired certificate screen ([#3096](https://github.com/pagopa/io-app/issues/3096)) ([60cd893](https://github.com/pagopa/io-app/commit/60cd8936783914cadd9f606024808012d0d2e5ad))
* **EU Covid Certificate:** [[IAGP-22](https://pagopa.atlassian.net/browse/IAGP-22)] Certificate not found screen ([#3091](https://github.com/pagopa/io-app/issues/3091)) ([f03375d](https://github.com/pagopa/io-app/commit/f03375d9991f3de35b5443ce41b4768d32106f8e))
* **EU Covid Certificate:** [[IAGP-23](https://pagopa.atlassian.net/browse/IAGP-23)] Added generic error screen in case of networking errors, 500 error or other unmanaged response code  ([#3095](https://github.com/pagopa/io-app/issues/3095)) ([e0a17ab](https://github.com/pagopa/io-app/commit/e0a17aba69f76783cf86ad5c1d9a40e16321b4ab))
* **EU Covid Certificate:** [[IAGP-35](https://pagopa.atlassian.net/browse/IAGP-35)] Certificate in wrong format ([#3093](https://github.com/pagopa/io-app/issues/3093)) ([4ce8668](https://github.com/pagopa/io-app/commit/4ce8668424c96ed3e751ccb145a1145064ad52cf))


### Bug Fixes

* **EU Covid Certificate:** [[IAGP-48](https://pagopa.atlassian.net/browse/IAGP-48)] Adds preferredLanguage parameter to certificate detail API request  ([#3105](https://github.com/pagopa/io-app/issues/3105)) ([337a889](https://github.com/pagopa/io-app/commit/337a88930e533c27f1489c775a24b1d6065bdd87))
* **EU Covid Certificate:** getCertificate request payload is in a wrong format ([#3117](https://github.com/pagopa/io-app/issues/3117)) ([c520611](https://github.com/pagopa/io-app/commit/c5206117d1612f67b2cb35249fe17d0cf68398f2))


### Chores

* **Bonus Pagamenti Digitali:** [[IAC-71](https://pagopa.atlassian.net/browse/IAC-71)] Added Venpay logo ([#3098](https://github.com/pagopa/io-app/issues/3098)) ([354d816](https://github.com/pagopa/io-app/commit/354d8167415f5f5049fc03a7e48a68841afc4e03))
* **EU Covid Certificate:** [[IAGP-27](https://pagopa.atlassian.net/browse/IAGP-27)] Add mixpanel tracking ([#3109](https://github.com/pagopa/io-app/issues/3109)) ([f97b59a](https://github.com/pagopa/io-app/commit/f97b59a0a52a701abde30c515f24c0d919b6a17f))
* **EU Covid Certificate:** [[IAGP-39](https://pagopa.atlassian.net/browse/IAGP-39)] Update specs with the latest tag version [#3111](https://github.com/pagopa/io-app/issues/3111) ([a345426](https://github.com/pagopa/io-app/commit/a345426515bdc938487f512f52e93146f9d8b0c4))
* **EU Covid Certificate:** [[IAGP-43](https://pagopa.atlassian.net/browse/IAGP-43)] Update API spec ([#3089](https://github.com/pagopa/io-app/issues/3089)) ([f34e001](https://github.com/pagopa/io-app/commit/f34e001fe39ce40b9aa8f021737b741dfb6c90e3))
* **EU Covid Certificate:** [[IAGP-44](https://pagopa.atlassian.net/browse/IAGP-44)] Update api specs and add the "expired" state [#3102](https://github.com/pagopa/io-app/issues/3102) ([0eb9eb6](https://github.com/pagopa/io-app/commit/0eb9eb6b581f31831c46d83808cb16e4372e89ff))
* **EU Covid Certificate:** [[IAGP-45](https://pagopa.atlassian.net/browse/IAGP-45)] Make ActivityIndicator bigger [#3099](https://github.com/pagopa/io-app/issues/3099) ([8ba833a](https://github.com/pagopa/io-app/commit/8ba833ac76d58e5d6f6665fc5e93f859d8e231e5))
* **EU Covid Certificate:** [[IAGP-46](https://pagopa.atlassian.net/browse/IAGP-46)] Prevent the Covid CERT CTA if FF is disabled [#3100](https://github.com/pagopa/io-app/issues/3100) ([58068bf](https://github.com/pagopa/io-app/commit/58068bf9a3e58a917cf7c3561909ff5fde410203))
* **EU Covid Certificate:** [[IAGP-47](https://pagopa.atlassian.net/browse/IAGP-47)] Change the ttl of the volatile cache ([#3104](https://github.com/pagopa/io-app/issues/3104)) ([721213b](https://github.com/pagopa/io-app/commit/721213b08d55deeba44c3f18e49cfec01e5fd0cc))
* **EU Covid Certificate:** [[IAGP-49](https://pagopa.atlassian.net/browse/IAGP-49)] Add certificate expired test case [#3106](https://github.com/pagopa/io-app/issues/3106) ([452edf4](https://github.com/pagopa/io-app/commit/452edf4b5c59db4649faf907dc280829d7f1c1d0))
* **EU Covid Certificate:** [[IAGP-50](https://pagopa.atlassian.net/browse/IAGP-50)] Enable EuCovidCert feature flag [#3112](https://github.com/pagopa/io-app/issues/3112) ([1c1bd2d](https://github.com/pagopa/io-app/commit/1c1bd2dea20ed2714cf42c973ab7090d09548a8f))
* **EU Covid Certificate:** [[IAGP-51](https://pagopa.atlassian.net/browse/IAGP-51)] Track eucovidcert message ([#3114](https://github.com/pagopa/io-app/issues/3114)) ([29bbd6d](https://github.com/pagopa/io-app/commit/29bbd6d2bc31cb1446dd61ac94c3051b3419d1aa))
* **EU Covid Certificate:** [[IAGP-52](https://pagopa.atlassian.net/browse/IAGP-52)] Copy check ([#3115](https://github.com/pagopa/io-app/issues/3115)) ([49cf58c](https://github.com/pagopa/io-app/commit/49cf58cb2fd21675d179f3c510003aa76cc7cbb9))
* **EU Covid Certificate:** [[IAGP-53](https://pagopa.atlassian.net/browse/IAGP-53)] Graphical refinements ([#3116](https://github.com/pagopa/io-app/issues/3116)) ([f91f2ee](https://github.com/pagopa/io-app/commit/f91f2ee3252d6a11c1c447451d170627f3711f2c))
* [[#178393622](https://www.pivotaltracker.com/story/show/178393622)] Changed [#5](https://github.com/pagopa/io-app/issues/5)C6F82 color to [#475](https://github.com/pagopa/io-app/issues/475)A6D ([#3092](https://github.com/pagopa/io-app/issues/3092)) ([98a6046](https://github.com/pagopa/io-app/commit/98a60464e5faf1ca2e604a9f3a5ea2f3ac8ec477)), closes [#5C6F82](https://github.com/pagopa/io-app/issues/5C6F82) [#475A6](https://github.com/pagopa/io-app/issues/475A6) [#5C6F82](https://github.com/pagopa/io-app/issues/5C6F82) [#475A6](https://github.com/pagopa/io-app/issues/475A6)

## [1.26.0-rc.4](https://github.com/pagopa/io-app/compare/1.26.0-rc.3...1.26.0-rc.4) (2021-06-04)


### Chores

* **EU Covid Certificate:** [[IAGP-40](https://pagopa.atlassian.net/browse/IAGP-40)] Add backoff waiting time on getCertificate error ([#3084](https://github.com/pagopa/io-app/issues/3084)) ([4f4716f](https://github.com/pagopa/io-app/commit/4f4716f5c5dab42a6271f1247781d9c3a483751d))

## [1.26.0-rc.3](https://github.com/pagopa/io-app/compare/1.26.0-rc.2...1.26.0-rc.3) (2021-06-04)


### Chores

* **EU Covid Certificate:** [[IAGP-38](https://pagopa.atlassian.net/browse/IAGP-38)] Handle message routing ([#3085](https://github.com/pagopa/io-app/issues/3085)) ([bd107c9](https://github.com/pagopa/io-app/commit/bd107c932339d36569ea51ed570f0b2435f7a730))

## [1.26.0-rc.2](https://github.com/pagopa/io-app/compare/1.26.0-rc.1...1.26.0-rc.2) (2021-06-04)


### Features

* **EU Covid Certificate:** [[IAGP-21](https://pagopa.atlassian.net/browse/IAGP-21)] Implements Covid Certificate Revoked Component ([#3083](https://github.com/pagopa/io-app/issues/3083)) ([cabfd7f](https://github.com/pagopa/io-app/commit/cabfd7fa10827bb17871451b69d0204c70af7e71))
* **EU Covid Certificate:** [[IAGP-24](https://pagopa.atlassian.net/browse/IAGP-24)] Implements NotOperarional screen for EUCovidCert ([#3088](https://github.com/pagopa/io-app/issues/3088)) ([e65f5ad](https://github.com/pagopa/io-app/commit/e65f5ada1992514b5c123af338d5b5604047b050))
* **EU Covid Certificate:** [[IAGP-26](https://pagopa.atlassian.net/browse/IAGP-26)] Implements TemporarilyUnavailable screen component [#3087](https://github.com/pagopa/io-app/issues/3087) ([a3e2a2d](https://github.com/pagopa/io-app/commit/a3e2a2dbd21a53e24edf3198d7a7ad881b8f8c16))
* **EU Covid Certificate:** [[IAGP-31](https://pagopa.atlassian.net/browse/IAGP-31)] Add "View" CTA on EuCovidCert Message list item ([#3086](https://github.com/pagopa/io-app/issues/3086)) ([0066ce8](https://github.com/pagopa/io-app/commit/0066ce8516ad03748d6979e32becb4bf4183c3ce))
* **EU Covid Certificate:** [[IAGP-34](https://pagopa.atlassian.net/browse/IAGP-34),[IA-6](https://pagopa.atlassian.net/browse/IA-6)] Add COPY as supported schema in iohandledlink ([#3077](https://github.com/pagopa/io-app/issues/3077)) ([69a2049](https://github.com/pagopa/io-app/commit/69a20491e7caacac711c6a05593c54c131f70e9b))
* **EU Covid Certificate:** [[IAGP-36](https://pagopa.atlassian.net/browse/IAGP-36)] Add euCovidCert as new section status ([#3073](https://github.com/pagopa/io-app/issues/3073)) ([9a2e3ed](https://github.com/pagopa/io-app/commit/9a2e3ed07cf1a2e57e3255f625eb4ac290b1869f))


### Chores

* **Carta Giovani Nazionale:** [[#178127305](https://www.pivotaltracker.com/story/show/178127305)] Adds Department name and Eyca Logo on card component ([#3042](https://github.com/pagopa/io-app/issues/3042)) ([c8c9267](https://github.com/pagopa/io-app/commit/c8c92675e1ba3b151e6e42fd3a4975c0e4e6eafb))
* **EU Covid Certificate:** [[IAGP-10](https://pagopa.atlassian.net/browse/IAGP-10),[IAGP-12](https://pagopa.atlassian.net/browse/IAGP-12)] Update Message spec with EUCovidCert ([#3081](https://github.com/pagopa/io-app/issues/3081)) ([dd83c65](https://github.com/pagopa/io-app/commit/dd83c656719b86b7f544e49239c8f808b0c4e859))
* **EU Covid Certificate:** [[IAGP-5](https://pagopa.atlassian.net/browse/IAGP-5)] Types, actions & store for EU Covid Certificate ([#3076](https://github.com/pagopa/io-app/issues/3076)) ([4a04070](https://github.com/pagopa/io-app/commit/4a040706a8bea52d37185a89ed99548a70293922))
* **EU Covid Certificate:** [[IAGP-6](https://pagopa.atlassian.net/browse/IAGP-6)] Added screens layout, routing and navigation ([#3079](https://github.com/pagopa/io-app/issues/3079)) ([72d0dc7](https://github.com/pagopa/io-app/commit/72d0dc7d048fe3196791f33d70a87e2bd36590f4))
* **EU Covid Certificate:** [[IAGP-9](https://pagopa.atlassian.net/browse/IAGP-9)] Add getCertificate API network logic ([#3078](https://github.com/pagopa/io-app/issues/3078)) ([20b93cd](https://github.com/pagopa/io-app/commit/20b93cd054519907916873e46f0638ac99232384))

## [1.26.0-rc.1](https://github.com/pagopa/io-app/compare/1.26.0-rc.0...1.26.0-rc.1) (2021-05-28)


### Features

* [[#177558088](https://www.pivotaltracker.com/story/show/177558088)] Idps data for selection grid is now loaded from CDN ([#3008](https://github.com/pagopa/io-app/issues/3008)) ([3752586](https://github.com/pagopa/io-app/commit/37525863f8bd5b668f0db220a5c070093f519ad6))
* **Carta Giovani Nazionale:** [[#178020526](https://www.pivotaltracker.com/story/show/178020526)] Implements components to filter on merchants search ([#3033](https://github.com/pagopa/io-app/issues/3033)) ([0d7c7cb](https://github.com/pagopa/io-app/commit/0d7c7cb8d02490f5c7eaeaacd1500f635406422f))


### Bug Fixes

* [[#177478372](https://www.pivotaltracker.com/story/show/177478372)] Multiple enable/disable services doesn't work ([#3052](https://github.com/pagopa/io-app/issues/3052)) ([60371e5](https://github.com/pagopa/io-app/commit/60371e5868ff32245caea0c36c5dbf594f72a339))
* [[#178166915](https://www.pivotaltracker.com/story/show/178166915)] Fix the problem of setting the security code after reinstalling the app on IOS ([#3069](https://github.com/pagopa/io-app/issues/3069)) ([343248b](https://github.com/pagopa/io-app/commit/343248b218bfccb07648e258be1a85251a909cc2))


### Chores

* **EU Covid Certificate:** [[IAGP-4](https://pagopa.atlassian.net/browse/IAGP-4)] Add EU covid certificate feature flag ([#3071](https://github.com/pagopa/io-app/issues/3071)) ([fdd2077](https://github.com/pagopa/io-app/commit/fdd207704a65f4a2473d74d276e94540fc1d4659))
* **Green Pass:** [[IAGP-1](https://pagopa.atlassian.net/browse/IAGP-1)] Add "Green Pass" to changelog scope [#3066](https://github.com/pagopa/io-app/issues/3066) ([9bce3d3](https://github.com/pagopa/io-app/commit/9bce3d35b215c1cc992d6777f9ed77921fa2615b))
* [[#178297319](https://www.pivotaltracker.com/story/show/178297319)] Fixes broken urls [#3065](https://github.com/pagopa/io-app/issues/3065) ([7ec0418](https://github.com/pagopa/io-app/commit/7ec04189838fa9d7e5e848d40c6e09892b418421))

## [1.26.0-rc.0](https://github.com/pagopa/io-app/compare/1.25.0-rc.14...1.26.0-rc.0) (2021-05-25)


### Features

* [[#176409590](https://www.pivotaltracker.com/story/show/176409590)] Removed favoriteWalletId from Redux store ([#3054](https://github.com/pagopa/io-app/issues/3054)) ([cd22427](https://github.com/pagopa/io-app/commit/cd22427a7ef6ebdcc6969c027d0d900c97cec690))
* [[#178230437](https://www.pivotaltracker.com/story/show/178230437)] Changed valid until color [#3058](https://github.com/pagopa/io-app/issues/3058) ([84748ca](https://github.com/pagopa/io-app/commit/84748ca1e7303f0d4fdf1ddbe11d92ef849ec734))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[IAC-66](https://pagopa.atlassian.net/browse/IAC-66)] Wrong normalization of cashback amount when the pivot transaction is in a different day but in the same page ([#3061](https://github.com/pagopa/io-app/issues/3061)) ([688ddb4](https://github.com/pagopa/io-app/commit/688ddb43f1364ce4263e534296bb079da1273513))
* [[#176538461](https://www.pivotaltracker.com/story/show/176538461)] Fix broken ScanQrCodeScreen layout ([#3051](https://github.com/pagopa/io-app/issues/3051)) ([1b1aa13](https://github.com/pagopa/io-app/commit/1b1aa13caaeb4f98f34ba646d274a4b983e77fda))
* [[#178243533](https://www.pivotaltracker.com/story/show/178243533)] Fix cards not visible during payment ([#3060](https://github.com/pagopa/io-app/issues/3060)) ([4bb6b3e](https://github.com/pagopa/io-app/commit/4bb6b3e50345379b71c4449252c49516bb383cf6))


### Chores

* **Bonus Pagamenti Digitali:** [[IAC-70](https://pagopa.atlassian.net/browse/IAC-70)] Write-off copy update [#3063](https://github.com/pagopa/io-app/issues/3063) ([58a00eb](https://github.com/pagopa/io-app/commit/58a00eb738a840c9d0f73818bd049d6983d799c6))
* [[#177058428](https://www.pivotaltracker.com/story/show/177058428)] Changed native base Text with typography components in thank you page screens ([#3053](https://github.com/pagopa/io-app/issues/3053)) ([198718f](https://github.com/pagopa/io-app/commit/198718fbee0d88c9048e74936cc56aa48f373729))
* **Sicilia Vola:** [[IASV-1](https://pagopa.atlassian.net/browse/IASV-1)] Add Sicilia Vola Id for title generation and changelog  ([#3056](https://github.com/pagopa/io-app/issues/3056)) ([f4947ab](https://github.com/pagopa/io-app/commit/f4947ab5da34adb644de5f662b682b1df182c5f4))

## [1.25.0-rc.14](https://github.com/pagopa/io-app/compare/1.25.0-rc.13...1.25.0-rc.14) (2021-05-19)


### Bug Fixes

* [[#177270155](https://www.pivotaltracker.com/story/show/177270155)] Fix accessibility for ios in add credit card screen ([#3020](https://github.com/pagopa/io-app/issues/3020)) ([a60db57](https://github.com/pagopa/io-app/commit/a60db57092efeda649506a6b4c13f3276912f287))


### Chores

* **Bonus Pagamenti Digitali:** [[IAC-64](https://pagopa.atlassian.net/browse/IAC-64)] Disable paginated transaction feature flag [#3055](https://github.com/pagopa/io-app/issues/3055) ([9e4b9a1](https://github.com/pagopa/io-app/commit/9e4b9a1f97a391df7f9d48c7c8031fafb6759a2e))
* [[#178065380](https://www.pivotaltracker.com/story/show/178065380)] Replaced failed identification text ([#3044](https://github.com/pagopa/io-app/issues/3044)) ([bb81939](https://github.com/pagopa/io-app/commit/bb819391c8fbe291f5db923e4c1dcd3b6849b57c))

## [1.25.0-rc.13](https://github.com/pagopa/io-app/compare/1.25.0-rc.12...1.25.0-rc.13) (2021-05-18)


### Features

* **Bonus Pagamenti Digitali:** [[#176801780](https://www.pivotaltracker.com/story/show/176801780)] Avoid Android hardware go back on add payment method ([#3034](https://github.com/pagopa/io-app/issues/3034)) ([323d368](https://github.com/pagopa/io-app/commit/323d368c0e3748ed33d293335b24ada9118256a3))
* [[#177058404](https://www.pivotaltracker.com/story/show/177058404)] Implement amount information on payment success screen ([#2975](https://github.com/pagopa/io-app/issues/2975)) ([56160af](https://github.com/pagopa/io-app/commit/56160af3cbbfc07d679d44ff7654fe1fa771e9e1))


### Bug Fixes

* [[#178157694](https://www.pivotaltracker.com/story/show/178157694)] No transactions done even if there are ([#3046](https://github.com/pagopa/io-app/issues/3046)) ([3871a33](https://github.com/pagopa/io-app/commit/3871a336cd34751b67d140bbb638930107aabe02))
* **Bonus Pagamenti Digitali:** [[IAC-57](https://pagopa.atlassian.net/browse/IAC-57)] Privative displayed as incoming when adding a new payment method during a payment [#3049](https://github.com/pagopa/io-app/issues/3049) ([055795a](https://github.com/pagopa/io-app/commit/055795a33788e6f64912f257cfa4c110f7259e38))
* [[#177534705](https://www.pivotaltracker.com/story/show/177534705)] Fixed header with close button that causes press problems ([#3006](https://github.com/pagopa/io-app/issues/3006)) ([c2f2dc1](https://github.com/pagopa/io-app/commit/c2f2dc1c031ab07f4b5440fe333a9fbd30bb24c0))
* **Payments:** [[#176919872](https://www.pivotaltracker.com/story/show/176919872)] Dismiss keyboard on create credit card ([#3030](https://github.com/pagopa/io-app/issues/3030)) ([e95c621](https://github.com/pagopa/io-app/commit/e95c621b8095f51d6b8622f5ee5734691653edda))


### Chores

* **Bonus Pagamenti Digitali:** [[IAC-62](https://pagopa.atlassian.net/browse/IAC-62)] Add changelog scope for cashback jira project [#3050](https://github.com/pagopa/io-app/issues/3050) ([4c96f51](https://github.com/pagopa/io-app/commit/4c96f51aa671fecf651abf6ed033a70ca6c5ce48))
* **deps:** bump hosted-git-info from 2.8.8 to 2.8.9 ([#3032](https://github.com/pagopa/io-app/issues/3032)) ([b3da6a4](https://github.com/pagopa/io-app/commit/b3da6a407c0151ecd73ce4ba28b4717e09040d2c))
* **deps:** bump lodash from 4.17.20 to 4.17.21 [#3031](https://github.com/pagopa/io-app/issues/3031) ([2f951f0](https://github.com/pagopa/io-app/commit/2f951f0b71e3b6640c358a55eab0f51085e03c85))

## [1.25.0-rc.12](https://github.com/pagopa/io-app/compare/1.25.0-rc.11...1.25.0-rc.12) (2021-05-14)


### Bug Fixes

* [[#178155677](https://www.pivotaltracker.com/story/show/178155677)] Local scheduled notification aren't canceled after login with SPID / CIE ([#3045](https://github.com/pagopa/io-app/issues/3045)) ([e3a5f2b](https://github.com/pagopa/io-app/commit/e3a5f2bbf9466f6d9ae5a8a09474079b1be78d62))

## [1.25.0-rc.11](https://github.com/pagopa/io-app/compare/1.25.0-rc.10...1.25.0-rc.11) (2021-05-13)


### Features

* **Carta Giovani Nazionale:** [[#178020445](https://www.pivotaltracker.com/story/show/178020445)] Implements Tabs for CGN merchant list to show online and places merchants ([#3024](https://github.com/pagopa/io-app/issues/3024)) ([b4a440b](https://github.com/pagopa/io-app/commit/b4a440bfd889b060d0c98d9cb6d7adca974c33cc))


### Bug Fixes

* [[#178141300](https://www.pivotaltracker.com/story/show/178141300)] Profile reducer has a wrong someUpdating state ([#3043](https://github.com/pagopa/io-app/issues/3043)) ([ed9e3c2](https://github.com/pagopa/io-app/commit/ed9e3c2133fe2e941e613cbc20cb33efd7ecfd54))


### Chores

* [[#174150612](https://www.pivotaltracker.com/story/show/174150612)] Upgrade react-native-push-notification ([#3036](https://github.com/pagopa/io-app/issues/3036)) ([4fdff96](https://github.com/pagopa/io-app/commit/4fdff96005b7a24c894077d8f8d56caf8e8f7a43))

## [1.25.0-rc.10](https://github.com/pagopa/io-app/compare/1.25.0-rc.9...1.25.0-rc.10) (2021-05-12)


### Features

* [[#178036707](https://www.pivotaltracker.com/story/show/178036707)] Added profile name capitalization ([#3028](https://github.com/pagopa/io-app/issues/3028)) ([cc7ef36](https://github.com/pagopa/io-app/commit/cc7ef36220574f5805f951bafa518e4f5985198e))


### Bug Fixes

* [[#178070799](https://www.pivotaltracker.com/story/show/178070799)] Allow the addition of Diners cards ([#3039](https://github.com/pagopa/io-app/issues/3039)) ([d0f20f4](https://github.com/pagopa/io-app/commit/d0f20f4aba3195a506244be1eb657f456a7aca34))
* [[#178094151](https://www.pivotaltracker.com/story/show/178094151)] Xcode 12.5 iOS build breaks ([#3035](https://github.com/pagopa/io-app/issues/3035)) ([b1dbd7c](https://github.com/pagopa/io-app/commit/b1dbd7c8ed4f96ec1c5d7aec044330ef86d182ae))
* [[#178129966](https://www.pivotaltracker.com/story/show/178129966)] Cannot deploy a develop build on physical device [#3040](https://github.com/pagopa/io-app/issues/3040) ([6cdc6b4](https://github.com/pagopa/io-app/commit/6cdc6b450b068b24a4d988ac5c446ba83b782a39))


### Chores

* [[#177132354](https://www.pivotaltracker.com/story/show/177132354)] Add lookupID for PM observability ([#3004](https://github.com/pagopa/io-app/issues/3004)) ([e19f73f](https://github.com/pagopa/io-app/commit/e19f73ffbff0d907286a6ba2b33a909f059847ac))
* [[#178106274](https://www.pivotaltracker.com/story/show/178106274)] Remove legacy backend status endpoint ([#3038](https://github.com/pagopa/io-app/issues/3038)) ([d258d46](https://github.com/pagopa/io-app/commit/d258d461749187a2a0140d145d27bd41eeefce44))

## [1.25.0-rc.9](https://github.com/pagopa/io-app/compare/1.25.0-rc.8...1.25.0-rc.9) (2021-05-06)


### Chores

* **Bonus Pagamenti Digitali:** [[#178052788](https://www.pivotaltracker.com/story/show/178052788)] Enable bpd paginated transactions ([#3025](https://github.com/pagopa/io-app/issues/3025)) ([8cdc901](https://github.com/pagopa/io-app/commit/8cdc901ea5c9c592d06376af071cbc9af9a12e75))

## [1.25.0-rc.8](https://github.com/pagopa/io-app/compare/1.25.0-rc.7...1.25.0-rc.8) (2021-05-06)


### Features

* **Bonus Pagamenti Digitali:** [[#176997427](https://www.pivotaltracker.com/story/show/176997427)] Added V-PAY logo for cobadge and credit card ([#3018](https://github.com/pagopa/io-app/issues/3018)) ([deef18d](https://github.com/pagopa/io-app/commit/deef18d9d711f7ffb505bd6f1cbb93632f654852))
* **Bonus Pagamenti Digitali:** [[#177544049](https://www.pivotaltracker.com/story/show/177544049),[#177852497](https://www.pivotaltracker.com/story/show/177852497)] Added paginated loading for cashback transactions ([#2995](https://github.com/pagopa/io-app/issues/2995)) ([c0fe7c0](https://github.com/pagopa/io-app/commit/c0fe7c053ab330368ade89161bdd7d86790f0d44))
* **Bonus Pagamenti Digitali:** [[#177544138](https://www.pivotaltracker.com/story/show/177544138)] Add mixpanel tracking for paginated transaction ([#3012](https://github.com/pagopa/io-app/issues/3012)) ([949d69f](https://github.com/pagopa/io-app/commit/949d69f57faf0e63c7188d80813c66df5d77c23e))
* **Bonus Pagamenti Digitali:** [[#177965778](https://www.pivotaltracker.com/story/show/177965778)] Change "last valid transition" to "last update" in transactions screen ([#3010](https://github.com/pagopa/io-app/issues/3010)) ([1d49dd7](https://github.com/pagopa/io-app/commit/1d49dd7a14bab9685e2b7577dc306227eecca2be))

## [1.25.0-rc.7](https://github.com/pagopa/io-app/compare/1.25.0-rc.6...1.25.0-rc.7) (2021-05-05)


### Features

* [[#177760905](https://www.pivotaltracker.com/story/show/177760905)] Feature logout from identification modal ([#3001](https://github.com/pagopa/io-app/issues/3001)) ([5c32944](https://github.com/pagopa/io-app/commit/5c3294436f55bff288ef259ce634ebf6eacbf602))
* **Bonus Pagamenti Digitali:** [[#175741773](https://www.pivotaltracker.com/story/show/175741773)] Update Mastercard circuit to "Mastercard / Maestro" for cashback transaction detail ([#3013](https://github.com/pagopa/io-app/issues/3013)) ([183955f](https://github.com/pagopa/io-app/commit/183955f585eeaa1cdd2eff5f96840a8ab918a5fa))


### Bug Fixes

* [[#177161429](https://www.pivotaltracker.com/story/show/177161429)] Fixed missing loading on delete credit card ([#2980](https://github.com/pagopa/io-app/issues/2980)) ([38703e7](https://github.com/pagopa/io-app/commit/38703e7cca53f76c32ee39ac19979ba802adf409))
* [[#177905135](https://www.pivotaltracker.com/story/show/177905135)] Fixed wrong font family ([#3005](https://github.com/pagopa/io-app/issues/3005)) ([2678ebd](https://github.com/pagopa/io-app/commit/2678ebdddafe26f5508d752a934ce422b556af27))
* [[#177960813](https://www.pivotaltracker.com/story/show/177960813)] Changelog may contains noise suffixes ([#3007](https://github.com/pagopa/io-app/issues/3007)) ([7fc581f](https://github.com/pagopa/io-app/commit/7fc581f2d11c78a5cd9b1949181ee5be20c837d5))
* grammar error in locales/en/index.yml ([#3016](https://github.com/pagopa/io-app/issues/3016)) ([a5d3aa1](https://github.com/pagopa/io-app/commit/a5d3aa1d5ddae7e09d3ab644f17076bfd25a8f1c))
* Wrong copy for SPID url ([#3015](https://github.com/pagopa/io-app/issues/3015)) ([1c8141a](https://github.com/pagopa/io-app/commit/1c8141a49744ecf8eba41eaf17d70cda78dcf740))


### Chores

* [[#177479598](https://www.pivotaltracker.com/story/show/177479598)] Convert bpdTestOverlay to BetaTestingOverlay as generic component ([#2951](https://github.com/pagopa/io-app/issues/2951)) ([0db36c2](https://github.com/pagopa/io-app/commit/0db36c2162797ffdceaaa68743cc2858469bb54f))
* [[#178001227](https://www.pivotaltracker.com/story/show/178001227)] Upgrade node version to 12 ([#3011](https://github.com/pagopa/io-app/issues/3011)) ([151e541](https://github.com/pagopa/io-app/commit/151e541073179cdb6ee5a5640fb015a8e44ae538))
* Activate local services - staging url ([#3022](https://github.com/pagopa/io-app/issues/3022)) ([c7d3b61](https://github.com/pagopa/io-app/commit/c7d3b614d78f08158125b3e27bbd3ffe034cad77))
* **Bonus Pagamenti Digitali:** [[#176314517](https://www.pivotaltracker.com/story/show/176314517)] Refactoring: backoff reducer ([#3003](https://github.com/pagopa/io-app/issues/3003)) ([e73cf8d](https://github.com/pagopa/io-app/commit/e73cf8d1c1add4fd6a8ba3090c4485cedc138764))
* **Carta Giovani Nazionale:** [[#177367462](https://www.pivotaltracker.com/story/show/177367462)] Implements tests on Eyca Activation worker ([#3002](https://github.com/pagopa/io-app/issues/3002)) ([ec4418a](https://github.com/pagopa/io-app/commit/ec4418add19230f6be04d7b2bc4573fdd6e49541))

## [1.25.0-rc.6](https://github.com/pagopa/io-app/compare/1.25.0-rc.5...1.25.0-rc.6) (2021-04-28)


### Features

* **Bonus Pagamenti Digitali:** [[#177543882](https://www.pivotaltracker.com/story/show/177543882)] Add paginated transactions networking logic ([#2983](https://github.com/pagopa/io-app/issues/2983)) ([f64d21f](https://github.com/pagopa/io-app/commit/f64d21f7ff34041f7407b86941c1e86570fb72f8))
* [[#177760591](https://www.pivotaltracker.com/story/show/177760591)] Added profile name on identification modal ([#2996](https://github.com/pagopa/io-app/issues/2996)) ([c85c1c3](https://github.com/pagopa/io-app/commit/c85c1c30a2fafaa428e4bbeff24891415e55c583))
* [[IRS-3](https://pagopa.atlassian.net/browse/IRS-3)] Services preferences copy update [#3000](https://github.com/pagopa/io-app/issues/3000) ([1f15c9f](https://github.com/pagopa/io-app/commit/1f15c9f5820be608064698ddf7d94a7073239fde))


### Bug Fixes

* [[#177001144](https://www.pivotaltracker.com/story/show/177001144)] Changed latest transactions label when transactions are hidden ([#2999](https://github.com/pagopa/io-app/issues/2999)) ([b76e092](https://github.com/pagopa/io-app/commit/b76e092807221f876297bb8531f35c93f05332cb))
* [[#177536180](https://www.pivotaltracker.com/story/show/177536180)] The logout delay is not handled ([#2990](https://github.com/pagopa/io-app/issues/2990)) ([27b5f52](https://github.com/pagopa/io-app/commit/27b5f52352b3b180f071f915854eb21b1c180341))


### Chores

* [[#177058553](https://www.pivotaltracker.com/story/show/177058553)] Added outcome code message component test ([#2991](https://github.com/pagopa/io-app/issues/2991)) ([f79695c](https://github.com/pagopa/io-app/commit/f79695c0564702f7b7b141d958a7c4bb02236638))
* [[#177696948](https://www.pivotaltracker.com/story/show/177696948)] Remove Services by scope API ([#2973](https://github.com/pagopa/io-app/issues/2973)) ([dc64bfc](https://github.com/pagopa/io-app/commit/dc64bfc2b07c703463636f6d2846360d48b6a0c6))
* [[#177698138](https://www.pivotaltracker.com/story/show/177698138)] Remove services by scope tests ([#2998](https://github.com/pagopa/io-app/issues/2998)) ([c33aee9](https://github.com/pagopa/io-app/commit/c33aee98139039cef96aa679c10f9459bd48d36d))
* [[#177795910](https://www.pivotaltracker.com/story/show/177795910)] Add codecov checksum ([#2988](https://github.com/pagopa/io-app/issues/2988)) ([613b983](https://github.com/pagopa/io-app/commit/613b983989fe2212066c0e82a57d760eba73dde9))

## [1.25.0-rc.5](https://github.com/pagopa/io-app/compare/1.25.0-rc.4...1.25.0-rc.5) (2021-04-22)


### Features

* **Bonus Pagamenti Digitali:** [[#177543245](https://www.pivotaltracker.com/story/show/177543245)] Manage pre-compiled IBAN in technical IBAN case ([#2977](https://github.com/pagopa/io-app/issues/2977)) ([fb5ff74](https://github.com/pagopa/io-app/commit/fb5ff74cfb6f07abe4ce56d2e61bfd6941da065b))
* [[#175800057](https://www.pivotaltracker.com/story/show/175800057),[#176870138](https://www.pivotaltracker.com/story/show/176870138)] Show when credit-card/bancomat/cobadge is expired ([#2982](https://github.com/pagopa/io-app/issues/2982)) ([3dd3c76](https://github.com/pagopa/io-app/commit/3dd3c761f6f176403272d051fda52b8a60a17cc0))
* [[#177795379](https://www.pivotaltracker.com/story/show/177795379)] Removed assistance form web view component [#2989](https://github.com/pagopa/io-app/issues/2989) ([6885b58](https://github.com/pagopa/io-app/commit/6885b587de107375b44697ce82716bf2c612ed6c))


### Bug Fixes

* **Carta Giovani Nazionale:** [[#177777595](https://www.pivotaltracker.com/story/show/177777595)] Accessibility improvements on CGN screens and bottomsheets ([#2992](https://github.com/pagopa/io-app/issues/2992)) ([b4ceda0](https://github.com/pagopa/io-app/commit/b4ceda0cc25cbf4a9952d96f2a550582561e4ccb))
* [[#177270155](https://www.pivotaltracker.com/story/show/177270155)] Improve accessibility flow on add card screen ([#2942](https://github.com/pagopa/io-app/issues/2942)) ([3eefc1b](https://github.com/pagopa/io-app/commit/3eefc1b91f5c528b6e5343ebf64277bbe2642fca))


### Chores

* [[#177560087](https://www.pivotaltracker.com/story/show/177560087)] Changed pick psp screen UI ([#2954](https://github.com/pagopa/io-app/issues/2954)) ([dfe7310](https://github.com/pagopa/io-app/commit/dfe7310c68057194dc0ee1138815d83083f95ee4))

## [1.25.0-rc.4](https://github.com/pagopa/io-app/compare/1.25.0-rc.3...1.25.0-rc.4) (2021-04-19)

## [1.25.0-rc.3](https://github.com/pagopa/io-app/compare/1.25.0-rc.2...1.25.0-rc.3) (2021-04-19)

## [1.25.0-rc.2](https://github.com/pagopa/io-app/compare/1.25.0-rc.1...1.25.0-rc.2) (2021-04-19)


### Features

* **Bonus Pagamenti Digitali:** [[#177542720](https://www.pivotaltracker.com/story/show/177542720)] Add technical iban information to mixpanel ([#2978](https://github.com/pagopa/io-app/issues/2978)) ([37d2274](https://github.com/pagopa/io-app/commit/37d2274f3627b1cd78e8bc43e79f9a3bbdfcf418))

## [1.25.0-rc.1](https://github.com/pagopa/io-app/compare/1.25.0-rc.0...1.25.0-rc.1) (2021-04-19)


### Features

* **Bonus Pagamenti Digitali:** [[#177542335](https://www.pivotaltracker.com/story/show/177542335)] Citizen v2 api integration ([#2969](https://github.com/pagopa/io-app/issues/2969)) ([dd277b7](https://github.com/pagopa/io-app/commit/dd277b78ea380184ad92388b44c254bbb4d47105))
* **Bonus Pagamenti Digitali:** [[#177542840](https://www.pivotaltracker.com/story/show/177542840)] Show technical IBAN information ([#2974](https://github.com/pagopa/io-app/issues/2974)) ([53d6f86](https://github.com/pagopa/io-app/commit/53d6f86178a6fedecfcbf8ab4cf21f06edd22827))
* **Bonus Pagamenti Digitali:** [[#177740790](https://www.pivotaltracker.com/story/show/177740790)] Actions & store definiton for paginated transactions ([#2972](https://github.com/pagopa/io-app/issues/2972)) ([fa958cc](https://github.com/pagopa/io-app/commit/fa958cc7c6a8915293ee59619e4e8e6f013b051a))


### Bug Fixes

* [[#177606620](https://www.pivotaltracker.com/story/show/177606620)] Buttons inside BottomSheets are not pressable on Android ([#2985](https://github.com/pagopa/io-app/issues/2985)) ([3ea895d](https://github.com/pagopa/io-app/commit/3ea895db4208d3fc4561902dfad1fe1da149fe19))
* [[#177775588](https://www.pivotaltracker.com/story/show/177775588)] Customer care working hours update [#2984](https://github.com/pagopa/io-app/issues/2984) ([aa7add5](https://github.com/pagopa/io-app/commit/aa7add58cf4b0e407ec94a58b89d8a3698809870))

## [1.25.0-rc.0](https://github.com/pagopa/io-app/compare/1.24.0-rc.8...1.25.0-rc.0) (2021-04-14)


### Features

* [[#177386218](https://www.pivotaltracker.com/story/show/177386218)] Remove transaction dynamic header on wallet screen [#2966](https://github.com/pagopa/io-app/issues/2966) ([f6454af](https://github.com/pagopa/io-app/commit/f6454af463fb196df8a2b56a286c032c61012846))
* **Bonus Pagamenti Digitali:** [[#177542335](https://www.pivotaltracker.com/story/show/177542335),[#177543882](https://www.pivotaltracker.com/story/show/177543882)] Add code generation for citizen and winning_transaction v2 api ([#2968](https://github.com/pagopa/io-app/issues/2968)) ([817ffc3](https://github.com/pagopa/io-app/commit/817ffc3bffe176cd49d8dd11515c1f061783eb10))
* **Carta Giovani Nazionale:** [[#177458070](https://www.pivotaltracker.com/story/show/177458070)] Bonuses Available list now follows the same logic of bonuses in carousel ([#2960](https://github.com/pagopa/io-app/issues/2960)) ([2769d72](https://github.com/pagopa/io-app/commit/2769d72abce758b487a8cd5162811d655eb9b3e3))
* [[#177590245](https://www.pivotaltracker.com/story/show/177590245)] Added new component to shown assistance form in web view ([#2959](https://github.com/pagopa/io-app/issues/2959)) ([9e83ca4](https://github.com/pagopa/io-app/commit/9e83ca44351c049f7d41e3d60b8f960aa50944fe))


### Bug Fixes

* [[#177314796](https://www.pivotaltracker.com/story/show/177314796)] Starting blank space on link "update your preferences" ([#2963](https://github.com/pagopa/io-app/issues/2963)) ([44c9a46](https://github.com/pagopa/io-app/commit/44c9a4681ddab2a2b846f1c69ecdcc14ddaefcf3))
* **Carta Giovani Nazionale:** [[#177481627](https://www.pivotaltracker.com/story/show/177481627)] In case of EYCA Activation status is in final status activation doesn't start ([#2955](https://github.com/pagopa/io-app/issues/2955)) ([b786ded](https://github.com/pagopa/io-app/commit/b786ded5b653ae9ea20c22eedf0f68e0eac55a83))


### Chores

* [[#177137610](https://www.pivotaltracker.com/story/show/177137610)] Remove button bug that open instabug in service home screen ([#2964](https://github.com/pagopa/io-app/issues/2964)) ([04a59e2](https://github.com/pagopa/io-app/commit/04a59e21d8ece807bb196e0cb4ec5b2791d83aae))
* [[#177695356](https://www.pivotaltracker.com/story/show/177695356)] Upgrade cocoapods to version 1.10.1 ([#2971](https://github.com/pagopa/io-app/issues/2971)) ([55e6253](https://github.com/pagopa/io-app/commit/55e6253022112c14094f47fec577aed75fbfb890))
* **Carta Giovani Nazionale:** [[#177441837](https://www.pivotaltracker.com/story/show/177441837),[#177322409](https://www.pivotaltracker.com/story/show/177322409)] Implements Unit tests on EycaDetailComponent and CgnCardComponent ([#2970](https://github.com/pagopa/io-app/issues/2970)) ([16f2fdf](https://github.com/pagopa/io-app/commit/16f2fdf266296b146eacc4328f33013218af84aa))

## [1.24.0-rc.8](https://github.com/pagopa/io-app/compare/1.24.0-rc.7...1.24.0-rc.8) (2021-04-08)

## [1.24.0-rc.7](https://github.com/pagopa/io-app/compare/1.24.0-rc.6...1.24.0-rc.7) (2021-04-07)

## [1.24.0-rc.6](https://github.com/pagopa/io-app/compare/1.24.0-rc.5...1.24.0-rc.6) (2021-04-07)

## [1.24.0-rc.5](https://github.com/pagopa/io-app/compare/1.24.0-rc.3...1.24.0-rc.5) (2021-04-07)


### Chores

* **release:** 1.24.0-rc.4 ([31d8196](https://github.com/pagopa/io-app/commit/31d81967abded847a4cc7dff1c2d52ab0b8db041))

## [1.24.0-rc.4](https://github.com/pagopa/io-app/compare/1.24.0-rc.3...1.24.0-rc.4) (2021-04-07)

## [1.24.0-rc.3](https://github.com/pagopa/io-app/compare/1.24.0-rc.1...1.24.0-rc.3) (2021-04-07)


### Features

* [[#175894877](https://www.pivotaltracker.com/story/show/175894877)] refactor pick payment method ([#2926](https://github.com/pagopa/io-app/issues/2926)) ([10a7ec1](https://github.com/pagopa/io-app/commit/10a7ec15a273999c9be96237117565a7b021874e))
* **Bonus Pagamenti Digitali:** [[#176781159](https://www.pivotaltracker.com/story/show/176781159)] Manage error and loading state for the abi list when start co-badge onboarding workflow ([#2940](https://github.com/pagopa/io-app/issues/2940)) ([b85831f](https://github.com/pagopa/io-app/commit/b85831fe7a6c1029d1b158dc1dcadc87f4ca49a1))
* **Bonus Pagamenti Digitali:** [[#176925463](https://www.pivotaltracker.com/story/show/176925463)] Tracks action to notify the possibility to add a co-badge to the user ([#2952](https://github.com/pagopa/io-app/issues/2952)) ([d30237b](https://github.com/pagopa/io-app/commit/d30237bdc03765c2099cfe3f613251f8abf9ac6a))
* **Bonus Pagamenti Digitali:** [[#177434959](https://www.pivotaltracker.com/story/show/177434959)] Start co-badge flow from add credit card screen ([#2931](https://github.com/pagopa/io-app/issues/2931)) ([42ff757](https://github.com/pagopa/io-app/commit/42ff7579f36a23fd95c0af5459eba96f6114bdbf))
* **Carta Giovani Nazionale:** [[#177479621](https://www.pivotaltracker.com/story/show/177479621)] Disables CGN Feature Flags ([#2937](https://github.com/pagopa/io-app/issues/2937)) ([96ee908](https://github.com/pagopa/io-app/commit/96ee9086851efb55bf129366705a661fb7b94b0f))
* **Payments:** [[#177548187](https://www.pivotaltracker.com/story/show/177548187)] Add credit card / payment webview closing reason ([#2958](https://github.com/pagopa/io-app/issues/2958)) ([90ef10b](https://github.com/pagopa/io-app/commit/90ef10b50887030c450aee764e95b72973566834))


### Bug Fixes

* [[#172097711](https://www.pivotaltracker.com/story/show/172097711),[#172935224](https://www.pivotaltracker.com/story/show/172935224)] On some iOS devices a white screen is shown after biometric authentication ([#2939](https://github.com/pagopa/io-app/issues/2939)) ([5138228](https://github.com/pagopa/io-app/commit/51382281a2c91a200c0ff50eb62a7d03527689b5))
* **Bonus Pagamenti Digitali:** [[#177511360](https://www.pivotaltracker.com/story/show/177511360)] Wrong rendering of privative loyalty logo in cashback transaction detail bottomsheet [#2946](https://github.com/pagopa/io-app/issues/2946) ([8cc449b](https://github.com/pagopa/io-app/commit/8cc449be0801ecf3b6a9da5c69194f934cc506e3))
* [[#173031364](https://www.pivotaltracker.com/story/show/173031364)] The request to abort a payment is never sent ([#2933](https://github.com/pagopa/io-app/issues/2933)) ([9b6a940](https://github.com/pagopa/io-app/commit/9b6a940a363354271469c55ef97140e6967f6a07))
* [[#175535051](https://www.pivotaltracker.com/story/show/175535051)] fixes offset scroller for messages (iphone 7) ([#2791](https://github.com/pagopa/io-app/issues/2791)) ([8c69b54](https://github.com/pagopa/io-app/commit/8c69b54e8f53cc8b09509deb7cb9ed093b4f225d))
* **Carta Giovani Nazionale:** [[#177485208](https://www.pivotaltracker.com/story/show/177485208)] Hardware back button doesn't work on CGN Detail screen [#2957](https://github.com/pagopa/io-app/issues/2957) ([3864c1b](https://github.com/pagopa/io-app/commit/3864c1ba018b170af284a7415efac9196ddfa7c6))
* **Carta Giovani Nazionale:** [[#177490914](https://www.pivotaltracker.com/story/show/177490914)] Discount bottom sheet title doesn't break line [#2956](https://github.com/pagopa/io-app/issues/2956) ([ba35c0c](https://github.com/pagopa/io-app/commit/ba35c0ce8a87a8467fefda6328fef2d2520d02cc))
* **Carta Giovani Nazionale:** [[#177490938](https://www.pivotaltracker.com/story/show/177490938)] Success Screen pictogram results cut on the bottom ([#2938](https://github.com/pagopa/io-app/issues/2938)) ([146a197](https://github.com/pagopa/io-app/commit/146a197a370c3f633665f357247749999acb4156))
* **Carta Giovani Nazionale:** [[#177577081](https://www.pivotaltracker.com/story/show/177577081)] CGN Card component shows wrong border ([#2950](https://github.com/pagopa/io-app/issues/2950)) ([83da2b0](https://github.com/pagopa/io-app/commit/83da2b0bec2cb267740eaaa8f2e8ab9c66b0f434))


### Chores

* [[#177137637](https://www.pivotaltracker.com/story/show/177137637)] Show services status banner in any rendering state ([#2929](https://github.com/pagopa/io-app/issues/2929)) ([e7dd9bb](https://github.com/pagopa/io-app/commit/e7dd9bb31a4733a6fec5bfa9734474c7378cfa71))
* [[#177288211](https://www.pivotaltracker.com/story/show/177288211)] Move organization logo to the right side for the services item ([#2944](https://github.com/pagopa/io-app/issues/2944)) ([6861ab9](https://github.com/pagopa/io-app/commit/6861ab997a2a7f1a1fdf167ef37b61cae39d2989))
* [[#177458092](https://www.pivotaltracker.com/story/show/177458092)] Support Jira ticket key in the PR title ([#2935](https://github.com/pagopa/io-app/issues/2935)) ([ff7601a](https://github.com/pagopa/io-app/commit/ff7601aa8dd38e7ed562b9161e906f7a92577dc7))
* [[#177506546](https://www.pivotaltracker.com/story/show/177506546)] Remove false positive from urls check ([#2941](https://github.com/pagopa/io-app/issues/2941)) ([db6654f](https://github.com/pagopa/io-app/commit/db6654fd7973fcd466e64c6ade44f75e42bc1248))
* **Bonus Pagamenti Digitali:** [[#177542266](https://www.pivotaltracker.com/story/show/177542266)] Add technical iban feature flag ([#2961](https://github.com/pagopa/io-app/issues/2961)) ([ac6e9ef](https://github.com/pagopa/io-app/commit/ac6e9ef811711a60d8f6cc5733051bb5c2b07788))
* **Bonus Pagamenti Digitali:** [[#177543860](https://www.pivotaltracker.com/story/show/177543860)] Add transactions paging feature flag ([#2947](https://github.com/pagopa/io-app/issues/2947)) ([2ad3755](https://github.com/pagopa/io-app/commit/2ad37557a4e028d776cfb2f3c9d46b9a6a16ab06))
* [[#177560562](https://www.pivotaltracker.com/story/show/177560562)] Close NFC dialog when card is successfully read ([#2948](https://github.com/pagopa/io-app/issues/2948)) ([7859770](https://github.com/pagopa/io-app/commit/78597708d61a76ccdbc3dbe9fc8daaa1d6193818))

## [1.24.0-rc.1](https://github.com/pagopa/io-app/compare/1.24.0-rc.0...1.24.0-rc.1) (2021-03-24)


### Features

* **Carta Giovani Nazionale:** [[#177479621](https://www.pivotaltracker.com/story/show/177479621)] Enables CGN Feature Flags [#2936](https://github.com/pagopa/io-app/issues/2936) ([dd3d439](https://github.com/pagopa/io-app/commit/dd3d43960992bef3db7c17bfef20982d6e4a6e53))


### Chores

* **Carta Giovani Nazionale:** [[#177461712](https://www.pivotaltracker.com/story/show/177461712)] Introduces the CGN Test overlay information ([#2934](https://github.com/pagopa/io-app/issues/2934)) ([a877448](https://github.com/pagopa/io-app/commit/a877448078c2062faee245e210a8ae9a221042e4))

## [1.24.0-rc.0](https://github.com/pagopa/io-app/compare/1.23.0-rc.5...1.24.0-rc.0) (2021-03-23)


### Features

* **Bonus Pagamenti Digitali:** [[#177144320](https://www.pivotaltracker.com/story/show/177144320),[#177144482](https://www.pivotaltracker.com/story/show/177144482)] Insert privative card number ([#2905](https://github.com/pagopa/io-app/issues/2905)) ([d52a9ae](https://github.com/pagopa/io-app/commit/d52a9ae2ee5c4e2a23df31c390aeaf5e0cc64654))
* **Bonus Pagamenti Digitali:** [[#177144429](https://www.pivotaltracker.com/story/show/177144429)] Add mixpanel tracking for privative workflow ([#2903](https://github.com/pagopa/io-app/issues/2903)) ([a68198a](https://github.com/pagopa/io-app/commit/a68198ac41ed954e9b1505e95f168f950ea456dc))
* **Bonus Pagamenti Digitali:** [[#177144784](https://www.pivotaltracker.com/story/show/177144784)] Add privative card to wallet screen ([#2916](https://github.com/pagopa/io-app/issues/2916)) ([d8cd34c](https://github.com/pagopa/io-app/commit/d8cd34c0e3106b517b7da0fd998666fa760b4a7f))
* **Bonus Pagamenti Digitali:** [[#177244740](https://www.pivotaltracker.com/story/show/177244740)] In the "co-badge add card to wallet" screen, the disclaimer bold text now does not always wrap [#2911](https://github.com/pagopa/io-app/issues/2911) ([7315b64](https://github.com/pagopa/io-app/commit/7315b64346a486af4070186e7f27a356b0d3231c))
* **Bonus Pagamenti Digitali:** [[#177306957](https://www.pivotaltracker.com/story/show/177306957)] Add ko service error screen ([#2904](https://github.com/pagopa/io-app/issues/2904)) ([f7276c6](https://github.com/pagopa/io-app/commit/f7276c683cd60e5819fad9b323d26641d3220a27))
* **Bonus Pagamenti Digitali:** [[#177338693](https://www.pivotaltracker.com/story/show/177338693)] Changed style for close button in PrivativeIssuerKoDisabled ([#2909](https://github.com/pagopa/io-app/issues/2909)) ([af2a860](https://github.com/pagopa/io-app/commit/af2a8607df8c8f7938cbe5115d2482c6d7d22797))
* **Bonus Pagamenti Digitali:** [[#177339683](https://www.pivotaltracker.com/story/show/177339683)] Revert change test config [#2900](https://github.com/pagopa/io-app/issues/2900) ([cae0a0b](https://github.com/pagopa/io-app/commit/cae0a0bd572bc6303a1d850b96f641dd8bc9099e))
* **Bonus Pagamenti Digitali:** [[#177362328](https://www.pivotaltracker.com/story/show/177362328)] Update loyalty logo size for privative card & privative wallet card preview [#2907](https://github.com/pagopa/io-app/issues/2907) ([27f6b09](https://github.com/pagopa/io-app/commit/27f6b09db73c5f328da8a007629a6d97790135a4))
* **Bonus Pagamenti Digitali:** [[#177366768](https://www.pivotaltracker.com/story/show/177366768)] Changed the blurred pan representation for all the wallet components ([#2919](https://github.com/pagopa/io-app/issues/2919)) ([6b9411c](https://github.com/pagopa/io-app/commit/6b9411c8b9cbed1146006dc20dcc2f4e82bf0c9f))
* **Bonus Pagamenti Digitali:** [[#177378510](https://www.pivotaltracker.com/story/show/177378510)] Add failure handling to workunit ([#2923](https://github.com/pagopa/io-app/issues/2923)) ([375d681](https://github.com/pagopa/io-app/commit/375d6813233f0d4dd68794a755ab8af7d5bc52ee))
* **Bonus Pagamenti Digitali:** [[#177398006](https://www.pivotaltracker.com/story/show/177398006)] Change copy and cta text for PrivativeKoNotFound ([#2918](https://github.com/pagopa/io-app/issues/2918)) ([1c98a49](https://github.com/pagopa/io-app/commit/1c98a49b0faa571a61cdc214c20df20ab290ac7a))
* **Carta Giovani Nazionale:** [[#176655458](https://www.pivotaltracker.com/story/show/176655458)] Enables CGN Activation CTA from message/service detail ([#2893](https://github.com/pagopa/io-app/issues/2893)) ([bd89a32](https://github.com/pagopa/io-app/commit/bd89a327caad410a18807b802b4fb90d5a786475))
* **Carta Giovani Nazionale:** [[#176715099](https://www.pivotaltracker.com/story/show/176715099)] Introduces the CGN folded card for wallet preview ([#2898](https://github.com/pagopa/io-app/issues/2898)) ([3492261](https://github.com/pagopa/io-app/commit/349226119e98b714f93d10960ddaca86aa3f60da))
* **Carta Giovani Nazionale:** [[#176959164](https://www.pivotaltracker.com/story/show/176959164),[#177266269](https://www.pivotaltracker.com/story/show/177266269)] Add analytics on cgn flow ([#2887](https://github.com/pagopa/io-app/issues/2887)) ([a445fda](https://github.com/pagopa/io-app/commit/a445fdad70e360fceab761476e018014cc8c6ea4))
* **Carta Giovani Nazionale:** [[#176959393](https://www.pivotaltracker.com/story/show/176959393),[#177244360](https://www.pivotaltracker.com/story/show/177244360)] Implements the screen to request and copy for an OTP code related to the CGN ([#2908](https://github.com/pagopa/io-app/issues/2908)) ([f7aa17a](https://github.com/pagopa/io-app/commit/f7aa17afa153399d4dd23e0fc8c130f87db38007))
* **Carta Giovani Nazionale:** [[#177062520](https://www.pivotaltracker.com/story/show/177062520),[#177062719](https://www.pivotaltracker.com/story/show/177062719)] Add start/status Eyca API requests implementation, actions, reduces and saga logic ([#2855](https://github.com/pagopa/io-app/issues/2855)) ([6cf8848](https://github.com/pagopa/io-app/commit/6cf88487d63f80ea111dda3d53bd0db7d6a680f4))
* **Carta Giovani Nazionale:** [[#177063605](https://www.pivotaltracker.com/story/show/177063605)] Introduces EYCA status informations ([#2867](https://github.com/pagopa/io-app/issues/2867)) ([ff6da94](https://github.com/pagopa/io-app/commit/ff6da9430999317848586a32d1f3efe623fce164))
* **Carta Giovani Nazionale:** [[#177115055](https://www.pivotaltracker.com/story/show/177115055)] Adds the workflow to retry EYCA activation in case of Error or missing EYCA information for CGN ([#2872](https://github.com/pagopa/io-app/issues/2872)) ([485d194](https://github.com/pagopa/io-app/commit/485d19452cfe9b46ae2802b8859f19670632e5bf))
* **Carta Giovani Nazionale:** [[#177163732](https://www.pivotaltracker.com/story/show/177163732)] Introduces EYCA information and discounts bottom sheet ([#2870](https://github.com/pagopa/io-app/issues/2870)) ([4ecf35c](https://github.com/pagopa/io-app/commit/4ecf35cb21971c1337a22ba522ff64effa7bb552))
* **Carta Giovani Nazionale:** [[#177386642](https://www.pivotaltracker.com/story/show/177386642),[#177367453](https://www.pivotaltracker.com/story/show/177367453)] Missing loading transition on CGN Detail Screen [#2920](https://github.com/pagopa/io-app/issues/2920) ([4b5ec8d](https://github.com/pagopa/io-app/commit/4b5ec8d9c93285ad52c34d94acd4b7829168717d))
* **Payments:** [[#176176928](https://www.pivotaltracker.com/story/show/176176928)] Add a switch to set payment method as favorite ([#2930](https://github.com/pagopa/io-app/issues/2930)) ([a20339b](https://github.com/pagopa/io-app/commit/a20339b2932e6e9c29c8c3b12e5d7bac68beba40))
* [[#175898227](https://www.pivotaltracker.com/story/show/175898227)] Add delete button to credit card detail screen ([#2917](https://github.com/pagopa/io-app/issues/2917)) ([cd5da16](https://github.com/pagopa/io-app/commit/cd5da16a87ef0f8ae0927884dacd005bba125900))


### Bug Fixes

* [[#176740861](https://www.pivotaltracker.com/story/show/176740861)] Remove from store/readState a not found service ([#2868](https://github.com/pagopa/io-app/issues/2868)) ([64c4a41](https://github.com/pagopa/io-app/commit/64c4a41132982cabe314b4df636a8796beaa4cd9))
* **Bonus Pagamenti Digitali:** [[#176781020](https://www.pivotaltracker.com/story/show/176781020)] Satispay circuit is displayed incorrectly in the cashback transaction detail bottom sheet ([#2921](https://github.com/pagopa/io-app/issues/2921)) ([31e6377](https://github.com/pagopa/io-app/commit/31e6377caf51a7c2c4f5ee4556eac656529f1e50))
* **Bonus Pagamenti Digitali:** [[#177357472](https://www.pivotaltracker.com/story/show/177357472)] Wrong decode during the add of a new privative card to the wallet ([#2902](https://github.com/pagopa/io-app/issues/2902)) ([0ac7d0c](https://github.com/pagopa/io-app/commit/0ac7d0c487ab4d1456ce966ddccc0988085702bc))
* **Bonus Pagamenti Digitali:** [[#177368806](https://www.pivotaltracker.com/story/show/177368806)] Wrong align for the bottom-left text of the privative & cobadge cards ([#2910](https://github.com/pagopa/io-app/issues/2910)) ([d0dc2b3](https://github.com/pagopa/io-app/commit/d0dc2b3eb507f03b9832bc6c9551b7ffc016cc95))
* **Bonus Pagamenti Digitali:** [[#177378257](https://www.pivotaltracker.com/story/show/177378257)] When viewing the details of a bpd transaction with a cashback value equal to 0, the warning on the maximum value reached is displayed  ([#2914](https://github.com/pagopa/io-app/issues/2914)) ([485492d](https://github.com/pagopa/io-app/commit/485492da4fb78fa4c042a7ed35513ff20e81a665))
* **Carta Giovani Nazionale:** [[#177367873](https://www.pivotaltracker.com/story/show/177367873)] Transactions header in wallet home shows before the required scroll position if CGN informations are available [#2913](https://github.com/pagopa/io-app/issues/2913) ([2fc53f8](https://github.com/pagopa/io-app/commit/2fc53f8a09338dcb360ebf8e0c7b4174514c11de))
* **Carta Giovani Nazionale:** [[#177385897](https://www.pivotaltracker.com/story/show/177385897)] CGN Details doesn't load automatically when activation is completed [#2915](https://github.com/pagopa/io-app/issues/2915) ([9040e89](https://github.com/pagopa/io-app/commit/9040e89ae5702ce0b68fdb247906fc69fd16ff25))
* **Carta Giovani Nazionale:** [[#177419110](https://www.pivotaltracker.com/story/show/177419110)] If we receive an error after a right result the CGN detail screen show an inconsistent result ([#2927](https://github.com/pagopa/io-app/issues/2927)) ([f24c9a1](https://github.com/pagopa/io-app/commit/f24c9a1b6ab79f0f29cb0182ffb953532ce88f2c))
* **Carta Giovani Nazionale:** [[#177455388](https://www.pivotaltracker.com/story/show/177455388)] Footer text on CGN information screen shows the wrong text referring to Cashback ([#2932](https://github.com/pagopa/io-app/issues/2932)) ([e21866c](https://github.com/pagopa/io-app/commit/e21866c58b554217a389a82b6624ae8207f49f08))


### Chores

* [[#176918290](https://www.pivotaltracker.com/story/show/176918290)] Check broken urls in *.tsx files ([#2818](https://github.com/pagopa/io-app/issues/2818)) ([6e44188](https://github.com/pagopa/io-app/commit/6e44188bdb26635c15ac633f0fbe34ce00a5422a))
* [[#176941075](https://www.pivotaltracker.com/story/show/176941075)] Added mixpanel tracking for color scheme ([#2901](https://github.com/pagopa/io-app/issues/2901)) ([fe6a66d](https://github.com/pagopa/io-app/commit/fe6a66d38058bc0dbf74312452a503c27909ffc0))
* [[#177320696](https://www.pivotaltracker.com/story/show/177320696)] Update services web url ([#2897](https://github.com/pagopa/io-app/issues/2897)) ([96d763e](https://github.com/pagopa/io-app/commit/96d763ee71223528382bbf646cebe2010a0bacfa))
* Increase run-tests performance on CircleCI ([#2906](https://github.com/pagopa/io-app/issues/2906)) ([ece9a83](https://github.com/pagopa/io-app/commit/ece9a83bd7ee931a98b2b9dcbfc46179b6442c57))
* **Bonus Pagamenti Digitali:** [[#177140866](https://www.pivotaltracker.com/story/show/177140866)] Remove privative feature flag ([#2912](https://github.com/pagopa/io-app/issues/2912)) ([3fc099b](https://github.com/pagopa/io-app/commit/3fc099b26284d043690a618136c72cbe2ee95b1c))
* **Carta Giovani Nazionale:** [[#177142013](https://www.pivotaltracker.com/story/show/177142013)] Adds UI Fixes to CgnDetailScreen and removes unnecessary component and tests ([#2857](https://github.com/pagopa/io-app/issues/2857)) ([9cc6064](https://github.com/pagopa/io-app/commit/9cc6064f73e4c5de1e87a26759826384b9b623af))
* **Carta Giovani Nazionale:** [[#177403331](https://www.pivotaltracker.com/story/show/177403331)] Adds the missing CGN action for analytics purposes ([#2925](https://github.com/pagopa/io-app/issues/2925)) ([34be805](https://github.com/pagopa/io-app/commit/34be80515a5c94745f511a979a38164e7d703bfd))
* **Carta Giovani Nazionale:** [[#177437163](https://www.pivotaltracker.com/story/show/177437163)] Fixes mocked merchant for internal beta ([#2928](https://github.com/pagopa/io-app/issues/2928)) ([1a7f420](https://github.com/pagopa/io-app/commit/1a7f42084a62f77548f564cb3126d80701cba973))
* **release:** 1.23.0-rc.6 ([95374a6](https://github.com/pagopa/io-app/commit/95374a6ce6c66ca6c6791c600fb5132e762cc28d))

## [1.23.0-rc.6](https://github.com/pagopa/io-app/compare/1.23.0-rc.5...1.23.0-rc.6) (2021-03-19)


### Features

* **Bonus Pagamenti Digitali:** [[#177144320](https://www.pivotaltracker.com/story/show/177144320),[#177144482](https://www.pivotaltracker.com/story/show/177144482)] Insert privative card number ([#2905](https://github.com/pagopa/io-app/issues/2905)) ([d52a9ae](https://github.com/pagopa/io-app/commit/d52a9ae2ee5c4e2a23df31c390aeaf5e0cc64654))
* **Bonus Pagamenti Digitali:** [[#177144429](https://www.pivotaltracker.com/story/show/177144429)] Add mixpanel tracking for privative workflow ([#2903](https://github.com/pagopa/io-app/issues/2903)) ([a68198a](https://github.com/pagopa/io-app/commit/a68198ac41ed954e9b1505e95f168f950ea456dc))
* **Bonus Pagamenti Digitali:** [[#177144784](https://www.pivotaltracker.com/story/show/177144784)] Add privative card to wallet screen ([#2916](https://github.com/pagopa/io-app/issues/2916)) ([d8cd34c](https://github.com/pagopa/io-app/commit/d8cd34c0e3106b517b7da0fd998666fa760b4a7f))
* **Bonus Pagamenti Digitali:** [[#177244740](https://www.pivotaltracker.com/story/show/177244740)] In the "co-badge add card to wallet" screen, the disclaimer bold text now does not always wrap [#2911](https://github.com/pagopa/io-app/issues/2911) ([7315b64](https://github.com/pagopa/io-app/commit/7315b64346a486af4070186e7f27a356b0d3231c))
* **Bonus Pagamenti Digitali:** [[#177306957](https://www.pivotaltracker.com/story/show/177306957)] Add ko service error screen ([#2904](https://github.com/pagopa/io-app/issues/2904)) ([f7276c6](https://github.com/pagopa/io-app/commit/f7276c683cd60e5819fad9b323d26641d3220a27))
* **Bonus Pagamenti Digitali:** [[#177338693](https://www.pivotaltracker.com/story/show/177338693)] Changed style for close button in PrivativeIssuerKoDisabled ([#2909](https://github.com/pagopa/io-app/issues/2909)) ([af2a860](https://github.com/pagopa/io-app/commit/af2a8607df8c8f7938cbe5115d2482c6d7d22797))
* **Bonus Pagamenti Digitali:** [[#177339683](https://www.pivotaltracker.com/story/show/177339683)] Revert change test config [#2900](https://github.com/pagopa/io-app/issues/2900) ([cae0a0b](https://github.com/pagopa/io-app/commit/cae0a0bd572bc6303a1d850b96f641dd8bc9099e))
* **Bonus Pagamenti Digitali:** [[#177362328](https://www.pivotaltracker.com/story/show/177362328)] Update loyalty logo size for privative card & privative wallet card preview [#2907](https://github.com/pagopa/io-app/issues/2907) ([27f6b09](https://github.com/pagopa/io-app/commit/27f6b09db73c5f328da8a007629a6d97790135a4))
* **Bonus Pagamenti Digitali:** [[#177366768](https://www.pivotaltracker.com/story/show/177366768)] Changed the blurred pan representation for all the wallet components ([#2919](https://github.com/pagopa/io-app/issues/2919)) ([6b9411c](https://github.com/pagopa/io-app/commit/6b9411c8b9cbed1146006dc20dcc2f4e82bf0c9f))
* **Bonus Pagamenti Digitali:** [[#177398006](https://www.pivotaltracker.com/story/show/177398006)] Change copy and cta text for PrivativeKoNotFound ([#2918](https://github.com/pagopa/io-app/issues/2918)) ([1c98a49](https://github.com/pagopa/io-app/commit/1c98a49b0faa571a61cdc214c20df20ab290ac7a))
* **Carta Giovani Nazionale:** [[#176655458](https://www.pivotaltracker.com/story/show/176655458)] Enables CGN Activation CTA from message/service detail ([#2893](https://github.com/pagopa/io-app/issues/2893)) ([bd89a32](https://github.com/pagopa/io-app/commit/bd89a327caad410a18807b802b4fb90d5a786475))
* **Carta Giovani Nazionale:** [[#176715099](https://www.pivotaltracker.com/story/show/176715099)] Introduces the CGN folded card for wallet preview ([#2898](https://github.com/pagopa/io-app/issues/2898)) ([3492261](https://github.com/pagopa/io-app/commit/349226119e98b714f93d10960ddaca86aa3f60da))
* **Carta Giovani Nazionale:** [[#176959164](https://www.pivotaltracker.com/story/show/176959164),[#177266269](https://www.pivotaltracker.com/story/show/177266269)] Add analytics on cgn flow ([#2887](https://github.com/pagopa/io-app/issues/2887)) ([a445fda](https://github.com/pagopa/io-app/commit/a445fdad70e360fceab761476e018014cc8c6ea4))
* **Carta Giovani Nazionale:** [[#176959393](https://www.pivotaltracker.com/story/show/176959393),[#177244360](https://www.pivotaltracker.com/story/show/177244360)] Implements the screen to request and copy for an OTP code related to the CGN ([#2908](https://github.com/pagopa/io-app/issues/2908)) ([f7aa17a](https://github.com/pagopa/io-app/commit/f7aa17afa153399d4dd23e0fc8c130f87db38007))
* **Carta Giovani Nazionale:** [[#177062520](https://www.pivotaltracker.com/story/show/177062520),[#177062719](https://www.pivotaltracker.com/story/show/177062719)] Add start/status Eyca API requests implementation, actions, reduces and saga logic ([#2855](https://github.com/pagopa/io-app/issues/2855)) ([6cf8848](https://github.com/pagopa/io-app/commit/6cf88487d63f80ea111dda3d53bd0db7d6a680f4))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#177357472](https://www.pivotaltracker.com/story/show/177357472)] Wrong decode during the add of a new privative card to the wallet ([#2902](https://github.com/pagopa/io-app/issues/2902)) ([0ac7d0c](https://github.com/pagopa/io-app/commit/0ac7d0c487ab4d1456ce966ddccc0988085702bc))
* [[#176740861](https://www.pivotaltracker.com/story/show/176740861)] Remove from store/readState a not found service ([#2868](https://github.com/pagopa/io-app/issues/2868)) ([64c4a41](https://github.com/pagopa/io-app/commit/64c4a41132982cabe314b4df636a8796beaa4cd9))
* **Bonus Pagamenti Digitali:** [[#177368806](https://www.pivotaltracker.com/story/show/177368806)] Wrong align for the bottom-left text of the privative & cobadge cards ([#2910](https://github.com/pagopa/io-app/issues/2910)) ([d0dc2b3](https://github.com/pagopa/io-app/commit/d0dc2b3eb507f03b9832bc6c9551b7ffc016cc95))
* **Bonus Pagamenti Digitali:** [[#177378257](https://www.pivotaltracker.com/story/show/177378257)] When viewing the details of a bpd transaction with a cashback value equal to 0, the warning on the maximum value reached is displayed  ([#2914](https://github.com/pagopa/io-app/issues/2914)) ([485492d](https://github.com/pagopa/io-app/commit/485492da4fb78fa4c042a7ed35513ff20e81a665))
* **Carta Giovani Nazionale:** [[#177367873](https://www.pivotaltracker.com/story/show/177367873)] Transactions header in wallet home shows before the required scroll position if CGN informations are available [#2913](https://github.com/pagopa/io-app/issues/2913) ([2fc53f8](https://github.com/pagopa/io-app/commit/2fc53f8a09338dcb360ebf8e0c7b4174514c11de))
* **Carta Giovani Nazionale:** [[#177385897](https://www.pivotaltracker.com/story/show/177385897)] CGN Details doesn't load automatically when activation is completed [#2915](https://github.com/pagopa/io-app/issues/2915) ([9040e89](https://github.com/pagopa/io-app/commit/9040e89ae5702ce0b68fdb247906fc69fd16ff25))


### Chores

* [[#176918290](https://www.pivotaltracker.com/story/show/176918290)] Check broken urls in *.tsx files ([#2818](https://github.com/pagopa/io-app/issues/2818)) ([6e44188](https://github.com/pagopa/io-app/commit/6e44188bdb26635c15ac633f0fbe34ce00a5422a))
* [[#176941075](https://www.pivotaltracker.com/story/show/176941075)] Added mixpanel tracking for color scheme ([#2901](https://github.com/pagopa/io-app/issues/2901)) ([fe6a66d](https://github.com/pagopa/io-app/commit/fe6a66d38058bc0dbf74312452a503c27909ffc0))
* [[#177320696](https://www.pivotaltracker.com/story/show/177320696)] Update services web url ([#2897](https://github.com/pagopa/io-app/issues/2897)) ([96d763e](https://github.com/pagopa/io-app/commit/96d763ee71223528382bbf646cebe2010a0bacfa))
* Increase run-tests performance on CircleCI ([#2906](https://github.com/pagopa/io-app/issues/2906)) ([ece9a83](https://github.com/pagopa/io-app/commit/ece9a83bd7ee931a98b2b9dcbfc46179b6442c57))
* **Bonus Pagamenti Digitali:** [[#177140866](https://www.pivotaltracker.com/story/show/177140866)] Remove privative feature flag ([#2912](https://github.com/pagopa/io-app/issues/2912)) ([3fc099b](https://github.com/pagopa/io-app/commit/3fc099b26284d043690a618136c72cbe2ee95b1c))

## [1.23.0-rc.5](https://github.com/pagopa/io-app/compare/1.23.0-rc.4...1.23.0-rc.5) (2021-03-15)


### Features

* [[#177012479](https://www.pivotaltracker.com/story/show/177012479)] Tracking inbox messages count with mix panel ([#2890](https://github.com/pagopa/io-app/issues/2890)) ([9c19f25](https://github.com/pagopa/io-app/commit/9c19f2557a7a789ed0aa84ad5a69dfbe10146d31))
* **Bonus Pagamenti Digitali:** [[#177145461](https://www.pivotaltracker.com/story/show/177145461)] Show privative cards in wallet home ([#2878](https://github.com/pagopa/io-app/issues/2878)) ([58b1098](https://github.com/pagopa/io-app/commit/58b109825f9ec9c3a0f6c46f69153d8d177978eb))
* **Bonus Pagamenti Digitali:** [[#177164415](https://www.pivotaltracker.com/story/show/177164415)] Privative card detail screen ([#2885](https://github.com/pagopa/io-app/issues/2885)) ([bb5cb11](https://github.com/pagopa/io-app/commit/bb5cb11f63aab1c0a3224a3787c3fbd21b67c95b))
* **Bonus Pagamenti Digitali:** [[#177243608](https://www.pivotaltracker.com/story/show/177243608)] Added draft screens for privative cards onboarding workflow ([#2891](https://github.com/pagopa/io-app/issues/2891)) ([ac185da](https://github.com/pagopa/io-app/commit/ac185dacafd598387ed15af5d7fdb6fd47339283))
* **Bonus Pagamenti Digitali:** [[#177243713](https://www.pivotaltracker.com/story/show/177243713),[#177144863](https://www.pivotaltracker.com/story/show/177144863),[#177144964](https://www.pivotaltracker.com/story/show/177144964)] Manages privative search loading and ko. ([#2894](https://github.com/pagopa/io-app/issues/2894)) ([065ee09](https://github.com/pagopa/io-app/commit/065ee09b52e3aeb965cd02ac44cf2e0746336b54))
* **Bonus Pagamenti Digitali:** [[#177339683](https://www.pivotaltracker.com/story/show/177339683)] Change configuration to UAT ([#2899](https://github.com/pagopa/io-app/issues/2899)) ([d269dc4](https://github.com/pagopa/io-app/commit/d269dc40530bfb44de1adfff1e6d05158d686d31))
* **Carta Giovani Nazionale:** [[#176961686](https://www.pivotaltracker.com/story/show/176961686)] Introduces CGN Card Component ([#2877](https://github.com/pagopa/io-app/issues/2877)) ([d82b6ef](https://github.com/pagopa/io-app/commit/d82b6ef698b3e275d431397214e40fd5182f5cd3))
* **Carta Giovani Nazionale:** [[#177058904](https://www.pivotaltracker.com/story/show/177058904)] Introduces the Bottom Sheet that shows all the informations about an available discount for CGN ([#2888](https://github.com/pagopa/io-app/issues/2888)) ([3c08d46](https://github.com/pagopa/io-app/commit/3c08d461f6f0d940d0aed3464071aeb64d7d53c4))


### Bug Fixes

* **Carta Giovani Nazionale:** [[#176942137](https://www.pivotaltracker.com/story/show/176942137)] Features Card Carousel shows empty items section ([#2828](https://github.com/pagopa/io-app/issues/2828)) ([2c72029](https://github.com/pagopa/io-app/commit/2c720296b7e6f685004e276b2f47e2bcfb03ed04))
* **Carta Giovani Nazionale:** [[#177303103](https://www.pivotaltracker.com/story/show/177303103)] First tap on merchants list item fails [#2895](https://github.com/pagopa/io-app/issues/2895) ([546dbef](https://github.com/pagopa/io-app/commit/546dbefa81970f0c16cf212228acb038d48b2afc))

## [1.23.0-rc.4](https://github.com/pagopa/io-app/compare/1.23.0-rc.3...1.23.0-rc.4) (2021-03-11)


### Features

* **Carta Giovani Nazionale:** [[#176959185](https://www.pivotaltracker.com/story/show/176959185)] Introduces the screen to check on Merchant detail conventioned to CGN ([#2886](https://github.com/pagopa/io-app/issues/2886)) ([db50f36](https://github.com/pagopa/io-app/commit/db50f3600b01a72d2f4b83b0cbd8f38f37baefa0))
* **Carta Giovani Nazionale:** [[#176959374](https://www.pivotaltracker.com/story/show/176959374)] Add a component to show the OTP code and its expiration time ([#2892](https://github.com/pagopa/io-app/issues/2892)) ([e679d69](https://github.com/pagopa/io-app/commit/e679d693104a88d48af3ce538c61aac02404e265))
* **Carta Giovani Nazionale:** [[#177059013](https://www.pivotaltracker.com/story/show/177059013)] Introduces the component to display a discount value for a CGN merchant ([#2884](https://github.com/pagopa/io-app/issues/2884)) ([a211fa5](https://github.com/pagopa/io-app/commit/a211fa51bf484d2ee9cb722f928a60ada461f215))


### Bug Fixes

* [[#177298671](https://www.pivotaltracker.com/story/show/177298671)] On message pressed Service details is shown instead of Message details ([#2889](https://github.com/pagopa/io-app/issues/2889)) ([9fe615b](https://github.com/pagopa/io-app/commit/9fe615beb68f629cabe1c278c99dddc1aad807ae))


### Chores

* [[#176433685](https://www.pivotaltracker.com/story/show/176433685)] Track Instabug report open/close ([#2727](https://github.com/pagopa/io-app/issues/2727)) ([955524c](https://github.com/pagopa/io-app/commit/955524ca1d4babf34ee2427fc6ea3345c8b5773e))

## [1.23.0-rc.3](https://github.com/pagopa/io-app/compare/1.23.0-rc.2...1.23.0-rc.3) (2021-03-10)


### Features

* **Bonus Pagamenti Digitali:** [[#177142050](https://www.pivotaltracker.com/story/show/177142050),[#177142212](https://www.pivotaltracker.com/story/show/177142212)] Support search privative card API ([#2881](https://github.com/pagopa/io-app/issues/2881)) ([f856dba](https://github.com/pagopa/io-app/commit/f856dba8c3e095b32a098ce985c635f5e6231e06))
* **Bonus Pagamenti Digitali:** [[#177142282](https://www.pivotaltracker.com/story/show/177142282)] Manage add supermarket card item ([#2879](https://github.com/pagopa/io-app/issues/2879)) ([572f28e](https://github.com/pagopa/io-app/commit/572f28eb111b44cc89f9331502735a547c8df767))
* **Bonus Pagamenti Digitali:** [[#177142358](https://www.pivotaltracker.com/story/show/177142358)] Added privative issuers configuration and choice screen  ([#2876](https://github.com/pagopa/io-app/issues/2876)) ([e8b559a](https://github.com/pagopa/io-app/commit/e8b559a4e6fa015f4ca02e323209efb7010983c1))
* **Carta Giovani Nazionale:** [[#176959318](https://www.pivotaltracker.com/story/show/176959318),[#177244438](https://www.pivotaltracker.com/story/show/177244438),[#177244411](https://www.pivotaltracker.com/story/show/177244411)] Add OTP generation network / actions / saga / reducer ([#2882](https://github.com/pagopa/io-app/issues/2882)) ([04c9905](https://github.com/pagopa/io-app/commit/04c99053b10fa9b1adee174ae21d2908a2dcdf2a))


### Bug Fixes

* [[#177281052](https://www.pivotaltracker.com/story/show/177281052)] Services list could display not found page and zoom is allowed ([#2883](https://github.com/pagopa/io-app/issues/2883)) ([f4d2342](https://github.com/pagopa/io-app/commit/f4d234231bcfbf972ca3546f496d4fe5acaf5906))


### Chores

* [[#177241763](https://www.pivotaltracker.com/story/show/177241763)] Change Instabug report hint text ([#2875](https://github.com/pagopa/io-app/issues/2875)) ([1c20674](https://github.com/pagopa/io-app/commit/1c2067461149ccfcaa1abf263f3c4d2bb66edde0))

## [1.23.0-rc.2](https://github.com/pagopa/io-app/compare/1.23.0-rc.1...1.23.0-rc.2) (2021-03-09)


### Features

* **Bonus Pagamenti Digitali:** [[#177141940](https://www.pivotaltracker.com/story/show/177141940)] Added screens & navigation stubs for privative card ([#2861](https://github.com/pagopa/io-app/issues/2861)) ([3ef249f](https://github.com/pagopa/io-app/commit/3ef249f7e813eba485f069e5ae93af3137f85210))
* **Bonus Pagamenti Digitali:** [[#177161766](https://www.pivotaltracker.com/story/show/177161766)] Add orchestration workunit for privative card ([#2869](https://github.com/pagopa/io-app/issues/2869)) ([fe95e91](https://github.com/pagopa/io-app/commit/fe95e9121d425291bbdc3e4cd13dc33214416f23))
* **Bonus Pagamenti Digitali:** [[#177187748](https://www.pivotaltracker.com/story/show/177187748)] Revert unlock the search for SIA and ICCREA (for test only) [#2865](https://github.com/pagopa/io-app/issues/2865) ([82180af](https://github.com/pagopa/io-app/commit/82180af7e9f8ffa48ab5ce805c0a313c1a90fd22))
* **Carta Giovani Nazionale:** [[#176958889](https://www.pivotaltracker.com/story/show/176958889)] Implementation of the redux store/actions section for Merchants list load and storage ([#2843](https://github.com/pagopa/io-app/issues/2843)) ([0ec802b](https://github.com/pagopa/io-app/commit/0ec802b4a8cda4baef56c09754ca33e6eabe9bff))
* **Carta Giovani Nazionale:** [[#176959176](https://www.pivotaltracker.com/story/show/176959176)] UI Implementation of Merchants list and search screen for CGN available discounts ([#2840](https://github.com/pagopa/io-app/issues/2840)) ([bea650e](https://github.com/pagopa/io-app/commit/bea650e40c8a1efb0b6cf3e46a1b803cdfd9fd12))
* **Carta Giovani Nazionale:** [[#176959207](https://www.pivotaltracker.com/story/show/176959207)] UI Implementation of the List item component for CGN Conventioned Merchant  ([#2836](https://github.com/pagopa/io-app/issues/2836)) ([bd7046a](https://github.com/pagopa/io-app/commit/bd7046a271a4f100e36e5135427c4746665be937))
* **Carta Giovani Nazionale:** [[#177063526](https://www.pivotaltracker.com/story/show/177063526)] Introduces scaffolding for action/reducer of EYCA details and activation process ([#2853](https://github.com/pagopa/io-app/issues/2853)) ([fbceb75](https://github.com/pagopa/io-app/commit/fbceb7581ef594dd73b26cb4ed721f1f1cd8aed4))
* [[#177226606](https://www.pivotaltracker.com/story/show/177226606)] Load local services in a embedded WebView ([#2873](https://github.com/pagopa/io-app/issues/2873)) ([4637197](https://github.com/pagopa/io-app/commit/4637197f229b292440eff5ba235132febc80d28d))
* [[#177264498](https://www.pivotaltracker.com/story/show/177264498)] Diners Logo Update [#2880](https://github.com/pagopa/io-app/issues/2880) ([07f9f12](https://github.com/pagopa/io-app/commit/07f9f12a4097721ec5237c9e222c7fc9bb98ef2f))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176993827](https://www.pivotaltracker.com/story/show/176993827)] In SuperCashbackRanking bottom sheet text is selectable ([#2866](https://github.com/pagopa/io-app/issues/2866)) ([faf26fe](https://github.com/pagopa/io-app/commit/faf26fe675d78c7fc663df24e20a67f0370fbfa4))
* [[#176903407](https://www.pivotaltracker.com/story/show/176903407)] Inhibit dark mode on Android devices ([#2854](https://github.com/pagopa/io-app/issues/2854)) ([6f14f9d](https://github.com/pagopa/io-app/commit/6f14f9d2c71ff9314d8c1c4d43ff10305493a0fd))
* [[#177182357](https://www.pivotaltracker.com/story/show/177182357)] Aborting profile deletion causes a crash ([#2863](https://github.com/pagopa/io-app/issues/2863)) ([37b7e7b](https://github.com/pagopa/io-app/commit/37b7e7b0b7aae0eaaacb30e7daaa160d811d729a))


### Chores

* [[#176981388](https://www.pivotaltracker.com/story/show/176981388)] Credit card onboarding attempt: store info about 3DS2 ([#2858](https://github.com/pagopa/io-app/issues/2858)) ([60eac27](https://github.com/pagopa/io-app/commit/60eac277178090df2085548b10f035522102f20d))
* [[#177204492](https://www.pivotaltracker.com/story/show/177204492)] Update/Correct README ([#2871](https://github.com/pagopa/io-app/issues/2871)) ([eca840c](https://github.com/pagopa/io-app/commit/eca840c03b9072b7a33d7c21a933be0635a23c30))
* Clean changelog ([#2864](https://github.com/pagopa/io-app/issues/2864)) ([256bf4b](https://github.com/pagopa/io-app/commit/256bf4b68457395800f9005d9ca136c81f8ab6ba))

## [1.23.0-rc.1](https://github.com/pagopa/io-app/compare/1.23.0-rc.0...1.23.0-rc.1) (2021-03-03)


### Features

* **Bonus Pagamenti Digitali:** [[#177187748](https://www.pivotaltracker.com/story/show/177187748)] Unlock the search for SIA and ICCREA (for test only) ([#2862](https://github.com/pagopa/io-app/issues/2862)) ([8f29540](https://github.com/pagopa/io-app/commit/8f29540e987513d201c52333f31c195e45b73990))

## [1.23.0-rc.0](https://github.com/pagopa/io-app/compare/1.22.0-rc.1...1.23.0-rc.0) (2021-03-03)


### Features

* **Bonus Pagamenti Digitali:** [[#177141889](https://www.pivotaltracker.com/story/show/177141889)] Added Privative cards actions, store & reducers ([#2860](https://github.com/pagopa/io-app/issues/2860)) ([d9fac56](https://github.com/pagopa/io-app/commit/d9fac567496702fae8c757c3525b97e24e322e47))
* **Carta Giovani Nazionale:** [[#176870737](https://www.pivotaltracker.com/story/show/176870737)] Implements CGN Activation Workflow by using the specific GET Status API for polling  ([#2812](https://github.com/pagopa/io-app/issues/2812)) ([406cb03](https://github.com/pagopa/io-app/commit/406cb0357f91341879a3b45252f34711d5bde14c))


### Chores

* **Bonus Pagamenti Digitali:** [[#176842973](https://www.pivotaltracker.com/story/show/176842973)] Add tests for the CoBadge components ([#2826](https://github.com/pagopa/io-app/issues/2826)) ([0860f77](https://github.com/pagopa/io-app/commit/0860f77fc2d824a0405ba9424129a755f212df6f))
* **Bonus Pagamenti Digitali:** [[#177140858](https://www.pivotaltracker.com/story/show/177140858)] Add privative feature flag ([#2859](https://github.com/pagopa/io-app/issues/2859)) ([e9f08e3](https://github.com/pagopa/io-app/commit/e9f08e36a4d653972ecf17af6326675d09a2fa44))
* drop react-native-qrcode-scanner patch ([#2735](https://github.com/pagopa/io-app/issues/2735)) ([8b59304](https://github.com/pagopa/io-app/commit/8b5930436c14d2435f2da375d84fbb11e05ef3ec))
* **deps:** bump aiohttp from 3.6.2 to 3.7.4 in /scripts/check_urls ([#2850](https://github.com/pagopa/io-app/issues/2850)) ([39c5798](https://github.com/pagopa/io-app/commit/39c5798737c5188a7a4de2b240f0e1d94beeac9a))

## [1.22.0-rc.1](https://github.com/pagopa/io-app/compare/1.22.0-rc.0...1.22.0-rc.1) (2021-02-25)


### Features

* [[#176981563](https://www.pivotaltracker.com/story/show/176981563)] Update MAESTRO from arriving payment method to valid payment method ([#2831](https://github.com/pagopa/io-app/issues/2831)) ([4e996f4](https://github.com/pagopa/io-app/commit/4e996f482517a66d4807405b2bbbc84fe3d1ca8d))
* [[#177066306](https://www.pivotaltracker.com/story/show/177066306)] Handle and show details about payment outcome ([#2845](https://github.com/pagopa/io-app/issues/2845)) ([6746a45](https://github.com/pagopa/io-app/commit/6746a45da89b5a32d5a21b93aa378b5682c1529c))
* **Carta Giovani Nazionale:** [[#176703766](https://www.pivotaltracker.com/story/show/176703766)] CGN Detail base screen component and informations ([#2807](https://github.com/pagopa/io-app/issues/2807)) ([ea58189](https://github.com/pagopa/io-app/commit/ea581892a5d7ddb654c7000c1443f4f6b0048554))


### Chores

* [[#176981159](https://www.pivotaltracker.com/story/show/176981159),[#177092221](https://www.pivotaltracker.com/story/show/177092221)] Make credit card onboarding compliant with 3DS2 and track onboarding events ([#2848](https://github.com/pagopa/io-app/issues/2848)) ([6b816a6](https://github.com/pagopa/io-app/commit/6b816a66ad2f94ba634b7a4162ebc22f25d6a712))
* [[#176983007](https://www.pivotaltracker.com/story/show/176983007)] Restore payment attempt saving ([#2846](https://github.com/pagopa/io-app/issues/2846)) ([9d88060](https://github.com/pagopa/io-app/commit/9d880607a1940688327db4f413e250bcbea4ecab))
* [[#176997301](https://www.pivotaltracker.com/story/show/176997301),[#176997292](https://www.pivotaltracker.com/story/show/176997292)] Fixed organization name's header margin right on service and message detail  ([#2834](https://github.com/pagopa/io-app/issues/2834)) ([ee04a75](https://github.com/pagopa/io-app/commit/ee04a75b69ae0fed68e16134656c6744e99606be))
* [[#177016139](https://www.pivotaltracker.com/story/show/177016139)] When a message has a paid payment, show a banner to inform ([#2847](https://github.com/pagopa/io-app/issues/2847)) ([bc5fd61](https://github.com/pagopa/io-app/commit/bc5fd61115636b975586f155da1d951f8f720ab0))
* [[#177035521](https://www.pivotaltracker.com/story/show/177035521)] Track new events about payment flow 3DS2 ([#2849](https://github.com/pagopa/io-app/issues/2849)) ([4e17f53](https://github.com/pagopa/io-app/commit/4e17f53e5a926d3c910e4316852b462fe6a956a3))

## [1.22.0-rc.0](https://github.com/pagopa/io-app/compare/1.21.0-rc.5...1.22.0-rc.0) (2021-02-25)


### Features

* [[#176980827](https://www.pivotaltracker.com/story/show/176980827)] Don't allow user to add a credit card when insert a cardholder with accented characters ([#2833](https://github.com/pagopa/io-app/issues/2833)) ([7b0c441](https://github.com/pagopa/io-app/commit/7b0c4410f3175f2bab456fd98297ac016c558b34))
* [[#176981284](https://www.pivotaltracker.com/story/show/176981284),[#176981509](https://www.pivotaltracker.com/story/show/176981509)] Show the webview outcome message for the add credit card or payment operation ([#2842](https://github.com/pagopa/io-app/issues/2842)) ([864feb4](https://github.com/pagopa/io-app/commit/864feb4f594d7a56bda28639618032ac87110920))
* **Carta Giovani Nazionale:** [[#176456924](https://www.pivotaltracker.com/story/show/176456924),[#176655324](https://www.pivotaltracker.com/story/show/176655324),[#176655351](https://www.pivotaltracker.com/story/show/176655351),[#176655437](https://www.pivotaltracker.com/story/show/176655437),[#176655260](https://www.pivotaltracker.com/story/show/176655260),[#176655162](https://www.pivotaltracker.com/story/show/176655162),[#176456839](https://www.pivotaltracker.com/story/show/176456839)] Adds UI on CGN activation workflow ([#2758](https://github.com/pagopa/io-app/issues/2758)) ([eb6cd28](https://github.com/pagopa/io-app/commit/eb6cd28a15abd50d66f49cd849f5ce48a5c3f8a4))
* **Carta Giovani Nazionale:** [[#176715047](https://www.pivotaltracker.com/story/show/176715047)] Load CGN details from wallet section ([#2773](https://github.com/pagopa/io-app/issues/2773)) ([b915c02](https://github.com/pagopa/io-app/commit/b915c0242f31c26671afff6f21565d4c6ac85c6e))
* [[#176981421](https://www.pivotaltracker.com/story/show/176981421),[#176983158](https://www.pivotaltracker.com/story/show/176983158)] Make payment compliant with 3DS2 ([#2837](https://github.com/pagopa/io-app/issues/2837)) ([5ce56e1](https://github.com/pagopa/io-app/commit/5ce56e182688ab7af8fc202811affbe74fb87e09))
* [[#176983293](https://www.pivotaltracker.com/story/show/176983293)] Add a WebView component to support payments 3DS2 ([#2832](https://github.com/pagopa/io-app/issues/2832)) ([43c2605](https://github.com/pagopa/io-app/commit/43c2605a322ae8a97c1bbe1ddd5201ffc9a9a9a6))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176202932](https://www.pivotaltracker.com/story/show/176202932)] After remove a credit card from the wallet, a legacy screen is displayed instead of returning to the wallet ([#2820](https://github.com/pagopa/io-app/issues/2820)) ([8f86659](https://github.com/pagopa/io-app/commit/8f86659a5105312086da6f9e04c72c3b03365647))
* [[#176660226](https://www.pivotaltracker.com/story/show/176660226)] Fix iPhone 12 (Mini, Pro...) home button overlapping onto the tab bar ([#2795](https://github.com/pagopa/io-app/issues/2795)) ([d6cec5c](https://github.com/pagopa/io-app/commit/d6cec5cbd5dd1596bbba88b990d8fa93c54af97a))
* **Bonus Pagamenti Digitali:** [[#176268541](https://www.pivotaltracker.com/story/show/176268541)] The reason and the abiCode of bpdTransactionsLoad.failure it is not tracked ([#2819](https://github.com/pagopa/io-app/issues/2819)) ([a500dc7](https://github.com/pagopa/io-app/commit/a500dc787d5c01bcc634162ffb7effa27b62d086))
* **Carta Giovani Nazionale:** [[#176963464](https://www.pivotaltracker.com/story/show/176963464)] Fixes the API specifications for CGN after type and attributes renaming [#2829](https://github.com/pagopa/io-app/issues/2829) ([b8bd4aa](https://github.com/pagopa/io-app/commit/b8bd4aa506689cce9fc68b9c07e1fbd550eff8fa))
* **Payments:** [[#175856384](https://www.pivotaltracker.com/story/show/175856384)] Refresh session token onboarding card ([#2490](https://github.com/pagopa/io-app/issues/2490)) ([546419c](https://github.com/pagopa/io-app/commit/546419cf351c28da192e1a71680223fda3636868))


### Chores

* **Bonus Pagamenti Digitali:** [[#176842043](https://www.pivotaltracker.com/story/show/176842043)] Add tests for cobadge workflow and orchestration screens ([#2803](https://github.com/pagopa/io-app/issues/2803)) ([058ec7d](https://github.com/pagopa/io-app/commit/058ec7dd146917e2a95ed6e467d1ab66bf6d229d))
* **Bonus Pagamenti Digitali:** [[#177015049](https://www.pivotaltracker.com/story/show/177015049)] Update copy for add cobadge screen disclaimer ([#2839](https://github.com/pagopa/io-app/issues/2839)) ([7589793](https://github.com/pagopa/io-app/commit/75897933c6c42532a11d8f302771d71ec83a3da7))
* [[#177044503](https://www.pivotaltracker.com/story/show/177044503)] No PSP assigned page - copy fix ([#2841](https://github.com/pagopa/io-app/issues/2841)) ([a078ee3](https://github.com/pagopa/io-app/commit/a078ee38d3ebda73571e943b4e46ec4c0644dd0a))

## [1.21.0-rc.5](https://github.com/pagopa/io-app/compare/1.21.0-rc.4...1.21.0-rc.5) (2021-02-15)

## [1.21.0-rc.4](https://github.com/pagopa/io-app/compare/1.21.0-rc.3...1.21.0-rc.4) (2021-02-15)


### Features

* [[#176825286](https://www.pivotaltracker.com/story/show/176825286),[#176323469](https://www.pivotaltracker.com/story/show/176323469)] Features Carousel: Items are now shown depending on local and remote feature flag. BPD item is shown only when user is not enrolled to the program, hidden if loading or the information is not available ([#2793](https://github.com/pagopa/io-app/issues/2793)) ([435cde1](https://github.com/pagopa/io-app/commit/435cde196b6338e69bd139deee15fa06f2d78273))
* **Services:** [[#176919053](https://www.pivotaltracker.com/story/show/176919053)] Remove services tab counter badge and item unread badge indicator ([#2823](https://github.com/pagopa/io-app/issues/2823)) ([39c0be5](https://github.com/pagopa/io-app/commit/39c0be5a83e3cff2acffdef43d5afd3213d8f58b))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176023332](https://www.pivotaltracker.com/story/show/176023332)] If the unsubscription to bpd fails, exiting and re-entering the detail screen, the error toast is displayed again ([#2822](https://github.com/pagopa/io-app/issues/2822)) ([9a872e6](https://github.com/pagopa/io-app/commit/9a872e6d9247771f71ec31a1b760188d95212b1b))
* **Bonus Pagamenti Digitali:** [[#176551362](https://www.pivotaltracker.com/story/show/176551362)] Not all the getWalletV2 call are tracked ([#2815](https://github.com/pagopa/io-app/issues/2815)) ([a286f21](https://github.com/pagopa/io-app/commit/a286f21a1e7934375eac1202491fb3aea530a564))
* **Bonus Pagamenti Digitali:** [[#176903622](https://www.pivotaltracker.com/story/show/176903622)] Wrong back navigation when the workflow start from the new added bancomat bottomsheet ([#2813](https://github.com/pagopa/io-app/issues/2813)) ([a1381c7](https://github.com/pagopa/io-app/commit/a1381c7e2f9cb1283955bae6c2540456f1589364))
* **Bonus Pagamenti Digitali:** [[#176940152](https://www.pivotaltracker.com/story/show/176940152)] The BANCOMAT detail icons is (!) instead of (i) ([#2827](https://github.com/pagopa/io-app/issues/2827)) ([ec75063](https://github.com/pagopa/io-app/commit/ec75063400950bd2140100c698bf62eb457417d3))
* **Carta Giovani Nazionale:** [[#176905852](https://www.pivotaltracker.com/story/show/176905852)] Updated CGN spec url to master branch of IO Backend repository ([#2814](https://github.com/pagopa/io-app/issues/2814)) ([3995303](https://github.com/pagopa/io-app/commit/399530315e3a5d0f1a165d12805fd601edbd35cb))


### Chores

* [[#176900759](https://www.pivotaltracker.com/story/show/176900759)] Extend urls checking to *.ts source files ([#2811](https://github.com/pagopa/io-app/issues/2811)) ([eb94f57](https://github.com/pagopa/io-app/commit/eb94f57e3fbc724d4d68df62268d71151637f870))
* **Bonus Pagamenti Digitali:** [[#176918770](https://www.pivotaltracker.com/story/show/176918770)] Update copy when adding a co-badge card to the wallet ([4af4fb0](https://github.com/pagopa/io-app/commit/4af4fb06721f57677385e419b945faa413d62f2e))

## [1.21.0-rc.3](https://github.com/pagopa/io-app/compare/1.21.0-rc.2...1.21.0-rc.3) (2021-02-11)


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176895859](https://www.pivotaltracker.com/story/show/176895859)] Wrong tracking format for handleSearchUserCoBadge errors [#2810](https://github.com/pagopa/io-app/issues/2810) ([6a4449a](https://github.com/pagopa/io-app/commit/6a4449a4b4fa471d9f87d6c10fa90622da8775f3))

## [1.21.0-rc.2](https://github.com/pagopa/io-app/compare/1.21.0-rc.1...1.21.0-rc.2) (2021-02-10)


### Features

* **Bonus Pagamenti Digitali:** [[#176339472](https://www.pivotaltracker.com/story/show/176339472)] Autoload wallet ([#2792](https://github.com/pagopa/io-app/issues/2792)) ([81c3bdf](https://github.com/pagopa/io-app/commit/81c3bdf801061104982f240885009cb070b805f2))
* **Bonus Pagamenti Digitali:** [[#176455937](https://www.pivotaltracker.com/story/show/176455937)] Error and loading screen transaction details ([#2755](https://github.com/pagopa/io-app/issues/2755)) ([ae071e4](https://github.com/pagopa/io-app/commit/ae071e4342bc09d02e5526898effbb2a7a3d12c8))
* **Bonus Pagamenti Digitali:** [[#176575120](https://www.pivotaltracker.com/story/show/176575120)] Graphical refactor entry point co-badge ([#2783](https://github.com/pagopa/io-app/issues/2783)) ([2a9427f](https://github.com/pagopa/io-app/commit/2a9427f6710015e478fd2a74d1817c0821d4a4dd))
* **Bonus Pagamenti Digitali:** [[#176576695](https://www.pivotaltracker.com/story/show/176576695),[#176578086](https://www.pivotaltracker.com/story/show/176578086),[#176578131](https://www.pivotaltracker.com/story/show/176578131)] Added search co-badge ko screens ([#2774](https://github.com/pagopa/io-app/issues/2774)) ([b455e36](https://github.com/pagopa/io-app/commit/b455e36020a5a7d48d748f25732edd02a4a4df72))
* **Carta Giovani Nazionale:** [[#176592286](https://www.pivotaltracker.com/story/show/176592286),[#176592319](https://www.pivotaltracker.com/story/show/176592319),[#176443259](https://www.pivotaltracker.com/story/show/176443259),[#176443215](https://www.pivotaltracker.com/story/show/176443215)] CGN Activation workflow implementation ([#2749](https://github.com/pagopa/io-app/issues/2749)) ([aa362a6](https://github.com/pagopa/io-app/commit/aa362a62ec87b58a193c0d8e1d3850bba4f5ed19))


### Bug Fixes

* [[#176821234](https://www.pivotaltracker.com/story/show/176821234)] remove iuv reference ([#2787](https://github.com/pagopa/io-app/issues/2787)) ([30a9b2b](https://github.com/pagopa/io-app/commit/30a9b2b36ad1c4d1fbe2de288dae4ca1fa0036b6))
* [[#176869229](https://www.pivotaltracker.com/story/show/176869229)] SERVICES_DETAIL_LOADING_STATS event is sent on every service detail loaded ([#2800](https://github.com/pagopa/io-app/issues/2800)) ([7d2137f](https://github.com/pagopa/io-app/commit/7d2137f6a179cbb7bc963defd729abc181811055))
* [[#176843412](https://www.pivotaltracker.com/story/show/176843412)] fixes shadow on credit cards for android ([#2805](https://github.com/pagopa/io-app/issues/2805)) ([fe4d3b0](https://github.com/pagopa/io-app/commit/fe4d3b0782772d28dd5bc3570bd33967d6491dff))


### Chores

* **Bonus Pagamenti Digitali:** [[#176617091](https://www.pivotaltracker.com/story/show/176617091)] Add cobadge tracking ([#2798](https://github.com/pagopa/io-app/issues/2798)) ([048b0e2](https://github.com/pagopa/io-app/commit/048b0e23eabcdd7bc5448a013fe5a0e26458e67e))
* **Bonus Pagamenti Digitali:** [[#176844720](https://www.pivotaltracker.com/story/show/176844720)] Remove cobadge feature flag ([#2802](https://github.com/pagopa/io-app/issues/2802)) ([0fe3307](https://github.com/pagopa/io-app/commit/0fe33075b06dcfc4287fd99f560510d7c6bf17db))

## [1.21.0-rc.1](https://github.com/pagopa/io-app/compare/1.21.0-rc.0...1.21.0-rc.1) (2021-02-09)


### Features

* **Bonus Pagamenti Digitali:** [[#176578587](https://www.pivotaltracker.com/story/show/176578587)] Update the co-badge in app payment badge ([#2797](https://github.com/pagopa/io-app/issues/2797)) ([16a0517](https://github.com/pagopa/io-app/commit/16a05174924bc6e6462bc04b5a496b4f7f45696b))

## [1.21.0-rc.0](https://github.com/pagopa/io-app/compare/1.20.0-rc.2...1.21.0-rc.0) (2021-02-09)


### Features

* **Bonus Pagamenti Digitali:** [[#176576458](https://www.pivotaltracker.com/story/show/176576458),[#176576505](https://www.pivotaltracker.com/story/show/176576505)] Added co-badge abi config ko screens ([#2768](https://github.com/pagopa/io-app/issues/2768)) ([ee6b8e3](https://github.com/pagopa/io-app/commit/ee6b8e39497b765c3763b53665cb48c3a85b20e2))
* **Bonus Pagamenti Digitali:** [[#176739150](https://www.pivotaltracker.com/story/show/176739150)] Chose to add cobadge or credit card screen ([#2778](https://github.com/pagopa/io-app/issues/2778)) ([867b608](https://github.com/pagopa/io-app/commit/867b60889cce0f985f7c5b93940089b66d823839))
* **Bonus Pagamenti Digitali:** [[#176842170](https://www.pivotaltracker.com/story/show/176842170)] Ask identification to unsubscribe from cashback ([#2794](https://github.com/pagopa/io-app/issues/2794)) ([a503f12](https://github.com/pagopa/io-app/commit/a503f12cbff4cc5058fe9870cf1c5993e3a17c5c))


### Bug Fixes

* [[#175419820](https://www.pivotaltracker.com/story/show/175419820)] Restore screen brightness ([#2728](https://github.com/pagopa/io-app/issues/2728)) ([385a3b5](https://github.com/pagopa/io-app/commit/385a3b508af9981a87852c15106d79e2c0ac2e98))
* [[#176476117](https://www.pivotaltracker.com/story/show/176476117)] Improved localization of TouchID dialog on Android [#2788](https://github.com/pagopa/io-app/issues/2788) ([f4b64ca](https://github.com/pagopa/io-app/commit/f4b64ca61549d280da29d952d8b82e5a233967b4))


### Chores

* **Bonus Pagamenti Digitali:** [[#176848601](https://www.pivotaltracker.com/story/show/176848601)] Privacy policy CTA localization update [#2799](https://github.com/pagopa/io-app/issues/2799) ([1ca5dc9](https://github.com/pagopa/io-app/commit/1ca5dc913f95515b794dd4357333a6324b73310e))

## [1.20.0-rc.2](https://github.com/pagopa/io-app/compare/1.20.0-rc.1...1.20.0-rc.2) (2021-02-05)


### Bug Fixes

* **Carta Giovani Nazionale:** [[#176824599](https://www.pivotaltracker.com/story/show/176824599)] Show CGN item when the user is not BPD enrolled  ([#2790](https://github.com/pagopa/io-app/issues/2790)) ([6007a88](https://github.com/pagopa/io-app/commit/6007a88ffa5adce92f063e224e4758f81c22ae71))

## [1.20.0-rc.1](https://github.com/pagopa/io-app/compare/1.20.0-rc.0...1.20.0-rc.1) (2021-02-05)


### Features

* **Bonus Pagamenti Digitali:** [[#176575663](https://www.pivotaltracker.com/story/show/176575663)] Added Start onboarding cobadge screen ([#2760](https://github.com/pagopa/io-app/issues/2760)) ([48d54a1](https://github.com/pagopa/io-app/commit/48d54a18f367f8424b8de9ce5f03fba75a2b5e33))
* **Bonus Pagamenti Digitali:** [[#176578322](https://www.pivotaltracker.com/story/show/176578322)] Visualize iteratively co-badge card that can be added to the wallet ([#2770](https://github.com/pagopa/io-app/issues/2770)) ([187b665](https://github.com/pagopa/io-app/commit/187b6654a55b9a4f378794065de05f1cb831b625))
* **Bonus Pagamenti Digitali:** [[#176738620](https://www.pivotaltracker.com/story/show/176738620)] Choose card type before starting the co-badge onboarding workflow ([#2766](https://github.com/pagopa/io-app/issues/2766)) ([28bb25e](https://github.com/pagopa/io-app/commit/28bb25ea7c3a6553f876744cdbd8a163e951dcd7))
* **Bonus Pagamenti Digitali:** [[#176786909](https://www.pivotaltracker.com/story/show/176786909)] Added start onboarding co-badge for all abi screen ([#2777](https://github.com/pagopa/io-app/issues/2777)) ([09aa68c](https://github.com/pagopa/io-app/commit/09aa68c9aaab8ece5485675ee420333eb364814d))
* **Carta Giovani Nazionale:** [[#176443367](https://www.pivotaltracker.com/story/show/176443367)] Activation Saga handler ([#2742](https://github.com/pagopa/io-app/issues/2742)) ([60b3f5c](https://github.com/pagopa/io-app/commit/60b3f5caa029163ff53d818ad37f54f63905378a))
* **Carta Giovani Nazionale:** [[#176715047](https://www.pivotaltracker.com/story/show/176715047)] Adds the CGN card carousel  ([#2769](https://github.com/pagopa/io-app/issues/2769)) ([fa583bc](https://github.com/pagopa/io-app/commit/fa583bcc8f5dca1ae211dab1a982efac680619d4))


### Bug Fixes

* [[#176097298](https://www.pivotaltracker.com/story/show/176097298)] card showing the bottom borders ([#2653](https://github.com/pagopa/io-app/issues/2653)) ([f731ca1](https://github.com/pagopa/io-app/commit/f731ca1228de748d54de0c4feb4dcd91328d7b17))
* [[#176481360](https://www.pivotaltracker.com/story/show/176481360)] CIE "Where can I find my PIN" bottom sheet text must not be selectable ([#2781](https://github.com/pagopa/io-app/issues/2781)) ([b204dbc](https://github.com/pagopa/io-app/commit/b204dbc61e5b24a94881c4b390d165f01da52745))
* [[#176778241](https://www.pivotaltracker.com/story/show/176778241)] On bug report can't share the screenshot ([#2772](https://github.com/pagopa/io-app/issues/2772)) ([4b6611f](https://github.com/pagopa/io-app/commit/4b6611f0ce3bd9fbc93b3aaca617d3cc3aa411cb))


### Chores

* **Bonus Pagamenti Digitali:** [[#176816895](https://www.pivotaltracker.com/story/show/176816895)] Add feature flag for cobadge workflow ([#2786](https://github.com/pagopa/io-app/issues/2786)) ([fad5740](https://github.com/pagopa/io-app/commit/fad574047612f82ce0aac2de11e72aca3a57849c))
* [[#176778467](https://www.pivotaltracker.com/story/show/176778467)] Track loading services details stats ([#2785](https://github.com/pagopa/io-app/issues/2785)) ([f3f56de](https://github.com/pagopa/io-app/commit/f3f56deb41f912365c75b61c29c45638e5d97f1e))

## [1.20.0-rc.0](https://github.com/pagopa/io-app/compare/1.19.0-rc.2...1.20.0-rc.0) (2021-02-02)


### Features

* **Bonus Pagamenti Digitali:** [[#175741693](https://www.pivotaltracker.com/story/show/175741693)] Remove timestamp from transactions when it's equal to 00:00 ([#2734](https://github.com/pagopa/io-app/issues/2734)) ([b19d3f1](https://github.com/pagopa/io-app/commit/b19d3f1cf4bed44577429528dac970061797aa72))
* **Bonus Pagamenti Digitali:** [[#176553194](https://www.pivotaltracker.com/story/show/176553194)] implements supermarket loyalty card ([#2748](https://github.com/pagopa/io-app/issues/2748)) ([6d8571f](https://github.com/pagopa/io-app/commit/6d8571f27009496f37aa33fcb89f879aae1b5552))
* **Bonus Pagamenti Digitali:** [[#176559650](https://www.pivotaltracker.com/story/show/176559650)] Actions, store & reducers for co-badge ([#2747](https://github.com/pagopa/io-app/issues/2747)) ([6c3e30b](https://github.com/pagopa/io-app/commit/6c3e30b2b9f4798509f7ecb839cdef19a6aa87e8))
* **Bonus Pagamenti Digitali:** [[#176559662](https://www.pivotaltracker.com/story/show/176559662)] Navigation & screen stubs for co-badge workflow ([#2750](https://github.com/pagopa/io-app/issues/2750)) ([4c2654f](https://github.com/pagopa/io-app/commit/4c2654f0cafee8e9899c88d7e547fa50aca919b9))
* **Bonus Pagamenti Digitali:** [[#176559982](https://www.pivotaltracker.com/story/show/176559982),[#176560026](https://www.pivotaltracker.com/story/show/176560026)] Load user cobadge pans  ([#2759](https://github.com/pagopa/io-app/issues/2759)) ([315b0f4](https://github.com/pagopa/io-app/commit/315b0f44b286d692d096efa954a6cc144628e608))
* [[#176311366](https://www.pivotaltracker.com/story/show/176311366)] Added "Send screenshot" checkbox to the add card screen's contextual help funnel ([#2670](https://github.com/pagopa/io-app/issues/2670)) ([178a8c7](https://github.com/pagopa/io-app/commit/178a8c7fa0358a80fed9430f68acdee0c4b0fea3))
* **Bonus Pagamenti Digitali:** [[#176575256](https://www.pivotaltracker.com/story/show/176575256)] Co-badge card onboarding workflow ([#2752](https://github.com/pagopa/io-app/issues/2752)) ([390d2d4](https://github.com/pagopa/io-app/commit/390d2d4e68bcf491ce14a4af994390905f08adee))
* [[#173962963](https://www.pivotaltracker.com/story/show/173962963)] Expanded header icons touch area ([#2644](https://github.com/pagopa/io-app/issues/2644)) ([6bd6c25](https://github.com/pagopa/io-app/commit/6bd6c2543306c8ad1fe7bceaed4c7d17f28452dc))
* [[#174034081](https://www.pivotaltracker.com/story/show/174034081)] Unlock code is persisted across logins if citizen doesn't change (2nd attempt) ([#2767](https://github.com/pagopa/io-app/issues/2767)) ([7994983](https://github.com/pagopa/io-app/commit/79949834e23715508c81eba68a57c5545fc3a8f2))
* **Bonus Pagamenti Digitali:** [[#176575992](https://www.pivotaltracker.com/story/show/176575992)] Add cobadge load configuration API ([#2756](https://github.com/pagopa/io-app/issues/2756)) ([58db5d1](https://github.com/pagopa/io-app/commit/58db5d14d5521a679949933a1562a252b64cab4f))
* **Bonus Pagamenti Digitali:** [[#176578578](https://www.pivotaltracker.com/story/show/176578578)] Cobadge card preview ([#2746](https://github.com/pagopa/io-app/issues/2746)) ([3a49eb8](https://github.com/pagopa/io-app/commit/3a49eb8cd1d77c88975a25ba19c48ae86acd0bc2))
* **Bonus Pagamenti Digitali:** [[#176578587](https://www.pivotaltracker.com/story/show/176578587)] Cobadge detail screen ([#2751](https://github.com/pagopa/io-app/issues/2751)) ([0192964](https://github.com/pagopa/io-app/commit/0192964ada9a2f9aa13ab8490138b25d275e554c))
* **Carta Giovani Nazionale:** [[#176443163](https://www.pivotaltracker.com/story/show/176443163)] New bonuses available visibility and start cgn flow logic ([#2733](https://github.com/pagopa/io-app/issues/2733)) ([4e4e1b6](https://github.com/pagopa/io-app/commit/4e4e1b6640f0d8f996debf3411b86f86456f1030))
* **Services:** [[#176676680](https://www.pivotaltracker.com/story/show/176676680),[#176606850](https://www.pivotaltracker.com/story/show/176606850),[#176513922](https://www.pivotaltracker.com/story/show/176513922)] Improve services caching and loading ([#2765](https://github.com/pagopa/io-app/issues/2765)) ([e1ee048](https://github.com/pagopa/io-app/commit/e1ee04835d785e8e48aaa7c66633abdba0d3d328))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176477833](https://www.pivotaltracker.com/story/show/176477833)] Fixed mistake that inhibited BPD CTA to properly show ([#2738](https://github.com/pagopa/io-app/issues/2738)) ([86f3404](https://github.com/pagopa/io-app/commit/86f3404e6903cafc29333566fe3402990782e521))
* **Bonus Pagamenti Digitali:** [[#176720702](https://www.pivotaltracker.com/story/show/176720702)] Cobadge add-wallet payload has an invalid date format ([#2761](https://github.com/pagopa/io-app/issues/2761)) ([9e1a40a](https://github.com/pagopa/io-app/commit/9e1a40a6d8835e5684c85fa0568503b44a08392d))


### Chores

* [[#176175845](https://www.pivotaltracker.com/story/show/176175845)] removes transactions list from the transactions screen ([#2628](https://github.com/pagopa/io-app/issues/2628)) ([ec5437b](https://github.com/pagopa/io-app/commit/ec5437bc3d1a2bf2c346aff7b89dfd1ce134fba6))
* **Bonus Pagamenti Digitali:** [[#176737219](https://www.pivotaltracker.com/story/show/176737219)] milestone copy ([#2763](https://github.com/pagopa/io-app/issues/2763)) ([29f93eb](https://github.com/pagopa/io-app/commit/29f93ebd7fd26ef75034843a44b0926c4bf9f7b0))
* [[#176614756](https://www.pivotaltracker.com/story/show/176614756)] Use [@pagopa](https://github.com/pagopa) packages from npm registry ([#2754](https://github.com/pagopa/io-app/issues/2754)) ([434d0e4](https://github.com/pagopa/io-app/commit/434d0e4307acc941f390a8a5e1de89cba0b03e40))

## [1.19.0-rc.2](https://github.com/pagopa/io-app/compare/1.19.0-rc.1...1.19.0-rc.2) (2021-01-22)


### Bug Fixes

* [[#176607041](https://www.pivotaltracker.com/story/show/176607041)] Hashed CF is reset on logout [#2745](https://github.com/pagopa/io-app/issues/2745) ([f8dbaf9](https://github.com/pagopa/io-app/commit/f8dbaf9b6a6d73ae9d6e4f2eda50eb4035afa765))

## [1.19.0-rc.1](https://github.com/pagopa/io-app/compare/1.19.0-rc.0...1.19.0-rc.1) (2021-01-21)


### Features

* **Carta Giovani Nazionale:** [[#176443044](https://www.pivotaltracker.com/story/show/176443044)] Adds directories skeleton for CGN implementation ([#2718](https://github.com/pagopa/io-app/issues/2718)) ([5bc6f7b](https://github.com/pagopa/io-app/commit/5bc6f7b3a95863d42cdc2d3e636513b6c0880513))
* **Payments:** [[#176409411](https://www.pivotaltracker.com/story/show/176409411)] Update message detail info ([#2729](https://github.com/pagopa/io-app/issues/2729)) ([b9faf1a](https://github.com/pagopa/io-app/commit/b9faf1a7b2cdf417b7f7cc611acffa21441f6f8a))
* [[#176434157](https://www.pivotaltracker.com/story/show/176434157)] Remove payment CTA and expired badge ([#2741](https://github.com/pagopa/io-app/issues/2741)) ([fa4efed](https://github.com/pagopa/io-app/commit/fa4efed5e11325d1aaf8d70a35a668e067a839c5))


### Bug Fixes

* **Payments:** [[#175857824](https://www.pivotaltracker.com/story/show/175857824)] dispatched sessionExpired on getWallets failure ([#2481](https://github.com/pagopa/io-app/issues/2481)) ([24f09f5](https://github.com/pagopa/io-app/commit/24f09f53c2342db93d425195abe0523aac5659a5))
* [[#176455315](https://www.pivotaltracker.com/story/show/176455315),[#176417779](https://www.pivotaltracker.com/story/show/176417779)] Persist payment/message status  ([#2736](https://github.com/pagopa/io-app/issues/2736)) ([e97c483](https://github.com/pagopa/io-app/commit/e97c483d720d0764e92c17674902b8446f338bad))


### Chores

* [[#176497587](https://www.pivotaltracker.com/story/show/176497587)] Store hashed fiscal code ([#2732](https://github.com/pagopa/io-app/issues/2732)) ([dd266a5](https://github.com/pagopa/io-app/commit/dd266a55658df22842a0834b2b0c218a1b6ee815))

## [1.19.0-rc.0](https://github.com/pagopa/io-app/compare/1.18.0-rc.3...1.19.0-rc.0) (2021-01-19)


### Bug Fixes

* [[#175501909](https://www.pivotaltracker.com/story/show/175501909)] Move Contextual Help "Why A Fee" to ConfirmPaymentMethodScreen ([#2430](https://github.com/pagopa/io-app/issues/2430)) ([8df4587](https://github.com/pagopa/io-app/commit/8df45875610dc9f699837572a9f3d608f3a7abe7))

## [1.18.0-rc.3](https://github.com/pagopa/io-app/compare/1.18.0-rc.2...1.18.0-rc.3) (2021-01-15)


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176516558](https://www.pivotaltracker.com/story/show/176516558)] Missing integer formatting for transactions number & ranking ([#2731](https://github.com/pagopa/io-app/issues/2731)) ([26ebc27](https://github.com/pagopa/io-app/commit/26ebc273c4f21fbb76460f311a288d45262090e8))

## [1.18.0-rc.2](https://github.com/pagopa/io-app/compare/1.18.0-rc.1...1.18.0-rc.2) (2021-01-15)


### Features

* **Bonus Pagamenti Digitali:** [[#176457237](https://www.pivotaltracker.com/story/show/176457237)] Remove disabled account from BPay found list ([#2720](https://github.com/pagopa/io-app/issues/2720)) ([d147418](https://github.com/pagopa/io-app/commit/d14741817c6d31847e7db4a0f22e3d8db37c051a))
* [[#176176848](https://www.pivotaltracker.com/story/show/176176848)] Added explanatory bottom sheet for in-app payments card section ([#2709](https://github.com/pagopa/io-app/issues/2709)) ([3894150](https://github.com/pagopa/io-app/commit/389415068a8f3eb2223f5a508412e93bfa802472))
* [[#176479978](https://www.pivotaltracker.com/story/show/176479978)] Add react native bundle visualizer as dev dependency ([#2719](https://github.com/pagopa/io-app/issues/2719)) ([e2eced4](https://github.com/pagopa/io-app/commit/e2eced4b4ba0f76c7812c5158c9c846db5936047))
* **Bonus Pagamenti Digitali:** [[#176484406](https://www.pivotaltracker.com/story/show/176484406)] Remove first place from supercashback ranking ([#2725](https://github.com/pagopa/io-app/issues/2725)) ([6067156](https://github.com/pagopa/io-app/commit/60671563ccbcb06b94026336042bd7b7531e8e74))
* **Bonus Vacanze:** [[#176309802](https://www.pivotaltracker.com/story/show/176309802)] Remove bonus vacanze cta [#2711](https://github.com/pagopa/io-app/issues/2711) ([c313b37](https://github.com/pagopa/io-app/commit/c313b3771c4af331ec7cbeb8489c8fc2648fe2ff))
* **Carta Giovani Nazionale:** [[#176442968](https://www.pivotaltracker.com/story/show/176442968)] Adds CGN Feature Flag [#2714](https://github.com/pagopa/io-app/issues/2714) ([5f9edcb](https://github.com/pagopa/io-app/commit/5f9edcb0374c3e2d60c46f1a0489365bb7c71fd3))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176496182](https://www.pivotaltracker.com/story/show/176496182)] SuggestBpdActivationScreen displays always a "pagoBANCOMAT" title [#2724](https://github.com/pagopa/io-app/issues/2724) ([a70a75f](https://github.com/pagopa/io-app/commit/a70a75f284b24da8331788e5b010e3fd9b1e5dd8))
* [[#176225603](https://www.pivotaltracker.com/story/show/176225603)] PSP Icon removal ([#2690](https://github.com/pagopa/io-app/issues/2690)) ([fe949e5](https://github.com/pagopa/io-app/commit/fe949e5deccc3846deddec74399a7f69ec9efc84))
* [[#176290749](https://www.pivotaltracker.com/story/show/176290749)] Fiscal-code fac-simile entries are not readable on some Xiaomi devices ([#2713](https://github.com/pagopa/io-app/issues/2713)) ([83cada8](https://github.com/pagopa/io-app/commit/83cada83d89d04bcab579db7ff0ab99f96287ae2))


### Chores

* **Bonus Pagamenti Digitali:** [[#176436807](https://www.pivotaltracker.com/story/show/176436807)] Improve and fix backoff delay reducer ([#2706](https://github.com/pagopa/io-app/issues/2706)) ([390c4e6](https://github.com/pagopa/io-app/commit/390c4e637eef5a433a14a28c5ac75ff5e6b1f410))
* **Bonus Pagamenti Digitali:** [[#176498731](https://www.pivotaltracker.com/story/show/176498731)] Add new bpd ranking config flag ([#2726](https://github.com/pagopa/io-app/issues/2726)) ([2967024](https://github.com/pagopa/io-app/commit/296702436fff70ec6ac33502b12fc1844a2273ef))
* **Bonus Vacanze:** [[#176459696](https://www.pivotaltracker.com/story/show/176459696)] Remove API handlers and saga of start/get eligibilityCheck  ([#2715](https://github.com/pagopa/io-app/issues/2715)) ([93616c7](https://github.com/pagopa/io-app/commit/93616c779d06cf3b0910566dc126e78bd9642288))

## [1.18.0-rc.1](https://github.com/pagopa/io-app/compare/1.18.0-rc.0...1.18.0-rc.1) (2021-01-11)


### Features

* [[#175272158](https://www.pivotaltracker.com/story/show/175272158)] Refactored CIE PIN screen to functional, added informative bottom sheet ([#2612](https://github.com/pagopa/io-app/issues/2612)) ([f05a443](https://github.com/pagopa/io-app/commit/f05a4437af1f6588dafcea2f3aa871fd0e42e2e7))
* [[#176424621](https://www.pivotaltracker.com/story/show/176424621)] Upgrades TypeScript to 4.1 ([#2596](https://github.com/pagopa/io-app/issues/2596)) ([4a40558](https://github.com/pagopa/io-app/commit/4a405589d8c8ad01b2cd02cbcec4bab3ab462efb))
* **Bonus Pagamenti Digitali:** [[#175890963](https://www.pivotaltracker.com/story/show/175890963)] Adds the screen to see all BPay accounts to add ([#2697](https://github.com/pagopa/io-app/issues/2697)) ([8d8d6cf](https://github.com/pagopa/io-app/commit/8d8d6cffbee489af79f7c2c0b2c2542f7460a1a4))
* **Bonus Pagamenti Digitali:** [[#176417281](https://www.pivotaltracker.com/story/show/176417281)] Return to wallet after add BPay ([#2703](https://github.com/pagopa/io-app/issues/2703)) ([08c036e](https://github.com/pagopa/io-app/commit/08c036e34d37eb70873ef9fd34a9f719179affea))
* **Bonus Pagamenti Digitali:** [[#176432457](https://www.pivotaltracker.com/story/show/176432457)] Remove navigation bar from the BPay detail screen ([#2699](https://github.com/pagopa/io-app/issues/2699)) ([53a6b21](https://github.com/pagopa/io-app/commit/53a6b215239fdb9076920f2c315423acfb1cc14e))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176193377](https://www.pivotaltracker.com/story/show/176193377)] Ask to send cf only on new assistance request ([#2710](https://github.com/pagopa/io-app/issues/2710)) ([fe7ba13](https://github.com/pagopa/io-app/commit/fe7ba13adbebdbf9dc2f0818446e69520ceb523b))
* **Bonus Pagamenti Digitali:** [[#176350129](https://www.pivotaltracker.com/story/show/176350129)] Link inside bottom sheet is not tappable ([#2701](https://github.com/pagopa/io-app/issues/2701)) ([726af95](https://github.com/pagopa/io-app/commit/726af951ca64b29738849bcd6872ce1f01e6eda8))
* **Bonus Pagamenti Digitali:** [[#176365811](https://www.pivotaltracker.com/story/show/176365811)] Set support token as instabug user attribute ([#2688](https://github.com/pagopa/io-app/issues/2688)) ([3b88170](https://github.com/pagopa/io-app/commit/3b881705ea5692cdb4144a4e41692b2dbd25d82b))
* **Bonus Pagamenti Digitali:** [[#176437020](https://www.pivotaltracker.com/story/show/176437020)] BPay card in onboarding screen had shadow cut on Android [#2705](https://github.com/pagopa/io-app/issues/2705) ([4f6a802](https://github.com/pagopa/io-app/commit/4f6a802d01399ff5bdadd1d8e4d4f0d3441bbf5b))
* **Bonus Pagamenti Digitali:** [[#176437454](https://www.pivotaltracker.com/story/show/176437454)] Bpay logo had low quality [#2707](https://github.com/pagopa/io-app/issues/2707) ([f27079c](https://github.com/pagopa/io-app/commit/f27079c2fd8d5a8a99673f0ddcdc15cd83048a27))

## [1.18.0-rc.0](https://github.com/pagopa/io-app/compare/1.17.0-rc.2...1.18.0-rc.0) (2021-01-11)


### Features

* **Bonus Pagamenti Digitali:** [[#176426698](https://www.pivotaltracker.com/story/show/176426698)] Fix format amount [#2692](https://github.com/pagopa/io-app/issues/2692) ([543d63c](https://github.com/pagopa/io-app/commit/543d63c6086e9100b8507f3c47b3ab5083eb559f))

## [1.17.0-rc.2](https://github.com/pagopa/io-app/compare/1.17.0-rc.1...1.17.0-rc.2) (2021-01-08)


### Features

* **Bonus Pagamenti Digitali:** [[#175883232](https://www.pivotaltracker.com/story/show/175883232)] Send BPay actions to mixpanel ([#2678](https://github.com/pagopa/io-app/issues/2678)) ([44f2978](https://github.com/pagopa/io-app/commit/44f2978bd943d9f535c9d16352da54d1184dc7df))
* **Bonus Pagamenti Digitali:** [[#175883367](https://www.pivotaltracker.com/story/show/175883367),[#175883472](https://www.pivotaltracker.com/story/show/175883472)] Wallet BPay visualization ([#2682](https://github.com/pagopa/io-app/issues/2682)) ([e39332f](https://github.com/pagopa/io-app/commit/e39332fc43e05b2776fd55f187943e07fd5c229e))
* **Bonus Pagamenti Digitali:** [[#175889262](https://www.pivotaltracker.com/story/show/175889262),[#175889280](https://www.pivotaltracker.com/story/show/175889280)] Add bpay/list API ([#2662](https://github.com/pagopa/io-app/issues/2662)) ([fbd4b67](https://github.com/pagopa/io-app/commit/fbd4b67bddb296a44dfc2b1d097ab3133871ffaa))
* **Bonus Pagamenti Digitali:** [[#175889351](https://www.pivotaltracker.com/story/show/175889351),[#175889362](https://www.pivotaltracker.com/story/show/175889362),[#175889493](https://www.pivotaltracker.com/story/show/175889493),[#175890975](https://www.pivotaltracker.com/story/show/175890975)] Action, store & reducer Bpay ([#2673](https://github.com/pagopa/io-app/issues/2673)) ([3f9bb70](https://github.com/pagopa/io-app/commit/3f9bb700cf7ed2f7d5263a9ab74aa2ee2cda22db))
* **Bonus Pagamenti Digitali:** [[#175890863](https://www.pivotaltracker.com/story/show/175890863),[#175883224](https://www.pivotaltracker.com/story/show/175883224)] Creates base component for bpay search funnel ([#2681](https://github.com/pagopa/io-app/issues/2681)) ([f44d049](https://github.com/pagopa/io-app/commit/f44d0494817c84bcd06c163985198ba16cf2fb73))
* **Bonus Pagamenti Digitali:** [[#175890882](https://www.pivotaltracker.com/story/show/175890882)] Update caption for BPay ko & loading screens ([#2680](https://github.com/pagopa/io-app/issues/2680)) ([9dc52bd](https://github.com/pagopa/io-app/commit/9dc52bd400662999749b94efc5974ef9aa9ea94a))
* **Bonus Pagamenti Digitali:** [[#176401375](https://www.pivotaltracker.com/story/show/176401375)] Update BPay description and numberObfuscated [#2685](https://github.com/pagopa/io-app/issues/2685) ([cc67d74](https://github.com/pagopa/io-app/commit/cc67d7485366af1214eb58656fed57e240478073))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176397291](https://www.pivotaltracker.com/story/show/176397291)] Favorite wallet info is lost ([#2683](https://github.com/pagopa/io-app/issues/2683)) ([3cd4584](https://github.com/pagopa/io-app/commit/3cd4584b97aecd8a4bc09b4925cec48ee8882d8e))

## [1.17.0-rc.1](https://github.com/pagopa/io-app/compare/1.17.0-rc.0...1.17.0-rc.1) (2021-01-05)


### Features

* **Bonus Pagamenti Digitali:** [[#176318970](https://www.pivotaltracker.com/story/show/176318970)] Avoid call bpd API if the user is not enrolled ([#2663](https://github.com/pagopa/io-app/issues/2663)) ([d0582ef](https://github.com/pagopa/io-app/commit/d0582ef1e203619e557baf4cdc8135b1b760142f))
* [[#176222893](https://www.pivotaltracker.com/story/show/176222893)] increased delay between user profile activation retries [#2664](https://github.com/pagopa/io-app/issues/2664) ([5c0c90f](https://github.com/pagopa/io-app/commit/5c0c90f201ceea2bcd8a527873ff1afc2ad236f8))
* [[#176299898](https://www.pivotaltracker.com/story/show/176299898)] Amex warning (transaction >1000 EUR) ([#2671](https://github.com/pagopa/io-app/issues/2671)) ([8e171d3](https://github.com/pagopa/io-app/commit/8e171d36c13a6ed220b27278da9972acf6d2d5fc))
* **Payments:** [[#176364017](https://www.pivotaltracker.com/story/show/176364017)] Use /v1/psps/selected instead of deprecated /v1/psps ([#2675](https://github.com/pagopa/io-app/issues/2675)) ([a8bd66a](https://github.com/pagopa/io-app/commit/a8bd66a34cd9edccef274e1335e321fa4c137ce9))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176338423](https://www.pivotaltracker.com/story/show/176338423)] Wrong cashback detail by selecting card preview ([#2669](https://github.com/pagopa/io-app/issues/2669)) ([2257488](https://github.com/pagopa/io-app/commit/225748826ec36dd79f76dd48c20200858e6d86dd))

## [1.17.0-rc.0](https://github.com/pagopa/io-app/compare/1.16.0-rc.1...1.17.0-rc.0) (2021-01-01)


### Features

* **Bonus Pagamenti Digitali:** [[#176177351](https://www.pivotaltracker.com/story/show/176177351)] Refactored AddCardScreen component and added bottom sheet ([#2635](https://github.com/pagopa/io-app/issues/2635)) ([72e8d3c](https://github.com/pagopa/io-app/commit/72e8d3cd9d975e034c8e77db93661d804afc5a6a))
* **Bonus Pagamenti Digitali:** [[#176300242](https://www.pivotaltracker.com/story/show/176300242)] Handles the status message on ranking bottom sheet ([#2657](https://github.com/pagopa/io-app/issues/2657)) ([221744c](https://github.com/pagopa/io-app/commit/221744c0813a8445dfd99baa545bc311e6d0c9ff))
* [[#175900141](https://www.pivotaltracker.com/story/show/175900141)] Added profile deletion abort tracking ([#2649](https://github.com/pagopa/io-app/issues/2649)) ([c9ecf62](https://github.com/pagopa/io-app/commit/c9ecf62d0ae5920ff5d3166e8493b9bb0db798cf))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176248270](https://www.pivotaltracker.com/story/show/176248270)] Fixes the bad alignment on cashback value ([#2659](https://github.com/pagopa/io-app/issues/2659)) ([305df5f](https://github.com/pagopa/io-app/commit/305df5fdcd0340a5c2ef436eb0990d3c6218d2ee))

## [1.16.0-rc.1](https://github.com/pagopa/io-app/compare/1.16.0-rc.0...1.16.0-rc.1) (2020-12-29)


### Features

* **Bonus Pagamenti Digitali:** [[#175263933](https://www.pivotaltracker.com/story/show/175263933)] Add BPD/citizen/ranking API ([#2623](https://github.com/pagopa/io-app/issues/2623)) ([1495859](https://github.com/pagopa/io-app/commit/1495859ed6647b777ce1546036f3060c0f45257a))
* **Bonus Pagamenti Digitali:** [[#176072451](https://www.pivotaltracker.com/story/show/176072451)] Added "share you screenshot" checkbox to "Write to the IO team" screen ([#2545](https://github.com/pagopa/io-app/issues/2545)) ([063e09d](https://github.com/pagopa/io-app/commit/063e09d455a9ea19338c64daacec6acfd953f4e6))
* **Bonus Pagamenti Digitali:** [[#176191342](https://www.pivotaltracker.com/story/show/176191342)] Super Cashback ranking components ([#2629](https://github.com/pagopa/io-app/issues/2629)) ([e0f80f6](https://github.com/pagopa/io-app/commit/e0f80f62e07ec092cb986a2d0bd633be9be778f8))
* **Bonus Pagamenti Digitali:** [[#176191528](https://www.pivotaltracker.com/story/show/176191528),[#176269223](https://www.pivotaltracker.com/story/show/176269223)] Supercashback graphical component and textual summary update ([#2633](https://github.com/pagopa/io-app/issues/2633)) ([162bb6f](https://github.com/pagopa/io-app/commit/162bb6f8785eb8b596da5f644a02b1827c0d9178))
* **Bonus Pagamenti Digitali:** [[#176191591](https://www.pivotaltracker.com/story/show/176191591)] Open ranking details when tap on ranking preview ([#2652](https://github.com/pagopa/io-app/issues/2652)) ([0f75590](https://github.com/pagopa/io-app/commit/0f755905b0e3598ba4af1fb3fa2d2e66141b3ce4))
* **Bonus Pagamenti Digitali:** [[#176192263](https://www.pivotaltracker.com/story/show/176192263)] New symbols for cashback state ([#2624](https://github.com/pagopa/io-app/issues/2624)) ([6542818](https://github.com/pagopa/io-app/commit/65428189c904461444430bccb64ecc4a67e703e0))
* **Bonus Pagamenti Digitali:** [[#176193672](https://www.pivotaltracker.com/story/show/176193672),[#176193494](https://www.pivotaltracker.com/story/show/176193494)] Last update component ([#2617](https://github.com/pagopa/io-app/issues/2617)) ([79afda3](https://github.com/pagopa/io-app/commit/79afda338a212ad219fb2a714cab04de8399242b))
* **Bonus Pagamenti Digitali:** [[#176204744](https://www.pivotaltracker.com/story/show/176204744)] Backoff delay on load BPD data ([#2654](https://github.com/pagopa/io-app/issues/2654)) ([2d4a382](https://github.com/pagopa/io-app/commit/2d4a382a8fd716e9e18d2f46bc506e2d504928bf))
* **Bonus Pagamenti Digitali:** [[#176240699](https://www.pivotaltracker.com/story/show/176240699),[#175891337](https://www.pivotaltracker.com/story/show/175891337),[#176166370](https://www.pivotaltracker.com/story/show/176166370)] Convert BPD activation status to pot, prevent cashback logo flickering on Android  ([#2639](https://github.com/pagopa/io-app/issues/2639)) ([214f241](https://github.com/pagopa/io-app/commit/214f241851674d762a6c63e1a9a7ff9db06ab965))
* **Bonus Pagamenti Digitali:** [[#176269102](https://www.pivotaltracker.com/story/show/176269102)] Add information about the money transfer date ([#2643](https://github.com/pagopa/io-app/issues/2643)) ([06b8bd1](https://github.com/pagopa/io-app/commit/06b8bd11fae6e0ca947154cc54cc97688a6cfe20))
* **Bonus Pagamenti Digitali:** [[#176269197](https://www.pivotaltracker.com/story/show/176269197)] Add display / edit IBAN component to BpdClosedPeriod ([#2642](https://github.com/pagopa/io-app/issues/2642)) ([cc51577](https://github.com/pagopa/io-app/commit/cc515778ac43c4db4519ef33db2c937bf7fa3caf))
* **Bonus Pagamenti Digitali:** [[#176272983](https://www.pivotaltracker.com/story/show/176272983)] Ranking not ready component & bottomsheet ([#2641](https://github.com/pagopa/io-app/issues/2641)) ([afcb441](https://github.com/pagopa/io-app/commit/afcb44134730c6ef29d56a9c34a8a33a227676e2))
* **Bonus Pagamenti Digitali:** [[#176291611](https://www.pivotaltracker.com/story/show/176291611),[#176060226](https://www.pivotaltracker.com/story/show/176060226)] Bpd update data async action & common error handling ([#2651](https://github.com/pagopa/io-app/issues/2651)) ([f75a91c](https://github.com/pagopa/io-app/commit/f75a91c6b4536b88233bdd575b6ac521d3b228a2))
* **Bonus Pagamenti Digitali:** [[#176291649](https://www.pivotaltracker.com/story/show/176291649)] Track ranking api on Mixpanel ([#2655](https://github.com/pagopa/io-app/issues/2655)) ([b7b54c2](https://github.com/pagopa/io-app/commit/b7b54c2fc6e8b6f5e8c881822cc8d2d1018c9577))
* **Bonus Pagamenti Digitali:** [[#176301834](https://www.pivotaltracker.com/story/show/176301834)] Update grace period text ([#2656](https://github.com/pagopa/io-app/issues/2656)) ([04b041e](https://github.com/pagopa/io-app/commit/04b041ee0c6cd132e57f3197d729b20832f6fb52))
* **Bonus Pagamenti Digitali:** [[#176307536](https://www.pivotaltracker.com/story/show/176307536)] Disable update from BpdDetails [#2658](https://github.com/pagopa/io-app/issues/2658) ([c162cfd](https://github.com/pagopa/io-app/commit/c162cfd5a72676d222225755aeeb99170662464a))
* **Bonus Pagamenti Digitali:** [[#176307944](https://www.pivotaltracker.com/story/show/176307944)] Open IBAN insertion from message CTA ([#2660](https://github.com/pagopa/io-app/issues/2660)) ([7dc087e](https://github.com/pagopa/io-app/commit/7dc087e3777bd3968d422e3f30c4a1d1644a1502))
* **Bonus Vacanze:** [[#176257892](https://www.pivotaltracker.com/story/show/176257892)] Stop bonus vacanze ([#2650](https://github.com/pagopa/io-app/issues/2650)) ([6b18426](https://github.com/pagopa/io-app/commit/6b18426db93ca50f8e9940c0c6a683aac2124c19))


### Bug Fixes

* [[#176068510](https://www.pivotaltracker.com/story/show/176068510)] Removed status message in edit email screen ([#2647](https://github.com/pagopa/io-app/issues/2647)) ([5cf5dff](https://github.com/pagopa/io-app/commit/5cf5dff1ff9a5a9f9e1f3c2e6c6a665c4fe7dc88))
* **Bonus Pagamenti Digitali:** [[#176143732](https://www.pivotaltracker.com/story/show/176143732)] refresh wallet information before start the bpd onboarding ([#2626](https://github.com/pagopa/io-app/issues/2626)) ([15c074d](https://github.com/pagopa/io-app/commit/15c074d72ccc8fca0b63a02cfcf77399597130db))
* **Bonus Pagamenti Digitali:** [[#176291435](https://www.pivotaltracker.com/story/show/176291435)] Glitch on BpdNotActivableInformation [#2648](https://github.com/pagopa/io-app/issues/2648) ([518bc47](https://github.com/pagopa/io-app/commit/518bc479ef2b90d192ea49bb5fa9b1c4c8c80d08))

## [1.16.0-rc.0](https://github.com/pagopa/io-app/compare/1.15.0-rc.7...1.16.0-rc.0) (2020-12-23)


### Features

* [[#176167278](https://www.pivotaltracker.com/story/show/176167278)] Show message when remove profile if some bonus is active ([#2597](https://github.com/pagopa/io-app/issues/2597)) ([9b4d556](https://github.com/pagopa/io-app/commit/9b4d556b6a51336ffc75f6575c0f96e28e18479b))
* [[#176225664](https://www.pivotaltracker.com/story/show/176225664)] PSP copy change ([#2619](https://github.com/pagopa/io-app/issues/2619)) ([8eea071](https://github.com/pagopa/io-app/commit/8eea07102152bcb5a407b8a62ca344fce3d83c01))
* **Bonus Pagamenti Digitali:** [[#176143533](https://www.pivotaltracker.com/story/show/176143533)] Add info allowed method card detail ([#2606](https://github.com/pagopa/io-app/issues/2606)) ([6b19867](https://github.com/pagopa/io-app/commit/6b19867b01a16cbfe4cdfdd5bb4ec16b07deb7f8))
* **Bonus Pagamenti Digitali:** [[#176191325](https://www.pivotaltracker.com/story/show/176191325)] Store, reducer and networking placeholder for ranking ([#2620](https://github.com/pagopa/io-app/issues/2620)) ([0e73189](https://github.com/pagopa/io-app/commit/0e7318988cde02e2bfa971449dc0a227ce2d9804))
* **Bonus Pagamenti Digitali:** [[#176220886](https://www.pivotaltracker.com/story/show/176220886)] Cashback ranking remote activation ([#2627](https://github.com/pagopa/io-app/issues/2627)) ([c13166f](https://github.com/pagopa/io-app/commit/c13166f5e709ffc19cb5d207f53d97ad4e3eafa4))


### Bug Fixes

* [[#175949490](https://www.pivotaltracker.com/story/show/175949490)] Request current PIN before letting the user change it ([#2599](https://github.com/pagopa/io-app/issues/2599)) ([7b01871](https://github.com/pagopa/io-app/commit/7b01871587ee6561e8ace6d230f868861fb47043))
* **Bonus Pagamenti Digitali:** [[#175923444](https://www.pivotaltracker.com/story/show/175923444)] Bottom sheet should be closed on hardware back button press ([#2614](https://github.com/pagopa/io-app/issues/2614)) ([d3b11ca](https://github.com/pagopa/io-app/commit/d3b11ca022bcf3f1f9c15db60aa40812bca72295))


### Chores

* **deps:** bump ini from 1.3.5 to 1.3.8 ([#2594](https://github.com/pagopa/io-app/issues/2594)) ([e257e19](https://github.com/pagopa/io-app/commit/e257e19fa7fe9541dc46253298ef9a0828aa42ae))

## [1.15.0-rc.7](https://github.com/pagopa/io-app/compare/1.15.0-rc.6...1.15.0-rc.7) (2020-12-18)


### Features

* **Bonus Pagamenti Digitali:** [[#175883186](https://www.pivotaltracker.com/story/show/175883186)] Add remote contextual help to satispay screen ([#2609](https://github.com/pagopa/io-app/issues/2609)) ([37121aa](https://github.com/pagopa/io-app/commit/37121aaf2e51319d496e5009b5fdcd11c53254f2))
* [[#175953265](https://www.pivotaltracker.com/story/show/175953265)] Add bonus description ([#2497](https://github.com/pagopa/io-app/issues/2497)) ([f3bd818](https://github.com/pagopa/io-app/commit/f3bd818d6b08553fb06c7e05417ca4c17e6614d1))


### Chores

* **Bonus Pagamenti Digitali:** [[#176203167](https://www.pivotaltracker.com/story/show/176203167)] Satispay screens graphical refinements ([#2611](https://github.com/pagopa/io-app/issues/2611)) ([ebd0735](https://github.com/pagopa/io-app/commit/ebd0735fd326ec261b9cc390b662b6248e79f513))
* [[#176190732](https://www.pivotaltracker.com/story/show/176190732)] Allow Mixpanel to send push notification ([#2615](https://github.com/pagopa/io-app/issues/2615)) ([5aa4c3a](https://github.com/pagopa/io-app/commit/5aa4c3a82526d7e1d10a87fef014f4cdc61889d2))

## [1.15.0-rc.6](https://github.com/pagopa/io-app/compare/1.15.0-rc.5...1.15.0-rc.6) (2020-12-16)


### Features

* **Bonus Pagamenti Digitali:** [[#175883850](https://www.pivotaltracker.com/story/show/175883850),[#176166431](https://www.pivotaltracker.com/story/show/176166431),[#175883914](https://www.pivotaltracker.com/story/show/175883914),[#175883928](https://www.pivotaltracker.com/story/show/175883928)] Activate digital payments & add satispay screens ([#2601](https://github.com/pagopa/io-app/issues/2601)) ([5b66a1b](https://github.com/pagopa/io-app/commit/5b66a1bcff5aa7a8b250c1cc5849451fa9c7337a))


### Bug Fixes

* [[#176166635](https://www.pivotaltracker.com/story/show/176166635)] removes border from the paid badge [#2604](https://github.com/pagopa/io-app/issues/2604) ([fc3078d](https://github.com/pagopa/io-app/commit/fc3078daff88aee46c1bafff90e6b6a3528bfbe6))

## [1.15.0-rc.5](https://github.com/pagopa/io-app/compare/1.15.0-rc.4...1.15.0-rc.5) (2020-12-15)


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176129361](https://www.pivotaltracker.com/story/show/176129361)] Cashback payment method. Change footer buttons logic ([#2592](https://github.com/pagopa/io-app/issues/2592)) ([187fa70](https://github.com/pagopa/io-app/commit/187fa704f691b1f7d51f8a018e7f51c35e95848c))


### Chores

* **Bonus Pagamenti Digitali:** [[#176175954](https://www.pivotaltracker.com/story/show/176175954)] Missing transaction copy update ([#2600](https://github.com/pagopa/io-app/issues/2600)) ([cd57293](https://github.com/pagopa/io-app/commit/cd5729386405659cf84691a7ebf42272c1f4323a))

## [1.15.0-rc.4](https://github.com/pagopa/io-app/compare/1.15.0-rc.3...1.15.0-rc.4) (2020-12-15)


### Features

* **Bonus Pagamenti Digitali:** [[#175973060](https://www.pivotaltracker.com/story/show/175973060)] Change networking logic for bpd periods & amounts retrieval ([#2590](https://github.com/pagopa/io-app/issues/2590)) ([ebe4a02](https://github.com/pagopa/io-app/commit/ebe4a023750d3b1c3bfb0996a27e711c7ce54da8))

## [1.15.0-rc.3](https://github.com/pagopa/io-app/compare/1.15.0-rc.2...1.15.0-rc.3) (2020-12-15)


### Bug Fixes

* [[#176038688](https://www.pivotaltracker.com/story/show/176038688)] Fixed en locale typo [#2595](https://github.com/pagopa/io-app/issues/2595) ([a6bb953](https://github.com/pagopa/io-app/commit/a6bb9535f09362cd1106a9e6f7c1caf4e466f0c6))
* [[#176173361](https://www.pivotaltracker.com/story/show/176173361)] Wallets store doesn't use persist transform ([#2598](https://github.com/pagopa/io-app/issues/2598)) ([898feca](https://github.com/pagopa/io-app/commit/898fecac71d026de7b9125ffd3b665ecdc2addd4))

## [1.15.0-rc.2](https://github.com/pagopa/io-app/compare/1.15.0-rc.1...1.15.0-rc.2) (2020-12-15)


### Features

* **Bonus Pagamenti Digitali:** [[#175883179](https://www.pivotaltracker.com/story/show/175883179)] track satispay actions ([#2582](https://github.com/pagopa/io-app/issues/2582)) ([3646d4c](https://github.com/pagopa/io-app/commit/3646d4c718413d50ec71b763c353fe550c45e0d1))
* [[#173248858](https://www.pivotaltracker.com/story/show/173248858)] "Update IO" CTA web URL fallback added + fixed component method  ([#2491](https://github.com/pagopa/io-app/issues/2491)) ([99a9209](https://github.com/pagopa/io-app/commit/99a920919cb337363fb55121b7ff020a57c32d95))
* **Bonus Pagamenti Digitali:** [[#175898796](https://www.pivotaltracker.com/story/show/175898796)] Fixed IBAN insertion field font [#2588](https://github.com/pagopa/io-app/issues/2588) ([5ec0c94](https://github.com/pagopa/io-app/commit/5ec0c940c807dbc47cdfcecb89d62b18532afd82))
* **Bonus Pagamenti Digitali:** [[#176071117](https://www.pivotaltracker.com/story/show/176071117)] Refactor Bancomat analytics ([#2572](https://github.com/pagopa/io-app/issues/2572)) ([51d0cf6](https://github.com/pagopa/io-app/commit/51d0cf634d9d0d3cb35e33201ae0ed0d5fef289e))
* **Bonus Pagamenti Digitali:** [[#176091990](https://www.pivotaltracker.com/story/show/176091990)] Improve credit card error screen UI ([#2573](https://github.com/pagopa/io-app/issues/2573)) ([a1039b7](https://github.com/pagopa/io-app/commit/a1039b76e062a3fda4b55c82a9b198639ef5ce44))
* **Bonus Pagamenti Digitali:** [[#176092936](https://www.pivotaltracker.com/story/show/176092936)] Handles blocked bancomat items ([#2556](https://github.com/pagopa/io-app/issues/2556)) ([52da6c7](https://github.com/pagopa/io-app/commit/52da6c78f5ae01fe9f8cfc8009d8fba6580ded8b))
* **Bonus Pagamenti Digitali:** [[#176093031](https://www.pivotaltracker.com/story/show/176093031)] Setup Mixpanel push notification ([#2555](https://github.com/pagopa/io-app/issues/2555)) ([0cff182](https://github.com/pagopa/io-app/commit/0cff18243111ae496a808a55091c7ccbe83b7311))
* **Bonus Pagamenti Digitali:** [[#176094126](https://www.pivotaltracker.com/story/show/176094126),[#175991428](https://www.pivotaltracker.com/story/show/175991428)] Adds more info when missing transactions ([#2570](https://github.com/pagopa/io-app/issues/2570)) ([0977ab6](https://github.com/pagopa/io-app/commit/0977ab697d157dd6524daa99c5da00f4dd708d67))


### Bug Fixes

* [[#175822523](https://www.pivotaltracker.com/story/show/175822523)] Fix time format in MessageListItem ([#2431](https://github.com/pagopa/io-app/issues/2431)) ([0e90930](https://github.com/pagopa/io-app/commit/0e90930366f4165b9284625807d667e41c34d3ef))
* **Bonus Pagamenti Digitali:** [[#175990175](https://www.pivotaltracker.com/story/show/175990175)] fix double click on bancomat search ([#2585](https://github.com/pagopa/io-app/issues/2585)) ([87ed7f1](https://github.com/pagopa/io-app/commit/87ed7f138c83bcb7284b5168c4e1f48b7cf5f95c))
* **Bonus Pagamenti Digitali:** [[#176117520](https://www.pivotaltracker.com/story/show/176117520)] Restore service banner on Bancomat screens ([#2568](https://github.com/pagopa/io-app/issues/2568)) ([66edf3f](https://github.com/pagopa/io-app/commit/66edf3f97703683282913145fd6facd0c4df14ea))
* **Bonus Pagamenti Digitali:** [[#176137613](https://www.pivotaltracker.com/story/show/176137613)] Warning banner shows a wrong icon ([#2578](https://github.com/pagopa/io-app/issues/2578)) ([e407fa0](https://github.com/pagopa/io-app/commit/e407fa05923a30f81cfef977705d2bae6b382d33))


### Chores

* **Bonus Pagamenti Digitali:** [[#176078094](https://www.pivotaltracker.com/story/show/176078094)] Added supported credit cards page link ([#2548](https://github.com/pagopa/io-app/issues/2548)) ([70d1ca6](https://github.com/pagopa/io-app/commit/70d1ca69b8b9d7d6c19e639902a96c96864d258e))
* **Bonus Pagamenti Digitali:** [[#176095635](https://www.pivotaltracker.com/story/show/176095635)] Changed color to the amount of cashback received ([#2571](https://github.com/pagopa/io-app/issues/2571)) ([6e08b1e](https://github.com/pagopa/io-app/commit/6e08b1ed473f65ba8aaf9d1c54dfb13b4fcf5d9c))
* **Bonus Pagamenti Digitali:** [[#176114319](https://www.pivotaltracker.com/story/show/176114319)] Backoff retry on credit card insertion ([#2562](https://github.com/pagopa/io-app/issues/2562)) ([b469b63](https://github.com/pagopa/io-app/commit/b469b632f48634ff618161008fe46fa2a56b7208))
* **Bonus Pagamenti Digitali:** [[#176148630](https://www.pivotaltracker.com/story/show/176148630)] Add tests on SectionStatusComponent ([#2586](https://github.com/pagopa/io-app/issues/2586)) ([dcea2fd](https://github.com/pagopa/io-app/commit/dcea2fd16ea0cee980b031ec09e64428aa3acd00))

## [1.15.0-rc.1](https://github.com/pagopa/io-app/compare/1.15.0-rc.0...1.15.0-rc.1) (2020-12-10)


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175892077](https://www.pivotaltracker.com/story/show/175892077)] Fix safearea on trx button and scroll no transactions ([#2550](https://github.com/pagopa/io-app/issues/2550)) ([fa829f8](https://github.com/pagopa/io-app/commit/fa829f83697aa5b4bfbfc520827eb0f04d80ee68))


### Chores

* **Bonus Pagamenti Digitali:** [[#176039881](https://www.pivotaltracker.com/story/show/176039881)] upgrade bancomat research screen ([#2551](https://github.com/pagopa/io-app/issues/2551)) ([82192ee](https://github.com/pagopa/io-app/commit/82192ee200144ee7987fa312e42fe938d8dfa2c6))

## [1.15.0-rc.0](https://github.com/pagopa/io-app/compare/1.14.0-rc.1...1.15.0-rc.0) (2020-12-10)


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175991400](https://www.pivotaltracker.com/story/show/175991400)] Fixes overflow text on bottomsheet title ([#2552](https://github.com/pagopa/io-app/issues/2552)) ([49a0c7d](https://github.com/pagopa/io-app/commit/49a0c7d5b0443dd6081f3f9ee83abc11f9c21dce))
* **Bonus Pagamenti Digitali:** [[#176091299](https://www.pivotaltracker.com/story/show/176091299)] Resize bancomat confirmation bottomsheet ([#2553](https://github.com/pagopa/io-app/issues/2553)) ([51092a7](https://github.com/pagopa/io-app/commit/51092a7c17468c2fb64d71b57908c0615e271882))

## [1.14.0-rc.1](https://github.com/pagopa/io-app/compare/1.14.0-rc.0...1.14.0-rc.1) (2020-12-09)


### Features

* **Bonus Pagamenti Digitali:** [[#175165668](https://www.pivotaltracker.com/story/show/175165668),[#175165677](https://www.pivotaltracker.com/story/show/175165677)] IBAN code is now Monospace Bold and selectable on KO screens ([#2542](https://github.com/pagopa/io-app/issues/2542)) ([76e0dbf](https://github.com/pagopa/io-app/commit/76e0dbf2e9d782a5c8d689087a4950fe641c7fd8))
* **Bonus Pagamenti Digitali:** [[#176071266](https://www.pivotaltracker.com/story/show/176071266)] Dispatch action instead of calling saga for fetchTransactions and fetchWallets ([#2538](https://github.com/pagopa/io-app/issues/2538)) ([47b7f1f](https://github.com/pagopa/io-app/commit/47b7f1f2190a55318657e4af5f3b143c0e88d360))
* [[#176071893](https://www.pivotaltracker.com/story/show/176071893)] Make report attachments configurable [#2537](https://github.com/pagopa/io-app/issues/2537) ([d60b0f2](https://github.com/pagopa/io-app/commit/d60b0f2354c8438520ff091a9a58136882cc5b55))
* **Bonus Pagamenti Digitali:** [[#176074721](https://www.pivotaltracker.com/story/show/176074721)] Add payment method status badge ([#2543](https://github.com/pagopa/io-app/issues/2543)) ([de45d79](https://github.com/pagopa/io-app/commit/de45d79560ce8b9d41338d2ffdd2dcdaeee2ccd3))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175896616](https://www.pivotaltracker.com/story/show/175896616)] Fixes scrollview snap on android ([#2541](https://github.com/pagopa/io-app/issues/2541)) ([2fe78cc](https://github.com/pagopa/io-app/commit/2fe78ccb07328855634c99ed7f0affce14584bd6))
* **Bonus Pagamenti Digitali:** [[#176076602](https://www.pivotaltracker.com/story/show/176076602)] Fixes cut text on add method bs ([#2544](https://github.com/pagopa/io-app/issues/2544)) ([12b0cd5](https://github.com/pagopa/io-app/commit/12b0cd5446d017e0c29fc89d835a6ccfbf9f1696))


### Chores

* **Bonus Pagamenti Digitali:** [[#176069568](https://www.pivotaltracker.com/story/show/176069568)] Why other cards? ([#2546](https://github.com/pagopa/io-app/issues/2546)) ([89f0bb9](https://github.com/pagopa/io-app/commit/89f0bb972406ce187cf3194eefa22042b34d0371))

## [1.14.0-rc.0](https://github.com/pagopa/io-app/compare/1.13.0-rc.1...1.14.0-rc.0) (2020-12-09)

## [1.13.0-rc.1](https://github.com/pagopa/io-app/compare/1.13.0-rc.0...1.13.0-rc.1) (2020-12-09)


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176068210](https://www.pivotaltracker.com/story/show/176068210)] Remove beta references ([#2535](https://github.com/pagopa/io-app/issues/2535)) ([1e4ffb4](https://github.com/pagopa/io-app/commit/1e4ffb4e80c4bc9b28d64fd9928db8273aaafb21))

## [1.13.0-rc.0](https://github.com/pagopa/io-app/compare/1.12.0-rc.1...1.13.0-rc.0) (2020-12-08)


### Features

* **Bonus Pagamenti Digitali:** [[#176050060](https://www.pivotaltracker.com/story/show/176050060)] Wallets home rework ([#2529](https://github.com/pagopa/io-app/issues/2529)) ([74df78d](https://github.com/pagopa/io-app/commit/74df78d1148e646463bd0835468530376e1b80ce))
* **Bonus Pagamenti Digitali:** [[#176052891](https://www.pivotaltracker.com/story/show/176052891)] Adds logic to persist loaded wallets ([#2525](https://github.com/pagopa/io-app/issues/2525)) ([675c1ee](https://github.com/pagopa/io-app/commit/675c1ee6670aee58f0e3f8e1c58bb669f07fa6c3))
* **Bonus Pagamenti Digitali:** [[#176053058](https://www.pivotaltracker.com/story/show/176053058)] Implements new Add button on wallet home screen ([#2528](https://github.com/pagopa/io-app/issues/2528)) ([c7d23b6](https://github.com/pagopa/io-app/commit/c7d23b6d8f03afae45b699588b54406a87e1a818))
* **Bonus Pagamenti Digitali:** [[#176053275](https://www.pivotaltracker.com/story/show/176053275)] BPDDetailScreen ([#2527](https://github.com/pagopa/io-app/issues/2527)) ([e9eb0cb](https://github.com/pagopa/io-app/commit/e9eb0cb0666d1ee8c2b3b5c80e4dbd720fa36b61))
* **Bonus Pagamenti Digitali:** [[#176058079](https://www.pivotaltracker.com/story/show/176058079)] support backoff retry ([#2530](https://github.com/pagopa/io-app/issues/2530)) ([9a16896](https://github.com/pagopa/io-app/commit/9a16896c28ba3f3a013bc5dcddf23de1371d856c))
* **Bonus Pagamenti Digitali:** [[#176058971](https://www.pivotaltracker.com/story/show/176058971)] Update ErrorPaymentMethodsScreen ([#2532](https://github.com/pagopa/io-app/issues/2532)) ([e213fb4](https://github.com/pagopa/io-app/commit/e213fb4a951d57cd37cf7931ae73441df88956c3))
* **Bonus Pagamenti Digitali:** [[#176059090](https://www.pivotaltracker.com/story/show/176059090)] Adds SectionStatusComponent to email and bpd details screen ([#2531](https://github.com/pagopa/io-app/issues/2531)) ([24ff8c2](https://github.com/pagopa/io-app/commit/24ff8c22edfc82486fca72c629a950a1c7532141))

## [1.12.0-rc.1](https://github.com/pagopa/io-app/compare/1.12.0-rc.0...1.12.0-rc.1) (2020-12-07)


### Features

* [[#176015857](https://www.pivotaltracker.com/story/show/176015857)] Adds FAQ on AddCardScreen and AddMethodScreen ([#2507](https://github.com/pagopa/io-app/issues/2507)) ([a223a8b](https://github.com/pagopa/io-app/commit/a223a8b34c21cc1fe936499462f3a894fa8b6bb1))
* [[#176032092](https://www.pivotaltracker.com/story/show/176032092)] Change codecov settings [#2506](https://github.com/pagopa/io-app/issues/2506) ([94fcd68](https://github.com/pagopa/io-app/commit/94fcd68d4942529e352967d2f1d457a2035a9c78))
* **Bonus Pagamenti Digitali:** [[#175044623](https://www.pivotaltracker.com/story/show/175044623)] add contextual help onboarding bancomat ([#2518](https://github.com/pagopa/io-app/issues/2518)) ([a87c073](https://github.com/pagopa/io-app/commit/a87c073f29e2698f7f476d76160fde2cd8399f27))
* **Bonus Pagamenti Digitali:** [[#176014374](https://www.pivotaltracker.com/story/show/176014374)] Show section banner status ([#2513](https://github.com/pagopa/io-app/issues/2513)) ([16c599d](https://github.com/pagopa/io-app/commit/16c599d4d4374296b7107988229c03607e1b9a12))
* **Bonus Pagamenti Digitali:** [[#176027175](https://www.pivotaltracker.com/story/show/176027175)] Adds client for ABI list to static contents ([#2508](https://github.com/pagopa/io-app/issues/2508)) ([75bb74e](https://github.com/pagopa/io-app/commit/75bb74eaaf0f54d02d648ee998271612978cb932))
* **Bonus Pagamenti Digitali:** [[#176031992](https://www.pivotaltracker.com/story/show/176031992)] Handle wallet failure in bpd detail screen  ([#2514](https://github.com/pagopa/io-app/issues/2514)) ([15db0a4](https://github.com/pagopa/io-app/commit/15db0a49cb10ec7574d11216be91fed799084088))
* **Bonus Pagamenti Digitali:** [[#176033170](https://www.pivotaltracker.com/story/show/176033170)] Show BPDCard if wallets has error ([#2512](https://github.com/pagopa/io-app/issues/2512)) ([6c4e594](https://github.com/pagopa/io-app/commit/6c4e5949c728e5eca94818885db85f41ba1ce797))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175717738](https://www.pivotaltracker.com/story/show/175717738)] Fix android goback button on BPD Cashback ([#2489](https://github.com/pagopa/io-app/issues/2489)) ([3bf7b21](https://github.com/pagopa/io-app/commit/3bf7b21876430ebbc13205569c36ccec9177a241))
* **Bonus Pagamenti Digitali:** [[#176007328](https://www.pivotaltracker.com/story/show/176007328)] Overflow of payment method representation component (used in bpd toggle) ([#2493](https://github.com/pagopa/io-app/issues/2493)) ([d4416fd](https://github.com/pagopa/io-app/commit/d4416fdc7eabdcc93995d28c9e83ca3f4dbffb0a))
* **Bonus Pagamenti Digitali:** [[#176027161](https://www.pivotaltracker.com/story/show/176027161)] When a link inside a contextual help is pressed, the modal is not automatically closed  ([#2516](https://github.com/pagopa/io-app/issues/2516)) ([064ac0d](https://github.com/pagopa/io-app/commit/064ac0d20173aad4fcd0c3d2e0ef79a9a37a107f))
* **Bonus Pagamenti Digitali:** [[#176027176](https://www.pivotaltracker.com/story/show/176027176)] Corrected bancomat string fallback ([#2517](https://github.com/pagopa/io-app/issues/2517)) ([1393b32](https://github.com/pagopa/io-app/commit/1393b322129e15f5d80bc57fc1d1de76a3922371))
* **Bonus Pagamenti Digitali:** [[#176033245](https://www.pivotaltracker.com/story/show/176033245)] Android duplicate IBAN insertion ([#2511](https://github.com/pagopa/io-app/issues/2511)) ([2910846](https://github.com/pagopa/io-app/commit/29108464b23414b40e971d6c04ae422a6ddff274))

## [1.12.0-rc.0](https://github.com/pagopa/io-app/compare/1.11.0-rc.2...1.12.0-rc.0) (2020-12-07)


### Features

* **Bonus pagamenti digitali:** Typo in self-declaration screen ([#2503](https://github.com/pagopa/io-app/issues/2503)) ([f4ce213](https://github.com/pagopa/io-app/commit/f4ce2138ed173523b4c60651cc5584bd680a0794))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#176007673](https://www.pivotaltracker.com/story/show/176007673)] Update index.yml ([#2492](https://github.com/pagopa/io-app/issues/2492)) ([a43a3fb](https://github.com/pagopa/io-app/commit/a43a3fb5c37085ad1bd27d604da095493f88f608))


### Chores

* **Bonus Pagamenti Digitali:** [[#176015967](https://www.pivotaltracker.com/story/show/176015967)] Wallet Contextual Help Text Update [#2496](https://github.com/pagopa/io-app/issues/2496) ([5fbb36b](https://github.com/pagopa/io-app/commit/5fbb36bd64af1998da2fb708b0a872c7cf6e1dfd))

## [1.11.0-rc.2](https://github.com/pagopa/io-app/compare/1.11.0-rc.1...1.11.0-rc.2) (2020-12-03)


### Features

* **Bonus pagamenti digitali:** Valid transactions text update ([#2487](https://github.com/pagopa/io-app/issues/2487)) ([9594272](https://github.com/pagopa/io-app/commit/9594272f716871f4e84424bbe2d083b7721fc070))
* **Bonus Pagamenti Digitali:** [[#175777655](https://www.pivotaltracker.com/story/show/175777655)] Display bank fallback if logo is not available in bancomat card ([#2488](https://github.com/pagopa/io-app/issues/2488)) ([70eedd7](https://github.com/pagopa/io-app/commit/70eedd7e30ae91e5ebad2bbe422afdc5b9355a23))


### Chores

* **Bonus Pagamenti Digitali:** [[#175991108](https://www.pivotaltracker.com/story/show/175991108)] Copy updates [#2486](https://github.com/pagopa/io-app/issues/2486) ([cdb8f43](https://github.com/pagopa/io-app/commit/cdb8f43db09fde32d59abe8a1a3b093fe6cc27c5))

## [1.11.0-rc.1](https://github.com/pagopa/io-app/compare/1.11.0-rc.0...1.11.0-rc.1) (2020-12-03)


### Features

* [[#175375298](https://www.pivotaltracker.com/story/show/175375298)] Add choice to send support token on Instabug reporting ([#2461](https://github.com/pagopa/io-app/issues/2461)) ([dce7980](https://github.com/pagopa/io-app/commit/dce7980f7bf5b8b2a8c9aa9fba08b8f8e5a40325))
* **Bonus pagamenti digitali:** [[#175975866](https://www.pivotaltracker.com/story/show/175975866)] BPD copy updates ([#2482](https://github.com/pagopa/io-app/issues/2482)) ([8a0a2d8](https://github.com/pagopa/io-app/commit/8a0a2d8c85a198a60e32be49cefb8e0acecda3ec))
* **Bonus Pagamenti Digitali:** [[#175044647](https://www.pivotaltracker.com/story/show/175044647),[#175044584](https://www.pivotaltracker.com/story/show/175044584),[#175044536](https://www.pivotaltracker.com/story/show/175044536),[#175311259](https://www.pivotaltracker.com/story/show/175311259)] Add Contextual help to cashback screens ([#2473](https://github.com/pagopa/io-app/issues/2473)) ([cc05a59](https://github.com/pagopa/io-app/commit/cc05a597585e0bc5750512f1525d684e2c6b5b0e))
* **Bonus Pagamenti Digitali:** [[#175164698](https://www.pivotaltracker.com/story/show/175164698)] Display bancomat bottomsheet after adding a new bancomat ([#2466](https://github.com/pagopa/io-app/issues/2466)) ([e9fa29d](https://github.com/pagopa/io-app/commit/e9fa29d17a8564f581ebc21e46202314f62ed50f))
* **Bonus Pagamenti Digitali:** [[#175909052](https://www.pivotaltracker.com/story/show/175909052)] Display only internal payment methods ([#2471](https://github.com/pagopa/io-app/issues/2471)) ([e5eb533](https://github.com/pagopa/io-app/commit/e5eb533701f8d65a547760b31ddde636454192c2))
* **Bonus Pagamenti Digitali:** [[#175931579](https://www.pivotaltracker.com/story/show/175931579)] digital payment is incoming ([#2457](https://github.com/pagopa/io-app/issues/2457)) ([238e3a3](https://github.com/pagopa/io-app/commit/238e3a3ea20ed0614b1fd23bfc7dc49a3e7b3374))
* **Bonus Pagamenti Digitali:** [[#175971953](https://www.pivotaltracker.com/story/show/175971953)] No retries and increased timeout for PM requests ([#2484](https://github.com/pagopa/io-app/issues/2484)) ([ffce56d](https://github.com/pagopa/io-app/commit/ffce56d4b6c3b338f2d6e428edbf63f1ad3fc968))
* **Bonus Pagamenti Digitali:** [[#175989320](https://www.pivotaltracker.com/story/show/175989320)] enable BPD ([#2485](https://github.com/pagopa/io-app/issues/2485)) ([490e2d3](https://github.com/pagopa/io-app/commit/490e2d37b7678825d7ae681df97606736460ef8a))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175765023](https://www.pivotaltracker.com/story/show/175765023)] Fixes on Add Bancomat Screen ([#2449](https://github.com/pagopa/io-app/issues/2449)) ([0d56ddf](https://github.com/pagopa/io-app/commit/0d56ddf4f456ff97e9cb94109e217f0da6e47868))
* **Bonus Pagamenti Digitali:** [[#175931000](https://www.pivotaltracker.com/story/show/175931000)] Convert date formatting with i18n ([#2467](https://github.com/pagopa/io-app/issues/2467)) ([724aa8a](https://github.com/pagopa/io-app/commit/724aa8a0def4866fcc6be870336c91980a487483))
* **Bonus Pagamenti Digitali:** [[#175973388](https://www.pivotaltracker.com/story/show/175973388)] Fixes BPD card spaces ([#2480](https://github.com/pagopa/io-app/issues/2480)) ([10ce988](https://github.com/pagopa/io-app/commit/10ce98888c6d4f947db538f9d73bd24bed2e342c))


### Chores

* **Bonus Pagamenti Digitali:** [[#175963022](https://www.pivotaltracker.com/story/show/175963022)] Minor networking improvement ([#2476](https://github.com/pagopa/io-app/issues/2476)) ([12b4333](https://github.com/pagopa/io-app/commit/12b433313cd83ad41d3b7f890aa2110171308cab))

## [1.11.0-rc.0](https://github.com/pagopa/io-app/compare/1.10.0-rc.5...1.11.0-rc.0) (2020-12-02)


### Features

* **Bonus Pagamenti Digitali:** [[#175883778](https://www.pivotaltracker.com/story/show/175883778),[#175883201](https://www.pivotaltracker.com/story/show/175883201),[#175883970](https://www.pivotaltracker.com/story/show/175883970)] Onboard Satispay account orchestration ([#2444](https://github.com/pagopa/io-app/issues/2444)) ([48b6d91](https://github.com/pagopa/io-app/commit/48b6d915aa397435438fbaa713602ec6ab8388f9))
* **Bonus Pagamenti Digitali:** [[#175919231](https://www.pivotaltracker.com/story/show/175919231)] Update self declaration screen ([#2464](https://github.com/pagopa/io-app/issues/2464)) ([ea7218e](https://github.com/pagopa/io-app/commit/ea7218e99a37f2e4e5c2d51ca2a325fcfffd0cce))
* **Bonus Pagamenti Digitali:** [[#175932765](https://www.pivotaltracker.com/story/show/175932765)] Start cashback from CTA ([#2465](https://github.com/pagopa/io-app/issues/2465)) ([4865bb1](https://github.com/pagopa/io-app/commit/4865bb1fb06bd077a8e24271f4c889de49ea649e))
* **Bonus Pagamenti Digitali:** [[#175949561](https://www.pivotaltracker.com/story/show/175949561)] Display cashback future periods ("Inactive") in wallet ([#2470](https://github.com/pagopa/io-app/issues/2470)) ([08e1e9d](https://github.com/pagopa/io-app/commit/08e1e9d044bdb0ccc40a3cd23970442e8bc0e9b0))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175923455](https://www.pivotaltracker.com/story/show/175923455)] Fixes copy button press on android [#2469](https://github.com/pagopa/io-app/issues/2469) ([9b73c1f](https://github.com/pagopa/io-app/commit/9b73c1f13e4932bbf7f8cee0610ba6ec50722e1e))
* **Bonus Pagamenti Digitali:** [[#175934342](https://www.pivotaltracker.com/story/show/175934342)] Onboarding credit card failure instead of success [#2459](https://github.com/pagopa/io-app/issues/2459) ([6ca2db2](https://github.com/pagopa/io-app/commit/6ca2db29b01d805839b4e94d608bbb4368fd86c2))
* [[#173745888](https://www.pivotaltracker.com/story/show/173745888)] Ingress screen contextual help [#2478](https://github.com/pagopa/io-app/issues/2478) ([f53125e](https://github.com/pagopa/io-app/commit/f53125e045a117928c31efb99180dabf3672e5ec))
* [[#175848198](https://www.pivotaltracker.com/story/show/175848198),[#175641468](https://www.pivotaltracker.com/story/show/175641468)] Fixed: overlapping label when message is too long, label text not being centered in its wrapper ([#2475](https://github.com/pagopa/io-app/issues/2475)) ([676bd90](https://github.com/pagopa/io-app/commit/676bd9006b0278f32f390a0102eb8df7c0f9552a))
* **Bonus Pagamenti Digitali:** [[#175953061](https://www.pivotaltracker.com/story/show/175953061)] Fix overflow in transaction item ([#2477](https://github.com/pagopa/io-app/issues/2477)) ([8f19134](https://github.com/pagopa/io-app/commit/8f19134dc401a18336d4c9bd1a2a182962df38a6))


### Chores

* **Bonus Pagamenti Digitali:** [[#175953788](https://www.pivotaltracker.com/story/show/175953788)] General FAQ update [#2472](https://github.com/pagopa/io-app/issues/2472) ([e7d4289](https://github.com/pagopa/io-app/commit/e7d42894539c1e581050c920a059b864ae0dfdc0))
* [[#175855068](https://www.pivotaltracker.com/story/show/175855068)] Mixpanel user id reconciliation ([#2439](https://github.com/pagopa/io-app/issues/2439)) ([0d51036](https://github.com/pagopa/io-app/commit/0d51036cd38bb1aad50b8af0d6ccc84871b2cd77))
* [[#175948985](https://www.pivotaltracker.com/story/show/175948985)] Update bpd copy [#2474](https://github.com/pagopa/io-app/issues/2474) ([b17767f](https://github.com/pagopa/io-app/commit/b17767f40a9c4b0d68a69036fd2e7a283c1c82ab))

## [1.10.0-rc.5](https://github.com/pagopa/io-app/compare/1.10.0-rc.4...1.10.0-rc.5) (2020-11-30)


### Features

* **Bonus Pagamenti Digitali:** [[#175883276](https://www.pivotaltracker.com/story/show/175883276)] Adds the SatispayCard Wallet preview ([#2456](https://github.com/pagopa/io-app/issues/2456)) ([5892971](https://github.com/pagopa/io-app/commit/589297160d756b420e35528ad7d22f87fc225bea))
* **Bonus Pagamenti Digitali:** [[#175883374](https://www.pivotaltracker.com/story/show/175883374)] Satispay detail screen ([#2458](https://github.com/pagopa/io-app/issues/2458)) ([f888614](https://github.com/pagopa/io-app/commit/f888614fcf3c5839dfbadbf5fa015817c72ebfcb))
* **Bonus Pagamenti Digitali:** [[#175883764](https://www.pivotaltracker.com/story/show/175883764)] Satispay screens and navigation ([#2443](https://github.com/pagopa/io-app/issues/2443)) ([c095f94](https://github.com/pagopa/io-app/commit/c095f94abb7168ec3ba32ce682cc85d172dc4212))


### Bug Fixes

* [[#175877314](https://www.pivotaltracker.com/story/show/175877314)] An error occurred while opening external web url ([#2445](https://github.com/pagopa/io-app/issues/2445)) ([b87e4eb](https://github.com/pagopa/io-app/commit/b87e4ebdba03483b9ee1a5b3b0a64dc99266afe0))
* [[#175922873](https://www.pivotaltracker.com/story/show/175922873)] Birthday is wrong in FiscalCode screen ([#2453](https://github.com/pagopa/io-app/issues/2453)) ([d93b679](https://github.com/pagopa/io-app/commit/d93b679322a72774984e0230f37ad02eca262ce4))
* **Bonus Pagamenti Digitali:** [[#175938380](https://www.pivotaltracker.com/story/show/175938380)] restore bonus is incoming ([#2462](https://github.com/pagopa/io-app/issues/2462)) ([bebc071](https://github.com/pagopa/io-app/commit/bebc0710a497d40081e845729a159eaa4aa8a6ef))


### Chores

* **Payments:** [[#175845944](https://www.pivotaltracker.com/story/show/175845944)] Dispatch action to MixPanel on credit card addition failure [#2460](https://github.com/pagopa/io-app/issues/2460) ([3af4f1c](https://github.com/pagopa/io-app/commit/3af4f1c53eecbfde478cc1d8c230c2875c330bcd))

## [1.10.0-rc.4](https://github.com/pagopa/io-app/compare/1.10.0-rc.3...1.10.0-rc.4) (2020-11-29)


### Features

* **Bonus Pagamenti Digitali:** [[#175883088](https://www.pivotaltracker.com/story/show/175883088)] Adds page to select the digital method to add ([#2447](https://github.com/pagopa/io-app/issues/2447)) ([4f511da](https://github.com/pagopa/io-app/commit/4f511daff01e9faf1e0f5e4d472881a3c3acaee1))
* **Bonus Pagamenti Digitali:** [[#175923816](https://www.pivotaltracker.com/story/show/175923816)] Show that cashback is incoming ([#2454](https://github.com/pagopa/io-app/issues/2454)) ([bda7583](https://github.com/pagopa/io-app/commit/bda7583763939a3dd1bc497d435f4ab8a220f99f))
* **Bonus Pagamenti Digitali:** [[#175926004](https://www.pivotaltracker.com/story/show/175926004)] Show incoming payment methods ([#2455](https://github.com/pagopa/io-app/issues/2455)) ([6c775b2](https://github.com/pagopa/io-app/commit/6c775b273efa58ffe1e3d597c1443c5b48d7911f))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175922698](https://www.pivotaltracker.com/story/show/175922698)] On credit card insertion CTA is disabled ([#2451](https://github.com/pagopa/io-app/issues/2451)) ([4535941](https://github.com/pagopa/io-app/commit/4535941ff0873d4e3f22fff02bcb105f1a9dc8a8))
* **Bonus Pagamenti Digitali:** [[#175922831](https://www.pivotaltracker.com/story/show/175922831)] CTA text is wrong in bonus vacanze details screen [#2452](https://github.com/pagopa/io-app/issues/2452) ([f3917a3](https://github.com/pagopa/io-app/commit/f3917a322fbee528f7f0a1950c279c60badcd6a5))

## [1.10.0-rc.3](https://github.com/pagopa/io-app/compare/1.10.0-rc.2...1.10.0-rc.3) (2020-11-27)

## [1.10.0-rc.2](https://github.com/pagopa/io-app/compare/1.10.0-rc.1...1.10.0-rc.2) (2020-11-27)


### Features

* [[#175876595](https://www.pivotaltracker.com/story/show/175876595)] Adds alert when adding new method in bpd [#2434](https://github.com/pagopa/io-app/issues/2434) ([9e51f3a](https://github.com/pagopa/io-app/commit/9e51f3a54f64140366b5bcfb3011ff29c533fbf0))
* **Bonus Pagamenti Digitali:** [[#175796418](https://www.pivotaltracker.com/story/show/175796418)] Send support token within bug report ([#2409](https://github.com/pagopa/io-app/issues/2409)) ([ff4b0f6](https://github.com/pagopa/io-app/commit/ff4b0f6eec44d341c9f611bb0239b83fab7fa199))
* [[#175883641](https://www.pivotaltracker.com/story/show/175883641)] Support search Satispay API ([#2433](https://github.com/pagopa/io-app/issues/2433)) ([6758e5a](https://github.com/pagopa/io-app/commit/6758e5a1c98723c54ce104dc4e7805d830b39c44))
* **Bonus Pagamenti Digitali:** [[#175139165](https://www.pivotaltracker.com/story/show/175139165)] Declaration checkbox text is interactable ([#2427](https://github.com/pagopa/io-app/issues/2427)) ([71371ee](https://github.com/pagopa/io-app/commit/71371ee7033183af93c84b14ac72d2cec2eb1e07))
* **Bonus Pagamenti Digitali:** [[#175783832](https://www.pivotaltracker.com/story/show/175783832)] Alerts when BPD is already active ([#2420](https://github.com/pagopa/io-app/issues/2420)) ([bda6a45](https://github.com/pagopa/io-app/commit/bda6a45c6546daae559005748a245c958836daeb))
* **Bonus Pagamenti Digitali:** [[#175797662](https://www.pivotaltracker.com/story/show/175797662)] Display bancomat abi logo ([#2442](https://github.com/pagopa/io-app/issues/2442)) ([3f88d42](https://github.com/pagopa/io-app/commit/3f88d425091295cfb624831f9c30c1e219c2973a))
* **Bonus Pagamenti Digitali:** [[#175876762](https://www.pivotaltracker.com/story/show/175876762)] Prefill holder credit card form field ([#2437](https://github.com/pagopa/io-app/issues/2437)) ([6555f39](https://github.com/pagopa/io-app/commit/6555f3910fecba3c0ba64d250c64766f99c8655c))
* **Bonus Pagamenti Digitali:** [[#175876837](https://www.pivotaltracker.com/story/show/175876837)] Show disclaimer when activate bpd on a payment method ([#2440](https://github.com/pagopa/io-app/issues/2440)) ([601405c](https://github.com/pagopa/io-app/commit/601405c0506c206ab79fb06969b6ffa194f1808d))
* **Bonus Pagamenti Digitali:** [[#175883590](https://www.pivotaltracker.com/story/show/175883590)] Satispay and Bancomatpay selector ([#2429](https://github.com/pagopa/io-app/issues/2429)) ([1e22fb0](https://github.com/pagopa/io-app/commit/1e22fb0e75add62dc7475805411b1ab15f062415))
* **Bonus Pagamenti Digitali:** [[#175883670](https://www.pivotaltracker.com/story/show/175883670)] Support adding Satispay to wallet ([#2441](https://github.com/pagopa/io-app/issues/2441)) ([cb168f1](https://github.com/pagopa/io-app/commit/cb168f101370b22811003211a5356fd293a3c464))
* **Bonus Pagamenti Digitali:** [[#175883756](https://www.pivotaltracker.com/story/show/175883756)] Actions, store & reducer for Satispay onboarding ([#2436](https://github.com/pagopa/io-app/issues/2436)) ([20f7269](https://github.com/pagopa/io-app/commit/20f72694919ebe5ec6fe1466d91b03d05b1da646))
* **Bonus Pagamenti Digitali:** [[#175884177](https://www.pivotaltracker.com/story/show/175884177)] Adds BPay/Satispay card component ([#2438](https://github.com/pagopa/io-app/issues/2438)) ([ad27dcf](https://github.com/pagopa/io-app/commit/ad27dcf3ad120f632d88119ccb32d86537afdd79))


### Bug Fixes

* [[#174926807](https://www.pivotaltracker.com/story/show/174926807)] update Contextual Help home ([#2428](https://github.com/pagopa/io-app/issues/2428)) ([d4c1ff0](https://github.com/pagopa/io-app/commit/d4c1ff0216629c97e1fd6bcc0283c8c10f82885b))
* [[#175879918](https://www.pivotaltracker.com/story/show/175879918)] Add missing ca bancomat success code ([#2424](https://github.com/pagopa/io-app/issues/2424)) ([8268fb2](https://github.com/pagopa/io-app/commit/8268fb2aea035ffec90507828e5f43548d9f26b3))
* **Bonus Pagamenti Digitali:** [[#175697847](https://www.pivotaltracker.com/story/show/175697847)] Improve transaction details BS UI ([#2426](https://github.com/pagopa/io-app/issues/2426)) ([9c9e74c](https://github.com/pagopa/io-app/commit/9c9e74cd3e21574b6b24440735714846176e4c0f))
* **Bonus Pagamenti Digitali:** [[#175697866](https://www.pivotaltracker.com/story/show/175697866)] Shows an inline feedback to copy button ([#2425](https://github.com/pagopa/io-app/issues/2425)) ([b1a59e0](https://github.com/pagopa/io-app/commit/b1a59e0df50038344bd3cd281e790f3a30eaddb7))
* **Bonus Pagamenti Digitali:** [[#175717757](https://www.pivotaltracker.com/story/show/175717757),[#175876304](https://www.pivotaltracker.com/story/show/175876304)] Empty footer cuts screen content on BPD Detail ([#2423](https://github.com/pagopa/io-app/issues/2423)) ([09ed3f6](https://github.com/pagopa/io-app/commit/09ed3f6c04254473814dacb59313ac9b9e9aacfb))
* **Bonus Pagamenti Digitali:** [[#175897659](https://www.pivotaltracker.com/story/show/175897659)] Track the chosen abi [#2432](https://github.com/pagopa/io-app/issues/2432) ([0bd1dbf](https://github.com/pagopa/io-app/commit/0bd1dbf7ae5525d9e5720d476ab1b287c7457f65))
* **Bonus Pagamenti Digitali:** [[#175919180](https://www.pivotaltracker.com/story/show/175919180)] When bonus is incoming app shows an update alert ([#2448](https://github.com/pagopa/io-app/issues/2448)) ([90f21d5](https://github.com/pagopa/io-app/commit/90f21d55639c4398f7cb57f120e51342a6792e29))


### Chores

* **Bonus Pagamenti Digitali:** [[#175846429](https://www.pivotaltracker.com/story/show/175846429)] bpd copy updates ([#2450](https://github.com/pagopa/io-app/issues/2450)) ([d22aebc](https://github.com/pagopa/io-app/commit/d22aebc89e66e25b58d321316685ea2a2242b40a))

## [1.10.0-rc.1](https://github.com/pagopa/io-app/compare/1.10.0-rc.0...1.10.0-rc.1) (2020-11-24)


### Features

* **Bonus Pagamenti Digitali:** [[#174840894](https://www.pivotaltracker.com/story/show/174840894),[#175849556](https://www.pivotaltracker.com/story/show/175849556)] Managing the capabilities of a payment method, remove payment method button is not sticky ([#2410](https://github.com/pagopa/io-app/issues/2410)) ([80fc100](https://github.com/pagopa/io-app/commit/80fc100b65e5eca03142ff6c6a1d1875d7f09166))
* **Bonus Pagamenti Digitali:** [[#175115408](https://www.pivotaltracker.com/story/show/175115408)] Add self-declaration link ([#2407](https://github.com/pagopa/io-app/issues/2407)) ([d856b89](https://github.com/pagopa/io-app/commit/d856b89ce25e21cd0a7cd4bd619a9f27c6d73943))
* **Bonus Pagamenti Digitali:** [[#175477158](https://www.pivotaltracker.com/story/show/175477158)] BPD T&C and rules link ([#2417](https://github.com/pagopa/io-app/issues/2417)) ([85ca702](https://github.com/pagopa/io-app/commit/85ca7023bd4692cd76faa0d79bf2f3e0845d1a47))
* **Bonus Pagamenti Digitali:** [[#175488334](https://www.pivotaltracker.com/story/show/175488334),[#175760627](https://www.pivotaltracker.com/story/show/175760627)] Change the bancomat workflow & error handling, remove v-pay references ([#2396](https://github.com/pagopa/io-app/issues/2396)) ([2ec5b75](https://github.com/pagopa/io-app/commit/2ec5b7535d3adf611e0299fe6a111a2570bc3878))
* **Bonus Pagamenti Digitali:** [[#175718879](https://www.pivotaltracker.com/story/show/175718879)] Show remote faqs  ([#2419](https://github.com/pagopa/io-app/issues/2419)) ([5bf8066](https://github.com/pagopa/io-app/commit/5bf80664b5c82fd59da9703e07d21a032112d50c))
* **Bonus Pagamenti Digitali:** [[#175730280](https://www.pivotaltracker.com/story/show/175730280)] Handles transations button for no transaction available ([#2416](https://github.com/pagopa/io-app/issues/2416)) ([023ff1b](https://github.com/pagopa/io-app/commit/023ff1be0b00384b51039de93bc849ddca1f2d17))
* **Bonus Pagamenti Digitali:** [[#175780105](https://www.pivotaltracker.com/story/show/175780105)] Send missing action to mixpanel ([#2413](https://github.com/pagopa/io-app/issues/2413)) ([b5e4772](https://github.com/pagopa/io-app/commit/b5e47720f404f4976141ddd3c0702b89194a4f32))
* **Bonus Pagamenti Digitali:** [[#175796290](https://www.pivotaltracker.com/story/show/175796290),[#175778493](https://www.pivotaltracker.com/story/show/175778493),[#175778476](https://www.pivotaltracker.com/story/show/175778476)] Other channels payment method ([#2415](https://github.com/pagopa/io-app/issues/2415)) ([9492a3b](https://github.com/pagopa/io-app/commit/9492a3bde07638350d808e027c0b7fbccaea8b80))
* **Bonus Pagamenti Digitali:** [[#175796300](https://www.pivotaltracker.com/story/show/175796300)] WalletV2 could be Card, CreditCard, Satispay, Bancomatpay ([#2406](https://github.com/pagopa/io-app/issues/2406)) ([59ea2ce](https://github.com/pagopa/io-app/commit/59ea2ce9d1b147517f0bcd733dfbab623f9f0b6f))
* **Bonus Pagamenti Digitali:** [[#175797741](https://www.pivotaltracker.com/story/show/175797741)] Cashback milestone component ([#2408](https://github.com/pagopa/io-app/issues/2408)) ([6d07afc](https://github.com/pagopa/io-app/commit/6d07afcf3ce8c6c88c82bf834c1a4aef22eecfe7))
* [[#175060536](https://www.pivotaltracker.com/story/show/175060536)] new design delete profile ([#2401](https://github.com/pagopa/io-app/issues/2401)) ([8fe7cff](https://github.com/pagopa/io-app/commit/8fe7cff334b89bf919fd9dd45843c37d78079ee3))
* [[#175850928](https://www.pivotaltracker.com/story/show/175850928)] Add changelog scope for bpd [#2414](https://github.com/pagopa/io-app/issues/2414) ([4749a5a](https://github.com/pagopa/io-app/commit/4749a5a44707100d8ac0a78ad8d9104f99bf4823))


### Bug Fixes

* [[#175741977](https://www.pivotaltracker.com/story/show/175741977)] Fixes cut sticky header ([#2400](https://github.com/pagopa/io-app/issues/2400)) ([d6bad36](https://github.com/pagopa/io-app/commit/d6bad3617527e605ecba48f230cd338e18a9bb00))
* **Bonus Pagamenti Digitali:** [[#175685244](https://www.pivotaltracker.com/story/show/175685244)] Copy updates ([#2411](https://github.com/pagopa/io-app/issues/2411)) ([da7484a](https://github.com/pagopa/io-app/commit/da7484a4b69c64ad117c68c0a3346c56e5f3c945))
* **Bonus Pagamenti Digitali:** [[#175797704](https://www.pivotaltracker.com/story/show/175797704)] Display bancomat in add payment method list when adding a new method from a payment ([#2405](https://github.com/pagopa/io-app/issues/2405)) ([fdfce64](https://github.com/pagopa/io-app/commit/fdfce64f2d17d16b6a77b64aa6b68822e5a37e7c))
* **Bonus Pagamenti Digitali:** [[#175846470](https://www.pivotaltracker.com/story/show/175846470)] Bonus logos update ([#2412](https://github.com/pagopa/io-app/issues/2412)) ([ea3549e](https://github.com/pagopa/io-app/commit/ea3549e56a430f76d618ef17a1117c8ed4aa124b))
* **bpd:** cashback item is displayed even when activation status is undefined ([d4d381d](https://github.com/pagopa/io-app/commit/d4d381d4d51124f616c46293b36164e3884e0602))

## [1.10.0-rc.0](https://github.com/pagopa/io-app/compare/1.9.0-rc.5...1.10.0-rc.0) (2020-11-19)


### Features

* **Bonus Pagamenti Digitali:** [[#175269056](https://www.pivotaltracker.com/story/show/175269056),[#175667950](https://www.pivotaltracker.com/story/show/175667950)] Implements transactions list organized by date ([#2383](https://github.com/pagopa/io-app/issues/2383)) ([0dca10f](https://github.com/pagopa/io-app/commit/0dca10f2b868cee9a2f34fb8366609ffac07f8fa))
* **Bonus Pagamenti Digitali:** [[#175271334](https://www.pivotaltracker.com/story/show/175271334),[#175271269](https://www.pivotaltracker.com/story/show/175271269),[#175272149](https://www.pivotaltracker.com/story/show/175272149)] Payment method not activable, other channels, and how it works bottomsheet ([#2373](https://github.com/pagopa/io-app/issues/2373)) ([4882289](https://github.com/pagopa/io-app/commit/48822895e9075f2d0b2e0f792fdd7dd3a94e423b))
* **Bonus Pagamenti Digitali:** [[#175579023](https://www.pivotaltracker.com/story/show/175579023)] FeaturedCards carousel in wallet home screen ([#2398](https://github.com/pagopa/io-app/issues/2398)) ([5b36805](https://github.com/pagopa/io-app/commit/5b36805dbc6adcfe1be0794bb242b1747dd51fd8))
* **Bonus Pagamenti Digitali:** [[#175683744](https://www.pivotaltracker.com/story/show/175683744)] UI Rework for Add payment methods list screen ([#2392](https://github.com/pagopa/io-app/issues/2392)) ([cb4f4bb](https://github.com/pagopa/io-app/commit/cb4f4bb6f5745c97f88c9b91ef6aa9e1db3cd288))
* **Bonus Pagamenti Digitali:** [[#175683801](https://www.pivotaltracker.com/story/show/175683801)] When credit card has been added, join BPD or enroll the new method to BPD ([#2399](https://github.com/pagopa/io-app/issues/2399)) ([86fb44c](https://github.com/pagopa/io-app/commit/86fb44c05378966e9879c828f463cedf663c22df))
* **Bonus Pagamenti Digitali:** [[#175717926](https://www.pivotaltracker.com/story/show/175717926),[#175717778](https://www.pivotaltracker.com/story/show/175717778),[#175717794](https://www.pivotaltracker.com/story/show/175717794)] Don't save rejected iban as valid iban, wrong "skip" CTA when edit iban from detail screen, added toast to confirm an IBAN insertion ([#2397](https://github.com/pagopa/io-app/issues/2397)) ([e5a331b](https://github.com/pagopa/io-app/commit/e5a331b1fda0622386c31d66035fce984cf491c3))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175700724](https://www.pivotaltracker.com/story/show/175700724)] Fixes wrong format of bpd amount ([#2376](https://github.com/pagopa/io-app/issues/2376)) ([1d6183b](https://github.com/pagopa/io-app/commit/1d6183b6c087d9b3c34a31483be4b3ce508af662))
* **instabug-report:** remove duplicated append tag ([0192451](https://github.com/pagopa/io-app/commit/0192451e81c97d3ea095950aa1fcfc837f6ccf2b))
* **instabug-report:** remove useless import ([47b6830](https://github.com/pagopa/io-app/commit/47b6830d52d99354205c038fb22b4538d3bd5866))


### Chores

* [[#175420010](https://www.pivotaltracker.com/story/show/175420010)] Added in Circle CI a job to test if the CIE button exists ([#2375](https://github.com/pagopa/io-app/issues/2375)) ([a3dd9d3](https://github.com/pagopa/io-app/commit/a3dd9d3776203c227f8ada0603b498cac005f7fb))
* [[#175612963](https://www.pivotaltracker.com/story/show/175612963)] Refactor MessageDueDate component ([#2382](https://github.com/pagopa/io-app/issues/2382)) ([abee48e](https://github.com/pagopa/io-app/commit/abee48e77e38a832ba70b5dce2e1dc3251c113e4))
* **Bonus Pagamenti Digitali:** [[#175785820](https://www.pivotaltracker.com/story/show/175785820)] Restore missing content [#2404](https://github.com/pagopa/io-app/issues/2404) ([f6ec61d](https://github.com/pagopa/io-app/commit/f6ec61d6b035f257f94b2edbed0485a9f2689d22))
* remove jest workers limit (using default) ([dc6c448](https://github.com/pagopa/io-app/commit/dc6c448225028a78d44c2bf246b789064804d43d))

## [1.9.0-rc.5](https://github.com/pagopa/io-app/compare/1.9.0-rc.4...1.9.0-rc.5) (2020-11-16)


### Features

* **Bonus Pagamenti Digitali:** [[#175311250](https://www.pivotaltracker.com/story/show/175311250), [#175044606](https://www.pivotaltracker.com/story/show/175044606), [#175044635](https://www.pivotaltracker.com/story/show/175044635)] Add bpd events to mixpanel ([#2391](https://github.com/pagopa/io-app/issues/2391)) ([33b974b](https://github.com/pagopa/io-app/commit/33b974b5c106736f96d9f88e24e3234cd26aef27))
* **Bonus Pagamenti Digitali:** [[#175433663](https://www.pivotaltracker.com/story/show/175433663)] Show bank name in bancomat toggle ([#2379](https://github.com/pagopa/io-app/issues/2379)) ([690afa6](https://github.com/pagopa/io-app/commit/690afa67627144a244880e7c0926dfce5d9ed7f6))
* **Bonus Pagamenti Digitali:** [[#175553856](https://www.pivotaltracker.com/story/show/175553856)] Wallet V1 compatibile with Wallet V2 ([#2390](https://github.com/pagopa/io-app/issues/2390)) ([2539fdb](https://github.com/pagopa/io-app/commit/2539fdbe3d4268a763d3435c2b4ca4725128ff41))
* **Bonus Pagamenti Digitali:** [[#175663885](https://www.pivotaltracker.com/story/show/175663885)] Bancomat detail screen ([#2388](https://github.com/pagopa/io-app/issues/2388)) ([8d99c3a](https://github.com/pagopa/io-app/commit/8d99c3a5e35e237ae9c8e6b53459d3764d1c4853))
* **Bonus Pagamenti Digitali:** [[#175682399](https://www.pivotaltracker.com/story/show/175682399)] Bancomat card preview in wallet ([#2386](https://github.com/pagopa/io-app/issues/2386)) ([126df64](https://github.com/pagopa/io-app/commit/126df643d07aba3f7b9c491ca8483f92113cb259))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175717721](https://www.pivotaltracker.com/story/show/175717721)] Fixes cashback amount cut on android ([#2384](https://github.com/pagopa/io-app/issues/2384)) ([3f21c9c](https://github.com/pagopa/io-app/commit/3f21c9cdaba38364294213349f97b286c3090b82))
* **Bonus Pagamenti Digitali:** [[#175745708](https://www.pivotaltracker.com/story/show/175745708)] Clean store after unsubscription ([#2394](https://github.com/pagopa/io-app/issues/2394)) ([bb15787](https://github.com/pagopa/io-app/commit/bb15787653c1676a500bd663cc50542f38926bfe))
* **Bonus Vacanze:** [[#175744639](https://www.pivotaltracker.com/story/show/175744639)] Bancomat expiration date is build as invalid  ([#2393](https://github.com/pagopa/io-app/issues/2393)) ([3547f9f](https://github.com/pagopa/io-app/commit/3547f9fc7a972ae04808b6b92586d220b8a53524))

## [1.9.0-rc.4](https://github.com/pagopa/io-app/compare/1.9.0-rc.3...1.9.0-rc.4) (2020-11-14)


### Features

* [[#174932718](https://www.pivotaltracker.com/story/show/174932718)] Track bpd onboarding & iban actions ([#2371](https://github.com/pagopa/io-app/issues/2371)) ([4f9834b](https://github.com/pagopa/io-app/commit/4f9834b8eceb13809839d679dc7a93e78b0662a3))
* **Bonus Pagamenti Digitali:** [[#175265955](https://www.pivotaltracker.com/story/show/175265955)] Bpd payment method refinement ([#2364](https://github.com/pagopa/io-app/issues/2364)) ([82e58cf](https://github.com/pagopa/io-app/commit/82e58cf719047bb62be666104ff729dcd6ca1ea5))
* **Bonus Pagamenti Digitali:** [[#175268938](https://www.pivotaltracker.com/story/show/175268938)] Add base component for DailyTransaction section header ([#2366](https://github.com/pagopa/io-app/issues/2366)) ([05b5752](https://github.com/pagopa/io-app/commit/05b5752534ff588c05481467449fa81ece224d08))
* **Bonus Pagamenti Digitali:** [[#175269135](https://www.pivotaltracker.com/story/show/175269135),[#175271447](https://www.pivotaltracker.com/story/show/175271447)] BPD Transaction summary component with BottomSheet Info box ([#2372](https://github.com/pagopa/io-app/issues/2372)) ([25a3001](https://github.com/pagopa/io-app/commit/25a3001931955261f5106e0849744c0457003c77))
* **Bonus Pagamenti Digitali:** [[#175271100](https://www.pivotaltracker.com/story/show/175271100)] confirmation on activate/deactivate bpd on payment method ([#2369](https://github.com/pagopa/io-app/issues/2369)) ([f68b937](https://github.com/pagopa/io-app/commit/f68b937e04befff458063968e5874563e80807f5))
* **Bonus Pagamenti Digitali:** [[#175420435](https://www.pivotaltracker.com/story/show/175420435)] Add payment method after onboarding if the wallet is empty ([#2365](https://github.com/pagopa/io-app/issues/2365)) ([3a78657](https://github.com/pagopa/io-app/commit/3a786578a86b4425d2a4ed3043c4f89d722bf5c5))
* **Bonus Pagamenti Digitali:** [[#175663318](https://www.pivotaltracker.com/story/show/175663318)] Handle pans response with messages ([#2370](https://github.com/pagopa/io-app/issues/2370)) ([ac80ca3](https://github.com/pagopa/io-app/commit/ac80ca3d26fc3432d1e95cbd880f0d86f048c4f5))
* **Bonus Pagamenti Digitali:** [[#175686157](https://www.pivotaltracker.com/story/show/175686157)] CTA under keyboard while IBAN insertion ([#2374](https://github.com/pagopa/io-app/issues/2374)) ([c33b98b](https://github.com/pagopa/io-app/commit/c33b98b797047faaa625862acdf06bcf7e2312f2))
* [[#175708197](https://www.pivotaltracker.com/story/show/175708197)] Report an issue about credit card onboarding ([#2378](https://github.com/pagopa/io-app/issues/2378)) ([c19cf41](https://github.com/pagopa/io-app/commit/c19cf41fd062561ddacc3889122c0acda1b87d55))
* [[#175729293](https://www.pivotaltracker.com/story/show/175729293)] Upgrade react-native-cie v0.3.3 ([#2385](https://github.com/pagopa/io-app/issues/2385)) ([cda5458](https://github.com/pagopa/io-app/commit/cda5458e9a44b94041628e1204aba62cf9f23436))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175715662](https://www.pivotaltracker.com/story/show/175715662)] Buttons in bottomsheet don't dispatch onPress event ([#2381](https://github.com/pagopa/io-app/issues/2381)) ([16416b3](https://github.com/pagopa/io-app/commit/16416b3c865420ff1f8a98161e81173fe8ae836c))

## [1.9.0-rc.3](https://github.com/pagopa/io-app/compare/1.9.0-rc.2...1.9.0-rc.3) (2020-11-11)


### Features

* **Bonus Pagamenti Digitali:** [[#175265262](https://www.pivotaltracker.com/story/show/175265262)] BPD Cashback Cards carousel ([#2347](https://github.com/pagopa/io-app/issues/2347)) ([8480d0f](https://github.com/pagopa/io-app/commit/8480d0f6cf18cfd3ee9988fa7c85454ad996de37))
* [[#175488816](https://www.pivotaltracker.com/story/show/175488816)] change payment label to wallet ([#2356](https://github.com/pagopa/io-app/issues/2356)) ([9b3e602](https://github.com/pagopa/io-app/commit/9b3e60222068319390ee8fa874462cc37df52fc2))
* [[#175659067](https://www.pivotaltracker.com/story/show/175659067)] Using placeholder in yaml/locale ([#2363](https://github.com/pagopa/io-app/issues/2363)) ([7fb9fb6](https://github.com/pagopa/io-app/commit/7fb9fb621f50994520a8c9dc36c8f96deb273455))
* **Bonus Pagamenti Digitali:** [[#175266668](https://www.pivotaltracker.com/story/show/175266668)] Unsubscribe from bpd ([#2355](https://github.com/pagopa/io-app/issues/2355)) ([a051b09](https://github.com/pagopa/io-app/commit/a051b099166c4f65890f23187158404d491a4484))
* **Bonus Pagamenti Digitali:** [[#175269179](https://www.pivotaltracker.com/story/show/175269179)] Transaction details ([#2354](https://github.com/pagopa/io-app/issues/2354)) ([7d867d9](https://github.com/pagopa/io-app/commit/7d867d9c6ed810892188448a94bd10a4e4cd6b75))
* **Bonus Pagamenti Digitali:** [[#175488300](https://www.pivotaltracker.com/story/show/175488300),[#175662744](https://www.pivotaltracker.com/story/show/175662744)] Iban insertion and workflow (rework due to change request) ([#2360](https://github.com/pagopa/io-app/issues/2360)) ([fde14e7](https://github.com/pagopa/io-app/commit/fde14e71addfd6448135e066c63388fed168be08))


### Bug Fixes

* [[#175620603](https://www.pivotaltracker.com/story/show/175620603)] Pay CTA produces no action ([#2351](https://github.com/pagopa/io-app/issues/2351)) ([f84aab4](https://github.com/pagopa/io-app/commit/f84aab423c5e4440073818896d9ae6a02416fe31))
* **Payments:** [[#175553092](https://www.pivotaltracker.com/story/show/175553092)] Detect ONLY supported credit card circuit. If unsupported must detect UNKNOWN ([#2337](https://github.com/pagopa/io-app/issues/2337)) ([e012392](https://github.com/pagopa/io-app/commit/e012392a72589222844c23f7ee4cfe82c70dd68e))


### Chores

* **Bonus Pagamenti Digitali:** [[#175636284](https://www.pivotaltracker.com/story/show/175636284)] Add tests for bpdsummarycomponent & bpdAllPeriodsWithAmountSelector ([#2352](https://github.com/pagopa/io-app/issues/2352)) ([b38b2fc](https://github.com/pagopa/io-app/commit/b38b2fc4d44c2cd2005b37e73991fe8799e4f703))
* **Bonus Pagamenti Digitali:** [[#175659272](https://www.pivotaltracker.com/story/show/175659272),[#175412288](https://www.pivotaltracker.com/story/show/175412288)] Sync IBAN API to last specs ([#2361](https://github.com/pagopa/io-app/issues/2361)) ([7dd4ec9](https://github.com/pagopa/io-app/commit/7dd4ec9facffa72d05e9374a088345015f697550))

## [1.9.0-rc.2](https://github.com/pagopa/io-app/compare/1.9.0-rc.1...1.9.0-rc.2) (2020-11-06)


### Features

* **Bonus Pagamenti Digitali:** [[#174848741](https://www.pivotaltracker.com/story/show/174848741)] Display IBAN information from bpd details screen ([#2328](https://github.com/pagopa/io-app/issues/2328)) ([a6c2cfb](https://github.com/pagopa/io-app/commit/a6c2cfb2853e04b21be3c8c4fe8b1ad22f464bc9))
* **Bonus Pagamenti Digitali:** [[#175263506](https://www.pivotaltracker.com/story/show/175263506)] Create BPD card component ([#2338](https://github.com/pagopa/io-app/issues/2338)) ([c9abaef](https://github.com/pagopa/io-app/commit/c9abaef60cc6540d118bfa153c5628f63da68522))
* **Bonus Pagamenti Digitali:** [[#175265215](https://www.pivotaltracker.com/story/show/175265215)] Handle different status on BPD card component ([#2343](https://github.com/pagopa/io-app/issues/2343)) ([ba8b3e7](https://github.com/pagopa/io-app/commit/ba8b3e71af700f027a35e2aaf312e37eca88befc))
* **Bonus Pagamenti Digitali:** [[#175266102](https://www.pivotaltracker.com/story/show/175266102)] Add summary (graphical and textual) for period transactions and amount component ([#2332](https://github.com/pagopa/io-app/issues/2332)) ([965fea2](https://github.com/pagopa/io-app/commit/965fea2fac969a2a71e2af093be07216346a36df))
* **Bonus Pagamenti Digitali:** [[#175266374](https://www.pivotaltracker.com/story/show/175266374)] Bpd details screen draft organization ([#2327](https://github.com/pagopa/io-app/issues/2327)) ([66a046a](https://github.com/pagopa/io-app/commit/66a046aa9de5f88b22d2b73db91e05cde9a31633))
* **Bonus Pagamenti Digitali:** [[#175268877](https://www.pivotaltracker.com/story/show/175268877)] Transaction item & draft transaction list ([#2344](https://github.com/pagopa/io-app/issues/2344)) ([2a2d70d](https://github.com/pagopa/io-app/commit/2a2d70d280288fdc98da88d923eda300415120d1))
* **Bonus Pagamenti Digitali:** [[#175515542](https://www.pivotaltracker.com/story/show/175515542),[#175266771](https://www.pivotaltracker.com/story/show/175266771)] Add entrypoint for draft Transactions screen ([#2330](https://github.com/pagopa/io-app/issues/2330)) ([e79f77e](https://github.com/pagopa/io-app/commit/e79f77e02ff04d4cb623a2106080a8445777403c))
* **Bonus Pagamenti Digitali:** [[#175565890](https://www.pivotaltracker.com/story/show/175565890)] Add raw components to bpd period details ([#2339](https://github.com/pagopa/io-app/issues/2339)) ([3ace71f](https://github.com/pagopa/io-app/commit/3ace71fb00caddc3f4a852b827d27a2da5c18073))
* **Bonus Pagamenti Digitali:** [[#175617105](https://www.pivotaltracker.com/story/show/175617105)] Decode trxDate WinningTransactionResource ([#2349](https://github.com/pagopa/io-app/issues/2349)) ([425af63](https://github.com/pagopa/io-app/commit/425af631df650ba59ceab6cee9851b187b93bf6e))
* **Payments:** [[#175517468](https://www.pivotaltracker.com/story/show/175517468)] Save credit card insertion attempts ([#2335](https://github.com/pagopa/io-app/issues/2335)) ([d7dbc11](https://github.com/pagopa/io-app/commit/d7dbc110ed47ced001e911da58dd3b0a0d092d28))


### Bug Fixes

* [[#175540991](https://www.pivotaltracker.com/story/show/175540991)] refine message state ([#2345](https://github.com/pagopa/io-app/issues/2345)) ([9804d72](https://github.com/pagopa/io-app/commit/9804d723d8ed5a3d751ba5694b46ba7a55d80c84))
* [[#175574457](https://www.pivotaltracker.com/story/show/175574457)] Update payment-notice-pagopa.png [#2340](https://github.com/pagopa/io-app/issues/2340) ([a358f91](https://github.com/pagopa/io-app/commit/a358f91e33587ccd76e4ae0e132ca35018e89746))


### Chores

* **Bonus Pagamenti Digitali:** [[#175589933](https://www.pivotaltracker.com/story/show/175589933)] Sync PM/walletV2 spec ([#2342](https://github.com/pagopa/io-app/issues/2342)) ([fb996ed](https://github.com/pagopa/io-app/commit/fb996edf94bc7365f44f8bd20eb01f9d9b70522a))

## [1.9.0-rc.1](https://github.com/pagopa/io-app/compare/1.9.0-rc.0...1.9.0-rc.1) (2020-11-04)


### Features

* [[#165090272](https://www.pivotaltracker.com/story/show/165090272)] Credit Card Brand Recognition ([#2319](https://github.com/pagopa/io-app/issues/2319)) ([4bed662](https://github.com/pagopa/io-app/commit/4bed6624f50e99b1a201f21f0bdbf3770e007281))
* [[#174966797](https://www.pivotaltracker.com/story/show/174966797)] change message state when expiring or expired ([#2316](https://github.com/pagopa/io-app/issues/2316)) ([ab16e0d](https://github.com/pagopa/io-app/commit/ab16e0dfc505c36bac603ed9f0ee95940b2249f4))
* [[#175285929](https://www.pivotaltracker.com/story/show/175285929)] Adds an alert when bonus is not yet supported by the app ([#2322](https://github.com/pagopa/io-app/issues/2322)) ([41abc58](https://github.com/pagopa/io-app/commit/41abc58c5508942b31591ef941bf6a05c8819a23))
* **Bonus Pagamenti Digitali:** [[#175253344](https://www.pivotaltracker.com/story/show/175253344)] Implements Bottom sheet with react-native-bottom-sheet ([#2320](https://github.com/pagopa/io-app/issues/2320)) ([c3b8e0b](https://github.com/pagopa/io-app/commit/c3b8e0ba2b686bc18d0f07a58f142c02b614e33b))
* **Bonus Pagamenti Digitali:** [[#175263873](https://www.pivotaltracker.com/story/show/175263873)] Add BPD award periods api ([#2324](https://github.com/pagopa/io-app/issues/2324)) ([adc5312](https://github.com/pagopa/io-app/commit/adc5312659c9183633f1f01d5ec14182b192c9e3))
* **Bonus Pagamenti Digitali:** [[#175263900](https://www.pivotaltracker.com/story/show/175263900)] Add winning transaction API ([#2333](https://github.com/pagopa/io-app/issues/2333)) ([4c3bbae](https://github.com/pagopa/io-app/commit/4c3bbaea43fc872b9d3c8e3cde3cbcb78397b80a))
* **Bonus Pagamenti Digitali:** [[#175263981](https://www.pivotaltracker.com/story/show/175263981)]  Add BPD cashback amount API ([#2329](https://github.com/pagopa/io-app/issues/2329)) ([72e9aa7](https://github.com/pagopa/io-app/commit/72e9aa7e0547f5b3790ca03bab2ef19e1e6cabd1))
* **Bonus Pagamenti Digitali:** [[#175349901](https://www.pivotaltracker.com/story/show/175349901),[#175477189](https://www.pivotaltracker.com/story/show/175477189)] Action, store and reducer for bpd details and transactions ([#2321](https://github.com/pagopa/io-app/issues/2321)) ([8ab3bea](https://github.com/pagopa/io-app/commit/8ab3bea21fb48e7957547db333a351fa367f40df))


### Bug Fixes

* [[#173988115](https://www.pivotaltracker.com/story/show/173988115)] Fix insert manual payment item ([#2334](https://github.com/pagopa/io-app/issues/2334)) ([7dadbe5](https://github.com/pagopa/io-app/commit/7dadbe54fea10a64a44f39110dbef061b8a84f66))
* [[#175438360](https://www.pivotaltracker.com/story/show/175438360)] send CIE_AUTHENTICATION_ERROR as code to mixpanel ([#2326](https://github.com/pagopa/io-app/issues/2326)) ([3fe0643](https://github.com/pagopa/io-app/commit/3fe0643a3890fae1d1bafccc6b64d7496a9348e8))
* [[#175482067](https://www.pivotaltracker.com/story/show/175482067)] Link near footer button not clickable ([#2336](https://github.com/pagopa/io-app/issues/2336)) ([f148901](https://github.com/pagopa/io-app/commit/f1489013fb28c2c47b73cc804f86360c671900cb))
* [[#175487236](https://www.pivotaltracker.com/story/show/175487236)] Update react-native-cie v0.3.2 ([#2325](https://github.com/pagopa/io-app/issues/2325)) ([7d30592](https://github.com/pagopa/io-app/commit/7d30592764085bcff73922b17b45d6a1917a4017))
* [[#175492840](https://www.pivotaltracker.com/story/show/175492840)] removes tool-versions file ([#2323](https://github.com/pagopa/io-app/issues/2323)) ([3a522aa](https://github.com/pagopa/io-app/commit/3a522aa9afd4bd878c57e02bc02f06159a2fb688))

## [1.9.0-rc.0](https://github.com/pagopa/io-app/compare/1.8.0-rc.7...1.9.0-rc.0) (2020-10-28)


### Features

* [[#174575010](https://www.pivotaltracker.com/story/show/174575010)] Add showroom listitem ([#2317](https://github.com/pagopa/io-app/issues/2317)) ([72c0200](https://github.com/pagopa/io-app/commit/72c020058ae00388d654eb10d1cdb4f1442306c3))


### Chores

* **Bonus Pagamenti Digitali:** [[#175419552](https://www.pivotaltracker.com/story/show/175419552)] Enhance add bancomat response ([#2315](https://github.com/pagopa/io-app/issues/2315)) ([1705c39](https://github.com/pagopa/io-app/commit/1705c39d181abafd1bcda93f8751d0274d4c2259))
* [[#174257087](https://www.pivotaltracker.com/story/show/174257087)] Update clipboard module ([#2318](https://github.com/pagopa/io-app/issues/2318)) ([ee084c9](https://github.com/pagopa/io-app/commit/ee084c9c8c4994cee42442d4ca01f20d81239b7a))

## [1.8.0-rc.7](https://github.com/pagopa/io-app/compare/1.8.0-rc.6...1.8.0-rc.7) (2020-10-23)

## [1.8.0-rc.6](https://github.com/pagopa/io-app/compare/1.8.0-rc.5...1.8.0-rc.6) (2020-10-23)

## [1.8.0-rc.5](https://github.com/pagopa/io-app/compare/1.8.0-rc.4...1.8.0-rc.5) (2020-10-23)


### Features

* **Bonus Pagamenti Digitali:** [[#174794326](https://www.pivotaltracker.com/story/show/174794326),[#174794981](https://www.pivotaltracker.com/story/show/174794981),[#175186046](https://www.pivotaltracker.com/story/show/175186046)] BPD payment instruments API ([#2305](https://github.com/pagopa/io-app/issues/2305)) ([af65bdf](https://github.com/pagopa/io-app/commit/af65bdf9ef21fcf902f02ca0b2b73a6eb5715d2b))
* **Bonus Pagamenti Digitali:** [[#174863016](https://www.pivotaltracker.com/story/show/174863016)] Enroll payment methods to bpd while onboarding ([#2301](https://github.com/pagopa/io-app/issues/2301)) ([b26fe2d](https://github.com/pagopa/io-app/commit/b26fe2d7c93a171505cf752d55e423c2b54961c1))
* **Bonus Pagamenti Digitali:** [[#175010541](https://www.pivotaltracker.com/story/show/175010541)] Show&Modify bpd activation on a payment method ([#2298](https://github.com/pagopa/io-app/issues/2298)) ([01b28f4](https://github.com/pagopa/io-app/commit/01b28f49f13a76ecfbc598dd701f45b32277a338))
* **Bonus Pagamenti Digitali:** [[#175164503](https://www.pivotaltracker.com/story/show/175164503)] Activate bpd on new onboarded Bancomat ([#2307](https://github.com/pagopa/io-app/issues/2307)) ([a2e4440](https://github.com/pagopa/io-app/commit/a2e4440d0c155d05b119d2045d41d82b2623149c))
* **Bonus Pagamenti Digitali:** [[#175185419](https://www.pivotaltracker.com/story/show/175185419)] Nesting WalletV2 inside Wallet ([#2310](https://github.com/pagopa/io-app/issues/2310)) ([b42f7d1](https://github.com/pagopa/io-app/commit/b42f7d1f87300cc137bd913631922ddc1bb1fa61))
* **Bonus Pagamenti Digitali:** [[#175185419](https://www.pivotaltracker.com/story/show/175185419)] Support wallet V2  ([#2300](https://github.com/pagopa/io-app/issues/2300)) ([aef07b7](https://github.com/pagopa/io-app/commit/aef07b7ef5246de2b2cbb4f6c37b989fbc249a64))
* **Bonus Pagamenti Digitali:** [[#175329974](https://www.pivotaltracker.com/story/show/175329974)] Test enable/disable bpd on payment method ([#2304](https://github.com/pagopa/io-app/issues/2304)) ([37938e2](https://github.com/pagopa/io-app/commit/37938e2d11d1b689077c04c15fe0ab55f6263300))
* **Bonus Pagamenti Digitali:** [[#175401460](https://www.pivotaltracker.com/story/show/175401460)] Remove all WalletV2 placeholders and use the real type and implementation ([#2311](https://github.com/pagopa/io-app/issues/2311)) ([9528094](https://github.com/pagopa/io-app/commit/9528094f9d06e40ad251e2800849530729b8144a))(https://www.pivotaltracker.com/story/show/175329974) [#174794326](https://www.pivotaltracker.com/story/show/174794326) [#174794326](https://www.pivotaltracker.com/story/show/174794326) [#175329974](https://www.pivotaltracker.com/story/show/175329974)
* [[#175403207](https://www.pivotaltracker.com/story/show/175403207)] Enhance CIE iOS authentication start-up ([#2312](https://github.com/pagopa/io-app/issues/2312)) ([68bbd4c](https://github.com/pagopa/io-app/commit/68bbd4c65c7569889aa41473753acd2b9af96fbb))


### Bug Fixes

* [[#174227407](https://www.pivotaltracker.com/story/show/174227407)] Remove multiple notification ([#2295](https://github.com/pagopa/io-app/issues/2295)) ([1b83fcb](https://github.com/pagopa/io-app/commit/1b83fcb2a642530edb49524da8729f8c9b93e9e3))
* **Bonus Pagamenti Digitali:** [[#175396286](https://www.pivotaltracker.com/story/show/175396286)] Handle 404 for bpd payment activation status ([#2309](https://github.com/pagopa/io-app/issues/2309)) ([011489c](https://github.com/pagopa/io-app/commit/011489cf788e7f1f76ae3fdbdba64c18f8ff33c4))
* **Bonus Pagamenti Digitali:** [[#175410649](https://www.pivotaltracker.com/story/show/175410649)] Codec fails on add bancomat response ([#2313](https://github.com/pagopa/io-app/issues/2313)) ([60a691f](https://github.com/pagopa/io-app/commit/60a691f93d3c2090233c07454cd719539da31f32))

## [1.8.0-rc.4](https://github.com/pagopa/io-app/compare/1.8.0-rc.0...1.8.0-rc.4) (2020-10-21)


### Features

* [[#175228211](https://www.pivotaltracker.com/story/show/175228211)] Update Internationalization section in README ([#2297](https://github.com/pagopa/io-app/issues/2297)) ([b9685d6](https://github.com/pagopa/io-app/commit/b9685d6deb95a78107915b659d84ac827989256a))


### Bug Fixes

* **Payments:** [[#175300578](https://www.pivotaltracker.com/story/show/175300578)] Transaction read state is lost across multiple sessions ([#2296](https://github.com/pagopa/io-app/issues/2296)) ([eb1e5a3](https://github.com/pagopa/io-app/commit/eb1e5a3826eb955671e3e9c7af1da0dc1ff64f96))


### Chores

* **Bonus Pagamenti Digitali:** [[#175329922](https://www.pivotaltracker.com/story/show/175329922)] Add Bpd Test Overlay [#2303](https://github.com/pagopa/io-app/issues/2303) ([407e7f4](https://github.com/pagopa/io-app/commit/407e7f46a5d86e225fa1b758cd1c634d9e6cd73b))

## [1.8.0-rc.0](https://github.com/pagopa/io-app/compare/1.7.0-rc.10...1.8.0-rc.0) (2020-10-19)


### Features

* [[#175114153](https://www.pivotaltracker.com/story/show/175114153)] Force update birthplace FiscalCodeScreen ([#2277](https://github.com/pagopa/io-app/issues/2277)) ([77adaee](https://github.com/pagopa/io-app/commit/77adaee7e67ca15686a22fa5166f57a82646cf4e))
* **Bonus Pagamenti Digitali:** [[#175012088](https://www.pivotaltracker.com/story/show/175012088)] Adds the AddBancomatScreen for Bancomat onboarding ([#2285](https://github.com/pagopa/io-app/issues/2285)) ([d0767a8](https://github.com/pagopa/io-app/commit/d0767a87a79e4744c3f59884ac019bac00829f11))
* **Bonus Pagamenti Digitali:** [[#175012088](https://www.pivotaltracker.com/story/show/175012088)] Select available Bancomats to add ([#2282](https://github.com/pagopa/io-app/issues/2282)) ([1c319b3](https://github.com/pagopa/io-app/commit/1c319b3916494088a170d345bba454f6e31a4e9e))
* **Bonus Pagamenti Digitali:** [[#175185611](https://www.pivotaltracker.com/story/show/175185611)] Add pans to wallet ([#2286](https://github.com/pagopa/io-app/issues/2286)) ([abd1906](https://github.com/pagopa/io-app/commit/abd1906bb3c51920833cf9c8ec950f861d008beb))
* **Bonus Pagamenti Digitali:** [[#175242818](https://www.pivotaltracker.com/story/show/175242818)] Connects Add Bancomat screen with business logic and redux state ([#2288](https://github.com/pagopa/io-app/issues/2288)) ([85ec97c](https://github.com/pagopa/io-app/commit/85ec97c92ed974118296c5d78fa72b592f0a06ca))
* **Bonus Pagamenti Digitali:** [[#175308311](https://www.pivotaltracker.com/story/show/175308311)] Link "add bancomat to wallet" with networking logic ([#2299](https://github.com/pagopa/io-app/issues/2299)) ([b44450b](https://github.com/pagopa/io-app/commit/b44450b93c57378f9ce87979a09fcb6a4f5de390))


### Bug Fixes

* [[#175252607](https://www.pivotaltracker.com/story/show/175252607)] update CIE tab label [#2290](https://github.com/pagopa/io-app/issues/2290) ([2b8deb1](https://github.com/pagopa/io-app/commit/2b8deb115a3301aa2f5b3c14694635891e8bef87))
* [[#175271222](https://www.pivotaltracker.com/story/show/175271222)] Bonus available selector creates a new object on every call ([#2292](https://github.com/pagopa/io-app/issues/2292)) ([f53f8e1](https://github.com/pagopa/io-app/commit/f53f8e1de363526ebcf0eeaa3080973a1d47c447))


### Chores

* [[#173146736](https://www.pivotaltracker.com/story/show/173146736)] update contextual help ([#2287](https://github.com/pagopa/io-app/issues/2287)) ([3a62c81](https://github.com/pagopa/io-app/commit/3a62c8148fb288f4fd6d2c6396676bdf7bf38d15))
* [[#174966784](https://www.pivotaltracker.com/story/show/174966784)] Update README ([#2280](https://github.com/pagopa/io-app/issues/2280)) ([bd9c505](https://github.com/pagopa/io-app/commit/bd9c50577f325990568e6636bd5a61af0ac27c85))
* Remove v pay as supported payment method from FAQ ([#2302](https://github.com/pagopa/io-app/issues/2302)) ([db4e69c](https://github.com/pagopa/io-app/commit/db4e69c6a1515e3705458f53b230e02300bb7f16))

## [1.7.0-rc.10](https://github.com/pagopa/io-app/compare/1.7.0-rc.9...1.7.0-rc.10) (2020-10-09)


### Features

* [[#175165123](https://www.pivotaltracker.com/story/show/175165123)] add subtitle in change code item [#2278](https://github.com/pagopa/io-app/issues/2278) ([acd2b18](https://github.com/pagopa/io-app/commit/acd2b1891198eaa8556412d60013a6f66565db1c))
* **Bonus Pagamenti Digitali:** [[#175011093](https://www.pivotaltracker.com/story/show/175011093),[#175011182](https://www.pivotaltracker.com/story/show/175011182)] Add bancomat entrypoint and stub navigation ([#2269](https://github.com/pagopa/io-app/issues/2269)) ([c98a4e8](https://github.com/pagopa/io-app/commit/c98a4e8efa3b9bdaf434b2cd86fa945f27361e49))
* **Bonus Pagamenti Digitali:** [[#175011879](https://www.pivotaltracker.com/story/show/175011879)] Adds Bank selection and search screen ([#2255](https://github.com/pagopa/io-app/issues/2255)) ([369c77d](https://github.com/pagopa/io-app/commit/369c77dbd6a0c5a2103ca605cb6b660e104e7682))
* **Bonus Pagamenti Digitali:** [[#175011989](https://www.pivotaltracker.com/story/show/175011989),[#175012026](https://www.pivotaltracker.com/story/show/175012026),[#175012064](https://www.pivotaltracker.com/story/show/175012064)] Style for onboarding bancomat KO and loading screens ([#2276](https://github.com/pagopa/io-app/issues/2276)) ([bed6ab5](https://github.com/pagopa/io-app/commit/bed6ab589d085a800244cc850c7bdedd33c55299))
* **Bonus Pagamenti Digitali:** [[#175012295](https://www.pivotaltracker.com/story/show/175012295),[#175011188](https://www.pivotaltracker.com/story/show/175011188)] Onboarding bancomat workflow ([#2273](https://github.com/pagopa/io-app/issues/2273)) ([a9737be](https://github.com/pagopa/io-app/commit/a9737be5d0f0eec60cfe451701ea6fb368e433c3))
* **Bonus Pagamenti Digitali:** [[#175115845](https://www.pivotaltracker.com/story/show/175115845)] Add networking and store logic to support pans search ([#2263](https://github.com/pagopa/io-app/issues/2263)) ([cd92644](https://github.com/pagopa/io-app/commit/cd92644e197ae80ad54eb2b443fe7fb7f46720b1))
* **Bonus Pagamenti Digitali:** [[#175142335](https://www.pivotaltracker.com/story/show/175142335)] Connects Search Bank screen with store and remote data ([#2266](https://github.com/pagopa/io-app/issues/2266)) ([cad3dde](https://github.com/pagopa/io-app/commit/cad3dde170ab1f9138b7f776a63a80a4e0d8e850))
* **Bonus Pagamenti Digitali:** [[#175204419](https://www.pivotaltracker.com/story/show/175204419)] Connect search bank screen with onboarding bancomat business logic ([#2279](https://github.com/pagopa/io-app/issues/2279)) ([54ca830](https://github.com/pagopa/io-app/commit/54ca8300a39d3bb6469c0e14a5a85edd199b19e7))


### Bug Fixes

* **Android:** [[#175090703](https://www.pivotaltracker.com/story/show/175090703)] CTA text not aligned in the Android Bonus_Request_Information screen ([#2270](https://github.com/pagopa/io-app/issues/2270)) ([c033df4](https://github.com/pagopa/io-app/commit/c033df40a866e6684cea157439a33097b50b0e2d))
* [[#175132435](https://www.pivotaltracker.com/story/show/175132435)] update context help content for faqs ([#2275](https://github.com/pagopa/io-app/issues/2275)) ([f96be24](https://github.com/pagopa/io-app/commit/f96be24902fe616654bde49d4b857ac89b0b4c23))
* **Bonus Pagamenti Digitali:** [[#175207263](https://www.pivotaltracker.com/story/show/175207263)] Iban update request has wrong token ([#2281](https://github.com/pagopa/io-app/issues/2281)) ([b2b6ae4](https://github.com/pagopa/io-app/commit/b2b6ae4df10e3082d61e5e2d0c1339f277dce536))


### Chores

* **Bonus Pagamenti Digitali:** [[#175186882](https://www.pivotaltracker.com/story/show/175186882)] Sync code last PM API spec  ([#2274](https://github.com/pagopa/io-app/issues/2274)) ([c6a0f5f](https://github.com/pagopa/io-app/commit/c6a0f5fc78e68ca8ea9796793af12f4f28e14cab))

## [1.7.0-rc.9](https://github.com/pagopa/io-app/compare/1.7.0-rc.5...1.7.0-rc.9) (2020-10-08)


### Features

* **MyPortal:** [[#175076179](https://www.pivotaltracker.com/story/show/175076179)] Security improvements on webview component for services ([#2258](https://github.com/pagopa/io-app/issues/2258)) ([a2dcb2f](https://github.com/pagopa/io-app/commit/a2dcb2fb0616fa5c19690ae22f16f8231c51f84e))
* [[#175057500](https://www.pivotaltracker.com/story/show/175057500)] Modify label for transaction details ([#2251](https://github.com/pagopa/io-app/issues/2251)) ([3986236](https://github.com/pagopa/io-app/commit/3986236f32be83570fc1f498b73ff71fac1d3b75))
* **Bonus Pagamenti Digitali:** [[#174847319](https://www.pivotaltracker.com/story/show/174847319)] Iban insertion screen ([#2259](https://github.com/pagopa/io-app/issues/2259)) ([6351eff](https://github.com/pagopa/io-app/commit/6351eff07103a4bbd590be4eeee12ffd36fbaa18))
* **Bonus Pagamenti Digitali:** [[#174847335](https://www.pivotaltracker.com/story/show/174847335),[#174847371](https://www.pivotaltracker.com/story/show/174847371),[#174847398](https://www.pivotaltracker.com/story/show/174847398)] Iban ko screens ([#2261](https://github.com/pagopa/io-app/issues/2261)) ([adf9337](https://github.com/pagopa/io-app/commit/adf9337fe257249fbdf98af504701091313eb19c))
* **Bonus Pagamenti Digitali:** [[#174863094](https://www.pivotaltracker.com/story/show/174863094)] No payment methods available screen ([#2262](https://github.com/pagopa/io-app/issues/2262)) ([6fda0ec](https://github.com/pagopa/io-app/commit/6fda0ecdba249b000406a06873d471ebfaa53a51))
* **Bonus Pagamenti Digitali:** [[#175013470](https://www.pivotaltracker.com/story/show/175013470),[#174847416](https://www.pivotaltracker.com/story/show/174847416),[#174847513](https://www.pivotaltracker.com/story/show/174847513)] Onboarding Iban business logic workflow, actions and store ([#2252](https://github.com/pagopa/io-app/issues/2252)) ([a1546d5](https://github.com/pagopa/io-app/commit/a1546d5c1435d36911600e16a3d10ba9cfe138f9))
* **Bonus Pagamenti Digitali:** [[#175076682](https://www.pivotaltracker.com/story/show/175076682)] Load ABI list ([#2254](https://github.com/pagopa/io-app/issues/2254)) ([0e30730](https://github.com/pagopa/io-app/commit/0e30730f595b2b041b667fc88cf45fd123ffd51f))
* **Bonus Pagamenti Digitali:** [[#175096847](https://www.pivotaltracker.com/story/show/175096847)] Support internal tests ([#2260](https://github.com/pagopa/io-app/issues/2260)) ([a06825f](https://github.com/pagopa/io-app/commit/a06825fe576248fc5bcaa65e627843d1592c0dbc))
* **Bonus Pagamenti Digitali:** [[#175165785](https://www.pivotaltracker.com/story/show/175165785)] Remove api-key from BPD requests ([#2272](https://github.com/pagopa/io-app/issues/2272)) ([a7219ac](https://github.com/pagopa/io-app/commit/a7219ac5e76b0725fb5baf12564d251c3306734d))
* **MyPortal:** [[#175114980](https://www.pivotaltracker.com/story/show/175114980)] Implements check on loading error on Webview component ([#2264](https://github.com/pagopa/io-app/issues/2264)) ([13d2999](https://github.com/pagopa/io-app/commit/13d299919385d191b48e08097b041ca5a658a613))
* [[#175058139](https://www.pivotaltracker.com/story/show/175058139)] Remove subtitle change pin screen ([#2268](https://github.com/pagopa/io-app/issues/2268)) ([312eeef](https://github.com/pagopa/io-app/commit/312eeef7b96009d450a430166c35953192f53f9d))
* [[#175060613](https://www.pivotaltracker.com/story/show/175060613)] Modify screenshot deny logic android ([#2250](https://github.com/pagopa/io-app/issues/2250)) ([2e17847](https://github.com/pagopa/io-app/commit/2e17847e3a772e18dd2c0fde2b9f52172723a9a4))


### Bug Fixes

* **Bonus Pagamenti Digitali:** [[#175117682](https://www.pivotaltracker.com/story/show/175117682)] Citizen delete response cannot be decoded ([#2265](https://github.com/pagopa/io-app/issues/2265)) ([5520010](https://github.com/pagopa/io-app/commit/5520010a0d54f7ec448558c4f130feb4e8e8fe2a))
* [[#175072051](https://www.pivotaltracker.com/story/show/175072051)] use SafeAreaView from react-natvie instead react-navigation [#2267](https://github.com/pagopa/io-app/issues/2267) ([a180b73](https://github.com/pagopa/io-app/commit/a180b737e9b5170c137eaf7bb0a3f58a2ca78797))
* [[#175090750](https://www.pivotaltracker.com/story/show/175090750)] Wrong label shown in Touch-ID identification ([#2253](https://github.com/pagopa/io-app/issues/2253)) ([e59b628](https://github.com/pagopa/io-app/commit/e59b628ecccfb447e28d3b41ed886f0e4bf7325b))


### Chores

* [[#175095271](https://www.pivotaltracker.com/story/show/175095271)] Prettify the codebase [#2257](https://github.com/pagopa/io-app/issues/2257) ([3f4029c](https://github.com/pagopa/io-app/commit/3f4029c97879ab25ce3318c3d8cc34b95fe98ea9))

## [1.7.0-rc.5](https://github.com/pagopa/io-app/compare/1.7.0-rc.4...1.7.0-rc.5) (2020-10-01)


### Features

* **Bonus Pagamenti Digitali:** [[#174837969](https://www.pivotaltracker.com/story/show/174837969)] bpd information & tos screen ([#2231](https://github.com/pagopa/io-app/issues/2231)) ([526c64b](https://github.com/pagopa/io-app/commit/526c64bb0c1d2097a8da88cc25dbd060c96754d1))
* **Bonus Pagamenti Digitali:** [[#174838065](https://www.pivotaltracker.com/story/show/174838065)] Declaration screen ([#2228](https://github.com/pagopa/io-app/issues/2228)) ([72cbca6](https://github.com/pagopa/io-app/commit/72cbca6317c8b77f8fbbc2866c63f89775320040))
* **Bonus Pagamenti Digitali:** [[#174847263](https://www.pivotaltracker.com/story/show/174847263),[#174847196](https://www.pivotaltracker.com/story/show/174847196)] Add network logic to support upsert IBAN ([#2233](https://github.com/pagopa/io-app/issues/2233)) ([1132c8e](https://github.com/pagopa/io-app/commit/1132c8e251f82baa41492cf202d8d525848307f1))
* **Bonus Pagamenti Digitali:** [[#174858355](https://www.pivotaltracker.com/story/show/174858355)] iban insertion screen placeholder ([#2243](https://github.com/pagopa/io-app/issues/2243)) ([f7bf206](https://github.com/pagopa/io-app/commit/f7bf206323c3d81af8dfe97685f6418126bd7d5c))
* **Bonus Pagamenti Digitali:** [[#174860194](https://www.pivotaltracker.com/story/show/174860194)] Loading Activate bpd screen ([#2230](https://github.com/pagopa/io-app/issues/2230)) ([b5eafb7](https://github.com/pagopa/io-app/commit/b5eafb77a94042e2fc42f4018bf5cae9f71df4ea))
* **Bonus Pagamenti Digitali:** [[#174860317](https://www.pivotaltracker.com/story/show/174860317)] Loading bpd activation status screen ([#2229](https://github.com/pagopa/io-app/issues/2229)) ([e7af639](https://github.com/pagopa/io-app/commit/e7af63939e256320bf034392e2f13027b8504634))
* **Bonus Pagamenti Digitali:** [[#174970898](https://www.pivotaltracker.com/story/show/174970898)] Handle citizen not found as not enrolled to BPD ([#2246](https://github.com/pagopa/io-app/issues/2246)) ([a12bc03](https://github.com/pagopa/io-app/commit/a12bc03a4bf9cd5b4f199b1e0f6696d8d2021490))
* **Bonus Pagamenti Digitali:** [[#175011121](https://www.pivotaltracker.com/story/show/175011121)] Onboarding Bancomat screens placeholder ([#2239](https://github.com/pagopa/io-app/issues/2239)) ([494cebd](https://github.com/pagopa/io-app/commit/494cebd790b4b090456b27d0ac2fa0fa007a3d88))
* **Bonus Pagamenti Digitali:** [[#175013432](https://www.pivotaltracker.com/story/show/175013432)] iban navigation stack ([#2245](https://github.com/pagopa/io-app/issues/2245)) ([72184e0](https://github.com/pagopa/io-app/commit/72184e04867e01fdaa5eda1d58db9e917281e03d))
* **MyPortal:** [[#174865280](https://www.pivotaltracker.com/story/show/174865280)] Clean stored navigation params [#2227](https://github.com/pagopa/io-app/issues/2227) ([5b556b8](https://github.com/pagopa/io-app/commit/5b556b841cc4f58437806b9f9da5590620a218fc))
* [[#174864406](https://www.pivotaltracker.com/story/show/174864406)] Remove the not validated email block to request the download of data ([#2247](https://github.com/pagopa/io-app/issues/2247)) ([e60d9cb](https://github.com/pagopa/io-app/commit/e60d9cb2c5ee8a121824cf2bd7390a7ffb598b21))
* [[#175009115](https://www.pivotaltracker.com/story/show/175009115)] No identification required on credit card insertion ([#2237](https://github.com/pagopa/io-app/issues/2237)) ([d7689c0](https://github.com/pagopa/io-app/commit/d7689c0b4ea4bcc5f31b5b7ed85437390451632e))


### Bug Fixes

* **Bonus Vacanze:** [[#174985742](https://www.pivotaltracker.com/story/show/174985742)] Add consumed date row on bonus detail ([#2226](https://github.com/pagopa/io-app/issues/2226)) ([e9f669c](https://github.com/pagopa/io-app/commit/e9f669c069369c905c4d65db71408feeaa2b5603))
* [[#174768831](https://www.pivotaltracker.com/story/show/174768831)] Remove extra spaces TOS screen ([#2240](https://github.com/pagopa/io-app/issues/2240)) ([ef37152](https://github.com/pagopa/io-app/commit/ef37152faae9af472125f2fad3774c085b42c351))
* [[#174893081](https://www.pivotaltracker.com/story/show/174893081)] update payment faq ([#2242](https://github.com/pagopa/io-app/issues/2242)) ([9c76d5d](https://github.com/pagopa/io-app/commit/9c76d5dc42c27eedbb8c1b2eadc68235f320dd76))
* [[#174949682](https://www.pivotaltracker.com/story/show/174949682)] Fix duplicate keys on Keypad ([#2234](https://github.com/pagopa/io-app/issues/2234)) ([59fd59f](https://github.com/pagopa/io-app/commit/59fd59faab1851c557c3a25385648ba5fdd0f21d))
* **Bonus Vacanze:** [[#175058176](https://www.pivotaltracker.com/story/show/175058176)] Fixes the color of bonus status badge text [#2248](https://github.com/pagopa/io-app/issues/2248) ([1adf361](https://github.com/pagopa/io-app/commit/1adf361cb19becdc7905a3340dcf24f54451b27f))


### Chores

* [[#174976615](https://www.pivotaltracker.com/story/show/174976615)] Rename and move CTA components ([#2235](https://github.com/pagopa/io-app/issues/2235)) ([b2f3071](https://github.com/pagopa/io-app/commit/b2f30719a393793dd4d098f9d2c0621a6b545917))
* [[#175071475](https://www.pivotaltracker.com/story/show/175071475)] Remove sensible data from developer section ([#2249](https://github.com/pagopa/io-app/issues/2249)) ([2c626ef](https://github.com/pagopa/io-app/commit/2c626ef6f2a3b313f61c66ce293930695189d499))

## [1.7.0-rc.4](https://github.com/pagopa/io-app/compare/1.7.0-rc.3...1.7.0-rc.4) (2020-09-28)


### Features

* **Bonus Pagamenti Digitali:** [[#174839834](https://www.pivotaltracker.com/story/show/174839834)] Onboarding saga orchestration ([#2216](https://github.com/pagopa/io-app/issues/2216)) ([b432bbf](https://github.com/pagopa/io-app/commit/b432bbf4b5cdff5a4f26ac3d0ac6612102e4fb01))

## [1.7.0-rc.3](https://github.com/pagopa/io-app/compare/1.7.0-rc.0...1.7.0-rc.3) (2020-09-25)


### Features

* **Bonus Pagamenti Digitali:** [[#174838425](https://www.pivotaltracker.com/story/show/174838425)] Citizen enrollment and status ([#2219](https://github.com/pagopa/io-app/issues/2219)) ([bbd4fe0](https://github.com/pagopa/io-app/commit/bbd4fe07ef3ace5cc5410e8f74d0ff2efa5c07da))
* **Bonus Pagamenti Digitali:** [[#174858345](https://www.pivotaltracker.com/story/show/174858345)] Add navigation stack for bpd onboarding ([#2206](https://github.com/pagopa/io-app/issues/2206)) ([6c6dfbe](https://github.com/pagopa/io-app/commit/6c6dfbe156e433af182c31e3554875a6e1f13b47))
* **Bonus Pagamenti Digitali:** [[#174897872](https://www.pivotaltracker.com/story/show/174897872)] Draft state, action and reducers for bpd onboarding ([#2212](https://github.com/pagopa/io-app/issues/2212)) ([d5e3e3e](https://github.com/pagopa/io-app/commit/d5e3e3e4685003d06ee00d9a2911f7f10f51d328))
* **MyPortal:** [[#174801117](https://www.pivotaltracker.com/story/show/174801117)] Adds ServicesWebviewParams codec [#2209](https://github.com/pagopa/io-app/issues/2209) ([fbba2eb](https://github.com/pagopa/io-app/commit/fbba2ebb862040b265e75c99eb9926d16a2c0d7e))
* **MyPortal:** [[#174801172](https://www.pivotaltracker.com/story/show/174801172)] Screen component for region service external webview ([#2204](https://github.com/pagopa/io-app/issues/2204)) ([4f861e4](https://github.com/pagopa/io-app/commit/4f861e454edb51ef65ada25b14ecf7ff66f82582))
* [[#172911823](https://www.pivotaltracker.com/story/show/172911823)] Update pin without logout ([#2195](https://github.com/pagopa/io-app/issues/2195)) ([63b08ff](https://github.com/pagopa/io-app/commit/63b08ffd83794657ac24d718314b4379f11d37c5))
* **MyPortal:** [[#174801195](https://www.pivotaltracker.com/story/show/174801195)] Service detail CTA ([#2217](https://github.com/pagopa/io-app/issues/2217)) ([06fbb95](https://github.com/pagopa/io-app/commit/06fbb950a0818a64bb338b1e8eaf7f5446d97063))
* **MyPortal:** [[#174859517](https://www.pivotaltracker.com/story/show/174859517)] Checks token_name on CTA actions ([#2208](https://github.com/pagopa/io-app/issues/2208)) ([3627ac9](https://github.com/pagopa/io-app/commit/3627ac9d28d8270f031bd3a9dc91cd0ca705e74c))
* **MyPortal:** [[#174881082](https://www.pivotaltracker.com/story/show/174881082)] Adds the check on params coming from store and showing alerts if something is missing ([#2214](https://github.com/pagopa/io-app/issues/2214)) ([6eef55f](https://github.com/pagopa/io-app/commit/6eef55ff88b2f873afbc4596235fe42ea59fa061))
* **MyPortal:** [[#174883732](https://www.pivotaltracker.com/story/show/174883732)] Adds MD documentation on webview injected script and original JS file ([#2220](https://github.com/pagopa/io-app/issues/2220)) ([a32cf71](https://github.com/pagopa/io-app/commit/a32cf7104384fb45652eb60ee33402b3ba6aceb7))


### Bug Fixes

* [[#174953297](https://www.pivotaltracker.com/story/show/174953297)] Reminder CTA label is wrong localized ([#2222](https://github.com/pagopa/io-app/issues/2222)) ([0e38164](https://github.com/pagopa/io-app/commit/0e38164efc155291676719fa60027037c34e1099))
* **Payments:** [[#174804073](https://www.pivotaltracker.com/story/show/174804073)] Show IUV label for notice code ([#2223](https://github.com/pagopa/io-app/issues/2223)) ([89859af](https://github.com/pagopa/io-app/commit/89859afce0d4e161ac637ff7b388a24d91366b1c))


### Chores

* [[#174596045](https://www.pivotaltracker.com/story/show/174596045)] Change api call from getProfile to getSession ([#2201](https://github.com/pagopa/io-app/issues/2201)) ([a46f228](https://github.com/pagopa/io-app/commit/a46f22898de998cc50c88bf4a9b91e5a9ee53faf))
* [[#174922141](https://www.pivotaltracker.com/story/show/174922141)] Upgrade react-native-keychain  v6.2.0 ([#2215](https://github.com/pagopa/io-app/issues/2215)) ([b3b8c82](https://github.com/pagopa/io-app/commit/b3b8c8221da2c3bd1c57dc79ca7d455faa09f98c))
* Update typo in pick_psp.md ([#2221](https://github.com/pagopa/io-app/issues/2221)) ([5de4848](https://github.com/pagopa/io-app/commit/5de4848a3f21e96dce207e817393ed2fd4a2dde3))

## [1.7.0-rc.0](https://github.com/pagopa/io-app/compare/1.6.0-rc.3...1.7.0-rc.0) (2020-09-18)


### Features

* **Android:** [[#174715029](https://www.pivotaltracker.com/story/show/174715029)] Enable hermes [#2187](https://github.com/pagopa/io-app/issues/2187) ([d21b5d9](https://github.com/pagopa/io-app/commit/d21b5d90d54c185db9123e987d97b9889669d2c3))
* [[#173639055](https://www.pivotaltracker.com/story/show/173639055)] Display all cc in wallet section ([#2196](https://github.com/pagopa/io-app/issues/2196)) ([c7e5e66](https://github.com/pagopa/io-app/commit/c7e5e666a39215454c3c24f16aa06c90fb7448f7))
* [[#173847889](https://www.pivotaltracker.com/story/show/173847889)] Implements new test-login ([#2126](https://github.com/pagopa/io-app/issues/2126)) ([ddc2dd9](https://github.com/pagopa/io-app/commit/ddc2dd9b3e229e884f3b57ce912021ae1a6bf48f))
* [[#174803269](https://www.pivotaltracker.com/story/show/174803269)] Add feature flag for BPD [#2200](https://github.com/pagopa/io-app/issues/2200) ([932676d](https://github.com/pagopa/io-app/commit/932676da0d9004271e497ac890a495f66464d2fc))
* **Bonus Pagamenti Digitali:** [[#174816293](https://www.pivotaltracker.com/story/show/174816293),[#174796530](https://www.pivotaltracker.com/story/show/174796530)] Display BDP in bonus list ([#2207](https://github.com/pagopa/io-app/issues/2207)) ([ff2c805](https://github.com/pagopa/io-app/commit/ff2c8058ea809fc6e629df880ebaebeaa800fa01))
* **My Portal:** [[#174689160](https://www.pivotaltracker.com/story/show/174689160)] Adds the script to check if injection is completed ([#2194](https://github.com/pagopa/io-app/issues/2194)) ([a8b97d2](https://github.com/pagopa/io-app/commit/a8b97d2b11dbd57292a517c83ab1713ad2923354))
* **My Portal:** [[#174693542](https://www.pivotaltracker.com/story/show/174693542)] Support internal navigation with params ([#2183](https://github.com/pagopa/io-app/issues/2183)) ([30bb32f](https://github.com/pagopa/io-app/commit/30bb32f39317f4d01b5b54baa960fb7a1c2862af))
* **My Portal:** [[#174695208](https://www.pivotaltracker.com/story/show/174695208)] Saves a cookie on web playground ([#2198](https://github.com/pagopa/io-app/issues/2198)) ([9b98a37](https://github.com/pagopa/io-app/commit/9b98a3776b6f81c751566219eee4b99fcd1b4fdb))


### Bug Fixes

* [[#174704651](https://www.pivotaltracker.com/story/show/174704651)] Cannot use the style props for typography components ([#2197](https://github.com/pagopa/io-app/issues/2197)) ([72c12ba](https://github.com/pagopa/io-app/commit/72c12ba2418118214372be43bed3fe90943b0a1a))
* [[#174845929](https://www.pivotaltracker.com/story/show/174845929)] is_inbox_enabled never enabled ([#2203](https://github.com/pagopa/io-app/issues/2203)) ([6a080d2](https://github.com/pagopa/io-app/commit/6a080d2422763bd4476ad140cb9b201fce29847b))


### Chores

* [[#174821277](https://www.pivotaltracker.com/story/show/174821277)] Debug Identification PIN creation ([#2199](https://github.com/pagopa/io-app/issues/2199)) ([ba9513a](https://github.com/pagopa/io-app/commit/ba9513a83b9002ca94cf65a8398370969ac3b31e))

## [1.6.0-rc.3](https://github.com/pagopa/io-app/compare/1.6.0-rc.2...1.6.0-rc.3) (2020-09-10)

## [1.6.0-rc.2](https://github.com/pagopa/io-app/compare/1.6.0-rc.1...1.6.0-rc.2) (2020-09-10)


### Features

* **Bonus Vacanze:** [[#174693564](https://www.pivotaltracker.com/story/show/174693564)] Remove footer when bonus is not active ([#2182](https://github.com/pagopa/io-app/issues/2182)) ([cc1cb4f](https://github.com/pagopa/io-app/commit/cc1cb4f5ff5ce671efd3eb9a3bf2fbb6afc889f3))
* **My Portal:** [[#174618758](https://www.pivotaltracker.com/story/show/174618758),[#174574621](https://www.pivotaltracker.com/story/show/174574621)] Playground to test the event handling from an external webview ([#2178](https://github.com/pagopa/io-app/issues/2178)) ([82d63ec](https://github.com/pagopa/io-app/commit/82d63ec34f2d5cc2645524b340182e662e1f6e6e))
* [[#173190756](https://www.pivotaltracker.com/story/show/173190756)] Update profile on language selection ([#2184](https://github.com/pagopa/io-app/issues/2184)) ([a22f330](https://github.com/pagopa/io-app/commit/a22f330d7ad4e25df6c2cda134473d2989b4f7da))
* [[#174712071](https://www.pivotaltracker.com/story/show/174712071)] Update and sync preferred language ([#2186](https://github.com/pagopa/io-app/issues/2186)) ([7fa533f](https://github.com/pagopa/io-app/commit/7fa533fe92657752c9c38a58eb10f08061391443))
* **My Portal:** [[#174689080](https://www.pivotaltracker.com/story/show/174689080)] Improvements on Webview playground ([#2185](https://github.com/pagopa/io-app/issues/2185)) ([67cb09d](https://github.com/pagopa/io-app/commit/67cb09de53bda1b378802159dab786aaa6069903))
* [[#174736321](https://www.pivotaltracker.com/story/show/174736321)] Add markdown playground ([#2189](https://github.com/pagopa/io-app/issues/2189)) ([7ba4a46](https://github.com/pagopa/io-app/commit/7ba4a46ed57b33b35374a573f49f6635cb73143f))


### Bug Fixes

* **Payments:** [[#174552971](https://www.pivotaltracker.com/story/show/174552971)] Notice number is wrong composed ([#2180](https://github.com/pagopa/io-app/issues/2180)) ([607c29f](https://github.com/pagopa/io-app/commit/607c29f48c7c23e538c910246b0f65afd2bb4dce))
* **Payments:** [[#174646257](https://www.pivotaltracker.com/story/show/174646257)] Display notice in place of IUV ([#2177](https://github.com/pagopa/io-app/issues/2177)) ([183d5a0](https://github.com/pagopa/io-app/commit/183d5a01f09034c3eeaa7a64f1796ecdb130deed))
* **Payments:** [[#174733925](https://www.pivotaltracker.com/story/show/174733925)] Transactions are ordered from oldest to most recent ([#2190](https://github.com/pagopa/io-app/issues/2190)) ([3250abd](https://github.com/pagopa/io-app/commit/3250abd1990fc1e4b49b30c02e59b7bca5ffc151))

## [1.6.0-rc.1](https://github.com/pagopa/io-app/compare/1.6.0-rc.0...1.6.0-rc.1) (2020-09-03)


### Features

* [[#165057751](https://www.pivotaltracker.com/story/show/165057751)] Transpile typescript with babel ([#2151](https://github.com/pagopa/io-app/issues/2151)) ([43c24af](https://github.com/pagopa/io-app/commit/43c24af566e0879e6ed22a92cf786cee8c87e51b))
* [[#174295674](https://www.pivotaltracker.com/story/show/174295674)] Reworks the description extraction on payments ([#2171](https://github.com/pagopa/io-app/issues/2171)) ([f1a4432](https://github.com/pagopa/io-app/commit/f1a44326235418ce1afe6d017918c32f9a56c2df))
* [[#174296623](https://www.pivotaltracker.com/story/show/174296623),[#173353861](https://www.pivotaltracker.com/story/show/173353861)] Minor reworks and fixes on psp and confirm payment method screen ([#2166](https://github.com/pagopa/io-app/issues/2166)) ([34b3122](https://github.com/pagopa/io-app/commit/34b3122af56d7c2df49594f5605e7f33cf4f7990))
* [[#174321085](https://www.pivotaltracker.com/story/show/174321085)] Save Bonus Vacanze screenshot ([#2156](https://github.com/pagopa/io-app/issues/2156)) ([7acb8ad](https://github.com/pagopa/io-app/commit/7acb8ad52651f68ccd481940496423c022479bf1))
* [[#174338921](https://www.pivotaltracker.com/story/show/174338921)] Convert app version to simple text not a button ([#2163](https://github.com/pagopa/io-app/issues/2163)) ([a56e0af](https://github.com/pagopa/io-app/commit/a56e0af07335eb39c0578f4d889dd9b276ce6c58))
* [[#174361107](https://www.pivotaltracker.com/story/show/174361107)] Create new common style variables ([#2160](https://github.com/pagopa/io-app/issues/2160)) ([fe3f389](https://github.com/pagopa/io-app/commit/fe3f389f4fc35aea240b650bfc612428e5f12deb))
* [[#174361165](https://www.pivotaltracker.com/story/show/174361165)] Add core typography ([#2161](https://github.com/pagopa/io-app/issues/2161)) ([5189c3f](https://github.com/pagopa/io-app/commit/5189c3f0a594b066e57aca95cc1b28af07db4738))
* [[#174574704](https://www.pivotaltracker.com/story/show/174574704)] Add My Portal project as changelog-scope ([#2173](https://github.com/pagopa/io-app/issues/2173)) ([ee4f5fd](https://github.com/pagopa/io-app/commit/ee4f5fd82688fbea224a303bb5314a6fb16902b3))
* **Bonus Vacanze:** [[#174333382](https://www.pivotaltracker.com/story/show/174333382)] Add new footer and screenshot animation in bonus detail screen ([#2175](https://github.com/pagopa/io-app/issues/2175)) ([037e733](https://github.com/pagopa/io-app/commit/037e73313ec3fcd882b6667a1bcb21fd23f3460b))


### Bug Fixes

* [[#174160259](https://www.pivotaltracker.com/story/show/174160259)] Switch label to change text on switch value change ([#2168](https://github.com/pagopa/io-app/issues/2168)) ([78110e5](https://github.com/pagopa/io-app/commit/78110e5307144655d13a081dabb19563984f3449))
* [[#174294652](https://www.pivotaltracker.com/story/show/174294652)] Wrong calendar display name on preferences screen for some devices ([#2167](https://github.com/pagopa/io-app/issues/2167)) ([1ba2421](https://github.com/pagopa/io-app/commit/1ba242128428eff618e0b2c72b4efe723bc7477d))
* [[#174301199](https://www.pivotaltracker.com/story/show/174301199)] Fixes cut message for favourite method removal ([#2164](https://github.com/pagopa/io-app/issues/2164)) ([4f5a524](https://github.com/pagopa/io-app/commit/4f5a52471f9edec5389750b4fd8b4755cdf38d0a))
* [[#174317167](https://www.pivotaltracker.com/story/show/174317167)] Hide no pagopa network label if user choose to navigate to pick psp screen ([#2170](https://github.com/pagopa/io-app/issues/2170)) ([75d38cc](https://github.com/pagopa/io-app/commit/75d38cc9ae39e6e34e05e585869ae21ec3905d3b))
* [[#174572598](https://www.pivotaltracker.com/story/show/174572598)] Pivotal project id is treated as a string ([#2172](https://github.com/pagopa/io-app/issues/2172)) ([23d6ae4](https://github.com/pagopa/io-app/commit/23d6ae44f3b39e397e5732202da9f93187edd05b))
* Gemfile.lock to reduce vulnerabilities ([#2147](https://github.com/pagopa/io-app/issues/2147)) ([0f90b26](https://github.com/pagopa/io-app/commit/0f90b2639454560ce28014f21fd0375dbf224844))
* **Android:** [[#174437875](https://www.pivotaltracker.com/story/show/174437875)] StackOverflowException on Huawei P10 lite (and similar) when using the TextInputMask ([#2165](https://github.com/pagopa/io-app/issues/2165)) ([f5c6dc0](https://github.com/pagopa/io-app/commit/f5c6dc0f79414e9c0bd83740d4236e88bcf61dbf))
* **Payments:** [[#174627683](https://www.pivotaltracker.com/story/show/174627683)] Show notice code when description is unavailable ([#2176](https://github.com/pagopa/io-app/issues/2176)) ([2f73477](https://github.com/pagopa/io-app/commit/2f73477a9b3bb1e3413a91b9b8b93021876a7ccd))


### Chores

* [[#174006350](https://www.pivotaltracker.com/story/show/174006350)] Add support to changelog scope ([#2159](https://github.com/pagopa/io-app/issues/2159)) ([2a5ed3e](https://github.com/pagopa/io-app/commit/2a5ed3e5a75306c3f8031e6f21c571e52ef54b34))
* [[#174190519](https://www.pivotaltracker.com/story/show/174190519)] Change commands for release & build ([#2157](https://github.com/pagopa/io-app/issues/2157)) ([b199388](https://github.com/pagopa/io-app/commit/b1993884bc0813edcd9fc56707d01417a3e62350))
* [[#174293075](https://www.pivotaltracker.com/story/show/174293075),[#174458516](https://www.pivotaltracker.com/story/show/174458516)] Migrate from tslint to eslint ([#2169](https://github.com/pagopa/io-app/issues/2169)) ([1cc7335](https://github.com/pagopa/io-app/commit/1cc7335a6756f3761b01dca322cdcfa7f4c8712d))
* [[#174318137](https://www.pivotaltracker.com/story/show/174318137)] Upgrade typescript to 3.9.7 ([#2154](https://github.com/pagopa/io-app/issues/2154)) ([c969d08](https://github.com/pagopa/io-app/commit/c969d08fe847a82fd8a2d9e96f1d28633db515cb))
* [[#174318377](https://www.pivotaltracker.com/story/show/174318377)] Add symbolicate to urls ignored in Reactotron ([#2153](https://github.com/pagopa/io-app/issues/2153)) ([4fa36fc](https://github.com/pagopa/io-app/commit/4fa36fc28b6f83eb16b9fd2badc0660baec1ceac))
* [[#174337387](https://www.pivotaltracker.com/story/show/174337387)] Upgrade react-native-device-info to 5.6.4 ([#2155](https://github.com/pagopa/io-app/issues/2155)) ([128ed3d](https://github.com/pagopa/io-app/commit/128ed3d7259f747f9332314b61512d26ebb07bb4))
* **My Portal:** [[#174578457](https://www.pivotaltracker.com/story/show/174578457)] Adds a feature flag for myportal integration ([#2174](https://github.com/pagopa/io-app/issues/2174)) ([fd58379](https://github.com/pagopa/io-app/commit/fd583790dbf8891846aee93a12490d6a88a9bf3b))

## [1.6.0-rc.0](https://github.com/pagopa/io-app/compare/1.5.0-rc.3...1.6.0-rc.0) (2020-08-14)


### Chores

* [[#173888442](https://www.pivotaltracker.com/story/show/173888442)] Upgrade react-native-webview to 10.4.0 [#2146](https://github.com/pagopa/io-app/issues/2146) ([0b62844](https://github.com/pagopa/io-app/commit/0b62844c7eab54cb40a95cea5112cdb217eab6fd))
* [[#173917003](https://www.pivotaltracker.com/story/show/173917003)] Upgrade redux-saga to 1.1.3 ([#2148](https://github.com/pagopa/io-app/issues/2148)) ([3ab02d2](https://github.com/pagopa/io-app/commit/3ab02d293c5c928ba1b8b097300763311cab3549))

## [1.5.0-rc.3](https://github.com/pagopa/io-app/compare/1.5.0-rc.2...1.5.0-rc.3) (2020-08-12)


### Bug Fixes

* [[#174295714](https://www.pivotaltracker.com/story/show/174295714)] Crash on android 19 & share capability disabled on Android sdk <= 19 ([#2152](https://github.com/pagopa/io-app/issues/2152)) ([94f22c5](https://github.com/pagopa/io-app/commit/94f22c54f0368733081b56dbb9a1718ff396dc42))

## [1.5.0-rc.2](https://github.com/pagopa/io-app/compare/1.5.0-rc.1...1.5.0-rc.2) (2020-08-11)


### Features

* [[#172371297](https://www.pivotaltracker.com/story/show/172371297)] forwards additional events (identification/CIE) to mixpanel ([#1729](https://github.com/pagopa/io-app/issues/1729)) ([628fab6](https://github.com/pagopa/io-app/commit/628fab6299c8ebe6ff2126f1c6f45dca841986c2))
* [[#173735284](https://www.pivotaltracker.com/story/show/173735284)] Display support_url metadata ([#2149](https://github.com/pagopa/io-app/issues/2149)) ([1b65baa](https://github.com/pagopa/io-app/commit/1b65baa7635566669bc273dc72af25e31aa2499d))
* [[#174034065](https://www.pivotaltracker.com/story/show/174034065)] Add info about session expiration ([#2142](https://github.com/pagopa/io-app/issues/2142)) ([f93f804](https://github.com/pagopa/io-app/commit/f93f804a0ec29bb355088c2ba49f846217056caa))
* [[#174034065](https://www.pivotaltracker.com/story/show/174034065)] Show details about session expired ([#2150](https://github.com/pagopa/io-app/issues/2150)) ([1c6b6b6](https://github.com/pagopa/io-app/commit/1c6b6b62db31ddd8819169bef86a9ec369e684ba))
* [[#174213277](https://www.pivotaltracker.com/story/show/174213277)] Add more details in TransactionDetailScreen ([#2145](https://github.com/pagopa/io-app/issues/2145)) ([46b95a9](https://github.com/pagopa/io-app/commit/46b95a981d83aa7b1fd7eb527d74c38e9a5d5fcd))


### Bug Fixes

* [[#172625344](https://www.pivotaltracker.com/story/show/172625344)] Change icons order for base header [#1812](https://github.com/pagopa/io-app/issues/1812) ([e2f6a3f](https://github.com/pagopa/io-app/commit/e2f6a3ffb8f45d2ea27d442bbc309e83bc976e6c))
* [[#173217033](https://www.pivotaltracker.com/story/show/173217033)] Restores pin insertion when disabling the biometry ([#2140](https://github.com/pagopa/io-app/issues/2140)) ([bbfee11](https://github.com/pagopa/io-app/commit/bbfee1102d24135e3fa67adc8c960a8b1afc07e2))
* [[#173937093](https://www.pivotaltracker.com/story/show/173937093)] Add /v1/psps/all API ([#2091](https://github.com/pagopa/io-app/issues/2091)) ([63fa72f](https://github.com/pagopa/io-app/commit/63fa72f976222976bf7ab9cb77c4ee92d7b5edc3))
* [[#173937093](https://www.pivotaltracker.com/story/show/173937093)] Messages: refresh indicator not shown on iOS devices ([#2131](https://github.com/pagopa/io-app/issues/2131)) ([eb4b59f](https://github.com/pagopa/io-app/commit/eb4b59f9228e4909fe83f443b68f61c3f6078395))
* [[#173964550](https://www.pivotaltracker.com/story/show/173964550)] Fixes the calculation of the fee ([#2124](https://github.com/pagopa/io-app/issues/2124)) ([cd43abe](https://github.com/pagopa/io-app/commit/cd43abed705db7217af3c0033792543c7e4fee0f))
* [[#174160605](https://www.pivotaltracker.com/story/show/174160605)] Empty urls causes crash [Android] ([#2125](https://github.com/pagopa/io-app/issues/2125)) ([8df2082](https://github.com/pagopa/io-app/commit/8df208219289575a22348be21f3b9d4540953028))
* [[#174179069](https://www.pivotaltracker.com/story/show/174179069)] fix pin insertion overflow ([#2127](https://github.com/pagopa/io-app/issues/2127)) ([c3fc106](https://github.com/pagopa/io-app/commit/c3fc106ed64b2313da978724129cf4a9f3f087d0))
* [[#174186215](https://www.pivotaltracker.com/story/show/174186215)] wrong checkbox rendering in IngressScreen ([#2135](https://github.com/pagopa/io-app/issues/2135)) ([b0ea88d](https://github.com/pagopa/io-app/commit/b0ea88dd6891533d0a2c7f31226d2f883528c2c6))
* [[#174193232](https://www.pivotaltracker.com/story/show/174193232)] Keyboard remaining opened after confirm a manual payment on Android [#2136](https://github.com/pagopa/io-app/issues/2136) ([c6a0bb7](https://github.com/pagopa/io-app/commit/c6a0bb79bc995ea13c087dd1d7f93628e1d2e6e5))
* [[#174193291](https://www.pivotaltracker.com/story/show/174193291)] Fixes the sticky headers on message deadlines component ([#2129](https://github.com/pagopa/io-app/issues/2129)) ([1543a83](https://github.com/pagopa/io-app/commit/1543a834b4dc911e91f42a28f638cad7108a2576))
* [[#174193708](https://www.pivotaltracker.com/story/show/174193708),[#174004231](https://www.pivotaltracker.com/story/show/174004231)] Update italia-pagopa-commons from 1.2.0 to 1.3.0 ([#2132](https://github.com/pagopa/io-app/issues/2132)) ([98b0496](https://github.com/pagopa/io-app/commit/98b0496fac3489d6ee5e7ea6edd4a1e236904f60))
* [[#174212731](https://www.pivotaltracker.com/story/show/174212731)] Fixes the top spacing on section cards component [#2139](https://github.com/pagopa/io-app/issues/2139) ([2ef24d7](https://github.com/pagopa/io-app/commit/2ef24d761da99f86db03981b28a66ae47e2ca6a2))
* [[#174212919](https://www.pivotaltracker.com/story/show/174212919)] Show alert when deselecting a favourite method on method detail screen ([#2137](https://github.com/pagopa/io-app/issues/2137)) ([5884615](https://github.com/pagopa/io-app/commit/5884615c5a3e565a2923bf427ea79bf0acf5847e))
* [[#174252923](https://www.pivotaltracker.com/story/show/174252923)] Profile tab becomes untouchable after following specific navigation paths [#2144](https://github.com/pagopa/io-app/issues/2144) ([5aea422](https://github.com/pagopa/io-app/commit/5aea42214775414edc8feccc424450b03c77d016))


### Chores

* [[#174006281](https://www.pivotaltracker.com/story/show/174006281)] automatically append changelog prefix to pr title ([#2133](https://github.com/pagopa/io-app/issues/2133)) ([793e8e4](https://github.com/pagopa/io-app/commit/793e8e4cf7d031a56d60243cc6f6d5a7b93a8a88))
* [[#174161476](https://www.pivotaltracker.com/story/show/174161476)] Create unique fee showing conditions ([#2141](https://github.com/pagopa/io-app/issues/2141)) ([f9aa91e](https://github.com/pagopa/io-app/commit/f9aa91e602a3d1eff6ea29f365f0ff52cba8eb52))
* [[#174208450](https://www.pivotaltracker.com/story/show/174208450)] clean pod file ([#2130](https://github.com/pagopa/io-app/issues/2130)) ([a26b0ec](https://github.com/pagopa/io-app/commit/a26b0ec699593c61b0229ddad9ab4edb58420d31))
* [[#174212106](https://www.pivotaltracker.com/story/show/174212106)] Refactor openUrl ([#2143](https://github.com/pagopa/io-app/issues/2143)) ([bb1a5af](https://github.com/pagopa/io-app/commit/bb1a5af555b440d53b12586cbcd595d041f07460))
* [[#174228888](https://www.pivotaltracker.com/story/show/174228888)] Restore clean installation ([#2138](https://github.com/pagopa/io-app/issues/2138)) ([3dfee5f](https://github.com/pagopa/io-app/commit/3dfee5f069babbb7230b9d4114d3bd71d319f2a0))

## [1.5.0-rc.1](https://github.com/pagopa/io-app/compare/1.4.0-rc.2...1.5.0-rc.1) (2020-08-05)


### Features

* [[#173890674](https://www.pivotaltracker.com/story/show/173890674)] Refactoring props for accessibility events on base header ([#2087](https://github.com/pagopa/io-app/issues/2087)) ([d2f421e](https://github.com/pagopa/io-app/commit/d2f421e0bfc8e1c83b4a0a7931ab68a3d51a600f))
* [[#173984252](https://www.pivotaltracker.com/story/show/173984252)] Improves accessibility on wallet home ([#2104](https://github.com/pagopa/io-app/issues/2104)) ([b9eeb06](https://github.com/pagopa/io-app/commit/b9eeb06588de18132dd94430034b543bc11e5eb5))
* [[#174033394](https://www.pivotaltracker.com/story/show/174033394)] display ente beneficiario data ([#2106](https://github.com/pagopa/io-app/issues/2106)) ([73aeb26](https://github.com/pagopa/io-app/commit/73aeb26e5978898e1480c7bbf9396ad5311d2b2f))
* [[#174089908](https://www.pivotaltracker.com/story/show/174089908)] Improve accessibility bonus description screen ([#2118](https://github.com/pagopa/io-app/issues/2118)) ([b3dcb7b](https://github.com/pagopa/io-app/commit/b3dcb7b54e9255b79760359b01ac0cbd271d52d2))


### Bug Fixes

* [[#173263990](https://www.pivotaltracker.com/story/show/173263990)] Fixes wrong defined faq 8 text ([#2109](https://github.com/pagopa/io-app/issues/2109)) ([3366db5](https://github.com/pagopa/io-app/commit/3366db5db8ef0b39bd63378cf4b43138cff02b92))
* [[#173529079](https://www.pivotaltracker.com/story/show/173529079)] Alert text display cut on calendar perms ([#2110](https://github.com/pagopa/io-app/issues/2110)) ([46fe9c9](https://github.com/pagopa/io-app/commit/46fe9c9085661c0448e662fb3a8fc3d422ae6678))
* [[#174085364](https://www.pivotaltracker.com/story/show/174085364)] messagesStatus store section cleaning ([#2114](https://github.com/pagopa/io-app/issues/2114)) ([fbed0bf](https://github.com/pagopa/io-app/commit/fbed0bfde58ba7ad2a5298f87809086733ff6eff))
* [[#174099632](https://www.pivotaltracker.com/story/show/174099632)] Fix the back handler from transaction detail to cards transactions ([#2120](https://github.com/pagopa/io-app/issues/2120)) ([71895c7](https://github.com/pagopa/io-app/commit/71895c7a6006bd2fbdabb16bfc96b0124cb31836))
* [[#174115403](https://www.pivotaltracker.com/story/show/174115403)] add useCleartextTraffic to true ([#2119](https://github.com/pagopa/io-app/issues/2119)) ([7ceda47](https://github.com/pagopa/io-app/commit/7ceda474c3d0c018baf4891e758d3a58467653e3))
* [[#174119099](https://www.pivotaltracker.com/story/show/174119099)] Display app version ([#2122](https://github.com/pagopa/io-app/issues/2122)) ([4dd9763](https://github.com/pagopa/io-app/commit/4dd97634bcd69a294dff6d397fe3d8ae6211ea24))
* Don't use the arrows if there's no submenu. ([#2117](https://github.com/pagopa/io-app/issues/2117)) ([0ecd486](https://github.com/pagopa/io-app/commit/0ecd4868c65ce631179cfc9ff590b05c26cbbff6))


### Chores

* [[#173888215](https://www.pivotaltracker.com/story/show/173888215)] Upgrade React Native to 0.63.2 ([#2107](https://github.com/pagopa/io-app/issues/2107)) ([8decb5a](https://github.com/pagopa/io-app/commit/8decb5a90e43ffbf9ca09d8bface3ce290a4c7c2))
* [[#173987881](https://www.pivotaltracker.com/story/show/173987881)] Unify app version display ([#2111](https://github.com/pagopa/io-app/issues/2111)) ([9c4c04b](https://github.com/pagopa/io-app/commit/9c4c04b1416aec21f2c3002240546f7fe57ac659))
* [[#174010680](https://www.pivotaltracker.com/story/show/174010680)] Change checked urls with IO-cdn ([#2103](https://github.com/pagopa/io-app/issues/2103)) ([4c3a859](https://github.com/pagopa/io-app/commit/4c3a8599a3f97ef114818b17048bc3fe72458fd3))

## [1.4.0-rc.2](https://github.com/pagopa/io-app/compare/1.4.0-rc.1...1.4.0-rc.2) (2020-07-28)


### Features

* [[#172455914](https://www.pivotaltracker.com/story/show/172455914)] Organize available calendars by account ([#2098](https://github.com/pagopa/io-app/issues/2098)) ([8d5fbe5](https://github.com/pagopa/io-app/commit/8d5fbe52eaf50c292e7ac7bdf8519911a51fea75))
* [[#172519295](https://www.pivotaltracker.com/story/show/172519295)] Adds the check session on application state changes and on pin success insertion ([#1745](https://github.com/pagopa/io-app/issues/1745)) ([5db8cd1](https://github.com/pagopa/io-app/commit/5db8cd13d107f55e8d9ba5e2959445f84207a6e8))
* [[#173848517](https://www.pivotaltracker.com/story/show/173848517)] Parametric label and hint on inputPlaceholder ([#2088](https://github.com/pagopa/io-app/issues/2088)) ([a2b15be](https://github.com/pagopa/io-app/commit/a2b15be3dc6737d3bb3f7cfd9307a393e729103e))
* [[#173984179](https://www.pivotaltracker.com/story/show/173984179)] forces the focus on identification modal ([#2101](https://github.com/pagopa/io-app/issues/2101)) ([5a7f1ee](https://github.com/pagopa/io-app/commit/5a7f1ee36c8cbbde1045a9eb31ee02d1241fd0f5))


### Bug Fixes

* )[[#174005728](https://www.pivotaltracker.com/story/show/174005728),[#174005947](https://www.pivotaltracker.com/story/show/174005947)] All psp are filtered  ([#2099](https://github.com/pagopa/io-app/issues/2099)) ([8c6bca0](https://github.com/pagopa/io-app/commit/8c6bca0a436c66ae95a10748cfd41e4ea05c17df))
* [[#173984610](https://www.pivotaltracker.com/story/show/173984610)] Android alpha build is created at each master commit ([#2097](https://github.com/pagopa/io-app/issues/2097)) ([ae0a28d](https://github.com/pagopa/io-app/commit/ae0a28d1ee07ff53210548f9ef8e5ffa755f7972))
* disable fastlane tag creation ([#2095](https://github.com/pagopa/io-app/issues/2095)) ([06f4fc7](https://github.com/pagopa/io-app/commit/06f4fc7492d396bc77ea072c9cf2edcc944757be))


### Chores

* [[#173984555](https://www.pivotaltracker.com/story/show/173984555)] Change Android gradle versionName format ([#2096](https://github.com/pagopa/io-app/issues/2096)) ([a7d56ca](https://github.com/pagopa/io-app/commit/a7d56ca362838bf8f3f04cab2521fa6d1655958e))
* [[#173998756](https://www.pivotaltracker.com/story/show/173998756)] Fixes font-size on Markdown component ([#2100](https://github.com/pagopa/io-app/issues/2100)) ([78f571d](https://github.com/pagopa/io-app/commit/78f571d1d75c1972aa2df2b5d2ef5f243d667b6b))
* [[#174024289](https://www.pivotaltracker.com/story/show/174024289)] Disable e2e tests manual trigger for "build" workflow [#2105](https://github.com/pagopa/io-app/issues/2105) ([43c6de3](https://github.com/pagopa/io-app/commit/43c6de3173219e968e4d8e04b68196ec6fbee309))

## 1.4.0-rc.1 (2020-07-24)


### Features

* )Update index.yml ([#2002](https://github.com/pagopa/io-app/issues/2002)) ([10ab20f](https://github.com/pagopa/io-app/commit/10ab20fd476a0def5f4f3e547cf61fef4d5d308e))
* [[[#173640797](https://www.pivotaltracker.com/story/show/173640797)] Display alert for tablet ([#2007](https://github.com/pagopa/io-app/issues/2007)) ([2f61405](https://github.com/pagopa/io-app/commit/2f614051bc92d615ae5341a0f9dffacecba0b7a1))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([6504f53](https://github.com/pagopa/io-app/commit/6504f5306465751e0ce5febeb444af6a14bf4962))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([7bdfda6](https://github.com/pagopa/io-app/commit/7bdfda6b6f6f4bdb85f6d6e3f54678b0990542a6))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([f131243](https://github.com/pagopa/io-app/commit/f131243d18391282c7345ba9ce6bbb1dd7cd2be6))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([add6945](https://github.com/pagopa/io-app/commit/add6945e08399aa5c628034c8ad9a790947acd10))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([332da39](https://github.com/pagopa/io-app/commit/332da392a9c8bc752c3379c5dcb71b491ce2c4a8))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([762f66d](https://github.com/pagopa/io-app/commit/762f66da5ef3f6936e155eb9abb879e7af4937f6))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([e8b7de3](https://github.com/pagopa/io-app/commit/e8b7de34efe02e741cd0f7ac7e9ade16d4bde5d8))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([19cbc4a](https://github.com/pagopa/io-app/commit/19cbc4a25191b1735a635178e1d74db52f0213fb))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([58f7566](https://github.com/pagopa/io-app/commit/58f7566481180a3374c06829775f988d6d36c8e1))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([f470f2c](https://github.com/pagopa/io-app/commit/f470f2cd969ed74b8cf19154068b189f980391ba))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([eb5542e](https://github.com/pagopa/io-app/commit/eb5542e23cd362546cf829b57a5d5bd680177123))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([958a293](https://github.com/pagopa/io-app/commit/958a293a2f97129c26984261328b2049fd3680f0))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1982](https://github.com/pagopa/io-app/issues/1982)) ([b3fe3b8](https://github.com/pagopa/io-app/commit/b3fe3b8e858e178b72c88118d8f9fc207d9b23e8))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq ([#1995](https://github.com/pagopa/io-app/issues/1995)) ([b44f1d5](https://github.com/pagopa/io-app/commit/b44f1d5fee56098db6630dc1097d917325504909))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] Traduzione faq (2) [#1976](https://github.com/pagopa/io-app/issues/1976) ([f5b6c42](https://github.com/pagopa/io-app/commit/f5b6c425d9eefa5a634c800eff305a1a38df89dd))
* [[#172149906](https://www.pivotaltracker.com/story/show/172149906)] traduzione faq [#1975](https://github.com/pagopa/io-app/issues/1975) ([83d8591](https://github.com/pagopa/io-app/commit/83d85916e8c65c17ac853de5dc6f424ec12fde93))
* [[#172371262](https://www.pivotaltracker.com/story/show/172371262)] Add tests for identification reducers ([#1809](https://github.com/pagopa/io-app/issues/1809)) ([0af1ddb](https://github.com/pagopa/io-app/commit/0af1ddb3d6d96de87ffb186471058e29be4ec0c9))
* [[#172429524](https://www.pivotaltracker.com/story/show/172429524)] Show modal if rooted / jailbroken ([#1961](https://github.com/pagopa/io-app/issues/1961)) ([fa235ab](https://github.com/pagopa/io-app/commit/fa235ab2725126172464b631e79cc2d3e64dc8fd))
* [[#172526356](https://www.pivotaltracker.com/story/show/172526356)] Adds Screen to explain why CIE login is not available ([#1769](https://github.com/pagopa/io-app/issues/1769)) ([5bc9437](https://github.com/pagopa/io-app/commit/5bc9437ad2c5eeaa6019f01eec179807a534b618))
* [[#172800619](https://www.pivotaltracker.com/story/show/172800619)] unify styles of slided screens ([#1800](https://github.com/pagopa/io-app/issues/1800)) ([e401284](https://github.com/pagopa/io-app/commit/e4012841b97b17798ca928b6308e308f503cefdc))
* [[#172889149](https://www.pivotaltracker.com/story/show/172889149)] Automatic changelog and versioning generation ([#1838](https://github.com/pagopa/io-app/issues/1838)) ([e39eb31](https://github.com/pagopa/io-app/commit/e39eb31155e09afd5142538559cb5e09310b0fc9))
* [[#172962750](https://www.pivotaltracker.com/story/show/172962750)] Create feature flag for "bonus vacanze" & stub for folder hierarchy ([#1839](https://github.com/pagopa/io-app/issues/1839)) ([9b2a7e5](https://github.com/pagopa/io-app/commit/9b2a7e59d2b0a14c6c875652a1e0c05465371812))
* [[#172975727](https://www.pivotaltracker.com/story/show/172975727)] Adds the bonus information screen ([#1850](https://github.com/pagopa/io-app/issues/1850)) ([4ca3b57](https://github.com/pagopa/io-app/commit/4ca3b5721c71d7d8f4582385390d96a8e5fa7850))
* [[#172975907](https://www.pivotaltracker.com/story/show/172975907)] Adds a button to request a new bonus on the wallet home and displays the active bonus ([#1840](https://github.com/pagopa/io-app/issues/1840)) ([a18464a](https://github.com/pagopa/io-app/commit/a18464a7cdd54dc05991a31e2c5996bca5f71e8a))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Add bonus-vacanze API support ([#1843](https://github.com/pagopa/io-app/issues/1843)) ([6cfb956](https://github.com/pagopa/io-app/commit/6cfb956596348991100493809ebc3fed38f2b329))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Add get bonus from id API ([#1857](https://github.com/pagopa/io-app/issues/1857)) ([da0d8ac](https://github.com/pagopa/io-app/commit/da0d8accf82ac313d8b2180752c2521aeaaca4dc))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Add qr_code type as array of items ([#1859](https://github.com/pagopa/io-app/issues/1859)) ([e551728](https://github.com/pagopa/io-app/commit/e551728c069041ac7275fdf8da092932f6b9225a))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Add startBonusActivationProcedure ([#1885](https://github.com/pagopa/io-app/issues/1885)) ([218e5cb](https://github.com/pagopa/io-app/commit/218e5cbef791e15d028e16a27c2bc5f9dd7d087b))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Align bonus data types with the last ones ([#1890](https://github.com/pagopa/io-app/issues/1890)) ([9075a92](https://github.com/pagopa/io-app/commit/9075a926101cf2902ac0fa318fa2a70d1eb340e8))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Align bonus data types with the official ones ([#1882](https://github.com/pagopa/io-app/issues/1882)) ([92a0a0e](https://github.com/pagopa/io-app/commit/92a0a0eee93d4f64e36faf81e29b5ec41b141d1c))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Handle blocking errors on check eligibility ([#1884](https://github.com/pagopa/io-app/issues/1884)) ([a45fd7c](https://github.com/pagopa/io-app/commit/a45fd7cbe52828fefdfeb6fcf529163e687aa2c3))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Handling load all active bonus list and store refactor ([#1921](https://github.com/pagopa/io-app/issues/1921)) ([db004dd](https://github.com/pagopa/io-app/commit/db004dd94b0b90eefd457db89fe739f6848734b5))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Improve eligibility check ([#1920](https://github.com/pagopa/io-app/issues/1920)) ([02314ea](https://github.com/pagopa/io-app/commit/02314ea9e347eb6b7961603d28e642bb041095d8))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] rename store section bonusVacanze -> bonusVacanzeActivation ([#1860](https://github.com/pagopa/io-app/issues/1860)) ([49e7e38](https://github.com/pagopa/io-app/commit/49e7e3898aebdd5a5b4d27bb210e230e37cde849))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] Sync bonus vacanze with last API specs ([#1903](https://github.com/pagopa/io-app/issues/1903)) ([437c85c](https://github.com/pagopa/io-app/commit/437c85c4a06ef42ef85b551b880bcdf7240d794b))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] sync with eligibility API POST/GET ([#1855](https://github.com/pagopa/io-app/issues/1855)) ([772e6cb](https://github.com/pagopa/io-app/commit/772e6cb9c43044cb8857a8435d367bdfa8c8d2a2))
* [[#172989345](https://www.pivotaltracker.com/story/show/172989345)] update status codes with last specs ([#1887](https://github.com/pagopa/io-app/issues/1887)) ([c324bf3](https://github.com/pagopa/io-app/commit/c324bf3dfbc058cf3e337fb529065136a8a44249))
* [[#172989379](https://www.pivotaltracker.com/story/show/172989379)] ISEE not eligible screen ([#1846](https://github.com/pagopa/io-app/issues/1846)) ([9cfc0ef](https://github.com/pagopa/io-app/commit/9cfc0ef832cd2911325d809f967c2477a3285ac2))
* [[#172989450](https://www.pivotaltracker.com/story/show/172989450)] Completes information in ActiveBonus component ([#1842](https://github.com/pagopa/io-app/issues/1842)) ([e0f5a39](https://github.com/pagopa/io-app/commit/e0f5a398e851b3cd4edb03b10fa3e00d55849191))
* [[#172989461](https://www.pivotaltracker.com/story/show/172989461)] Active bonus detail screen ([#1862](https://github.com/pagopa/io-app/issues/1862)) ([11b7f2f](https://github.com/pagopa/io-app/commit/11b7f2fa91b144162a2da0dd79a6e421141c25f1))
* [[#172992621](https://www.pivotaltracker.com/story/show/172992621)] Adds the available list screen and load the available bonuses ([#1848](https://github.com/pagopa/io-app/issues/1848)) ([2d085ba](https://github.com/pagopa/io-app/commit/2d085babd1b7353dba0b6f4925008ed9425e7757))
* [[#172992641](https://www.pivotaltracker.com/story/show/172992641)] Check bonus eligibility ([#1841](https://github.com/pagopa/io-app/issues/1841)) ([a4b4a5b](https://github.com/pagopa/io-app/commit/a4b4a5be9e6f3919e9ce6a1292fffafcaf920b10))
* [[#172992652](https://www.pivotaltracker.com/story/show/172992652)] Activate bonus screen ([#1853](https://github.com/pagopa/io-app/issues/1853)) ([c0de9e8](https://github.com/pagopa/io-app/commit/c0de9e81eb7e850e3b85f1cc9fad31f4ee8cc172))
* [[#172992680](https://www.pivotaltracker.com/story/show/172992680)] Adds Bonus Tos Screen ([#1856](https://github.com/pagopa/io-app/issues/1856)) ([df2dab7](https://github.com/pagopa/io-app/commit/df2dab7c6501ec5e91ca2e32f693b6fcc0cc0add))
* [[#173011036](https://www.pivotaltracker.com/story/show/173011036)] Dispatch bonusvacanze action to mixpanel ([#1947](https://github.com/pagopa/io-app/issues/1947)) ([7d87b31](https://github.com/pagopa/io-app/commit/7d87b31aa00c0b36e1a883489025ce7d0ae8e4d2))
* [[#173031294](https://www.pivotaltracker.com/story/show/173031294)] add euro symbol on total amount ([#1851](https://github.com/pagopa/io-app/issues/1851)) ([6d9a0aa](https://github.com/pagopa/io-app/commit/6d9a0aa489f0b86810974df5cda9f3f20ddd0407))
* [[#173054348](https://www.pivotaltracker.com/story/show/173054348)] Verify bonus eligibility workflow ([#1861](https://github.com/pagopa/io-app/issues/1861)) ([202eefc](https://github.com/pagopa/io-app/commit/202eefce6174b6dd3be569b12f7abf19eece0337))
* [[#173063353](https://www.pivotaltracker.com/story/show/173063353)] Share the Bonus QR Code - Secret code ([#1863](https://github.com/pagopa/io-app/issues/1863)) ([951fbdf](https://github.com/pagopa/io-app/commit/951fbdfe11cdf3a346224837e246ad89f912b540))
* [[#173077316](https://www.pivotaltracker.com/story/show/173077316)] Timeout eligibility screen ([#1864](https://github.com/pagopa/io-app/issues/1864)) ([77f8efa](https://github.com/pagopa/io-app/commit/77f8efa1375575283cd10707d1ef8f3995140eb8))
* [[#173083143](https://www.pivotaltracker.com/story/show/173083143)] improve app accessibility ([#1998](https://github.com/pagopa/io-app/issues/1998)) ([69a7d7c](https://github.com/pagopa/io-app/commit/69a7d7c41cceec5a11dcf6cfc54798f6b0768ef3))
* [[#173102211](https://www.pivotaltracker.com/story/show/173102211)] Adds the navigation flow through request bonus and checks if can be performed a new request ([#1867](https://github.com/pagopa/io-app/issues/1867)) ([d5c8008](https://github.com/pagopa/io-app/commit/d5c8008145cfaa55c297c6e9c2711a4800ad5e56))
* [[#173102267](https://www.pivotaltracker.com/story/show/173102267)] Add a selector to know if a bonus vacanze is requestable ([#1866](https://github.com/pagopa/io-app/issues/1866)) ([85eacb8](https://github.com/pagopa/io-app/commit/85eacb8ee010fa721ff7eb09c7048c488d4f8496))
* [[#173102302](https://www.pivotaltracker.com/story/show/173102302)] Load activate bonus ([#1865](https://github.com/pagopa/io-app/issues/1865)) ([06deaf5](https://github.com/pagopa/io-app/commit/06deaf5b085613c052e1ae0d34683448d6b04628))
* [[#173102366](https://www.pivotaltracker.com/story/show/173102366)] Timeout activation screen ([#1881](https://github.com/pagopa/io-app/issues/1881)) ([2021c4e](https://github.com/pagopa/io-app/commit/2021c4e638c33bf2cd5d22e01a95bd043fd42560))
* [[#173102430](https://www.pivotaltracker.com/story/show/173102430)] Bonus activation confirmation ([#1868](https://github.com/pagopa/io-app/issues/1868)) ([3b21038](https://github.com/pagopa/io-app/commit/3b21038b629e9f824e69c3bc287dd58af583fee0))
* [[#173103563](https://www.pivotaltracker.com/story/show/173103563)] Move all bonus routes under bonusVacanze directory and remove bottom bar from all bonus routes ([#1871](https://github.com/pagopa/io-app/issues/1871)) ([13ab58d](https://github.com/pagopa/io-app/commit/13ab58db8c9763bf488c90f1f6deb9827f463dda))
* [[#173146727](https://www.pivotaltracker.com/story/show/173146727),[#172555084](https://www.pivotaltracker.com/story/show/172555084)] Update contextual help for spid login ([#1889](https://github.com/pagopa/io-app/issues/1889)) ([1446973](https://github.com/pagopa/io-app/commit/1446973a89a39151791d04b4af2d13295f25338c))
* [#173146850] Adds the new subsidy method on list ([#1875](https://github.com/pagopa/io-app/issues/1875)) ([e22ae26](https://github.com/pagopa/io-app/commit/e22ae2626c434a28cc1e6344ceddb80e4bac8368))
* [[#173146876](https://www.pivotaltracker.com/story/show/173146876)] Bonus list UI alignment ([#1877](https://github.com/pagopa/io-app/issues/1877)) ([1107ba1](https://github.com/pagopa/io-app/commit/1107ba1b4d7efa5517539652ac6884d6b2de98bc))
* [[#173146890](https://www.pivotaltracker.com/story/show/173146890)] Align bonus available type with the remote data ([#1869](https://github.com/pagopa/io-app/issues/1869)) ([6d8f969](https://github.com/pagopa/io-app/commit/6d8f969f3b10baa67cea6ec6f19d30dea3f86875))
* [[#173147132](https://www.pivotaltracker.com/story/show/173147132)] Send chunked log to instabug ([#1870](https://github.com/pagopa/io-app/issues/1870)) ([be27ebb](https://github.com/pagopa/io-app/commit/be27ebbf8e1f0e5c34bd94d4f9e50984b665d3ec))
* [#173147555] UI refinement of bonus information screen ([#1883](https://github.com/pagopa/io-app/issues/1883)) ([161be46](https://github.com/pagopa/io-app/commit/161be46154f23e5c740e81c1c5ef59399d94737b))
* [[#173148005](https://www.pivotaltracker.com/story/show/173148005)] Timeout bonus eligibility Screen refinement ([#1872](https://github.com/pagopa/io-app/issues/1872)) ([5a938fa](https://github.com/pagopa/io-app/commit/5a938fa514da56fc3a0b7e33b694d1d12d7a0e29))
* [[#173148021](https://www.pivotaltracker.com/story/show/173148021)] ISEE not eligible refinement ([#1873](https://github.com/pagopa/io-app/issues/1873)) ([a44841c](https://github.com/pagopa/io-app/commit/a44841c72bbea3e48a230aa8325c5c44ae045c6e))
* [[#173148536](https://www.pivotaltracker.com/story/show/173148536)] Load IDPS info texts ([#1874](https://github.com/pagopa/io-app/issues/1874)) ([dc391ca](https://github.com/pagopa/io-app/commit/dc391ca142940eaffd639b55aa456ef0cc667be1))
* [[#173155338](https://www.pivotaltracker.com/story/show/173155338)] Handle Bonus Activation pending ([#1909](https://github.com/pagopa/io-app/issues/1909)) ([005293f](https://github.com/pagopa/io-app/commit/005293f78398e8e746918c03bde47b6ebdf69dbe))
* [[#173155362](https://www.pivotaltracker.com/story/show/173155362)] Handle 403 status on bonus eligibility start ([#1905](https://github.com/pagopa/io-app/issues/1905)) ([e5cbfb5](https://github.com/pagopa/io-app/commit/e5cbfb531c10c4f63bdd8d801f9b2d2e5b5ad168))
* [[#173156682](https://www.pivotaltracker.com/story/show/173156682)] Graphical refinement for LoadBonusEligibilityScreen, IseeNotAvailableScreen, LoadActivateBonusScreen and ActivateBonusCompletedScreen ([#1876](https://github.com/pagopa/io-app/issues/1876)) ([7595167](https://github.com/pagopa/io-app/commit/75951676265eedb3ff4ce38a15e8c1b7548cc296))
* [[#173157535](https://www.pivotaltracker.com/story/show/173157535)] Activate bonus request rework ([#1892](https://github.com/pagopa/io-app/issues/1892)) ([27158ad](https://github.com/pagopa/io-app/commit/27158add86887456d36af5996cebd206585cb1ab))
* [[#173168958](https://www.pivotaltracker.com/story/show/173168958)] UI refinement of bonus request component ([#1897](https://github.com/pagopa/io-app/issues/1897)) ([46e7225](https://github.com/pagopa/io-app/commit/46e72256839e4dbe4b3a810ef701a59edf11fe65))
* [[#173171577](https://www.pivotaltracker.com/story/show/173171577)] Extract front-matter CTA data from message content ([#1936](https://github.com/pagopa/io-app/issues/1936)) ([b9ba859](https://github.com/pagopa/io-app/commit/b9ba859200159464629aca905bf58f14d625e105))
* [[#173172424](https://www.pivotaltracker.com/story/show/173172424),[#173418452](https://www.pivotaltracker.com/story/show/173418452)] Add info banner assistance working hours ([#1925](https://github.com/pagopa/io-app/issues/1925)) ([ca58948](https://github.com/pagopa/io-app/commit/ca58948ff9411b572e9a3d5e78651e2d0f33c98b))
* [[#173176386](https://www.pivotaltracker.com/story/show/173176386)] Rework eligibility workflow ([#1888](https://github.com/pagopa/io-app/issues/1888)) ([9c4ea3b](https://github.com/pagopa/io-app/commit/9c4ea3b19551b4acfbade6981671535520a225db))
* [[#173176837](https://www.pivotaltracker.com/story/show/173176837)] Adds status badge on bonus detail screen ([#1880](https://github.com/pagopa/io-app/issues/1880)) ([b4f8ebf](https://github.com/pagopa/io-app/commit/b4f8ebfb93d3e497295a4dc55e3cabff04a85b87))
* [#173223774] Adds the service detail request on AvailableBonusItem and BonusInformationScreen ([#1886](https://github.com/pagopa/io-app/issues/1886)) ([bf93edd](https://github.com/pagopa/io-app/commit/bf93edd536ac0cacd7a73f50b920953c676e0a4f))
* [[#173225656](https://www.pivotaltracker.com/story/show/173225656)] Force bonus vacanze service activation ([#1949](https://github.com/pagopa/io-app/issues/1949)) ([922087b](https://github.com/pagopa/io-app/commit/922087b5a42a06d3787873bf166ba103346376f6))
* [[#173262868](https://www.pivotaltracker.com/story/show/173262868)] Bonus detail screen ui refinement ([#1894](https://github.com/pagopa/io-app/issues/1894)) ([31fbf95](https://github.com/pagopa/io-app/commit/31fbf95a8e2114c73dc9dce9f22fc234cc0b8217))
* [[#173269238](https://www.pivotaltracker.com/story/show/173269238)] Remove Bonus Available mocked type definition ([#1896](https://github.com/pagopa/io-app/issues/1896)) ([91edba7](https://github.com/pagopa/io-app/commit/91edba7abb2260a03fe145b3babac4047e67d7ad))
* [[#173269329](https://www.pivotaltracker.com/story/show/173269329)] Removes subsidy payment method from list ([#1895](https://github.com/pagopa/io-app/issues/1895)) ([26fb73d](https://github.com/pagopa/io-app/commit/26fb73d324d551958b3c71d48e31295949b81d0f))
* [[#173284197](https://www.pivotaltracker.com/story/show/173284197)] Minor refactoring and improvements on bonus information screen ([#1899](https://github.com/pagopa/io-app/issues/1899)) ([16c72bc](https://github.com/pagopa/io-app/commit/16c72bc803ed4c04b2d0b8f8535441df40ecff6d))
* [[#173286445](https://www.pivotaltracker.com/story/show/173286445)] Adds a polling on bonus detail screen ([#1906](https://github.com/pagopa/io-app/issues/1906)) ([12f5f19](https://github.com/pagopa/io-app/commit/12f5f195365509872c008ef273ab754b85bbd981))
* [[#173286639](https://www.pivotaltracker.com/story/show/173286639)] Replace identification with confirm alert before bonus activation ([#1915](https://github.com/pagopa/io-app/issues/1915)) ([07ec64a](https://github.com/pagopa/io-app/commit/07ec64a198c20f20a51c5c7405cbe1c074670d38))
* [[#173288541](https://www.pivotaltracker.com/story/show/173288541)] integrate dynamic contextual help ([#1898](https://github.com/pagopa/io-app/issues/1898)) ([353ed6e](https://github.com/pagopa/io-app/commit/353ed6e60bc305246aa78b28c774bcd7c03d1cb2))
* [[#173291953](https://www.pivotaltracker.com/story/show/173291953)] BonusCardComponent as preview for Wallet and full for detail screen ([#1913](https://github.com/pagopa/io-app/issues/1913)) ([a30b904](https://github.com/pagopa/io-app/commit/a30b9047e3a6834865352204b65bc96563bd08f4))
* [[#173292076](https://www.pivotaltracker.com/story/show/173292076)] Activate bonus workflow ([#1907](https://github.com/pagopa/io-app/issues/1907)) ([fbf2155](https://github.com/pagopa/io-app/commit/fbf21552b11f2d6bcee830d959c5562b6010fb2a))
* [[#173331568](https://www.pivotaltracker.com/story/show/173331568)] Animates the opacity of bonus modal ([#1918](https://github.com/pagopa/io-app/issues/1918)) ([3637c50](https://github.com/pagopa/io-app/commit/3637c50319b07654c3c195d83d6e545a198fb4e3))
* [[#173332572](https://www.pivotaltracker.com/story/show/173332572)] Add fallback data when available bonuses loading fails ([#1904](https://github.com/pagopa/io-app/issues/1904)) ([038f39f](https://github.com/pagopa/io-app/commit/038f39f8604e8170453651d53936dd45e74159a3))
* [[#173353035](https://www.pivotaltracker.com/story/show/173353035)] UI corrections to wallet header screen ([#1924](https://github.com/pagopa/io-app/issues/1924)) ([30885c7](https://github.com/pagopa/io-app/commit/30885c72416d92fcd0aeee84f11d25aa2165d43f))
* [[#173354898](https://www.pivotaltracker.com/story/show/173354898)] Graphical review ([#1910](https://github.com/pagopa/io-app/issues/1910)) ([358fb39](https://github.com/pagopa/io-app/commit/358fb3912fb2e50196e2c09fda8f3d6f2b6219ed))
* [[#173361687](https://www.pivotaltracker.com/story/show/173361687)] Update Bonus Available  ([#1911](https://github.com/pagopa/io-app/issues/1911)) ([9707a1d](https://github.com/pagopa/io-app/commit/9707a1d038f849118bad2ab9590b5762228f33c9))
* [[#173362906](https://www.pivotaltracker.com/story/show/173362906)] Add Iphone X Safearea for eligibility and activation screens ([#1912](https://github.com/pagopa/io-app/issues/1912)) ([6c7f7a8](https://github.com/pagopa/io-app/commit/6c7f7a8c16f9d980dbd6c0a7de39fb0d01239414))
* [[#173363018](https://www.pivotaltracker.com/story/show/173363018)] ActivateBonusRequestScreen graphical review ([#1922](https://github.com/pagopa/io-app/issues/1922)) ([f157673](https://github.com/pagopa/io-app/commit/f15767322c99603d54b2d25c419105a5e552d576))
* [[#173378012](https://www.pivotaltracker.com/story/show/173378012)] Corrects the error cases on bonus detail screen ([#1916](https://github.com/pagopa/io-app/issues/1916)) ([a2caa50](https://github.com/pagopa/io-app/commit/a2caa503c03fcd03885170ea2e9dbbbad25c1b97))
* [[#173414551](https://www.pivotaltracker.com/story/show/173414551)] Navigate to BonusDetails after activation success ([#1923](https://github.com/pagopa/io-app/issues/1923)) ([a66260c](https://github.com/pagopa/io-app/commit/a66260cb895be10304d63d433ce107a4e76f5093))
* [[#173417354](https://www.pivotaltracker.com/story/show/173417354)] Show all the active bonuses for the user ([#1926](https://github.com/pagopa/io-app/issues/1926)) ([00aba3a](https://github.com/pagopa/io-app/commit/00aba3a3c1f47efc3abab026082572459320edfa))
* [[#173419232](https://www.pivotaltracker.com/story/show/173419232)] Copy the spaced bonus code ([#1927](https://github.com/pagopa/io-app/issues/1927)) ([4100184](https://github.com/pagopa/io-app/commit/41001841b08448f0e294f08013bb6c5b6712af3e))
* [[#173419830](https://www.pivotaltracker.com/story/show/173419830)] Add the safe area on missing components ([#1928](https://github.com/pagopa/io-app/issues/1928)) ([00a9478](https://github.com/pagopa/io-app/commit/00a9478a0b02a98fc0aa3d3b40646dc696fb3bb7))
* [[#173435275](https://www.pivotaltracker.com/story/show/173435275)] Update available bonus type with new spec ([#1938](https://github.com/pagopa/io-app/issues/1938)) ([fcb2206](https://github.com/pagopa/io-app/commit/fcb2206e0c54dec0e005a091744f58b83eada5e0))
* [[#173443307](https://www.pivotaltracker.com/story/show/173443307)] Show different texts base on bonus status ([#1932](https://github.com/pagopa/io-app/issues/1932)) ([45a9613](https://github.com/pagopa/io-app/commit/45a9613664d4e292a621a40abc79a14bc686a922))
* [[#173465266](https://www.pivotaltracker.com/story/show/173465266)] Graphical update for Eligibility and Activation Screens ([#1940](https://github.com/pagopa/io-app/issues/1940)) ([c9ad0e2](https://github.com/pagopa/io-app/commit/c9ad0e22555a4b13145823a21c6fa6eeea5d2181))
* [[#173471484](https://www.pivotaltracker.com/story/show/173471484)] move confirm button on right (android) ([#1948](https://github.com/pagopa/io-app/issues/1948)) ([dfeccde](https://github.com/pagopa/io-app/commit/dfeccde6a3f4090a0bd697336bc3a7a0c2ea4ec6))
* [[#173485468](https://www.pivotaltracker.com/story/show/173485468)] Rooted device modal information ([#1954](https://github.com/pagopa/io-app/issues/1954)) ([a085c43](https://github.com/pagopa/io-app/commit/a085c439d9646bb129a2886213df820e46f0f2a1))
* [[#173487253](https://www.pivotaltracker.com/story/show/173487253)] update cta caption for bonusalreadyexists screen ([#1953](https://github.com/pagopa/io-app/issues/1953)) ([1d54484](https://github.com/pagopa/io-app/commit/1d54484ab86bb3ee89a48233bfce59015e5e0b7a))
* [[#173487409](https://www.pivotaltracker.com/story/show/173487409),[#173495303](https://www.pivotaltracker.com/story/show/173495303),[#173487589](https://www.pivotaltracker.com/story/show/173487589),[#173487449](https://www.pivotaltracker.com/story/show/173487449)] UI refinement on BonusCardComponent and ActiveBonusScreen ([#1955](https://github.com/pagopa/io-app/issues/1955)) ([6c37dbb](https://github.com/pagopa/io-app/commit/6c37dbb7d4814ffc7199b8310c669ad110173046))
* [[#173490102](https://www.pivotaltracker.com/story/show/173490102)] remove confirm activation and update warning text when isee have discrepancies ([#1952](https://github.com/pagopa/io-app/issues/1952)) ([eda62de](https://github.com/pagopa/io-app/commit/eda62de26cb9912799dd4a281d259967a080c20a))
* [[#173490486](https://www.pivotaltracker.com/story/show/173490486)] Add bonus vacanze routes  ([#1951](https://github.com/pagopa/io-app/issues/1951)) ([18e5e9e](https://github.com/pagopa/io-app/commit/18e5e9eb4163aecdf055f7c560eb3119582c9260))
* [[#173507446](https://www.pivotaltracker.com/story/show/173507446)] Adds FAQ and Contextual help on bonus flow and screens ([#1960](https://github.com/pagopa/io-app/issues/1960)) ([dedb9ea](https://github.com/pagopa/io-app/commit/dedb9eac704366597ac0ad4175115a3f2fc8268b))
* [[#173517663](https://www.pivotaltracker.com/story/show/173517663)] changes the bonusavacanze events dispatched to mixpanel for troubleshooting ([#1963](https://github.com/pagopa/io-app/issues/1963)) ([50d77c2](https://github.com/pagopa/io-app/commit/50d77c24838f3af015363a7875106cfda95149ae))
* [[#173521040](https://www.pivotaltracker.com/story/show/173521040)] Update elgibility expired screen & eligibility / activation navigation rework ([#1994](https://github.com/pagopa/io-app/issues/1994)) ([0a2b3aa](https://github.com/pagopa/io-app/commit/0a2b3aaabbe1909bae7cb9fe0505c768a8ee998f))
* [[#173521040](https://www.pivotaltracker.com/story/show/173521040)] Update eligibility expired screen ([#1964](https://github.com/pagopa/io-app/issues/1964)) ([27c004f](https://github.com/pagopa/io-app/commit/27c004fe88b10edce62fecf6f4d89a54e4f7d135))
* [[#173580598](https://www.pivotaltracker.com/story/show/173580598)] update ISEE not found screen ([#1973](https://github.com/pagopa/io-app/issues/1973)) ([7dcadfe](https://github.com/pagopa/io-app/commit/7dcadfe169f5e876f354e9b4636d60c3a9791a40))
* [[#173580912](https://www.pivotaltracker.com/story/show/173580912)] Fixes some texts for bonus information screen ([#1983](https://github.com/pagopa/io-app/issues/1983)) ([f6b3e20](https://github.com/pagopa/io-app/commit/f6b3e2002c0e3d0763c47f976740ac1b82237de4))
* [[#173580954](https://www.pivotaltracker.com/story/show/173580954)] Adds shadow on android phone for cards ([#1993](https://github.com/pagopa/io-app/issues/1993)) ([5de7819](https://github.com/pagopa/io-app/commit/5de781916a974873d33a3ce71e47641b892a7294))
* [[#173591297](https://www.pivotaltracker.com/story/show/173591297)] Enable accept tos CTA on content full scroll ([#2000](https://github.com/pagopa/io-app/issues/2000)) ([3b73cd0](https://github.com/pagopa/io-app/commit/3b73cd0a6296cdf664d94cc05218e6a6e5ed6c54))
* [[#173602010](https://www.pivotaltracker.com/story/show/173602010)] Reload bonus vacanze on payment section focus ([#1996](https://github.com/pagopa/io-app/issues/1996)) ([9519ff8](https://github.com/pagopa/io-app/commit/9519ff8d9eba92e12461752de530c854ae1afcb9))
* [[#173621908](https://www.pivotaltracker.com/story/show/173621908)] Screenshot available only for whitelisted screens ([#2003](https://github.com/pagopa/io-app/issues/2003)) ([39b9eb4](https://github.com/pagopa/io-app/commit/39b9eb4d066edd938ed482ca04ff8d86e0c1f993))
* [[#173640667](https://www.pivotaltracker.com/story/show/173640667)] remove tabled block from Android ([#2005](https://github.com/pagopa/io-app/issues/2005)) ([378349c](https://github.com/pagopa/io-app/commit/378349cd1620b012d9540b9abc14d9d091dcb801))
* [[#173651699](https://www.pivotaltracker.com/story/show/173651699)] add Wallet Home and Transaction Details to allowed snapshottable screens ([#2014](https://github.com/pagopa/io-app/issues/2014)) ([a3183bf](https://github.com/pagopa/io-app/commit/a3183bfb2246f76052d39c6a43c751194e47c866))
* [[#173690037](https://www.pivotaltracker.com/story/show/173690037)] Fix IDP name ([#2019](https://github.com/pagopa/io-app/issues/2019)) ([1cc3787](https://github.com/pagopa/io-app/commit/1cc378710b4be11bc2cf76d8a261cc408310d3a4))
* [[#173701927](https://www.pivotaltracker.com/story/show/173701927)] Improve accessibility for top bar ([#2020](https://github.com/pagopa/io-app/issues/2020)) ([a208dd5](https://github.com/pagopa/io-app/commit/a208dd5fa0cc234b430fd2127b39bcdf898794be))
* [[#173707010](https://www.pivotaltracker.com/story/show/173707010)] fix screen reader text for bottom bar navigation elements ([#2021](https://github.com/pagopa/io-app/issues/2021)) ([338a19b](https://github.com/pagopa/io-app/commit/338a19b4ad4fd953e85c38042491ca5af2a8a39a))
* [[#173712388](https://www.pivotaltracker.com/story/show/173712388)] Add Codice Avviso in place of IUV ([#2024](https://github.com/pagopa/io-app/issues/2024)) ([6f11534](https://github.com/pagopa/io-app/commit/6f11534e1a6090a1cee4167102fe3beb91235e1b))
* [[#173733388](https://www.pivotaltracker.com/story/show/173733388)] update copy about household composition ([#2028](https://github.com/pagopa/io-app/issues/2028)) ([2993d94](https://github.com/pagopa/io-app/commit/2993d9449db3570361079df594f20c5b574909dc))
* [[#173734154](https://www.pivotaltracker.com/story/show/173734154)] Dispatch accessibility attributes to mixpanel ([#2050](https://github.com/pagopa/io-app/issues/2050)) ([dbc1ebf](https://github.com/pagopa/io-app/commit/dbc1ebf0d5f9f2d6a9b6d8c6e1c661b542c21241))
* [[#173767813](https://www.pivotaltracker.com/story/show/173767813)] Center navigation header title ([#2081](https://github.com/pagopa/io-app/issues/2081)) ([85a62e6](https://github.com/pagopa/io-app/commit/85a62e698625374e616bde1a36bf449ee4db1f83))
* [[#173767853](https://www.pivotaltracker.com/story/show/173767853)] Add underage Infoscreen ([#2051](https://github.com/pagopa/io-app/issues/2051)) ([fa6dbea](https://github.com/pagopa/io-app/commit/fa6dbea3e75fb85fe5f08b8c73a8f21dbe938f65))
* [[#173773392](https://www.pivotaltracker.com/story/show/173773392)] Improve PIN creation and confirmation accessibility ([#2042](https://github.com/pagopa/io-app/issues/2042)) ([210a5d5](https://github.com/pagopa/io-app/commit/210a5d5c012f756d767d7db4795687eff718b1ee))
* [[#173778636](https://www.pivotaltracker.com/story/show/173778636)] Accessibility label review ([#2061](https://github.com/pagopa/io-app/issues/2061)) ([6cadb2d](https://github.com/pagopa/io-app/commit/6cadb2d05800ebfd47bfc637ba5fcc83fea66e1f))
* [[#173789814](https://www.pivotaltracker.com/story/show/173789814)] Improves accessibility for bonus card component ([#2048](https://github.com/pagopa/io-app/issues/2048)) ([7e6e08a](https://github.com/pagopa/io-app/commit/7e6e08a56b983505ab8926b0001dfce4d7ba71b5))
* [[#173827829](https://www.pivotaltracker.com/story/show/173827829)] Log login failure on instabug ([#2055](https://github.com/pagopa/io-app/issues/2055)) ([1e35b58](https://github.com/pagopa/io-app/commit/1e35b58f5ca419489c84dc06738feb1412f3640f))
* [[#173834010](https://www.pivotaltracker.com/story/show/173834010)] Show warning if there's another bonus already active ([#2079](https://github.com/pagopa/io-app/issues/2079)) ([ae95b8a](https://github.com/pagopa/io-app/commit/ae95b8a8404b379bc107af9ec7f73c5736aed7e2))
* [[#173834070](https://www.pivotaltracker.com/story/show/173834070)] Improve accessibility CIE authentication ([#2060](https://github.com/pagopa/io-app/issues/2060)) ([03420b2](https://github.com/pagopa/io-app/commit/03420b24812fb4c826ccb6663b33dcdcdbf9be94))
* [[#173848926](https://www.pivotaltracker.com/story/show/173848926)] update alert messages text ([#2063](https://github.com/pagopa/io-app/issues/2063)) ([7a25cc8](https://github.com/pagopa/io-app/commit/7a25cc863ef12b5d2df240e90ce243739dc5c836))
* [[#173898167](https://www.pivotaltracker.com/story/show/173898167)] disable mixpanel geo-ip localization ([#2074](https://github.com/pagopa/io-app/issues/2074)) ([f23840e](https://github.com/pagopa/io-app/commit/f23840e43e858cfb0346b59febff2590b7537e7c))
* [[#173898167](https://www.pivotaltracker.com/story/show/173898167)] Send to Mixpanel url changes  ([#2076](https://github.com/pagopa/io-app/issues/2076)) ([6b52879](https://github.com/pagopa/io-app/commit/6b52879f406da9da7e42e36f2a0eb2070234388a))
* [[#173900219](https://www.pivotaltracker.com/story/show/173900219)] Adds a new faq on bonus request information ([#2080](https://github.com/pagopa/io-app/issues/2080)) ([f16b7ee](https://github.com/pagopa/io-app/commit/f16b7eed00509946e1e64040fba0153e55071b53))
* [[#173916710](https://www.pivotaltracker.com/story/show/173916710)] Handle ABORTED status on UserDataProcessing ([#2077](https://github.com/pagopa/io-app/issues/2077)) ([ca2dc6a](https://github.com/pagopa/io-app/commit/ca2dc6a661e34142639b3f0208d0468614b2a25d))
* [[#173965657](https://www.pivotaltracker.com/story/show/173965657)] Adds the status redeemed for multiple bonus alert selector ([#2093](https://github.com/pagopa/io-app/issues/2093)) ([35adc07](https://github.com/pagopa/io-app/commit/35adc070e139d21a860a911d455d06874dc22c41))
* Copy updates ([#2001](https://github.com/pagopa/io-app/issues/2001)) ([ed3baba](https://github.com/pagopa/io-app/commit/ed3baba06a962192bc6de36db3d98398f54b57f1))
* Update cieNotSupported.md ([#2031](https://github.com/pagopa/io-app/issues/2031)) ([bfac952](https://github.com/pagopa/io-app/commit/bfac952abea2a92afbbc61eb1243fe7814a264ed))
* Update copy for faq58.md ([#2045](https://github.com/pagopa/io-app/issues/2045)) ([2f077e1](https://github.com/pagopa/io-app/commit/2f077e1b09b6e0e3037c7f285739a7c6fb4dcfcc))
* Update copy for faq64.md ([#2046](https://github.com/pagopa/io-app/issues/2046)) ([d81b9ba](https://github.com/pagopa/io-app/commit/d81b9ba5ed3db33ccba56cc26ed0e74c508522ba))
* Update faq59.md ([#2071](https://github.com/pagopa/io-app/issues/2071)) ([45dcb1c](https://github.com/pagopa/io-app/commit/45dcb1c21484abe05e263d935d775247dcf12239))
* Update faq59.md ([#2072](https://github.com/pagopa/io-app/issues/2072)) ([bcc7213](https://github.com/pagopa/io-app/commit/bcc7213f4fe05f251a922a1d7168b3b4db090827))
* Update index.yml ([#2069](https://github.com/pagopa/io-app/issues/2069)) ([c5be7da](https://github.com/pagopa/io-app/commit/c5be7da9f4dc32fe1bde14835fb3b4dc05a10378))
* Update index.yml ([#2070](https://github.com/pagopa/io-app/issues/2070)) ([5dd1be5](https://github.com/pagopa/io-app/commit/5dd1be53a5ab8e18a77f1a987bc1eff6df6b9628))


### Bug Fixes

*  Fix pagoPA nightly API check ([#1879](https://github.com/pagopa/io-app/issues/1879)) ([6f64d64](https://github.com/pagopa/io-app/commit/6f64d645ca62c571a6d46a4805882038fa19d972))
* [[#166572994](https://www.pivotaltracker.com/story/show/166572994)] Fix payment ID infinite polling ([#1945](https://github.com/pagopa/io-app/issues/1945)) ([2ff3ae1](https://github.com/pagopa/io-app/commit/2ff3ae12cc99442530f8556768e3f609060201b9))
* [[#172075979](https://www.pivotaltracker.com/story/show/172075979)] Fix services loading ([#1930](https://github.com/pagopa/io-app/issues/1930)) ([d1578a4](https://github.com/pagopa/io-app/commit/d1578a4e14b4a281ef8c68088f67eb5d172633f1))
* [[#172494935](https://www.pivotaltracker.com/story/show/172494935)] Handles session not valid on wallet screen ([#1742](https://github.com/pagopa/io-app/issues/1742)) ([ecc8f3d](https://github.com/pagopa/io-app/commit/ecc8f3d85c2e5d1ed8719e0ae020417b6815ea7d))
* [[#172762258](https://www.pivotaltracker.com/story/show/172762258)] Alert when deselecting a favourite payment method ([#1825](https://github.com/pagopa/io-app/issues/1825)) ([e71474f](https://github.com/pagopa/io-app/commit/e71474ff0d1983e5a348b71e358982ec08917660))
* [[#172806246](https://www.pivotaltracker.com/story/show/172806246)] Upgrade react-native-camera version ([#1818](https://github.com/pagopa/io-app/issues/1818)) ([9c9c097](https://github.com/pagopa/io-app/commit/9c9c09704670bd7cdb83ce4e56533c22abe038d5))
* [[#172838730](https://www.pivotaltracker.com/story/show/172838730)] Updates profileFirstLogin condition to dispatch and payload to mixpanel ([#1817](https://github.com/pagopa/io-app/issues/1817)) ([a1eabae](https://github.com/pagopa/io-app/commit/a1eabae8f70c9a6277a4c9fec1b6849ac0fe5df5))
* [[#173074615](https://www.pivotaltracker.com/story/show/173074615)] Fix display payment issues banner twice ([#1858](https://github.com/pagopa/io-app/issues/1858)) ([06a6e8a](https://github.com/pagopa/io-app/commit/06a6e8a9e858e2e52c96b85ae0a807d0cbfd75d6))
* [[#173242160](https://www.pivotaltracker.com/story/show/173242160)] fix euro representation ([#1893](https://github.com/pagopa/io-app/issues/1893)) ([e9cea2c](https://github.com/pagopa/io-app/commit/e9cea2c5c7d548e4e3b19aff9cb790b1c34d1fbc))
* [[#173289577](https://www.pivotaltracker.com/story/show/173289577)] Fix ContextualHelp title translation [#1891](https://github.com/pagopa/io-app/issues/1891) ([8f22a68](https://github.com/pagopa/io-app/commit/8f22a682dced28b7ca2c5da66084332414ec4059))
* [[#173322606](https://www.pivotaltracker.com/story/show/173322606)] Fix RootContainer re-renders ([#1902](https://github.com/pagopa/io-app/issues/1902)) ([a658d7c](https://github.com/pagopa/io-app/commit/a658d7cf8ce9b7c1098ee09a798e89b5e2c230a0))
* [[#173338441](https://www.pivotaltracker.com/story/show/173338441)] Refactoring ActiveBonusScreen with common components for family composition and bonus details ([#1958](https://github.com/pagopa/io-app/issues/1958)) ([437cbd6](https://github.com/pagopa/io-app/commit/437cbd64011bceb76bdf9ed738b60d105d2cb937))
* [[#173338737](https://www.pivotaltracker.com/story/show/173338737)] Fixes white statusbar content ([#1914](https://github.com/pagopa/io-app/issues/1914)) ([00f438f](https://github.com/pagopa/io-app/commit/00f438fba13cf6d0a7a151dd05478253b0343994))
* [[#173353526](https://www.pivotaltracker.com/story/show/173353526)] Fix transaction details crash ([#1908](https://github.com/pagopa/io-app/issues/1908)) ([3698229](https://github.com/pagopa/io-app/commit/3698229824d9f516a00ed3ead95a95c42799995f))
* [[#173385809](https://www.pivotaltracker.com/story/show/173385809)] Change fiscal code style for FamilyComposition component ([#1950](https://github.com/pagopa/io-app/issues/1950)) ([2513459](https://github.com/pagopa/io-app/commit/251345911a2846f6c35c7e264ffe23747c630534))
* [[#173398774](https://www.pivotaltracker.com/story/show/173398774)] show a proper message if credit card insertion is successful or not ([#2078](https://github.com/pagopa/io-app/issues/2078)) ([da1ab9c](https://github.com/pagopa/io-app/commit/da1ab9c99079247ea8a64fd5f457819549ce1a42))
* [[#173400880](https://www.pivotaltracker.com/story/show/173400880)] Reset navigation history when navigating through bonus list and information ([#1935](https://github.com/pagopa/io-app/issues/1935)) ([0322344](https://github.com/pagopa/io-app/commit/0322344914f542e3be95c5628730cc70b6b85799))
* [[#173420483](https://www.pivotaltracker.com/story/show/173420483)] Restore dynamic header on android platform [#2006](https://github.com/pagopa/io-app/issues/2006) ([5e05032](https://github.com/pagopa/io-app/commit/5e05032c23bf1f320b9a068a1211ca2b3053dbac))
* [[#173430903](https://www.pivotaltracker.com/story/show/173430903)] Center the content of the InfoScreenComponent ([#1934](https://github.com/pagopa/io-app/issues/1934)) ([eb8589e](https://github.com/pagopa/io-app/commit/eb8589e3f4180eb6a91d59f6e5faf8f121717b84))
* [[#173441272](https://www.pivotaltracker.com/story/show/173441272)] Downgrade okhttp lib on android ([#1966](https://github.com/pagopa/io-app/issues/1966)) ([2ab2b2d](https://github.com/pagopa/io-app/commit/2ab2b2dcbf70c7bc821e2a420756c611e57fa77e))
* [[#173443457](https://www.pivotaltracker.com/story/show/173443457)] Clean the store on loadAllBonusActivation ([#1933](https://github.com/pagopa/io-app/issues/1933)) ([876db87](https://github.com/pagopa/io-app/commit/876db872f5211885a7b2f547aab5ac33f80f6037))
* [[#173469785](https://www.pivotaltracker.com/story/show/173469785)] Add extra height to markdown computed height ([#1941](https://github.com/pagopa/io-app/issues/1941)) ([ee2e473](https://github.com/pagopa/io-app/commit/ee2e473bef325f32ffe807a0cfc4a8f89d2af196))
* [[#173475769](https://www.pivotaltracker.com/story/show/173475769)] fix ([#1944](https://github.com/pagopa/io-app/issues/1944)) ([79cc2e3](https://github.com/pagopa/io-app/commit/79cc2e3f8a06b53a9bdacd4644dc84cee1bf470f))
* [[#173510346](https://www.pivotaltracker.com/story/show/173510346)] Fixes test 2e2 ([#1959](https://github.com/pagopa/io-app/issues/1959)) ([816b9f3](https://github.com/pagopa/io-app/commit/816b9f34b80f7ce98ef9ae2b2905a7465a9408e1))
* [[#173515056](https://www.pivotaltracker.com/story/show/173515056)] Fixes crash on transactions list ([#1962](https://github.com/pagopa/io-app/issues/1962)) ([f222634](https://github.com/pagopa/io-app/commit/f2226346d26272e09df45416aa9f75d5a7329a15))
* [[#173530583](https://www.pivotaltracker.com/story/show/173530583)] fix ([#1967](https://github.com/pagopa/io-app/issues/1967)) ([f982d31](https://github.com/pagopa/io-app/commit/f982d31d879e4ff222c01dfcc6dfc44b92b23293))
* [[#173538229](https://www.pivotaltracker.com/story/show/173538229)] fix cta title localization ([#1971](https://github.com/pagopa/io-app/issues/1971)) ([21cbc4a](https://github.com/pagopa/io-app/commit/21cbc4a1f8963bdf4763ad7b1ed91ebf87d3350e))
* [[#173580888](https://www.pivotaltracker.com/story/show/173580888)] Update text for error screen ([#1974](https://github.com/pagopa/io-app/issues/1974)) ([18bb410](https://github.com/pagopa/io-app/commit/18bb4104b8f499ee5bc6ed94f1e802e492441fca))
* [[#173621813](https://www.pivotaltracker.com/story/show/173621813)] Adds flag prop to let user zoom on markdown texts ([#2009](https://github.com/pagopa/io-app/issues/2009)) ([63554db](https://github.com/pagopa/io-app/commit/63554dbbebdd19c00c3a88c2ea9d1c91f27084eb))
* [[#173640918](https://www.pivotaltracker.com/story/show/173640918)] Fixes Bonus card alignment on Tablet devices ([#2008](https://github.com/pagopa/io-app/issues/2008)) ([8fde1b5](https://github.com/pagopa/io-app/commit/8fde1b52bc8fadbcd1724ef881c05a77af83e555))
* [[#173651298](https://www.pivotaltracker.com/story/show/173651298),#173651447] Add hard-logout as default option to logout ([#2011](https://github.com/pagopa/io-app/issues/2011)) ([0ce1ba6](https://github.com/pagopa/io-app/commit/0ce1ba6041a8b832c609ad208d7c2337d272303a))
* [[#173686901](https://www.pivotaltracker.com/story/show/173686901)] Restore accessibility for app header ([#2018](https://github.com/pagopa/io-app/issues/2018)) ([e496b00](https://github.com/pagopa/io-app/commit/e496b00aaeb502b66037b7a5fc175e96fc19a071))
* [[#173702089](https://www.pivotaltracker.com/story/show/173702089)] Accessibility restored on modals ([#2023](https://github.com/pagopa/io-app/issues/2023)) ([99d5dae](https://github.com/pagopa/io-app/commit/99d5dae23c8718e8fff13a50093222140ca6549a))
* [[#173702628](https://www.pivotaltracker.com/story/show/173702628)] Reworks accordion component and improves accessibility ([#2033](https://github.com/pagopa/io-app/issues/2033)) ([632b035](https://github.com/pagopa/io-app/commit/632b03597b637f16464b2e965d9026add1332208))
* [[#173703056](https://www.pivotaltracker.com/story/show/173703056)] Fix accessibility on Fiscal code ([#2054](https://github.com/pagopa/io-app/issues/2054)) ([49d320e](https://github.com/pagopa/io-app/commit/49d320ec3448b05042039b73511b3faf33c97058))
* [[#173703926](https://www.pivotaltracker.com/story/show/173703926)] fixes ([#2022](https://github.com/pagopa/io-app/issues/2022)) ([4796cbd](https://github.com/pagopa/io-app/commit/4796cbd09be869f348b86ffe78c49ada442e0f1c))
* [[#173744863](https://www.pivotaltracker.com/story/show/173744863)] Fixes bad url to bonus guide ([#2034](https://github.com/pagopa/io-app/issues/2034)) ([39ef016](https://github.com/pagopa/io-app/commit/39ef0169dbfda06b37c7327e1f39f06cf2ddb539))
* [[#173752636](https://www.pivotaltracker.com/story/show/173752636)] Fix wallet transactions refresh ([#2036](https://github.com/pagopa/io-app/issues/2036)) ([68a570c](https://github.com/pagopa/io-app/commit/68a570ce003a8109f9f7db8fbb0ac6a900e8b968))
* [[#173768527](https://www.pivotaltracker.com/story/show/173768527)] Personal data link not recognized as link ([#2037](https://github.com/pagopa/io-app/issues/2037)) ([7a0688c](https://github.com/pagopa/io-app/commit/7a0688c22892340c6a46d6c7510911e2bd031757))
* [[#173769744](https://www.pivotaltracker.com/story/show/173769744)] Add accessibility focus for InfoScreenComponent ([#2039](https://github.com/pagopa/io-app/issues/2039)) ([f741a5d](https://github.com/pagopa/io-app/commit/f741a5d157cf6f4938b8419548e2c00a251f87dc))
* [[#173769898](https://www.pivotaltracker.com/story/show/173769898)] fix accessibility for loadingerrorcomponent ([#2043](https://github.com/pagopa/io-app/issues/2043)) ([1ad1dcf](https://github.com/pagopa/io-app/commit/1ad1dcfae220ce01ec7837fa1307559e7a2f4075))
* [[#173778636](https://www.pivotaltracker.com/story/show/173778636)] UI accessibility rework ([#2059](https://github.com/pagopa/io-app/issues/2059)) ([371efc8](https://github.com/pagopa/io-app/commit/371efc852a7f8403602b71a42fb1a8cdb05cae28))
* [[#173790471](https://www.pivotaltracker.com/story/show/173790471)] Fixes too long text on CTA to enter payment data manually ([#2053](https://github.com/pagopa/io-app/issues/2053)) ([788a507](https://github.com/pagopa/io-app/commit/788a50756284b94dc6d371d68389bff4125b3d96))
* [[#173794022](https://www.pivotaltracker.com/story/show/173794022)] Fixes LightModal half screen bug ([#2049](https://github.com/pagopa/io-app/issues/2049)) ([942e6c9](https://github.com/pagopa/io-app/commit/942e6c95e33cc9d2dab087eca86564629ffa2157))
* [[#173815288](https://www.pivotaltracker.com/story/show/173815288)] Fixes bonus header title color ([#2082](https://github.com/pagopa/io-app/issues/2082)) ([16cb950](https://github.com/pagopa/io-app/commit/16cb95069fa6ddcc0f7d5c3979f998d647ad4e8f))
* [[#173828514](https://www.pivotaltracker.com/story/show/173828514)] Fixes customGoBack not accessible ([#2058](https://github.com/pagopa/io-app/issues/2058)) ([9b3e1eb](https://github.com/pagopa/io-app/commit/9b3e1eb54a843bebe5e1bb239f4f51812c50c314))
* [[#173847503](https://www.pivotaltracker.com/story/show/173847503)] Implements accessibility for preferences options ([#2062](https://github.com/pagopa/io-app/issues/2062)) ([765ac34](https://github.com/pagopa/io-app/commit/765ac34008e2d1227f630572b587a693e8cf84d1))
* [[#173850410](https://www.pivotaltracker.com/story/show/173850410)] Fix isSuccessTransaction ([#2086](https://github.com/pagopa/io-app/issues/2086)) ([1e9e46b](https://github.com/pagopa/io-app/commit/1e9e46b4495363094e4c7568f5af62b866b531b2))
* [[#173877360](https://www.pivotaltracker.com/story/show/173877360)] fix undefined is not an object ([#2065](https://github.com/pagopa/io-app/issues/2065)) ([435afdb](https://github.com/pagopa/io-app/commit/435afdbea04f2277045763126c695b0fa6123d2f))
* [[#173899093](https://www.pivotaltracker.com/story/show/173899093)] fix wrong color for PaymentMethodList Item ([#2075](https://github.com/pagopa/io-app/issues/2075)) ([4c514e1](https://github.com/pagopa/io-app/commit/4c514e184e384fb84cf708c1833b922eb42581af))
* [[#173938203](https://www.pivotaltracker.com/story/show/173938203)] Remove the selected favourite calendar ([#2090](https://github.com/pagopa/io-app/issues/2090)) ([6b4834a](https://github.com/pagopa/io-app/commit/6b4834a5e9ed4bc01f03e9ba84b44532432e2589))
* [[#173977842](https://www.pivotaltracker.com/story/show/173977842)] fixes the title under bonus card ([#2092](https://github.com/pagopa/io-app/issues/2092)) ([ed1c26d](https://github.com/pagopa/io-app/commit/ed1c26dc6923351b987f55141b728f6ce30ee8e1))
* Gemfile & Gemfile.lock to reduce vulnerabilities ([#1345](https://github.com/pagopa/io-app/issues/1345)) ([dbaaa2e](https://github.com/pagopa/io-app/commit/dbaaa2ed426e53a65d51280ca492f47029909c97))
* Update faq42.md ([#2004](https://github.com/pagopa/io-app/issues/2004)) ([0520659](https://github.com/pagopa/io-app/commit/0520659cc215b00ce747a5314be9d93eba2e69e2))
* Use the correct text in Italian faq25. ([#2012](https://github.com/pagopa/io-app/issues/2012)) ([fe83337](https://github.com/pagopa/io-app/commit/fe8333728d3b1a1781908fe5bc70e733881e6c06))


### Chores

* [[#172889149](https://www.pivotaltracker.com/story/show/172889149)] Automatic changelog generation and versioning ([#2089](https://github.com/pagopa/io-app/issues/2089)) ([b01f1ee](https://github.com/pagopa/io-app/commit/b01f1ee97f66f7739dff353b90df7a89f57124d2))
* [[#173338803](https://www.pivotaltracker.com/story/show/173338803)] Integration test for activation phase ([#1931](https://github.com/pagopa/io-app/issues/1931)) ([ff18bc6](https://github.com/pagopa/io-app/commit/ff18bc6b4596d2adb6b3a466956e3734917ada95))
* [[#173464503](https://www.pivotaltracker.com/story/show/173464503)] Increase iOS deploy target to 13 ([#1937](https://github.com/pagopa/io-app/issues/1937)) ([14b35bc](https://github.com/pagopa/io-app/commit/14b35bc207d020e569f9c510ba91521fa47c499a))
* [[#173470420](https://www.pivotaltracker.com/story/show/173470420)] UI refinement on Bonus Information screen and Bonus detail screen ([#1942](https://github.com/pagopa/io-app/issues/1942)) ([eb29d43](https://github.com/pagopa/io-app/commit/eb29d43f49eda80174148c804b9a6ff21457542c))
* [[#173486320](https://www.pivotaltracker.com/story/show/173486320)] restore ios 9 ([#1946](https://github.com/pagopa/io-app/issues/1946)) ([03e659e](https://github.com/pagopa/io-app/commit/03e659eeb7f88c9ae0ea838df6ba95696caffa4b))
* [[#173581309](https://www.pivotaltracker.com/story/show/173581309)] Add tests on picking data based on language ([#1987](https://github.com/pagopa/io-app/issues/1987)) ([5dcba77](https://github.com/pagopa/io-app/commit/5dcba77c53429601a4cd3d54a7b4f1bd5312f3c0))
* [[#173707422](https://www.pivotaltracker.com/story/show/173707422)] Get static assets and data from IO CDN ([#2085](https://github.com/pagopa/io-app/issues/2085)) ([f8ab6d3](https://github.com/pagopa/io-app/commit/f8ab6d3fd971c1a04d15c623ac3cbbb7346d2c86))
* [[#173729510](https://www.pivotaltracker.com/story/show/173729510)] upgrade @types/react-native: 0.60.20 ([#2025](https://github.com/pagopa/io-app/issues/2025)) ([f3c52c3](https://github.com/pagopa/io-app/commit/f3c52c3c114f508d3c371b4885280f9b07fb3c02))
* [[#173829043](https://www.pivotaltracker.com/story/show/173829043)] Improve Reactotron usage ([#2056](https://github.com/pagopa/io-app/issues/2056)) ([9a22ccd](https://github.com/pagopa/io-app/commit/9a22ccd4ff71cfd54970cbcafb66b5ad9195fd46))
* [[#173887151](https://www.pivotaltracker.com/story/show/173887151)] add contextual help source ([#2067](https://github.com/pagopa/io-app/issues/2067)) ([5b273dd](https://github.com/pagopa/io-app/commit/5b273dd21c28091d9f848f5878a04482a70edb74))
* [[#173936506](https://www.pivotaltracker.com/story/show/173936506)] ignore some exceptions ([#2083](https://github.com/pagopa/io-app/issues/2083)) ([d62f1cc](https://github.com/pagopa/io-app/commit/d62f1cc8fc5171122846ec4e18cae8e2c79c4aad))
* [[#173936682](https://www.pivotaltracker.com/story/show/173936682)] remove links from code ([#2084](https://github.com/pagopa/io-app/issues/2084)) ([f09a447](https://github.com/pagopa/io-app/commit/f09a4479dee043335f5886aa2ebc821bc6333252))
* enable bonus vacanze feature flag ([#1900](https://github.com/pagopa/io-app/issues/1900)) ([aec4303](https://github.com/pagopa/io-app/commit/aec4303f9d5351c3ce0ac8d7f847d71389d1ac2d))
* **release:** 1.4.0-rc.0 ([2247e07](https://github.com/pagopa/io-app/commit/2247e073dde99af83035bdd7f78c2fb092016606))
* **release:** 1.4.0-rc.0 ([720ec00](https://github.com/pagopa/io-app/commit/720ec00cdac6847f76b239a19686354acdeda720))
* Upgrade lodash to v. 4.17.19 ([#2040](https://github.com/pagopa/io-app/issues/2040)) ([dbc5fec](https://github.com/pagopa/io-app/commit/dbc5fec8754c3aabd81001f7523872b50af3ef27))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
