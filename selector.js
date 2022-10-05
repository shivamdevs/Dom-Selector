/*
    Package: Dom-Selector
    Version: 1.0.1
    Author: Shivam Dewangan [https://github.com/Shivamdevs]
    License: MIT License
*/

(function () {
    function initCode() {
        const $ = window.Js;
        const selector = $.ce('dom-element-selector.hidden', $.ce('data-selector')).appendTo("body");
        const opter = $.ce('dom-element-selector-opter', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" fill="currentColor" height="20"><path xmlns="http://www.w3.org/2000/svg" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-48 0c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>`).appendTo("body").click(function (){
            $(this).toggleClass('opted');
            selector.toggleClass('hidden');
        });
        $(window).mouseover(function () {
            if (selector.hasClass('hidden')) return;
            selector.addClass('surfing');
        }).mouseout(function () {
            if (selector.hasClass('hidden')) return;
            selector.removeClass('surfing');
        }).mousemove(function (eve) {
            if (selector.hasClass('hidden')) return;
            selector.removeClass('surfing');
            selector.find('data-selector').removeClass('offset outset lowset stcset').empty();
            const doc = document.elementFromPoint(eve.clientX, eve.clientY);
            if (!doc) return;
            const rec = doc.getBoundingClientRect();
            selector.css({
                top: rec.top + 'px',
                left: rec.left + 'px',
                width: rec.width + 'px',
                height: rec.height + 'px',
            });
            let info = `<span class="node">${doc.nodeName.toLowerCase()}</span>`;
            if (doc.classList.value || doc.classList.length) info += doc.classList.value.replace(/  +/g, ' ').split(" ").reduce((acc, cls) => cls && (acc += '<span class="class">.' + cls +'</span>'),'');
            if (doc.id || doc.getAttribute("id")) info += `<span class="id">#${doc.id || doc.getAttribute("id")}</span>`;
            selector.find('data-selector').html(info);
            selector.addClass('surfing');
            if (selector.find('data-selector').height() + 100 > selector.height()) selector.find('data-selector').addClass('offset');
            let dta = selector.find('data-selector')[0].getBoundingClientRect();
            if ((dta.left + dta.width + 15) > window.innerWidth) selector.find('data-selector').addClass('outset');
            dta = selector.find('data-selector')[0].getBoundingClientRect();
            if ((dta.top - 6) < 0) selector.find('data-selector').addClass('lowset');
            dta = selector.find('data-selector')[0].getBoundingClientRect();
            console.log((dta.top + dta.height + 15) > window.innerHeight);
            if ((dta.top + dta.height + 15) > window.innerHeight) selector.find('data-selector').addClass('stcset');
        }).mousedown(function (eve) {
            if (selector.hasClass('hidden')) return;
            selector.toggleClass('surfing hidden');
            opter.removeClass('opted');
            console.log(document.elementFromPoint(eve.clientX, eve.clientY));
        }).mouseup(function () {
            if (selector.hasClass('hidden')) return;
            selector.addClass('surfing');
        });
        $.styleSheet(`dom-element-selector-opter{position:fixed;inset:auto 0 20px auto;background:#fff;padding:5px 10px;border-radius:20px 0 0 20px;box-shadow:-2px 2px 4px 2px #0002;border:1px solid #0004;z-index:9999999999999998;transition:all .2s ease;cursor:pointer;color:#000}dom-element-selector-opter:hover{color:#ff8c00}dom-element-selector-opter.opted{color:#00f;translate:calc(100% + 10px) 0}dom-element-selector,dom-element-selector *,dom-element-selector-opter{box-sizing:border-box;display:block;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}dom-element-selector{z-index:9999999999999999;position:fixed;top:0;left:0;width:40px;height:40px;background:#2a52be77;border:1px solid #2a52be}dom-element-selector.hidden,dom-element-selector:not(.surfing){display:none}dom-element-selector data-selector:not(:empty){display:flex;align-items:center;flex-wrap:wrap;position:absolute;inset:0 auto auto 0;font-size:14px;font-weight:500;background:#fff;color:#000;padding:6px 18px;margin:6px;box-shadow:2px 2px 4px 2px #0002;user-select:none;border-radius:6px;max-width:calc(100vw - 12px)}dom-element-selector data-selector,dom-element-selector data-selector:not(:empty)>span{white-space:nowrap}dom-element-selector data-selector.lowset{top:100%}dom-element-selector data-selector.outset{right:0;left:auto}dom-element-selector data-selector.offset{translate:0 calc(-100% - 15px)}dom-element-selector data-selector.lowset{translate:0 5px}dom-element-selector data-selector.stcset{position:fixed;top:0;left:inherit;right:inherit}dom-element-selector data-selector span.node{color:purple}dom-element-selector data-selector span.class{color:#00f}dom-element-selector data-selector span.id{color:#ff8c00}`, "head", '[pass-test]');
    }

    (function () {// load jscript for easier navigation
        if (window.Js) return initCode();
        const scr = document.createElement('script');
        scr.setAttribute('Pass-test', '');
        scr.onload = initCode;
        scr.src = "https://cdn.jsdelivr.net/gh/shivamdevs/jscript@3.0.0/jscript.js";
        document.head.appendChild(scr);
    }());
}());
