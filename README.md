# sass-compact vscode plugin

let's go back to original way to write our css

## Features

* compact css file with **shift+alt+f** key

* only format *.css files

* remove tab、\r\n(check os)

* keep custom blank lines

* **add wechat mini program wxss format**

## Less Setting
"sassCompact.Less": "true",//default false

## Examples

* **common style formatter**

~~~ source segment
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
                    .input2 {
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

~~~ format result
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
                    .input2 {
                        font-size: 10rem; }
                }
            }
        }
    }
    .on:after { content: ""; top: 0; left: 0; width: 11.7rem; height: 16.5rem; }
}
~~~

## Release Notes

### 0.0.1

Initial release of cssCompact


-----------------------------------------------------------------------------------------------------------

**Note:** 

* 1、if you can not format your **.scss** files, may be you can exchange LF with CRLF.
* 2、leave a blank before '**}**' to make your emmet effective and format your code.
* 3、if something weired, use **ctrl+K ctrl+D** to format your .scss files first.

**Enjoy!**