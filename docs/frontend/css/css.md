# css


flex弹性布局

``` css
.parent {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.parent::after {
    content: '';
    width: '10rem'
}
```

