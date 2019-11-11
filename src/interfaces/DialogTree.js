export class DialogTree
{
    constructor(scene, centerX, centerY)
    {
        this.scene = scene;
        this.scale = scene.PhaserGame.scale;
        this.centerX = centerX * this.scale;
        this.centerY = centerY * this.scale;
        
        this.isPlaying = false;
        this.isTreeEnded = true;
        this.currentSequence = null;

        this.sequences = [];
        this.globalOptionsChosen = [];
        this.seqQueue = [];

        this.keyChange = "keydown";

        if (scene.PhaserGame.isMobile)
        {
            this.keyChange = "pointerdown";
        }

        //Play Dialog ----
        this.dialogBackground = scene.add.image(this.centerX, this.centerY, 'dialogbg');
        this.dialogBackground.setScale(4 * this.scale).setScrollFactor(0, 0);

        if (scene.projectiles != undefined)
        {
            for (let i = 0; i < scene.projectiles.list.length; i++)
            {
                scene.projectiles.list[i].destroy();
            }
        }

        if (scene.enemies != undefined)
        {
            for (let i = 0; i < scene.enemies.list.length; i++)
            {
                scene.enemies.list[i].stageMode();
            }
        }

        if (scene.player != undefined)
        {
            scene.player.stageMode(); // player set on stage --> disable everything.
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
        let newDialog = new Dialog(this, sequenceId, dialogText, actor);
        if (options != undefined)
        {
            for (let i = 0; i < options.length; i++)
            {
                newDialog.addOption(options[i][0], options[i][1]);
            }
        }
        this.sequences[sequenceId].addDialog(newDialog);
    }

    //pick a sequence to play
    //stop and progress
    playSequence(sequenceId)
    {
        this.isTreeEnded = false;
        if (this.isPlaying)
        {
            this.seqQueue.push(sequenceId);
        } 
        else 
        {
            this.dialogBackground.setVisible(true);
            this.sequences[sequenceId].playSequence();
            this.currentSequence = this.sequences[sequenceId];
            this.isPlaying = true;
        }
    }

    currentSequenceEnded()
    {
        this.isPlaying = false;
        if (this.seqQueue.length == 0)
        {
            this.endTree();
        } 
        else
        {
            this.playSequence(this.seqQueue[0]);
            this.seqQueue.splice(0, 1);
        }
    }

    changeSequence(sequenceId)
    {
        this.playSequence(sequenceId);
        this.currentSequence.dialogs[this.currentSequence.onDialogNumber - 1].endDialog();
        this.currentSequence.endSequence();
    }

    endTree()
    {
        this.currentSequence = null;
        this.scene.input.keyboard.off(this.keyChange);
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

class Sequence
{
    constructor(dialogTree)
    {
        this.dialogTree = dialogTree;
        this.onDialogNumber = 0;
        this.dialogs = [];
    }

    addDialog(dialog)
    {
        this.dialogs.push(dialog);
    }

    playSequence()
    {
        this.onDialogNumber = 0;
        this.nextDialog();
    }

    endSequence()
    {
        //this.onDialogNumber = 0;
        this.dialogTree.scene.input.keyboard.off(this.dialogTree.keyChange);
        this.dialogTree.currentSequenceEnded();
    }

    nextDialog()
    {
        if (this.onDialogNumber != 0)
        {
            this.dialogs[this.onDialogNumber - 1].endDialog();
        }

        if (this.onDialogNumber < this.dialogs.length)
        {
            this.dialogs[this.onDialogNumber].displayDialog();
        }
        else
        {
            this.dialogs[this.onDialogNumber - 1].endDialog();
            this.dialogTree.scene.input.keyboard.off(this.dialogTree.keyChange);
            this.endSequence();
            return;
        }

        if (this.dialogs[this.onDialogNumber].optionTexts.length != 0)
        {
            this.dialogTree.scene.input.keyboard.off(this.dialogTree.keyChange);
        }
        else if (this.onDialogNumber == 0)
        {
            this.dialogTree.scene.input.keyboard.on(this.dialogTree.keyChange, () => {this.nextDialog();});
        }

        //If dialog have options -> stop keyboard
        this.onDialogNumber++;
    }
}

//Note to myself: 5 lines -> 1st line: Dialog; other lines: options; 200 / 5 = 40 pixels
//Maximum options: 4
//Press something to progress dialog
class Dialog
{
    constructor(dialogTree, dialogSequenceId, text, actor)
    {
        this.textObject = text;
        this.optionTexts = [];
        this.optionMethods = [];
        this.optionObjects = [];
        this.pressAnyKeyToContinueText = null;

        this.text = text;
        this.actor = actor;
        this.dialogTree = dialogTree;
        this.dialogSequenceId = dialogSequenceId;
    }

    //Activate another sequence when chosen
    addOption(text, method)
    {
        this.optionTexts.push(text);
        this.optionMethods.push(method);
    }

    displayDialog()
    {
        let spacing = 35 * this.dialogTree.scale;

        let numberOfLines = this.optionTexts.length + 1;
        let scaleSize = Math.floor(20 * this.dialogTree.scale);

        let centerY = this.dialogTree.centerY;
        let centerX = this.dialogTree.centerX;
        let startY = centerY - (spacing/2) * (numberOfLines - 1) - (scaleSize / 2);

        for (let i = 0; i < numberOfLines; ++i)
        {
            if (i == 0)
            {
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

                this.textObject.setPosition(
                    (centerX - this.textObject.displayWidth / 2), 
                    startY + (spacing * i)
                );
            } 
            else
            {
                let newOption = this.dialogTree.scene.add.text(
                    0,
                    0,
                    i + ". " + this.optionTexts[i - 1],
                    {
                        fontFamily: 'Courier',
                        fontSize: scaleSize + 'px',
                        fontStyle: "bold"
                    }
                );
                newOption.setScrollFactor(0, 0).setInteractive();
                newOption.on('pointerdown', () => {
                    this.dialogTree.globalOptionsChosen.push(i);
                    this.optionMethods[i - 1]();
                });
                newOption.on('pointerover', () => {newOption.setTint(616161);});
                newOption.on('pointerout', newOption.clearTint);
                newOption.setPosition(
                    (centerX - newOption.displayWidth / 2), 
                    startY + (spacing * i)
                );
                this.optionObjects.push(newOption);
            }
        }
        if (this.optionTexts.length == 0)
        {
            this.pressAnyKeyToContinueText = this.dialogTree.scene.add.text(
                0, 
                0, 
                "Press Any Key To Continue...",
                {
                    fontFamily: 'Courier',
                    fontSize: Math.floor(16 * this.dialogTree.scale) + 'px',
                    fontStyle: "bold"
                }
            ).setScrollFactor(0, 0);
    
            this.pressAnyKeyToContinueText.setPosition(
                centerX + 270 * this.dialogTree.scale,
                centerY + 50 * this.dialogTree.scale
            );
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
        //this.dialog.scene.cameras.main.stopFollow();
        for (let i = 0; i < this.optionObjects.length; ++i)
        {
            this.optionObjects[i].destroy();
        }
        if (this.pressAnyKeyToContinueText != undefined)
        {
            this.pressAnyKeyToContinueText.destroy();
        }
    }
}