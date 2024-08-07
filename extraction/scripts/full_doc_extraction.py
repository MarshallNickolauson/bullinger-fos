from pathlib import Path
from PIL import Image
import pytesseract

image_dir = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\extraction\pages'
output_file_path = Path(r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\introduction_extraction.txt')
custom_config = r'--oem 3 --psm 6'

with open(output_file_path, 'w', encoding='utf-8') as text_file:
    for page_num in range(1, 33):
        image_path = Path(image_dir) / f'page_{page_num}.png'
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image, lang='eng+ell+rus', config=custom_config)
        text_file.write(text)
        print(f"Extracted page {page_num}")

print("done")
