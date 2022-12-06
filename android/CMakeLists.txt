cmake_minimum_required(VERSION 3.4.1)

set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 17)

add_library(cpp
            SHARED
            ../cpp/tirl-validator.cpp
            cpp-adapter.cpp
)

get_filename_component(PARENT_DIR ${PROJECT_SOURCE_DIR} DIRECTORY)

add_library(libzortag STATIC IMPORTED)
set_target_properties(libzortag PROPERTIES IMPORTED_LOCATION ${PARENT_DIR}/cpp/zortag/${ANDROID_ABI}/libzortag.a)

target_link_libraries(cpp libzortag)

# Specifies a path to native header files.
include_directories(
            ../cpp
)
