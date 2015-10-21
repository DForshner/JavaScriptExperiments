/** Generate hex color values for shades of red/yellow. */
var generateRedYellowPaletteColors = function (numShades) {
    var colors = []
    var step = 255 / (numShades - 1);
    for (var i = 0; i < numShades; ++i) {
        var color = toHexColorString(255, Math.floor(step * i), 30);
        colors.push(color);
    }
    return colors;
};

/** Converts from rgb values to hex color value.
* Ex: (0, 0, 0) => #000000
* Ex: (255, 255, 255) => #FFFFFF
* */
var toHexColorString = function (r, g, b) {
    var red = (r <= 0xF) ? '0' + r.toString(16) : r.toString(16);
    var green = (g <= 0xF) ? '0' + g.toString(16) : g.toString(16);
    var blue = (b <= 0xF) ? '0' + b.toString(16) : b.toString(16);
    return '#' + red + green + blue;
};

var colors = generateRedYellowPaletteColors(10);
console.log(colors);