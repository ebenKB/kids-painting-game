import DS from 'ember-data';
import {computed} from '@ember/object';

const TEMPLATES = [
    [ "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "teal", "red", "red", "teal", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "teal", "red", "red", "teal", "yellow", "yellow", "orange", "pink", "yellow", "yellow", "teal", "red", "red", "teal", "yellow", "blue", "blue", "blue", "blue", "yellow", "teal", "red", "red", "teal", "yellow", "blue", "green", "green", "blue", "yellow", "teal", "red", "red", "teal", "yellow", "blue", "green", "purple", "blue", "yellow", "teal", "red", "red", "teal", "yellow", "blue", "green", "blue", "blue", "yellow", "teal", "red", "red", "teal", "yellow", "blue", "yellow", "yellow", "yellow", "yellow", "teal", "red", "red", "teal", "red", "red", "red", "red", "red", "red", "red", "red" ],
    [ "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "teal", "teal", "teal", "teal", "white", "black", "black", "black", "black", "white", "teal", "teal", "teal", "teal", "white", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "green", "white", "white", "white", "white", "white", "white", "white", "white", "white", "green", "white", "white", "white", "white", "white", "white", "white", "white", "white", "green", "green", "green", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "orange", "white" ],
    [ "teal", "teal", "teal", "teal", "teal", "teal", "white", "white", "white", "white", "white", "white", "white", "white", "white", "teal", "white", "indigo", "white", "white", "white", "white", "indigo", "indigo", "indigo", "teal", "indigo", "indigo", "indigo", "white", "teal", "indigo", "teal", "white", "indigo", "indigo", "indigo", "indigo", "indigo", "white", "teal", "indigo", "teal", "white", "indigo", "indigo", "white", "white", "white", "white", "white", "indigo", "indigo", "white", "indigo", "indigo", "indigo", "indigo", "white", "white", "white", "black", "white", "indigo", "white", "indigo", "indigo", "indigo", "white", "white", "white", "black", "white", "white", "indigo", "indigo", "indigo", "white", "white", "white", "white", "black", "black", "black", "black", "black", "white", "indigo", "indigo", "indigo", "white", "white", "white", "white", "white", "black", "black", "white", "white", "white" ],
    [ "red", "red", "red", "red", "white", "white", "red", "red", "red", "red", "white", "teal", "teal", "white", "white", "white", "white", "teal", "teal", "white", "white", "teal", "teal", "white", "yellow", "yellow", "white", "teal", "teal", "white", "white", "white", "white", "white", "yellow", "yellow", "white", "white", "white", "white", "white", "white", "white", "white", "yellow", "yellow", "white", "white", "white", "white", "white", "white", "white", "white", "yellow", "yellow", "white", "white", "white", "white", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "white", "black", "white", "blue", "white", "white", "blue", "white", "black", "white", "white", "white", "black", "white", "green", "green", "white", "black", "white", "white", "white", "white", "white", "black", "grey", "grey", "black", "white", "white", "white" ]
];


export default DS.Model.extend({
    templatePicture: DS.belongsTo('picture', {async: false}),
    playerPicture: DS.belongsTo('picture', {async: false}),

    init() {
        this._super(...arguments);

        this.set('templatePicture', this.store.createRecord('picture'));
        this.set('playerPicture', this.store.createRecord('picture'));

        this.pickRandomTemplate();
    },

    correctCellCount: computed('templatePicture.cells.@each.{color}', 'playerPicture.cells.@each.{color}', function() {
        let count = 0;

        for (let i=0; i<this.templatePicture.cells.length; i++) {
            if (this.templatePicture.cells.objectAt(i).color === this.playerPicture.cells.objectAt(i).color) {
                count++;
            }
        }

        return count;
    }),

    isComplete: computed.equal('correctCellCount', 100),

    pickRandomTemplate() {
        let randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
        this.templatePicture.load(randomTemplate);
        this.playerPicture.clear();
    }
});
