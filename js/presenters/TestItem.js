class TestItem{

    /**
     * special interface for drawing any TestItem from main file
     * UNTOUCHABLE! except "modifiable"
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     * @param {Node} contentL - holder for adding all children, that passed from @see Presenter.DrawPresenter()
     */
    static Draw(props, contentL){
        while (contentL.firstChild) {
            contentL.removeChild(contentL.lastChild);
        }
        const card = document.createElement('div');
        card.classList.add('infocard');
        card.classList.add('test_item_card');
        const task = document.createElement('p');
        task.classList.add('par__text');
        task.classList.add('par__textStyle_n');
        task.classList.add('par__textAlign_jf');
        task.classList.add('par__size_m');
        task.style.color = "#000"; //modifiable
        task.innerText = props.task;
        card.append(task);
        for(let i = 1; i < 7; i++){
            if(props["ansT" + i.toString()] != ''){
                const answer = document.createElement('p');
                answer.classList.add('par__text');
                answer.classList.add('par__textStyle_n');
                answer.classList.add('par__textAlign_jf');
                answer.classList.add('par__size_m');
                answer.classList.add(props['ansV' + i.toString()] ? 'ans__correct' : 'ans__wrong');
                answer.innerText = props["ansT" + i.toString()];
                card.append(answer);
            }
        }
        if(props.comment != ''){
            const comment = document.createElement('p');
            comment.classList.add('par__text');
            comment.classList.add('par__textStyle_n');
            comment.classList.add('par__textAlign_jf');
            comment.classList.add('par__size_m');
            comment.style.color = "#333"; //modifiable
            comment.innerText = props.comment;
            card.append(comment);
        }
        contentL.appendChild(card);
    }
}