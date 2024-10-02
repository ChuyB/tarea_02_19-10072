#include "config.h"

// Vertex Shader source code
const char *vertexShaderSource =
    "#version 330 core\n"
    "layout (location = 0) in vec3 aPos;\n"
    "layout (location = 1) in vec3 vertexColor;\n"
    "varying vec3 fragColor;"
    "void main()\n"
    "{\n"
    "   fragColor = vertexColor;"
    "   gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n"
    "}\0";

// Fragment Shader source code
const char *fragmentShaderSource = "#version 330 core\n"
                                   "out vec4 FragColor;\n"
                                   "varying vec3 fragColor;"
                                   "void main()\n"
                                   "{\n"
                                   "   FragColor = vec4(fragColor, 1.0f);\n"
                                   "}\n\0";

int main() {
  GLFWwindow *window;

  if (!glfwInit()) {
    std::cout << "GLFW couldn't start" << std::endl;
    return -1;
  }

  GLfloat vertices[] = {-0.5f, -0.435f, 0.0f, 1.0f, 0.0f, 0.0f,
                        0.5f,  -0.435f, 0.0f, 0.0f, 1.0f, 0.0f,
                        0.0f,  0.435f,  0.0f, 0.0f, 0.0f, 1.0f};

  window = glfwCreateWindow(800, 800, "Triángulo", NULL, NULL);
  glfwMakeContextCurrent(window);

  if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) {
    glfwTerminate();
    return -1;
  }

  glClearColor(0.24f, 0.24f, 0.24f, 1.0f);

  GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);
  glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
  glCompileShader(vertexShader);

  GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
  glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);
  glCompileShader(fragmentShader);

  GLuint shaderProgram = glCreateProgram();

  glAttachShader(shaderProgram, vertexShader);
  glAttachShader(shaderProgram, fragmentShader);
  glLinkProgram(shaderProgram);

  glDeleteShader(vertexShader);
  glDeleteShader(fragmentShader);

  /* GLuint VAO, VBO; */
  GLuint VBO;
  /* glGenVertexArrays(1, &VAO); */
  glGenBuffers(1, &VBO);
  /* glBindVertexArray(VAO); */
  glBindBuffer(GL_ARRAY_BUFFER, VBO);
  glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

  glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(GLfloat),
                        (GLvoid *)0);
  glEnableVertexAttribArray(0);

  glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(GLfloat),
                        (GLvoid *)(3 * sizeof(GLfloat)));
  glEnableVertexAttribArray(1);

  /* glBindBuffer(GL_ARRAY_BUFFER, 0); */
  /* glBindVertexArray(0); */

  while (!glfwWindowShouldClose(window)) {
    glfwPollEvents();

    glClear(GL_COLOR_BUFFER_BIT);

    glUseProgram(shaderProgram);
    /* glBindVertexArray(VAO); */
    glDrawArrays(GL_TRIANGLES, 0, 3);

    glfwSwapBuffers(window);
  }

  /* glDeleteVertexArrays(1, &VAO); */
  glDeleteBuffers(1, &VBO);

  glfwDestroyWindow(window);
  glfwTerminate();
  return 0;
}
