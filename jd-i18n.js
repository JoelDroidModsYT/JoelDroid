/* JoelDroid — módulo de idioma compartido (index.html + descarga.html)
   · Detecta el idioma del dispositivo/navegador (o el elegido por el usuario).
   · Diccionario propio para los textos nuevos (10 idiomas).
   · Traducción automática (Google gtx → MyMemory) para texto dinámico del panel,
     con caché local. Los nombres de juegos NUNCA se traducen (.notranslate / data-notranslate). */
(function(){
  'use strict';
  var SUP=['es','en','pt','de','ru','zh-CN','ja','tr','hi','fr'];
  function detect(){
    try{
      var s=localStorage.getItem('selectedLang'); if(s&&SUP.indexOf(s)>=0) return s;
      var ls=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'es'];
      for(var i=0;i<ls.length;i++){
        var b=String(ls[i]||'').toLowerCase();
        if(b.indexOf('zh')===0) return 'zh-CN';
        for(var j=0;j<SUP.length;j++){ if(b.indexOf(SUP[j].toLowerCase().split('-')[0])===0) return SUP[j]; }
      }
    }catch(e){}
    return 'es';
  }
  function lang(){ if(window.__JD_FORCE_ES) return 'es'; return (typeof currentLang!=='undefined'&&currentLang)?currentLang:(window.__JD_PRELANG||detect()); }

  /* orden: es, en, pt, de, ru, zh-CN, ja, tr, hi, fr */
  var D={
    upd_summary:['Actualizado {date} · {n} {games}','Updated {date} · {n} {games}','Atualizado {date} · {n} {games}','Aktualisiert {date} · {n} {games}','Обновлено {date} · {n} {games}','更新于 {date} · {n} {games}','更新 {date} · {n} {games}','Güncellendi {date} · {n} {games}','अपडेट {date} · {n} {games}','Mis à jour {date} · {n} {games}'],
    game_one:['juego','game','jogo','Spiel','игра','个游戏','本のゲーム','oyun','गेम','jeu'],
    game_many:['juegos','games','jogos','Spiele','игр','个游戏','本のゲーム','oyun','गेम','jeux'],
    updated_on:['Actualizado','Updated','Atualizado','Aktualisiert','Обновлено','更新','更新','Güncellendi','अपडेट','Mis à jour'],
    req_btn:['Pedir actualización','Request update','Pedir atualização','Update anfordern','Запросить обновление','请求更新','アップデートをリクエスト','Güncelleme iste','अपडेट माँगें','Demander une mise à jour'],
    ver_site:['Versión en el sitio','Version on site','Versão no site','Version auf der Seite','Версия на сайте','网站版本','サイトのバージョン','Sitedeki sürüm','साइट पर संस्करण','Version sur le site'],
    ver_new:['Nueva versión (Play Store)','New version (Play Store)','Nova versão (Play Store)','Neue Version (Play Store)','Новая версия (Play Store)','新版本 (Play 商店)','新バージョン (Play ストア)','Yeni sürüm (Play Store)','नया संस्करण (Play Store)','Nouvelle version (Play Store)'],
    last_update:['Última actualización','Last update','Última atualização','Letzte Aktualisierung','Последнее обновление','最近更新','最終更新','Son güncelleme','अंतिम अपडेट','Dernière mise à jour'],
    req_checking:['Buscando en la Play Store…','Checking the Play Store…','Buscando na Play Store…','Suche im Play Store…','Проверяем Play Store…','正在查询 Play 商店…','Playストアを確認中…','Play Store kontrol ediliyor…','Play Store में खोज रहे हैं…','Recherche sur le Play Store…'],
    req_new:['¡Hay una versión nueva! Ya registramos tu pedido para actualizarla.','A new version is out! We registered your request to update it.','Há uma nova versão! Registramos seu pedido para atualizá-la.','Es gibt eine neue Version! Wir haben deine Anfrage registriert.','Вышла новая версия! Ваш запрос на обновление зарегистрирован.','有新版本了!我们已记录你的更新请求。','新バージョンがあります!更新リクエストを受け付けました。','Yeni sürüm var! Güncelleme isteğiniz kaydedildi.','नया संस्करण उपलब्ध है! आपका अनुरोध दर्ज हो गया।','Une nouvelle version existe ! Votre demande a été enregistrée.'],
    req_latest:['Ya tienes la última versión. ¡Gracias por avisar!','You already have the latest version. Thanks for checking!','Você já tem a última versão. Obrigado por avisar!','Du hast bereits die neueste Version. Danke!','У вас уже последняя версия. Спасибо!','你已是最新版本。谢谢!','すでに最新バージョンです。ありがとう!','Zaten en son sürümdesiniz. Teşekkürler!','आपके पास पहले से नवीनतम संस्करण है। धन्यवाद!','Vous avez déjà la dernière version. Merci !'],
    req_nolink:['Registramos tu pedido. Pronto actualizaremos este juego.','We registered your request. We will update this game soon.','Registramos seu pedido. Em breve atualizaremos este jogo.','Anfrage registriert. Wir aktualisieren dieses Spiel bald.','Запрос зарегистрирован. Скоро обновим эту игру.','已记录你的请求,我们会尽快更新此游戏。','リクエストを受け付けました。まもなく更新します。','İsteğiniz kaydedildi. Bu oyunu yakında güncelleyeceğiz.','अनुरोध दर्ज हो गया। हम जल्द ही इस गेम को अपडेट करेंगे।','Demande enregistrée. Nous mettrons ce jeu à jour bientôt.'],
    req_fail:['No se pudo leer la Play Store ahora. Tu pedido quedó registrado.','Could not read the Play Store right now. Your request was registered.','Não foi possível ler a Play Store agora. Seu pedido foi registrado.','Play Store derzeit nicht lesbar. Deine Anfrage wurde registriert.','Сейчас не удалось прочитать Play Store. Запрос сохранён.','暂时无法读取 Play 商店,你的请求已记录。','現在Playストアを読み取れません。リクエストは記録されました。','Play Store şu an okunamadı. İsteğiniz kaydedildi.','अभी Play Store नहीं पढ़ सका। आपका अनुरोध दर्ज है।','Lecture du Play Store impossible. Votre demande est enregistrée.'],
    contact_title:['Contacto para negocios y publicidad','Business & advertising contact','Contato para negócios e publicidade','Kontakt für Geschäft & Werbung','Контакты для бизнеса и рекламы','商务与广告合作联系','ビジネス・広告のお問い合わせ','İş ve reklam iletişimi','व्यापार और विज्ञापन संपर्क','Contact affaires et publicité'],
    contact_text:['¿Tienes una propuesta comercial o quieres anunciarte? Escríbenos:','Have a business proposal or want to advertise? Write to us:','Tem uma proposta comercial ou quer anunciar? Escreva-nos:','Geschäftsanfrage oder Werbung? Schreib uns:','Есть деловое предложение или реклама? Напишите нам:','有商务合作或广告需求?请联系我们:','ご提案や広告掲載のご相談はこちら:','Ticari teklif veya reklam mı? Bize yazın:','व्यावसायिक प्रस्ताव या विज्ञापन? हमें लिखें:','Une proposition commerciale ou de la publicité ? Écrivez-nous :'],
    policies:['Políticas y condiciones','Policies & terms','Políticas e condições','Richtlinien & Bedingungen','Политика и условия','政策与条款','ポリシーと規約','Politikalar ve koşullar','नीतियाँ और शर्तें','Politiques et conditions'],
    privacy:['Privacidad','Privacy','Privacidade','Datenschutz','Конфиденциальность','隐私','プライバシー','Gizlilik','गोपनीयता','Confidentialité'],
    cookies:['Cookies','Cookies','Cookies','Cookies','Cookies','Cookie','Cookie','Çerezler','कुकीज़','Cookies'],
    terms:['Términos','Terms','Termos','Bedingungen','Условия','条款','規約','Koşullar','शर्तें','Conditions'],
    contact:['Contacto','Contact','Contato','Kontakt','Контакты','联系','お問い合わせ','İletişim','संपर्क','Contact'],
    rights:['Todos los derechos reservados.','All rights reserved.','Todos os direitos reservados.','Alle Rechte vorbehalten.','Все права защищены.','保留所有权利。','All rights reserved.','Tüm hakları saklıdır.','सर्वाधिकार सुरक्षित।','Tous droits réservés.'],
    ads_note:['Publicidad servida por Monetag.','Ads served by Monetag.','Publicidade fornecida pela Monetag.','Werbung von Monetag.','Реклама от Monetag.','广告由 Monetag 提供。','広告配信: Monetag。','Reklamlar Monetag tarafından sunulur.','विज्ञापन Monetag द्वारा।','Publicité fournie par Monetag.'],
    close:['Cerrar','Close','Fechar','Schließen','Закрыть','关闭','閉じる','Kapat','बंद करें','Fermer'],
    share:['Compartir','Share','Compartilhar','Teilen','Поделиться','分享','共有','Paylaş','शेयर','Partager'],
    req_form_title:['Pedir actualización','Request an update','Pedir atualização','Update anfordern','Запрос обновления','请求更新','アップデートのリクエスト','Güncelleme isteği','अपडेट अनुरोध','Demande de mise à jour'],
    req_f_game:['Nombre del juego','Game name','Nome do jogo','Spielname','Название игры','游戏名称','ゲーム名','Oyun adı','गेम का नाम','Nom du jeu'],
    req_f_ver:['¿Qué versión pides?','Which version do you want?','Qual versão você quer?','Welche Version möchtest du?','Какую версию вы хотите?','你想要哪个版本?','希望のバージョンは?','Hangi sürümü istiyorsun?','आप कौन सा संस्करण चाहते हैं?','Quelle version voulez-vous ?'],
    req_f_url:['URL de la Play Store (opcional)','Play Store URL (optional)','URL da Play Store (opcional)','Play-Store-URL (optional)','Ссылка Play Store (необязательно)','Play 商店链接(可选)','Playストア URL(任意)','Play Store URL (isteğe bağlı)','Play Store URL (वैकल्पिक)','URL du Play Store (facultatif)'],
    req_send:['Enviar reporte','Send report','Enviar relatório','Meldung senden','Отправить отчёт','发送报告','レポートを送信','Raporu gönder','रिपोर्ट भेजें','Envoyer le rapport'],
    req_sent:['¡Reporte enviado! Lo revisaremos pronto.','Report sent! We will review it soon.','Relatório enviado! Vamos analisar em breve.','Meldung gesendet! Wir prüfen sie bald.','Отчёт отправлен! Скоро проверим.','报告已发送!我们会尽快查看。','送信しました!まもなく確認します。','Rapor gönderildi! Yakında inceleyeceğiz.','रिपोर्ट भेज दी गई! हम जल्द देखेंगे।','Rapport envoyé ! Nous le vérifierons bientôt.'],
    req_err:['No se pudo enviar. Intenta de nuevo.','Could not send. Try again.','Não foi possível enviar. Tente novamente.','Senden fehlgeschlagen. Erneut versuchen.','Не удалось отправить. Повторите.','发送失败,请重试。','送信できませんでした。もう一度お試しください。','Gönderilemedi. Tekrar deneyin.','भेज नहीं सके। फिर कोशिश करें।','Échec de l’envoi. Réessayez.'],
    req_need:['Escribe el nombre del juego y la versión.','Enter the game name and version.','Escreva o nome do jogo e a versão.','Gib Spielname und Version ein.','Укажите название игры и версию.','请填写游戏名称和版本。','ゲーム名とバージョンを入力してください。','Oyun adını ve sürümü yazın.','गेम का नाम और संस्करण लिखें।','Indiquez le nom du jeu et la version.'],
    req_bad_url:['La URL debe empezar con https://','The URL must start with https://','A URL deve começar com https://','Die URL muss mit https:// beginnen','URL должен начинаться с https://','链接必须以 https:// 开头','URLはhttps://で始めてください','URL https:// ile başlamalı','URL https:// से शुरू होना चाहिए','L’URL doit commencer par https://'],
    req_wait:['Espera un momento antes de enviar otro reporte.','Please wait a moment before sending another report.','Aguarde um momento antes de enviar outro relatório.','Bitte warte kurz, bevor du eine weitere Meldung sendest.','Подождите немного перед следующим отчётом.','请稍等片刻再发送下一份报告。','次のレポートまで少しお待ちください。','Başka bir rapor göndermeden önce biraz bekleyin.','दूसरी रिपोर्ट भेजने से पहले थोड़ा रुकें।','Patientez un instant avant un autre rapport.'],
    rate_title:['Valoración','Rating','Avaliação','Bewertung','Оценка','评分','評価','Değerlendirme','रेटिंग','Évaluation'],
    rate_tap:['Toca una estrella para puntuar','Tap a star to rate','Toque numa estrela para avaliar','Tippe auf einen Stern zum Bewerten','Нажмите на звезду, чтобы оценить','点击星星评分','星をタップして評価','Puanlamak için yıldıza dokun','रेट करने के लिए स्टार दबाएँ','Touchez une étoile pour noter'],
    rate_yours:['Tu voto','Your vote','Seu voto','Deine Stimme','Ваш голос','你的评分','あなたの評価','Oyun','आपका वोट','Votre vote'],
    votes_one:['voto','vote','voto','Stimme','голос','票','票','oy','वोट','vote'],
    votes_many:['votos','votes','votos','Stimmen','голосов','票','票','oy','वोट','votes'],
    src_play:['Play Store','Play Store','Play Store','Play Store','Play Store','Play 商店','Playストア','Play Store','Play Store','Play Store'],
    src_comm:['Comunidad','Community','Comunidade','Community','Сообщество','社区','コミュニティ','Topluluk','समुदाय','Communauté'],
    play_rating:['Nota en Google Play','Google Play rating','Nota no Google Play','Google-Play-Bewertung','Оценка в Google Play','Google Play 评分','Google Playの評価','Google Play puanı','Google Play रेटिंग','Note Google Play']
  };
  function idx(l){ var i=SUP.indexOf(l); return i<0?1:i; }
  function t(key,vars){
    var row=D[key]; if(!row) return key;
    var s=row[idx(lang())]||row[1]||row[0];
    if(vars) Object.keys(vars).forEach(function(k){ s=s.replace(new RegExp('\\{'+k+'\\}','g'),vars[k]); });
    return s;
  }
  function apply(root){
    root=root||document;
    var q=function(sel,fn){ Array.prototype.forEach.call(root.querySelectorAll(sel),fn); };
    q('[data-jd2]',function(e){ var v=t(e.getAttribute('data-jd2')); if(e.textContent!==v) e.textContent=v; });
    q('[data-jd2-title]',function(e){ var v=t(e.getAttribute('data-jd2-title')); e.setAttribute('title',v); e.setAttribute('aria-label',v); });
    q('[data-jd2-ph]',function(e){ e.setAttribute('placeholder',t(e.getAttribute('data-jd2-ph'))); });
  }
  var LOC={es:'es','zh-CN':'zh-CN',en:'en',pt:'pt-BR',de:'de',ru:'ru',ja:'ja',tr:'tr',hi:'hi',fr:'fr'};
  function fmtDate(ts,long){
    var d=new Date(ts); if(isNaN(d)) return '';
    try{
      var o=(long==='card')?{day:'numeric',month:'short',year:'numeric'}:(long?{day:'numeric',month:'long',year:'numeric'}:{day:'2-digit',month:'short',year:'2-digit'});
      return new Intl.DateTimeFormat(LOC[lang()]||'es',o).format(d).replace(/\./g,'');
    }catch(e){ return d.toLocaleDateString(); }
  }
  function sameDay(a,b){ var x=new Date(a),y=new Date(b); return x.getFullYear()===y.getFullYear()&&x.getMonth()===y.getMonth()&&x.getDate()===y.getDate(); }

  /* ── Traducción automática de texto dinámico ── */
  var mem={}, inflight={};
  function ck(l,s){ return '_jt_'+l+'|'+s.slice(0,140); }
  function tr(text,cb){
    var l=lang(); text=String(text==null?'':text);
    if(l==='es'||!text.trim()){ cb(text); return; }
    var k=ck(l,text);
    if(mem[k]){ cb(mem[k]); return; }
    try{ var c=localStorage.getItem(k); if(c){ mem[k]=c; cb(c); return; } }catch(e){}
    if(inflight[k]){ inflight[k].push(cb); return; }
    inflight[k]=[cb];
    var tl=(l==='zh-CN')?'zh-CN':l;
    function done(out){ if(lang()!==l){ delete inflight[k]; return; } var ok=out&&out!==text; if(ok){ mem[k]=out; try{localStorage.setItem(k,out);}catch(e){} } (inflight[k]||[]).forEach(function(f){f(out||text);}); delete inflight[k]; }
    var ctl=(typeof AbortController!=='undefined')?new AbortController():null, to=setTimeout(function(){try{ctl&&ctl.abort();}catch(e){}},5000);
    fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl='+encodeURIComponent(tl)+'&dt=t&q='+encodeURIComponent(text),{signal:ctl?ctl.signal:undefined})
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(j){ clearTimeout(to); var o=(j[0]||[]).map(function(p){return p[0];}).join(''); if(!o) throw 0; done(o); })
      .catch(function(){
        clearTimeout(to);
        fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=es|'+(tl==='zh-CN'?'zh':tl))
          .then(function(r){return r.json();}).then(function(d){ var o=d&&d.responseData&&d.responseData.translatedText; if(!o||/MYMEMORY|QUERY LENGTH/i.test(o)) throw 0; done(o); })
          .catch(function(){ done(text); });
      });
  }
  /* Traduce todos los textos en español de una página (descarga.html) */
  var origMap=new WeakMap(), busy=false, touched=[];
  function walk(root,skip){
    var out=[], w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      var p=n.parentNode; if(!p) return NodeFilter.FILTER_REJECT;
      var tag=p.nodeName; if(tag==='SCRIPT'||tag==='STYLE'||tag==='NOSCRIPT'||tag==='SVG') return NodeFilter.FILTER_REJECT;
      if(p.closest&&p.closest('.notranslate,[data-notranslate],[data-jd2],'+(skip||'x-none'))) return NodeFilter.FILTER_REJECT;
      var v=n.nodeValue; if(!v||!/[A-Za-zÁÉÍÓÚáéíóúñ¿¡]{2,}/.test(v)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT; }});
    while(w.nextNode()) out.push(w.currentNode);
    return out;
  }
  function autoDom(root,skip){
    if(lang()==='es') return;
    root=root||document.body;
    walk(root,skip).forEach(function(n){
      var cur=n.nodeValue, o=origMap.get(n);
      if(o&&o.tr===cur) return;                 /* ya traducido por nosotros */
      var src=cur.trim(); if(!src) return;
      origMap.set(n,{es:cur,tr:null});
      tr(src,function(out){
        if(!n.parentNode) return;
        var lead=cur.match(/^\s*/)[0], trail=cur.match(/\s*$/)[0], res=lead+out+trail;
        if(window.__JD_FORCE_ES) return;
        n.nodeValue=res; origMap.set(n,{es:cur,tr:res}); touched.push(n);
      });
    });
  }
  function watch(root,skip){
    if(typeof MutationObserver==='undefined') return;
    var timer=null, runs=[], obs;
    /* Guardián: si la traducción entra en bucle, se vuelve a Español y se detiene */
    function trip(){
      window.__JD_FORCE_ES=true;
      try{ obs.disconnect(); }catch(e){}
      try{ localStorage.setItem('selectedLang','es'); sessionStorage.setItem('jd_lang_lock','1'); }catch(e){}
      touched.forEach(function(n){ var o=origMap.get(n); if(o&&n.parentNode) n.nodeValue=o.es; });
      try{ apply(document); document.documentElement.lang='es'; }catch(e){}
    }
    obs=new MutationObserver(function(){
      clearTimeout(timer);
      timer=setTimeout(function(){
        var n=Date.now(); runs.push(n); runs=runs.filter(function(t){return n-t<10000;});
        if(runs.length>25){ trip(); return; }
        autoDom(root,skip);
      },250);
    });
    obs.observe(root,{childList:true,subtree:true,characterData:true});
  }
  window.JDI18N={ t:t, apply:apply, lang:lang, detect:detect, fmtDate:fmtDate, sameDay:sameDay, tr:tr, autoDom:autoDom, watch:watch };
  window.jdT=t; window.jdFmtDate=fmtDate;
})();
