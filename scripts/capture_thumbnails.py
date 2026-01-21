#!/usr/bin/env python3
"""
Script para capturar screenshots dos projetos e salvar como thumbnails
"""
import asyncio
import subprocess
import time
import sys
from pathlib import Path

# Lista de projetos (sincronizado com scripts/main.js)
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

BASE_URL = 'http://localhost:8000'
WORKSPACE_ROOT = Path(__file__).parent.parent


async def capture_screenshot(page, project_folder: str) -> bool:
    """Captura screenshot de um projeto"""
    project_path = WORKSPACE_ROOT / 'projects' / project_folder
    thumb_path = project_path / 'thumb.png'
    
    try:
        url = f'{BASE_URL}/projects/{project_folder}/'
        print(f'📸 Capturando {project_folder}...')
        
        # Navegar para o projeto
        await page.goto(url, wait_until='networkidle', timeout=15000)
        
        # Esperar um pouco para garantir que tudo carregou
        await page.wait_for_timeout(1000)
        
        # Tirar screenshot (300x200 para thumbnails)
        await page.set_viewport_size({'width': 1200, 'height': 800})
        await page.screenshot(path=str(thumb_path), clip={'x': 0, 'y': 0, 'width': 300, 'height': 200})
        
        print(f'✅ {project_folder} -> thumb.png')
        return True
        
    except Exception as e:
        print(f'❌ Erro ao capturar {project_folder}: {e}')
        return False


async def main():
    """Função principal"""
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        print('❌ Playwright não está instalado.')
        print('Instalando playwright...')
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'playwright'], check=True)
        subprocess.run([sys.executable, '-m', 'playwright', 'install', 'chromium'], check=True)
        from playwright.async_api import async_playwright
    
    print(f'🚀 Iniciando captura de thumbnails para {len(PROJECTS)} projetos...\n')
    
    # Verificar se o servidor está rodando
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', 8000))
    sock.close()
    
    if result != 0:
        print('❌ Servidor não está rodando na porta 8000.')
        print('Execute: python -m http.server 8000')
        return
    
    success_count = 0
    fail_count = 0
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1200, 'height': 800},
            device_scale_factor=2  # Retina quality
        )
        page = await context.new_page()
        
        for project in PROJECTS:
            if await capture_screenshot(page, project):
                success_count += 1
            else:
                fail_count += 1
        
        await browser.close()
    
    print(f'\n✨ Concluído!')
    print(f'✅ Sucesso: {success_count}')
    print(f'❌ Falhas: {fail_count}')


if __name__ == '__main__':
    asyncio.run(main())
