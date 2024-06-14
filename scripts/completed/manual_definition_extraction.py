from pathlib import Path
from PIL import Image
import pytesseract

# Function to extract text from images for a given figure of speech and page range
def extract_text(figure_of_speech, start_page, end_page):
    image_dir = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\pages'
    output_folder = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\z_definition_extractions'
    
    # Create the output folder if it doesn't exist
    Path(output_folder).mkdir(parents=True, exist_ok=True)
    
    output_file_path = Path(output_folder) / f'{figure_of_speech}_def_pages_{start_page}_{end_page}.txt'
    custom_config = r'--oem 3 --psm 6'

    with open(output_file_path, 'w', encoding='utf-8') as text_file:
        for page_num in range(start_page, end_page + 1):
            image_path = Path(image_dir) / f'page_{page_num}.png'
            image = Image.open(image_path)
            text = pytesseract.image_to_string(image, lang='eng+ell+rus', config=custom_config)
            text_file.write(text)

    print(f"Done")

if __name__ == "__main__":
    # Get user inputs
    figure_of_speech = input("Enter FoS Name: ").strip()
    start_page = int(input("Enter the starting page number: ").strip())
    end_page = int(input("Enter the ending page number: ").strip())
    
    # Call function to extract text
    extract_text(figure_of_speech, start_page, end_page)
