(function () {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const inSubfolder = segments.length >= 2 &&
        (segments[segments.length - 2] === 'header' || segments[segments.length - 2] === 'cursos');
    const base = inSubfolder ? '../' : '';

    // Salva e remove o <main> original
    const pageMain = document.getElementById('page-content');
    const savedContent = pageMain ? pageMain.innerHTML : '';
    if (pageMain) pageMain.remove();

    // ── NAVBAR ──────────────────────────────────────────────────────────────
    const nav = document.createElement('nav');
    nav.innerHTML = `
        <a href="${base}index.html">HOME</a>
        <a href="${base}header/eventos.html">EVENTOS</a>
        <a href="${base}header/contato.html">CONTATO</a>
        <div class="dropdown">
            <a href="#">CURSOS</a>
            <div class="dropdown-content">
                <a href="${base}cursos/ads.html">Análise e Desenvolvimento de Sistemas</a>
                <a href="${base}cursos/edp.html">Engenharia de Produção</a>
                <a href="${base}cursos/gti.html">Gestão em Tecnologia da Informação</a>
                <a href="${base}cursos/letras.html">Letras</a>
                <a href="${base}cursos/gp.html">Gestão Pública</a>
            </div>
        </div>
        <a href="${base}header/entrar.html">ENTRAR</a>
        <a href="${base}header/sobre.html" class="nav-right">SOBRE</a>
    `;

    // ── HEADER VERDE ─────────────────────────────────────────────────────────
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `<img class="logo" src="${base}img/logo.jpg" alt="Logo IFSP">`;

    // ── MAIN ─────────────────────────────────────────────────────────────────
    const main = document.createElement('main');
    main.id = 'page-content';
    main.innerHTML = savedContent;

    // ── FOOTER ───────────────────────────────────────────────────────────────
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <a href="https://www.facebook.com/IFSaoPaulo/" target="_blank">
            <img class="facebook" src="${base}img/facebook.png" alt="Facebook IFSP">
        </a>
        <p>IFSP - Câmpus Pirituba - Av. Mutinga, 951 - Jardim Santo Elias - CEP: 05110-000 - São Paulo/SP - Contato: (011) 2504-0100</p>
    `;

    // ── INJETA NO BODY ───────────────────────────────────────────────────────
    document.body.appendChild(nav);
    document.body.appendChild(header);
    document.body.appendChild(main);
    document.body.appendChild(footer);
})();
