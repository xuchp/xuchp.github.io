# iOS 兼容问题

### 如何关闭 iOS 键盘首字母自动大小写

```html
 <input type="text" autocapitalize="off" />
```

### iOS 系统中元素被触摸时产生的半透明遮罩怎么去掉

```css
a, button, input, textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

### 禁止 iOS 长按时不触发系统的菜单,禁止 iOS&android 长按时下载图片

###### 禁止 iOS 长按触发系统菜单

```css
html, body {
  touch-callout: none;
  -webkit-touch-callout: none;
}
```

###### 禁止下载图片

```css
img {
  user-select: none;
  -webkit-user-select: none;
}
```

### 禁止 iOS 和 android 用户选中文字

```css
text, textarea {
  user-select: none;
  -webkit-user-select: none;
}
```

