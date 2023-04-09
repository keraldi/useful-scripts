# convert all .pdf to .webp using ImageMagick - should only be used for single-page PDFs that contain rasterized images

Get-ChildItem '.\' -Filter *.pdf | ForEach-Object {
	magick convert -density 300 -trim $_.FullName -flatten -sharpen 0x1.0 "$($_.BaseName).webp"
} 
