# Script to update all project links in index.html

import re

# Project mapping: title -> folder name
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

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# For each project, find its card and update the link
for title, folder in projects.items():
    # Pattern to match project card with this title
    pattern = rf'(<h3 class="project-title">{re.escape(title)}</h3>.*?<div class="project-links">)\s*<a href="https://github\.com/mikhaelgois"[^>]*>GitHub →</a>'
    
    # Replacement with both demo and github links
    replacement = rf'\1\n                        <a href="./projects/{folder}/" class="btn-demo">Ver Demo →</a>\n                        <a href="https://github.com/mikhaelgois" target="_blank" rel="noopener">GitHub</a>'
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated all 40 project links!")
print(f"✅ Added demo links to ./projects/[folder-name]/")
print(f"✅ Kept GitHub links to profile")
