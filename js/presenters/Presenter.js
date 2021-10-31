class Presenter{

    /**
     * enumerator for detecting type of presenter
     * UNTOUCHABLE!
     */
    static presenterType = {
        file: 'file',
        image: 'image',
        infocard: 'infocard',
        link: 'link',
        paragraph: 'paragraph',
        testitem: 'testitem',
        video: 'video'
    }

    /**
     * default constructor.
     * UNTOUCHABLE!
     * @param {Object} unit - unit object for techical targets
     * @param {Object} fork - fork object for techical targets
     */
    constructor(unit, fork){
        this.unitId = unit.replace(/ /g, 'ø');
        this.forkId = fork.replace(/ /g, 'ø');
        this.fork_unitId = this.unitId + '@' + this.forkId;
        this.presenterId = '';
        this.presenterType = '';
        this.presenterProps = {};
        this.needUpdate = false;

        this.tempType = '';
        this.tempProps = {};
    }

    /**
     * general interface for drawing any presenters from main file
     * UNTOUCHABLE!
     * @param {Node} rootList - main holder of presenter views on page
     * @param {Object[]} presenters - array of abstract presenters to draw on this unit
     */
    static ReDraw(rootList, presenters){
        while (rootList.firstChild) {
            rootList.removeChild(rootList.lastChild);
        }
        for(let i = 0; i < presenters.length; i++){
            presenters[i].DrawPresenter(i);
        }
    }

    /**
     * function in iterface to draw abstract presenter
     * UNTOUCHABLE! except "modifiable region"
     * @param {number} order - order in sorted presenters array @see ReDraw()
     * @param {Node} rootList - main holder of presenter views on page
     */
    DrawPresenter(order, rootList){
        const id = 'presenterM' + order;
        const props = this.presenterProps;
        const holder = document.createElement('div');
        holder.id = id;
        rootList.appendChild(holder);

        //#modifiable
        holder.style.backgroundColor = '#fff';
        holder.style.paddingTop = '8px';
        holder.style.paddingBottom = '8px';
        holder.style.paddingLeft = '16px';
        holder.style.paddingRight = '16px';
        //#endmodifiable

        switch(this.presenterType){
            case Presenter.presenterType.paragraph:
                Paragraph.Draw(props, holder);
                break;
            case Presenter.presenterType.file:
                FileP.Draw(props, holder);
                break;
            case Presenter.presenterType.link:
                LinkP.Draw(props, holder);
                break;
            case Presenter.presenterType.infocard:
                InfoCard.Draw(props, holder);
                break;
            case Presenter.presenterType.video:
                VideoP.Draw(props, holder);
                break;
            case Presenter.presenterType.image:
                ImageP.Draw(props, holder);
                break;
            case Presenter.presenterType.testitem:
                TestItem.Draw(props, holder);
                break;
        }
    }

    /**
     * function for decoding firebase presenter item @see FireBaseAPI.readPresenters()
     * UNTOUCHABLE!
     * @param {string} presenterId - unique address of presenter for technical targets
     * @param {Object} record - firebase transport json
     * @return {Object} abstract presenter for manipulating from main file
     */
    static Decode(presenterId, record){
        const presenter = new Presenter(record.unitId, record.forkId);
        presenter.presenterId = presenterId;
        presenter.presenterType = record.presenterType;
        presenter.presenterProps = JSON.parse(record.presenterProps);
        return presenter;
    }
}