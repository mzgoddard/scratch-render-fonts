// Synchronously load TTF fonts.
// First, have Webpack load their data as Base 64 strings.
/* eslint-disable global-require */
const FONTS = {
    'Sans Serif': require('base64-loader!./NotoSans-Medium.ttf'),
    'Serif': require('base64-loader!./SourceSerifPro-Regular.otf'),
    'Handwriting': require('base64-loader!./handlee-regular.ttf'),
    'Marker': require('base64-loader!./knewave.ttf'),
    'Curly': require('base64-loader!./Griffy-Regular.ttf'),
    'Pixel': require('base64-loader!./Grand9K-Pixel.ttf'),
    'Scratch': require('base64-loader!./Scratch.ttf')
};
/* eslint-enable global-require */

// For each Base 64 string,
// 1. Replace each with a usable @font-face tag that points to a Data URI.
// 2. Inject the font into a style on `document.body`, so measurements
//    can be accurately taken in SvgRenderer._transformMeasurements.
// for (const fontName in FONTS) {
//     const fontData = FONTS[fontName];
//     const base64Uri = `data:application/x-font-ttf;charset=utf-8;base64,${fontData}`;
//
//     // const binaryStr = atob(fontData);
//     // const binary = new Uint8Array(binaryStr.length);
//     // for (let i = 0; i < binaryStr.length; i++) {
//     //     binary[i] = binaryStr.charCodeAt(i);
//     // }
//     // const binary = new Uint8Array(Array.from(atob(fontData), char => char.charCodeAt(0)));
//     // const blobUrl = URL.createObjectURL(new Blob([binary], {type: 'application/x-font-ttf'}));
//     const blobUrl = URL.createObjectURL(new Blob([fontData], {type: 'application/x-font-tff;base64'}));
//
//     FONTS[fontName] = '@font-face {' +
//         `font-family: "${fontName}";src: url("${blobUrl}");}`;
// }

if (!document.getElementById('scratch-font-styles')) {
	const documentStyleTag = document.createElement('style');
	documentStyleTag.id = 'scratch-font-styles';
	for (const fontName in FONTS) {
        // documentStyleTag.textContent += FONTS[fontName];
        const fontData = FONTS[fontName];
        documentStyleTag.textContent += '@font-face {' +
        `font-family: "${fontName}";src: url("data:application/x-font-ttf;charset=utf-8;base64,${fontData}");}`;
	}
	document.body.insertBefore(documentStyleTag, document.body.firstChild);
}

for (const fontName in FONTS) {
    const fontData = FONTS[fontName];
    const base64Uri = `data:application/x-font-ttf;charset=utf-8;base64,${fontData}`;

    // const binaryStr = atob(fontData);
    // const binary = new Uint8Array(binaryStr.length);
    // for (let i = 0; i < binaryStr.length; i++) {
    //     binary[i] = binaryStr.charCodeAt(i);
    // }
    // const binary = new Uint8Array(Array.from(atob(fontData), char => char.charCodeAt(0)));
    // const blobUrl = URL.createObjectURL(new Blob([binary], {type: 'application/x-font-ttf'}));
    const blobUrl = URL.createObjectURL(new Blob([fontData], {type: 'application/x-font-tff;base64'}));

    FONTS[fontName] = '@font-face {' +
        `font-family: "${fontName}";src: url("${blobUrl}");}`;
}

module.exports = {
	FONTS: FONTS
};
