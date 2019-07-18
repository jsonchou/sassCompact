# sass-compact vscode plugin

let's go back to original way to write our css

## Features

* shortcut key **shift+alt+f** .

* convert scss files and compact .wxss files

* only format *.scss, *.wxss, *.less files.

* support .wxss files and remove **v,r,p** scss mixin function flag and concat with rpx unit.

## Less * Wxss Setting
- "sassCompact.Less": "false",//default false
- "sassCompact.Wxss": "true",//default true

## Examples

* segment 1

~~~ css
.pt-select {
    margin: 0 auto 3.6rem;
    span {
        margin: 0 0.7rem;
        width: 11.7rem;
        height: 16.5rem;
        div {
            width: 11.7rem;
            border: 0.3rem solid #0d25a2;
        }
    }
    span:after {
        content: "";
        top: 0;
        left: 0;
        width: 11.7rem;
        height: 16.5rem;
        s.d3 {
            margin-right: 15px;
        }
    }
    .on {
        div.d2 {
            border: 0.3rem solid #c62c34;
            form {
                input {
                    border: 1px solid #ccc;
                }
                span:hover {
                    font-size: 13rem;
                    a .pi2 {
                        margin-right: 10px;
                        font-size: 10rem;
                    }
                }
            }
        }
    }
    .on:after {
        content: "";
        top: 0;
        left: 0;
        width: 11.7rem;
        height: 16.5rem;
    }
}
~~~

* format output

~~~ css
.pt-select { margin: 0 auto 3.6rem;
    span { margin: 0 0.7rem; width: 11.7rem; height: 16.5rem;
        div { width: 11.7rem; border: 0.3rem solid #0d25a2; }
    }
    span:after { content: ""; top: 0; left: 0; width: 11.7rem; height: 16.5rem;
        s.d3 { margin-right: 15px; }
    }
    .on {
        div.d2 { border: 0.3rem solid #c62c34;
            form {
                input { border: 1px solid #ccc; }
                span:hover { font-size: 13rem;
                    a .pi2 { margin-right: 10px; font-size: 10rem; }
                }
            }
        }
    }
    .on:after { content: ""; top: 0; left: 0; width: 11.7rem; height: 16.5rem; }
}
~~~


* segment 2

~~~ css
.page-award { width: v(-750);
    .empty { font-size: v(-28);
        img { margin-top: v(-222); width: v(303); margin-bottom: v(10); }
    }
    .award-list { margin: 0 v(96); height: v(850); }
	.award-item {  box-shadow:0 v(3) 0 0 rgba(13,17,90,1); box-shadow:0 v(3) 0 0 rgba(13,17,90,1); }
    .award-item_status { right: v(28); }
    .award-item_top {
	   img{max-width: v(100)}
    }
	.award-item_btn { box-shadow:0 v(2) v(2) rgba(223, 198, 153, 1);
    &.used{background:#eee; }
	}
}
~~~

* format output

~~~ css

~~~



## Release Notes

### 0.0.1

Initial release of cssCompact


-----------------------------------------------------------------------------------------------------------

**Note:**

* 1、if you can not format your **.scss/.less** files, maybe you can exchange LF with CRLF.
* 2、if something weired, use **ctrl+K ctrl+D** to standard formatting your .scss files first.
* 3、leave a blank before '**}**' to make your emmet effective and format your code.
* 4、max nest level is 8, do not over this limit.
* 5、if you have mixin funtions of v(100)、r(30)、p(5) in your .wxss files, it will convert to 100rpx、30rpx、5rpx. you can also disable this feature from settings.json with "sassCompact.Wxss": "false".

**Enjoy!**
