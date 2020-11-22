https://joshwcomeau.com/css/css-variables-for-react-devs/  


https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript  

```js
render(){
  var style = { "--my-css-var": 10 } as React.CSSProperties;
  return <div style={style}>...</div>
}
```

You could add a type assertion to the variable. i.e. {['--css-variable' as any]: value }  
```js
<table style={{['--length' as any]: array.lenght}}>
   <tbody>
      <tr>{array}</tr>
   </tbody>
</table>
```

# JS access CSS variables
```js
//Getting a variable’s value
window
  .getComputedStyle(document.documentElement)
  .getPropertyValue("--color-surface");
//Setting a variable’s value
document
  .documentElement.style.setProperty("--color-surface", "black");
```

# :root?
```css
html {
  --color-text: black;
  --color-background: lightgray;
  --color-primary: rebeccapurple;
  --gutter: 16px;
}

:root {
  --color-text: black;
  --color-background: lightgray;
}
```
This is a fancy way to do the exact same thing; :root is a pseudo-class which points to the top-level HTML element.  


## If you want dashed classes in your projects, you can use bracket notation as below:
```html
<div className={style.panel-default}>
     <div className={style.panel-body}>A Basic Panel</div>
</div>
```
to
```html
<div className={style[panel-default]}>
     <div className={style[panel-body]}>A Basic Panel</div>
</div>
```

# The cascade
https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care  

Custom properties follow standard cascade rules, so you can define the same property at different levels of specificity
```css
:root { --color: blue; }
div { --color: green; }
#alert { --color: red; }
* { color: var(--color); }
```
```html
<p>I inherited blue from the root element!</p>
<div>I got green set directly on me!</div>
<div id="alert">
  While I got red set directly on me!
  <p>I’m red too, because of inheritance!</p>
</div>
```

# Custom property syntax
```css
--foo: if(x > 5) this.width = 10;
```

# Building values with calc()
```css
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px); /* niiiiice */
}
```

# Working with custom properties in JavaScript
```js
/* JS */
var styles = getComputedStyle(document.documentElement);
var value = String(styles.getPropertyValue('--primary-color')).trim();

/* JS */
document.documentElement.style.setProperty('--primary-color', 'green');
/* JS */
document.documentElement.style.setProperty('--primary-color', 'var(--secondary-color)');
```