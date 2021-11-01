class ImageP {
    /**
     * special interface for drawing any ImageP from main file
     * UNTOUCHABLE! except "modifiable"
     * @param {Object} props - settings to draw object using css classes and DOM nodes
     * @param {Node} contentL - holder for adding all children, that passed from @see Presenter.DrawPresenter()
     */
    static Draw(props, contentL) {
        while (contentL.firstChild) {
            contentL.removeChild(contentL.lastChild);
        }
        const imagePreview = document.createElement('img');
        const holder = document.createElement('div');
        imagePreview.id = 'image_preview'; //modifiable
        imagePreview.style.width = '100%';
        holder.style.width = '100%';
        if (props.imageUrl == '') {
            if (props.tempFileLink != null) {
                imagePreview.src = URL.createObjectURL(props.tempFileLink);
            }
        } else {
            imagePreview.src = props.imageUrl;
        }
        holder.appendChild(imagePreview);
        if (props.imageSubscription != '') {
            const sub = document.createElement('p');
            const classSub = ['par__text', 'par__textStyle_i', 'par__textAlign_md', 'par__size_s'];
            sub.innerText = props.imageSubscription;
            sub.classList.add(...classSub);
            sub.style.color = '#333'; //modifiable
            holder.appendChild(sub);
        }
        contentL.appendChild(holder);
    }
}
