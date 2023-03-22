//Today we'll be learning all about buttons and building some.

//Building buttons

//All a button is, is a section of the screen that we can interact with.

//Basic buttons have 2 states: Up and Down.

//A "down-up" action we usually refer to as a "click" or "tap".

//Let's build a basic button using Pixi.js...

/*

    Pixi event listeners we'll need to know

    Added to Display Elements by using the .on((e) => {}) method.

    Mouse events:       Right click:
    - mousedown         rightdown
    - mouseup           rightup
    - click             rightclick
    - mouseupoutside    rightupoutside
    - mouseover         
    - mouseout
    - mousemove

    Touch events:
    - touchstart
    - touchend
    - tap
    - touchendoutside
    - touchcancel
    - touchmove

    Pointer events (mouse AND touch):
    - pointerdown
    - pointerup
    - pointertap
    - pointerupoutside
    - pointerover
    - pointerout
    - pointermove
    - pointercancel

    Wheel scrolling:
    - wheel

*/


function makeButton(triggerFunction) {

    //Build a container
    let ourButton = new PIXI.Container();
    ourButton.interactive = true;

    //Create button body
    let buttonBody = new PIXI.Graphics();
    buttonBody.beginFill(0xEEEEEE);
    buttonBody.drawRect(0, 0, 200, 100);
    ourButton.addChild(buttonBody);

    ourButton.body = buttonBody;

    let buttonText = new PIXI.Text('Button Text');
    buttonText.anchor.set(.5, .5);
    buttonText.x = buttonBody.width / 2;
    buttonText.y = buttonBody.height / 2;
    ourButton.addChild(buttonText);

    ourButton.label = buttonText;

    //Event Listeners
    //Click listener
    ourButton.on("pointertap", (e) => {
        //console.log(e);
        let color = 0xFFFFFF * Math.random();
        //buttonBody.tint = color;
        triggerFunction();
    });
    //Hover listeners
    ourButton.on("pointerover", function (e) {
        ourButton.alpha = 0.7;
    });
    ourButton.on("pointerout", function (e) {
        ourButton.alpha = 1.0;
    });


    //Draggable event listeners
    ourButton.dragging = false;
    offsetX = 0;
    offsetY = 0;

    ourButton.on("pointerdown", function (e) {
        ourButton.dragging = true;
        offsetX = ourButton.x - e.data.global.x;
        offsetY = ourButton.y - e.data.global.y;
    });

    ourButton.on("pointermove", function (e) {
        //console.log(e);
        if (ourButton.dragging) {
            //console.log(e);
            ourButton.x = e.data.global.x + offsetX;
            ourButton.y = e.data.global.y + offsetY;
        }
    });

    ourButton.on("pointerup", function (e) {
        ourButton.dragging = false;
    });

    return ourButton;

}

let button = makeButton();
button.x = 100;
button.y = 50;

//app.stage.addChild(button);

let button2 = makeButton();
button2.x = 100;
button2.y = 300;
button2.label.text = "Other Button";

//app.stage.addChild(button2);




//Buttons can also have an Internal State

//Toggles or Checkboxes stick On or Off.
//Radio Buttons have one On state among their brethren in the same set.
//Dropdowns have one state that can be selected among others.

function makeToggle() {

    let myButton = makeButton();
    myButton.isOn = false;

    myButton.body.tint = 0xFF0000;

    myButton.on('pointertap', () => {

        myButton.isOn = !myButton.isOn;

        if (myButton.isOn) myButton.body.tint = 0x00FF00;
        else myButton.body.tint = 0xFF0000;

    });

    return myButton;

}

let toggle = makeToggle();
toggle.y = 200;
//app.stage.addChild(toggle);

//Some "buttons" can be Draggable Elements.


//Sliders are buttons that can be dragged along a track.
//The most common are straight lines, or circles.

function makeSlider() {

    //Container
    let ourButton = new PIXI.Container();
    ourButton.interactive = true;

    //Value from 0.0 to 1.0
    ourButton.value = 0;

    //The track
    let theTrack = new PIXI.Graphics();
    theTrack.beginFill(0xCCCCCC);
    theTrack.drawRect(0, -10, 300, 20);

    ourButton.addChild(theTrack);


    //The slide
    let theSlide = new PIXI.Graphics();
    theSlide.interactive = true;
    theSlide.beginFill(0xEEEEEE);
    theSlide.drawRect(-25, -25, 50, 50);

    ourButton.addChild(theSlide);


    //Add event listeners
    //Draggable event listeners
    //Draggin on or off
    theSlide.dragging = false;
    //Pointer down
    theSlide.on("pointerdown", function (e) {
        theSlide.dragging = true;
    });
    theSlide.on("pointermove", function (e) {
        if (theSlide.dragging) {

            let newX = e.data.global.x - ourButton.getGlobalPosition().x;
            let newY = e.data.global.y - ourButton.getGlobalPosition().y;

            /*
            console.log(
                    Math.round(e.data.global.x),
                    Math.round(e.data.global.y),
                    Math.round(newX), 
                    Math.round(newY),
                    ourButton.getGlobalPosition());
            */

            if (newX > theTrack.width) newX = theTrack.width;
            if (newX < 0) newX = 0;

            ourButton.value = newX / theTrack.width;

            theSlide.x = newX;

            console.log(ourButton.value);
        }
    });
    //Pointer up
    theSlide.on("pointerup", function (e) {
        theSlide.dragging = false;
    });
    theSlide.on("pointerupoutside", function (e) {
        theSlide.dragging = false;
    });

    return ourButton;

}

//let ourSlider = makeSlider();
//ourSlider.y = 150;
//ourSlider.x = 200;
//app.stage.addChild(ourSlider);













//Build a button that changes one of the fish's colors randomly.

//Make one of your fish draggable

//Build a slider or dial that changes the size or rotation of one of your fish.