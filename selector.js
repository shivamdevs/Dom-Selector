/*
    Package: Dom-Selector
    Version: 2.0.0
    Author: Shivam Dewangan https://github.com/shivamdevs
    License: MIT License
*/

(function (context, name, enableSelector) {
    const style = document.createElement("style");
    style.setAttribute("DomSelector", "");
    style.setAttribute("type", "text/css");
    style.innerHTML = `
        dom-selector,
        dom-selector * {
            box-sizing: border-box;
            display: block;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        dom-selector {
            z-index: 999999999999999999;
            position: fixed;
            top: 0;
            left: 0;
            width: 40px;
            height: 40px;
            background: #1e90ff77;
            border-style: solid;
            border-color: #ff8c0099;
            --bt: 1px;
            --br: 1px;
            --bb: 1px;
            --bl: 1px;
            --mt: 0px;
            --mr: 0px;
            --mb: 0px;
            --ml: 0px;
            --pt: 0px;
            --pr: 0px;
            --pb: 0px;
            --pl: 0px;
        }
        dom-selector:not(.surfing) {
            display: none;
        }
        dom-selector {
            border-width: var(--bt) var(--br) var(--bb) var(--bl);
        }
        dom-selector::before {
            box-sizing: content-box;
            content: " ";
            position: absolute;
            top: calc(0px - var(--mt) - var(--bt));
            right: calc(0px - var(--mr) - var(--br));
            bottom: calc(0px - var(--mb) - var(--bb));
            left: calc(0px - var(--ml) - var(--bl));
            border: 0 solid #ff8c0055;
            border-width: var(--mt) var(--mr) var(--mb) var(--ml);
        }
        dom-selector::after {
            box-sizing: content-box;
            content: " ";
            inset: 0;
            position: absolute;
            border: 0 solid #20c02077;
            border-width: var(--pt) var(--pr) var(--pb) var(--pl);
        }
        dom-selector-data {
            z-index: 1;
            display: flex;
            align-items: baseline;
            flex-wrap: nowrap;
            position: absolute;
            inset: 0 auto auto 0;
            margin: 6px;
            background: #fff;
            overflow: hidden;
            box-shadow: 2px 2px 4px 2px #0002, 0 0 0 1px #0001;
            border-radius: 6px;
            max-width: 340px;
            padding: 6px 6px 6px 18px;
        }
        dom-selector-closer {
            display: inline-flex;
            justify-content: center;
            align-items: stretch;
            float: right;
            width: 18px;
            height: 18px;
            font-size: 16px;
            line-height: 14px;
            font-weight: 700;
            color: red;
            box-shadow: 0 0 0 1px red;
            border-radius: 10px;
            user-select: none;
            cursor: pointer;
        }
        dom-selector:not(.selected) {
            user-select: none;
        }
        dom-selector:not(.selected) dom-selector-closer {
            display: none;
        }
        dom-selector-info {
            color: #727888;
            font-size: 14px;
            font-weight: 500;
            padding-right: 12px;
            flex: 1;
            max-width: 300px;
        }
        dom-selector-info span {
            display: inline-block;
        }
        dom-selector-info span[node] {
            color: purple;
        }
        dom-selector-info span[class] {
            color: #00f;
        }
        dom-selector-info span[id] {
            color: #ff8c00;
        }
        dom-selector-info span[display] {
            color: brown;
            padding-left: 10px;
        }
        dom-selector-info > div {
            display: block;
            margin: 5px auto;
            font-size: 12px;
        }
        dom-selector-info div[dimension]:not(:last-child) {
            border-bottom: 1px solid #0002;
            padding-bottom: 5px;
        }
        dom-selector-info span[padding] {
            color: green;
            font-size: 12px;
        }
        dom-selector-info span[margin] {
            color: orange;
            font-size: 12px;
        }
        dom-selector-info div[border] {
            color: #1e90ff;
        }
        dom-selector-info div[styling] {
            font-weight: 700;
            display: flex;
            align-items: center;
        }
        dom-selector-info div[styling] > span {
            min-width: 14px;
            min-height: 14px;
            border: 1px solid #0005;
        }
        dom-selector-data.setbelow {
            top: 100%;
        }
        dom-selector-data.fromright {
            right: 0;
            left: auto;
        }
        dom-selector-data.outside {
            translate: 0 calc(-100% - 15px);
        }
        dom-selector-data.setbelow {
            translate: 5px;
        }
        dom-selector-data.scrollable {
            position: fixed;
            top: 0;
            left: inherit;
            right: inherit;
        }
    `;
    document.head.appendChild(style);

    const wrap = document.createElement('dom-selector');
    const data = document.createElement('dom-selector-data');
    const closer = document.createElement('dom-selector-closer');
    const info = document.createElement('dom-selector-info');

    wrap.classList.add('inactive');
    closer.innerHTML = '×';
    closer.addEventListener('click', reset);
    data.appendChild(info);
    data.appendChild(closer);
    wrap.appendChild(data);
    document.body.appendChild(wrap);

    window.addEventListener('mouseover', function(e) {
        if (wrap.classList.contains('inactive') || wrap.classList.contains('selected')) return;
        wrap.classList.add('surfing');
    });
    window.addEventListener('mouseout', function (e) {
        if (wrap.classList.contains('inactive') || wrap.classList.contains('selected')) return;
        wrap.classList.remove('surfing');
    });
    window.addEventListener('mousemove', mapE);
    window.addEventListener('scroll', mapE);

    const history = {x:0,y:0};

    function mapE(e) {
        if (wrap.classList.contains('inactive') || wrap.classList.contains('selected')) return;
        wrap.classList.remove('surfing');
        info.innerHTML = '';
        data.removeAttribute('class');
        if (e.type && e.type === 'scroll') e.clientX = history.x, e.clientY = history.y; else history.x = e.clientX, history.y = e.clientY;
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        setStyle(element);

        info.innerHTML = `<span node>${element.nodeName.toLowerCase()}</span>`;
        if (element.classList.value || element.classList.length) info.innerHTML += element.classList.value.replace(/  +/g, ' ').split(" ").reduce((acc, cls) => cls && (acc += '<span class>.' + cls + '</span>'), '');
        if (element.id || element.getAttribute("id")) info.innerHTML += `<span id>#${element.id || element.getAttribute("id")}</span>`;
        info.innerHTML += `<div dimension>${parse(rect.width)}×${parse(rect.height)}${style.display !== 'block' ? `<span display>${style.display}</span>` : ''}</div>`;
        info.innerHTML += `<div styling>Bg:&nbsp;<span style="background: ${style.backgroundColor}" title="${style.backgroundColor}"></span>&nbsp;&nbsp;Color:&nbsp;<span style="background: ${style.color}" title="${style.color}"></span></div>`;
        if (style.padding && style.padding !== '0px') info.innerHTML += `<span padding>${style.padding}</span>`;
        if (style.margin && style.margin !== '0px') info.innerHTML += `${style.padding && style.padding !== '0px' ? '&nbsp;&nbsp;' : ''}<span margin>${style.margin}</span>`;
        if (style.border && style.borderWidth !== '0px' && style.borderStyle !== 'none') info.innerHTML += `<div border>${style.border}</div>`;
        wrap.classList.add('surfing');

        setPosition();
    }

    function setStyle(node) {
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        wrap.style.top = rect.top + 'px';
        wrap.style.left = rect.left + 'px';
        wrap.style.width = rect.width + 'px';
        wrap.style.height = rect.height + 'px';
        wrap.style.setProperty('--bt', parseInt(style.borderTopWidth, 10) >= 0 ? style.borderTopWidth : '0px');
        wrap.style.setProperty('--br', parseInt(style.borderRightWidth, 10) >= 0 ? style.borderRightWidth : '0px');
        wrap.style.setProperty('--bb', parseInt(style.borderBottomWidth, 10) >= 0 ? style.borderBottomWidth : '0px');
        wrap.style.setProperty('--bl', parseInt(style.borderLeftWidth, 10) >= 0 ? style.borderLeftWidth : '0px');
        wrap.style.setProperty('--mt', (parseInt(style.marginTop, 10) >= 0 ? style.marginTop : '0px'));
        wrap.style.setProperty('--mr', (parseInt(style.marginRight, 10) >= 0 ? style.marginRight : '0px'));
        wrap.style.setProperty('--mb', (parseInt(style.marginBottom, 10) >= 0 ? style.marginBottom : '0px'));
        wrap.style.setProperty('--ml', (parseInt(style.marginLeft, 10) >= 0 ? style.marginLeft : '0px'));
        wrap.style.setProperty('--pt', (parseInt(style.paddingTop, 10) >= 0 ? style.paddingTop : '0px'));
        wrap.style.setProperty('--pr', (parseInt(style.paddingRight, 10) >= 0 ? style.paddingRight : '0px'));
        wrap.style.setProperty('--pb', (parseInt(style.paddingBottom, 10) >= 0 ? style.paddingBottom : '0px'));
        wrap.style.setProperty('--pl', (parseInt(style.paddingLeft, 10) >= 0 ? style.paddingLeft : '0px'));
    }

    function setPosition() {
        const rect = () => data.getBoundingClientRect();
        const sect = () => wrap.getBoundingClientRect();
        if (rect().height + 20 > sect().height) data.classList.add('outside');
        if (rect().left + rect().width + 15 > context.innerWidth) data.classList.add('fromright');
        if (rect().top - 6 < 0) data.classList.add('setbelow');
        if (rect().top + rect().height + 15 > context.innerHeight) data.classList.add('scrollable');
    }

    function parse(num) {
        const countDecimals = function (n) {
            if (Math.floor(n.valueOf()) === n.valueOf()) return 0;
            return n.toString().split(".")[1].length || 0;
        }
        num = parseFloat(num);
        if (countDecimals(num) > 2) {
            num = parseFloat(num.toFixed(2));
            if (num == parseFloat(num.toFixed(1))) num = parseFloat(num.toFixed(1));
        }
        return num;
    }

    function reset() {
        wrap.removeAttribute("class");
        wrap.classList.add('inactive');
        data.removeAttribute('class');
        info.innerHTML = '';
        wrap.removeAttribute("style");
    }

    context[name] = function (showPreview = false) {
        return new Promise((resolve, reject) => {
            if (!wrap.classList.contains('inactive') || wrap.classList.contains('selected')) reject('Error: Another instance of \'DomSelector\' is already running. Finish it before starting another one.');
            wrap.classList.remove('inactive');
            window.addEventListener('mousedown', function (e) {
                if (wrap.classList.contains('inactive')) reject('Error: Another instance of \'DomSelector\' is already running. Finish it before starting another one.');
                if (showPreview) wrap.classList.add('selected');
                wrap.classList.remove('surfing');
                const selected = document.elementFromPoint(e.clientX, e.clientY);
                if (showPreview) wrap.classList.add('surfing'); else reset();
                if (selected) resolve(selected); else reject('Error: Failed to find the Selected element. Try to fetch again.');
            }, {once: true});
        });
    };
}(window, 'DomSelector', true));