import base64
import os

def get_base64_image(path):
    if not os.path.exists(path):
        return ""
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        extension = os.path.splitext(path)[1][1:]
        return f"data:image/{extension};base64,{encoded_string}"

# Directorio base
base_dir = r"c:\Users\Suare\OneDrive\Documentos\Universidad\cuarto\segundo_cuatri\AvalProxEmp\pitch\smartquenda-mvp"

# Leer archivos
with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()

with open(os.path.join(base_dir, "styles.css"), "r", encoding="utf-8") as f:
    css = f.read()

with open(os.path.join(base_dir, "app.js"), "r", encoding="utf-8") as f:
    js = f.read()

# Convertir imágenes
logo_b64 = get_base64_image(os.path.join(base_dir, "logo.png"))
qr_b64 = get_base64_image(os.path.join(base_dir, "qr_smartquenda_premium.png"))

# Reemplazar en HTML
html = html.replace('href="styles.css"', '')
html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>{css}</style>')
html = html.replace('<script src="app.js"></script>', f'<script>{js}</script>')
html = html.replace('src="logo.png"', f'src="{logo_b64}"')

# Reemplazar en JS (si hay referencias a imágenes)
# Por ahora el JS parece que no carga imágenes dinámicamente excepto quizás por el logo en algún lado

# Guardar bundle
with open(os.path.join(base_dir, "index_online.html"), "w", encoding="utf-8") as f:
    f.write(html)

print("Bundle creado: index_online.html")
