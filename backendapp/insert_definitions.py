import os
from pathlib import Path
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendapp.settings')

django.setup()

from api.models import Definition

def insert_definitions():
    
    definitions = []
    
    definition_files = Path(r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\extraction\sorted_definitions').glob("*.txt")
    
    for file in definition_files:
        match = re.match(r"(\d+)_([a-zA-Z]+(?:_[a-zA-Z]+)*)_def_pages_(\d+)_(\d+)", str(file.name))
        if match:
                   
            with open(file, 'r', encoding='utf-8') as file_content:
                text_content = file_content.read()
                
            definition = Definition(
                book_position = int(match.group(1)),
                figure_name = str(match.group(2).replace('_', ' ')),
                content = text_content,
                custom_rules = ""
            )
            definitions.append(definition)

    definitions.sort(key=lambda x: x.book_position)

    Definition.objects.bulk_create(definitions)
    print(f"Inserted {len(definitions)} Definition records successfully.")

if __name__ == "__main__":
    insert_definitions()