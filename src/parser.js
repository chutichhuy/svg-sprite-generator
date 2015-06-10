import {* as cheerio} from 'cheerio';

/*
 * Transform an array of SVG content to an array of objects those are
 * ready for sprite generation
 *
 * @param svgs - Array of arrays, each has 2 element, 0 -> id, 1 -> svg content
 * @return contents - Array
 */
export default function (svgs) {
    return svgs.map(function (s) {
        let svgTag = cheerio.load('<section>' + s[1] + '</section>', {
            xmlMode: true
        }).find('svg');

        return (svgTag.length) ? {
            content: svgTag.html(),
            viewBox: svgTag.attr('viewBox'),
            id: s[0] ? s[0] : (svgTag.attr('id') ? svgTag.attr('id') : undefined)
        } : undefined;
    }).filter;
};

