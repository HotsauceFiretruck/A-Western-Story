const numberKeyboard = ["ONE", "TWO", "THREE", "FOUR"];

export class DialogTree
{
    constructor(scene, centerX, centerY)
    {
        this.scene = scene;
        this.mobile = scene.PhaserGame.isMobile;
        this.centerX = centerX;
        this.centerY = centerY;

        this.isTreeEnded = true;
        this.currentSequence = null;

        this.sequences = [];
        this.queue = [];
    }
    
    startTree()
    {
        //Play Dialog ----
        this.isTreeEnded = false;
        this.dialogBackground = this.scene.add.image(this.centerX, this.centerY, 'dialogbg');
        this.dialogBackground.setScale(4).setScrollFactor(0, 0).setDepth(2);

        if (this.scene.projectiles != undefined)
        {
            for (let i = 0; i < this.scene.projectiles.list.length; i++)
            {
                this.scene.projectiles.list[i].destroy();
            }
        }

        if (this.scene.enemies != undefined)
        {
            for (let i = 0; i < this.scene.enemies.list.length; i++)
            {
                this.scene.enemies.list[i].stageMode();
            }
        }

        if (this.scene.player != undefined)
        {
            this.scene.player.stageMode(); // player set on stage --> disable everything.
        }

        if (this.scene.statics != undefined)
        {
            for (let i = 0; i < this.scene.statics.list.length; i++)
            {
                this.scene.statics.list[i].stageMode();
            }
        }
    }

    //Add a new dialog sequence
    //Return the dialog sequence id
    addSequence()
    {
        this.sequences.push(new Sequence(this));
        return this.sequences.length - 1;
    }

    addDialog(sequenceId, dialogText, actor, options)
    {
        let newDialog = new Dialog(this, this.sequences[sequenceId], dialogText, actor);
        if (options != undefined)
        {
            for (let i = 0; i < options.length; i++)
            {
                newDialog.addOption(options[i][0], options[i][1]);
            }
        }
        this.sequences[sequenceId].addDialog(newDialog);
    }

    //Stop current sequence and plays new sequence
    playSequence(sequenceId)
    {
        if (this.isTreeEnded) this.startTree();
        this.dialogBackground.setVisible(true);
        this.sequences[sequenceId].playSequence();
        this.currentSequence = this.sequences[sequenceId];
    }

    setMethod(method)
    {
        this.method = method;
    }

    endTree()
    {
        this.currentSequence = null;
        this.scene.input.keyboard.off("keydown-X");
        this.dialogBackground.setVisible(false);
        this.isTreeEnded = true;

        //if there is no more sequences, activate things
        if (this.scene.enemies != undefined)
        {
            for (let i = 0; i < this.scene.enemies.list.length; i++)
            {
                this.scene.enemies.list[i].playMode();
            }
        }

        if (this.scene.player != undefined)
        {
            this.scene.player.playMode();
        }

        if (this.scene.statics != undefined)
        {
            for (let i = 0; i < this.scene.statics.list.length; i++)
            {
                this.scene.statics.list[i].playMode();
            }
        }

        if (this.method != undefined)
        {
            this.method();
        }
    }
}

//Sequence

class Sequence
{
    constructor(dialogTree)
    {
        this.dialogTree = dialogTree;
        this.onDialogNumber = 0;
        this.currentDialog = null;
        this.dialogs = [];
    }

    addDialog(dialog)
    {
        this.dialogs.push(dialog);
    }

    playSequence()
    {
        this.onDialogNumber = 0;
        this.currentDialog = this.dialogs[this.onDialogNumber];
        this.currentDialog.displayDialog();
    }

    endSequence()
    {
        if (this.currentDialog != null || this.currentDialog != undefined) this.currentDialog.endDialog();
        this.dialogTree.scene.input.keyboard.off("keydown-X");
        this.dialogTree.endTree();
    }

    //Do not call this outside of this file for any reasons.
    nextDialog()
    {
        this.onDialogNumber++;
        if (this.onDialogNumber >= this.dialogs.length)
        {
            this.endSequence();
            return;
        }
        
        if (this.currentDialog != null || this.currentDialog != undefined) this.currentDialog.endDialog();
        
        this.currentDialog = this.dialogs[this.onDialogNumber];
        this.currentDialog.displayDialog();
    }
}

//Dialog

class Dialog
{
    constructor(dialogTree, dialogSequence, text, actor)
    {
        this.optionObjects = []; // [text, callback, textObject, rectangleObject]
        this.nextDialogButton = [null, null]; //[text, image]
        this.textObject = null;

        this.text = text;
        this.actor = actor;
        this.dialogTree = dialogTree;
        this.sequence = dialogSequence;
    }

    //Activate another sequence when chosen
    addOption(text, callback)
    {
        this.optionObjects.push([text, callback, null, null]);
    }

    displayDialog()
    {   
        //Setup
        let spacing = 40;

        let numberOfLines = this.optionObjects.length + 1;

        let centerY = this.dialogTree.centerY;
        let centerX = this.dialogTree.centerX;
        let startY = centerY - (spacing/2) * (numberOfLines - 1) - 10;

        //Create Text Objects
        this.textObject = this.dialogTree.scene.add.text(
            0, 
            0, 
            this.text,
            {
                fontFamily: 'Courier',
                fontSize: 20,
                fontStyle: "bold"
            }
        ).setScrollFactor(0, 0).setDepth(3);

        this.textObject.setPosition(centerX - this.textObject.displayWidth / 2, startY);

        for (let i = 1; i < numberOfLines; ++i)
        {
            let rectangleObject = this.dialogTree.scene.add.rectangle(
                0,
                0,
                this.dialogTree.dialogBackground.displayWidth - 110,
                25,
                0x2C2F30
            ).setScrollFactor(0, 0).setDepth(3);

            
            this.dialogTree.scene.input.keyboard.once("keydown-" + numberKeyboard[i-1], () => {
                this.sequence.nextDialog();
                this.optionObjects[i - 1][1]();
            });

            rectangleObject.setPosition(
                centerX, 
                startY + (spacing * i) + 10
            );

            rectangleObject.setInteractive().on('pointerup', () => {
                this.sequence.nextDialog();
                this.optionObjects[i - 1][1]();
            });

            rectangleObject.on('pointerover', () => {rectangleObject.setFillStyle(0x616161);});
            rectangleObject.on('pointerout', () => {rectangleObject.setFillStyle(0x2C2F30);});
            
            let textObject = this.dialogTree.scene.add.text(
                0,
                0,
                i + ". " + this.optionObjects[i - 1][0],
                {
                    fontFamily: 'Courier',
                    fontSize: 20,
                    fontStyle: "bold",
                    fontColor: "white",
                   // backgroundColor: "#323c39"
                }
            ).setScrollFactor(0, 0).setDepth(3);

            textObject.setPosition(
                (centerX - textObject.displayWidth / 2), 
                startY + (spacing * i)
            );

            this.optionObjects[i - 1][2] = textObject;
            this.optionObjects[i - 1][3] = rectangleObject;
        }

        //Setting Signal To Next Dialog
        if (this.optionObjects.length == 0)
        {
            this.nextDialogButton[1] = this.dialogTree.scene.add.image(
                this.dialogTree.centerX + 400, 
                this.dialogTree.centerY + 122, 'continueDialogButton'); 
            this.nextDialogButton[1].setScrollFactor(0, 0).setScale(1.5).setDepth(4);

            if (this.dialogTree.mobile)
            {
                this.nextDialogButton[0] = this.dialogTree.scene.add.text(
                    this.nextDialogButton[1].x - 112, 
                    this.nextDialogButton[1].y - 10, 
                    "Press Me To Continue",
                    {
                        fontFamily: 'Courier',
                        fontSize: 20,
                        fontStyle: 'bold'
                    }
                ).setDepth(4);

                this.nextDialogButton[1].setInteractive();
                this.nextDialogButton[1].on('pointerup', () => {this.sequence.nextDialog();});
                this.nextDialogButton[1].on('pointerover', function() {
                    this.setTint(616161);
                })
                this.nextDialogButton[1].on('pointerout', function() {
                    this.clearTint();
                })
            } 
            else 
            {
                this.dialogTree.scene.input.keyboard.on("keydown-X", () => {this.sequence.nextDialog();});
            
                this.nextDialogButton[0] = this.dialogTree.scene.add.text(
                    this.nextDialogButton[1].x - 112, 
                    this.nextDialogButton[1].y - 10, 
                    "Press X To Continue",
                    {
                        fontFamily: 'Courier',
                        fontSize: 20,
                        fontStyle: 'bold'
                    }
                ).setDepth(4);
            }
            this.nextDialogButton[0].setScrollFactor(0, 0);
        }

        if (this.actor != undefined) 
        {
            //this.dialogTree.scene.cameras.main.setZoom(2);
            this.dialogTree.scene.cameras.main.startFollow(this.actor, false, 0.5, 0.5);
        }
    }

    endDialog()
    {
        this.textObject.destroy();

        for (let i = 0; i < this.optionObjects.length; ++i)
        {
            this.optionObjects[i][2].destroy();
            this.optionObjects[i][3].destroy();
        }

        if (this.nextDialogButton[0] != null) 
        {
            this.nextDialogButton[0].destroy();
            this.nextDialogButton[1].destroy();
        }
        this.dialogTree.scene.input.keyboard.off("keydown-X");
    }
}

