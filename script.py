import os
import mimetypes
from pathlib import Path
import argparse


# Directories to exclude
EXCLUDED_DIRS = {'.git', 'node_modules', '__pycache__', '.venv', '.idea', '.vscode', '.next', 'build', 'dist', 'target'}


# File extensions to exclude
EXCLUDED_EXTENSIONS = {
    '.pyc', '.exe', '.dll', '.so', '.dylib', '.woff', '.woff2',
    '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.mp3', '.mp4', '.avi',
    '.mkv', '.pdf', '.zip', '.tar', '.gz', '.rar', '.7z', '.bin', '.iso'
}


# Files to exclude
EXCLUDED_FILES = {'package-lock.json', 'yarn.lock', 'thumbs.db', 'desktop.ini', 'folder_structure.txt'}


def parse_arguments():
    parser = argparse.ArgumentParser(description='Collect project files into a single text file.')
    parser.add_argument('-d', '--directory', type=str, default='.', help='Root directory of the project')
    parser.add_argument('-o', '--output', type=str, default='project_contents.txt', help='Output file name')
    return parser.parse_args()


def is_binary(file_path):
    try:
        with open(file_path, 'rb') as file:
            chunk = file.read(1024)
            if b'\0' in chunk:
                return True
            text_chars = bytearray({7, 8, 9, 10, 12, 13, 27} | set(range(0x20, 0x100)))
            return not all(c in text_chars for c in chunk)
    except Exception as e:
        return True  # Treat unreadable files as binary

def should_exclude_file(file_path):
    # Exclude based on extension
    if file_path.suffix.lower() in EXCLUDED_EXTENSIONS:
        return True
    # Exclude specific files
    if file_path.name.lower() in EXCLUDED_FILES:
        return True
    # Exclude binary files
    if is_binary(file_path):
        return True
    return False

def traverse_directory(root_dir):
    collected_files = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Exclude unwanted directories
        dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS]
        for filename in filenames:
            file_path = Path(dirpath) / filename
            # Check if the file should be excluded
            if not should_exclude_file(file_path):
                collected_files.append(file_path)
    return collected_files


def process_files(collected_files, output_file, root_dir):
    with open(output_file, 'w', encoding='utf-8') as out_f:
        for file_path in collected_files:
            relative_path = file_path.relative_to(root_dir)
            header = f"\n{'='*20} {relative_path} {'='*20}\n"
            out_f.write(header)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as in_f:
                    content = in_f.read()
                    out_f.write(content)
            except Exception as e:
                out_f.write(f"Could not read file: {e}\n")
                print(f"Error reading file {file_path}: {e}")


def main():
    args = parse_arguments()
    root_dir = Path(args.directory).resolve()
    output_file = args.output
    collected_files = traverse_directory(root_dir)
    process_files(collected_files, output_file, root_dir)
    print(f"Project contents have been written to '{output_file}'")


if __name__ == '__main__':
    main()


# Run the script with the following command
# python script.py -d . -o project_content.txt
