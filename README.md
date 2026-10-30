# Coro Chamberí Maristas — sitio web

Sitio HTML/CSS/JS para publicación en Netlify.

## Despliegue
- `index.html` y la carpeta `assets/` en la raíz de publicación.
- En Netlify, activar **Forms → Form detection → Enable** y hacer un nuevo deploy.
- Formularios estáticos: `contacto`, `unete`, `contratacion`.
- Configurar email en **Forms → Submission notifications → Add notification → Email notification**; destino sugerido `coro@maristaschamberi.com`.
- Realizar pruebas reales con un envío a cada formulario, verificar que aparecen en Forms y confirmar la recepción del correo.
- La página `gracias.html` se muestra tras el POST, solo si Netlify procesó el envío.
- En GitHub Pages los formularios **no se procesan**.

## Antes de publicar el dominio final
- Confirmar el nombre legal y las obligaciones del responsable del tratamiento; revisar `privacidad.html` con el coro y adecuar al RGPD/LOPDGDD.
- Confirmar consentimiento y derechos de publicación de fotografías, nombres e himno.
- Las fotografías de galería todavía usan URL externas de WordPress: no eliminar ese sitio hasta descargarlas al proyecto.
- Revisar agenda, integrantes, correo y otros datos públicos con la persona responsable del coro.
- Al comprar el dominio, actualizar URLs canonical/og:url/JSON-LD, `robots.txt` y `sitemap.xml`.
- Confirmar si el sitio de Netlify es `https://coro-chamberi-web.netlify.app/`: SEO usa esa dirección provisional hasta el cambio de dominio.
- Opcional: retirar documentación interna (`*.md`) antes de desplegar.

## Archivos
- HTML en raíz.
- Diseño `assets/css/styles.css` y scripts `assets/js/main.js`.
- Multimedia `assets/images/`, `assets/audio/`.
