#include "config.h"

// Código del shader para los vértices
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

// Código para el shader del fragmento
const char *fragmentShaderSource = "#version 330 core\n"
                                   "out vec4 FragColor;\n"
                                   "varying vec3 fragColor;"
                                   "void main()\n"
                                   "{\n"
                                   "   FragColor = vec4(fragColor, 1.0f);\n"
                                   "}\n\0";

// Función principal
int main() {
  // Referencia a una ventana de GLFW
  GLFWwindow *window;

  // Inicialización de GLFW, si hay un error se muestra un mensaje
  if (!glfwInit()) {
    std::cout << "GLFW no se ha podido inicializar" << std::endl;
    return -1;
  }

  // Ubicación de los vértices y color de los mismos
  // Cada 6 valores es un vértice,
  // los primeros 3 son la posición y los siguientes 3 son el color
  GLfloat vertices[] = {-0.5f, -0.435f, 0.0f, 1.0f, 0.0f, 0.0f,
                        0.5f,  -0.435f, 0.0f, 0.0f, 1.0f, 0.0f,
                        0.0f,  0.435f,  0.0f, 0.0f, 0.0f, 1.0f};

  // Creación de la ventana de 800x800 con el título "Triángulo"
  window = glfwCreateWindow(800, 800, "Triángulo", NULL, NULL);
  glfwMakeContextCurrent(window);

  if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) {
    glfwTerminate();
    return -1;
  }

  // Establecer el color de fondo
  glClearColor(0.24f, 0.24f, 0.24f, 1.0f);

  // --- Compilación de los shaders ---

  // Shader de los vértices
  GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);
  glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
  glCompileShader(vertexShader);

  // Shader de los fragmentos
  GLuint fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
  glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);
  glCompileShader(fragmentShader);

  // Programa de los shaders
  GLuint shaderProgram = glCreateProgram();

  // Enlazar los shaders al programa
  glAttachShader(shaderProgram, vertexShader);
  glAttachShader(shaderProgram, fragmentShader);
  glLinkProgram(shaderProgram);

  glDeleteShader(vertexShader);
  glDeleteShader(fragmentShader);
  // --- Fin de la compilación de los shaders ---

  // Buffer de vértices
  GLuint VBO; // Vertex Buffer Object
  glGenBuffers(1, &VBO);
  glBindBuffer(GL_ARRAY_BUFFER, VBO);
  // Añade la información de los vértices al buffer
  glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

  // Se añade la posición y se enlaza al atributo 0 del shader
  glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(GLfloat),
                        (GLvoid *)0);
  glEnableVertexAttribArray(0);

  // Se añade el color y se enlaza al atributo 1 del shader
  glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(GLfloat),
                        (GLvoid *)(3 * sizeof(GLfloat)));
  glEnableVertexAttribArray(1);

  // Loop Principal
  while (!glfwWindowShouldClose(window)) {
    glfwPollEvents();

    glClear(GL_COLOR_BUFFER_BIT);

    glUseProgram(shaderProgram);
    glDrawArrays(GL_TRIANGLES, 0, 3);

    glfwSwapBuffers(window);
  }

  // Limpieza de los buffers y terminación de GLFW
  glDeleteBuffers(1, &VBO);
  glfwDestroyWindow(window);
  glfwTerminate();
  return 0;
}
