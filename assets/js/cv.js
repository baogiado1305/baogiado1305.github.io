/*
 * CV viewer: draws each page of the PDF onto a <canvas> with PDF.js.
 * Canvas pages carry no text layer, so the CV can be read but its text can't be selected or copied.
 * Right-click, dragging, Ctrl/Cmd + A / C / X / S / P and printing are also turned off on this page.
 * Note: this discourages copying; it can't stop screenshots, and the PDF file itself is still public in the repo.
 */
(function () {
  "use strict";

  var viewer = document.getElementById("cv-viewer");
  var status = document.getElementById("cv-status");
  if (!viewer) return;

  function showError() {
    status.hidden = false;
    status.innerHTML = '<span>The CV couldn\'t be loaded. Refresh the page, or <a href="mailto:baogiado1305@gmail.com?subject=CV%20request">email me</a> for a copy.</span>';
  }

  if (!window.pdfjsLib) { showError(); return; }
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  var pdf = null;
  var pages = [];
  var renderedWidth = 0;
  var job = 0;

  function render() {
    var width = viewer.clientWidth;
    if (!pdf || !width || width === renderedWidth) return;
    renderedWidth = width;
    var mine = ++job;
    /* Draw extra pixels so text stays sharp when zoomed on phones, capped at about 2600px per page to save memory. */
    var ratio = Math.min(Math.max((window.devicePixelRatio || 1) * 1.5, 1.5), 4, 2600 / width);

    pages.reduce(function (chain, page, i) {
      return chain.then(function () {
        if (mine !== job) return;
        var base = page.getViewport({ scale: 1 });
        var viewport = page.getViewport({ scale: width / base.width });
        var canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.setAttribute("role", "img");
        canvas.setAttribute("aria-label", "CV page " + (i + 1) + " of " + pages.length);
        return page.render({
          canvasContext: canvas.getContext("2d"),
          viewport: viewport,
          transform: [ratio, 0, 0, ratio, 0, 0]
        }).promise.then(function () {
          if (mine !== job) return;
          var old = viewer.querySelectorAll("canvas")[i];
          if (old) viewer.replaceChild(canvas, old); else viewer.appendChild(canvas);
        });
      });
    }, Promise.resolve()).then(function () {
      if (mine === job) status.hidden = true;
    }, showError);
  }

  pdfjsLib.getDocument(viewer.getAttribute("data-src")).promise
    .then(function (doc) {
      pdf = doc;
      var all = [];
      for (var n = 1; n <= doc.numPages; n++) all.push(doc.getPage(n));
      return Promise.all(all);
    })
    .then(function (loaded) { pages = loaded; render(); })
    .catch(showError);

  var timer = null;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(render, 200);
  });

  /* Read-only: no right-click menu, no dragging the page images out, no copy, save or print shortcuts. */
  ["contextmenu", "dragstart", "selectstart"].forEach(function (type) {
    viewer.addEventListener(type, function (e) { e.preventDefault(); });
  });
  document.addEventListener("copy", function (e) { e.preventDefault(); });
  document.addEventListener("cut", function (e) { e.preventDefault(); });
  document.addEventListener("keydown", function (e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    var key = (e.key || "").toLowerCase();
    if (key === "a" || key === "c" || key === "x" || key === "s" || key === "p") e.preventDefault();
  });
})();
