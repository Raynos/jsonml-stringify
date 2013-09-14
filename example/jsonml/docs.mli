(* 
JsonML is both loosely and strictly defined.

A plugin is an object literal with either a single key / value
	pair or a key 'type' and some properties

Strict:
	- null
	- plugin
	- [ tagName , properties, children ]
	- [ '#text' , properties , text content ]

Loose:
	- null
	- undefined
	- plugin
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
	[ "#text" , JsonMLProperties , String ]


type LooseJsonML := 
	null |
	undefined |
	JsonMLPlugin |
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