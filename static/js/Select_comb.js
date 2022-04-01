/**
 * 選択肢クラス
 * @param parentValue 親の値(null:いつでも表示)
 * @param text 表示テキスト
 * @param value 値
 * @param style ＣＳＳ(省略可)
 */
function SelectOption(parentValue, text, value, style) {
  
  this.parentValue = parentValue;
  
  this.setOption = function() {
    this.text = text;
    this.value = value;
    if(style) {
      this.style.cssText = style;
    }
  };
  
  return this;
}

/**
 * セレクトボックスクラス
 * @param id セレクトボックスID
 */
function SelectBox(id) {
  
  /**
   * IDに対応オブジェクトを取得
   * @return オブジェクトorNULL
   */
//console.log('SelectBox'+id);
  function getObject() {
    var obj = document.getElementById(id);
    if(!obj.options && ( (typeof obj.length) == "number") ) {
      if(obj.length > 0) {
        obj = obj[0];
      } else {
        obj = null;
      }
    }
    return obj;
  }
  
  // オプションのリスト
  var options = [];
  
  /**
   * オプション登録
   * @param condition 表示条件
   */
  this.registOption = function(option) {
//console.log('registOption');
    options[options.length] = option;
  };
  
  // 子のオブジェクト
  var child = null;
  
  /**
   * 子のオブジェクトを設定する
   * @param childObj 子のオブジェクト
   */
  this.setChild = function(childObj) {
//console.log(this,'setChild');
    child = childObj;
  };
  
  /**
   * オプション反映
   * @param parentValue 親の値(null:全部表示)
   * ※比較に==を使っているのでundefinedもnullと等しく扱われる。
   */
  this.make = function(parentValue) {
//console.log(this,'this.make');
    var obj = getObject();
//console.log(obj);
    if(obj) {
      // 選択肢削除
      obj.options.length = 0;
      // 表示すべき選択肢抽出
      var opt = (parentValue != null) ? [] : options;
      if(parentValue != null) {
        for(var i = 0; i < options.length; i++) {
          if( (options[i].parentValue == null) || (options[i].parentValue == parentValue) ) {
            opt[opt.length] = options[i];
          }
        }
      }
      // 選択肢反映
      obj.options.length = opt.length;
      for(var i = 0; i < opt.length; i++) {
//console.log('setOption=',i);
        opt[i].setOption.call(obj.options[i]);
      }
      // 子のオブジェクトにも連鎖反映
      if(child) {
        child.make(obj.value);
      }
    }
  };
  
  return this;
}
