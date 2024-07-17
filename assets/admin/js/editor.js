(()=>{"use strict";var e={20:(e,t,l)=>{var o=l(609),n=Symbol.for("react.element"),r=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),i=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};t.jsx=function(e,t,l){var o,s={},c=null,u=null;for(o in void 0!==l&&(c=""+l),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)r.call(t,o)&&!a.hasOwnProperty(o)&&(s[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===s[o]&&(s[o]=t[o]);return{$$typeof:n,type:e,key:c,ref:u,props:s,_owner:i.current}}},848:(e,t,l)=>{e.exports=l(20)},609:e=>{e.exports=window.React}},t={};function l(o){var n=t[o];if(void 0!==n)return n.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,l),r.exports}const o=window.wp.blocks;var n=l(609);const r=window.wp.i18n,i=window.wp.element,a=window.wp.blockEditor,s=window.wp.components,c=window.wp.primitives;var u=l(848);const k=(0,u.jsx)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,u.jsx)(c.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})}),b=(0,u.jsx)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,u.jsx)(c.Path,{d:"M17.031 4.703 15.576 4l-1.56 3H14v.03l-2.324 4.47H9.5V13h1.396l-1.502 2.889h-.95a3.694 3.694 0 0 1 0-7.389H10V7H8.444a5.194 5.194 0 1 0 0 10.389h.17L7.5 19.53l1.416.719L15.049 8.5h.507a3.694 3.694 0 0 1 0 7.39H14v1.5h1.556a5.194 5.194 0 0 0 .273-10.383l1.202-2.304Z"})}),_=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":1,"name":"uikit-blocks/button","title":"Button","category":"uikit-blocks","keywords":["Button","UIkit Button","UIkit"],"textdomain":"uikit-blocks","version":"1.0","attributes":{"text":{"type":"string"},"url":{"type":"string"},"style":{"type":"string","enum":["default","primary","secondary","danger","text","link"],"default":"default"},"size":{"type":"string","enum":["","small","large"]},"target":{"type":"string","enum":["","_blank","lightbox"]},"rel":{"type":"string"}}}');(0,o.registerBlockType)(_.name,{..._,edit:function({attributes:e,setAttributes:t,isSelected:l}){const{text:o,url:c,style:u,size:_,target:p,rel:m}=e,v="_blank",d=["noreferrer","noopener"],w="nofollow",[g,f]=(0,i.useState)(),[h,x]=(0,i.useState)(!1),y=!!c,E=!!m&&m.split(" ").includes(w);function C(e=[],l=[]){let o=m?m.split(" "):[];o.push(...e),o=o.filter((e=>!l.includes(e))),o=o.filter((e=>e)),o=[...new Set(o)],t({rel:o.join(" ")})}return(0,i.useEffect)((()=>{l||x(!1)}),[l]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(a.InspectorControls,null,(0,n.createElement)(s.PanelBody,{title:(0,r.__)("Settings","uikit-blocks")},(0,n.createElement)(s.SelectControl,{label:(0,r.__)("Style","uikit-blocks"),value:u,options:[{label:(0,r.__)("Default","uikit-blocks"),value:"default"},{label:(0,r.__)("Primary","uikit-blocks"),value:"primary"},{label:(0,r.__)("Secondary","uikit-blocks"),value:"secondary"},{label:(0,r.__)("Danger","uikit-blocks"),value:"danger"},{label:(0,r.__)("Text","uikit-blocks"),value:"text"},{label:(0,r.__)("Link","uikit-blocks"),value:"link"}],onChange:e=>{t({style:e})}}),(0,n.createElement)(s.SelectControl,{label:(0,r.__)("Size","uikit-blocks"),value:_,options:[{label:(0,r.__)("Default","uikit-blocks"),value:""},{label:(0,r.__)("Small","uikit-blocks"),value:"small"},{label:(0,r.__)("Large","uikit-blocks"),value:"large"}],onChange:e=>{t({size:e})}}))),(0,n.createElement)(a.InspectorControls,{group:"advanced"},(0,n.createElement)(s.TextControl,{label:(0,r.__)("Link rel","uikit-blocks"),value:m||"",onChange:e=>t({rel:e})})),(0,n.createElement)(a.BlockControls,{group:"block"},!y&&(0,n.createElement)(s.ToolbarButton,{name:"link",icon:k,title:(0,r.__)("Link","uikit-blocks"),onClick:function(e){e.preventDefault(),x(!0)}}),y&&(0,n.createElement)(s.ToolbarButton,{name:"link",icon:b,title:(0,r.__)("Unlink","uikit-blocks"),onClick:function(){t({url:void 0}),x(!1)},isActive:!0})),l&&(h||y)&&(0,n.createElement)(s.Popover,{placement:"bottom",anchor:g,onClose:()=>{x(!1)},focusOnMount:!!h&&"firstElement"},(0,n.createElement)("div",{style:{padding:"10px"}},(0,n.createElement)(s.Flex,{direction:"column"},(0,n.createElement)(s.FlexBlock,null,(0,n.createElement)(a.URLInput,{label:(0,r.__)("Url","uikit-blocks"),value:c,onChange:e=>{t({url:e})},onKeyDown:()=>{x(!0)},__nextHasNoMarginBottom:!0})),(0,n.createElement)(s.FlexBlock,null,(0,n.createElement)(s.SelectControl,{label:(0,r.__)("Target","uikit-blocks"),value:p,options:[{label:(0,r.__)("Same Window","uikit-blocks"),value:""},{label:(0,r.__)("New Window","uikit-blocks"),value:v},{label:(0,r.__)("Lightbox","uikit-blocks"),value:"lightbox"}],onChange:e=>{C(e===v?d:[],e===v?[]:d),t({target:e})}})),(0,n.createElement)(s.FlexBlock,null,(0,n.createElement)(s.CheckboxControl,{label:(0,r.__)("Mark as nofollow","uikit-blocks"),checked:E,onChange:e=>{C(e?[w]:[],e?[]:[w])}}))))),(0,n.createElement)("div",{...(0,a.useBlockProps)()},(0,n.createElement)("span",{className:["ukb-button",`ukb-button-${u}`,_?`ukb-button-${_}`:""].join(" "),ref:f},(0,n.createElement)(a.RichText,{"aria-label":(0,r.__)("Button text","uikit-blocks"),placeholder:(0,r.__)("Add text…","uikit-blocks"),value:o,onChange:e=>t({text:e}),withoutInteractiveFormatting:!0}))))}})})();