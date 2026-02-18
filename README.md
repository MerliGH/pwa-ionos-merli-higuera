# PWA IONOS - Mariela Higuera

## Universidad Tecnológica de Tijuana
**Materia:** Desarrollo Web Profesional  
**Docente:** Miguel Ángel Cardona Contreras  

---

# Parte 1: Investigación Técnica - Pilares de una PWA

## Introducción

Una Progressive Web Application (PWA) es una aplicación web que utiliza tecnologías modernas del navegador para ofrecer una experiencia similar a una aplicación nativa. Permite instalación en el dispositivo, funcionamiento offline y mejor rendimiento.

Las PWAs se basan principalmente en tres pilares: Web App Manifest, Service Workers y ejecución bajo HTTPS.

---

## 1. Web App Manifest (manifest.json)

El Web App Manifest es un archivo en formato JSON que permite que una aplicación web sea reconocida como instalable por el navegador y el sistema operativo.

### theme_color

Define el color principal de la interfaz cuando la aplicación está abierta. En dispositivos móviles influye en la barra superior del sistema.

### background_color

Define el color que aparece en la pantalla de carga (splash screen) mientras la aplicación se inicializa.

### display (standalone vs browser)

La propiedad `display` controla cómo se muestra la aplicación:

- `browser`: Se comporta como un sitio web tradicional.
- `standalone`: Se muestra como una aplicación independiente sin barra del navegador.

El modo `standalone` permite que la experiencia sea similar a una aplicación nativa.

### Importancia del array de icons

El array `icons` define múltiples tamaños de iconos (generalmente 192x192 y 512x512 píxeles).

Son necesarios para:

- Instalación en pantalla de inicio  
- Splash screen  
- Compatibilidad con distintos dispositivos  
- Icono del sistema operativo  

Sin iconos válidos, el navegador puede no permitir la instalación.

---

## 2. Service Workers

Un Service Worker es un script que se ejecuta en segundo plano y actúa como un proxy programable entre la aplicación web y la red.

No tiene acceso directo al DOM y se ejecuta de manera independiente al hilo principal.

### Proceso de Registro

El Service Worker se registra desde el archivo principal utilizando:

`navigator.serviceWorker.register('/sw.js')`

Esto permite que el navegador lo instale y lo ejecute automáticamente.

### Ciclo de Vida

#### Installation

Se ejecuta cuando el Service Worker se instala por primera vez.  
En esta etapa se almacenan en caché los recursos esenciales (App Shell).

#### Activation

Ocurre cuando el Service Worker reemplaza una versión anterior.  
Permite eliminar cachés antiguos y tomar control de la aplicación.

#### Fetching

Intercepta las solicitudes de red realizadas por la aplicación.  
Permite decidir si responder desde caché o desde la red.

### ¿Cómo actúan como proxy de red?

El Service Worker intercepta las solicitudes HTTP mediante el evento `fetch`.

Desde ese punto puede:

- Servir contenido desde caché  
- Modificar respuestas  
- Reintentar solicitudes  
- Implementar estrategias de almacenamiento  

Esto permite funcionamiento offline y mejora el rendimiento.

---

## 3. Estrategias de Almacenamiento (Caching)

### Cache First

Busca primero en caché y solo va a la red si no encuentra el recurso.  
Ideal para archivos estáticos.

### Network First

Intenta primero obtener el recurso desde la red.  
Si falla, utiliza la versión en caché.  
Ideal para datos dinámicos.

### Stale-While-Revalidate

Sirve inmediatamente desde caché y actualiza en segundo plano.  
Combina velocidad y actualización constante.

---

## 4. Seguridad y TLS

### ¿Por qué HTTPS es un requisito habilitador para los Service Workers?

Los Service Workers solo funcionan en contextos seguros (HTTPS).

Esto es obligatorio porque pueden interceptar y modificar tráfico de red.  
HTTPS garantiza:

- Integridad del código  
- Protección contra ataques Man-in-the-Middle  
- Seguridad en la transmisión de datos  

### Impacto de los certificados en el "Install Prompt"

El navegador solo permite instalar una PWA si:

- El sitio está servido bajo HTTPS  
- Existe un manifest válido  
- Existe un Service Worker activo  

Sin certificado SSL válido, la aplicación no será considerada instalable.
