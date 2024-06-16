import os
from pathlib import Path
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backendapp.settings')

django.setup()

from api.models import Usage

def insert_usages():
    
    usages = []
    
    usage_files = Path(r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\extraction\extracted_usages').glob("*.txt")
    
    for file in usage_files:
        match = re.match(r"(\d+)_([a-zA-Z]+(?:_[a-zA-Z]+)*)_usage_content_pages_(\d+)_(\d+)", str(file.name))
        if match:
                   
            with open(file, 'r', encoding='utf-8') as file_content:
                text_content = file_content.read()
                
            definition = Usage(
                book_position = int(match.group(1)),
                figure_name = str(match.group(2).replace('_', ' ')),
                content = text_content,
                custom_rules = ""
            )
            usages.append(definition)

    usages.sort(key=lambda x: x.book_position)

    Usage.objects.bulk_create(usages)
    print(f"Inserted {len(usages)} Usage records successfully.")

if __name__ == "__main__":
    insert_usages()