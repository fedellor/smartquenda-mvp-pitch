import urllib.request
import urllib.parse
from PIL import Image
import os

url = "https://6b1f9efaf8ab245f-193-144-81-195.serveousercontent.com"
qr_url = f"https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&ecc=H&data={urllib.parse.quote(url)}"

print("Descargando código QR de alta resolución...")
urllib.request.urlretrieve(qr_url, "qr_base.png")

print("Generando QR con Logo...")
qr_img = Image.open("qr_base.png").convert("RGBA")
try:
    logo_img = Image.open("logo.png").convert("RGBA")
except Exception as e:
    print("No se encontró logo.png. Asegúrate de que existe.")
    exit(1)

# Hacer el logo de un tamaño razonable para que la corrección de errores (30%) funcione
basewidth = int(qr_img.size[0] * 0.3)
wpercent = (basewidth / float(logo_img.size[0]))
hsize = int((float(logo_img.size[1]) * float(wpercent)))
logo_img = logo_img.resize((basewidth, hsize), Image.Resampling.LANCZOS)

# Crear un fondo blanco para que el logo resalte y el QR sea legible
white_bg = Image.new("RGBA", (basewidth + 40, hsize + 40), "white")
white_bg.paste(logo_img, (20, 20), logo_img)

# Pegar en el centro
pos = ((qr_img.size[0] - white_bg.size[0]) // 2, (qr_img.size[1] - white_bg.size[1]) // 2)
qr_img.paste(white_bg, pos, white_bg)

qr_img.save("qr_smartquenda_premium.png")
print("Guardado exitosamente como qr_smartquenda_premium.png")
