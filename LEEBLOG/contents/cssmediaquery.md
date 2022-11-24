---
date: '2022-05-28'
title: 'CSS - Media Query'
categories: ['CSS']
summary: '반응형 웹'
thumbnail: './cssthumbnail.png'
---

## 미디어 쿼리란?

미디어 쿼리는 다양한 크기(해상도)의 디바이스에 맞춰서 CSS를 작성할 수 있게 도와줍니다.

거의 모든 브라우저에서 지원됩니다.

반응형 웹에는 두 가지 CSS 작성 방법을 적용할 수 있습니다.

데스크톱이나 뷰포트가 가장 큰 디바이스를 우선적으로 작성한 뒤

축소하면서 분기점을 추가하는 방식인 데스크톱 퍼스트

가장 작은 디바이스를 우선으로 작성한 뒤 뷰포트를 확대하면서

분기점을 추가하는 방식 모바일 퍼스트가 있습니다.

MDN에 따르면 모바일 퍼스트 방식이 선호되는 추세이며 최상의 접근법이라고 합니다.

## 기본 설정

```html
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
```

## 모바일 퍼스트 예제

```css
/* Default CSS */
/* Mobile - Portrait */

/* Mobile - Landscape */
@media (min-width: 576px) {
}

/* Tablet */
@media (min-width: 768px) {
}

/* Desktop */
@media (min-width: 992px) {
}

/* Desktop (Large) */
@media (min-width: 1200px) {
}
```

## 데스크톱 퍼스트 예제

모바일이 활성화 되지 않았던 예전에 많이 사용하던 방식입니다.

```css
/* Mobile - Portrait */
@media (max-width: 575px) {
}

/* Mobile - Landscape */
@media (max-width: 767px) {
}

/* Tablet */
@media (max-width: 991px) {
}

/* Desktop */
@media (max-width: 1199px) {
}

/* Default CSS */
```

## 해상도 지정

기본 CSS 없이 max-width와 min-width을 모두 사용해 디바이스 별로 css를 작성할 수 있도록 합니다.

```css
/* Mobile - Portrait */
@media (max-width: 575px) {
}

/* Mobile - Landscape */
@media (min-width: 576px) and (max-width: 767px) {
}

/* Tablet */
@media (min-width: 768px) and (max-width: 991px) {
}

/* Desktop */
@media (min-width: 992px) and (max-width: 1199px) {
}

/* Desktop (Large) */
@media (min-width: 1200px) {
}
```
