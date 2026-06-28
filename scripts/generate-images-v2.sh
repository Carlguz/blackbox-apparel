#!/bin/bash
# Puerto Norte v2 - Product-focused images
# Generates: 1 hero + 6 product views (front + back of 3 polos)

set -e
OUTPUT_DIR="/home/z/my-project/public/products"
mkdir -p "$OUTPUT_DIR"

# Remove old product images to avoid confusion
rm -f "$OUTPUT_DIR"/polo-*.png "$OUTPUT_DIR"/hero.png "$OUTPUT_DIR"/lifestyle-*.png "$OUTPUT_DIR"/bg-texture.png

echo "=== 1/7: HERO - Los tres polos juntos ==="
z-ai image -p "Cinematic editorial flat-lay product photography of three premium cotton crew-neck t-shirts arranged elegantly side by side on a dark slate surface with subtle texture, one deep navy blue t-shirt, one crisp white t-shirt, one cream off-white t-shirt, all perfectly laid flat showing front design details, soft directional natural lighting from upper left creating subtle fabric shadows, sophisticated minimalist composition with negative space, top-down view, premium menswear brand campaign aesthetic, photorealistic, high-end fashion magazine quality, no logos visible" -o "$OUTPUT_DIR/hero.png" -s 1344x768

echo "=== 2/7: POLO CALLAO - FRONT ==="
z-ai image -p "Professional flat-lay product photography of a deep navy blue premium cotton crew-neck t-shirt laid perfectly flat against a clean off-white studio background, showing the FRONT view only, small elegant white embroidered text reading CALLAO on the left chest area in serif font with a tiny five-pointed star symbol above the text, premium heavyweight cotton fabric texture visible, soft even overhead studio lighting, no wrinkles, perfectly centered composition, high-end minimalist menswear catalog style, photorealistic, sharp focus, top-down view" -o "$OUTPUT_DIR/callao-front.png" -s 1024x1024

echo "=== 3/7: POLO CALLAO - BACK ==="
z-ai image -p "Professional flat-lay product photography of a deep navy blue premium cotton crew-neck t-shirt laid perfectly flat against a clean off-white studio background, showing the BACK view only, large elegant white serif typography reading CALLAO centered on the upper back area with a thin horizontal line above and a thin horizontal line below the text, premium heavyweight cotton fabric texture visible, soft even overhead studio lighting, no wrinkles, perfectly centered composition, high-end minimalist menswear catalog style, photorealistic, sharp focus, top-down view" -o "$OUTPUT_DIR/callao-back.png" -s 1024x1024

echo "=== 4/7: POLO GRONE - FRONT ==="
z-ai image -p "Professional flat-lay product photography of a crisp white premium cotton crew-neck t-shirt laid perfectly flat against a clean light warm grey studio background, showing the FRONT view only, small navy blue embroidered five-pointed star symbol centered on the left chest area, completely minimalist clean design with no other prints, premium heavyweight cotton fabric texture visible, soft even overhead studio lighting, no wrinkles, perfectly centered composition, high-end minimalist menswear catalog style, photorealistic, sharp focus, top-down view" -o "$OUTPUT_DIR/grone-front.png" -s 1024x1024

echo "=== 5/7: POLO GRONE - BACK ==="
z-ai image -p "Professional flat-lay product photography of a crisp white premium cotton crew-neck t-shirt laid perfectly flat against a clean light warm grey studio background, showing the BACK view only, large elegant navy blue serif typography reading GRONE centered on the upper back area with a thin horizontal line above the text, premium heavyweight cotton fabric texture visible, soft even overhead studio lighting, no wrinkles, perfectly centered composition, high-end minimalist menswear catalog style, photorealistic, sharp focus, top-down view" -o "$OUTPUT_DIR/grone-back.png" -s 1024x1024

echo "=== 6/7: POLO MAUTE - FRONT ==="
z-ai image -p "Professional flat-lay product photography of a cream off-white premium cotton crew-neck t-shirt laid perfectly flat against a clean warm beige studio background, showing the FRONT view only, completely clean minimalist design with absolutely no front print or embroidery or decoration, premium heavyweight cotton fabric texture clearly visible, soft even overhead studio lighting, no wrinkles, perfectly centered composition, high-end minimalist luxury menswear catalog style, photorealistic, sharp focus, top-down view" -o "$OUTPUT_DIR/maute-front.png" -s 1024x1024

echo "=== 7/7: POLO MAUTE - BACK ==="
z-ai image -p "Professional flat-lay product photography of a cream off-white premium cotton crew-neck t-shirt laid perfectly flat against a clean warm beige studio background, showing the BACK view only, small elegant navy blue serif typography reading MAUTE positioned at the upper nape area near the collar with a small five-pointed navy star symbol above the text, minimalist sophisticated design, premium heavyweight cotton fabric texture visible, soft even overhead studio lighting, no wrinkles, perfectly centered composition, high-end minimalist luxury menswear catalog style, photorealistic, sharp focus, top-down view" -o "$OUTPUT_DIR/maute-back.png" -s 1024x1024

echo ""
echo "=== DONE ==="
ls -la "$OUTPUT_DIR"
