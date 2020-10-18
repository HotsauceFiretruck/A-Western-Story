class UI {
    createTextInput(scene, width, defaultText, data) {

        const field = scene.rexUI.add.label({
            orientation: 'x',
            background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(3, 0x000000),
            text: scene.rexUI.add.BBCodeText(0, 0, defaultText, { fontFamily: "Arial", fixedWidth: width, fixedHeight: 40, valign: 'center' }),
            space: { bottom: 5, left: 5, right: 5, }
        });

        field.setInteractive().on('pointerdown', () => {
            console.log(data.text);

            var config = {
                text: data.text, //display text
                onTextChanged: (textObject, text) => {
                    data.text = text;
                    textObject.text = text;
                    textObject.visible = true;
                }
            }
            console.log(config.text);
            scene.rexUI.edit(field.getElement('text'), config);
        });

        return field;
    }

}

export default new UI();