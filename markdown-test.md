---
title: "Markdown Renderer Test Suite"
description: "Comprehensive test of all markdown features"
tags: ["test", "markdown", "features"]
---

# Markdown Renderer Test Suite

This document tests all the markdown features mentioned in the comprehensive checklist.

---

## ✅ **Core Capabilities**

### 1. **Text Formatting**

**Bold text using double asterisks**
__Bold text using double underscores__

*Italic text using single asterisks*  
_Italic text using single underscores_

~~Strikethrough text using tildes~~

Inline code using `backticks` and more `code examples`.

**Combined formatting: _bold and italic_ text**

---

### 2. **Block Elements**

# Heading 1
## Heading 2  
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is a regular paragraph with some text. It should wrap properly and maintain good spacing.

This is another paragraph after a line break.

> This is a blockquote
> It can span multiple lines
> 
> > And even be nested
> > Like this

```javascript
// This is a fenced code block with syntax highlighting
function hello(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome ${name}`;
}

const result = hello("World");
```

```python
# Python code block
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

    // This is an indented code block
    const indentedCode = "four spaces";
    console.log(indentedCode);

---

### 3. **Lists**

#### Unordered Lists (using -)
- First item
- Second item
  - Nested item 1
  - Nested item 2
    - Deeply nested item
- Third item

#### Unordered Lists (using *)
* Item one
* Item two
  * Nested with asterisk
  * Another nested item

#### Unordered Lists (using +)
+ Plus item 1
+ Plus item 2
  + Nested plus item

#### Ordered Lists
1. First ordered item
2. Second ordered item
   1. Nested numbered item
   2. Another nested numbered item
      1. Deeply nested numbered
3. Third ordered item

#### Mixed Lists
1. Ordered item
   - Unordered nested item
   - Another unordered nested
2. Another ordered item
   1. Nested ordered
      - Mixed nesting

---

### 4. **Links & Media**

[Regular link to Google](https://google.com)

[Link with title](https://github.com "GitHub Homepage")

<https://autolink-example.com>

<user@example.com>

![Alt text for image](https://via.placeholder.com/150x100/0066cc/ffffff?text=Test+Image)

![Image with title](https://via.placeholder.com/200x150/cc6600/ffffff?text=Another+Image "This is the image title")

---

### 5. **Tables**

#### Simple Table
| Name    | Age | City      |
|---------|-----|-----------|
| Alice   | 30  | New York  |
| Bob     | 25  | London    |
| Charlie | 35  | Tokyo     |

#### Table with Alignment
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         |     Center     |         Right |
| Text         |     Text       |          Text |
| More         |     Data       |         Items |

#### Complex Table
| Feature | Status | Priority | Notes |
|:--------|:------:|---------:|-------|
| **Bold text** | ✅ Done | High | `code in table` |
| *Italic text* | 🔄 In Progress | Medium | [Link in table](https://example.com) |
| ~~Strikethrough~~ | ❌ Todo | Low | Multiple words here |

---

## 🔧 **Advanced/Extended Support**

### Task Lists
- [x] Completed task
- [x] Another completed task
- [ ] Incomplete task
- [ ] Another incomplete task
  - [x] Nested completed subtask
  - [ ] Nested incomplete subtask

### Footnotes
Here's a sentence with a footnote[^1].

Another sentence with another footnote[^2].

[^1]: This is the first footnote.
[^2]: This is the second footnote with more details.

### Emojis

#### Unicode Emojis
📊 📈 📉 💻 🚀 ✨ 🎯 🔥 💡 ⚡ 🌟 🎉

#### Emoji Shortcodes (if supported)
:smile: :heart: :thumbsup: :rocket: :fire: :star:

### Math (LaTeX)
Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### HTML Elements (if allowed)
<div style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
This is embedded HTML content.
</div>

<details>
<summary>Click to expand</summary>
This is collapsible content using HTML details/summary tags.
</details>

---

## 🎨 **Rendering Quality Tests**

### Line Breaks and Spacing
This line is followed by two spaces and a line break.  
This should be on a new line.

This paragraph has proper spacing.

This paragraph also has proper spacing.

### Special Characters
Characters that need escaping: \* \_ \` \\ \[ \] \( \) \# \+ \- \. \! \{ \} \|

### Long Content Test
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Code with Various Languages

```html
<!DOCTYPE html>
<html>
<head>
    <title>HTML Example</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is HTML code.</p>
</body>
</html>
```

```css
.example {
    color: #333;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

```json
{
  "name": "test-package",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "next": "^13.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

```bash
#!/bin/bash
echo "Shell script example"
for i in {1..5}; do
    echo "Iteration $i"
done
```

---

## 🧪 **Edge Cases**

### Empty Elements
- 
* 
1. 

### Nested Emphasis
**Bold with *italic inside* bold**

*Italic with **bold inside** italic*

### Mixed Content in Lists
1. **Bold list item**
2. *Italic list item*
3. `Code in list item`
4. [Link in list item](https://example.com)
5. List item with inline image: ![small](https://via.placeholder.com/20x20)

### Complex Blockquotes
> **Bold in blockquote**
> 
> *Italic in blockquote*
> 
> `Code in blockquote`
> 
> [Link in blockquote](https://example.com)
> 
> - List in blockquote
> - Another item
> 
> ```javascript
> // Code block in blockquote
> console.log("Hello from blockquote");
> ```

---

## 📋 **Checklist Summary**

### ✅ **Should Work**
- [x] Bold and italic text
- [x] Headings (all levels)
- [x] Lists (ordered, unordered, nested)
- [x] Links and images
- [x] Tables with alignment
- [x] Code blocks with syntax highlighting
- [x] Blockquotes
- [x] Horizontal rules
- [x] Strikethrough
- [x] Inline code
- [x] Unicode emojis

### 🔄 **Advanced Features** (may or may not work)
- [ ] Task lists
- [ ] Footnotes
- [ ] Math equations (LaTeX)
- [ ] Emoji shortcodes
- [ ] HTML elements
- [ ] Custom containers

---

**End of Test Document**

This comprehensive test should reveal the current capabilities and limitations of the markdown renderer. 