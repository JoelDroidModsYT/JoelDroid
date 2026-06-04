import os
import requests
from deep_translator import GoogleTranslator

# URL de tu Gist (Carga instantánea JoelDroid)
GIST_URL = "https://gist.githubusercontent.com/JoelDroidModsYT/5981d391897fe461dc5ac9ba7303b8f2/raw/games.json"

def main():
    # Obtener credenciales desde los Secrets de GitHub
    token = os.getenv('TELEGRAM_BOT_TOKEN')
    chat_id = os.getenv('TELEGRAM_CHAT_ID')
    
    if not token or not chat_id:
        print("❌ ERROR: No se encontraron los Secrets en GitHub (Token o Chat ID).")
        return

    try:
        # Descarga los datos del Gist
        print(f"Conectando a: {GIST_URL}")
        response = requests.get(GIST_URL)
        response.raise_for_status()
        data = response.json()
        
        # Tomar el primer juego de la lista
        game = data[0]
        print(f"Juego detectado: {game['title']}")
        
        # Traducción de descripción
        try:
            description_en = GoogleTranslator(source='auto', target='en').translate(game['description'])
        except:
            description_en = game['description']
        
        # Mensaje formato JoelDroid
        caption = (
            f"🔥 *NEW UPDATE:* {game['title']}\n\n"
            f"✅ *VERSION:* {game['version']}\n"
            f"🛠 *MOD INFO:* {description_en}\n\n"
            f"📥 *DOWNLOAD:* {game['link']}\n\n"
            f"📸 *IMAGE:* {game['image']}"
        )
        
        # Enviar a Telegram como mensaje de texto para asegurar entrega
        tele_url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = {
            'chat_id': chat_id,
            'text': caption,
            'parse_mode': 'Markdown'
        }
        
        r = requests.post(tele_url, data=payload)
        
        if r.status_code == 200:
            print("✅ ¡MENSAJE ENVIADO CORRECTAMENTE A TELEGRAM!")
        else:
            print(f"❌ Error de Telegram (Status {r.status_code}): {r.text}")
            
    except Exception as e:
        print(f"❌ Error crítico: {e}")

if __name__ == "__main__":
    main()
