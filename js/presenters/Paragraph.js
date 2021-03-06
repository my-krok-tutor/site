class Paragraph {

    static TextList = {
        ol: 'ol',
        nl: 'nl',
        ul: 'ul'
    }

    /**
     * special interface for drawing any Paragraph from main file
     * UNTOUCHABLE! except "modifiable"
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     * @param {Node} contentL - holder for adding all children, that passed from @see Presenter.DrawPresenter()
     */
    static Draw(props, contentL) {
        while (contentL.firstChild) {
            contentL.removeChild(contentL.lastChild);
        }
        const rootElement = Paragraph.DrawCommon(props, true);
        contentL.appendChild(rootElement);
    }

    /**
     * common interface for drawing any @see InfoCard , @see LinkP , @see FileP , @see ImageP , @see Paragraph from main file
     * UNTOUCHABLE!
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     * @param {boolean} forParagraph - for correct drawing depend on target invoke
     */
    static DrawCommon(props, forParagraph) {
        const elements = [];
        const strings = props.text.split('\n');
        let rootElement;
        switch (props.textList) {
            case Paragraph.TextList.nl:
                rootElement = document.createElement('div');
                break;
            case Paragraph.TextList.ul:
                rootElement = document.createElement('ul');
                break;
            case Paragraph.TextList.ol:
                rootElement = document.createElement('ol');
                break;
        }
        for (let i = 0; i < strings.length; i++) {
            let elem;
            switch (props.textList) {
                case Paragraph.TextList.nl:
                    elem = document.createElement('p');
                    elem.innerHTML = strings[i];
                    elements.push(elem);
                    break;
                case Paragraph.TextList.ul:
                case Paragraph.TextList.ol:
                    elem = document.createElement('li');
                    elem.innerHTML = strings[i];
                    elements.push(elem);
                    break;
            }
        }
        rootElement.style.boxSizing = 'border-box';
        rootElement.style.margin = '0';
        for (let elem of elements) {
            elem.classList.add('par__text');
            elem.classList.add('par__textStyle_' + props.textStyle);
            elem.classList.add('par__textAlign_' + props.textAlign);
            if (forParagraph) {
                elem.classList.add('par__color_' + props.textColor);
                elem.style.marginTop = '4px';
                elem.style.marginBottom = '4px';
                if(elem.tagName == 'LI'){
                    elem.style.marginLeft = '16px';
                }
            }
            elem.classList.add('par__size_' + props.textSize);
            rootElement.appendChild(elem);
        }
        return rootElement;
    }
}
