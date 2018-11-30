import Component from '@ember/component';

export default Component.extend({
    actions: {
       updateCellColor(cell) {
           if (this.isEditable) {
               this.onCellChange(cell);
           }
       },
       mouseMove(cell, e) {
           if (e.buttons === 1) { //왼쪽클릭
               this.send('updateCellColor', cell);
           }
       } 
    }
});
