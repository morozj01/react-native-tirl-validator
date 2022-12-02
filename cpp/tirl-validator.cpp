#include "tirl-validator.h"
#include "libzortag.h"
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

namespace tirlvalidator
{
	std::string libraryVersion()
	{
		return zortag::library_version();
	}

	uint8_t *getPixels(const char *fileName, int *width, int *height)
	{
		int n;
		uint8_t *pixels = (uint8_t *)stbi_load(fileName, width, height, &n, 3);
		return pixels;
	}

	std::string testColor(const char *fileName)
	{
		int width, height;
		uint8_t *pixels = getPixels(fileName, &width, &height);
		std::string color = zortag::test_color(pixels, width, height);
		stbi_image_free(pixels);
		return color;
	}

	std::string findBarcode(const char *fileName, bool flash)
	{
		int width, height;
		uint8_t *pixels = getPixels(fileName, &width, &height);
		std::string barcodeData = zortag::find_barcode(pixels, width, height, flash);
		stbi_image_free(pixels);
		return barcodeData;
	}

	std::string processLabel(std::string barcodeData)
	{
		std::string labelData = zortag::process_label(barcodeData, "{\"version\":1}");
		return labelData;
	}
}
