cd stalci-backend
Write-Host "Starting NestJS API Server..."
Start-Process -FilePath "npm" -ArgumentList "run", "start" -NoNewWindow -PassThru -RedirectStandardOutput "server.log" -RedirectStandardError "server_err.log" | Set-Variable -Name ServerProc

Start-Sleep -Seconds 10 # Wait for NestJS to boot up

Write-Host "
--- TESTING CMS API (Pages) ---"
try {
    $pages = Invoke-RestMethod -Uri "http://localhost:3000/cms/pages" -Method Get
    Write-Host "Fetched $($pages.Count) pages successfully!"
    Write-Host $pages[0] | ConvertTo-Json -Depth 2
} catch {
    Write-Host "CMS API Failed: $($_.Exception.Message)"
}

Write-Host "
--- TESTING CRM API (Jobs) ---"
try {
    $jobs = Invoke-RestMethod -Uri "http://localhost:3000/crm/jobs" -Method Get
    Write-Host "Fetched $($jobs.Count) jobs successfully!"
    Write-Host $jobs[0] | ConvertTo-Json -Depth 2
} catch {
    Write-Host "CRM API Failed: $($_.Exception.Message)"
}

Write-Host "
--- TESTING FINANCE API (Invoices) ---"
try {
    $invoices = Invoke-RestMethod -Uri "http://localhost:3000/finance/invoices" -Method Get
    Write-Host "Fetched $($invoices.Count) invoices successfully!"
    Write-Host $invoices[0] | ConvertTo-Json -Depth 2
} catch {
    Write-Host "Finance API Failed: $($_.Exception.Message)"
}

Write-Host "
Stopping server..."
Stop-Process -Id $ServerProc.Id -Force
