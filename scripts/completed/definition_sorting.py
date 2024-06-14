import os

def read_definition_files(folder_path):
    definitions = {}
    name_count = {}
    file_duplicates = {}  # To track files with duplicate first lines
    
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read().strip()
                lines = text.split('\n', 1)
                name = lines[0].strip()

                # Handle duplicate names by appending a unique identifier
                if name in definitions:
                    if name in name_count:
                        name_count[name] += 1
                    else:
                        name_count[name] = 1

                    unique_name = f"{name}_{name_count[name]}"
                    
                    # Track files with duplicate first lines
                    if name in file_duplicates:
                        file_duplicates[name].append(filename)
                    else:
                        file_duplicates[name] = [definitions[name]['filename'], filename]
                else:
                    unique_name = name

                definitions[unique_name] = {
                    'filename': filename,
                    'name': unique_name,
                    'content': text
                }
    
    # Print files with duplicate first lines for debugging
    for name, files in file_duplicates.items():
        if len(files) > 1:
            print(f"Files with duplicate first line '{name}': {', '.join(files)}")
    
    return definitions

def order_definitions_by_appearance(definitions, full_doc_path):
    with open(full_doc_path, 'r', encoding='utf-8') as f:
        full_text = f.read()

    ordered_defs = []
    missed_names = []

    for name, details in definitions.items():
        position = full_text.find(name)
        if position != -1:
            ordered_defs.append((position, name))
        else:
            missed_names.append(name)

    ordered_defs.sort()
    
    # Print missed names for debugging
    if missed_names:
        print(f"Missed names: {missed_names}")
    
    return [name for position, name in ordered_defs]

def copy_and_rename_definitions(ordered_names, definitions, output_folder_path):
    if not os.path.exists(output_folder_path):
        os.makedirs(output_folder_path)

    for index, name in enumerate(ordered_names, start=1):
        details = definitions[name]
        new_filename = f"{index}_{details['filename']}"
        new_filepath = os.path.join(output_folder_path, new_filename)

        # Prepend the order number to the content
        new_content = f"{index}\n\n{details['content']}"

        with open(new_filepath, 'w', encoding='utf-8') as new_file:
            new_file.write(new_content)

###############

definition_folder_path = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\definition_extractions'
full_document_path = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\full_document.txt'
output_folder_path = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\sorted_definitions'

definitions = read_definition_files(definition_folder_path)
print(f"definitions: {len(definitions)}")

ordered_names = order_definitions_by_appearance(definitions, full_document_path)

# Print all ordered definition names
# for name in ordered_names:
#     print(name)

print(f"Number of ordered definitions: {len(ordered_names)}")

copy_and_rename_definitions(ordered_names, definitions, output_folder_path)