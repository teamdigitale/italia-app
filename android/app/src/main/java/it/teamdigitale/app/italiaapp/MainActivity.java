package it.teamdigitale.app.italiaapp;

import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.calendarevents.CalendarEventsPackage;
import org.devio.rn.splashscreen.SplashScreen;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

public class MainActivity extends ReactActivity {

    private Boolean isRootedDeviceFlag = null;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ItaliaApp";
    }

    // see https://github.com/crazycodeboy/react-native-splash-screen#third-stepplugin-configuration
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (!isEmulator() && isDeviceRooted()) {
            super.onCreate(savedInstanceState);
            //on rooted device show message ant stop app
            AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
            alertDialog.setTitle(getString(R.string.alert_device_rooted_title));
            alertDialog.setMessage(getString(R.string.alert_device_rooted_desc));
            alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, getString(android.R.string.ok),
                    (dialog, which) -> finish());
            alertDialog.setCancelable(false);
            alertDialog.show();
        } else {
            if (getResources().getBoolean(R.bool.isTablet)) {
                super.onCreate(savedInstanceState);
                new AlertDialog.Builder(MainActivity.this)
                        .setTitle(getString(R.string.dialog_attention))
                        .setMessage(getString(R.string.tablet_not_supported))
                        .setPositiveButton(getString(android.R.string.ok), (dialog, which) -> finish())
                        .setCancelable(false)
                        .show();
            } else {
                SplashScreen.show(this, R.style.SplashScreenTheme);
                super.onCreate(savedInstanceState);
            }
        }
        // Fix the problem described here:
        // https://stackoverflow.com/questions/48072438/java-lang-illegalstateexception-only-fullscreen-opaque-activities-can-request-o
        if (android.os.Build.VERSION.SDK_INT != Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        if (!isEmulator() && isDeviceRooted()) {
            // on rooted device not attach main component
            return new ReactActivityDelegate(this, null);
        } else {
            return new ReactActivityDelegate(this, getMainComponentName()) {
                @Override
                protected ReactRootView createRootView() {
                    return new RNGestureHandlerEnabledRootView(MainActivity.this);
                }
            };
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
      CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults);
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    /**
     * Check rooted device
     * https://stackoverflow.com/a/8097801/2470948
     */
    private boolean isDeviceRooted() {
        // check only once
        if (isRootedDeviceFlag == null) {
            isRootedDeviceFlag = (checkRootMethod1() || checkRootMethod2() || checkRootMethod3());
        }
        return isRootedDeviceFlag;
    }

    private boolean checkRootMethod1() {
        //check 1: get from build info, test-keys means it was signed with a custom key generated by a third-party developer
        String buildTags = android.os.Build.TAGS;
        return buildTags != null && buildTags.contains("test-keys");
    }

    private boolean checkRootMethod2() {
        // check 2: if /system/app/Superuser.apk or its directories are present
        String[] paths = {"/system/app/Superuser.apk", "/sbin/su", "/system/bin/su", "/system/xbin/su", "/data/local/xbin/su", "/data/local/bin/su", "/system/sd/xbin/su",
                "/system/bin/failsafe/su", "/data/local/su", "/su/bin/su"};
        for (String path : paths) {
            if (new File(path).exists()) return true;
        }
        return false;
    }

    private boolean checkRootMethod3() {
        Process process = null;
        try {
            // check 3: try executing a command, this operation requires root privileges
            process = Runtime.getRuntime().exec(new String[]{"/system/xbin/which", "su"});
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            if (in.readLine() != null) return true;
            return false;
        } catch (Throwable t) {
            return false;
        } finally {
            if (process != null) process.destroy();
        }
    }

    /**
     * Detect when running on the emulator
     * https://stackoverflow.com/a/21505193/2470948
     */
    private boolean isEmulator() {
        return Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || "google_sdk".equals(Build.PRODUCT);
    }
}
