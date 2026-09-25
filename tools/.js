!(function () {
  function e(e, t) {
    const n = document.createElement('iframe');
    return (
      n.setAttribute('scrolling', 'no'),
      n.setAttribute('allowtransparency', !0),
      n.setAttribute('frameborder', 0),
      n.setAttribute('title', t || ''),
      (n.width = e.width),
      (n.height = e.height),
      n.setAttribute(
        'src',
        (function (e) {
          const t = `https://www.tradays.com/${e.lang}/economic-calendar/widget`,
            n = {};
          'calendar' === e.type
            ? e.mode !== undefined && (n.mode = e.mode)
            : (e.mode !== undefined && (n.displayMode = e.mode),
              e.showTitle && (n.showTitle = e.showTitle));
          e.dateFormat !== undefined && (n.dateFormat = e.dateFormat);
          e.theme !== undefined && (n.theme = e.theme);
          e.fw !== undefined && (n.fw = e.fw);
          n.utm_source = window.location.hostname;
          const i = Object.keys(n)
            .filter((e) => 'width' !== e && 'height' !== e)
            .map((e) => e + '=' + encodeURIComponent(n[e]))
            .join('&');
          if ('event' === e.type) return `${t}/event/${e.id}?${i}`;
          return `${t}?${i}`;
        })(e)
      ),
      n
    );
  }
  function t(e) {
    return [
      'ru',
      'en',
      'zh',
      'es',
      'pt',
      'ja',
      'de',
      'tr',
      'ar',
      'fr',
      'it',
    ].includes(e);
  }
  function n(e) {
    return e
      ? (e.type === undefined && (e.type = 'calendar'),
        e.containerId === undefined &&
          (e.containerId =
            'event' === e.type
              ? 'economicCalendarEventWidget'
              : 'economicCalendarWidget'),
        e.mode !== undefined && (e.mode = parseInt(e.mode, 10)),
        e.theme !== undefined && (e.theme = parseInt(e.theme, 10)),
        (e.lang !== undefined && t(e.lang)) ||
          (e.lang = (function () {
            let e = document.documentElement.lang || 'en';
            return (
              (e = e.replace(/\s/g, '').substring(0, 2).toLowerCase()),
              t(e) ? e : 'en'
            );
          })()),
        e.showTitle !== undefined && (e.showTitle = parseInt(e.showTitle, 10)),
        e.id !== undefined && (e.id = parseInt(e.id, 10)),
        e.fw &&
          ((n = e.fw),
          !['html', 'svelte', 'react', 'vue', 'angular'].includes(n)) &&
          delete e.fw,
        e)
      : { type: 'calendar', width: '100%', height: '100%', mode: 2 };
    var n;
  }
  function i(t) {
    if (((t = n(t)), window.calendarCompletedID.includes(t.containerId)))
      return;
    window.calendarCompletedID.push(t.containerId);
    let i = !1;
    function d() {
      i ||
        ((i = !0),
        (function (t) {
          const n = document.getElementById(t.containerId);
          if (!n)
            return void new Error(`Node with id ${t.containerId} not found`);
          (n.style.width =
            t.width +
            ('string' == typeof t.width && ~t.width.indexOf('%') ? '' : 'px')),
            (n.style.height =
              t.height +
              ('string' == typeof t.height && ~t.height.indexOf('%')
                ? ''
                : 'px')),
            n.appendChild(
              e(
                t,
                'Economic Calendar | Financial & Forex News | World Economy Events in Real-Time'
              )
            );
          const i = n.nextElementSibling;
          i &&
            i instanceof HTMLElement &&
            'ecw-copyright' === i.className &&
            (n.appendChild(i),
            (i.style.textAlign = 'center'),
            (i.style.lineHeight = '26px'));
        })(t));
    }
    'complete' !== document.readyState
      ? (document.addEventListener('DOMContentLoaded', d, !1),
        window.addEventListener('load', d, !1))
      : d();
  }
  window.calendarCompletedID || (window.calendarCompletedID = []);
  const d = document.getElementsByTagName('script');
  for (let e = 0, t = d.length; e < t; e++) {
    const t = d[e];
    if ('calendar-widget' !== t.getAttribute('data-type')) continue;
    let n = t.innerHTML;
    if (!n) continue;
    n = n.trim();
    let r = null;
    try {
      r = JSON.parse(n);
    } catch (o) {
      console.warn(o);
    }
    r && (t.removeAttribute('calendar-widget'), (t.innerHTML = ''), i(r));
  }
  (window.economicCalendarEvent = function (e) {
    (e.type = 'event'), i(e);
  }),
    (window.economicCalendar = function (e) {
      (e.type = 'calendar'), i(e);
    });
})();
