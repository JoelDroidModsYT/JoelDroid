import os
import requests
from deep_translator import GoogleTranslator

# URL directa de tu Gist (la que me pasaste)
GIST_URL = "https://gist.githubusercontent.com/JoelDroidModsYT/5981d391897fe461dc5ac9ba7303b8f2/raw/games.json"

def main():
    # Obtener variables del entorno (Configuradas en el .yml)
    token = os.getenv('TELEGRAM_BOT_TOKEN')
    chat_id = os.getenv('TELEGRAM_CHAT_ID')
    
    try:
        # DESCARGAR el JSON desde la URL externa
        print("Conectando con el servidor de juegos...")
        response = requests.get(GIST_URL)
        response.raise_for_status()
        data = response.json()
        
        # Tomar el primer juego de la lista
        game = data[0]
        
        # Traducir descripción
        translator = GoogleTranslator(source='auto', target='en')
        description_en = translator.translate(game['description'])
        
        # Crear mensaje
        caption = (
            f"🔥 *NEW UPDATE:* {game['title']}\n\n"
            f"✅ *VERSION:* {game['version']}\n"
            f"🛠 *MOD INFO:* {description_en}\n\n"
            f"📥 *DOWNLOAD FROM:* joeldroidmods.com"
        )
        
        # Enviar a Telegram
        tele_url = f"https://api.telegram.org/bot{token}/sendPhoto"
        payload = {
            'chat_id': chat_id,
            'photo': game['image'],
            'caption': caption,
            'parse_mode': 'Markdown'
        }
        
        r = requests.post(tele_url, data=payload)
        if r.status_code == 200:
            print("✅ ¡Mensaje enviado a JoelDroid VIP!")
        else:
            print(f"❌ Error de Telegram: {r.text}")
            
    except Exception as e:
        print(f"❌ Fallo técnico: {e}")

if __name__ == "__main__":
    main()
