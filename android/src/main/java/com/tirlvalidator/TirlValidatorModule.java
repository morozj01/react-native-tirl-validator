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

  private static native String nativeTestColor(String fileName);

  private static native String nativeFindBarcode(String fileName, boolean flash);

  private static native String nativeProcessLabel(String barcodeData);

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void libraryVersion(Promise promise) {
    promise.resolve(nativeLibraryVersion());
  }

  @ReactMethod
  public void testColor(String fileName, Promise promise) {
    promise.resolve(nativeTestColor(fileName));
  }

  @ReactMethod
  public void findBarcode(String fileName, boolean flash, Promise promise) {
    promise.resolve(nativeFindBarcode(fileName, flash));
  }

  @ReactMethod
  public void processLabel(String barcodeData, Promise promise) {
    promise.resolve(nativeProcessLabel(barcodeData));
  }  
}
