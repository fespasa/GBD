# Global Doctors - Demo de Telemedicina

Una demostració funcional d'una plataforma de telemedicina orientada a inversors, que permet simular un flux complet d'usuari amb triatge mèdic automatitzat i videotrucades simulades.

## 🎯 Objectiu

Crear una demo que mostri l'experiència d'usuari d'una plataforma de telemedicina que facilita el triatge mèdic i la derivació a professionals especialitzats.

## 🛠️ Stack Tecnològic

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Base de dades**: Dades en memòria (per la demo)
- **Control de versions**: Git amb commits semàntics

## 🧩 Funcionalitats Implementades

### 1. Autenticació i Registre
- Formulari de registre multi-pas (informació personal, administrativa i mèdica)
- Sistema d'autenticació simulat
- Accés demo sense registre

### 2. Selecció d'Especialitat
- **Adults**: Medicina general per a adults
- **Pediatria**: Atenció especialitzada per a nens
- **Dona**: Ginecologia i salut femenina
- **Salut Mental**: Suport psicològic i salut mental

### 3. Sistema de Triatge Automatitzat
- Preguntes específiques per cada especialitat
- Una pregunta per pantalla amb navegació controlada
- Algoritme de classificació automàtica (A > B > C > D)
- Missatges personalitzats segons el nivell d'urgència

### 4. Resultats i Accions
- Visualització del nivell d'urgència calculat
- Resum de totes les respostes donades
- Possibilitat d'adjuntar documents mèdics
- Simulació de videotrucada amb professionals

### 5. Videotrucada Simulada
- Interfície realista de videotrucada
- Controls d'àudio i vídeo
- Comptador de temps de trucada
- Simulació de connexió amb professional mèdic

## 🚀 Instal·lació i Execució

### Requisits Previs
- Node.js (versió 18 o superior)
- npm o yarn

### 1. Clonar el Repositori
```bash
git clone <repository-url>
cd GlobalDoctors
```

### 2. Configurar el Backend
```bash
cd backend
npm install
npm run dev
```
El servidor backend s'executarà a `http://localhost:3001`

### 3. Configurar el Frontend
```bash
cd frontend  
npm install
npm run dev
```
L'aplicació frontend s'executarà a `http://localhost:5173`

### 4. Accedir a l'Aplicació
Obri el navegador i vagi a `http://localhost:5173`

## 📋 Flux d'Usuari

1. **Pantalla de Benvinguda**: Opcions per registrar-se o iniciar sessió
2. **Registre**: Formulari multi-pas amb validació
3. **Selecció d'Especialitat**: Tria entre les 4 especialitats disponibles
4. **Triatge**: Respon preguntes una per una segons l'especialitat
5. **Resultats**: Visualitza el nivell d'urgència i recomanacions
6. **Accions**: Adjunta documents o inicia videotrucada
7. **Videotrucada**: Simulació de consulta virtual amb professional

## 🔧 Algoritme de Triatge

El sistema utilitza un algoritme de priorització on sempre prevaleix el pitjor nivell detectat:

- **Nivell A (URGENT)**: Situacions que requereixen atenció immediata (112)
- **Nivell B (PRIORITARI)**: Casos que necessiten atenció el mateix dia
- **Nivell C (NORMAL)**: Consultes que poden esperar uns dies
- **Nivell D (NO URGENT)**: Casos administratius o no urgents

```javascript
function determinarNivell(respostes) {
  let nivell = 'D';
  for (const resposta of respostes) {
    if (resposta.nivell === 'A') return 'A';
    if (resposta.nivell === 'B' && nivell !== 'A') nivell = 'B';
    if (resposta.nivell === 'C' && nivell === 'D') nivell = 'C';
  }
  return nivell;
}
```

## 📁 Estructura del Projecte

```
GlobalDoctors/
├── backend/
│   ├── server.js              # Servidor principal
│   ├── data/
│   │   └── questions.js       # Preguntes per especialitat
│   └── utils/
│       └── triage.js          # Lògica del triatge
├── frontend/
│   ├── src/
│   │   ├── components/        # Components reutilitzables
│   │   ├── pages/            # Pàgines de l'aplicació
│   │   ├── context/          # Gestió d'estat global
│   │   └── services/         # Comunicació amb l'API
│   └── public/
└── README.md
```

## 🔗 Endpoints de l'API

- `GET /` - Informació de l'API
- `POST /register` - Registre d'usuari
- `POST /login` - Autenticació d'usuari
- `GET /specialties` - Obtenir especialitats disponibles
- `GET /form/:specialty` - Obtenir preguntes per especialitat
- `POST /triage` - Processar triatge i calcular nivell
- `POST /upload-documents` - Pujar documents mèdics

## 🎨 Disseny i UX

- **Disseny responsiu** amb Tailwind CSS
- **Interfície intuïtiva** amb navegació clara
- **Indicadors de progrés** en formularis multi-pas
- **Feedback visual** segons el nivell d'urgència
- **Accessibilitat** amb colors i contrastos adequats

## 🔒 Consideracions de Seguretat

**Nota**: Aquesta és una demo per a presentació. En producció caldria implementar:
- Autenticació real amb JWT
- Xifrat de dades sensibles
- Validació exhaustiva al backend
- Comunicació HTTPS
- Compliment del RGPD per a dades sanitàries

## 🚦 Característiques Demo

- **Dades simulades**: Tots els usuaris i consultes es guarden en memòria
- **Videotrucada fictícia**: Simulació visual sense connexió real
- **Triatge funcional**: Algoritme real basat en protocols mèdics
- **Interfície completa**: Experiència d'usuari completa i funcional

## 📞 Suport

Per a preguntes sobre aquesta demo o funcionalitats adicionals, contacti amb l'equip de desenvolupament de Global Doctors.

---

**DEMO - Global Doctors 2025** | Plataforma de telemedicina per a inversors