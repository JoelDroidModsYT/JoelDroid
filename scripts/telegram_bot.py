import os
import requests
import json

def main():
    # 1. Depuración de variables
    token = os.getenv('TELEGRAM_BOT_TOKEN')
    chat_id = os.getenv('TELEGRAM_CHAT_ID')
    
    print(f"--- INICIO DE EJECUCIÓN ---")
    print(f"Token detectado (primeros 5 caracteres): {token[:5] if token else 'VACÍO'}")
    print(f"Chat ID detectado: {chat_id}")

    if not token or not chat_id:
        print("❌ ERROR: Faltan las variables de entorno (Secrets).")
        return

    # 2. Mensaje de prueba directo (sin traducciones para evitar fallos)
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        'chat_id': chat_id,
        'text': "✅ JoelDroid: Conexión establecida correctamente desde GitHub.",
        'parse_mode': 'Markdown'
    }

    try:
        print("Enviando solicitud a Telegram...")
        response = requests.post(url, data=payload)
        
        # 3. Registro de respuesta
        print(f"Código de estado de Telegram: {response.status_code}")
        print(f"Respuesta completa: {response.text}")
        
        if response.status_code == 200:
            print("✅ ¡ÉXITO! El mensaje fue enviado.")
        else:
            print("❌ ERROR: Telegram rechazó la solicitud.")
            
    except Exception as e:
        print(f"❌ ERROR CRÍTICO: {str(e)}")

if __name__ == "__main__":
    main()
