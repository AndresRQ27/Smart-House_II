INSTRUCCIONES PARA EJECUTAR LA APLICACIÓN

1. Para crosscompilar la aplicación primero debe configurar el ambiente por medio del comando:

  $source /opt/poky/2.7.1/environment-setup-cortexa7t2hf-neon-vfpv4-poky-linux-gnueabi

2. Posteriormente debe crear un directorio build y llamar a CMake:
  
  $mkdir build
  $cd build
  $cmake ../ -DCMAKE_TOOLCHAIN_FILE=../Toolchain_Raspberry.cmake
  $make

3. Después de este comando ya tendrá el ejecutable en la carpeta build y la biblioteca en la carpeta lib. Ahora debe copiar el ejecutable a la carpeta que desee en la SD, y la biblioteca al directorio /usr/lib/.

4. Luego de haber copiado los archivos se introduce la SD en la Raspberry y se ejecuta el binario con:

  $./gpiotest

  Para ver el funcionamiento, conecte un led al gpio7 y este debería ser blink por 2 segundos.