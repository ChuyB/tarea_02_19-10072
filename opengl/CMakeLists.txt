cmake_minimum_required(VERSION 3.0)
project(openglTriangle VERSION 1.0)

add_executable(openglTriangle src/config.h src/main.cpp dependencies/glad/glad.c)

set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)

target_include_directories(openglTriangle PRIVATE dependencies)

add_subdirectory(dependencies/glfw)

find_package(OpenGL REQUIRED)

target_link_libraries(openglTriangle glfw OpenGL::GL)
