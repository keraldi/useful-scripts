# Optimizes each PDF in the current folder in-place

Get-ChildItem . -Filter *.pdf | Foreach-Object {
	qpdf $_.FullName --recompress-flate --compression-level=9 --object-streams=generate --replace-input
}