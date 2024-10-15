$(function(){
    //展开代码块
    $(document).on('click','.code-option-item .unfold-code',function(e){
        $( $(this) ).parent().parent().toggleClass("hljs-h100")
        // $( $(this)[0] ).parent().parent().toggleClass("hljs-h100")
    })
    //复制code中的文本内容
    $(document).on('click','.code-option-item .copy-code',function(e){
        var codeEle=$($(this)).parent().parent().find('.prettyprint')[0]
        var html=$(codeEle).html();
        // html=removeHTMLTags(torHtml(html))
        html=torHtml(html)
        html=removeHTMLTags(html)
        html=replaceTsHtmlToText(html)

        if(copyCodeByForamt(html)){
            window._openMondalMsg('复制成功')
        }
        
    })
    $(document).on('click','.code-option-item .select-code',function(...e){
        // console.log($( $( $(this) ).parent().parent()[0]).find('.prettyprint')[0],e)
        selectText( $( $( $(this) ).parent().parent()[0]).find('.prettyprint')[0] )
    })
   


    function torHtml(html){
        var hhf=` \r\n `
        return html.replace(/<br \/>/gm,hhf ).replace(/<br\/>/gm, hhf).replace(/<br>/gm, hhf).replace(/&nbsp;/gm, ' ');
    }

    function removeHTMLTags(str) {
        return str.replace(/<[^>]*>?/gm, '');
    }
    function replaceTsHtmlToText(html){
        return html.replace(/&lt;/gm,'<' ).replace(/&gt;/gm,'>' ).replace(/&amp;/gm,'&' )
    }

    function copyCodeByForamt(html){
        const input = document.createElement("textarea");
            document.body.appendChild(input);
            input.value =html;
            input.select();
            var result=document.execCommand("copy")
            if (result) {
                console.log(document.execCommand("copy"));
            }
            document.body.removeChild(input);
                console.log('result',result)
            return result
    }
    //选中内容
    function selectText(element) {
        // var text = $("#" + element)[0];
        var text=element;
      
        if (document.body.createTextRange) { // For IE
          var range = document.body.createTextRange();
          range.moveToElementText(text);
          range.select();
        } else if (window.getSelection) { // For modern browsers
          var selection = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(text);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }

   
   
})