# 🧭 Plataforma de Empleo - Clúster Galicia

Este proyecto es una plataforma web de empleo orientada a empresas y usuarios en la región de Galicia. Su objetivo es facilitar el acceso a ofertas laborales activas y permitir que las empresas gestionen sus propias publicaciones de manera sencilla y segura.

---

## 🌐 Funcionalidad general

- Los **usuarios anónimos** pueden:
  - Acceder a la plataforma sin registrarse.
  - Visualizar todas las **ofertas de empleo activas**.

- Las **empresas** pueden:
  - Iniciar sesión mediante un sistema de autenticación básica.
  - Ver y gestionar **solo sus propias ofertas** en una tabla privada.
  - **Activar o desactivar** sus ofertas publicadas.
  - Publicar **nuevas ofertas de empleo**, que aparecerán automáticamente en su panel.

---

## 🚀 Usuarios de Prueba
1-Candidato
USER: Nando5P
PASS: 456789

2-Empresa
USER: cinfo
PASS: 456789

3-Administrador
USER:admin 
PASS: 456789

## 🔐 Acceso empresarial

Las empresas se autentican mediante su **correo electrónico** y **contraseña**.  
Una vez logueadas, obtienen acceso exclusivo a:

- Tabla con **sus ofertas laborales**.
- Estado de activación de cada oferta (activa/inactiva).
- Un apartado para **publicar nuevas ofertas**, las cuales se asignan automáticamente a su perfil.

---

## 🛠️ Tecnologías usadas

- **Frontend:** Angular
- **Backend:** Java Spring Boot
- **Base de datos:** PostgreSQL
- **Comunicación cliente-servidor:** REST API
- **Autenticación:** Basic Auth + token almacenado en `sessionStorage`

---

## 📂 Estructura básica

- `login.component.ts`: Manejo del formulario de login y persistencia del token.
- `nav.component.ts`: Navegación dinámica según el estado de sesión.
- `publicar-oferta.component.ts`: Formulario para enviar nuevas ofertas.
- `mostrar-ofertas.component.ts`: Página pública con todas las ofertas activas.
- `tabla-ofertas-empresa.component.ts`: Panel privado de cada empresa con sus ofertas.

---

## 📌 Estado del proyecto

🔧 En desarrollo activo.  
🎯 Funcional para pruebas con usuarios reales.  
🌱 Enfocado en la región de **Galicia** como zona piloto.

---

## 👤 Autor

Proyecto desarrollado por G4 para prácticas y desarrollo web profesional.  
Inspirado en necesidades reales del mercado laboral local y enfocado en crear soluciones accesibles y útiles para empresas y trabajadores.

---

