/**
 * Mouse capture（マウス位置のキャプチャ用オブジェクト）
 * @param {Element} target ドラッグ位置を検知したい要素
 * @param {Function} callback 位置を計算したあとに呼び出されるコールバック関数
 */
function MouseCapture(target, callback) {
    this._target = target;
    
    //callback関数が指定されていない場合は空の関数を保存
    this._callback = callback || function (x, y) {};
    this._dragging = false; //ドラッグ状態。最初はオフ。
    
    //ドラッグ位置の前回の位置を保存。初期値はx, yともに0。
    this._previous = { x: 0, y: 0 };

    //各種イベントにイベントハンドラを登録
    var that = this;
    target.addEventListener('mousedown', function (e) {
        that._mousedownHandler(e);
    }, false);
    document.addEventListener('mousemove', function (e) {
        that._mousemoveHandler(e);
    }, false);
    document.addEventListener('mouseup', function (e) {
        that._mouseupHandler(e);
    }, false);
}

//MouseCaptureオブジェクトのプロトタイプを設定
MouseCapture.prototype = {
    constructor: MouseCapture,
    
    //mouse down時の挙動
    _mousedownHandler: function (e) {
        this._dragging = true;
        this._previous.x = e.pageX;
        this._previous.y = e.pageY;
    },
    
    //mouse move時の挙動
    _mousemoveHandler: function (e) {
        if (!this._dragging) {
            return;
        }

        var x = e.pageX - this._previous.x;
        var y = e.pageY - this._previous.y;

        this._previous = {
            x: e.pageX,
            y: e.pageY
        };

        this._callback(x, y);
    },
    
    //mouse up時の挙動
    _mouseupHandler: function (e) {
        this._dragging = false;
    }
};

/**
 * モーダルレイヤーを表示する
 */
function ModalLayer() {
    this._init();
}

//ModalLayerオブジェクトのプロトタイプを設定
ModalLayer.prototype = {
    constructor: ModalLayer,
    
    //モーダルレイヤーの初期化処理
    _init: function () {
        this.el = document.createElement('div');
        this.el.style.cssText = 'position: fixed;' +
                                'left: 0;' +
                                'top: 0;' +
                                'z-index: 900;' +
                                'width: 100%;' +
                                'height: 100%;' +
                                'background-color: rgba(0, 0, 0, 0.7);';

        document.body.appendChild(this.el);
    },

    //モーダルレイヤーを閉じる
    close: function () {
        this.el.parentNode.removeChild(this.el);
        this.el = null;
    }
};


/**
 * ポップアップウィンドウを生成する
 * @param {Object} conf ポップアップウィンドウの設定項目
 *        {Object.<string>} content 表示内容
 *        {Object.<string>} title タイトル
 *        {Object.<boolean>} modal モーダルのON/OFF
 *        {Object.<enum.<number>>} buttonType ボタンタイプ。YES, YES/NOの2タイプ
 */
function Popwindow(conf) {
    conf || (conf = {
        title: 'No title',
        content: '',
        modal: false,
        buttonType: Popwindow.buttonType.YESNO
    });
console.log('conf= ',conf);
    this._init(conf);
    this._show();
}

//ボタンタイプの種類を定義
Popwindow.buttonType = { YES: 1, YESNO: 2 };

//Popwindowオブジェクトのプロトタイプを設定
Popwindow.prototype = {
    constructor: Popwindow,

    /**
     * ポップアップウィンドウの初期化
     * @param {Object} conf ポップアップウィンドウの設定情報
     */
    _init: function (conf) {
        this.el = document.createElement('div');
        this.el.appendChild(this._buildWindow(conf.title, conf.content));
        this.el.className = 'popwindow';

        this.left = 0;
        this.top  = 0;

        //thisを変数に保存
        var that = this;

        //Yesボタン押下時の処理
        var yesBtn = this.el.querySelector('.popwindow-button-yes');
        yesBtn.addEventListener('click', function (e) {
            that._yesHandler(e);
        }, false);

        //NOボタンがあるときだけイベントを付与
        var noBtn = this.el.querySelector('.popwindow-button-no');
        if (conf.buttonType === Popwindow.buttonType.YESNO) {
            //Noボタン押下時の処理
            noBtn.addEventListener('click', function (e) {
                that._noHandler(e);
            }, false);
        }
        else {
            noBtn.style.display = 'none';
        }

        //ウィンドウの移動処理を「MouseCapture」オブジェクトに委譲する
        var titleElement = this.el.querySelector('.popwindow-title');
        this._mouseCapture = new MouseCapture(titleElement, function (x, y) {
            that.moveTo(that.left + x, that.top + y);
        });

        //モーダルのチェック
        if (conf.modal === true) {
            this.modal = new ModalLayer();
        }
    },

    _buildWindow: function (titleText, contentText) {
        //コンテナとなるdiv要素を生成する
        var container = document.createElement('div');
        
        //テンプレート情報を格納している要素(<script>要素)からHTMLテキストを取得
        var templateElement = document.getElementById('template-window');
        container.innerHTML = templateElement.innerHTML;
        
        //テンプレートからタイトル、コンテンツ用要素を取得
        var title   = container.querySelector('.popwindow-title');
        var content = container.querySelector('.popwindow-content');

        //セキュリティを意識する場合はcreateTextNodeを使ったほうが安全
        //var titleTextNode = document.createTextNode(titleText);
        //title.appendChild(titleTextNode);
        //var contentTextNode = document.createTextNode(contentText);
        //content.appendChild(contentTextNode);
        title.innerHTML = titleText;
        content.innerHTML = contentText;

        //生成したコンテナ要素を返す
        return container;
    },

    //ポップアップウィンドウを表示する
    _show: function () {
        document.body.appendChild(this.el);
        
        //追加された要素の幅と高さを取得
        var width  = this.el.clientWidth;
        var height = this.el.clientHeight;

        //画面中央に来るように位置を調整
        var x = window.innerWidth  / 2 - width  / 2;
        var y = window.innerHeight / 2 - height / 2;

        this.moveTo(x, y);
    },

    //YESが選択されたときの処理
    _yes: function () {
        this.trigger('yes');
        this.close();
    },

    //NOが選択されたときの処理
    _no: function () {
        this.trigger('no');
        this.close();
    },

    //YESボタンが押された時の処理
    _yesHandler: function () {
        this._yes();
    },

    //NOボタンが押された時の処理
    _noHandler: function () {
        this._no();
    },

    /**
     * ポップアップウィンドウを指定されたx, yに移動する
     * @param {number} x xの位置。（style.leftの値）
     * @param {number} y yの位置。（style.topの値）
     */
    moveTo: function (x, y) {
        this.left = x;
        this.top  = y;

        this.el.style.left = x + 'px';
        this.el.style.top  = y + 'px';
    },

    //ポップアップウィンドウを閉じる
    close: function () {
        if (this.modal) {
            this.modal.close();
        }
        this.el.parentNode.removeChild(this.el);
        this.trigger('close');
    },

    /**
     * イベントトリガー
     * @param {string} type イベントタイプ
     * @param {Object} data イベントリスナーに渡すデータ
     */
    trigger: function (type, data) {
        var handlers = this._handlers || (this._handlers = {});
        var handler = handlers[type] || (handlers[type] = []);

        for (var i = 0, l = handler.length; i < l; i++) {
            handler[i](data);
        }
    },

    /**
     * イベントリスナーの登録
     * @param {string} type 登録したいイベントタイプ
     * @param {Function} callback イベント発火時のコールバック関数
     */
    addListener: function (type, callback) {
        var handlers = this._handlers || (this._handlers = {});
        var handler = handlers[type] || (handlers[type] = []);

        handler.push(callback);
    },

    /**
     * イベントリスナーの解除
     * @param {string} type 解除したいイベントタイプ
     * @param {Function} callback 解除したいコールバック関数
     */
    removeListener: function (type, callback) {
        var handlers = this._handlers || (this._handlers = {});
        var handler = handlers[type] || (handlers[type] = []);
        var len = handler.length;
        while (len--) {
            if (handler[len] === callback) {
                handler.splice(len, 1);
                break;
            }
        }
    }
};
