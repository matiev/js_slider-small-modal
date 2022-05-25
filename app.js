/* Меню и сайтбар
-------------------------------------------- */
const menu = document.querySelector('.menu'),
    aside = document.querySelector('.sidebar'),
    menuLine1 = document.querySelector('.menu__line1'),
    menuLine2 = document.querySelector('.menu__line2'),
    menuLine3 = document.querySelector('.menu__line3');


let iOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const event = iOS ? "touchstart" : "click";

window.addEventListener(event, function (e) {
    // console.log(e.type);
    if (e.target.closest('.menu') && 
    !aside.closest('.shw')) {
        menu.classList.add('active');
        aside.classList.add('shw');
        menuLine1.classList.add('active1');
        menuLine2.classList.add('active2');
        menuLine3.classList.add('active3');
    } else if (!e.target.closest('.sidebar') && 
    aside.closest('.shw')) {
        menu.classList.remove('active');
        aside.classList.remove('shw');
        menuLine1.classList.remove('active1');
        menuLine2.classList.remove('active2');
        menuLine3.classList.remove('active3');
    }
});

/* Slider, Modal, p
-------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    let mainContentAll = document.querySelectorAll('.main__content');
    for (let mainContent of mainContentAll) {
        let mcN = document.createElement('div');
        mcN.classList.add('main__content-image');

        if (Array.from(mainContent.children).some(item => item.closest('img'))) {
            mainContent.append(mcN);
        }

        let mcImgs = mainContent.querySelectorAll('img');
        for (let mcImg of mcImgs) {
            mcN.append(mcImg);
        }

        if (mcN.children.length > 7) {
            mcN.classList.add('arrow');
        }

        /* Убираем пустые теги параграфов - p
        -------------------------------------------- */
        const par = mainContent.querySelectorAll('p');
        par.forEach(item => {
            if (item.textContent == '') {
                item.remove();
            }
        });

        let modal = document.createElement('div'),
            img = document.createElement('img'),
            cls = document.createElement('div');
        cls.classList.add('cls');
        modal.classList.add('modal');

        let btnLeft = document.createElement('div'),
            btnRight = document.createElement('div');
        btnLeft.classList.add('main__content-btnleft');        
        btnRight.classList.add('main__content-btnright');

        for (let i=0; i<mcImgs.length; i++) {
            mcImgs[i].dataset.index = i;
            window.addEventListener(event, function (e) {
                if (e.target == mcImgs[i]) {
                    let et = +e.target.dataset.index;

                    document.body.append(modal);
                    img.src = mcImgs[i].src;

                    if (mcImgs.length > 1) modal.append(btnLeft,btnRight)

                    modal.append(cls);
                    modal.append(img);
                
                    btnLeft.addEventListener('click', () => {
                        ch(-1);
                    });                    
                    btnRight.addEventListener('click', () => {
                        ch(1);
                    });
                    function ch(n) {
                        et = (n + et + mcImgs.length) % mcImgs.length;
                        img.src = document.querySelector(`[data-index="${et}"]`).src;
                    }
                } else if (e.target == modal || e.target == cls) {
                    modal.remove(); // modal.parentElement.removeChild(modal);
                }
            });
        }
    }
});