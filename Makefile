html:
	pandoc -s --toc index.md -o docs/index.html

pdf:
	pandoc --pdf-engine=xelatex --toc index.md -o docs/TOOW.pdf

all: html pdf

