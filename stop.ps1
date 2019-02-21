# get Firefox process
$name = "node"
$ps = Get-Process $name -ErrorAction SilentlyContinue
$t
if ($ps) {
  # try gracefully first
    $t = $($ps.CloseMainWindow())
    # kill after five seconds
    Start-Sleep 1
    if (!$ps.HasExited) {
      $ps | Stop-Process -Force
    }
  # $ps | Stop-Process -Force
}