#import "TirlValidator.h"

@implementation TirlValidator
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(libraryVersion,
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *result = @(tirlvalidator::libraryVersion().c_str());

    resolve(result);
}

RCT_REMAP_METHOD(testColor,
                 testColorWithName:(NSString *)name
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *result = @(tirlvalidator::testColor([name UTF8String]).c_str());

    resolve(result);
}

RCT_REMAP_METHOD(findBarcode,
                 findBarcodeWithName:(NSString *)name withFlash:(BOOL)flash
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *result = @(tirlvalidator::findBarcode([name UTF8String], flash).c_str());

    resolve(result);
}

RCT_REMAP_METHOD(processLabel,
                 processLabelWithData:(NSString *)data
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *result = @(tirlvalidator::processLabel(std::string([data UTF8String])).c_str());

    resolve(result);
}

RCT_REMAP_METHOD(authenticate,
                 authenticateWithLabel:(NSString *)label withImage:(NSString *)image
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *result = @(tirlvalidator::authenticate(std::string([label UTF8String]), std::string([image UTF8String])).c_str());

    resolve(result);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTirlValidatorSpecJSI>(params);
}
#endif

@end
