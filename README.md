# Nombre del Proyecto

Proyecto para prueba técnica de un buscador de medicamentos mediante la API [OpenFDA](https://open.fda.gov/apis/) y ver todas las características de los mismos.

## Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos

Qué cosas necesitas para instalar el software y cómo instalarlas.

- Node.js 
- npm o yarn

### Instalación

Una serie de ejemplos paso a paso que te indican cómo ejecutar un entorno de desarrollo.

Clona el repositorio:

```bash
git clone https://github.com/albinramos/jaraxa_prueba_tecnica.git

Instala las dependencias:

npm install

o si usas yarn:

yarn install

Configuración de Variables de Entorno
Para que el proyecto funcione correctamente, necesitas añadir tu clave pública de la API de OpenFDA. Sigue estos pasos para configurarla:

1. Ve a OpenFDA APIs y obtén tu clave pública.
2. En la raíz del proyecto, encontrarás un archivo llamado .env.example. Cópialo y renómbralo a .env.
3. Abre el archivo .env y reemplaza el valor de VITE_GOV_API_KEY con tu clave pública obtenida en el paso 1.

VITE_GOV_API_KEY=tu_clave_publica_aqui

Ejecutando el proyecto
Una vez configuradas las variables de entorno, puedes iniciar el servidor de desarrollo:

npm run dev

o si usas yarn:

yarn dev

Construido con:
· React - El framework web usado
· Vite - Herramienta de construcción