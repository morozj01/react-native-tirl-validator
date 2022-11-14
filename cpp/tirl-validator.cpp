#include "tirl-validator.h"
#include "libzortag.h"

namespace tirlvalidator
{
	std::string libraryVersion()
	{
		return zortag::library_version();
	}
}
