#!/usr/bin/env python3
import os
import sys

def find_md_files(directory):
    """
    Рекурсивно находит все .md файлы в директории и поддиректориях.
    Возвращает список путей к найденным файлам.
    """
    md_files = []
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md') and file != 'INDEX.md':
                md_files.append(os.path.join(root, file))
    
    return sorted(md_files)  # Сортируем для предсказуемого порядка

def create_index_md(directory):
    """
    Создает INDEX.md файл, объединяя все найденные .md файлы.
    """
    md_files = find_md_files(directory)
    
    if not md_files:
        print(f"В директории {directory} не найдено .md файлов.")
        return False
    
    # Путь для создания INDEX.md
    index_path = os.path.join(directory, 'INDEX.md')
    
    print(f"Найдено {len(md_files)} .md файлов. Создаю {index_path}...")
    
    with open(index_path, 'w', encoding='utf-8') as index_file:
        # Добавляем заголовок
        index_file.write(f"# INDEX для {os.path.abspath(directory)}\n\n")
        index_file.write(f"Этот файл содержит объединенное содержимое {len(md_files)} markdown файлов.\n\n")
        
        # Проходим по всем найденным файлам
        for md_file_path in md_files:
            rel_path = os.path.relpath(md_file_path, directory)
            index_file.write(f"\n## Файл: {rel_path}\n\n")
            
            try:
                with open(md_file_path, 'r', encoding='utf-8') as md_file:
                    content = md_file.read()
                    index_file.write(content)
                    # Добавляем разделитель между файлами
                    index_file.write("\n\n---\n\n")
            except Exception as e:
                index_file.write(f"Ошибка при чтении файла: {str(e)}\n\n")
    
    print(f"INDEX.md успешно создан в {index_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        directory = sys.argv[1]
    else:
        directory = os.getcwd()  # Если директория не указана, используем текущую
    
    if not os.path.isdir(directory):
        print(f"Ошибка: {directory} не является директорией.")
        sys.exit(1)
    
    if create_index_md(directory):
        print("Работа скрипта завершена успешно.")
    else:
        print("Произошла ошибка при создании INDEX.md.")
        sys.exit(1)