function setup(){
    canvas= createCanvas(500,400);
    canvas.position(500,400);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on('pose', gotposes);
}
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scorerightwrist=0;
scoreleftwrist=0;
Indecimalrightwristy=0;
function gotposes(results){
    if(results.length>0){
        console.log(0);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log(0);
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log(results);
        leftwristx= results[0].pose.leftWrist.x;
        leftwristy= results[0].pose.leftWrist.y;
        rightwristx= results[0].pose.rightWrist.x;
        rightwristy= results[0].pose.rightWrist.y;
        console.log("leftwristx= "+leftwristx+" leftwristy= "+leftwristy);
        console.log("rightwristx= "+rightwristx+" rightwristy= "+rightwristy);
    }
}
function modelloaded(){
    console.log('posenet is intialized');
}
function draw(){
    image(video,0,0,500,400)
fill("#ff0000");
stroke("#ff0000");
if(scoreleftwrist > 0.2){
circle(leftwristx,leftwristy,20);
 if(leftwristy>0 && leftwristy<= 100){
    document.getElementById("speed").innerHTML = "Speed = 0.5x";
    song.rate(0.5);
}
else if(leftwristy>100 && leftwristy<= 200){
    document.getElementById("speed").innerHTML = "Speed = 1x";
    song.rate(1);
}
else if(leftwristy>200 && leftwristy<= 300){
    document.getElementById("speed").innerHTML = "Speed = 1.5x";
    song.rate(1.5);
}
else if(leftwristy>300 && leftwristy<= 400){
    document.getElementById("speed").innerHTML = "Speed = 2x";
    song.rate(2);
}
else if(leftwristy>400 && leftwristy<= 500){
    document.getElementById("speed").innerHTML = "Speed = 2.5x";
    song.rate(2.5);
}
}

if(scorerightwrist > 0.2){
    circle(rightwristx,rightwristy,20);
    Indecimalrightwristy= Number(rightwristy);
    removedecimalright = floor(Indecimalrightwristy);
    volume= removedecimalright/500;
    document.getElementById("volume").innerHTML= "Volume= "+volume;
    song.setVolume(volume);
    }
}
song="";

function preload(){
    song= loadSound("butter.mp3");
    
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}

function pause1(){
    song.pause();
}
