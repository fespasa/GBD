# 🚀 Despliegue en GitHub Pages

Esta guía te ayudará a publicar la demo de Global Doctors en GitHub Pages.

## ⚠️ **IMPORTANTE: Consideraciones de Seguridad**

Esta aplicación de telemedicina está configurada como **DEMO ÚNICAMENTE**. Para uso en producción real:

- ✅ Implementar HTTPS obligatorio
- ✅ Autenticación robusta con JWT/OAuth
- ✅ Validación médica profesional  
- ✅ Cumplimiento GDPR/HIPAA
- ✅ Backend seguro con base de datos encriptada
- ✅ Auditoría médica y logs completos

## 📋 **Pasos para el Despliegue**

### 1. **Crear Repositorio en GitHub**
```bash
# Ve a GitHub.com y crea un nuevo repositorio público
# Nombre sugerido: globaldoctors-demo
```

### 2. **Configurar Remote y Actualizar URLs**
```bash
# Configura el repositorio remoto
git remote add origin https://github.com/fespasa/GBD.git

# ✅ Ya configurado:
# - vite.config.js: base: '/GBD/'
# - package.json: "homepage": "https://fespasa.github.io/GBD"
```

### 3. **Actualizar Configuración**
Edita estos archivos antes del despliegue:

**frontend/vite.config.js:**
```javascript
base: '/GBD/', // ✅ Configurado
```

**frontend/package.json:**
```json
"homepage": "https://fespasa.github.io/GBD" // ✅ Configurado
```

### 4. **Build y Deploy**
```bash
# Conectar repositorio remoto
git remote add origin https://github.com/fespasa/GBD.git
git push -u origin main

# Navegar al frontend
cd frontend

# Build para producción
npm run build

# Deploy a GitHub Pages
npm run deploy
```

### 5. **Configurar GitHub Pages**
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "gh-pages" / root
5. Save

## 🌐 **URL Final**
Tu demo estará disponible en:
```
https://fespasa.github.io/GBD
```

## ✨ **Funcionalidades Demo**

La versión GitHub Pages incluye:
- ✅ **Triaje médico completo** con parada inteligente
- ✅ **Programación de citas** estilo Calendly
- ✅ **Datos simulados** sin necesidad de backend
- ✅ **Interfaz completa** con branding Global Doctors
- ✅ **Flujos médicos realistas** para demostración

## 🔧 **Modo Demo vs Producción**

### **Modo Demo (GitHub Pages):**
- Datos simulados en memoria
- Sin persistencia de datos
- Funcionalidades completas para demostración
- Sin requerimientos de backend

### **Modo Producción:**
- Backend Node.js/Express requerido  
- Base de datos para persistencia
- Autenticación real
- Validaciones médicas

## 📱 **Personalización**

Para personalizar la demo:
- Modifica `frontend/src/services/demoService.js`
- Ajusta preguntas y especialidades
- Cambia branding y colores
- Actualiza horarios disponibles

## 🛠 **Comandos Útiles**

```bash
# Build local para testing
npm run build && npm run preview

# Deploy rápido
npm run deploy

# Ver logs de GitHub Pages
# Ve a Actions tab en GitHub
```

---

**⚠️ RECORDATORIO:** Esta es una demo educativa. Para uso médico real, implementa todas las medidas de seguridad y cumplimiento normativo necesarias.