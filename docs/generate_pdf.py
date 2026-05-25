#!/usr/bin/env python3
"""
Generate a styled PDF from the Python & DSA Interview Guide markdown file.

Requirements:
    pip install markdown pdfkit
    sudo apt-get install wkhtmltopdf   # or brew install wkhtmltopdf on macOS

Usage:
    python docs/generate_pdf.py
"""

import os
import markdown
import pdfkit

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MD_PATH = os.path.join(SCRIPT_DIR, "python_dsa_interview_guide.md")
PDF_PATH = os.path.join(SCRIPT_DIR, "python_dsa_interview_guide.pdf")

CSS = """
<style>
    @page {
        size: A4;
        margin: 20mm 15mm 20mm 15mm;
    }
    body {
        font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        font-size: 11pt;
        line-height: 1.6;
        color: #1a1a1a;
        max-width: 100%;
    }
    h1 {
        color: #1a237e;
        border-bottom: 3px solid #1a237e;
        padding-bottom: 8px;
        margin-top: 40px;
        font-size: 24pt;
        page-break-before: always;
    }
    h1:first-of-type {
        page-break-before: avoid;
    }
    h2 {
        color: #283593;
        border-bottom: 1px solid #c5cae9;
        padding-bottom: 4px;
        margin-top: 30px;
        font-size: 18pt;
    }
    h3 {
        color: #3949ab;
        margin-top: 20px;
        font-size: 14pt;
    }
    h4 {
        color: #5c6bc0;
        margin-top: 15px;
        font-size: 12pt;
    }
    code {
        background-color: #f5f5f5;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: "Fira Code", "Consolas", "Monaco", monospace;
        font-size: 9.5pt;
        color: #c62828;
    }
    pre {
        background-color: #263238;
        color: #eeffff;
        padding: 14px 18px;
        border-radius: 6px;
        overflow-x: auto;
        font-size: 9pt;
        line-height: 1.45;
        page-break-inside: avoid;
    }
    pre code {
        background: none;
        color: #eeffff;
        padding: 0;
        font-size: 9pt;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 12px 0;
        font-size: 9.5pt;
        page-break-inside: avoid;
    }
    th {
        background-color: #1a237e;
        color: white;
        padding: 8px 10px;
        text-align: left;
        font-weight: 600;
    }
    td {
        padding: 6px 10px;
        border: 1px solid #e0e0e0;
    }
    tr:nth-child(even) {
        background-color: #f5f5f5;
    }
    blockquote {
        border-left: 4px solid #3949ab;
        margin: 16px 0;
        padding: 8px 16px;
        background-color: #e8eaf6;
        color: #1a237e;
        font-style: italic;
    }
    ul, ol {
        padding-left: 24px;
    }
    li {
        margin-bottom: 4px;
    }
    hr {
        border: none;
        border-top: 2px solid #c5cae9;
        margin: 30px 0;
    }
    a {
        color: #1565c0;
        text-decoration: none;
    }
    strong {
        color: #1a1a1a;
    }
    .toc a {
        color: #1a237e;
    }
</style>
"""


def main():
    print(f"Reading markdown from: {MD_PATH}")
    with open(MD_PATH, "r", encoding="utf-8") as f:
        md_content = f.read()

    print("Converting markdown to HTML...")
    extensions = ["tables", "fenced_code", "codehilite", "toc", "nl2br"]
    html_body = markdown.markdown(md_content, extensions=extensions)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {CSS}
</head>
<body>
{html_body}
</body>
</html>"""

    print(f"Generating PDF: {PDF_PATH}")
    options = {
        "page-size": "A4",
        "margin-top": "20mm",
        "margin-right": "15mm",
        "margin-bottom": "20mm",
        "margin-left": "15mm",
        "encoding": "UTF-8",
        "enable-local-file-access": "",
        "print-media-type": "",
        "no-outline": None,
        "footer-center": "[page]",
        "footer-font-size": "8",
    }

    pdfkit.from_string(html, PDF_PATH, options=options)
    file_size_mb = os.path.getsize(PDF_PATH) / (1024 * 1024)
    print(f"PDF generated successfully: {PDF_PATH} ({file_size_mb:.1f} MB)")


if __name__ == "__main__":
    main()
