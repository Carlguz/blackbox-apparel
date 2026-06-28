#!/bin/bash
# Puerto Norte - Image generation script
# Generates: hero image, 3 product polo images, brand lifestyle images

set -e

OUTPUT_DIR="/home/z/my-project/public/products"
mkdir -p "$OUTPUT_DIR"

echo "=== Generando imagen HERO - Puerto Norte ==="
z-ai image \
  -p "Cinematic editorial fashion photography, a confident latino man in his early 30s wearing an elegant navy blue crew-neck t-shirt, standing against a concrete wall with soft natural light from the side, mood is sophisticated and urban, shallow depth of field, shot on Leica M11 with 50mm lens, premium menswear brand aesthetic, color palette deep navy blue and white with subtle warm tones, no logos visible, high-end fashion magazine quality, photorealistic" \
  -o "$OUTPUT_DIR/hero.png" \
  -s 1344x768

echo "=== Generando polo CALLAO (casual elegante) ==="
z-ai image \
  -p "Professional product photography of an elegant navy blue crew-neck t-shirt on a wooden hanger against a clean off-white studio background, premium cotton fabric texture visible, small embroidered detail '1901' in white thread on left chest area, subtle sky-blue stripe on sleeve cuff, soft directional studio lighting, minimalist composition, high-end menswear catalog style, photorealistic, sharp focus, no other logos" \
  -o "$OUTPUT_DIR/polo-callao.png" \
  -s 1024x1024

echo "=== Generando polo GRONE (sofisticado) ==="
z-ai image \
  -p "Professional product photography of a crisp white premium crew-neck t-shirt on a wooden hanger against a clean charcoal grey studio background, slim fit elegant cut, refined typography print reading 'GRONE' in small navy blue serif font on left chest, sophisticated minimalist design, soft directional studio lighting with subtle shadows, high-end fashion editorial catalog style, photorealistic, sharp focus, premium cotton fabric texture" \
  -o "$OUTPUT_DIR/polo-grone.png" \
  -s 1024x1024

echo "=== Generando polo MAUTE (minimalista premium) ==="
z-ai image \
  -p "Professional product photography of a deep dark navy blue premium crew-neck t-shirt on a wooden hanger against a clean light beige studio background, ultra minimalist design, no chest print, only a small embroidered silver star symbol on right sleeve, premium heavyweight cotton fabric with visible texture, sky-blue accent on inside collar visible when slightly folded, soft directional studio lighting, sophisticated luxury fashion catalog style, photorealistic, sharp focus" \
  -o "$OUTPUT_DIR/polo-maute.png" \
  -s 1024x1024

echo "=== Generando imagen lifestyle - reunion ==="
z-ai image \
  -p "Candid lifestyle photography of a group of three well-dressed latino men in their late 20s to mid 30s at an upscale cocktail bar, two wearing elegant navy blue crew-neck t-shirts under blazers, one wearing white premium t-shirt, all in smart casual attire, warm ambient lighting, laughing and talking, sophisticated urban Lima Peru setting, premium lifestyle brand aesthetic, photorealistic, shallow depth of field, no visible logos" \
  -o "$OUTPUT_DIR/lifestyle-reunion.png" \
  -s 1344x768

echo "=== Generando imagen lifestyle - ciudad ==="
z-ai image \
  -p "Editorial urban photography of an elegant latino man in his 30s walking through a modern Lima Peru street at golden hour, wearing a navy blue premium crew-neck t-shirt with dark trousers, confident stride, soft warm sunlight, sophisticated minimalist menswear aesthetic, shallow depth of field, photorealistic, premium fashion brand campaign style, no visible logos" \
  -o "$OUTPUT_DIR/lifestyle-ciudad.png" \
  -s 768x1344

echo "=== Generando textura de fondo ==="
z-ai image \
  -p "Abstract minimalist background texture, subtle navy blue gradient with very faint diagonal stripes pattern, premium fabric inspired texture, soft and elegant, suitable for luxury fashion brand website background, no text or logos, very subtle and understated, photorealistic" \
  -o "$OUTPUT_DIR/bg-texture.png" \
  -s 1344x768

echo ""
echo "=== GENERACION COMPLETADA ==="
ls -la "$OUTPUT_DIR"
