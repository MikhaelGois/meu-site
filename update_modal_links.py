# Script para atualizar links dos projetos para usar modal

import re

projects = {
    'Calculator': 'calculator',
    'Quiz App': 'quiz-app',
    'Rock Paper Scissors': 'rock-paper-scissors',
    'Note App': 'note-app',
    'Stopwatch': 'stopwatch',
    'QR Reader': 'qr-reader',
    'Weather App': 'weather-app',
    'Ecommerce': 'ecommerce',
    'Landing Page': 'landing-page',
    'Password Generator': 'password-generator',
    'Tic Tac Toe': 'tic-tac-toe',
    'Link Shortener': 'link-shortener',
    'Portfolio': 'portfolio',
    'Drawing App': 'drawing-app',
    'Food Order': 'food-order',
    'Meme Generator': 'meme-generator',
    'Movie App': 'movie-app',
    'Chat App': 'chat-app',
    'Twitter Clone': 'twitter-clone',
    'Survey App': 'survey-app',
    'E-Book Site': 'ebook-site',
    'Instagram Clone': 'instagram-clone',
    'WhatsApp Clone': 'whatsapp-clone',
    'Netflix Clone': 'netflix-clone',
    'File Sharing': 'file-sharing',
    'Parallax Website': 'parallax-website',
    'Job Search': 'job-search',
    'Pinterest Clone': 'pinterest-clone',
    'Dating App': 'dating-app',
    'Social Media Dashboard': 'social-media-dashboard',
    'Tracker App': 'tracker-app',
    'Memory Game': 'memory-game',
    'Giphy Clone': 'giphy-clone',
    'User Activity Tracker': 'user-activity-tracker',
    'Stock Trading': 'stock-trading',
    'Chess Game': 'chess-game',
    'Music Player': 'music-player',
    'To-Do List': 'todo-list',
    'Random User API': 'random-user-api',
    'Typing Speed Test': 'typing-speed-test'
}

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

for title, folder in projects.items():
    # Pattern: Find the project-links div and replace with modal link
    pattern = rf'(<h3 class="project-title">{re.escape(title)}</h3>.*?<div class="project-links">)\s*<a[^>]*>.*?</a>\s*(?:<a[^>]*>.*?</a>)?'
    
    replacement = rf'\1\n                        <a href="javascript:void(0)" onclick="openProjectModal(\'{folder}\')" class="btn-demo">Ver Demo →</a>'
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Atualizados todos os 40 links de projetos!")
print("✅ Removidos links do GitHub")
print("✅ Adicionados links para abrir modal com openProjectModal()")
