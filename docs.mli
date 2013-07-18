(*
JsonML for our use case is very loosely defined. This
    enables expressiveness in using it for templates.

Valid things are:
 - a text content string
 - a raw object containing a raw HTML string
 - a fragment object containing a list of children
 - a triplet containing just the selector
 - a triplet containing a selector and a raw object
 - a triplet containing a selector and a fragment object
 - a triplet containing a selector and hash of properties
 - a triplet containing a selector and a text content string
 - a triplet containing a selector and an array of children
 - a triplet containing a selector, properties hash
    and an array of children
 - a triplet containing a selector, properties hash
    and a text content string
 - a triplet containing a selector, properties hash
    and a fragment object
 - a triplet containing a selector, properties hash
    and a raw object
*)

type JsonMLSelector := String
type JsonMLTextContent := String
type JsonMLRawContent := {
    raw: String
}
type JsonMLFragment := {
    fragment: Array<JsonML>
}
type JsonMLPropertyKey := String
type JsonMlPropertyValue := String | Number | Boolean
type JsonMLProps := Object<JsonMLPropertyKey, JsonMlPropertyValue>

type MaybeJsonMLChild :=
    null |
    undefined |
    MaybeJsonML

type MaybeJsonML :=
    JsonMLTextContent |
    JsonMLRawContent |
    { fragment: Array<MaybeJsonMLChild> } |
    [JsonMLSelector] |
    [JsonMLSelector, JsonMLRawContent] |
    [JsonMLSelector, { fragment: Array<MaybeJsonMLChild> }] |
    [JsonMLSelector, Object] |
    [JsonMLSelector, JsonMLTextContent] |
    [JsonMLSelector, Array<MaybeJsonMLChild>] |
    [JsonMLSelector, JsonMLProps, Array<MaybeJsonMLChild>] |
    [JsonMLSelector, JsonMLProps, JsonMLTextContent] |
    [JsonMLSelector, JsonMLProps, { fragment: Array<MaybeJsonMLChild> }] |
    [JsonMLSelector, JsonMLProps, JsonMLRawContent]

type JsonML :=
    JsonMLTextContent |
    JsonMLFragment |
    JsonMLRawContent |
    [
        JsonMLSelector,
        JsonMLProps,
        Array<JsonML>
    ]
