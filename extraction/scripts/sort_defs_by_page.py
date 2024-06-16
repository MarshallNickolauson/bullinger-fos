import os
import re
import shutil

source_directory = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\sorted_definitions'
destination_directory = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\sorted_definitions_by_page'

os.makedirs(destination_directory, exist_ok=True)

def extract_page_numbers(file_name):
    match = re.search(r'pages_(\d+)_(\d+)', file_name)
    if match:
        start_page = int(match.group(1))
        end_page = int(match.group(2))
        return start_page, end_page
    return None, None

files = [f for f in os.listdir(source_directory) if f.endswith('.txt')]

file_data = []
for file_name in files:
    start_page, end_page = extract_page_numbers(file_name)
    if start_page is not None:
        file_data.append((start_page, end_page, file_name))

file_data.sort(key=lambda x: (x[0], x[1]))

for i, (start_page, end_page, file_name) in enumerate(file_data):
    new_file_name = f"{i+1}_{file_name.split('_', 1)[1]}".lower()
    new_file_path = os.path.join(destination_directory, new_file_name)

    shutil.copy(os.path.join(source_directory, file_name), new_file_path)

    with open(new_file_path, 'r', encoding="utf-8") as file:
        lines = file.readlines()
    
    with open(new_file_path, 'w', encoding="utf-8") as file:
        file.writelines(lines[2:])

print("Files have been sorted, renamed, copied, and modified successfully.")