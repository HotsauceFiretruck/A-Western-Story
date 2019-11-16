export class DialogTree
{
    constructor(scene, centerX, centerY)
    {
        this.scene = scene;
        this.mobile = scene.PhaserGame.isMobile;
        this.scale = scene.PhaserGame.scale;
        this.centerX = centerX * this.scale;
        this.centerY = centerY * this.scale;

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
        this.dialogBackground.setScale(4 * this.scale).setScrollFactor(0, 0);

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
        this.optionObjects = []; // [object, text, callback]
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
        this.optionObjects.push([null, text, callback]);
    }

    displayDialog()
    {   
        //Setup
        let spacing = 35 * this.dialogTree.scale;

        let numberOfLines = this.optionObjects.length + 1;
        let scaleSize = Math.floor(20 * this.dialogTree.scale);

        let centerY = this.dialogTree.centerY;
        let centerX = this.dialogTree.centerX;
        let startY = centerY - (spacing/2) * (numberOfLines - 1) - (scaleSize / 2);

        //Create Text Objects
        this.textObject = this.dialogTree.scene.add.text(
            0, 
            0, 
            this.text,
            {
                fontFamily: 'Courier',
                fontSize: scaleSize + 'px',
                fontStyle: "bold"
            }
        ).setScrollFactor(0, 0);

        this.textObject.setPosition(centerX - this.textObject.displayWidth / 2, startY);

        for (let i = 1; i < numberOfLines; ++i)
        {
            let newOption = this.dialogTree.scene.add.text(
                0,
                0,
                i + ". " + this.optionObjects[i - 1][1],
                {
                    fontFamily: 'Courier',
                    fontSize: scaleSize + 'px',
                    fontStyle: "bold",
                    backgroundColor: "#323c39"
                }
            ).setScrollFactor(0, 0).setInteractive();

            newOption.on('pointerdown', () => {
                this.sequence.nextDialog();
                this.optionObjects[i - 1][2]();
            });

            newOption.on('pointerover', () => {newOption.setTint(616161);});
            newOption.on('pointerout', newOption.clearTint);

            newOption.setPosition(
                (centerX - newOption.displayWidth / 2), 
                startY + (spacing * i)
            );

            this.optionObjects[i - 1][0] = newOption;
        }

        //Setting Signal To Next Dialog
        if (this.optionObjects.length == 0)
        {
            this.nextDialogButton[1] = this.dialogTree.scene.add.image(
                this.dialogTree.centerX + 400 * this.dialogTree.scale, 
                this.dialogTree.centerY + 122 * this.dialogTree.scale, 'continueDialogButton'); 
            this.nextDialogButton[1].setScrollFactor(0, 0).setScale(1.5);

            if (this.dialogTree.mobile)
            {
                this.nextDialogButton[0] = this.dialogTree.scene.add.text(
                    this.nextDialogButton[1].x - 118 * this.dialogTree.scale, 
                    this.nextDialogButton[1].y - 12 * this.dialogTree.scale, 
                    "Press Me To Continue",
                    {
                        fontFamily: 'Courier',
                        fontSize: scaleSize + 'px',
                        fontStyle: 'bold'
                    }
                ).setInteractive();

                this.nextDialogButton.on('pointerdown', () => {this.sequence.nextDialog();});
            } 
            else 
            {
                this.dialogTree.scene.input.keyboard.on("keydown-X", () => {this.sequence.nextDialog();});
            
                this.nextDialogButton[0] = this.dialogTree.scene.add.text(
                    this.nextDialogButton[1].x - 112 * this.dialogTree.scale, 
                    this.nextDialogButton[1].y - 12 * this.dialogTree.scale, 
                    "Press X To Continue",
                    {
                        fontFamily: 'Courier',
                        fontSize: scaleSize + 'px',
                        fontStyle: 'bold'
                    }
                );
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
            this.optionObjects[i][0].destroy();
        }

        if (this.nextDialogButton[0] != null) 
        {
            this.nextDialogButton[0].destroy();
            this.nextDialogButton[1].destroy();
        }
        this.dialogTree.scene.input.keyboard.off("keydown-X");
    }
}

