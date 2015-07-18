# svg-sprite-generator

A SVG sprite generator. It takes a list of SVG files and make a single sprite file using ```<symbol>``` elements. 

Helpful for icon systems.

## Installation

This program need [Node.js](http://nodejs.org) to run. When Node is already in your system, use ```npm``` to install the generator:

```
npm install -g svg-sprite-generator
```

## Usage

### From a directory 
Generate sprite from a directory of SVG files

```
svg-sprite-generate -d path/to/directory/of/svg/files -o path/to/sprite.svg
```

### From a list of SVG files
Or specify SVG files to generate from. File paths can be separated with a comma.

```
svg-sprite-generate -l path/to/file1.svg,path/to/file2.svg -o path/to/sprite.svg
```

### From a CSV file
Or use a CSV file. The first column contains symbol IDs, the second contains SVG file paths.

```csv
duo-alarm-clock, test/svg/duo-alarm-clock.svg
duo-bicycle, test/svg/duo-bicycle.svg
```
The command

```
svg-sprite-generate -c path/to/csv.csv -o path/to/sprite.svg
```

### From another sprite file

You can take another sprite file and generate a new one with some modification too.

```
svg-sprite-generate -s path/to/sprite.svg -l path/to/extra.svg,path/to/another-extra-one.svg -o new-sprite.svg
```

## License
MIT


