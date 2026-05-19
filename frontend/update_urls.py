import os
import re

directory = r'c:\Users\CHRISTIN JOHNY\Desktop\StudyAtGeorgia\frontend\src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            
            # Replace fetch calls
            new_content = re.sub(r'\"http://localhost:8000(/api/[^\"]*)\"', r'`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}\1`', new_content)
            
            # Replace image source URLs like `http://localhost:8000${content.nav_logo_img}`
            new_content = new_content.replace('`http://localhost:8000${', '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {filepath}')
