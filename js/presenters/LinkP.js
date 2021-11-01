class LinkP {
    /**
     * special interface for drawing any LinkP from main file
     * UNTOUCHABLE! except "modifiable"
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     * @param {Node} contentL - holder for adding all children, that passed from @see Presenter.DrawPresenter()
     */
    static Draw(props, contentL) {
        while (contentL.firstChild) {
            contentL.removeChild(contentL.lastChild);
        }
        const card = document.createElement('div');
        const icon = document.createElement('p');
        const link = document.createElement('a');
        const classCard = ['infocard', 'infocard__color_Blue_Grey'];
        const classIcon = ['material-icons', 'infocard__icon'];
        const classLink = ['infocard__text', 'par__text', 'par__textStyle_n', 'par__textAlign_jf', 'par__size_m'];
        icon.classList.add(...classIcon);
        card.classList.add(...classCard);
        link.classList.add(...classLink);
        icon.innerText = 'link';
        link.innerText = props.text;
        link.href = props.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.color = '#37474f'; //modifiable
        card.appendChild(icon);
        card.appendChild(link);
        contentL.appendChild(card);
    }
}
