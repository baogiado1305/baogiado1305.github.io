(function () {
  "use strict";

  var root = document.documentElement;
  var current = document.body.getAttribute("data-page");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function ext(newTab) { return newTab ? ' target="_blank" rel="noopener"' : ""; }

  /* Shared top bar and footer, built from SITE in data.js */
  var header = document.getElementById("site-header");
  if (header) {
    header.outerHTML =
      '<nav class="nav" aria-label="Main"><div class="nav-inner">' +
      '<a class="nav-name" href="index.html">' + esc(SITE.name) + "</a>" +
      '<ul class="nav-links" id="nav-links">' +
      SITE.nav.map(function (n) {
        return '<li><a href="' + esc(n.href) + '" data-label="' + esc(n.label) + '"' + ext(n.newTab) + (n.page === current ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a></li>";
      }).join("") +
      "</ul>" +
      '<button class="icon-btn theme-btn" type="button" aria-label="Switch light or dark theme"><i class="bi bi-sun" aria-hidden="true"></i><i class="bi bi-moon" aria-hidden="true"></i></button>' +
      '<button class="icon-btn menu-btn" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><i class="bi bi-list" aria-hidden="true"></i></button>' +
      "</div></nav>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.outerHTML =
      '<footer class="foot"><ul class="social">' +
      SITE.profiles.map(function (p) {
        var external = p.href.indexOf("mailto:") !== 0;
        return '<li><a class="' + esc(p.style) + '" href="' + esc(p.href) + '"' + ext(external) + '><i class="bi bi-' + esc(p.icon) + '" aria-hidden="true"></i>' + esc(p.label) + "</a></li>";
      }).join("") +
      '</ul><p class="copyright">© ' + new Date().getFullYear() + " " + esc(SITE.owner) + ". All rights reserved.</p></footer>";
  }

  /* Theme: follows the system setting until the visitor picks one. */
  var themeBtn = document.querySelector(".theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* Mobile menu */
  var menuBtn = document.querySelector(".menu-btn");
  var navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  /* Logo fallback: if a logo file is missing, show the organisation's initials instead. */
  document.querySelectorAll(".journey .mark img").forEach(function (img) {
    function swap() {
      var span = document.createElement("span");
      span.className = "initials";
      span.textContent = img.getAttribute("data-initials") || img.alt.slice(0, 3);
      img.replaceWith(span);
    }
    if (img.complete && img.naturalWidth === 0) swap(); else img.addEventListener("error", swap);
  });

  /* Publications */
  function authorList(authors, forCitation) {
    var names = authors.map(function (a) {
      if (/^TODO/.test(a)) return forCitation ? "[authors]" : '<span class="todo">' + esc(a) + "</span>";
      if (!forCitation && SELF_PATTERN.test(a)) return '<span class="me">' + esc(a) + "</span>";
      return esc(a);
    });
    if (names.length < 2) return names.join("");
    return names.slice(0, -1).join(", ") + (names.length > 2 ? ", & " : " & ") + names[names.length - 1];
  }

  // function apa(p) {
  //   return authorList(p.authors, true) + " (" + p.year + "). " + esc(p.title) + ". " + p.cite;
  // }

  function thumb(p) {
    if (p.thumb) return '<div class="thumb has-img"><img src="' + esc(p.thumb) + '" alt="" loading="lazy"></div>';
    var kind = p.type === "journal" ? "Journal article" : "Conference paper";
    return '<div class="thumb ' + p.type + '" aria-hidden="true"><span class="t-venue">' + esc(p.short) +
      '</span><span class="t-kind">' + kind + "</span></div>";
  }

  function paperRow(p, withThumb) {
    var links = p.links || {};
    var main = links.paper || links.project;
    var title = main ? '<a href="' + esc(main) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>" : esc(p.title);
    var badges = (p.badges || []).map(function (b) {
      return '<span class="badge ' + esc(b[0]) + '">' + esc(b[1]) + "</span>";
    }).join("");
    var linkHtml = [["paper", "Paper"], ["code", "Code"], ["slides", "Slides"], ["project", "Project page"]]
      .filter(function (l) { return links[l[0]]; })
      .map(function (l) { return '<a href="' + esc(links[l[0]]) + '" target="_blank" rel="noopener">' + l[1] + "</a>"; })
      .join("");
    // var citeId = "cite-" + p.id;
    // linkHtml += '<button type="button" class="cite-toggle" aria-expanded="false" aria-controls="' + citeId + '">Cite</button>';

    // return '<li class="row">' + (withThumb ? thumb(p) : "") + "<div>" +
    //   '<p class="p-title">' + title + "</p>" +
    //   '<p class="p-authors">' + authorList(p.authors, false) + "</p>" +
    //   '<p class="p-venue">' + esc(p.venue) + "</p>" +
    //   '<div class="p-meta">' + badges + '<span class="p-links">' + linkHtml + "</span></div>" +
    //   '<div class="cite-box" id="' + citeId + '" hidden><p>' + apa(p) + "</p>" +
    //   '<button type="button" class="copy-btn">Copy citation</button></div>' +
    //   "</div></li>";
    var citeId = "cite-" + p.id;
    if (p.cite) linkHtml += '<button type="button" class="cite-toggle" aria-expanded="false" aria-controls="' + citeId + '">Cite</button>';

    return '<li class="row">' + (withThumb ? thumb(p) : "") + "<div>" +
      '<p class="p-title">' + title + "</p>" +
      '<p class="p-authors">' + authorList(p.authors, false) + "</p>" +
      '<p class="p-venue">' + esc(p.venue) + "</p>" +
      '<div class="p-meta">' + badges + '<span class="p-links">' + linkHtml + "</span></div>" +
      (p.cite ? '<div class="cite-box" id="' + citeId + '" hidden><p>' + p.cite + "</p>" +
        '<button type="button" class="copy-btn">Copy citation</button></div>' : "") +
      "</div></li>";
  }

  var selected = document.getElementById("selected-pubs");
  if (selected) {
    selected.innerHTML = PUBLICATIONS.filter(function (p) { return p.selected; })
      .map(function (p) { return paperRow(p, true); }).join("");
  }

  function byYear(items, yearOf) {
    var years = [];
    items.forEach(function (it) { var y = yearOf(it); if (years.indexOf(y) < 0) years.push(y); });
    return years.sort(function (a, b) { return b - a; }).map(function (y) {
      return { year: y, items: items.filter(function (it) { return yearOf(it) === y; }) };
    });
  }

  document.querySelectorAll(".panel[data-type]").forEach(function (panel) {
    var type = panel.getAttribute("data-type");
    var items = PUBLICATIONS.filter(function (p) { return p.type === type; });
    panel.innerHTML = byYear(items, function (p) { return p.year; }).map(function (g) {
      return '<h3 class="year">' + g.year + '</h3><ul class="rows">' +
        g.items.map(function (p) { return paperRow(p, false); }).join("") + "</ul>";
    }).join("");
    var count = document.querySelector('.tab[aria-controls="' + panel.id + '"] .count');
    if (count) count.textContent = items.length;
  });

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); history.replaceState(null, "", "#" + tab.getAttribute("data-hash")); });
    tab.addEventListener("keydown", function (e) {
      var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
      if (j === null) return;
      var next = tabs[(j + tabs.length) % tabs.length];
      next.focus(); selectTab(next);
    });
  });
  if (tabs.length) {
    var fromHash = tabs.filter(function (t) { return "#" + t.getAttribute("data-hash") === location.hash; })[0];
    selectTab(fromHash || tabs[0]);
  }

  /* News page, grouped by year */
  var newsRoot = document.getElementById("news-groups");
  if (newsRoot) {
    newsRoot.innerHTML = byYear(NEWS, function (n) { return parseInt(n.date.slice(-4), 10); }).map(function (g) {
      return '<h2 class="year">' + g.year + '</h2><ul class="news">' +
        g.items.map(function (n) {
          return '<li><time><i class="bi bi-calendar-event" aria-hidden="true"></i>' + esc(n.date) + "</time><span>" + n.html + "</span></li>";
        }).join("") + "</ul>";
    }).join("");
  }

  /* Cite toggles and copy buttons */
  document.addEventListener("click", function (e) {
    var toggle = e.target.closest(".cite-toggle");
    if (toggle) {
      var box = document.getElementById(toggle.getAttribute("aria-controls"));
      var open = toggle.getAttribute("aria-expanded") === "true";
      box.hidden = open;
      toggle.setAttribute("aria-expanded", String(!open));
      return;
    }
    var copy = e.target.closest(".copy-btn");
    if (copy) {
      var text = copy.parentElement.querySelector("p").innerText;
      var done = function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy citation"; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
      else {
        var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta);
        ta.select(); try { document.execCommand("copy"); done(); } catch (err) {} ta.remove();
      }
    }
  });
})();
