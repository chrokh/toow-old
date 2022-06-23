all: clean html

html:
	 jb build . && cp index.html _build/html/chapters/index.html

clean:
	jb clean . --all

