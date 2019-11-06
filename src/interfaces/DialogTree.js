export class DialogTree
{
    constructor(scene, centerX, centerY)
    {
        this.scene = scene;
        this.scale = scene.PhaserGame.scale;
        this.centerX = centerX * this.scale;
        this.centerY = centerY * this.scale;
        

        this.sequences = [];
        this.seqQueue = [];

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

        this.pressAnyKeyToContinueText = scene.add.text(
            0, 
            0, 
            "Press Any Key To Continue...",
            {
                fontFamily: 'Courier',
                fontSize: Math.floor(16 * this.scale) + 'px',
                fontStyle: "bold"
            }
        ).setScrollFactor(0, 0);
        this.pressAnyKeyToContinueText.setPosition(
            this.centerX + 270 * this.scale,
            this.centerY + 50 * this.scale
        );


        // let option1Image = this.add.sprite(20, 20, 'dialogoptions');
        // option1Image.setFrame(0);
    }

    //Add a new dialog sequence
    //Return the dialog sequence id
    addSequence()
    {
        this.sequences.push(new Sequence(this));
        return this.sequences.length - 1;
    }

    addDialog(sequenceId, dialogText)
    {
        this.sequences[sequenceId].addDialog(new Dialog(this, sequenceId, dialogText));
    }

    //pick a sequence to play
    //stop and progress
    playSequence(sequenceId)
    {
        this.dialogBackground.setVisible(true);
        this.pressAnyKeyToContinueText.setVisible(true);
        this.sequences[sequenceId].playSequence();
    }

    currentSequenceEnded()
    {
        this.dialogBackground.setVisible(false);
        this.pressAnyKeyToContinueText.setVisible(false);

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
            this.scene.player.playMode(); // player set on stage --> disable everything.
        }
    }

    //Signal activate
    //Change dialog number ++
    //Display dialog

    //play the first sequence
    //If there are no more dialog in the sequence, and there are no options to jump to other sequences, end conversation.
    //Return a list of the option numbers that user choose, if there are any.
    play()
    {

    }

    endTree()
    {
        if (this.scene.enemies != undefined)
        {
            for (let i = 0; i < this.scene.enemies.list.length; i++)
            {
                this.scene.enemies.list[i].playMode();
            }
        }

        if (this.scene.player != undefined)
        {
            this.scene.player.stageMode(); // player set on stage --> disable everything.
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
        console.log("Playing Sequence...");
        // if (!this.isNextDialogPossible)
        // {
        //     this.dialogTree.scene.input.keyboard.once("keydown", () => {this.nextDialog();});
        // }
        this.nextDialog();
        this.dialogTree.scene.input.keyboard.on("keydown", () => {this.nextDialog();});
    }

    endSequence()
    {
        this.onDialogNumber = 0;
        this.dialogTree.scene.input.keyboard.off("keydown");
        this.dialogTree.currentSequenceEnded();
    }

    nextDialog()
    {
        console.log("Finding Next Dialog...");
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
            this.endSequence();
        }
        this.onDialogNumber++;
    }
}

//Note to myself: 5 lines -> 1st line: Dialog; other lines: options; 200 / 5 = 40 pixels
//Maximum options: 4
//Press something to progress dialog
class Dialog
{
    constructor(dialogTree, dialogSequenceId, text)
    {
        this.textObject = null;
        this.text = text;
        this.dialogTree = dialogTree;
        this.dialogSequenceId = dialogSequenceId;
    }

    //Activate another sequence when chosen
    //The dialog that have options should be the last dialog in the sequence
    //Test later
    addOption(text, activateSequence)
    {

    }

    displayDialog()
    {
        let scaleSize = Math.floor(20 * this.dialogTree.scale);
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
        this.textObject.setPosition(this.dialogTree.centerX - this.textObject.displayWidth / 2,
                                    this.dialogTree.centerY - this.textObject.displayHeight / 2);
    }

    endDialog()
    {
        if (this.textObject != null)
        {
            let temp = this.textObject;
            this.textObject = null;
            temp.destroy();
        }
    }
}