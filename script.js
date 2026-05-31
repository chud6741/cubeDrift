/*Zijun Zhu
 * 2026/04/21
   This program recreates part of a level from geometry Dash. The program utilizes 
   arrays, loops, and if conditions to create a dynamic, rhythm-based scrolling platformer.*/
var playingGame = false;

var progressPercent;
var cleanProgress;

//numebr of attempts
var numAttempts = 1;
var death = false;
//thing
var jump = false;
var jumpTimer = 0;
var jumpMax = 24; //the porgram is 60fps so 1 jump is 0.5 second in durtion

var jumpYMAX = 500;
//declare the variable for the image thing
var characterImg;
//cube positon
var cubeX = -200;
var cubeY = 460;

//tiem avriables

var gameTimer;
var startTime;

var groundMove = false;

//ground movement
var groundX = 0;

//backdrop movement
var BGX = 0;

//General obstacle postion properties
var obstacleSTART = 1600;
var obstacleEND = -800;
//BIG SPIKE movement
var obstacleX = 1600;
var obstacleY = 460;

//the little cube close to the start of the run

var pillar1X;
var pillar1Y = 460;
//mini spike

var miniSpikeX = 1600;
var miniSpikeY = 485; //??

//pillar 2 

var pillar2X;
var pillar2Y = 410;
//pillar 3
var pillar3X;
var pillar3Y = 360;





//slab like platforms
var slabX;




var portalX;
var portalY = 235;

//-------TIMESTAMP ARRAYS----------
//timestamps(at what times in ms does the big spike make contact with the player?)
var bigSPIKEStamps = [1500, 3060, 4500, 4550, 7400, 7450, 8900, 8950, 10300, 10350, 
                        11100, 14700,14750, 14800, 15100, 15150, 15200,
                        16000, 16050, 16100, 16150,
                    16720, 16770,
                18250, 18300, 19700, 19750, 19800,
            23250,
        ];

var bigSpikeYPositions = [460,460,460, 460, 460, 460, 460, 460  , 460,460, 
                        340, 300, 300, 300,300, 300,300, 
                        290, 290, 290, 290,
                    300, 380,
                460, 460, 460, 460, 460, 
                220,
            ];
            
            
//var upsideDownBigSpike = [30000,30050,30100, 30150, 30200, 30250, 30300,30350,
    //30400, 30450, 30500, 30550, 30600, 30650, 30700, 30750, 30800, 30850, 30900, 30950];

var pillar1TIMESTAMP = [4600];
// Keep timestamps as simple numbers
var slabTIMESTAMP = [12300, 12700, 13100, 13500, 13900,
                    21300, 21700, 22100, 22500, 22900]; 
// Create a separate matching list for heights
var slabYPositions = [440, 410, 380, 350, 320,
                    440, 410, 380, 350, 320];

//all the little spikes under the slabs
var miniSpikeTIMESTAMP = [3000, 
    12300, 12350, 12400, 12450, 12500, 12550, 12600, 12650, 12700, 12750, 12800, 12850, 12900, 12950, 
    13000, 13050, 13100, 13150, 13200, 13250, 13300, 13350, 13400, 13450, 13500, 13550, 13600, 13650, 
    13700, 13750, 13800, 13850, 13900, 13950, 14000, 14050,
    21500, 21550, 21600, 21650, 21700, 21750, 21800, 21850, 21900, 21950, 22000, 22050, 22100, 22150, 
    22200, 22250, 22300, 22350, 22400, 22450, 22500, 22550, 22600, 22650, 22700, 22750, 22800, 22850, 
    22900, 22950, 23000];



//------------------------------------------------------------------------

//EP is elevated platform
var EP1X;
var EP1Y = 450;

var EP2X;

var EP3X;

var EP3Y = 390;

var EP4X;
var EP4Y = 350;

var EP5X;

var EP5Y = 400;

var EP6X;

var EP6Y = 350;

var EP7X;

var EP7Y = 430;

var EP8X;

var EP8Y = 0;
var EP9X;
var EP9Y = 375;

var EP10X;
var EP10Y = 375;

var score;

const stereoMadnessMusic = new Audio("assets/GEODASHMUSIC.MP3");
const levelCompleteSFX = new Audio("assets/LEVELCOMPLETE.MP3");
//screen mdoe/ tracks what menu the user is on
var screenMode = "mainMenu";

//angle of the cube
var cubeAngle;
//var character;
function preload() {
    //music
    bgMUSIC = loadSound('assets/GAMEMUSIC.mp3');
    deathSFX = loadSound('assets/DEATHSFX.mp3');
    levelSFX = loadSound('assets/LEVELCOMPLETE.mp3');
}
function setup() {
    createCanvas(1000, 700);

    //menu bg
    menuBG = loadImage('assets/MENUBG.png');

    //puase button
    pauseBTN = loadImage('assets/PAUSEBUTTON.png');
    //character thing
    characterImg = loadImage('assets/CHARACTER.png');

    //the ground 
    groundImg = loadImage('assets/LONGGROUND.png');
    //play button
    playBTN = loadImage('assets/PLAYBTN(1).png');

    //menu logo
    menuLogo = loadImage('assets/GAMEMENULOGO.png');

    //backdrop
    backDropImg = loadImage('assets/BACKDROP.png');

    //test obstacle
    testObstacle = loadImage('assets/OBSTACLETEST.png');

    //SPIKE obstacle (This sprite wil be used for all large spike obstacles)
    spikeObstacle = loadImage('assets/SPIKE.png');

    //mini spike obstacle
    miniSpike = loadImage('assets/MINISPIKE.png');

    //platform obstacle (1st pillar)
    pillar1Img = loadImage('assets/PLATFORM.png');

    //pillar 2
    pillar2 = loadImage('assets/PILLAR2.png');

    //pillar 3
    pillar3 = loadImage('assets/PILLAR3.png');

    //the slab platforms
    slabImg = loadImage('assets/SLAB.png');
    
    //EP is an acrynom for extended platform. We will have several of these with different shapes and sizes
    EP1Img = loadImage('assets/EXTENSION.png');
    
    //the portal
    portalImg = loadImage('assets/PORTAL.png');
    
    //play again btn
    playAgain = loadImage('assets/PLAYAGAIN.png');
}

function keyPressed() {

    //"w" or space bar allows user to jump
    
        if (key == 'w' || keyCode === 32 && cubeY >= jumpYMAX) {
        jump = true;
    }
    
    }
    
    
function draw() {




    background(menuBG);
    fill(255);
    textSize(40);

    if (screenMode === "mainMenu") {

        
        //resize the play button
        playBTN.resize(200, 100);

        //draw the button
        image(playBTN, 300, 300);

        //resize and draw the logo
        menuLogo.resize(400, 250);
        image(menuLogo, 200, 108);

    }
    
    if (screenMode === "end"){
        
        

        text("You beat the game!", 100,100);
        
        playAgain.resize(200,100);
        image(playAgain, 400, 400);
        
    }
    if (screenMode === "death"){
        text("Game over!", 100,100);
        playAgain.resize(200,100);
        image(playAgain, 400, 400);
        score = progressPercent;
        text("Your score: " + cleanProgress + "%", 100, 200);
    }
    

    //------------------------------------------------
    if (screenMode === "playing") {
        fill(200, 200, 0);
        //the backdrop
        backDropImg.resize(8000, 700);
        image(backDropImg, BGX, 0);
        
        

        //COORDINATES
        //text("X: " + mouseX, 542, 41);
        //text("Y: " + mouseY, 684, 41);
        //
        //
        //show # of attempts
        text("Attempt " + numAttempts, 20, 80);
        
        //the cube starts off the screen and moves formward. 
        cubeX += 15;

        //once the player entity reaches a certian point on the x axis the ground wil appear to be moving witht the cube
        if (cubeX >= 200) {
            groundMove = true;
            cubeX = 200;
        }
        //this code rortae tehs player
        push();
        angleMode(DEGREES); // Makes math easier than Radians
        translate(cubeX + 25, cubeY + 25); // Move origin to center of cube
        rotate(cubeAngle);

        characterImg.resize(50, 50);
        imageMode(CENTER); // Draw from the center so it spins correctly
        image(characterImg, 0, 0);
        pop();

        //change the value of % 3000 to make the level one long cycle
        let gameTimer = (millis() - startTime) % 26000;
        // Calculate progress percentage (current time / total level time * 100)
progressPercent = (gameTimer / 26000) * 100;
// Strip decimals so it displays clean numbers like "45%" instead of "45.223423%"
cleanProgress = floor(progressPercent);

        //THE MAXIMUM Y VALUE CHANGES BASED ON TIME PASSED (ffor obstacles) (IMPORTANT)
        if (gameTimer < 4800) { //1700 is the millis value where the obsatcle starts
            jumpYMAX = 460;
        } else if (gameTimer > 4800 && gameTimer < 4900) {
            jumpYMAX = 410;
        } else if (gameTimer > 5100 && gameTimer < 5300) {
            jumpYMAX = 360;
        } else if (gameTimer > 5400 && gameTimer < 5600) {
            jumpYMAX = 310;
            
            //3 platforms 
        } else if (gameTimer > 8000 && gameTimer < 9100) {
            jumpYMAX = 400;
        } else if (gameTimer > 9200 && gameTimer < 10500){
            jumpYMAX = 400;
        } else if  (gameTimer > 10600 && gameTimer < 11900){
            jumpYMAX = 340;
            
        //the jumpiy thingies
    } else if (gameTimer > 12450 && gameTimer < 12700 ){
        jumpYMAX = 390;
       } else if (gameTimer > 12900 && gameTimer < 13200 ){
        jumpYMAX = 360;
           } else if (gameTimer > 13300 && gameTimer < 13575 ){
        jumpYMAX = 330;
        } else if (gameTimer > 13700 && gameTimer < 13900 ){
        jumpYMAX = 300;
        } else if (gameTimer > 14100 && gameTimer < 14380 ){
        jumpYMAX = 270;
        
        
        //large platform with two triple spikes: 
        //
    }else if ((gameTimer > 14500 && gameTimer < 15800) ||
              gameTimer > 16600 && gameTimer < 17000){
        jumpYMAX = 310;
    } else if (gameTimer > 15800 && gameTimer < 16600){
        jumpYMAX = 350;
        
    }else if (gameTimer > 16800 && gameTimer < 17700 ){
        jumpYMAX = 380;
        
        //the otehr 5 slabs
    } else if (gameTimer > 21500 && gameTimer < 21700){
        jumpYMAX = 390;
    }else if (gameTimer > 21900 && gameTimer < 22150){
        jumpYMAX = 360;
    } else if (gameTimer > 22250 && gameTimer < 22500){
        jumpYMAX = 330;
    }else if (gameTimer > 22650 && gameTimer < 22900){
        jumpYMAX = 300;
    } else if (gameTimer > 23000 && gameTimer < 23300){
        jumpYMAX = 270;
        
    }else if (gameTimer > 23000 && gameTimer < 26000){
        jumpYMAX = 325;
    
        
            //no elevated obstacles
        } else {
            jumpYMAX = 460;
        }
        
        

        
        
        //the porgram moves at 60 fps, so move the ground by 20 pixels per frame
        if (groundMove === true) {
            groundX -= 15;

            //the background moves significantly slower than the ground
            BGX -= 1;
        }
        
        
        

        //the ground
        image(groundImg, groundX, 510);



        //---------DRAW THE OBJECTS that don't repeat-------


        //mini SPIKE OBSTACLE
        miniSpike.resize(50, 25);

        


        pillar2.resize(50, 100);
        image(pillar2, pillar2X, pillar2Y);

        pillar3.resize(50, 150);
        image(pillar3, pillar3X, pillar3Y);

        
        EP1Img.resize(800,60);
        image(EP1Img, EP1X, EP1Y);
        
        
        //-------MAPPING OBJECTS (ones that don't repeat throughou the program)----
            
        //the numbers 0 and 3000 represent the duration (in ms) how log it take to go from point a (1600) to point b (-800);
        //keep the difference in time and position the same for ALL obstacels to maintain consistent speed!

        //parameters: map(the timer variable, time when, currentMax, targetMin, targetMax)

        
        pillar2X = map(gameTimer, 5100, 8100, 200, -2200);

        pillar3X = map(gameTimer, 5600, 8600, 100, -2300);
        
        EP1X = map(gameTimer, 8300, 11300, 0, -2400);
        
         
        EP2X = map (gameTimer, 9600, 12600, 0, - 2400);
        
        image(EP1Img, EP2X, EP1Y, 900, 60);
        
        
        
        EP3X = map (gameTimer, 11000, 14000, 0, -2400);
        
        //this resizes the thing
        image(EP1Img, EP3X, EP3Y, 900, 120);
        
        EP4X = map(gameTimer, 14900, 17900, 0, -2400);
        
        image (EP1Img, EP4X, EP4Y, 900, 160);
        
        EP5X = map(gameTimer, 16030, 19030, 0, -2400);
        image(EP1Img, EP5X, EP5Y, 700, 110);
        
        EP6X = map(gameTimer,16900, 19900, 0, -2400);
        image(EP1Img, EP6X, EP6Y, 300, 160);
        
        EP7X  = map(gameTimer, 17275, 20300, 0, -2400);
        image(EP1Img, EP7X, EP7Y, 400, 80);
        
        //teh entrance
        
        EP8X = map(gameTimer, 24000, 27000, 0, -2400);
        image(EP1Img, EP8X, EP8Y, 1600, 235);
        
        EP9X = map(gameTimer, 24000, 27000, 0, -2400);
        image(EP1Img, EP9X, EP9Y, 1600, 135);
        
        EP10X = map(gameTimer, 23700, 26700, 0, -2400);
        image (EP1Img, EP10X, EP10Y, 300, 50);
        
        portalX = map(gameTimer, 25850, 28850, 0, -2400);
        image(portalImg, portalX, portalY, 40, 140);
        
        
        
        
        //teh extar if statement ensures that this condiiton only aopplies when the three platforms are visible
        if (gameTimer > 8100 && gameTimer < 10500){
        if ((cubeX + 30 > EP1X && cubeY > jumpYMAX) ||
             cubeX + 30 > EP3X && cubeY > jumpYMAX){
            death = true;
        }
    }
        
        //----------------------------------------------------------------------
        
        
        
        
        
        
        
        //check collision with the 2nd pillar
        if (cubeX + 50 > pillar2X && cubeX < pillar2X + 50 && cubeY > jumpYMAX) {
            death = true;
        }

        if (cubeX + 50 > pillar3X && cubeX < pillar3X + 50 && cubeY > jumpYMAX) {
            death = true;
        }
        //if the ground reaches a certian point off the canvas
        if (groundX <= -800 && gameTimer < 23520) {

            //reset teh ground position so it loops
            groundX = 0;
        }

        //reset the obstacle to make it go infinite
        if (obstacleX <= -800) {
            obstacleX = obstacleSTART;
        }

        //-----------------------LOOPIGN THE BIG SPIKE (SO IT SHOWS MORE THAN ONCE)----------------
        //resize the BIG obstacle
        spikeObstacle.resize(50, 50);
        //. length counts how many time stamps there are in bigSPIKEStamps
        // "i" 
        for (let i = 0; i < bigSPIKEStamps.length; i++) {

            //these two lines of code calculate the position of the specific spike in the for loop
            let startTime = bigSPIKEStamps[i] - 1500;
            let endTime = startTime + 3000;
            obstacleX = map(gameTimer, startTime, endTime, obstacleSTART, obstacleEND);
            //BIG SPIKE OBSTACLE
            
            //store the current Y position of the spike 
            let currentSpikeY = bigSpikeYPositions[i];
            
            image(spikeObstacle, obstacleX, currentSpikeY);

            //-------------BIG SPIKE COLLISION WITH PLAYER-------------
            //check if the player hits the specifc BIG spike in the while loop
            if (dist(cubeX, cubeY, obstacleX, currentSpikeY) < 40) {
                death = true;
                //death sound

                //------------------------------------------------------------
            }
        }

        //looping the pillar1 (becasue its a cube)


        pillar1Img.resize(50, 50);
        for (let i2 = 0; i2 < pillar1TIMESTAMP.length; i2++) {
            let startTime2 = pillar1TIMESTAMP[i2] - 1500;
            let endTime2 = startTime2 + 3000;

            //map function
            pillar1X = map(gameTimer, startTime2, endTime2, obstacleSTART, obstacleEND);


            image(pillar1Img, pillar1X, pillar1Y);
        }

        //loop the little platform thing

        slabImg.resize(100, 20);
        for (let i3 = 0; i3 < slabTIMESTAMP.length; i3++) {
            
            
            let startTime3 = slabTIMESTAMP[i3] - 1500;
            let endTime3 = startTime3 + 3000;

            slabX = map(gameTimer, startTime3, endTime3, obstacleSTART, obstacleEND);
            
           
            
            image(slabImg, slabX, slabYPositions[i3]);
        }
        
        //prevents the user from jumping back on 
        if (cubeY > slabYPositions + 20){
            jumpYMAX = 460;
        }
        //loop the small spikes
        for (let i4 = 0; i4 < miniSpikeTIMESTAMP.length; i4++){
            let startTime4 = miniSpikeTIMESTAMP[i4] - 1500;
            let endTime4 = startTime4 + 3000;
            
            miniSpikeX = map(gameTimer, startTime4, endTime4, obstacleSTART, obstacleEND);
            
            image(miniSpike, miniSpikeX, miniSpikeY);
            
            if (dist(cubeX, cubeY, miniSpikeX, miniSpikeY) < 32){
                death = true;
            }
        }
         
        


         



        //----------------JUMP and FLYING LOGIC------------------------
       
        
             if (jump === true) {

            cubeAngle += 15.5;
            //tracks the 
            jumpTimer++;
            cubeY -= 12;
            if (jumpTimer >= 12) { //the cube reaches a maximum after 12 frames and starts to go down

                //the cube goes back down
                cubeY += 25;
            }
            if (cubeY >= jumpYMAX) {
                jump = false;      // Turn off jump logic
                jumpTimer = 0;     // Reset timer for the next jump
                cubeY = jumpYMAX;
                cubeAngle = 0;// Snap exactly back to starting floor height
            } else {
                jump = true;
            }


        } 
        
        


        if (cubeY < jumpYMAX && jump === false) {
            // If you are in the air and NOT jumping, you MUST fall
            cubeY += 10;
        }

        //REMOVE THE BELoW CODE LATEER IT MAY BE UNNESSESARY
        //if the cube collides with the test obstacle
        //ADD THIS TYPE OF LOGIC FOR ALL OBSTACLES
        //the numerical values (ex. +5 and + 50) are there to make the collision more accurate
        if (cubeX + 50 >= obstacleX + 5 && cubeY + 50 > obstacleY && gameTimer < 1850) {
            
            //deathSFX.play();
            bgMUSIC.stop();

        }
        //---------------------------------------------
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //
//DEATH
        if (death == true) {
            death = false;
            deathSFX.play();

            cubeX = -200;

            groundMove = false;

            //increase num attempts
            numAttempts++;
            //reset so the player can play again
            screenMode = "death";
            
            //reset the background while playing
            bgX = 0;
            bgMUSIC.stop();
        }
        
        //beat game
        if (cubeX + 20 >= portalX){
            screenMode = "end";
            bgMUSIC.stop();
            
        }
        
        
        
        //game timer display
        text("Progress: " + cleanProgress + "%", 20, 40);
    }
    
    
    


}




function mousePressed() {
    //---------------Button Code--------------------
    //check if left mouse button is clicked
    if (screenMode === "mainMenu" &&mouseButton == LEFT &&
            //check the boundaries of the play button, so that only when the play button is pressed the stuff starts drawing (check length and width)
            mouseX >= 306 && mouseX <= 488 && mouseY <= 393 && mouseY >= 297) {
        screenMode = "playing";
        startTime = millis();

        //play and loop the song
        if (!bgMUSIC.isPlaying()) {
            bgMUSIC.play(); // loop() makes it play forever
        } // Check End Screen Play Again Button
   
    }
     else if ((screenMode === "end" || screenMode === "death") && mouseButton == LEFT &&
        mouseX >= 400 && mouseX <= 600 && mouseY >= 400 && mouseY <= 500) {
        
        // Reset necessary gameplay parameters
        cubeX = -200;
        cubeY = 460;
        groundX = 0;
        BGX = 0;
        groundMove = false;
        
        // Go back to main menu or directly to playing
        screenMode = "mainMenu"; 
    }
}





