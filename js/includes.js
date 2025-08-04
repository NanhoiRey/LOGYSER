function includeHTML(id, url, callback) {
    fetch(url)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error('Error al incluir', url, err));
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('include-nav')) {
        includeHTML('include-nav', 'nav.html', function() {
            // Ejecuta aquí mainScripts cuando el nav ya está en el DOM
            mainScripts();
        });
    }
    if (document.getElementById('include-footer')) {
        includeHTML('include-footer', 'footer.html');
    }
});