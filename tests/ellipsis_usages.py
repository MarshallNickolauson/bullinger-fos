from pathlib import Path
from PIL import Image
import pytesseract

start_page = 41
end_page = 50
image_dir = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\pages'
output_file_path = Path(r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\extracted_text_pages_41_50.txt')
custom_config = r'--oem 3 --psm 6'

with open(output_file_path, 'w', encoding='utf-8') as text_file:
    for page_num in range(start_page, end_page + 1):
        image_path = Path(image_dir) / f'page_{page_num}.png'
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image, lang='eng+ell+rus', config=custom_config)
        text_file.write(text)

print(f"Extracted text from pages {start_page} to {end_page} has been saved to {output_file_path}")
