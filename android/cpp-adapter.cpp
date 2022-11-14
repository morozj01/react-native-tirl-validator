#include <jni.h>
#include "tirl-validator.h"

extern "C" JNIEXPORT jstring JNICALL
Java_com_tirlvalidator_TirlValidatorModule_nativeLibraryVersion(JNIEnv *env, jclass type)
{
    std::string version = tirlvalidator::libraryVersion();
    return env->NewStringUTF(version.c_str());
}
