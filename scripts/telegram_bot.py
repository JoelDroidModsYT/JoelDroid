import json
import os
import requests
from deep_translator import GoogleTranslator

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────
TELEGRAM_TOKEN   = os.environ["TELEGRAM_TOKEN"]
TELEGRAM_CHAT_ID = os.environ["TELEGRAM_CHAT_ID"]
GAMES_JSON_PATH  = "games.json"

# ──────────────────────────────────────────────
# 1. CARGAR games.json Y TOMAR EL PRIMER JUEGO
# ──────────────────────────────────────────────
def load_latest_game() -> dict:
    with open(GAMES_JSON_PATH, "r", encoding="utf-8") as f:
        games = json.load(f)

    if not games:
        raise ValueError("games.json está vacío.")

    # El primer elemento es el más reciente
    return games[0]

# ──────────────────────────────────────────────
# 2. TRADUCIR DESCRIPCIÓN (solo description)
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
    title   = game["title"]                    # Sin modificar
    version = f"VERSION {game['version']}"     # VERSION siempre en mayúsculas

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
    """Fallback si la imagen falla o no existe."""
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
    print("[INFO] Cargando games.json...")
    game = load_latest_game()

    print(f"[INFO] Juego detectado: {game.get('title')} — v{game.get('version')}")

    # Extraer campos
    title       = game.get("title", "Unknown Game")
    version     = game.get("version", "N/A")
    description = game.get("description", "")
    image_url   = game.get("image", "")
    link        = game.get("link", "https://joeldroidmods.com")

    # Traducir descripción al inglés
    print(f"[INFO] Traduciendo: \"{description}\"")
    description_en = translate_description(description)
    print(f"[INFO] Traducción: \"{description_en}\"")

    # Construir mensaje y teclado
    caption      = build_caption(game, description_en)
    reply_markup = build_inline_keyboard(link)

    print("[INFO] Enviando a Telegram...")

    # Intentar con foto; si falla, enviar solo texto
    if image_url:
        try:
            send_photo(image_url, caption, reply_markup)
        except Exception as e:
            print(f"[WARN] Foto falló ({e}), intentando solo texto...")
            send_message_fallback(caption, reply_markup)
    else:
        print("[WARN] No hay imagen. Enviando solo texto.")
        send_message_fallback(caption, reply_markup)


if __name__ == "__main__":
    main()
