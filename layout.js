(function () {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    // Detecta se está em header/ ou cursos/
    const inSubfolder = segments.length >= 2 &&
        (segments[segments.length - 2] === 'header' || segments[segments.length - 2] === 'cursos');
    const base = inSubfolder ? '../' : './';

    // Salva e remove o <main> original
    const pageMain = document.getElementById('page-content');
    const savedContent = pageMain ? pageMain.innerHTML : '';
    if (pageMain) pageMain.remove();

    fetch(base + 'layout-template.html')
        .then(r => {
            if (!r.ok) throw new Error('Layout não encontrado: ' + r.status);
            return r.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);

            document.querySelectorAll('[data-link]').forEach(el => {
                el.href = base + el.getAttribute('data-link');
            });
            document.querySelectorAll('[data-src]').forEach(el => {
                el.src = base + el.getAttribute('data-src');
                el.removeAttribute('data-src');
            });

            const layoutMain = document.getElementById('page-content');
            if (layoutMain) layoutMain.innerHTML = savedContent;
        })
        .catch(err => console.warn('Erro ao carregar _layout.html:', err));
})();
