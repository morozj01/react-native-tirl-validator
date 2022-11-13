#ifdef __cplusplus
#import "tirl-validator.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTirlValidatorSpec.h"

@interface TirlValidator : NSObject <NativeTirlValidatorSpec>
#else
#import <React/RCTBridgeModule.h>

@interface TirlValidator : NSObject <RCTBridgeModule>
#endif

@end
