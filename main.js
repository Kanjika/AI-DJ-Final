song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;


function setup(){
    canvas = createCanvas(600, 500);



    video = createCapture(VIDEO);
    video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);


}

function modelLoaded()
{
    console.log('PoseNet is initialized');
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        scoreRightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        

    }
}





function draw()
{
    image(video, 0, 0, 600, 500);



    song = song1.isPlaying();
    song = song2.isPlaying();


if(scoreLeftWrist > 0.2){
    fill("#FF0000");
    stroke("#FF0000");

    circle(leftWristX, leftWristY, 20);
    song2.stop()


}

if(scoreRightWrist > 0.2){
    fill("#FF0000");
    stroke("#FF0000");

    circle(rightWristX, rightWristY, 20);
    song1.stop()
    

}


if(song == false){
song1.play();
document.getElementById("song").innerHTML = "song1";
}

if(song == false){
    song2.play();
    document.getElementById("song").innerHTML = "song2";
    }
}



