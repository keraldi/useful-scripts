# convert all .png to .webp using ImageMagick

Get-ChildItem '.\' -Filter *.png | ForEach-Object {
	magick convert $_.FullName "$($_.BaseName).webp"
} 