(function () {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const inSubfolder = segments.length >= 2 &&
        (segments[segments.length - 2] === 'header' || segments[segments.length - 2] === 'cursos');
    const base = inSubfolder ? '../' : '';

    // 1. Salva o conteúdo do <main> da página atual
    const pageMain = document.getElementById('page-content');
    const savedContent = pageMain ? pageMain.innerHTML : '';

    // 2. Remove o <main> original do DOM antes de injetar o layout
    if (pageMain) pageMain.remove();

    // 3. Carrega o layout e injeta no topo do body
    fetch(base + '_layout.html')
        .then(r => r.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);

            // 4. Corrige links e imagens com data-link / data-src
            document.querySelectorAll('[data-link]').forEach(el => {
                el.href = base + el.getAttribute('data-link');
            });
            document.querySelectorAll('[data-src]').forEach(el => {
                el.src = base + el.getAttribute('data-src');
                el.removeAttribute('data-src');
            });

            // 5. Injeta o conteúdo salvo no <main> do layout
            const layoutMain = document.getElementById('page-content');
            if (layoutMain) layoutMain.innerHTML = savedContent;
        })
        .catch(err => console.warn('Erro ao carregar _layout.html:', err));
})();