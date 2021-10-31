class FireBaseAPI {

    /**
     * enum of signals to handle on main page
     */
    Signals = {
        loggedIn: 'loggedIn',

        tablesLoaded: 'tablesLoaded',
        tablesFailed: 'tablesFailed',

        modulesLoaded: 'modulesLoaded',
        modulesFailed: 'modulesFailed',

        presentersLoaded: 'presentersLoaded',
        presentersFailed: 'presentersFailed',
        presentersEmpty: 'presentersEmpty'
    }

    /**
     * constructor for initialize firebase libs, on success calls @see coreSignalHandler with signal @see Signals.loggedIn
     */
    constructor() {
        this.firebaseConfigDamirkut = {
            apiKey: "AIzaSyBKqO5q1O0TB--X0mt-e1bep0jeppC8PYw",
            authDomain: "test-414ca.firebaseapp.com",
            databaseURL: "https://test-414ca.firebaseio.com",
            projectId: "test-414ca",
            storageBucket: "test-414ca.appspot.com",
            messagingSenderId: "282306699058",
            appId: "1:282306699058:web:7a1fded73750a55b8d012b"
        };
        firebase.initializeApp(this.firebaseConfigDamirkut);
        this.firestore = firebase.firestore();
        this.realdatabase = firebase.database();
        firebase.auth().signInWithEmailAndPassword('damirkut@gmail.com', 'PaSsWoRd2021')
            .then((userCredential) => {
                console.log(userCredential);
                coreSignalHandler(this.Signals.loggedIn);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    readAllModules() {
        const ref = this.realdatabase.ref('modules');
        ref.get().then((snapshot) => {
            if (snapshot.exists()) {
                const modulesArrayLocal = [];
                for (const moduleId in snapshot.val()) {
                    modulesArrayLocal.push(Module.Decode(moduleId, snapshot.val()[moduleId]));
                }
                modulesArray = Module.reDecodeModules(forkUnitHolder, modulesArrayLocal);
            }
            else {
                modulesArray = Module.reDecodeModules(forkUnitHolder, null);
            }
            coreSignalHandler(this.Signals.modulesLoaded);
        }).catch((error) => {
            console.log(error);
            coreSignalHandler(this.Signals.modulesFailed);
        })
    }

    readAllTables() {
        const ref = this.realdatabase.ref('tables');
        ref.get().then((snapshot) => {
            if (snapshot.exists()) {
                const tablesArrayLocal = [];
                for (const tableId in snapshot.val()) {
                    tablesArrayLocal.push(Table.Decode(tableId, snapshot.val()[tableId]));
                }
                tablesArray = tablesArrayLocal;
            }
            else {
                tablesArray = [];
            }
            coreSignalHandler(this.Signals.tablesLoaded);
        }).catch((error) => {
            console.log(error);
            coreSignalHandler(this.Signals.tablesFailed);
        })
    }

    /**
     * function to get presenter of target unit and target fork, on success fills @see currentPresenterArray and calls @see coreSignalHandler with signal @see Signals.presentersLoaded
     * @param {string} fork - fork name, got from navigation item click
     * @param {string} unit - unit name, got from navigation item click
     */
    readPresenters(fork, unit) {
        const fork_unitId = unit.replace(/ /g, 'ø') + '@' + fork.replace(/ /g, 'ø');
        const ref = this.realdatabase.ref('presenters').orderByChild('fork_unitId').equalTo(fork_unitId);
        ref.get().then((snapshot) => {
            if (snapshot.exists()) {
                const presentersArray = [];
                for (let i = 0; i < snapshot.val().length; i++) {
                    presentersArray.push(null);
                }
                for (const presenterId in snapshot.val()) {
                    const index = new Number(presenterId.split('@')[0]) - 1;
                    presentersArray[index] = Presenter.Decode(presenterId, snapshot.val()[presenterId]);
                }
                currentPresenterArray = [];
                for (let i = 0; i < presentersArray.length; i++) {
                    currentPresenterArray.push(presentersArray[i]);
                }
                coreSignalHandler(this.Signals.presentersLoaded);
            }
            else {
                currentPresenterArray = [];
                coreSignalHandler(this.Signals.presentersEmpty);
            }
        }).catch((error) => {
            console.log(error);
            currentPresenterArray = [];
            coreSignalHandler(this.Signals.presentersFailed);
        })
    }

}