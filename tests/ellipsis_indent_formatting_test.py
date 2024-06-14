import re

def categorize_ellipsis(line):
    if re.match(r'([A-H]+)\. (.*)', line):
        return 'capital_letter'
    elif re.match(r'([IVX]+)\. (.*)', line):
        return 'capital_roman_numeral'
    elif re.match(r'^\d+\.', line):
        return 'number'
    elif re.match(r'([a-h]+)\. (.*)', line):
        return 'lowercase_letter'
    elif re.match(r'^[ivx]+\)', line):
        return 'lowercase_roman_numeral'
    else:
        return None

def indent_text(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:  # Specify the correct encoding of your input file
        lines = f.readlines()

    formatted_lines = []
    current_indent = 0

    for line in lines:
        line = line.strip()
        category = categorize_ellipsis(line)

        if category == 'capital_letter':
            current_indent = 3
        elif category == 'capital_roman_numeral':
            current_indent = 6
        elif category == 'number':
            current_indent = 9
        elif category == 'lowercase_letter':
            current_indent = 12
        elif category == 'lowercase_roman_numeral':
            current_indent = 15

        formatted_lines.append(' ' * current_indent + line)

    with open(output_file, 'w', encoding='utf-8') as f:  # Specify the correct encoding for your output file
        f.write('\n'.join(formatted_lines))

if __name__ == '__main__':
    input_file = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\z_extractions\Ellipsis Usages.txt'  # Replace with your input file path
    output_file = r'C:\Users\Marshall\Desktop\Coding\Python\bullinger-fos-app\tests\output.txt'  # Replace with your desired output file path

    indent_text(input_file, output_file)
    print(f'Formatted text saved to {output_file}')
