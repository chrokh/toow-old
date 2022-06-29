all: clean html

html:
	 jb build .

clean:
	jb clean . --all

