#!/usr/bin/env python3
import asyncio
from playwright.async_api import async_playwright
import os
import json
from datetime import datetime
from pathlib import Path

BASE_URL = 'file:///c:/Users/ojuli/MELHORES%20CURSOS'
SCREENSHOTS_DIR = Path(r'C:\Users\ojuli\MELHORES CURSOS\test-screenshots')
REPORTS_DIR = Path(r'C:\Users\ojuli\MELHORES CURSOS\test-reports')

SCREENSHOTS_DIR.mkdir(exist_ok=True, parents=True)
REPORTS_DIR.mkdir(exist_ok=True, parents=True)

PAGES_TO_TEST = [
    {'name': 'HOME', 'path': '/', 'file': 'index.html'},
    {'name': 'SOBRE', 'path': '/sobre.html', 'file': 'sobre.html'},
    {'name': 'POLÍTICA DE PRIVACIDADE', 'path': '/politica-privacidade.html', 'file': 'politica-privacidade.html'},
    {'name': 'TERMOS DE USO', 'path': '/termos-de-uso.html', 'file': 'termos-de-uso.html'},
    {'name': 'UNIVERSIDADES', 'path': '/pages/universidades/', 'file': 'pages/universidades/index.html'},
    {'name': 'ANHANGUERA', 'path': '/pages/universidades/anhanguera.html', 'file': 'pages/universidades/anhanguera.html'},
    {'name': 'UNOPAR', 'path': '/pages/universidades/unopar.html', 'file': 'pages/universidades/unopar.html'},
    {'name': 'UNIME', 'path': '/pages/universidades/unime.html', 'file': 'pages/universidades/unime.html'},
    {'name': 'UNIC', 'path': '/pages/universidades/unic.html', 'file': 'pages/universidades/unic.html'},
    {'name': 'PITAGORAS', 'path': '/pages/universidades/pitagoras.html', 'file': 'pages/universidades/pitagoras.html'},
    {'name': 'UNIDERP', 'path': '/pages/universidades/uniderp.html', 'file': 'pages/universidades/uniderp.html'},
    {'name': 'AMPLI', 'path': '/pages/universidades/ampli.html', 'file': 'pages/universidades/ampli.html'},
    {'name': 'GRADUAÇÃO', 'path': '/pages/graduacao/', 'file': 'pages/graduacao/index.html'},
    {'name': 'POS-GRADUACAO', 'path': '/pages/pos-graduacao/', 'file': 'pages/pos-graduacao/index.html'},
    {'name': 'CARREIRAS-SALARIOS', 'path': '/pages/carreiras/salarios/', 'file': 'pages/carreiras/salarios/index.html'},
]

results = []

async def check_images(page):
    errors = []
    try:
        images = await page.query_selector_all('img')
        for img in images:
            src = await img.get_attribute('src') or 'sem src'
            alt = await img.get_attribute('alt') or 'sem alt'

            complete = await img.evaluate('img => img.complete')
            naturalWidth = await img.evaluate('img => img.naturalWidth')

            if not complete or naturalWidth == 0:
                errors.append(f'Imagem nao carregada: {src}')
    except Exception as e:
        pass

    return errors

async def check_layout(page):
    errors = []
    try:
        overflow = await page.evaluate('() => document.documentElement.scrollWidth > window.innerWidth')
        if overflow:
            errors.append('Layout quebrado: overflow horizontal')
    except:
        pass
    return errors

async def check_logo(page):
    errors = []
    try:
        logos = await page.query_selector_all('img[class*="logo"]')
        for logo in logos:
            src = await logo.get_attribute('src') or 'sem src'
            complete = await logo.evaluate('img => img.complete')
            if not complete:
                errors.append(f'Logo nao carregada: {src}')
    except:
        pass
    return errors

async def take_screenshot(page, page_name, index):
    try:
        filename = f"{str(index).zfill(2)}-{page_name.replace(' ', '-').lower()}.png"
        filepath = SCREENSHOTS_DIR / filename
        await page.screenshot(path=str(filepath), full_page=True)
        return str(filepath)
    except:
        return None

async def run_tests():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1920, 'height': 1080})

        print('\n' + '='*80)
        print('TESTE VISUAL - PORTAL MELHORES CURSOS')
        print('='*80 + '\n')

        for i, page_config in enumerate(PAGES_TO_TEST, 1):
            page = await context.new_page()

            try:
                url = f"{BASE_URL}{page_config['path']}"
                print(f"[{i}/{len(PAGES_TO_TEST)}] {page_config['name']}")

                try:
                    await page.goto(url, wait_until='networkidle')
                except:
                    pass

                await page.wait_for_timeout(1000)

                errors = []
                errors.extend(await check_images(page))
                errors.extend(await check_layout(page))
                errors.extend(await check_logo(page))

                screenshot_path = await take_screenshot(page, page_config['name'], i)

                result = {
                    'index': i,
                    'page': page_config['name'],
                    'url': url,
                    'file': page_config['file'],
                    'screenshot': screenshot_path,
                    'errors': errors,
                }

                results.append(result)

                if errors:
                    print(f"  Erros: {len(errors)}")
                    for e in errors[:3]:
                        print(f"    - {e}")
                else:
                    print("  OK")

            except Exception as error:
                print(f"  Erro: {str(error)[:50]}")
                results.append({
                    'index': i,
                    'page': page_config['name'],
                    'url': f"{BASE_URL}{page_config['path']}",
                    'file': page_config['file'],
                    'screenshot': None,
                    'errors': [f'Erro: {str(error)[:100]}'],
                })
            finally:
                await page.close()

        await context.close()
        await browser.close()

    json_path = REPORTS_DIR / 'relatorio-visual.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f'\nRelatorio salvo em: {json_path}')

asyncio.run(run_tests())
