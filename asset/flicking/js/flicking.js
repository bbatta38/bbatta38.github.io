'use strict';

var Flicking = function() {
}

Flicking.prototype.init = function($obj){
    var startX = 0,                     // 시작 x 좌표
        currentX = 0,                   // move 중 x 좌표
        isMoveArr = [],                 // 펼쳐져 있는지 닫혀있는지 boolean값
        i = 0,                          // for문 돌릴 i
        elasticsWidth = $obj.elastic,   // 탄력값
        _self = this,                   
        isMove = false;                 // 그냥 클릭만 했는지 움직였는지 체크

    this.wrapper = $obj.wrapper;        // wrapper 설정
    if(this.wrapper){
        this.list = document.querySelectorAll('.' + $obj.wrapper + ' .' + $obj.container);
    }else{
        this.list = document.querySelectorAll('.' + $obj.container);
    }
    this.length = this.list.length;     // list 길이
    this.moveX = 0;                     // start 와 current값 계산한 최종 움직일 값
    this.btnWidth = $obj.btnWidth;      // 나타날 버튼 가로 사이즈

    for(; i < this.length; i++) {
        var _list = this.list[i];       // _list에 list안에 있는 객체를 차례로 담아 이벤트 타겟으로 지정해 준다.
        isMoveArr[i] = false;           // 다 닫혀 있으므로 false를 넣어준다.
        _list.no = i;                   // 이벤트 리스너 안에서 i를 받아줄 역할
        _list.addEventListener('touchstart', function(e) {
            this.className = $obj.container;
            startX = e.changedTouches[0].pageX;     // 시작 지점 설정
        }, false);

        _list.addEventListener('touchmove', function(e) {
            currentX = e.changedTouches[0].pageX;   // 현재 x좌표값
            if(isMoveArr[this.no]) {                // moveX값은 열려있을때와 닫혀있을때가 달라야 하므로 현재 리스트의 boolean값으로 체크
                _self.moveX = _self.btnWidth - (currentX - startX);
                // 열려 있을 경우 현재 열려있는 x좌표에서 움직이는 동안의 x좌표를 빼줘야 한다.
            }else{
                _self.moveX = startX - currentX;
                // 닫혀 있을 경우 시작점에서 현재 x좌표값을 빼준다.
            }

            if(_self.moveX > _self.btnWidth + elasticsWidth) {
                _self.moveX = _self.btnWidth + elasticsWidth;       // 최대값 설정
            } else if(_self.moveX < -elasticsWidth) {
                _self.moveX = -elasticsWidth;                       // 최소값 설정
            }

            _self.move(this, false);
            isMove = true;                                          // 움직이고 있는 상태인지 아닌지 체크
        }, false);

        _list.addEventListener('touchend', function(e) {
            if(isMove){
                this.className = $obj.container + ' ' + $obj.transitionClass;
                _self.move(this, true);
                // touchmove가 이루어진 상황이면 트랜지션을 하여 지정한 btnWidth값으로 이동
            }
            isMove = false;
        }, false);

        _list.addEventListener('transitionend', function(e) {
            if(_self.moveX === _self.btnWidth) {
                isMoveArr[this.no] = true;
            }else{
                isMoveArr[this.no] = false;
            }
            this.className = $obj.container;
            // 트랜지션이 끝나면 클래스 이름 초기화 해주고 isMoveArr에 닫혔는지 열렸는지 boolean값 삽입
        });
    }
};

/**
 * list의 움직임 설정
 * @param  {[Object]} $target [현재 선택된 리스트]
 * @param  {[Boolean]} $isEnd  [touchmove인지 touchend인지 구분]
 * @return {[none]}
 */
Flicking.prototype.move = function($target, $isEnd){
    if($isEnd){                 //  touch가 끝났을 때 움직인거리가 설정한 width값 / 2 보다 클 경우 설정한 width값으로 이동하고 아니면 다시 0으로 이동
        if(this.moveX >= this.btnWidth / 2){
            this.moveX = this.btnWidth;
        }else{
            this.moveX = 0;
        }
    }
    $target.querySelector('.list-content').style.transform = 'translate3d(' + (-this.moveX) + 'px, 0, 0)'; 
    if(!$isEnd){                //  버튼은 최대 width값 + 20까지만 제한한다.
        if(this.moveX < 0) {
        this.moveX = 0;
        }else if(this.moveX > this.btnWidth + 20) {
            this.moveX = this.btnWidth + 20;
        }
    }
    $target.querySelector('.list-btns').style.transform = 'translate3d(0, 0, 0) scaleX(' + (this.moveX / this.btnWidth) + ')';
};


(function(window) {
    var flicking = new Flicking();
    flicking.init({
        wrapper:'list',
        container: 'list-item',
        transitionClass: 'transition-item',
        btnWidth: 120,
        elastic: 40
    });
})(window);
