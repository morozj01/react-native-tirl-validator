#include <jni.h>
#include "tirl-validator.h"

extern "C"
JNIEXPORT jint JNICALL
Java_com_tirlvalidator_TirlValidatorModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return tirlvalidator::multiply(a, b);
}
