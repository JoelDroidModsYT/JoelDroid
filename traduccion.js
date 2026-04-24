/**
 * ════════════════════════════════════════════════════════════════
 * JOELDROID MODS YT — Sistema de Traducciones v3.0
 * Archivo: js/traduccion.js  |  type="module"
 * ────────────────────────────────────────────────────────────────
 * • Diccionario local completo (10 idiomas) — UI instantánea
 * • Firebase Realtime Database — cambios en tiempo real
 * • MyMemory API — contenido dinámico con fallback robusto
 * • Caché RAM + localStorage — nunca repite llamadas
 * • Auto-detección idioma navegador al cargar
 * • Fallback garantizado: si Firebase falla → textos locales
 * ════════════════════════════════════════════════════════════════
 */

// ── Programador no-invasivo (polyfill requestIdleCallback) ────────
export const _jdIdle = (function () {
  if (typeof requestIdleCallback === 'function') {
    return function (fn) { requestIdleCallback(fn, { timeout: 2000 }); };
  }
  const ch = new MessageChannel();
  const queue = [];
  ch.port1.onmessage = function () { if (queue.length) { const fn = queue.shift(); try { fn(); } catch (e) {} } };
  return function (fn) { queue.push(fn); ch.port2.postMessage(0); };
})();

// ── Estado global de idioma ───────────────────────────────────────
export let currentLang = 'es';
let _trMem = {};
let _trQ   = {};

// ── URLs de banderas ──────────────────────────────────────────────
export const LANG_FLAGS = {
  es: 'https://flagcdn.com/w40/es.png',
  en: 'https://flagcdn.com/w40/us.png',
  pt: 'https://flagcdn.com/w40/br.png',
  de: 'https://flagcdn.com/w40/de.png',
  ru: 'https://flagcdn.com/w40/ru.png',
  'zh-CN': 'https://flagcdn.com/w40/cn.png',
  ja: 'https://flagcdn.com/w40/jp.png',
  tr: 'https://flagcdn.com/w40/tr.png',
  hi: 'https://flagcdn.com/w40/in.png',
  fr: 'https://flagcdn.com/w40/fr.png'
};

// ════════════════════════════════════════════════════════════════
// 📖 DICCIONARIO JSON PROFESIONAL — 10 idiomas completos
// ════════════════════════════════════════════════════════════════
export const TR = {
es: {
  'Todo':'Todo','Actualizados':'Actualizados','Popular':'Popular',
  'Buscar aplicaciones...':'Buscar aplicaciones...',
  'Tutorial Oficial':'Tutorial Oficial','Tutorial de Instalación':'Tutorial de Instalación',
  'Ver Tutorial':'Ver Tutorial','Guía Paso a Paso':'Guía Paso a Paso',
  'Sigue el video para instalar correctamente el mod':'Sigue el video para instalar correctamente el mod',
  'Atrás':'Atrás','Compartir':'Compartir',
  'Descargar Mod Apk':'Descargar Mod Apk','Versión':'Versión','Peso':'Peso',
  'Seguridad':'Seguridad','100% SEGURO':'100% SEGURO',
  'Información del Juego':'Información del Juego',
  'Características del Mod':'Características del Mod',
  'Advertencia importante':'Advertencia importante',
  '¡ADVERTENCIA IMPORTANTE!':'¡ADVERTENCIA IMPORTANTE!',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.',
  'Enlaces Oficiales':'Enlaces Oficiales','También te puede gustar':'También te puede gustar',
  'HOME':'HOME','Regresar al panel principal.':'Regresar al panel principal.',
  'Juegos':'Juegos','Nuestra colección de mods premium.':'Nuestra colección de mods premium.',
  'Sobre Nosotros':'Sobre Nosotros','El equipo detrás de JoelDroid Mods.':'El equipo detrás de JoelDroid Mods.',
  'Políticas y Condiciones':'Políticas y Condiciones','Términos de uso y privacidad.':'Términos de uso y privacidad.',
  'Entrar':'Entrar','Cancelar':'Cancelar','Descargar APK':'Descargar APK',
  'Ver Juego':'Ver Juego','Descargar Mod':'Descargar Mod',
  'Descargar Mod 1':'Descargar Mod 1','Descargar Mod 2':'Descargar Mod 2',
  'Mediafire-Seguro':'Mediafire-Seguro','Verificado':'Verificado',
  'No hay más juegos disponibles.':'No hay más juegos disponibles.',
  'CALIFICA ESTA APP':'CALIFICA ESTA APP',
  'Comparte tu opinión con otros usuarios':'Comparte tu opinión con otros usuarios',
  'Valoración':'Valoración','Comentarios':'Comentarios',
  'Escribe un comentario...':'Escribe un comentario...',
  'Publicar':'Publicar','Sé el primero en comentar':'Sé el primero en comentar',
  'Share':'Compartir'
},
en: {
  'Todo':'All','Actualizados':'Updated','Popular':'Popular',
  'Buscar aplicaciones...':'Search apps...',
  'Tutorial Oficial':'Official Tutorial','Tutorial de Instalación':'Installation Tutorial',
  'Ver Tutorial':'Watch Tutorial','Guía Paso a Paso':'Step by Step Guide',
  'Sigue el video para instalar correctamente el mod':'Follow the video to correctly install the mod',
  'Atrás':'Back','Compartir':'Share',
  'Descargar Mod Apk':'Download Mod Apk','Versión':'Version','Peso':'Size',
  'Seguridad':'Security','100% SEGURO':'100% SAFE',
  'Información del Juego':'Game Information',
  'Características del Mod':'Mod Features',
  'Advertencia importante':'Important Warning',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ IMPORTANT WARNING!',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'If the game has installation issues, make sure to uninstall any previous version from Google Play Store to avoid conflicts.',
  'Enlaces Oficiales':'Official Links','También te puede gustar':'You might also like',
  'HOME':'HOME','Regresar al panel principal.':'Return to main panel.',
  'Juegos':'Games','Nuestra colección de mods premium.':'Our premium mods collection.',
  'Sobre Nosotros':'About Us','El equipo detrás de JoelDroid Mods.':'The team behind JoelDroid Mods.',
  'Políticas y Condiciones':'Policies & Terms','Términos de uso y privacidad.':'Terms of use and privacy.',
  'Entrar':'Login','Cancelar':'Cancel','Descargar APK':'Download APK',
  'Ver Juego':'View Game','Descargar Mod':'Download Mod',
  'Descargar Mod 1':'Download Mod 1','Descargar Mod 2':'Download Mod 2',
  'Mediafire-Seguro':'Mediafire-Safe','Verificado':'Verified',
  'No hay más juegos disponibles.':'No more games available.',
  'CALIFICA ESTA APP':'RATE THIS APP',
  'Comparte tu opinión con otros usuarios':'Share your opinion with other users',
  'Valoración':'Rating','Comentarios':'Comments',
  'Escribe un comentario...':'Write a comment...',
  'Publicar':'Publish','Sé el primero en comentar':'Be the first to comment',
  'Share':'Share'
},
pt: {
  'Todo':'Tudo','Actualizados':'Atualizados','Popular':'Popular',
  'Buscar aplicaciones...':'Buscar aplicativos...',
  'Tutorial Oficial':'Tutorial Oficial','Tutorial de Instalación':'Tutorial de Instalação',
  'Ver Tutorial':'Ver Tutorial','Guía Paso a Paso':'Guia Passo a Passo',
  'Sigue el video para instalar correctamente el mod':'Siga o vídeo para instalar o mod corretamente',
  'Atrás':'Voltar','Compartir':'Compartilhar',
  'Descargar Mod Apk':'Baixar Mod Apk','Versión':'Versão','Peso':'Tamanho',
  'Seguridad':'Segurança','100% SEGURO':'100% SEGURO',
  'Información del Juego':'Informações do Jogo',
  'Características del Mod':'Recursos do Mod',
  'Advertencia importante':'Aviso Importante',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ AVISO IMPORTANTE!',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'Se o jogo tiver problemas de instalação, desinstale versões anteriores da Google Play Store para evitar conflitos.',
  'Enlaces Oficiales':'Links Oficiais','También te puede gustar':'Você também pode gostar',
  'HOME':'INÍCIO','Regresar al panel principal.':'Voltar ao painel principal.',
  'Juegos':'Jogos','Nuestra colección de mods premium.':'Nossa coleção de mods premium.',
  'Sobre Nosotros':'Sobre Nós','El equipo detrás de JoelDroid Mods.':'A equipe por trás do JoelDroid Mods.',
  'Políticas y Condiciones':'Políticas e Termos','Términos de uso y privacidad.':'Termos de uso e privacidade.',
  'Entrar':'Entrar','Cancelar':'Cancelar','Descargar APK':'Baixar APK',
  'Ver Juego':'Ver Jogo','Descargar Mod':'Baixar Mod',
  'Descargar Mod 1':'Baixar Mod 1','Descargar Mod 2':'Baixar Mod 2',
  'Mediafire-Seguro':'Mediafire-Seguro','Verificado':'Verificado',
  'No hay más juegos disponibles.':'Sem mais jogos disponíveis.',
  'CALIFICA ESTA APP':'AVALIE ESTE APP',
  'Comparte tu opinión con otros usuarios':'Compartilhe sua opinião com outros usuários',
  'Valoración':'Avaliação','Comentarios':'Comentários',
  'Escribe un comentario...':'Escreva um comentário...',
  'Publicar':'Publicar','Sé el primero en comentar':'Seja o primeiro a comentar',
  'Share':'Compartilhar'
},
de: {
  'Todo':'Alle','Actualizados':'Aktualisiert','Popular':'Beliebt',
  'Buscar aplicaciones...':'Apps suchen...',
  'Tutorial Oficial':'Offizielles Tutorial','Tutorial de Instalación':'Installations-Tutorial',
  'Ver Tutorial':'Tutorial ansehen','Guía Paso a Paso':'Schritt-für-Schritt-Anleitung',
  'Sigue el video para instalar correctamente el mod':'Folgen Sie dem Video zur korrekten Mod-Installation',
  'Atrás':'Zurück','Compartir':'Teilen',
  'Descargar Mod Apk':'Mod Apk herunterladen','Versión':'Version','Peso':'Größe',
  'Seguridad':'Sicherheit','100% SEGURO':'100% SICHER',
  'Información del Juego':'Spielinformationen',
  'Características del Mod':'Mod-Funktionen',
  'Advertencia importante':'Wichtiger Hinweis',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ WICHTIGER HINWEIS!',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'Bei Installationsproblemen deinstallieren Sie bitte ältere Versionen aus dem Google Play Store.',
  'Enlaces Oficiales':'Offizielle Links','También te puede gustar':'Das könnte Ihnen gefallen',
  'HOME':'START','Regresar al panel principal.':'Zurück zum Hauptbereich.',
  'Juegos':'Spiele','Nuestra colección de mods premium.':'Unsere Premium-Mod-Sammlung.',
  'Sobre Nosotros':'Über uns','El equipo detrás de JoelDroid Mods.':'Das Team hinter JoelDroid Mods.',
  'Políticas y Condiciones':'Richtlinien & Bedingungen','Términos de uso y privacidad.':'Nutzungsbedingungen und Datenschutz.',
  'Entrar':'Einloggen','Cancelar':'Abbrechen','Descargar APK':'APK herunterladen',
  'Ver Juego':'Spiel ansehen','Descargar Mod':'Mod herunterladen',
  'Descargar Mod 1':'Mod 1 herunterladen','Descargar Mod 2':'Mod 2 herunterladen',
  'Mediafire-Seguro':'Mediafire-Sicher','Verificado':'Verifiziert',
  'No hay más juegos disponibles.':'Keine weiteren Spiele verfügbar.',
  'CALIFICA ESTA APP':'BEWERTE DIESE APP',
  'Comparte tu opinión con otros usuarios':'Teilen Sie Ihre Meinung mit anderen Nutzern',
  'Valoración':'Bewertung','Comentarios':'Kommentare',
  'Escribe un comentario...':'Kommentar schreiben...',
  'Publicar':'Veröffentlichen','Sé el primero en comentar':'Sei der Erste, der kommentiert',
  'Share':'Teilen'
},
ru: {
  'Todo':'Все','Actualizados':'Обновлено','Popular':'Популярное',
  'Buscar aplicaciones...':'Поиск приложений...',
  'Tutorial Oficial':'Официальный туториал','Tutorial de Instalación':'Туториал по установке',
  'Ver Tutorial':'Смотреть туториал','Guía Paso a Paso':'Пошаговое руководство',
  'Sigue el video para instalar correctamente el mod':'Следуйте видео для правильной установки мода',
  'Atrás':'Назад','Compartir':'Поделиться',
  'Descargar Mod Apk':'Скачать Mod Apk','Versión':'Версия','Peso':'Размер',
  'Seguridad':'Безопасность','100% SEGURO':'100% БЕЗОПАСНО',
  'Información del Juego':'Информация об игре',
  'Características del Mod':'Функции мода',
  'Advertencia importante':'Важное предупреждение',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ ВАЖНОЕ ПРЕДУПРЕЖДЕНИЕ!',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'При проблемах с установкой удалите предыдущие версии из Google Play Store.',
  'Enlaces Oficiales':'Официальные ссылки','También te puede gustar':'Вам также понравится',
  'HOME':'ГЛАВНАЯ','Regresar al panel principal.':'Вернуться на главную панель.',
  'Juegos':'Игры','Nuestra colección de mods premium.':'Наша коллекция премиум-модов.',
  'Sobre Nosotros':'О нас','El equipo detrás de JoelDroid Mods.':'Команда JoelDroid Mods.',
  'Políticas y Condiciones':'Политика и условия','Términos de uso y privacidad.':'Условия использования и конфиденциальность.',
  'Entrar':'Войти','Cancelar':'Отмена','Descargar APK':'Скачать APK',
  'Ver Juego':'Посмотреть игру','Descargar Mod':'Скачать мод',
  'Descargar Mod 1':'Скачать Мод 1','Descargar Mod 2':'Скачать Мод 2',
  'Mediafire-Seguro':'Mediafire-Безопасно','Verificado':'Проверено',
  'No hay más juegos disponibles.':'Больше игр нет.',
  'CALIFICA ESTA APP':'ОЦЕНИ ЭТО ПРИЛОЖЕНИЕ',
  'Comparte tu opinión con otros usuarios':'Поделитесь мнением с другими пользователями',
  'Valoración':'Оценка','Comentarios':'Комментарии',
  'Escribe un comentario...':'Написать комментарий...',
  'Publicar':'Опубликовать','Sé el primero en comentar':'Будь первым, кто прокомментирует',
  'Share':'Поделиться'
},
'zh-CN': {
  'Todo':'全部','Actualizados':'已更新','Popular':'热门',
  'Buscar aplicaciones...':'搜索应用...',
  'Tutorial Oficial':'官方教程','Tutorial de Instalación':'安装教程',
  'Ver Tutorial':'观看教程','Guía Paso a Paso':'逐步指南',
  'Sigue el video para instalar correctamente el mod':'按照视频正确安装模组',
  'Atrás':'返回','Compartir':'分享',
  'Descargar Mod Apk':'下载 Mod Apk','Versión':'版本','Peso':'大小',
  'Seguridad':'安全','100% SEGURO':'100% 安全',
  'Información del Juego':'游戏信息',
  'Características del Mod':'模组功能',
  'Advertencia importante':'重要警告',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ 重要警告！',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'如遇安装问题，请先卸载 Google Play 商店中的旧版本。',
  'Enlaces Oficiales':'官方链接','También te puede gustar':'你可能也喜欢',
  'HOME':'主页','Regresar al panel principal.':'返回主面板。',
  'Juegos':'游戏','Nuestra colección de mods premium.':'我们的高级模组集合。',
  'Sobre Nosotros':'关于我们','El equipo detrás de JoelDroid Mods.':'JoelDroid Mods 团队。',
  'Políticas y Condiciones':'政策与条款','Términos de uso y privacidad.':'使用条款和隐私。',
  'Entrar':'登录','Cancelar':'取消','Descargar APK':'下载 APK',
  'Ver Juego':'查看游戏','Descargar Mod':'下载模组',
  'Descargar Mod 1':'下载模组 1','Descargar Mod 2':'下载模组 2',
  'Mediafire-Seguro':'Mediafire-安全','Verificado':'已验证',
  'No hay más juegos disponibles.':'没有更多游戏了。',
  'CALIFICA ESTA APP':'评价此应用',
  'Comparte tu opinión con otros usuarios':'与其他用户分享您的意见',
  'Valoración':'评分','Comentarios':'评论',
  'Escribe un comentario...':'写评论...',
  'Publicar':'发布','Sé el primero en comentar':'成为第一个评论者',
  'Share':'分享'
},
ja: {
  'Todo':'すべて','Actualizados':'更新済み','Popular':'人気',
  'Buscar aplicaciones...':'アプリを検索...',
  'Tutorial Oficial':'公式チュートリアル','Tutorial de Instalación':'インストールチュートリアル',
  'Ver Tutorial':'チュートリアルを見る','Guía Paso a Paso':'ステップバイステップガイド',
  'Sigue el video para instalar correctamente el mod':'ビデオに従ってModを正しくインストールしてください',
  'Atrás':'戻る','Compartir':'共有',
  'Descargar Mod Apk':'Mod Apkをダウンロード','Versión':'バージョン','Peso':'サイズ',
  'Seguridad':'セキュリティ','100% SEGURO':'100% 安全',
  'Información del Juego':'ゲーム情報',
  'Características del Mod':'Modの機能',
  'Advertencia importante':'重要な警告',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ 重要な警告！',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'インストールに問題がある場合は、Google Playの以前のバージョンをアンインストールしてください。',
  'Enlaces Oficiales':'公式リンク','También te puede gustar':'おすすめ',
  'HOME':'ホーム','Regresar al panel principal.':'メインパネルに戻る。',
  'Juegos':'ゲーム','Nuestra colección de mods premium.':'プレミアムModのコレクション。',
  'Sobre Nosotros':'私たちについて','El equipo detrás de JoelDroid Mods.':'JoelDroid Modsチーム。',
  'Políticas y Condiciones':'ポリシーと条件','Términos de uso y privacidad.':'利用規約とプライバシー。',
  'Entrar':'ログイン','Cancelar':'キャンセル','Descargar APK':'APKをダウンロード',
  'Ver Juego':'ゲームを見る','Descargar Mod':'Modをダウンロード',
  'Descargar Mod 1':'Mod 1をダウンロード','Descargar Mod 2':'Mod 2をダウンロード',
  'Mediafire-Seguro':'Mediafire-安全','Verificado':'確認済み',
  'No hay más juegos disponibles.':'ゲームはもうありません。',
  'CALIFICA ESTA APP':'このアプリを評価',
  'Comparte tu opinión con otros usuarios':'他のユーザーとご意見を共有してください',
  'Valoración':'評価','Comentarios':'コメント',
  'Escribe un comentario...':'コメントを書く...',
  'Publicar':'投稿','Sé el primero en comentar':'最初にコメントする',
  'Share':'共有'
},
tr: {
  'Todo':'Tümü','Actualizados':'Güncellendi','Popular':'Popüler',
  'Buscar aplicaciones...':'Uygulama ara...',
  'Tutorial Oficial':'Resmi Rehber','Tutorial de Instalación':'Kurulum Rehberi',
  'Ver Tutorial':'Rehberi İzle','Guía Paso a Paso':'Adım Adım Kılavuz',
  'Sigue el video para instalar correctamente el mod':'Modu doğru kurmak için videoyu takip edin',
  'Atrás':'Geri','Compartir':'Paylaş',
  'Descargar Mod Apk':'Mod Apk İndir','Versión':'Sürüm','Peso':'Boyut',
  'Seguridad':'Güvenlik','100% SEGURO':'100% GÜVENLİ',
  'Información del Juego':'Oyun Bilgisi',
  'Características del Mod':'Mod Özellikleri',
  'Advertencia importante':'Önemli Uyarı',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ ÖNEMLİ UYARI!',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'Kurulum sorunlarında Google Play\'deki eski sürümü kaldırın.',
  'Enlaces Oficiales':'Resmi Bağlantılar','También te puede gustar':'Bunları da beğenebilirsin',
  'HOME':'ANA SAYFA','Regresar al panel principal.':'Ana panele dön.',
  'Juegos':'Oyunlar','Nuestra colección de mods premium.':'Premium mod koleksiyonumuz.',
  'Sobre Nosotros':'Hakkımızda','El equipo detrás de JoelDroid Mods.':'JoelDroid Mods ekibi.',
  'Políticas y Condiciones':'Politikalar ve Koşullar','Términos de uso y privacidad.':'Kullanım koşulları ve gizlilik.',
  'Entrar':'Giriş','Cancelar':'İptal','Descargar APK':'APK İndir',
  'Ver Juego':'Oyunu Gör','Descargar Mod':'Mod İndir',
  'Descargar Mod 1':'Mod 1 İndir','Descargar Mod 2':'Mod 2 İndir',
  'Mediafire-Seguro':'Mediafire-Güvenli','Verificado':'Doğrulandı',
  'No hay más juegos disponibles.':'Başka oyun yok.',
  'CALIFICA ESTA APP':'BU UYGULAMAYI PUANLA',
  'Comparte tu opinión con otros usuarios':'Görüşünüzü diğer kullanıcılarla paylaşın',
  'Valoración':'Puan','Comentarios':'Yorumlar',
  'Escribe un comentario...':'Yorum yaz...',
  'Publicar':'Yayınla','Sé el primero en comentar':'İlk yorumu sen yap',
  'Share':'Paylaş'
},
hi: {
  'Todo':'सभी','Actualizados':'अपडेट','Popular':'लोकप्रिय',
  'Buscar aplicaciones...':'ऐप खोजें...',
  'Tutorial Oficial':'आधिकारिक ट्यूटोरियल','Tutorial de Instalación':'इंस्टॉलेशन ट्यूटोरियल',
  'Ver Tutorial':'ट्यूटोरियल देखें','Guía Paso a Paso':'चरण-दर-चरण मार्गदर्शिका',
  'Sigue el video para instalar correctamente el mod':'मॉड को सही तरीके से इंस्टॉल करने के लिए वीडियो देखें',
  'Atrás':'वापस','Compartir':'साझा करें',
  'Descargar Mod Apk':'Mod Apk डाउनलोड करें','Versión':'संस्करण','Peso':'आकार',
  'Seguridad':'सुरक्षा','100% SEGURO':'100% सुरक्षित',
  'Información del Juego':'गेम की जानकारी',
  'Características del Mod':'मॉड की विशेषताएं',
  'Advertencia importante':'महत्वपूर्ण चेतावनी',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ महत्वपूर्ण चेतावनी!',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'इंस्टॉलेशन समस्याओं के लिए Google Play की पुरानी वर्शन अनइंस्टॉल करें।',
  'Enlaces Oficiales':'आधिकारिक लिंक','También te puede gustar':'आपको यह भी पसंद आ सकता है',
  'HOME':'होम','Regresar al panel principal.':'मुख्य पैनल पर वापस जाएं।',
  'Juegos':'गेम्स','Nuestra colección de mods premium.':'हमारा प्रीमियम मॉड संग्रह।',
  'Sobre Nosotros':'हमारे बारे में','El equipo detrás de JoelDroid Mods.':'JoelDroid Mods की टीम।',
  'Políticas y Condiciones':'नीतियाँ और शर्तें','Términos de uso y privacidad.':'उपयोग की शर्तें और गोपनीयता।',
  'Entrar':'लॉग इन','Cancelar':'रद्द करें','Descargar APK':'APK डाउनलोड करें',
  'Ver Juego':'गेम देखें','Descargar Mod':'मॉड डाउनलोड करें',
  'Descargar Mod 1':'मॉड 1 डाउनलोड','Descargar Mod 2':'मॉड 2 डाउनलोड',
  'Mediafire-Seguro':'Mediafire-सुरक्षित','Verificado':'सत्यापित',
  'No hay más juegos disponibles.':'अब कोई गेम उपलब्ध नहीं।',
  'CALIFICA ESTA APP':'इस ऐप को रेट करें',
  'Comparte tu opinión con otros usuarios':'अन्य उपयोगकर्ताओं के साथ अपनी राय साझा करें',
  'Valoración':'रेटिंग','Comentarios':'टिप्पणियाँ',
  'Escribe un comentario...':'टिप्पणी लिखें...',
  'Publicar':'प्रकाशित करें','Sé el primero en comentar':'पहला टिप्पणी करें',
  'Share':'साझा करें'
},
fr: {
  'Todo':'Tout','Actualizados':'Mis à jour','Popular':'Populaire',
  'Buscar aplicaciones...':'Rechercher des apps...',
  'Tutorial Oficial':'Tutoriel Officiel','Tutorial de Instalación':'Tutoriel d\'Installation',
  'Ver Tutorial':'Voir le Tutoriel','Guía Paso a Paso':'Guide Pas à Pas',
  'Sigue el video para instalar correctamente el mod':'Suivez la vidéo pour installer le mod correctement',
  'Atrás':'Retour','Compartir':'Partager',
  'Descargar Mod Apk':'Télécharger Mod Apk','Versión':'Version','Peso':'Taille',
  'Seguridad':'Sécurité','100% SEGURO':'100% SÛR',
  'Información del Juego':'Informations sur le Jeu',
  'Características del Mod':'Fonctionnalités du Mod',
  'Advertencia importante':'Avertissement important',
  '¡ADVERTENCIA IMPORTANTE!':'⚠ AVERTISSEMENT IMPORTANT!',
  'Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.':'En cas de problème d\'installation, désinstallez les versions précédentes du Google Play Store pour éviter les conflits.',
  'Enlaces Oficiales':'Liens Officiels','También te puede gustar':'Vous aimerez aussi',
  'HOME':'ACCUEIL','Regresar al panel principal.':'Retour au panneau principal.',
  'Juegos':'Jeux','Nuestra colección de mods premium.':'Notre collection de mods premium.',
  'Sobre Nosotros':'À propos','El equipo detrás de JoelDroid Mods.':'L\'équipe derrière JoelDroid Mods.',
  'Políticas y Condiciones':'Politiques et Conditions','Términos de uso y privacidad.':'Conditions d\'utilisation et confidentialité.',
  'Entrar':'Entrer','Cancelar':'Annuler','Descargar APK':'Télécharger APK',
  'Ver Juego':'Voir le Jeu','Descargar Mod':'Télécharger Mod',
  'Descargar Mod 1':'Télécharger Mod 1','Descargar Mod 2':'Télécharger Mod 2',
  'Mediafire-Seguro':'Mediafire-Sûr','Verificado':'Vérifié',
  'No hay más juegos disponibles.':'Aucun autre jeu.',
  'CALIFICA ESTA APP':'ÉVALUER CETTE APP',
  'Comparte tu opinión con otros usuarios':'Partagez votre avis avec d\'autres utilisateurs',
  'Valoración':'Évaluation','Comentarios':'Commentaires',
  'Escribe un comentario...':'Écrire un commentaire...',
  'Publicar':'Publier','Sé el primero en comentar':'Soyez le premier à commenter',
  'Share':'Partager'
}
};

// ── Mapa key → español para data-i18n heredados ───────────────────
export const LANG_FLAGS_KEYS = {
  search_placeholder:'Buscar aplicaciones...',
  filter_all:'Todo', filter_updated:'Actualizados', filter_popular:'Popular',
  video_title:'Tutorial Oficial', install_tutorial_title:'Tutorial de Instalación',
  install_play_label:'Ver Tutorial', install_step_label:'Guía Paso a Paso',
  install_step_desc:'Sigue el video para instalar correctamente el mod',
  back_btn:'Atrás', download_mod_btn:'Descargar Mod Apk',
  label_version:'Versión', label_size:'Peso', label_security:'Seguridad', label_safe:'100% SEGURO',
  game_info_title:'Información del Juego', mod_features_title:'Características del Mod',
  warning_title:'Advertencia importante', official_links:'Enlaces Oficiales',
  recommended_title:'También te puede gustar',
  nav_home:'HOME', nav_home_desc:'Regresar al panel principal.',
  nav_games:'Juegos', nav_games_desc:'Nuestra colección de mods premium.',
  nav_about:'Sobre Nosotros', nav_about_desc:'El equipo detrás de JoelDroid Mods.',
  nav_policies:'Políticas y Condiciones', nav_policies_desc:'Términos de uso y privacidad.',
  login_btn:'Entrar', cancel_btn:'Cancelar', home_download_btn:'Descargar APK',
  rec_visit_btn:'Ver Juego', rec_download_btn:'Descargar Mod',
  safe_label:'Mediafire-Seguro', verification_text:'Verificado'
};

// ── Traducción instantánea por clave de diccionario ───────────────
export function tStr(es) {
  if (currentLang === 'es') return es;
  const d = TR[currentLang];
  return (d && d[es] !== undefined) ? d[es] : es;
}

// ── Alias para i18n keys heredados ───────────────────────────────
export function t(key) {
  const MAP = {
    home_download_btn:'Descargar APK', download_mod_btn:'Descargar Mod Apk',
    rec_visit_btn:'Ver Juego', rec_download_btn:'Descargar Mod',
    safe_label:'Mediafire-Seguro', verification_text:'Verificado',
    download_btn1:'Descargar Mod 1', download_btn2:'Descargar Mod 2',
    filter_all:'Todo', filter_updated:'Actualizados', filter_popular:'Popular',
    back_btn:'Atrás', banner_title:null, banner_subtitle:null, ann_text:null
  };
  const es = MAP[key];
  if (es === null || es === undefined) return key;
  return tStr(es);
}

// ── MyMemory API — fallback robusto (nunca muestra errores) ───────
function _ck(lang, txt) { return lang + '|' + txt.slice(0, 110); }

export function trAPI(text, cb) {
  if (!text || !text.trim() || currentLang === 'es') { cb(text); return; }
  const ck = _ck(currentLang, text);
  if (_trMem[ck]) { cb(_trMem[ck]); return; }
  try {
    const s = localStorage.getItem('_t_' + ck);
    if (s && s !== 'NULL' && s.indexOf('MYMEMORY') < 0) { _trMem[ck] = s; cb(s); return; }
  } catch (e) {}
  if (_trQ[ck]) { _trQ[ck].push(cb); return; }
  _trQ[ck] = [cb];
  const lc = {'zh-CN':'zh'};
  const lk = lc[currentLang] || currentLang;
  let _done = false;
  const _fallbackTimer = setTimeout(function () {
    if (_done) return; _done = true;
    (_trQ[ck] || []).forEach(function (f) { f(text); }); delete _trQ[ck];
  }, 4000);
  fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=es|' + lk)
    .then(r => r.json())
    .then(d => {
      if (_done) return; _done = true; clearTimeout(_fallbackTimer);
      let tr = text;
      if (d && d.responseData && d.responseData.translatedText) {
        const t2 = d.responseData.translatedText;
        const isErr = (t2 === 'NULL' || t2.indexOf('MYMEMORY') >= 0 || t2.indexOf('QUERY LENGTH') >= 0 || t2.indexOf('PLEASE') >= 0 || t2.length < 1);
        if (!isErr) tr = t2;
      }
      _trMem[ck] = tr;
      try { localStorage.setItem('_t_' + ck, tr); } catch (e) {}
      (_trQ[ck] || []).forEach(f => f(tr)); delete _trQ[ck];
    })
    .catch(() => {
      if (_done) return; _done = true; clearTimeout(_fallbackTimer);
      (_trQ[ck] || []).forEach(f => f(text)); delete _trQ[ck];
    });
}

// ── Helper: traduce un elemento por ID ───────────────────────────
export function trEl(id, text) {
  if (!text) return;
  const el = document.getElementById(id); if (!el) return;
  el.innerText = text;
  trAPI(text, function (tr) { const e = document.getElementById(id); if (e) e.innerText = tr; });
}

// ── Detectar idioma del navegador/dispositivo ─────────────────────
export function detectBrowserLanguage() {
  const supported = ['es','en','pt','de','ru','zh-CN','ja','tr','hi','fr'];
  const langs = (navigator.languages && navigator.languages.length)
    ? navigator.languages : [navigator.language || navigator.userLanguage || 'es'];
  for (let li = 0; li < langs.length; li++) {
    const bl = (langs[li] || '').toLowerCase();
    if (bl.startsWith('zh')) return 'zh-CN';
    for (let i = 0; i < supported.length; i++) {
      if (bl.startsWith(supported[i].toLowerCase().split('-')[0])) return supported[i];
    }
  }
  return 'es';
}

// ════════════════════════════════════════════════════════════════
// applyTranslations — núcleo del sistema
// ════════════════════════════════════════════════════════════════
export function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem('selectedLang', lang);
  if (document.documentElement.style.visibility === 'hidden') {
    document.documentElement.style.visibility = '';
  }

  // ── CRÍTICO INMEDIATO: elementos above-the-fold ──
  const chips = {all:'Todo', updated:'Actualizados', popular:'Popular'};
  Object.keys(chips).forEach(k => {
    const el = document.getElementById('filter-' + k);
    if (el) { const sp = el.querySelector('span'); if (sp) sp.textContent = tStr(chips[k]); }
  });
  const sb = document.getElementById('search-bar');
  if (sb) sb.placeholder = tStr('Buscar aplicaciones...');
  const fg = document.getElementById('current-flag');
  if (fg && LANG_FLAGS[lang]) fg.src = LANG_FLAGS[lang];
  document.querySelectorAll('.global-dl-btn-text').forEach(el => {
    const adminTxt = (typeof siteState !== 'undefined' && siteState.buttonSettings && siteState.buttonSettings.globalHomeButtonText) || '';
    const defaults = ['Descargar APK','Download APK','Baixar APK','APK Herunterladen',
      'Скачать APK','下载 APK','APKをダウンロード','APK İndir','APK डाउनलोड करें','Télécharger APK',''];
    el.textContent = (defaults.indexOf(adminTxt) >= 0) ? tStr('Descargar APK') : adminTxt;
  });
  if (typeof applyLightColors === 'function') applyLightColors();

  // ── DIFERIDO: trabajo pesado ──
  _jdIdle(() => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key === 'banner_title' || key === 'banner_subtitle' || key === 'ann_text') return;
      const es = LANG_FLAGS_KEYS[key];
      if (!es) return;
      el.textContent = tStr(es);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const es = LANG_FLAGS_KEYS[key] || key;
      el.placeholder = tStr(es);
    });
    const shareSpan = document.querySelector('#detail-view button[onclick="shareGame()"] span');
    if (shareSpan) shareSpan.textContent = tStr('Compartir');
    const warnTitle = document.querySelector('#download-section [style*="color:#ef4444"][style*="font-weight:900"]');
    if (warnTitle) warnTitle.textContent = tStr('¡ADVERTENCIA IMPORTANTE!');
    const warnBody = document.querySelector('#download-section [style*="color:#ef4444"][style*="font-weight:700"][style*="opacity"]');
    if (warnBody) warnBody.textContent = tStr('Si el juego presenta problemas al instalar, asegúrate de desinstalar cualquier versión previa de la Google Play Store para evitar conflictos.');
    const ratingLbl = document.querySelector('.ps-vote-lbl');
    if (ratingLbl) ratingLbl.textContent = tStr('CALIFICA ESTA APP');
    const ratingSubLbl = document.querySelector('.ps-vote-sublbl');
    if (ratingSubLbl) ratingSubLbl.textContent = tStr('Comparte tu opinión con otros usuarios');
    const dlBtns = document.querySelectorAll('[data-i18n="download_mod_btn"]');
    dlBtns.forEach(el => {
      const custom = typeof siteState !== 'undefined' && siteState.buttonSettings && siteState.buttonSettings.globalDetailButtonText;
      if (custom && custom !== 'Descargar Mod Apk') {
        trAPI(custom, tr => { if (tr) el.textContent = tr; });
      } else {
        el.textContent = tStr('Descargar Mod Apk');
      }
    });
  });

  if (lang === 'es') { _jdStopObserver(); return; }

  _jdIdle(() => {
    const ann = document.getElementById('ann-text-ui');
    if (ann) {
      const orig = ann.dataset.orig || ann.innerText.trim();
      if (!ann.dataset.orig && orig) ann.dataset.orig = orig;
      trAPI(orig, tr => { const e = document.getElementById('ann-text-ui'); if (e) e.innerText = tr; });
    }
    ['copyright-text-ui','copyright-text-det'].forEach(id => {
      const el = document.getElementById(id); if (!el) return;
      const orig = el.dataset.orig || el.innerText.trim();
      if (!el.dataset.orig && orig) el.dataset.orig = orig;
      trAPI(orig, tr => { const e = document.getElementById(id); if (e) e.innerText = tr; });
    });
    if (typeof currentDetailId !== 'undefined' && currentDetailId) {
      const descEl = document.getElementById('det-desc');
      if (descEl && descEl.dataset.esOrig) {
        trAPI(descEl.dataset.esOrig, tr => { const e = document.getElementById('det-desc'); if (e) e.innerText = tr; });
      }
    }
    _jdStartObserver();
    _jdTranslateNewCards();
  });
}

// ── selectLanguage — cambia idioma al instante ────────────────────
export function selectLanguage(langCode) {
  const m = document.getElementById('lang-menu');
  if (m) m.classList.remove('active');
  applyTranslations(langCode);
  if (typeof renderGames === 'function') renderGames();
  if (typeof currentDetailId !== 'undefined' && currentDetailId && typeof showDetail === 'function') {
    showDetail(currentDetailId);
  }
}

// ════════════════════════════════════════════════════════════════
// JD FIREBASE TRANSLATOR — MutationObserver edition v2
// ════════════════════════════════════════════════════════════════
let _jdObserver    = null;
let _jdDetObserver = null;
let _jdObsBusy     = false;

function _jdTranslateEl(el) {
  if (!el || el.classList.contains('notranslate')) return;
  if (currentLang === 'es') return;
  const orig = el.dataset.orig || el.innerText.trim();
  if (!orig || orig.length < 2) return;
  if (!el.dataset.orig) el.dataset.orig = orig;
  trAPI(orig, tr => {
    if (!el.isConnected) return;
    if (tr && tr !== el.innerText) el.innerText = tr;
  });
}

export function _jdTranslateNewCards() {
  if (currentLang === 'es') return;
  document.querySelectorAll('[data-jd-tr]:not([data-orig])').forEach(_jdTranslateEl);
  document.querySelectorAll('.jd-dl-btn-text:not([data-orig])').forEach(el => {
    const orig = el.dataset.orig || el.innerText.trim();
    if (!orig || orig.length < 2) return;
    if (!el.dataset.orig) el.dataset.orig = orig;
    trAPI(orig, tr => { if (el.isConnected && tr && tr !== el.innerText) el.innerText = tr; });
  });
}

function _jdTranslateDetailView() {
  if (currentLang === 'es') return;
  const dv = document.getElementById('detail-view'); if (!dv) return;
  dv.querySelectorAll('[data-jd-tr]').forEach(_jdTranslateEl);
  dv.querySelectorAll('.jd-dl-btn-text').forEach(el => {
    const orig = el.dataset.orig || el.innerText.trim();
    if (!orig || orig.length < 2) return;
    if (!el.dataset.orig) el.dataset.orig = orig;
    trAPI(orig, tr => { if (el.isConnected && tr && tr !== el.innerText) el.innerText = tr; });
  });
}

export function _jdStartObserver() {
  if (_jdObserver) return;
  const gl = document.getElementById('game-list'); if (!gl) return;
  _jdObserver = new MutationObserver(() => {
    if (_jdObsBusy) return; _jdObsBusy = true;
    _jdIdle(() => { _jdTranslateNewCards(); _jdObsBusy = false; });
  });
  _jdObserver.observe(gl, { childList:true, subtree:true });
  _jdStartDetailObserver();
}

function _jdStartDetailObserver() {
  if (_jdDetObserver) return;
  const dv = document.getElementById('detail-view'); if (!dv) return;
  _jdDetObserver = new MutationObserver(() => {
    _jdIdle(() => { _jdTranslateDetailView(); });
  });
  _jdDetObserver.observe(dv, { childList:true, subtree:true, characterData:false });
}

export function _jdStopObserver() {
  if (_jdObserver) { _jdObserver.disconnect(); _jdObserver = null; }
  if (_jdDetObserver) { _jdDetObserver.disconnect(); _jdDetObserver = null; }
}

// ════════════════════════════════════════════════════════════════
// FIREBASE REALTIME DATABASE — Actualización en tiempo real
// Requiere que firebase-app-compat y firebase-database-compat
// estén cargados antes que este módulo.
// ════════════════════════════════════════════════════════════════
/**
 * Conecta a Firebase Realtime Database y escucha cambios en la
 * rama "translations/{lang}". Si Firebase falla, el sitio muestra
 * los textos locales del diccionario TR sin dejar espacios vacíos.
 *
 * Uso en tu firebase config (index.html o firebase-init.js):
 *   connectFirebaseTranslations(firebase.database());
 */
export function connectFirebaseTranslations(rtdb) {
  if (!rtdb) return; // Firebase no disponible → fallback local activo
  const supported = ['es','en','pt','de','ru','zh-CN','ja','tr','hi','fr'];
  supported.forEach(lang => {
    try {
      rtdb.ref('translations/' + lang).on('value', snap => {
        const data = snap.val();
        if (!data || typeof data !== 'object') return;
        // Mezclar con el diccionario local (lo remoto tiene prioridad)
        TR[lang] = Object.assign({}, TR[lang] || {}, data);
        // Si el idioma activo cambió → re-aplicar inmediatamente
        if (lang === currentLang) applyTranslations(currentLang);
      }, err => {
        // Error Firebase → silencioso, textos locales ya activos
        console.warn('[JD Translations] Firebase error para', lang, err.message);
      });
    } catch (e) {
      console.warn('[JD Translations] Firebase no disponible, usando textos locales.');
    }
  });
}

// ════════════════════════════════════════════════════════════════
// INIT — Auto-ejecutar al cargar el módulo
// ════════════════════════════════════════════════════════════════
(function _jdTranslationInit() {
  const supported = ['es','en','pt','de','ru','zh-CN','ja','tr','hi','fr'];
  let lang = 'es';
  try {
    const saved = localStorage.getItem('selectedLang');
    if (saved && supported.indexOf(saved) >= 0) {
      lang = saved;
    } else {
      lang = detectBrowserLanguage();
    }
  } catch (e) {
    lang = detectBrowserLanguage();
  }
  // Aplicar textos locales de inmediato (sin esperar Firebase)
  applyTranslations(lang);

  // Exponer funciones al scope global para uso desde HTML inline
  window.tStr           = tStr;
  window.t              = t;
  window.trAPI          = trAPI;
  window.trEl           = trEl;
  window.applyTranslations = applyTranslations;
  window.selectLanguage    = selectLanguage;
  window._jdTranslateNewCards = _jdTranslateNewCards;
  window._jdStartObserver    = _jdStartObserver;
  window._jdStopObserver     = _jdStopObserver;
  window.LANG_FLAGS          = LANG_FLAGS;
  window.LANG_FLAGS_KEYS     = LANG_FLAGS_KEYS;
  window.TR                  = TR;
  window.currentLang         = lang;
  // Actualizar getter para que el resto del código lea el valor actual
  Object.defineProperty(window, 'currentLang', {
    get() { return currentLang; },
    set(v) { currentLang = v; }
  });
})();
