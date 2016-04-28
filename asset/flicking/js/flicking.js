'use strict';

(function(w){
    var list = document.querySelectorAll('.list-item'),
        length = list.length,
        i = 0,
        startX = 0,
        currentX = 0,
        isMoveArr = [],
        arrList = [],
        moveX = 0,
        btnWidth = 120,
        elasticsWidth = 40;
    for(; i < length; i++){
        arrList[i] = list[i];
        isMoveArr.push(false);
        arrList[i].addEventListener('click', function(e){
            this.className ="list-item transition-item";
            if(isMoveArr[arrList.indexOf(this)]){
                isMoveArr[arrList.indexOf(this)] = false;

                //this.children[0].style.left = '0px';
                //this.children[1].children[0].style.width = '0px';
                //this.children[1].children[1].style.width = '0px';
            }else{
                isMoveArr[arrList.indexOf(this)] = true;
                //this.className ="list-item transition-item";
                //this.children[0].style.left = String(-1 * (120)) + 'px';
                //this.children[1].children[0].style.width = String(120 / 2) + 'px';
                //this.children[1].children[1].style.width = String(120 / 2) + 'px';
            }
        });
        // arrList[i].addEventListener('touchstart', function(e) {
        //     this.className = 'list-item';
        //     startX = e.changedTouches[0].pageX;
        // }, false);

        // arrList[i].addEventListener('touchmove', function(e) {
        //     currentX = e.changedTouches[0].pageX;
        //     if(isMoveArr[arrList.indexOf(e.currentTarget)]) {
        //         moveX = btnWidth - (currentX - startX);
        //     }else{
        //         moveX = startX - currentX;
        //     }

        //     if(moveX > btnWidth + elasticsWidth) {
        //         moveX = btnWidth + elasticsWidth;
        //     } else if(moveX < -elasticsWidth) {
        //         moveX = -elasticsWidth;
        //     }

        //     this.children[0].style.left = String(-moveX) + 'px';
        //     if(moveX < 0) {
        //         moveX = 0;
        //     }else if(moveX > btnWidth + 20) {
        //         moveX = btnWidth + 20;
        //     }
        //     this.children[1].children[0].style.width = String(moveX / 2) + 'px';
        //     this.children[1].children[1].style.width = String(moveX / 2) + 'px';
        // }, false);

        // arrList[i].addEventListener('touchend', function(e) {
        //     this.className ="list-item transition-item";
        //     if(moveX >= btnWidth / 2){
        //         moveX = btnWidth;
        //     }else{
        //         moveX = 0;
        //     }
        //     this.children[0].style.left = String(-1 * (moveX)) + 'px';
        //     this.children[1].children[0].style.width = String(moveX / 2) + 'px';
        //     this.children[1].children[1].style.width = String(moveX / 2) + 'px';
        // }, false);

        // arrList[i].addEventListener('transitionend', function(e) {
        //     if(moveX === btnWidth) {
        //         isMoveArr[arrList.indexOf(e.currentTarget)] = true;
        //     }else{
        //         isMoveArr[arrList.indexOf(e.currentTarget)] = false;
        //     }
        //     this.className = 'list-item';
        // });
    }
})(window);