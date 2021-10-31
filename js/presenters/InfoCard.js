class InfoCard{
    
    /**
     * special interface for drawing any InfoCard from main file
     * UNTOUCHABLE! except "modifiable"
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     * @param {Node} contentL - holder for adding all children, that passed from @see Presenter.DrawPresenter()
     */
    static Draw(props, contentL){
        while (contentL.firstChild) {
            contentL.removeChild(contentL.lastChild);
        }
        const card = document.createElement('div');
        const textElement = Paragraph.DrawCommon(props, false);
        const icon = document.createElement('p');
        card.classList.add('infocard');
        card.classList.add('infocard__color_' + props.textColor);
        icon.innerText = props.icon;
        icon.classList.add('material-icons');
        icon.classList.add('infocard__icon');
        textElement.classList.add('infocard__text');
        if(props.textList != Paragraph.TextList.nl){
            textElement.style.paddingInlineStart = '20px';//modifiable
        }
        card.appendChild(icon);
        card.appendChild(textElement);
        contentL.appendChild(card);
    }
}