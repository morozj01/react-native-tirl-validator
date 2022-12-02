#ifndef TIRLVALIDATOR_H
#define TIRLVALIDATOR_H

#include <string>

namespace tirlvalidator
{
  std::string libraryVersion();
  std::string testColor(const char *fileName);
  std::string findBarcode(const char *fileName, bool flash);
  std::string processLabel(std::string barcodeData);
}

#endif /* TIRLVALIDATOR_H */
