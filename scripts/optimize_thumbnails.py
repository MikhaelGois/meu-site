#!/usr/bin/env python3
"""Optimize thumbnail PNG files for faster loading"""

from PIL import Image
import os
from pathlib import Path

PROJECTS = [
    'calculator', 'quiz-app', 'rock-paper-scissors', 'note-app', 'stopwatch',
    'qr-reader', 'weather-app', 'ecommerce', 'landing-page', 'password-generator',
    'tic-tac-toe', 'link-shortener', 'portfolio', 'drawing-app', 'food-order',
    'meme-generator', 'movie-app', 'chat-app', 'twitter-clone', 'survey-app',
    'ebook-site', 'instagram-clone', 'whatsapp-clone', 'netflix-clone', 'file-sharing',
    'parallax-website', 'job-search', 'pinterest-clone', 'dating-app', 'social-media-dashboard',
    'tracker-app', 'memory-game', 'giphy-clone', 'user-activity-tracker', 'stock-trading',
    'chess-game', 'music-player', 'todo-list', 'random-user-api', 'typing-speed-test'
]

BASE_DIR = Path(__file__).parent.parent / 'projects'

def optimize_thumbnail(folder):
    """Optimize thumbnail PNG - reduce file size while maintaining quality"""
    thumb_path = BASE_DIR / folder / 'thumb.png'
    
    if not thumb_path.exists():
        print(f"⚠️  {folder}/thumb.png não encontrado")
        return False
    
    try:
        # Open image
        img = Image.open(thumb_path)
        
        # Get original size
        original_size = thumb_path.stat().st_size / 1024  # KB
        
        # Optimize: reduce colors, compress better
        # Convert to RGB if needed (remove alpha if not necessary)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Keep RGBA for images with transparency
            pass
        else:
            img = img.convert('RGB')
        
        # Save with optimization
        img.save(
            thumb_path,
            'PNG',
            optimize=True,
            quality=85
        )
        
        # Get new size
        new_size = thumb_path.stat().st_size / 1024  # KB
        reduction = (1 - new_size / original_size) * 100 if original_size > 0 else 0
        
        print(f"✅ {folder:30} | {original_size:7.1f}KB → {new_size:7.1f}KB ({reduction:5.1f}% menor)")
        return True
        
    except Exception as e:
        print(f"❌ {folder}: {e}")
        return False

def main():
    print("🖼️  Otimizando thumbnails PNG...\n")
    
    success = 0
    failed = 0
    
    for project in PROJECTS:
        if optimize_thumbnail(project):
            success += 1
        else:
            failed += 1
    
    print(f"\n✨ Concluído!")
    print(f"✅ Otimizados: {success}")
    print(f"❌ Falhas: {failed}")

if __name__ == '__main__':
    main()
