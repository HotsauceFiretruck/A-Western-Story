export class DialogTree
{
    constructor(scene, centerX, centerY)
    {
        this.scene = scene;
        this.centerX = centerX * scene.PhaserGame.scale;
        this.centerY = centerY * scene.PhaserGame.scale;

        this.sequences = [];
        this.seqQueue = [];

        this.dialogBackground = scene.add.image(centerX, centerY, 'dialogbg');
        this.dialogBackground.setScale(4 * scene.PhaserGame.scale).setScrollFactor(0, 0);

        if (scene.player != undefined && scene.PhaserGame.isMobile)
        {
            scene.player.controller.setBackStage();
        }

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

        //Foreach Dialog 
        //Display it
        //Wait for the signal
        this.sequences[sequenceId].playSequence();
        //Loop
    }

    currentSequenceEnded()
    {

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
        //When signaled, play next dialog
        this.nextDialog();
    }

    endSequence()
    {
        this.onDialogNumber = 0;
        this.dialogTree.currentSequenceEnded();
    }

    nextDialog()
    {
        this.onDialogNumber++;
        if (this.onDialogNumber < this.dialogs.length)
        {
            this.dialogs[this.onDialogNumber].displayDialog();
        }
        else
        {
            this.endSequence();
        }
    }
}

//Note to myself: 5 lines -> 1st line: Dialog; other lines: options; 200 / 5 = 40 pixels
//Maximum options: 4
//Press something to progress dialog
class Dialog
{
    constructor(dialogTree, dialogSequenceId, text)
    {
        this.textObject = this.dialogTree.scene.add.text( 0, 0, text,
            {
                fontFamily: 'Courier',
                fontSize: '18px',
            }
        );
        this.textObject.setVisible(false);
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
        this.textObject.setVisible(true);
    }

    endDialog()
    {
        this.textObject.setVisible(false);
    }
}