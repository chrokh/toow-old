all: clean html

html:
	 jb build . && cp index.html _build/html/index.html

clean:
	jb clean . --all

