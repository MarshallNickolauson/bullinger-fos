from pathlib import Path
from PIL import Image
import pytesseract
import re
import subprocess

def extract_text(figure_of_speech, definition_number, start_page, end_page):
    image_dir = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\pages'
    output_folder = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\extracted_usages'
    
    Path(output_folder).mkdir(parents=True, exist_ok=True)
    
    output_file_path = Path(output_folder) / f'{definition_number}_{figure_of_speech}_usage_content_pages_{start_page}_{end_page}.txt'
    custom_config = r'--oem 3 --psm 6'

    with open(output_file_path, 'w', encoding='utf-8') as text_file:
        for page_num in range(start_page, end_page + 1):
            image_path = Path(image_dir) / f'page_{page_num}.png'
            image = Image.open(image_path)
            text = pytesseract.image_to_string(image, lang='eng+ell+rus', config=custom_config)
            text_file.write(text)

    print(f"Text extraction complete.")

def get_all_definitions(directory):
    definition_files = Path(directory).glob("*.txt")
    definitions = {}
    pattern = re.compile(r"(\d+)_(.*?)_def_pages_(\d+)_\d+\.txt")
    
    for file in definition_files:
        match = pattern.match(file.name)
        if match:
            number, name, start_page = match.groups()
            definitions[name.lower()] = {
                'number': int(number),
                'start_page': int(start_page)
            }
    
    return definitions

if __name__ == "__main__":
    sorted_definitions_dir = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\sorted_definitions'
    definitions = get_all_definitions(sorted_definitions_dir)
    print(definitions)
    
    while True:
        figure_of_speech = input("\nEnter FoS Name: ").strip().lower()
        
        if figure_of_speech == 'q':
            break
        
        if figure_of_speech in definitions:
            current_definition = definitions[figure_of_speech]
            current_definition_number = current_definition['number']
            next_definition_number = current_definition_number + 1
            
            # print(f"\nCurrent Definition:")
            # print(f"Number: {current_definition_number}")
            # print(f"Next number: {next_definition_number}")
            # print(f"Start Page: {current_definition['start_page']}")
            
            next_definition_start_page = 0
            
            if next_definition_number in (def_data['number'] for def_data in definitions.values()):
                for key, value in definitions.items():
                    if value["number"] == next_definition_number:
                        
                        # print(f"\nNext Definition: {key}")
                        # print(f"Number: {value['number']}")
                        # print(f"Start Page: {value['start_page']}")
                        
                        next_definition_start_page = int(value['start_page'])
                        
                        break
            else:
                print(f"\nNo next definition found for '{figure_of_speech}'.")
            
            
            
            
            start_page = input("Enter the starting page number: ").strip()
            if not start_page.isdigit():
                print(f"Error: '{start_page}' is not an integer")
            else:
                end_page = next_definition_start_page
                extract_text(figure_of_speech, current_definition_number, int(start_page), int(end_page))
        else:
            print(f"Error: '{figure_of_speech}' not found")