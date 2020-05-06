package it.pagopa.io.app;

import androidx.multidex.MultiDexApplication;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.sha256lib.Sha256Package;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.lewin.qrcode.QRScanReaderPackage;
import com.imagepicker.ImagePickerPackage;
import com.kristiansorens.flagsecure.FlagSecurePackage;
import com.rnfs.RNFSPackage;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.calendarevents.CalendarEventsPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.horcrux.svg.SvgPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.oblador.keychain.KeychainPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.instabug.reactlibrary.RNInstabugReactnativePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import it.ipzs.cieidsdk.native_bridge.CiePackage;

import android.util.Log;
import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new AsyncStoragePackage(), new NetInfoPackage(), new QRScanReaderPackage(),
          new ImagePickerPackage(), new FlagSecurePackage(), new RNFSPackage(), new AndroidOpenSettingsPackage(),
          new RNGestureHandlerPackage(), new CalendarEventsPackage(), new RNCWebViewPackage(),
          new FingerprintAuthPackage(), new BackgroundTimerPackage(), new SvgPackage(), new RNTextInputMaskPackage(),
          new SplashScreenReactPackage(), new ReactNativeExceptionHandlerPackage(), new RNCameraPackage(),
          new ReactNativePushNotificationPackage(), new KeychainPackage(), new RNI18nPackage(), new Sha256Package(),
          new RNMixpanel(), new RNDeviceInfo(), new ReactNativeConfigPackage(),new CiePackage(),
          new RNInstabugReactnativePackage.Builder(BuildConfig.INSTABUG_TOKEN, MainApplication.this)
              .setInvocationEvent("none").setPrimaryColor("#0073E6").build());
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {

    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

}