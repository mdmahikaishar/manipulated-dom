# Manipulated DOM

Document manupulation using vanila javascript.

## Get Started

Install `Manipulated DOM` to your project.

```bash
pnpm install manipulated-dom
```

## Examples

Import statement `Manipulated DOM`

```ts
import MDom form "manipulated-dom";
```

### Select

#### Select A Element Using Class

```ts
const $box = new MDom(".box");
```

#### Select A Element Using Id

```ts
const $box = new MDom("#box");
```

### Create

#### Create Element

```ts
const $box = MDom.create("box");
```

#### Create Text

```ts
const $name = MDom.createTxt("hello");
```

### Attribute

#### Set Attribute

```ts
$body.attr("hello", "world");
```

#### Set Multiple Attributes

```ts
$body.attr({ id: "001" });
```

#### Get Attribute Value

```ts
$body.attr("hello");
```

### Style Sheet

#### Set Style

```ts
$body.attr("width", "10rem");
```

#### Set Multiple Styles

```ts
$body.attr({ height: "15rem" });
```

#### Get Style Value

```ts
$body.attr("width");
```

### Vi

### Show A Element

```ts
$body.show();
```

### Hide A Element

```ts
$body.hide();
```

### Event Listener

```ts
const $button = MDom.create("button");
$button.on("click", () => console.log("Clicked"));
```

### Get Parent Parent

```ts
$box.parent();
```

### Remove Element

```ts
$box.remove();
```

### Replace Element

```ts
const $container = MDom.create("div");
$box.replace($container);
```

### Children

#### Add A Children

```ts
$body.child([document.createElement("div")]);
```

#### Add Multipe Childrens

```ts
$body.child([MDom.create("div"), $box]);
```

#### Get Childrens

```ts
$body.child();
```

### HTML

#### Get HTML

```ts
$body.html();
```

#### Set HTML

```ts
$body.html("<h1>Hello</h1>");
```

### Text

#### Get Text

```ts
$body.txt();
```

#### Set Text

```ts
$body.txt("Hello");
```
