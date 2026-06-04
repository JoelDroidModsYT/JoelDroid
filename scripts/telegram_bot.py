import sys
import os
import re
import requests
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator

# ──────────────────────────────────────────────
# CONFIG
# ──────────────────────────────────────────────
TELEGRAM_TOKEN   = os.environ["TELEGRAM_TOKEN"]
TELEGRAM_CHAT_ID = os.environ["TELEGRAM_CHAT_ID"]
BASE_URL         = "https://joeldroidmods.com"

# ──────────────────────────────────────────────
# LEER HTML
# ──────────────────────────────────────────────
def load_html(filepath: str) -> BeautifulSoup:
    with open(filepath, "r", encoding="utf-8") as f:
        return BeautifulSoup(f.read(), "lxml")

# ──────────────────────────────────────────────
# EXTRAER DATOS DEL JUEGO
# ──────────────────────────────────────────────
def extract_game_data(soup: BeautifulSoup, filepath: str) -> dict:
    data = {}

    # --- TÍTULO ---
    # Busca en <title>, <h1>, o meta og:title
    title_tag = (
        soup.find("h1") or
        soup.find("meta", property="og:title") or
        soup.find("title")
    )
    if title_tag:
        raw_title = title_tag.get("content", "") or title_tag.get_text()
        data["title"] = raw_title.strip().upper()
    else:
        data["title"] = "UNKNOWN GAME"

    # --- VERSIÓN ---
    # Busca patrones como "Version 1.2.3", "v1.2.3", "UPDATE 1.2.3"
    full_text = soup.get_text(" ", strip=True)
    version_match = re.search(
        r'(VERSION|UPDATE|v)\s*([\d]+[\d\.]+[\d]+)',
        full_text,
        re.IGNORECASE
    )
    if version_match:
        prefix = version_match.group(1).upper()   # VERSION / UPDATE / V
        number = version_match.group(2)
        # Normaliza: VERSION y UPDATE se mantienen; V → VERSION
        if prefix == "V":
            prefix = "VERSION"
        data["version"] = f"{prefix} {number}"
    else:
        # Fallback: busca en meta tags
        meta_version = soup.find("meta", attrs={"name": re.compile(r'version', re.I)})
        data["version"] = meta_version["content"].upper() if meta_version else "VERSION N/A"

    # --- ICONO / IMAGEN ---
    # Prioridad: og:image > img con clase icon/logo > primera img
    og_image = soup.find("meta", property="og:image")
    if og_image and og_image.get("content"):
        img_url = og_image["content"]
    else:
        img_tag = (
            soup.find("img", class_=re.compile(r'icon|logo|thumb', re.I)) or
            soup.find("img")
        )
        img_url = img_tag["src"] if img_tag and img_tag.get("src") else ""

    # Convierte rutas relativas a absolutas
    if img_url and not img_url.startswith("http"):
        img_url = BASE_URL.rstrip("/") + "/" + img_url.lstrip("/")
    data["image_url"] = img_url

    # --- DESCRIPCIÓN MOD ---
    # Busca secciones con "MOD", "Features", "Info", "Características"
    mod_desc = ""
    patterns = [
        re.compile(r'mod\s*(info|features|menu|detail)', re.I),
        re.compile(r'(features|características|descripción|description)', re.I),
        re.compile(r'(dinero|gold|coins|gems|premium|unlocked|level)', re.I),
    ]
    # Intenta encontrar un contenedor relevante
    for pattern in patterns:
        tag = soup.find(
            lambda t: t.name in ["div", "ul", "p", "section", "span"]
            and t.get_text()
            and pattern.search(t.get_text()),
        )
        if tag:
            mod_desc = tag.get_text(" ", strip=True)
            # Limita a 300 caracteres para no saturar el mensaje
            mod_desc = mod_desc[:300].strip()
            break

    if not mod_desc:
        # Último recurso: busca lista <ul> o <li> cerca de "mod"
        for li in soup.find_all("li"):
            text = li.get_text(strip=True)
            if text:
                mod_desc += f"• {text}\n"
                if len(mod_desc) > 250:
                    break

    data["mod_desc_es"] = mod_desc.strip() if mod_desc else "MOD apk"

    # --- URL DE LA PÁGINA DEL JUEGO ---
    # Convierte el filepath en URL: "games/mi-juego.html" → "/games/mi-juego"
    slug = filepath.replace("\\", "/").replace(".html", "")
    data["page_url"] = f"{BASE_URL}/{slug.lstrip('/')}"

    return data


# ──────────────────────────────────────────────
# TRADUCIR DESCRIPCIÓN
# ──────────────────────────────────────────────
def translate_to_english(text: str) -> str:
    if not text:
        return "MOD apk"
    try:
        translator = GoogleTranslator(source="auto", target="en")
        return translator.translate(text)
    except Exception as e:
        print(f"[WARN] Traducción fallida: {e}")
        return text


# ──────────────────────────────────────────────
# ENVIAR A TELEGRAM
# ──────────────────────────────────────────────
def send_telegram_photo(image_url: str, caption: str, reply_markup: dict) -> bool:
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendPhoto"
    payload = {
        "chat_id":      TELEGRAM_CHAT_ID,
        "photo":        image_url,
        "caption":      caption,
        "parse_mode":   "HTML",
        "reply_markup": reply_markup,
    }
    resp = requests.post(url, json=payload, timeout=30)
    result = resp.json()
    if not result.get("ok"):
        print(f"[ERROR] Telegram API: {result}")
        return False
    print("[OK] Mensaje enviado correctamente.")
    return True


def send_telegram_message(text: str, reply_markup: dict) -> bool:
    """Fallback si no hay imagen disponible."""
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        "chat_id":      TELEGRAM_CHAT_ID,
        "text":         text,
        "parse_mode":   "HTML",
        "reply_markup": reply_markup,
    }
    resp = requests.post(url, json=payload, timeout=30)
    result = resp.json()
    if not result.get("ok"):
        print(f"[ERROR] Telegram API: {result}")
        return False
    print("[OK] Mensaje enviado (sin imagen).")
    return True


# ──────────────────────────────────────────────
# CONSTRUIR MENSAJE
# ──────────────────────────────────────────────
def build_message(data: dict) -> str:
    title   = data["title"]
    version = data["version"]
    mod_en  = data["mod_desc_en"]

    message = (
        f"🎮 <b>{title}</b>\n\n"
        f"🆕 <b>NEW UPDATE</b>\n"
        f"📦 <b>{version}</b>\n\n"
        f"✅ <b>MOD INFO:</b>\n"
        f"<i>{mod_en}</i>"
    )
    return message


def build_inline_keyboard(page_url: str) -> dict:
    return {
        "inline_keyboard": [[
            {
                "text": "📥 DOWNLOAD UPDATE MOD",
                "url":  page_url,
            }
        ]]
    }


# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main():
    if len(sys.argv) < 2:
        print("Uso: python notify_telegram.py <ruta/al/archivo.html>")
        sys.exit(1)

    filepath = sys.argv[1]

    if not os.path.exists(filepath):
        print(f"[SKIP] Archivo no encontrado (puede haber sido eliminado): {filepath}")
        sys.exit(0)

    print(f"[INFO] Procesando: {filepath}")

    soup = load_html(filepath)
    data = extract_game_data(soup, filepath)

    print(f"  Título  : {data['title']}")
    print(f"  Versión : {data['version']}")
    print(f"  Imagen  : {data['image_url']}")
    print(f"  Desc ES : {data['mod_desc_es'][:80]}...")
    print(f"  URL     : {data['page_url']}")

    # Traducir descripción
    data["mod_desc_en"] = translate_to_english(data["mod_desc_es"])
    print(f"  Desc EN : {data['mod_desc_en'][:80]}...")

    caption       = build_message(data)
    reply_markup  = build_inline_keyboard(data["page_url"])

    # Enviar con foto si hay imagen, si no solo texto
    if data["image_url"]:
        send_telegram_photo(data["image_url"], caption, reply_markup)
    else:
        send_telegram_message(caption, reply_markup)


if __name__ == "__main__":
    main()
