class LinkP{

    /**
     * special interface for drawing any LinkP from main file
     * UNTOUCHABLE! except "modifiable"
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     * @param {Node} contentL - holder for adding all children, that passed from @see Presenter.DrawPresenter()
     */
    static Draw(props, contentL){
        while (contentL.firstChild) {
            contentL.removeChild(contentL.lastChild);
        }
        const card = document.createElement('div');
        const icon = document.createElement('p');
        const link = document.createElement('a');
        link.innerText = props.text;
        link.href = props.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.classList.add('infocard');
        card.classList.add('infocard__color_Blue_Grey');//modifiable
        icon.innerText = 'link';
        icon.classList.add('material-icons');
        icon.classList.add('infocard__icon');
        link.classList.add('infocard__text');
        link.classList.add('par__text');
        link.classList.add('par__textStyle_n');
        link.classList.add('par__textAlign_jf');
        link.classList.add('par__size_m');//modifiable
        link.style.color = '#37474f';//modifiable
        card.appendChild(icon);
        card.appendChild(link);
        contentL.appendChild(card);
    }
}