# Tiny local web server for testing the widget at http://localhost:8000/test.html
# Run:  powershell -ExecutionPolicy Bypass -File serve.ps1     (Ctrl+C to stop)
param([int]$Port = 8000)

$root = $PSScriptRoot
$types = @{ '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'; '.css' = 'text/css'
            '.json' = 'application/json'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.svg' = 'image/svg+xml' }

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/test.html  (Ctrl+C to stop)"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $res = $ctx.Response
    try {
      $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
      if (-not $path) { $path = 'test.html' }
      $file = [IO.Path]::GetFullPath((Join-Path $root $path))
      if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
        $bytes = [IO.File]::ReadAllBytes($file)
        $ext = [IO.Path]::GetExtension($file).ToLower()
        $res.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
        $res.Headers.Add('Cache-Control', 'no-store')
        $res.ContentLength64 = $bytes.Length
        if ($ctx.Request.HttpMethod -ne 'HEAD') { $res.OutputStream.Write($bytes, 0, $bytes.Length) }
      } else {
        $res.StatusCode = 404
      }
      Write-Host "$($ctx.Request.HttpMethod) /$path -> $($res.StatusCode)"
    } catch {
      Write-Host "Error serving request: $_"
    } finally {
      $res.Close()
    }
  }
} finally {
  $listener.Stop()
}
