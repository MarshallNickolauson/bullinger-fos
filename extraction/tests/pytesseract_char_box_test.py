from pathlib import Path
from PIL import Image, ImageDraw
import pytesseract

# Load the image
image_path = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\pages\page_167.png'
image = Image.open(image_path)

# OCR configuration
custom_config = r'--oem 3 --psm 6'

# Perform OCR to get text
text = pytesseract.image_to_string(image, lang='eng+ell+rus', config=custom_config)
print("Extracted Text:")
print(text)

# Save the extracted text to a file
output_file_path = Path(r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\extracted_text.txt')
with open(output_file_path, 'w', encoding='utf-8') as text_file:
    text_file.write(text)

# Perform OCR to get bounding boxes
data = pytesseract.image_to_boxes(image, lang='eng+ell+rus', config=custom_config)

# Create a draw object to add boxes
draw = ImageDraw.Draw(image)

# Define colors
colors = {
    'eng': 'red',   # English
    'ell': 'blue',  # Greek
    'rus': 'green'  # Russian
}

# Loop through the bounding box data and draw boxes
for line in data.splitlines():
    elements = line.split(' ')
    char = elements[0]
    x, y, w, h = map(int, elements[1:5])
    y = image.height - y  # Adjust y coordinate
    h = image.height - h  # Adjust h coordinate
    lang = 'eng'  # Default to English if not specified
    
    # Determine the language of the character (this is a heuristic and may need adjustment)
    if 'α' <= char <= 'ω' or 'Α' <= char <= 'Ω':  # Greek
        lang = 'ell'
    elif '\u0400' <= char <= '\u04FF':  # Russian range
        lang = 'rus'
    
    # Draw the box with the respective language color
    color = colors[lang]
    draw.rectangle([(x, h), (w, y)], outline=color)

# Save the image with highlighted boxes
highlighted_image_path = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\pages\highlighted_page_167.png'
image.save(highlighted_image_path)
image.show()
