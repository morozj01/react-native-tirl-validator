#include <jni.h>
#include "tirl-validator.h"
#include "ctime"

extern "C"
{
    JNIEXPORT jstring JNICALL
    Java_com_tirlvalidator_TirlValidatorModule_nativeLibraryVersion(JNIEnv *env, jclass type)
    {
        std::string version = tirlvalidator::libraryVersion();
        return env->NewStringUTF(version.c_str());
    }

    JNIEXPORT jstring JNICALL
    Java_com_tirlvalidator_TirlValidatorModule_nativeTestColor(JNIEnv *env, jclass type, jstring fileName)
    {
        const char *charArray = env->GetStringUTFChars(fileName, 0);
        std::string color = tirlvalidator::testColor(charArray);
        env->ReleaseStringUTFChars(fileName, charArray);
        return env->NewStringUTF(color.c_str());
    }

    JNIEXPORT jstring JNICALL
    Java_com_tirlvalidator_TirlValidatorModule_nativeFindBarcode(JNIEnv *env, jclass type, jstring fileName, jboolean flash)
    {
        const char *charArray = env->GetStringUTFChars(fileName, 0);
        std::string barcodeData = tirlvalidator::findBarcode(charArray, flash);
        env->ReleaseStringUTFChars(fileName, charArray);
        return env->NewStringUTF(barcodeData.c_str());
    }

    JNIEXPORT jstring JNICALL
    Java_com_tirlvalidator_TirlValidatorModule_nativeProcessLabel(JNIEnv *env, jclass type, jstring barcodeData)
    {
        const char *charArray = env->GetStringUTFChars(barcodeData, 0);
        std::string labelData = tirlvalidator::processLabel(std::string(charArray));
        env->ReleaseStringUTFChars(barcodeData, charArray);
        return env->NewStringUTF(labelData.c_str());
    }

    JNIEXPORT jstring JNICALL
    Java_com_tirlvalidator_TirlValidatorModule_nativeAuthenticate(JNIEnv *env, jclass type, jstring labelData, jstring imageData)
    {
        const char *label = env->GetStringUTFChars(labelData, 0);
        const char *image = env->GetStringUTFChars(imageData, 0);

        std::string result = tirlvalidator::authenticate(std::string(label), std::string(image));

        env->ReleaseStringUTFChars(labelData, label);
        env->ReleaseStringUTFChars(imageData, image);

        return env->NewStringUTF(result.c_str());
    }
}