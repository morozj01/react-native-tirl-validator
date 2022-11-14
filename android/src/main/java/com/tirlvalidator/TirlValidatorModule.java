package com.tirlvalidator;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = TirlValidatorModule.NAME)
public class TirlValidatorModule extends ReactContextBaseJavaModule {
  public static final String NAME = "TirlValidator";

  public TirlValidatorModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("cpp");
  }

  private static native String nativeLibraryVersion();

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void libraryVersion(Promise promise) {
    promise.resolve(nativeLibraryVersion());
  }
}
