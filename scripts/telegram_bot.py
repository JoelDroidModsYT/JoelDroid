import os
import requests
from deep_translator import GoogleTranslator

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────
TELEGRAM_TOKEN   = os.environ["TELEGRAM_TOKEN"]
TELEGRAM_CHAT_ID = os.environ["TELEGRAM_CHAT_ID"]

GIST_URL = (
    "https://gist.githubusercontent.com/"
    "JoelDroidModsYT/5981d391897fe461dc5ac9ba7303b8f2/raw/games.json"
)

# ──────────────────────────────────────────────
# 1. OBTENER games.json DESDE EL GIST
# ──────────────────────────────────────────────
def load_latest_game() -> dict:
    print(f"[INFO] Descargando games.json desde Gist...")
    try:
        resp = requests.get(GIST_URL, timeout=15)
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        raise RuntimeError("Sin conexión. No se pudo alcanzar el Gist.")
    except requests.exceptions.Timeout:
        raise RuntimeError("Timeout: el Gist tardó demasiado en responder.")
    except requests.exceptions.HTTPError as e:
        raise RuntimeError(f"Error HTTP al acceder al Gist: {e}")

    try:
        games = resp.json()
    except ValueError:
        raise RuntimeError("El Gist no devolvió un JSON válido.")

    if not isinstance(games, list) or len(games) == 0:
        raise ValueError("games.json está vacío o no es una lista.")

    print(f"[INFO] {len(games)} juego(s) encontrado(s). Tomando el primero...")
    return games[0]

# ──────────────────────────────────────────────
# 2. TRADUCIR DESCRIPCIÓN
# ──────────────────────────────────────────────
def translate_description(text: str) -> str:
    if not text:
        return "MOD apk"
    try:
        translated = GoogleTranslator(source="auto", target="en").translate(text)
        return translated
    except Exception as e:
        print(f"[WARN] Traducción fallida, usando original: {e}")
        return text

# ──────────────────────────────────────────────
# 3. CONSTRUIR MENSAJE
# ──────────────────────────────────────────────
def build_caption(game: dict, description_en: str) -> str:
    title   = game["title"]
    version = f"VERSION {game['version']}"

    caption = (
        f"🔥 <b>NEW UPDATE: {title}</b>\n\n"
        f"✅ <b>{version}</b>\n\n"
        f"🛠 <b>Mod Info:</b> {description_en}\n\n"
        f"📥 <b>DOWNLOAD FROM:</b> joeldroidmods.com"
    )
    return caption

def build_inline_keyboard(link: str) -> dict:
    return {
        "inline_keyboard": [[
            {
                "text": "📥 DOWNLOAD UPDATE MOD",
                "url": link
            }
        ]]
    }

# ──────────────────────────────────────────────
# 4. ENVIAR A TELEGRAM
# ──────────────────────────────────────────────
def send_photo(image_url: str, caption: str, reply_markup: dict) -> None:
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendPhoto"
    payload = {
        "chat_id":      TELEGRAM_CHAT_ID,
        "photo":        image_url,
        "caption":      caption,
        "parse_mode":   "HTML",
        "reply_markup": reply_markup,
    }
    resp   = requests.post(url, json=payload, timeout=30)
    result = resp.json()

    if result.get("ok"):
        print(f"[OK] Notificación enviada: {result['result']['message_id']}")
    else:
        print(f"[ERROR] Telegram API rechazó el mensaje: {result}")
        raise RuntimeError(f"Telegram error: {result.get('description')}")

def send_message_fallback(caption: str, reply_markup: dict) -> None:
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id":      TELEGRAM_CHAT_ID,
        "text":         caption,
        "parse_mode":   "HTML",
        "reply_markup": reply_markup,
    }
    resp   = requests.post(url, json=payload, timeout=30)
    result = resp.json()

    if result.get("ok"):
        print("[OK] Mensaje enviado (sin imagen).")
    else:
        raise RuntimeError(f"Telegram error: {result.get('description')}")

# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main():
    # Cargar datos desde el Gist
    game = load_latest_game()

    print(f"[INFO] Juego: {game.get('title')} — v{game.get('version')}")

    # Extraer campos
    title       = game.get("title", "Unknown Game")
    version     = game.get("version", "N/A")
    description = game.get("description", "")
    image_url   = game.get("image", "")
    link        = game.get("link", "https://joeldroidmods.com")

    # Traducir descripción
    print(f"[INFO] Traduciendo: \"{description}\"")
    description_en = translate_description(description)
    print(f"[INFO] Traducción:  \"{description_en}\"")

    # Construir mensaje
    caption      = build_caption(game, description_en)
    reply_markup = build_inline_keyboard(link)

    print("[INFO] Enviando a Telegram...")

    if image_url:
        try:
            send_photo(image_url, caption, reply_markup)
        except Exception as e:
            print(f"[WARN] Foto falló ({e}), enviando solo texto...")
            send_message_fallback(caption, reply_markup)
    else:
        print("[WARN] Sin imagen. Enviando solo texto.")
        send_message_fallback(caption, reply_markup)


if __name__ == "__main__":
    main()
