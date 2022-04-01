////
  function link() {
//console.log(selectedText);
    var sel = window.getSelection();
    if(!sel.rangeCount) return; //範囲選択されている箇所がない場合は何もせず終了

    var range = sel.getRangeAt(0);　　　　　　　　　　　//　OK!!
    var newNode =document.createElement('a');
    var user = window.prompt("link先を入力してください", "");
//console.log(user);
    newNode.href = user;
    newNode.innerHTML = sel.toString();   //tag部分に<>を含むと変更出来ない。
    range.deleteContents();    // 範囲選択箇所を一旦削除
    range.insertNode(newNode); 
    }
////
  h3.onclick = function() {
    const selectedText = window.getSelection().toString();
console.log(selectedText);

    var sel = window.getSelection();
    if(!sel.rangeCount) return; //範囲選択されている箇所がない場合は何もせず終了

    var range = sel.getRangeAt(0);　　　　　　　　　　　//　OK!!
    var newNode = document.createElement('h3');
//  newNode.setAttribute('style', 'background-color: blue;'); //範囲選択箇所の背景を青にする
    newNode.innerHTML = sel.toString();   //tag部分に<>を含むと変更出来ない。
    range.deleteContents();    // 範囲選択箇所を一旦削除
    range.insertNode(newNode); // 範囲選択箇所の先頭から、修飾したspanを挿入
    }
////
    chara.onclick = function() {
const selectedText = window.getSelection().toString();
colval=document.querySelector('#trig1').style.backgroundColor;
console.log('Sel_text=',selectedText,'color=',colval);

var sel = window.getSelection();
  if(!sel.rangeCount) return; 

  var range = sel.getRangeAt(0);　　　　　　　　　　　//OK!!　<font>でも下記の<span>でもOK
  var font = document.createElement("font");
  font.style.color = colval;
  range.surroundContents(font);

//  var span = document.createElement("span");     //OK
//  span.style.color = colval;
//  range.surroundContents(span);

    }

/*  編集中のレコードの保存　　　　*/
////
function doc_save() {
console.log('*** SAVE　Entered  Direct to server ***');
	var tex_to_serv=escapeHtml(escape(document.getElementById("texx").innerHTML));
	var svg_tags=document.querySelector('#myCanvas');
console.log('**Svg_tag length=',svg_tags.childElementCount);
	svg_tag='';
	for (nn = 0; nn < svg_tags.childElementCount; nn++) {
		svg_tag=svg_tag+svg_tags.children[nn].outerHTML+'|<=>|';
console.log('***list n =',nn,' length = ', svg_tag.length);
		}
	var svg_tag=escapeHtml(escape(svg_tag));
console.log('svg_tag',svg_tag);
console.log(tex_to_serv);
        $.ajax({
            url: "/db_serv/update/",
            data: {
		"description":tex_to_serv,
		"svg":svg_tag,
		},
            dataType: 'json'
        })
        .done((data) => {
            //結果が帰ってきたら、表示します。
            //$('#answer').html('<span class="flower-answer-text">' + data['result'] + '</span>');
console.log('**Ajax Returned result=',data);
        });
   }
/*  新規レコードの作成　　　　*/
////
    doc_new.onclick = function() {
console.log('*** newRecord　Entered  ***');
	var tex_to_serv='   これは新規レコードです。　　';
	document.getElementById("texx").innerHTML=tex_to_serv;
	 while (container.firstChild) {
            container.removeChild(container.firstChild);
	    }
	var svg_tag='';
        $.ajax({
            url: "/db_serv/newrec/",
            data: {
		"description":tex_to_serv,
		"svg":svg_tag,
		},
            dataType: 'json'
        })
        .done((data) => {
            //結果が帰ってきたら、表示します。
console.log('**Ajax Returned result=',data);
        });
   }

