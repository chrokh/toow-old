html:
	pandoc -s --toc --toc-depth=2 index.md -o docs/index.html

pdf:
	pandoc --pdf-engine=xelatex --toc index.md -o docs/TOOW.pdf

all: html pdf

