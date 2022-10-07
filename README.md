# Dom Selector

## Version: 1.1.0

Get `NodeName`, `classList`, and `id` alongwith `width`, `height`, `display`, `padding`, `margin` and `border` of elements without opening Console.

## Installation

**Dom Selector** can be loaded to any websites by placing any one of these codes on the `head` of the document.

```html
<!-- Use Development CDN -->
<script src="https://cdn.jsdelivr.net/gh/shivamdevs/dom-selector@latest/selector.js" defer></script>
<!-- or Use Production CDN -->
<script src="https://cdn.jsdelivr.net/gh/shivamdevs/dom-selector@latest/selector.min.js" defer></script>
```

> Adding `defer` can help delay **Dom-Selector** loading, preventing it from increasing page load time.

## Usage

### Implementation

`DomSelector` can be called as a `Promise`.

```javascript
// Call Dom-Selector
DomSelector(); // returns Promise

// Or use top level async await function
async function selector() {
    const element = await DomSelector();
}

// Optionally it takes only one boolean parameter
DomSelector(true); //This keeps the selection on the page until user closes it.
```

> Name of the function `DomSelector` can be changed on the script file on local downloaded files.

### Options

An optional `boolean` parameter `showPreview` can be passed to keep selection in view until user closes it.

```javascript
DomSelector(showPreview); // boolean value true|false
```

### Auto Select

An `autoSelect` function can be called to show a start icon on the document by default.

```javascript
DomSelector.autoSelect(showPreview); // returns :void
```

## Limitation

* Restricted to top window only
* Can't distinguish between before and after pseudo-elements

## Contribution

* [@Shivamdevs](https://github.com/shivamdevs)
* [@shivamdewangan](https://github.com/shivamdewangan)
