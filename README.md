# JoelDroid VIP — Telegram Bot Automático

Notifica automáticamente en Telegram cada vez que subes una actualización de juego a tu repo de GitHub Pages.

---

## 📁 Estructura

```
tu-repo/
├── .github/
│   └── workflows/
│       └── telegram-notify.yml   ← GitHub Action
└── scripts/
    └── notify_telegram.py        ← Script Python
```

---

## ⚙️ Configuración (solo una vez)

### 1. Agrega los Secrets en GitHub

Ve a tu repositorio → **Settings → Secrets and variables → Actions → New repository secret**

| Secret            | Valor                                      |
|-------------------|--------------------------------------------|
| `TELEGRAM_TOKEN`  | Token de tu bot (obtenido de @BotFather)   |
| `TELEGRAM_CHAT_ID`| ID de tu canal (ej: `@JoelDroidVIP`)       |

### 2. Sube estos archivos a tu repo

Copia las carpetas `.github/` y `scripts/` a la raíz de tu repositorio de GitHub Pages y haz push.

---

## 🚀 Cómo funciona

1. Haces `git push` con un archivo `.html` nuevo o modificado.
2. GitHub Actions detecta el cambio automáticamente.
3. El script extrae del HTML: título, versión, imagen y descripción MOD.
4. Traduce la descripción al inglés con `deep-translator`.
5. Envía al canal de Telegram: foto del juego + info + botón de descarga.

---

## 📦 Dependencias (instaladas automáticamente en el Action)

```
requests
beautifulsoup4
deep-translator
lxml
```

---

## 💬 Formato del mensaje en Telegram

```
🎮 NOMBRE DEL JUEGO

🆕 NEW UPDATE
📦 VERSION 1.2.3

✅ MOD INFO:
Unlimited Money, God Mode

[📥 DOWNLOAD UPDATE MOD]
```
