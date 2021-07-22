window.onload = () => {
	/* review ここでこのアプリで仕様するエレメントを全て変数化する
	*　もっと複雑なアプリになると、毎回エレメントを取得するとすぐにメモリを食いつぶして
	*　動作が遅くなるので、固定のエレメントだけを使用する物なら、まとめて変数にぶち込む方が良い
	*/
	/* review 「;」は付けないように習った？ 別に良いけど、古いjsの人は「;」を付けないと怒るかも。
	*　jsの書き方がES6なので、IE11は捨ててるだろうから；は無くて良いけど、
	*　IEが全盛の頃のJSエンジニアは;で何回も泣いたからwww
	*/
 	const elms = {
			main : document.getElementById('main'),
			restart : document.getElementById('restart'),
			selected: document.getElementById('selected')
	}


    const omikuji = new Omikuji(elms)

    // mainが押されたら止める
	 // review エレメントは変数化して使う。
    elms.main.onclick = () => {
        omikuji.stopOmikuji()
    }
    // restartがおされたら再開する
    elms.restart.onclick = () => {
        omikuji.restartOmikuji()
    }

    omikuji.start()

}

class Omikuji {

    cur_num
    selected_num
    interval
    omikuji
	 elms

    constructor (elms){
        this.cur_num = 0
        this.selected_num = 0
        this.interval = 0
        this.omikuji = [
            "大吉",
            "吉",
            "中吉",
            "小吉",
            "末吉",
            "凶",
            "大凶"
        ]
		  this.elms = elms
    }

    // おみくじを順で表示する
    start = () => {
        this.interval = setInterval(this.runOmikuji, 100)
        console.log(this.interval)
    }

    setText = (value) => {
        this.elms.selected.textContent = value
    }

    //　おみくじを配列から選ぶ
    runOmikuji = () =>{
        console.log(this.omikuji)
        console.log(this.cur_num)
        this.setText(this.omikuji[this.cur_num])
        this.cur_num++
        if(this.cur_num === this.omikuji.length - 1){
            this.cur_num = 0
        }
    }
    // おみくじをとめる
    stopOmikuji = () => {
        clearInterval(this.interval)
        this.selected_num = this.cur_num
        this.setText(this.omikuji[this.selected_num])
    }
    // おみくじを始める
    restartOmikuji = () => {
        this.selected_num = 0
        clearInterval(this.interval)
        this.start()
    }
}
