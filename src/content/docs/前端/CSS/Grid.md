---
title: Grid
description: Grid
status: evergreen
---

网格布局

## API

### 布局容器

```css
display: grid;
display: inline-grid;
```

### 网格轨道

通过 _grid-template-rows_ 和 _grid-template-columns_ 来定义整个网格有几列几行

以下代码将整个网格分为 8 列 4 行

```css
/* 将网格分为 8列 */
grid-template-columns: 100px 1fr repeat(5, 1fr) 100px;

/* 将网格分为 4行 */
grid-template-rows: 100px 1fr 2fr 100px;
```

#### 放置网格轨道

可通过 _grid-column-start_，_grid-column-start_，_grid-row-start_，_grid-row-start_ 来设置某个单元格的起始和结束位置，也可以使用 _grid-column_， _grid-row_ 复合属性

```css
grid-column: auto;

/* 单元格在第一列 */
grid-column: 1;

/* 单元格在 [1,2) 之间 */
grid-column: 1 / 2;

/* 负数则从后往前数，-1 为撑满最后一列 */
grid-column: 1 / -1;

/* 单元格在 [1,2] 之间 */
grid-column: 1 / span 2;
```

### 网格间距

使用 _column-gap_，_row-gap_，_grid-gap_ 来设置单元格间隔

```css
/* 列间隔 */
column-gap: 10px;

/* 行间隔 */
row-gap: 10px;

/* 复合属性，行列间隔 */
grid-gap: 10px;
```

### 网格对齐

网格分为两个轴块轴（竖直的）和行轴（水平的）。使用 _align-items_ 来设置网格，_align-self_ 来设置单元格的块轴对齐方式，使用 _justify-items_ 来设置网格，_justify-self_ 设置单元格的行轴对齐方式

```css
/* 设置网格的块轴对齐方式 */
align-items: center;

/* 设置某个单元格的块轴对齐方式 */
align-self: center;
```
