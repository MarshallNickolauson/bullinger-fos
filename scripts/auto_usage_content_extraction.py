from pathlib import Path
from PIL import Image
import pytesseract
import re

def extract_text(figure_of_speech, definition_number, start_page, end_page):
    image_dir = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\pages'
    output_folder = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\extracted_usages'
    
    Path(output_folder).mkdir(parents=True, exist_ok=True)
    
    output_file_path = Path(output_folder) / f'{definition_number}_{figure_of_speech}_usage_content_pages_{start_page}_{end_page}.txt'
    custom_config = r'--oem 3 --psm 6'

    print(f"Extracting {figure_of_speech} pg. {start_page} - {end_page}...")

    with open(output_file_path, 'w', encoding='utf-8') as text_file:
        has_content = False
        for page_num in range(start_page, end_page + 1):
            print(f'\rExtracting page {page_num}', end='')
            image_path = Path(image_dir) / f'page_{page_num}.png'
            image = Image.open(image_path)
            text = pytesseract.image_to_string(image, lang='eng+ell+rus', config=custom_config)
            if text.strip():
                has_content = True
                text_file.write(text)
        if not has_content:
            text_file.write("no content for this figure")

    print(f"Text extraction complete.")

def get_all_definitions(directory):
    definition_files = Path(directory).glob("*.txt")
    definitions = []
    
    for file in definition_files:
        definitions.append(file.name[:-4])
    
    return definitions

def extract_number(item):
    match = re.match(r"(\d+)", item)
    return int(match.group(1)) if match else None

def extract_details(item):
    match = re.match(r"(\d+)_([a-zA-Z]+(?:_[a-zA-Z]+)*)_def_pages_(\d+)_(\d+)", item)
    if match:
        number = int(match.group(1))
        name = match.group(2).replace('_', ' ')
        start_page = int(match.group(3))
        end_page = int(match.group(4))
        return number, name, start_page, end_page
    else:
        return None, None, None, None

if __name__ == "__main__":
    sorted_definitions_dir = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\sorted_definitions'
    definitions = get_all_definitions(sorted_definitions_dir)
    
    sorted_definitions = sorted(definitions, key=extract_number)
    
    for i, item in enumerate(sorted_definitions):
        number, name, start_page, end_page = extract_details(item)
        if number is not None:
            if i < len(sorted_definitions) - 1:
                next_start_page = extract_details(sorted_definitions[i + 1])[2]
            else:
                next_start_page = end_page + 1
            print(f"Number: {number}, Name: {name}, Start Page: {end_page}, End Page: {next_start_page}")
            extract_text(name, number, end_page, next_start_page)
        else:
            print(f"Failed to parse item: {item}")