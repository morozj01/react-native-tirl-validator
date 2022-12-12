#pragma once
#ifndef ZORTAG_H
#define ZORTAG_H

#include <cstdint>
#include <optional>
#include <string>

namespace zortag
{

  std::string library_version();

  std::string test_color(const std::uint8_t *pixels, int width, int height);

  std::string find_barcode(const std::uint8_t *pixels, int width, int height, bool flash);

  std::string process_label(const std::string &barcode_data, const std::string &version_data);

  std::string add_location(const std::string &label_data,
                           std::optional<double> latitude, std::optional<double> longitude, std::optional<double> position_accuracy,
                           std::optional<double> altitude, std::optional<double> altitude_accuracy);

  std::string authenticate(const std::string &label_data, const std::string &fingerprint_data);

}

#endif
