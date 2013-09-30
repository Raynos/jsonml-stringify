(* 
JsonML is both loosely and strictly defined.

A plugin is an object literal with either a single key / value
    pair or a key 'type' and some properties

Strict:
    - null
    - plugin
    - [ tagName , properties , children ]
    - [ '#text' , properties , text content ]
    - [ '#text' , properties , plugin ]

Loose:
    - null
    - undefined
    - plugin
    - text content
    - [ tagName ]
    - [ tagName , properties ]
    - [ tagName , text content ]
    - [ tagName , children ]
    - [ tagName , plugin ]
    - [ tagName , properties , text content ]
    - [ tagName , properties , children ]
    - [ tagname , properties , plugin ]
    - [ '#text' , text content ]
    - [ '#text' , properties , text content ]

*)


type JsonMLPlugin := Object | Function
type JsonMLProperties := 
    Object<String, String | Boolean | JsonMLPlugin>

type JsonML :=
    null |
    JsonMLPlugin |
    [ String , JsonMLProperties , Array<JsonML> ] |
    [ "#text" , JsonMLProperties , String | JsonMLPlugin ]


type LooseJsonML := 
    null |
    undefined |
    JsonMLPlugin |
    String |
    [ String ] |
    [ String , JsonMLProperties ] |
    [ String , String ] |
    [ String , Array<LooseJsonML> ] |
    [ String , JsonMLPlugin ] |
    [ "#text" , String ] |
    [ String , JsonMLProperties , String ] | 
    [ String , JsonMLProperties , Array<LooseJsonML> ] |
    [ String , JsonMLProperties , JsonMLPlugin ] |
    [ "#text" , JsonMLProperties , String ]

type JsonMLOptions := {
    parent: JsonML,
    parents: Array<JsonML>,
    plugins: Array<Plugin>
}

type JsonMLMergeOptions := JsonMLOptions & {
    elements: Array<DOMElement | DOMTextNode>,
    root: DOMElement
}

type Plugin := {
    stringify: (JsonML, JsonMLOptions) => String,
    dom: (JsonML, JsonMLOptions) => DOMElement,
    merge: (JsonML, JsonMLMergeOptions) => void,
    type: String,
    normalize: (JsonML, JsonMLOptions) => JsonML,
    renderProperty: (DOMElement, value: Any, key: String, JsonMLOptions),
    stringifyProperty: (value: Any, key: String, JsonMLOptions) => String,
    mergeProperty: (DOMElement, value: Any, key: String, JsonMLMergeOptions),
    setProperty: (value: Any, key: String),
    getProperty: (value: Any, key: String) => String
}

stringify-recur := (JsonML, JsonMLOptions) => String

dom-recur := (JsonML, JsonMLOptions) => DOMElement

merge-recur := (JsonML, JsonMLMergeOptions)
