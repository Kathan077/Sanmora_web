$root = 'e:\Sanmora_web\Sanmora_web\Sanmora_web\frontend-sanmora'
$cssFiles = Get-ChildItem -Path $root -Recurse -Include '*.css' |
    Where-Object { $_.FullName -notlike '*node_modules*' -and $_.FullName -notlike '*.next*' }

foreach ($file in $cssFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content

    # ── body font replacements ─────────────────────────────────────
    # System stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
    $content = $content -replace "font-family:\s*-apple-system,\s*BlinkMacSystemFont,\s*[`"']Segoe UI[`"'],\s*Roboto,\s*Helvetica,\s*Arial,\s*sans-serif;", "font-family: var(--font-body);"

    # 'Inter', system-ui, sans-serif
    $content = $content -replace "font-family:\s*'Inter',\s*system-ui,\s*sans-serif;", "font-family: var(--font-body);"

    # 'Inter', sans-serif
    $content = $content -replace "font-family:\s*'Inter',\s*sans-serif;", "font-family: var(--font-body);"

    # ── heading font replacements ──────────────────────────────────
    # 'Space Grotesk', 'Inter', sans-serif
    $content = $content -replace "font-family:\s*'Space Grotesk',\s*'Inter',\s*sans-serif;", "font-family: var(--font-heading);"

    # 'Space Grotesk', sans-serif
    $content = $content -replace "font-family:\s*'Space Grotesk',\s*sans-serif;", "font-family: var(--font-heading);"

    # 'Space Grotesk', monospace  (OurTeam was wrongly using monospace)
    $content = $content -replace "font-family:\s*'Space Grotesk',\s*monospace;", "font-family: var(--font-heading);"

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "All done."
