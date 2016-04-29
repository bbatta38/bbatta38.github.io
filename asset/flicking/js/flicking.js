'use strict';

var Flicking = function() {
}

Flicking.prototype.init = function($obj){
    var startX = 0,
        currentX = 0,
        isMoveArr = [],
        arrList = [],
        i = 0,
        elasticsWidth = $obj.elastic,
        _self = this,
        isMove = false;

    this.wrapper = $obj.wrapper;
    if(this.wrapper){
        this.list = document.querySelectorAll('.' + $obj.wrapper + ' .' + $obj.container);
    }else{
        this.list = document.querySelectorAll('.' + $obj.container);
    }
    this.length = this.list.length;
    this.moveX = 0;
    this.btnWidth = $obj.btnWidth;

    for(; i < this.length; i++) {
        var _list;
        arrList[i] = this.list[i];
        _list = arrList[i];
        isMoveArr[i] = false;
        _list.no = i;
        _list.addEventListener('touchstart', function(e) {
            this.className = $obj.container;
            startX = e.changedTouches[0].pageX;
        }, false);

        _list.addEventListener('touchmove', function(e) {
            currentX = e.changedTouches[0].pageX;
            if(isMoveArr[this.no]) {
                _self.moveX = _self.btnWidth - (currentX - startX);
            }else{
                _self.moveX = startX - currentX;
            }

            if(_self.moveX > _self.btnWidth + elasticsWidth) {
                _self.moveX = _self.btnWidth + elasticsWidth;
            } else if(_self.moveX < -elasticsWidth) {
                _self.moveX = -elasticsWidth;
            }

            _self.move(this, false);
            isMove = true;
        }, false);

        _list.addEventListener('touchend', function(e) {
            if(isMove){
                this.className = $obj.container + ' ' + $obj.transitionClass;
                _self.move(this, true);
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
        });
    }
};

Flicking.prototype.move = function($target, $isEnd){
    if($isEnd){
        if(this.moveX >= this.btnWidth / 2){
            this.moveX = this.btnWidth;
        }else{
            this.moveX = 0;
        }
    }
    $target.querySelector('.list-content').style.left = String(-this.moveX) + 'px';
    if(!$isEnd){
        if(this.moveX < 0) {
        this.moveX = 0;
        }else if(this.moveX > this.btnWidth + 20) {
            this.moveX = this.btnWidth + 20;
        }
    }
    $target.querySelector('.edit-btn').style.width = String(this.moveX / 2) + 'px';
    $target.querySelector('.delete-btn').style.width = String(this.moveX / 2) + 'px';
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
