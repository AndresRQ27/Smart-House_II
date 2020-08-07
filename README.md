# Smart-House_II

El proyecto desarrolla un sistema embebido con sistema de cerradura electrónica “inteligente” y luces LED en serie, el cual consiste en un conjunto de funcionalidades que facilitan a los habitantes de una casa u edificio ver cuándo se abren/cierran las puertas y puede encender luces de manera digital. Se cuenta con una funcionalidad de alarma y detección de intrusos por medio de sensores de proximidad y una cámara. Además, se implementa una aplicación móvil de forma que el usuario pueda controlar el sistema desde su celular. 

Para el proyecto, se utilizó Yocto Project para desarrollar una imagen en linux a la medida, utilizando Python para el control de la cámara y streaming de video de la misma. También se utilizó NodeJS para la comunicación con un servidor que luego notifica a la aplicación móvil de algún evento importante. Por último, se desarrolla un driver en bare-metal para comunicarse con el GPIO del sistema.
